import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, type Layer } from "@/data/projects";
import { Nav } from "@/components/client";
import { Footer } from "@/components/sections";
import { ProjectVisual } from "@/components/visuals";
import { ArrowLeft, Lock } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  return { title: p ? `${p.name} — case study · Ritik Sharma` : "Case study" };
}

const layerStyle: Record<Layer["kind"], { border: string; bg: string; fg: string }> = {
  backend: { border: "rgba(21,88,201,.72)", bg: "rgba(21,88,201,.09)", fg: "#B9CCFF" },
  frontend: { border: "rgba(212,255,36,.4)", bg: "rgba(212,255,36,.04)", fg: "#E8FF8A" },
  mobile: { border: "rgba(236,237,243,.3)", bg: "rgba(255,255,255,.02)", fg: "#ECEDF3" },
  infra: { border: "rgba(127,166,244,.4)", bg: "rgba(127,166,244,.05)", fg: "#7FA6F4" },
};

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <div style={{ overflowX: "clip" }}>
      <Nav home={false} />
      <main>
        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 40, display: "flex", flexDirection: "column", gap: 28 }}>
          <Link href="/#work" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--text)", textDecoration: "none", fontSize: 15, padding: "12px 0", alignSelf: "flex-start" }}>
            <ArrowLeft /> All work
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <span className="eyebrow">case study · {p.code}</span>
            {p.badge && <span className="badge badge-muted">{p.badge}</span>}
          </div>
          <h1 className="serif" style={{ margin: 0, fontWeight: 800, fontSize: "clamp(44px, 7.4vw, 108px)", lineHeight: 0.95, letterSpacing: "-.02em" }}>{p.name}</h1>
          <p style={{ margin: 0, maxWidth: 760, fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.5, color: "var(--text-2)" }}>{p.problem}</p>
          <dl style={{ margin: "16px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: "1px solid rgba(255,255,255,.12)" }}>
            {[
              ["Role", p.role],
              ["Timeline", p.timeline],
              ["Platforms", p.platforms],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "22px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                <dt className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: 17 }}>{v}</dd>
              </div>
            ))}
            <div style={{ padding: "22px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              <dt className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>Links</dt>
              <dd style={{ margin: 0, fontSize: 17, display: "flex", gap: 16, flexWrap: "wrap" }}>
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>Live ↗</a>}
                {p.source ? (
                  <a href={p.source} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>GitHub ↗</a>
                ) : (
                  <span style={{ color: "var(--text-3)", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15 }}><Lock /> Private — demo on request</span>
                )}
              </dd>
            </div>
          </dl>
          {p.note && (
            <p style={{ margin: 0, border: "1px dashed rgba(212,255,36,.5)", borderRadius: 16, padding: "16px 20px", fontSize: 15, lineHeight: 1.6, color: "var(--text-4)", maxWidth: 900 }}>
              <span className="mono" style={{ color: "var(--lime)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", marginRight: 10 }}>Straight talk</span>
              {p.note}
            </p>
          )}
        </section>

        <section className="wrap" aria-hidden="true" style={{ paddingTop: 16, paddingBottom: 64 }}>
          <div style={{ borderRadius: 32, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", position: "relative" }}>
            <ProjectVisual type={p.visual} />
            <div className="mono" style={{ position: "absolute", left: 20, top: 20, background: "rgba(10,15,30,.95)", border: "1px solid rgba(21,88,201,.9)", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "var(--blue-4)", boxShadow: "0 20px 40px rgba(0,0,0,.5)" }}>{p.apiChip}</div>
          </div>
        </section>

        <section className="wrap section" style={{ paddingTop: 24 }}>
          <h2 className="h2" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>What I built, layer by layer.</h2>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(${p.layers.length > 3 ? 280 : 340}px, 100%), 1fr))`, gap: 20 }}>
            {p.layers.map((l) => {
              const s = layerStyle[l.kind];
              return (
                <div key={l.title} style={{ border: `1px solid ${s.border}`, borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 16, background: s.bg }}>
                  <div className="mono" style={{ fontSize: 13, color: s.fg }}>{l.kind}</div>
                  <div className="serif" style={{ fontSize: 24, fontWeight: 600 }}>{l.title}</div>
                  <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, fontSize: 16, lineHeight: 1.5, color: "var(--text-2)" }}>
                    {l.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="mono" style={{ marginTop: "auto", fontSize: 12, color: "var(--text-3)", lineHeight: 1.6 }}>{l.tech}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 80, display: "flex", flexWrap: "wrap", gap: 48 }}>
          <div style={{ flex: "1 1 320px", minWidth: 0 }}>
            <h2 className="h2" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.05 }}>Engineering decisions.</h2>
          </div>
          <ol style={{ flex: "999 1 560px", minWidth: 0, listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
            {p.decisions.map((d, k) => (
              <li key={d.title} style={{ display: "flex", gap: 28, padding: "28px 0", borderTop: "1px solid rgba(255,255,255,.12)", borderBottom: k === p.decisions.length - 1 ? "1px solid rgba(255,255,255,.12)" : undefined }}>
                <span className="serif" style={{ fontSize: 32, fontWeight: 800, color: "transparent", WebkitTextStroke: "1.5px var(--lime)", flex: "0 0 56px" }}>0{k + 1}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 600 }}>{d.title}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-3)" }}>{d.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ borderRadius: 32, background: "var(--lime)", color: "var(--ink)", padding: "clamp(28px, 5vw, 64px)", display: "flex", flexDirection: "column", gap: 36 }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, alignItems: "flex-end" }}>
              <h2 className="serif" style={{ margin: 0, fontWeight: 800, fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-.015em" }}>By the numbers.</h2>
              <span className="mono" style={{ fontSize: 13 }}>counted from the repository</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 32 }}>
              {p.proof.map((x) => (
                <div key={x.label} style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "2px solid var(--ink)", paddingTop: 18 }}>
                  <span className="serif" style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-.015em" }}>{x.value}</span>
                  <span style={{ fontSize: 16 }}>{x.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Link href={`/work/${next.slug}`} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, textDecoration: "none", color: "var(--text)", borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 40 }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--text-3)" }}>next project · {next.code}</span>
              <span className="serif" style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 800, letterSpacing: "-.02em" }}>{next.name} →</span>
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
