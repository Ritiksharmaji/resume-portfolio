import type { ChangelogEntry } from "@/data/projects";

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

// Written by the sync workflow (scripts/sync) each time the project repo merges to main.
export function WhatsNew({ entries, repo }: { entries: ChangelogEntry[]; repo?: string }) {
  if (!entries.length) return null;
  return (
    <section className="wrap section" style={{ paddingTop: 24 }}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">what&apos;s new</div>
          <h2 className="h2" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>Still shipping.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 380 }}>Updated automatically from the repository each time work merges to main.</p>
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
        {entries.map((e, i) => (
          <li key={e.sha} style={{ display: "flex", flexWrap: "wrap", gap: "12px 40px", padding: "26px 0", borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: i === entries.length - 1 ? "1px solid rgba(255,255,255,.12)" : undefined }}>
            <span className="mono" style={{ flex: "0 0 170px", fontSize: 13, color: "var(--text-3)", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: i === 0 ? "var(--lime)" : "var(--text-3)" }}>
                {i === 0 && <span className="dot" aria-hidden="true" style={{ width: 7, height: 7 }} />}
                {fmt(e.date)}
              </span>
              {repo ? (
                <a href={`https://github.com/${repo}/commit/${e.sha}`} target="_blank" rel="noreferrer" style={{ color: "var(--text-3)", textDecoration: "none", fontSize: 12 }}>{e.sha} ↗</a>
              ) : (
                <span style={{ fontSize: 12 }}>{e.sha}</span>
              )}
            </span>
            <span style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 19, fontWeight: 600 }}>{e.title}</span>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6, fontSize: 15, lineHeight: 1.55, color: "var(--text-2)" }}>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
