// Local shortcut: collect + apply in one go, against a project checkout on this machine.
//
//   npx tsx scripts/sync/sync.mts --repo Ritiksharmaji/dabba-platform --dir ../dabba-platform [--dry-run]
//
// In GitHub Actions the two halves run in different repos:
//   project repo  → scripts/sync/collect.mts (via templates/notify-portfolio.yml)
//   portfolio     → scripts/sync/apply.mts   (via .github/workflows/sync-project.yml)
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collect } from "./collect.mjs";
import { apply } from "./apply.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const arg = (n: string) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const repo = arg("repo");
if (!repo) throw new Error("--repo owner/name is required");
const state = JSON.parse(readFileSync(path.join(ROOT, "data/sync-state.json"), "utf8"));
const payload = collect({ repo, dir: path.resolve(arg("dir") ?? "."), after: arg("after"), before: arg("before"), state });
if (!payload) console.log("Already synced at this commit.");
else console.log(apply(payload, { dryRun: args.includes("--dry-run") }) ?? "");
