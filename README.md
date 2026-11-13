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

When a configured project repo pushes to `main`, its **Notify portfolio** workflow
(`scripts/sync/templates/notify-portfolio.yml`) runs *in that repo*: it clones this public repo for
`scripts/sync/collect.mts`, counts facts in its own code and turns merge titles into "What's new"
entries, then sends that small payload here. `.github/workflows/sync-project.yml` applies it with
`scripts/sync/apply.mts`, builds, and publishes through a self-merging pull request; Vercel redeploys.

- **Numbers** (endpoints, entities, pages, screens, commits, timeline) come from `scripts/sync/count.ts`.
- **What's new** comes from merge titles on `main`, so write them as release notes, e.g.
  `Merge development into main: guest browsing, sign-in at checkout`.
- Descriptions and feature bullets are never changed automatically; edit `data/projects.json` for big features.

Add a project: add it to `data/sync-config.json`, copy the notify template to `.github/workflows/` in that repo,
and add the secret `PORTFOLIO_DISPATCH_TOKEN` there (fine-grained token, `resume-portfolio` only, Contents read/write).
This repo needs the setting *Actions → General → Allow GitHub Actions to create and approve pull requests*.
Re-run by hand from the project repo: Actions → Notify portfolio → Run workflow.

Run locally: `npx tsx scripts/sync/sync.mts --repo Ritiksharmaji/dabba-platform --dir ../dabba-platform --dry-run`
