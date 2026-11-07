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
