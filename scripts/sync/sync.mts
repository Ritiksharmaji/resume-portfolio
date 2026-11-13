// Sync one project's portfolio content from its repository.
//
//   npx tsx scripts/sync/sync.ts --repo Ritiksharmaji/dabba-platform --dir ../dabba-platform \
//        [--after <sha>] [--before <sha>] [--dry-run]
//
// 1. Counts facts from the checked-out code (scripts/sync/count.ts) — no AI.
// 2. Collects what changed since the last synced commit (data/sync-state.json).
// 3. Asks Claude to rewrite that project's text in data/projects.json and write a
//    "What's new" entry, under the honesty rules below.
// 4. Validates: numbers must come from the counted facts; fixed fields are never touched.
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod/v4";
import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { countRepo, type Facts } from "./count";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const DATA = (f: string) => path.join(ROOT, "data", f);
const readJson = <T,>(f: string): T => JSON.parse(readFileSync(DATA(f), "utf8")) as T;
const writeJson = (f: string, v: unknown) => writeFileSync(DATA(f), JSON.stringify(v, null, 2) + "\n");

type Proof = { value: string; label: string };
type Project = Record<string, unknown> & { slug: string; name: string; proof: Proof[] };
type Config = { projects: { repo: string; slug: string; branch: string }[] };
type State = Record<string, { slug: string; lastSha: string; syncedAt: string }>;
type Entry = { date: string; sha: string; title: string; points: string[] };

// ---------- args ----------
const args = process.argv.slice(2);
const arg = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const repo = arg("repo");
const dir = path.resolve(arg("dir") ?? ".");
const dryRun = args.includes("--dry-run");
if (!repo) throw new Error("--repo owner/name is required");

const git = (...a: string[]) => {
  try {
    return execFileSync("git", ["-C", dir, ...a], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch {
    return "";
  }
};

// ---------- what to sync ----------
const config = readJson<Config>("sync-config.json");
const target = config.projects.find((p) => p.repo.toLowerCase() === repo.toLowerCase());
if (!target) {
  console.log(`${repo} is not in data/sync-config.json — nothing to do.`);
  process.exit(0);
}
const state = readJson<State>("sync-state.json");
const after = arg("after") || git("rev-parse", "HEAD");
const afterShort = after.slice(0, 9);
let before = arg("before") || state[target.repo]?.lastSha || "";
if (before && /^0+$/.test(before)) before = "";
if (before && !git("cat-file", "-t", before)) before = ""; // not in history (force-push / shallow)
if (before && before === after) {
  console.log(`Already synced at ${afterShort}.`);
  process.exit(0);
}

// ---------- evidence ----------
const facts: Facts = countRepo(dir);
const range = before ? `${before}..${after}` : after;
const logArgs = before ? [range] : [after, "-n", "40"];
const commitLog = git("log", "--no-merges", "--format=- %cs %s%n%b", ...logArgs).replace(/\n{2,}/g, "\n").slice(0, 20_000);
const mergeLog = git("log", "--merges", "--format=- %cs %s", ...logArgs).slice(0, 6_000);
const diffstat = before ? git("diff", "--stat=160", range).split("\n").slice(-120).join("\n") : "";
const NOISE = [":(exclude)*.lock", ":(exclude)*package-lock.json", ":(exclude)*.png", ":(exclude)*.jpg", ":(exclude)*.svg", ":(exclude)**/android/**", ":(exclude)**/ios/**"];
const diff = before ? git("diff", "--unified=1", range, "--", ".", ...NOISE).slice(0, 140_000) : "";
const readme = ["README.md", "readme.md"].map((f) => path.join(dir, f)).find(existsSync);
const readmeText = readme ? readFileSync(readme, "utf8").slice(0, 10_000) : "";

const projects = readJson<Project[]>("projects.json");
const idx = projects.findIndex((p) => p.slug === target.slug);
if (idx < 0) throw new Error(`No project with slug "${target.slug}" in data/projects.json`);
const current = projects[idx];

// Only these fields may change. Everything else (name, links, screenshots, badges, honesty notes) is fixed.
const EDITABLE = ["tagline", "problem", "platforms", "tags", "proof", "layers", "decisions", "resumeBullets"] as const;
const editableNow = Object.fromEntries(EDITABLE.map((k) => [k, current[k]]));

// ---------- Claude ----------
const Tone = z.enum(["lime", "blue", "white", "grey"]);
const Output = z.object({
  contentChanged: z.boolean().describe("true if the portfolio text should change because of these commits"),
  whatsNew: z
    .object({
      title: z.string().describe("Short headline of what shipped, under 70 characters"),
      points: z.array(z.string()).describe("2-4 bullets, each one concrete shipped change, under 140 characters"),
    })
    .nullable()
    .describe("null when the commits are only chores (formatting, deps, typos, CI)"),
  update: z.object({
    tagline: z.string(),
    problem: z.string(),
    platforms: z.string(),
    tags: z.array(z.object({ label: z.string(), tone: Tone })),
    proof: z.array(z.object({ value: z.string(), label: z.string() })),
    layers: z.array(
      z.object({
        kind: z.enum(["backend", "frontend", "mobile", "infra"]),
        title: z.string(),
        points: z.array(z.string()),
        tech: z.string(),
      }),
    ),
    decisions: z.array(z.object({ title: z.string(), body: z.string() })),
    resumeBullets: z.array(z.string()),
  }),
});

const SYSTEM = `You maintain one project's entry on a software engineer's portfolio (Ritik Sharma — full-stack: Spring Boot, Express, Next.js, React Native).
A recruiter and an engineering manager will read it. They may open the repository to check claims, so accuracy beats hype.

Rules:
- Only claim what the code, commits or README show. Never invent users, traffic, revenue, ratings, team size or performance numbers.
- Every number you write in "proof" must be one of the counted facts given to you (or unchanged from the current entry). Do not round up or add "+".
- Keep the current entry's voice and structure. Change only what the new commits actually affect; keep good existing text verbatim.
- Never claim technology that is not in the code (for example AWS, AI/LLM, Kafka, Kubernetes, microservices) — if the current text claims something the code no longer shows, remove it.
- Plain, specific English. No buzzwords ("cutting-edge", "seamless", "robust", "leveraged"), no emoji.
- Lengths: tagline under 230 characters; problem 1-2 sentences; 3-5 points per layer, each under 150 characters; 2-4 proof items; 3 decisions (decision + trade-off); 1-2 resumeBullets under 260 characters each, starting with a past-tense verb.
- tags: 4-7 key technologies, tone "blue" for backend, "lime" for web/frontend, "white" for mobile, "grey" for data/infra.
- "whatsNew" describes what shipped in THESE commits for a reader of the site, not a list of file names.
- If the commits are only chores, set contentChanged=false, whatsNew=null and return the current entry unchanged.`;

const client = new Anthropic();
const userText = [
  `Project: ${current.name} (${target.repo}, branch ${target.branch}).`,
  `Synced commit range: ${before ? `${before.slice(0, 9)}..${afterShort}` : `first sync, up to ${afterShort}`}.`,
  `\n## Counted facts (the only numbers you may use)\n${JSON.stringify(facts, null, 2)}`,
  `\n## Current portfolio entry (editable fields)\n${JSON.stringify(editableNow, null, 2)}`,
  `\n## Fixed context you must stay consistent with\n${JSON.stringify({ name: current.name, kicker: current.kicker, badge: current.badge, note: current.note, live: current.live }, null, 2)}`,
  `\n## Merges in range\n${mergeLog || "(none)"}`,
  `\n## Commits in range\n${commitLog || "(none)"}`,
  diffstat && `\n## Diffstat\n${diffstat}`,
  diff && `\n## Diff (truncated)\n${diff}`,
  readmeText && `\n## README (truncated)\n${readmeText}`,
]
  .filter(Boolean)
  .join("\n");

async function ask() {
  // Test hook: SYNC_MOCK_FILE=answer.json runs validation and writing without calling the API.
  if (process.env.SYNC_MOCK_FILE) return Output.parse(JSON.parse(readFileSync(process.env.SYNC_MOCK_FILE, "utf8")));
  try {
    const res = await client.beta.messages.parse({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "high", format: betaZodOutputFormat(Output) },
      system: SYSTEM,
      messages: [{ role: "user", content: userText }],
    });
    if (res.stop_reason === "refusal") throw new Error(`Model declined: ${res.stop_details?.explanation ?? "no details"}`);
    if (res.stop_reason === "max_tokens") throw new Error("Model output was cut off (max_tokens).");
    if (!res.parsed_output) throw new Error("Model output did not match the schema.");
    console.log(`Claude: ${res.usage.input_tokens} in / ${res.usage.output_tokens} out tokens (${res.model}).`);
    return res.parsed_output;
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) throw new Error("ANTHROPIC_API_KEY is missing or invalid.");
    if (err instanceof Anthropic.RateLimitError) throw new Error("Rate limited by the Claude API — re-run the workflow later.");
    throw err;
  }
}

// ---------- validation ----------
const numbersIn = (s: string) => (s.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
const allowed = new Set<number>([
  ...Object.values(facts).flatMap((v) => (typeof v === "number" ? [v] : [])),
  ...current.proof.flatMap((p) => numbersIn(p.value)),
]);
function checkProof(next: Proof[]): { proof: Proof[]; dropped: string[] } {
  const dropped: string[] = [];
  const proof = next.filter((p) => {
    const ok = numbersIn(p.value).every((n) => allowed.has(n));
    if (!ok) dropped.push(`${p.value} ${p.label}`);
    return ok && p.value.trim() && p.label.trim();
  });
  return { proof: proof.length >= 2 ? proof.slice(0, 4) : current.proof, dropped };
}

const month = (d: string) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "";
function timeline(): string {
  const first = String(facts.firstCommit ?? ""), last = String(facts.lastCommit ?? "");
  const recent = last && Date.now() - Date.parse(last) < 45 * 86_400_000;
  const span = first ? `${month(first)} — ${recent ? "present" : month(last)}` : "";
  return [span, facts.commits ? `${facts.commits} commits` : ""].filter(Boolean).join(" · ") || String(current.timeline);
}

// ---------- run ----------
const out = await ask();
const notes: string[] = [];
const nextProject: Project = { ...current, timeline: timeline() };
if (out.contentChanged) {
  const { proof, dropped } = checkProof(out.update.proof);
  if (dropped.length) notes.push(`Dropped proof items with numbers not found in the code: ${dropped.join("; ")}`);
  Object.assign(nextProject, { ...out.update, proof });
  if (!out.update.resumeBullets.length) delete nextProject.resumeBullets;
}
projects[idx] = nextProject;

const changelog = readJson<Record<string, Entry[]>>("changelog.json");
if (out.whatsNew && out.whatsNew.points.length) {
  const entry: Entry = { date: new Date().toISOString().slice(0, 10), sha: afterShort, title: out.whatsNew.title, points: out.whatsNew.points.slice(0, 4) };
  changelog[target.slug] = [entry, ...(changelog[target.slug] ?? []).filter((e) => e.sha !== afterShort)].slice(0, 12);
}
state[target.repo] = { slug: target.slug, lastSha: after, syncedAt: new Date().toISOString() };

const summary = [
  `### ${current.name} synced to \`${afterShort}\``,
  out.whatsNew ? `**${out.whatsNew.title}**\n${out.whatsNew.points.map((p) => `- ${p}`).join("\n")}` : "_Only chores in this range — no What's new entry._",
  `Content changed: **${out.contentChanged ? "yes" : "no"}** · timeline: ${nextProject.timeline}`,
  `Proof: ${(nextProject.proof as Proof[]).map((p) => `${p.value} ${p.label}`).join(" · ")}`,
  `Counted facts: \`${JSON.stringify(facts)}\``,
  ...notes.map((n) => `> ${n}`),
].join("\n\n");

if (dryRun) {
  console.log(JSON.stringify({ project: nextProject, whatsNew: out.whatsNew }, null, 2));
} else {
  writeJson("projects.json", projects);
  writeJson("changelog.json", changelog);
  writeJson("sync-state.json", state);
}
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
writeFileSync(path.join(ROOT, ".sync-summary.md"), summary + "\n");
