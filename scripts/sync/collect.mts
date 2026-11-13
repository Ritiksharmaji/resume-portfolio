// Runs INSIDE a project repo (its own workflow can always read its own code).
// Counts facts and turns merge titles on main into "What's new" entries, then
// writes a small JSON payload that is sent to the portfolio. No tokens needed to read code.
//
//   npx tsx collect.mts --repo Ritiksharmaji/dabba-platform --dir . \
//        --state <portfolio>/data/sync-state.json [--after <sha>] [--out payload.json]
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { countRepo, type Facts } from "./count";

export type Entry = { date: string; sha: string; title: string; points: string[] };
export type Payload = {
  v: 1;
  repo: string;
  after: string;
  before: string; // "" on the first sync
  facts: Facts;
  entries: Entry[];
};
type State = Record<string, { slug: string; lastSha: string; syncedAt: string }>;

const NOISE = /^(wip|chore|ci|build|style|bump|deps?|lint|format|typo|fix typo|update readme|readme|merge branch '|merge remote|initial commit|revert|test commit|temp)/i;
// Internal tweaks a site visitor shouldn't read about.
const INTERNAL = /\b(local ?(url|host)|localhost|\.env|env file|api url|base url|gitignore|lockfile|console\.log|debug|todo|notify portfolio|github actions?|workflows?|ci)\b/i;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const clean = (s: string) => cap(s.trim().replace(/\s+/g, " ").replace(/[.;]+$/, "")).slice(0, 140);

function itemsFromCommit(subject: string, body: string): string[] {
  // "Merge development into main: a, b, c"  →  a / b / c
  const intoMain = subject.match(/^Merge .+? into (?:main|master)\s*[:—-]\s*(.+)$/i);
  if (intoMain) return intoMain[1].split(/,\s+|;\s+/).map(clean).filter(Boolean);
  // "Merge pull request #12 from user/branch" + body "PR title"
  const pr = subject.match(/^Merge pull request #\d+ from [^/]+\/(.+)$/i);
  if (pr) {
    const title = body.split("\n").map((l) => l.trim()).find((l) => l && !/^co-authored-by:/i.test(l));
    // Only a real PR title counts; branch names are not release notes.
    return title && !/^(development|main|dev|master)$/i.test(title) ? [clean(title)] : [];
  }
  if (/^Merge /i.test(subject)) return [];
  return NOISE.test(subject) ? [] : [clean(subject.replace(/^(feat|fix|refactor|perf|docs)(\(.+?\))?!?:\s*/i, ""))];
}

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

/** Returns null when the portfolio is already synced at this commit. */
export function collect(opts: { repo: string; dir: string; after?: string; before?: string; state?: State }): Payload | null {
  const git = (...a: string[]) => {
    try {
      return execFileSync("git", ["-C", opts.dir, ...a], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
    } catch {
      return "";
    }
  };
  const after = opts.after || git("rev-parse", "HEAD");
  const known = opts.state
    ? Object.entries(opts.state).find(([k]) => k.toLowerCase() === opts.repo.toLowerCase())?.[1]?.lastSha
    : undefined;
  let before = opts.before || known || "";
  if (before && /^0+$/.test(before)) before = "";
  if (before && !git("cat-file", "-t", before)) before = ""; // not in history (force-push / shallow clone)
  if (before && before === after) return null;

  const SEP = "\u001f", END = "\u001e";
  const range = before ? [`${before}..${after}`] : [after, "-n", "30"];
  const raw = git("log", "--first-parent", `--format=%H${SEP}%cs${SEP}%P${SEP}%s${SEP}%b${END}`, ...range);

  // One entry per merge into main (newest first); direct commits are grouped into one entry.
  const entries: Entry[] = [];
  let loose: { sha: string; date: string; items: string[] } | null = null;
  for (const rec of raw.split(END)) {
    const [sha = "", date = "", parents = "", subject = "", body = ""] = rec.trim().split(SEP);
    if (!sha) continue;
    const items = keep(itemsFromCommit(subject, body));
    if (!items.length) continue;
    if (parents.trim().includes(" ")) entries.push(toEntry(sha, date, items));
    else if (loose) loose.items.push(...items);
    else loose = { sha, date, items: [...items] };
  }
  if (loose) {
    const l = loose;
    const at = entries.findIndex((e) => e.date < l.date);
    entries.splice(at < 0 ? entries.length : at, 0, toEntry(l.sha, l.date, keep(l.items)));
  }

  return {
    v: 1,
    repo: opts.repo,
    after,
    before,
    facts: countRepo(opts.dir),
    // First sync: only the most recent few releases, not the whole history.
    entries: (before ? entries : entries.slice(0, 4)).slice(0, 12),
  };
}

// ---------- CLI ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const arg = (n: string) => {
    const i = args.indexOf(`--${n}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const repo = arg("repo");
  if (!repo) throw new Error("--repo owner/name is required");
  const statePath = arg("state");
  const state = statePath && existsSync(statePath) ? (JSON.parse(readFileSync(statePath, "utf8")) as State) : {};
  const payload = collect({ repo, dir: path.resolve(arg("dir") ?? "."), after: arg("after"), before: arg("before"), state });
  const out = arg("out");
  if (!payload) {
    console.log("Portfolio is already synced at this commit — nothing to send.");
    if (out) writeFileSync(out, "");
  } else {
    const json = JSON.stringify(payload);
    if (out) writeFileSync(out, json);
    else console.log(json);
    console.log(`Collected ${payload.entries.length} What's new entr${payload.entries.length === 1 ? "y" : "ies"} and ${Object.keys(payload.facts).length} facts (${json.length} bytes).`);
  }
}
