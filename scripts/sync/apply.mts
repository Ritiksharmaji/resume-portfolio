// Runs INSIDE the portfolio repo. Takes the payload a project repo sent
// (scripts/sync/collect.mts) and updates data/projects.json, data/changelog.json
// and data/sync-state.json. Never touches descriptions, links or screenshots.
//
//   npx tsx scripts/sync/apply.mts --payload payload.json [--dry-run]
//   npx tsx scripts/sync/apply.mts --event "$GITHUB_EVENT_PATH"     (repository_dispatch)
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Entry, Payload } from "./collect.mts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DATA = (f: string) => path.join(ROOT, "data", f);
const readJson = <T,>(f: string): T => JSON.parse(readFileSync(DATA(f), "utf8")) as T;
const writeJson = (f: string, v: unknown) => writeFileSync(DATA(f), JSON.stringify(v, null, 2) + "\n");

type Proof = { value: string; label: string };
type Project = Record<string, unknown> & { slug: string; name: string; proof: Proof[]; timeline: string };
type Config = { projects: { repo: string; slug: string; branch: string }[] };
type State = Record<string, { slug: string; lastSha: string; syncedAt: string }>;

// ---------- validation: the payload comes from another repo, so trust nothing ----------
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
function validate(raw: unknown): Payload {
  const p = raw as Partial<Payload>;
  if (!p || p.v !== 1 || typeof p.repo !== "string" || !/^[\w.-]+\/[\w.-]+$/.test(p.repo)) throw new Error("Invalid payload: repo");
  if (typeof p.after !== "string" || !/^[0-9a-f]{7,40}$/i.test(p.after)) throw new Error("Invalid payload: after");
  const facts: Payload["facts"] = {};
  for (const [k, v] of Object.entries(p.facts ?? {})) {
    if (!/^[a-zA-Z]{2,40}$/.test(k)) continue;
    if (typeof v === "number" && Number.isFinite(v) && v >= 0 && v < 1_000_000) facts[k] = Math.round(v);
    else if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) facts[k] = v;
  }
  const entries: Entry[] = (Array.isArray(p.entries) ? p.entries : []).slice(0, 12).flatMap((e) => {
    const date = str(e?.date, 10), sha = str(e?.sha, 40), title = str(e?.title, 200);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^[0-9a-f]{7,40}$/i.test(sha) || !title) return [];
    const points = (Array.isArray(e.points) ? e.points : []).slice(0, 10).map((x) => str(x, 200)).filter(Boolean);
    return [{ date, sha: sha.slice(0, 9), title, points }];
  });
  const before = typeof p.before === "string" && /^[0-9a-f]{7,40}$/i.test(p.before) ? p.before : "";
  return { v: 1, repo: p.repo, after: p.after, before, facts, entries };
}

export function apply(input: Payload, { dryRun = false } = {}): string | null {
  const payload = validate(input);
  const config = readJson<Config>("sync-config.json");
  const target = config.projects.find((p) => p.repo.toLowerCase() === payload.repo.toLowerCase());
  if (!target) {
    console.log(`${payload.repo} is not in data/sync-config.json — ignoring.`);
    return null;
  }
  const projects = readJson<Project[]>("projects.json");
  const idx = projects.findIndex((p) => p.slug === target.slug);
  if (idx < 0) throw new Error(`No project with slug "${target.slug}" in data/projects.json`);
  const current = projects[idx];
  const facts = payload.facts;

  // 1. Numbers: each proof label is matched to the counted fact it describes.
  // Labels with no matching fact (e.g. "backend modules") are left alone.
  const num = (k: string) => (typeof facts[k] === "number" ? (facts[k] as number) : undefined);
  const RULES: [RegExp, () => string | undefined][] = [
    [/^REST endpoints$/i, () => (num("springEndpoints") ?? num("expressRoutes"))?.toString()],
    [/^JPA entities$/i, () => num("jpaEntities")?.toString()],
    [/^(Mongo(DB)? )?(collections|documents|data models)$/i, () => num("mongoDocuments")?.toString()],
    [/^web pages \+ mobile screens$/i, () => (num("nextPages") && num("mobileScreens") ? `${num("nextPages")} + ${num("mobileScreens")}` : undefined)],
    [/^mobile screens \+ web pages$/i, () => (num("mobileScreens") && num("nextPages") ? `${num("mobileScreens")} + ${num("nextPages")}` : undefined)],
    [/^(mobile screens|screens per mobile app)$/i, () => num("mobileScreens")?.toString()],
    [/^web pages$/i, () => num("nextPages")?.toString()],
    [/^Flyway migrations$/i, () => num("flywayMigrations")?.toString()],
  ];
  const numberChanges: string[] = [];
  const proof = current.proof.map((p) => {
    const value = RULES.find(([re]) => re.test(p.label.trim()))?.[1]();
    if (value && value !== p.value) {
      numberChanges.push(`${p.label}: ${p.value} → ${value}`);
      return { ...p, value };
    }
    return p;
  });

  // 2. Timeline from the commit history.
  const month = (d: string) =>
    d ? new Date(`${d}T00:00:00Z`).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "";
  const first = String(facts.firstCommit ?? ""), last = String(facts.lastCommit ?? "");
  const recent = last && Date.now() - Date.parse(last) < 45 * 86_400_000;
  const span = first ? `${month(first)} — ${recent ? "present" : month(last)}` : "";
  const timeline = [span, facts.commits ? `${facts.commits} commits` : ""].filter(Boolean).join(" · ") || current.timeline;

  // 3. Write.
  projects[idx] = { ...current, proof, timeline };
  const changelog = readJson<Record<string, Entry[]>>("changelog.json");
  if (payload.entries.length) {
    const shas = new Set(payload.entries.map((e) => e.sha));
    changelog[target.slug] = [...payload.entries, ...(changelog[target.slug] ?? []).filter((e) => !shas.has(e.sha))].slice(0, 12);
  }
  const state = readJson<State>("sync-state.json");
  state[target.repo] = { slug: target.slug, lastSha: payload.after, syncedAt: new Date().toISOString() };

  const summary = [
    `### ${current.name} synced to \`${payload.after.slice(0, 9)}\``,
    payload.entries.length
      ? payload.entries.map((e) => `**${e.date} — ${e.title}**${e.points.length ? "\n" + e.points.map((p) => `- ${p}`).join("\n") : ""}`).join("\n\n")
      : "_No user-facing merge or commit titles in this range — no What's new entry._",
    numberChanges.length ? `Numbers updated: ${numberChanges.join(" · ")}` : "Numbers unchanged.",
    `Timeline: ${timeline}`,
    `Counted facts: \`${JSON.stringify(facts)}\``,
    "Descriptions and feature bullets are not changed automatically — edit data/projects.json when a project gains a big new feature.",
  ].join("\n\n");

  if (!dryRun) {
    writeJson("projects.json", projects);
    writeJson("changelog.json", changelog);
    writeJson("sync-state.json", state);
  }
  return summary;
}

// ---------- CLI ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const arg = (n: string) => {
    const i = args.indexOf(`--${n}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const event = arg("event"), file = arg("payload");
  const raw = event ? JSON.parse(readFileSync(event, "utf8")).client_payload : file ? JSON.parse(readFileSync(file, "utf8")) : null;
  if (!raw) throw new Error("--payload <file> or --event <GITHUB_EVENT_PATH> is required");
  const summary = apply(raw, { dryRun: args.includes("--dry-run") });
  if (summary) {
    console.log(summary);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
    writeFileSync(path.join(ROOT, ".sync-summary.md"), summary + "\n");
  }
}
