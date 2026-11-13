# Ritik Sharma — Portfolio & Résumé

Next.js 16 portfolio built from the "3D Developer Portfolio" design.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Edit content (no design code needed)

| What | File |
|---|---|
| Name, contact, about, experience, education, achievements, GitHub stats | `data/profile.ts` |
| The 7 main projects + case studies (`/work/<slug>`) | `data/projects.ts` |
| Stack tabs + marquee | `data/stack.ts` |
| Lab (secondary projects) | `data/lab.ts` |
| One-page printable résumé | `app/resume/page.tsx` |

**Photo:** drop your photo at `public/photo.jpg` and set `photo: "/photo.jpg"` in `data/profile.ts`.

Every number on the site was counted from the repositories (controllers, entities, routes, screens, commits) in Nov 2026 — update them when the projects grow.

## Auto-update from project repos (free, no AI)

When a configured project repo merges to `main`, its `Notify portfolio` workflow pings this repo and
`.github/workflows/sync-project.yml` runs `scripts/sync/sync.mts`:

- **Numbers** (endpoints, entities, pages, screens, commits, timeline) are recounted from the code by `scripts/sync/count.ts`.
- **What's new** entries on the case study come from the merge titles on `main` — so write merge/PR titles as release notes,
  e.g. `Merge development into main: guest browsing, sign-in at checkout`.
- Descriptions and feature bullets are never changed automatically; edit `data/projects.json` for big new features.
- The result is published through a pull request that merges itself after `npm run build` passes, then Vercel redeploys.

Setup per project: add it to `data/sync-config.json`, copy `scripts/sync/templates/notify-portfolio.yml` into the project repo,
and add the secret `PORTFOLIO_DISPATCH_TOKEN` there. This repo needs `SOURCE_REPO_TOKEN` (read access to the project repos)
and the setting *Actions → General → Allow GitHub Actions to create and approve pull requests*.

Run locally: `npx tsx scripts/sync/sync.mts --repo Ritiksharmaji/dabba-platform --dir ../dabba-platform --dry-run`
