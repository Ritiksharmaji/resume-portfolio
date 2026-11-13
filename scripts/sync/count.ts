// Deterministic code facts for a checked-out repository. No AI here:
// these numbers are what the portfolio is allowed to claim.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const SKIP = new Set([
  "node_modules", ".git", ".next", "dist", "build", "out", "target", ".gradle", "Pods",
  "vendor", "coverage", ".expo", "android/app/build", "release", "bin", "obj",
]);

function walk(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP.has(name) || name.startsWith(".")) continue;
    const full = path.join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, out);
    else if (st.size < 1_500_000) out.push(full);
  }
  return out;
}

const count = (text: string, re: RegExp) => (text.match(re) || []).length;

export type Facts = Record<string, number | string>;

export function countRepo(root: string): Facts {
  const files = walk(root);
  const rel = (f: string) => path.relative(root, f);
  const read = (f: string) => {
    try {
      return readFileSync(f, "utf8");
    } catch {
      return "";
    }
  };

  let springEndpoints = 0, controllers = 0, jpaEntities = 0, mongoDocuments = 0, javaTests = 0;
  let expressRoutes = 0, reactRoutes = 0, jsTests = 0;
  let nextPages = 0, flywayMigrations = 0;
  const screenNames = new Set<string>();

  for (const f of files) {
    const r = rel(f);
    const ext = path.extname(f);
    if (ext === ".java" || ext === ".kt") {
      const t = read(f);
      if (/@(Rest)?Controller\b/.test(t)) {
        controllers++;
        springEndpoints += count(t, /@(Get|Post|Put|Delete|Patch)Mapping\b/g);
        // method-level @RequestMapping(method = ...) only; class-level prefixes are not endpoints
        springEndpoints += count(t, /@RequestMapping\([^)]*method\s*=/g);
      }
      jpaEntities += count(t, /^\s*@Entity\b/gm);
      mongoDocuments += count(t, /^\s*@Document\b/gm);
      if (/src[\\/]test[\\/]/.test(r) && /(Test|Tests|IT)\.(java|kt)$/.test(f)) javaTests++;
    } else if ([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"].includes(ext)) {
      const base = path.basename(f);
      if (/\.(test|spec)\.[jt]sx?$/.test(base)) {
        jsTests++;
        continue;
      }
      if (/^page\.(t|j)sx?$/.test(base) && /(^|[\\/])app[\\/]/.test(r)) nextPages++;
      const isScreenFile =
        /Screen\.(t|j)sx?$/.test(base) || /(^|[\\/])screens[\\/]/.test(r);
      const looksMobile = /(^|[\\/])(apps|mobile|mobile_frontend[^\\/]*|app)[\\/]/i.test(r) || /screens/i.test(r);
      // Unique screen names, so a copied app (Expo + CLI port) isn't counted twice.
      if (isScreenFile && looksMobile && !/^index\./.test(base)) screenNames.add(base.replace(/\.[^.]+$/, ""));
      const t = read(f);
      expressRoutes += count(t, /\b(router|app|route)\s*\.\s*(get|post|put|patch|delete)\s*\(\s*['"`]/g);
      reactRoutes += count(t, /<Route\s[^>]*path=/g);
    } else if (ext === ".sql" && /^V\d+.*__.*\.sql$/.test(path.basename(f))) {
      flywayMigrations++;
    }
  }

  const git = (...args: string[]) => {
    try {
      return execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
    } catch {
      return "";
    }
  };
  const commits = Number(git("rev-list", "--count", "HEAD")) || 0;
  const firstCommit = git("log", "--reverse", "--format=%cs", "--max-parents=0").split("\n")[0] ?? "";
  const lastCommit = git("log", "-1", "--format=%cs");

  const facts: Facts = {
    commits,
    firstCommit,
    lastCommit,
    springEndpoints,
    springControllers: controllers,
    jpaEntities,
    mongoDocuments,
    flywayMigrations,
    expressRoutes,
    nextPages,
    reactRoutes,
    mobileScreens: screenNames.size,
    testFiles: javaTests + jsTests,
  };
  // Drop zeroes so the model is never tempted to mention them.
  for (const k of Object.keys(facts)) if (facts[k] === 0 || facts[k] === "") delete facts[k];
  return facts;
}

// CLI: npx tsx scripts/sync/count.ts <repo-dir>
if (process.argv[1] && path.basename(process.argv[1]).startsWith("count")) {
  console.log(JSON.stringify(countRepo(path.resolve(process.argv[2] ?? ".")), null, 2));
}
