// Sync one project's portfolio content from its repository. No AI, no paid services.
//
//   npx tsx scripts/sync/sync.mts --repo Ritiksharmaji/dabba-platform --dir ../dabba-platform \
//        [--after <sha>] [--before <sha>] [--dry-run]
//
// 1. Counts facts from the checked-out code (scripts/sync/count.ts).
// 2. Updates the project's numbers ("proof") and timeline from those facts.
// 3. Builds a "What's new" entry from the merge / commit titles on main since the last sync.
// Descriptions, feature bullets and résumé lines are left as written by hand.
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { countRepo, type Facts } from "./count";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const DATA = (f: string) => path.join(ROOT, "data", f);
const readJson = <T,>(f: string): T => JSON.parse(readFileSync(DATA(f), "utf8")) as T;
const writeJson = (f: string, v: unknown) => writeFileSync(DATA(f), JSON.stringify(v, null, 2) + "\n");

type Proof = { value: string; label: string };
type Project = Record<string, unknown> & { slug: string; name: string; proof: Proof[]; timeline: string };
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
if (before && !git("cat-file", "-t", before)) before = ""; // not in history (force-push / shallow clone)
if (before && before === after) {
  console.log(`Already synced at ${afterShort}.`);
  process.exit(0);
}

const projects = readJson<Project[]>("projects.json");
const idx = projects.findIndex((p) => p.slug === target.slug);
if (idx < 0) throw new Error(`No project with slug "${target.slug}" in data/projects.json`);
const current = projects[idx];
const facts: Facts = countRepo(dir);

// ---------- 1. numbers ----------
// Each proof label is matched to the counted fact it describes. Labels with no
// matching fact (e.g. "backend modules", "pipeline stages") are left alone.
const num = (k: string) => (typeof facts[k] === "number" ? (facts[k] as number) : undefined);
const RULES: [RegExp, () => string | undefined][] = [
  [/^REST endpoints$/i, () => String(num("springEndpoints") ?? num("expressRoutes") ?? "") || undefined],
  [/^JPA entities$/i, () => num("jpaEntities")?.toString()],
  [/^(Mongo(DB)? )?(collections|documents|data models)$/i, () => num("mongoDocuments")?.toString()],
  [/^Prisma models$/i, () => undefined],
  [/^web pages \+ mobile screens$/i, () => (num("nextPages") && num("mobileScreens") ? `${num("nextPages")} + ${num("mobileScreens")}` : undefined)],
  [/^mobile screens \+ web pages$/i, () => (num("mobileScreens") && num("nextPages") ? `${num("mobileScreens")} + ${num("nextPages")}` : undefined)],
  [/^(mobile screens|screens per mobile app)$/i, () => num("mobileScreens")?.toString()],
  [/^web pages$/i, () => num("nextPages")?.toString()],
  [/^Flyway migrations$/i, () => num("flywayMigrations")?.toString()],
];
const numberChanges: string[] = [];
const proof = current.proof.map((p) => {
  const rule = RULES.find(([re]) => re.test(p.label.trim()));
  const value = rule?.[1]();
  if (value && value !== p.value) {
    numberChanges.push(`${p.label}: ${p.value} → ${value}`);
    return { ...p, value };
  }
  return p;
});

const month = (d: string) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "";
function timeline(): string {
  const first = String(facts.firstCommit ?? ""), last = String(facts.lastCommit ?? "");
  const recent = last && Date.now() - Date.parse(last) < 45 * 86_400_000;
  const span = first ? `${month(first)} — ${recent ? "present" : month(last)}` : "";
  return [span, facts.commits ? `${facts.commits} commits` : ""].filter(Boolean).join(" · ") || current.timeline;
}

// ---------- 2. What's new, from merge / commit titles on main ----------
const NOISE = /^(wip|chore|ci|build|style|bump|deps?|lint|format|typo|fix typo|update readme|readme|merge branch '|merge remote|initial commit|revert|test commit|temp)/i;
// Internal tweaks a site visitor shouldn't read about.
const INTERNAL = /\b(local ?(url|host)|localhost|\.env|env file|api url|base url|gitignore|lockfile|console\.log|debug|todo)\b/i;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const clean = (s: string) => cap(s.trim().replace(/\s+/g, " ").replace(/[.;]+$/, "")).slice(0, 140);

function itemsFromCommit(subject: string, body: string): string[] {
  // "Merge development into main: a, b, c"  →  a / b / c
  const intoMain = subject.match(/^Merge .+? into (?:main|master)\s*[:—-]\s*(.+)$/i);
  if (intoMain) return intoMain[1].split(/,\s+|;\s+/).map(clean).filter(Boolean);
  // "Merge pull request #12 from user/branch" + body "PR title"
  const pr = subject.match(/^Merge pull request #\d+ from [^/]+\/(.+)$/i);
  if (pr) {
    const title = body.split("\n").map((l) => l.trim()).find((l) => l && !/^co-authored-by:/i.test(l));
    // Only a real PR title counts; branch names ("development-branch-frontend-work") are not release notes.
    return title && !/^(development|main|dev|master)$/i.test(title) ? [clean(title)] : [];
  }
  if (/^Merge /i.test(subject)) return [];
  return NOISE.test(subject) ? [] : [clean(subject.replace(/^(feat|fix|refactor|perf|docs)(\(.+?\))?!?:\s*/i, ""))];
}

const SEP = "\u001f", END = "\u001e";
const logRange = before ? [`${before}..${after}`] : [after, "-n", "30"];
const raw = git("log", "--first-parent", `--format=%H${SEP}%cs${SEP}%P${SEP}%s${SEP}%b${END}`, ...logRange);
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const titleFor = (pts: string[]) =>
  pts.length === 1 ? pts[0] : pts.length === 2 ? `${pts[0]} and ${lower(pts[1])}` : `${pts[0]}, ${lower(pts[1])} and ${pts.length - 2} more`;
const keep = (list: string[]) => {
  const out: string[] = [];
  for (const it of list) {
    if (INTERNAL.test(it) || it.length < 4) continue;
    if (!out.some((x) => x.toLowerCase() === it.toLowerCase())) out.push(it);
  }
  return out;
};
const toEntry = (sha: string, date: string, items: string[]): Entry => ({
  date,
  sha: sha.slice(0, 9),
  title: titleFor(items),
  points: items.length === 1 ? [] : items.slice(0, 10),
});

// One entry per merge into main (newest first); direct commits are grouped into one entry.
const newEntries: Entry[] = [];
let loose: { sha: string; date: string; items: string[] } | null = null;
for (const rec of raw.split(END)) {
  const [sha = "", date = "", parents = "", subject = "", body = ""] = rec.trim().split(SEP);
  if (!sha) continue;
  const items = keep(itemsFromCommit(subject, body));
  if (!items.length) continue;
  if (parents.trim().includes(" ")) newEntries.push(toEntry(sha, date, items));
  else if (loose) loose.items.push(...items);
  else loose = { sha, date, items: [...items] };
}
if (loose) {
  const items = keep(loose.items);
  const entry = toEntry(loose.sha, loose.date, items);
  const at = newEntries.findIndex((e) => e.date < loose!.date);
  newEntries.splice(at < 0 ? newEntries.length : at, 0, entry);
}
// First sync: show only the most recent few releases, not the whole history.
const whatsNewList = before ? newEntries : newEntries.slice(0, 4);

// ---------- write ----------
const nextProject: Project = { ...current, proof, timeline: timeline() };
projects[idx] = nextProject;

const changelog = readJson<Record<string, Entry[]>>("changelog.json");
if (whatsNewList.length) {
  const shas = new Set(whatsNewList.map((e) => e.sha));
  changelog[target.slug] = [...whatsNewList, ...(changelog[target.slug] ?? []).filter((e) => !shas.has(e.sha))].slice(0, 12);
}
state[target.repo] = { slug: target.slug, lastSha: after, syncedAt: new Date().toISOString() };

const summary = [
  `### ${current.name} synced to \`${afterShort}\``,
  whatsNewList.length
    ? whatsNewList.map((e) => `**${e.date} — ${e.title}**${e.points.length ? "\n" + e.points.map((p) => `- ${p}`).join("\n") : ""}`).join("\n\n")
    : "_No user-facing merge or commit titles in this range — no What's new entry._",
  numberChanges.length ? `Numbers updated: ${numberChanges.join(" · ")}` : "Numbers unchanged.",
  `Timeline: ${nextProject.timeline}`,
  `Counted facts: \`${JSON.stringify(facts)}\``,
  "Descriptions and feature bullets are not changed automatically — edit data/projects.json when a project gains a big new feature.",
].join("\n\n");

if (dryRun) {
  console.log(JSON.stringify({ proof, timeline: nextProject.timeline, whatsNew: whatsNewList }, null, 2));
} else {
  writeJson("projects.json", projects);
  writeJson("changelog.json", changelog);
  writeJson("sync-state.json", state);
}
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
writeFileSync(path.join(ROOT, ".sync-summary.md"), summary + "\n");
