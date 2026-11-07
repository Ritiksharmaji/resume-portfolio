import Link from "next/link";
import Image from "next/image";
import { profile, heroStats, experience, education, certifications, achievements, githubStats } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { marquee } from "@/data/stack";
import { ProjectMedia } from "./shots";
import { StackTabs, LabGrid } from "./client";
import { ArrowRight, ArrowUpRight, Download, Lock, IconFor } from "./icons";

const github = (p: Project) => p.source;

/* ---------------- Hero ---------------- */
export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy reveal">
          <div className="status-pill">
            <span className="dot" aria-hidden="true" />
            {profile.status} · {profile.city}, {profile.country}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, fontWeight: 600, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--text-4)" }}>
            <span aria-hidden="true" style={{ width: 32, height: 1, background: "var(--lime)" }} />
            Schema to screen
          </div>
          <h1 className="hero-name">
            <span className="a">{profile.first}</span>
            <span className="b">{profile.last}</span>
            <span className="c">Full-stack.</span>
          </h1>
          <p className="hero-intro">
            Full-stack engineer who ships the <strong>whole product</strong> — Spring Boot &amp; Express APIs, React &amp; Next.js frontends, and React Native apps for iOS and Android.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="#work" className="btn btn-lime">
              View selected work <ArrowRight />
            </a>
            <Link href="/resume" className="btn btn-ghost">
              <Download /> Download CV
            </Link>
          </div>
          <div className="legend">
            <span><i style={{ background: "var(--blue)" }} />backend</span>
            <span><i style={{ background: "var(--lime)" }} />frontend</span>
            <span><i style={{ border: "1.5px solid var(--text)" }} />mobile</span>
          </div>
        </div>
        <StackScene />
      </div>
      <div className="wrap" style={{ position: "relative", paddingBottom: 64 }}>
        <div className="proof-strip" aria-label="Key numbers">
          {heroStats.map((s) => (
            <div key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="mono" style={{ margin: "12px 4px 0", fontSize: 12, color: "var(--text-3)" }}>
          ↳ every number on this site is counted from the code itself — follow the links and check.
        </p>
      </div>
    </section>
  );
}

function StackScene() {
  const pillar = (left: number, top: number) => (
    <div style={{ position: "absolute", left, top, width: 1, height: 300, background: "rgba(236,237,243,.25)", transform: "translateZ(150px) rotateX(90deg)" }} />
  );
  return (
    <div className="scene" role="img" aria-label="A 3D stack of four layers: mobile, web, API and data">
      <div className="scene-stack">
        {pillar(0, -150)}
        {pillar(340, -150)}
        {pillar(0, 190)}
        {pillar(340, 190)}
        <div className="plate" style={{ transform: "translateZ(0)", border: "1px solid rgba(236,237,243,.28)", background: "rgba(10,15,30,.92)", justifyContent: "space-between", boxShadow: "0 60px 80px rgba(0,0,0,.6)" }}>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-3)" }}>04 / data</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10 }}>
            {["postgres", "mongo", "s3"].map((d) => (
              <div key={d} className="mono" style={{ height: 54, borderRadius: 10, border: "1px solid rgba(236,237,243,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--text-4)" }}>{d}</div>
            ))}
          </div>
        </div>
        <div className="plate" style={{ transform: "translateZ(100px)", border: "1px solid var(--blue)", background: "rgba(21,88,201,.25)", justifyContent: "space-between" }}>
          <div className="mono" style={{ fontSize: 13, color: "var(--blue-3)" }}>03 / api</div>
          <div className="mono" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "var(--blue-4)" }}>
            <div>GET&nbsp;&nbsp;/api/v1/courses</div>
            <div>POST /api/v1/auth/login</div>
            <div style={{ color: "var(--lime)" }}>200 OK · 38ms</div>
          </div>
        </div>
        <div className="plate" style={{ transform: "translateZ(200px)", border: "1px solid var(--lime)", background: "rgba(212,255,36,.10)", gap: 14 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#D4FF24" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(212,255,36,.5)" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(212,255,36,.25)" }} />
          </div>
          <div style={{ height: 14, width: "70%", borderRadius: 4, background: "rgba(212,255,36,.55)" }} />
          <div style={{ height: 10, width: "50%", borderRadius: 4, background: "rgba(212,255,36,.25)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, marginTop: "auto" }}>
            <div style={{ height: 70, borderRadius: 10, background: "rgba(212,255,36,.16)" }} />
            <div style={{ height: 70, borderRadius: 10, background: "rgba(212,255,36,.16)" }} />
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--lime-2)" }}>02 / web</div>
        </div>
        <div style={{ position: "absolute", left: 110, top: 40, width: 140, height: 260, transform: "translateZ(300px)", border: "1.5px solid var(--text)", background: "rgba(3,4,7,.85)", borderRadius: 26, padding: 14, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 0 40px rgba(212,255,36,.25)" }}>
          <div style={{ width: 40, height: 5, borderRadius: 3, background: "rgba(236,237,243,.4)", alignSelf: "center" }} />
          <div style={{ height: 60, borderRadius: 12, background: "var(--lime)" }} />
          <div style={{ height: 8, width: "80%", borderRadius: 3, background: "rgba(236,237,243,.45)" }} />
          <div style={{ height: 8, width: "55%", borderRadius: 3, background: "rgba(236,237,243,.25)" }} />
          <div className="mono" style={{ marginTop: "auto", fontSize: 11 }}>01 / mobile</div>
        </div>
      </div>
      <div className="code-chip" style={{ left: 0, top: 70, animation: "bob 6s ease-in-out infinite", color: "var(--blue-4)", border: "1px solid rgba(21,88,201,.9)" }}>@RestController</div>
      <div className="code-chip" style={{ right: 0, top: 160, animation: "bob 7s ease-in-out -2s infinite", color: "var(--lime-2)", border: "1px solid rgba(212,255,36,.5)" }}>&apos;use server&apos;</div>
      <div className="code-chip" style={{ left: 30, bottom: 90, animation: "bob 8s ease-in-out -4s infinite", border: "1px solid rgba(236,237,243,.3)" }}>io.on(&apos;connection&apos;, …)</div>
      <div className="code-chip" style={{ right: 20, bottom: 50, animation: "bob 6.5s ease-in-out -1s infinite", border: "1px solid rgba(236,237,243,.3)" }}>&lt;Stack.Screen /&gt;</div>
    </div>
  );
}

/* ---------------- Marquee ---------------- */
export function Marquee() {
  const row = marquee.flatMap((m) => [m, "✦"]);
  return (
    <div className="marquee" aria-hidden="true">
      <div>
        {[...row, ...row].map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <section id="about" className="wrap about">
      <div className="portrait-wrap" role="img" aria-label="Portrait card of Ritik Sharma">
        <div className="portrait">
          <div style={{ position: "absolute", inset: 0, borderRadius: 28, border: "1.5px solid var(--lime)", transform: "translateZ(-60px) translate(28px, 28px)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 28, background: "var(--panel)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "40px 60px 90px rgba(0,0,0,.6)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Image src={profile.photo} alt="" fill sizes="360px" style={{ objectFit: "cover" }} priority={false} />
            </div>
            <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="serif" style={{ fontWeight: 600, fontSize: 17 }}>{profile.name}</span>
                <span style={{ fontSize: 13, color: "var(--text-3)" }}>Full-stack engineer</span>
              </span>
              <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}>
                <ArrowUpRight />
              </span>
            </div>
          </div>
          <div style={{ position: "absolute", left: -48, top: 56, transform: "translateZ(80px)", background: "rgba(3,4,7,.92)", border: "1px solid rgba(212,255,36,.5)", borderRadius: 16, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 24px 48px rgba(0,0,0,.5)" }}>
            <span className="serif" style={{ fontWeight: 800, fontSize: 26, color: "var(--lime)" }}>{profile.yearsShipping}</span>
            <span style={{ fontSize: 12, color: "var(--text-4)" }}>years building software</span>
          </div>
          <div className="mono" style={{ position: "absolute", right: -44, bottom: 120, transform: "translateZ(110px)", background: "rgba(3,4,7,.92)", border: "1px solid rgba(21,88,201,.9)", borderRadius: 16, padding: "12px 16px", fontSize: 12, color: "var(--blue-4)", boxShadow: "0 24px 48px rgba(0,0,0,.5)" }}>
            API · Web · Mobile
          </div>
        </div>
      </div>
      <div style={{ flex: "1.2 1 480px", minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
        <div className="eyebrow">01 — about me</div>
        <h2 className="serif" style={{ margin: 0, fontWeight: 600, fontSize: "clamp(32px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-.015em" }}>
          I own the product from <span style={{ color: "var(--lime)" }}>schema</span> to <span style={{ color: "var(--blue-2)" }}>screen</span>.
        </h2>
        {profile.about.map((p) => (
          <p key={p} style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "var(--text-2)", textWrap: "pretty" }}>{p}</p>
        ))}
        <dl className="facts">
          {profile.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- Stack ---------------- */
export function Stack() {
  return (
    <section id="stack" className="wrap section">
      <div className="sec-head">
        <div>
          <div className="eyebrow">02 — the stack</div>
          <h2 className="h2">One engineer.<br />Every layer, every tool.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 380 }}>Pick a layer. Every tool listed is used in a real repo — and each layer says which projects prove it.</p>
      </div>
      <StackTabs />
    </section>
  );
}

/* ---------------- Work ---------------- */
function Tags({ p }: { p: Project }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {p.tags.map((t) => (
        <span key={t.label} className={`tag ${t.tone !== "grey" ? `tag-${t.tone}` : ""}`}>{t.label}</span>
      ))}
    </div>
  );
}
function Proof({ p, n = 4 }: { p: Project; n?: number }) {
  return (
    <div className="proof-row" style={{ "--n": Math.min(n, p.proof.length) } as React.CSSProperties}>
      {p.proof.slice(0, n).map((x) => (
        <div key={x.label}>
          <b>{x.value}</b>
          <span>{x.label}</span>
        </div>
      ))}
    </div>
  );
}
function Links({ p }: { p: Project }) {
  return (
    <div className="work-links">
      <Link href={`/work/${p.slug}`} style={{ fontWeight: 600 }}>Read case study →</Link>
      {p.live && <a className="muted" href={p.live} target="_blank" rel="noreferrer">Live ↗</a>}
      {github(p) ? (
        <a className="muted" href={github(p)} target="_blank" rel="noreferrer">Source ↗</a>
      ) : (
        <span className="lock"><Lock /> Private repo · walkthrough on request</span>
      )}
    </div>
  );
}
function Head({ p, big = false }: { p: Project; big?: boolean }) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 13, color: "var(--text-3)" }}>{p.code} · {p.kicker}</span>
        {p.live && <span className="badge" style={{ borderStyle: "solid" }}><span className="dot" style={{ width: 6, height: 6 }} />live</span>}
        {p.badge && <span className="badge badge-muted">{p.badge}</span>}
      </div>
      <h3 className="serif" style={{ margin: 0, fontWeight: 600, fontSize: big ? 40 : 28, letterSpacing: "-.02em" }}>{p.name}</h3>
      <p style={{ margin: 0, fontSize: big ? 17 : 16, lineHeight: 1.6, color: "var(--text-2)" }}>{p.tagline}</p>
    </>
  );
}

function WideCard({ p, flip = false }: { p: Project; flip?: boolean }) {
  return (
    <article className="card" style={{ display: "flex", flexWrap: "wrap", flexDirection: flip ? "row-reverse" : "row" }}>
      <div style={{ flex: "1 1 380px", minWidth: 0, padding: "clamp(24px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: 20 }}>
        <Head p={p} big />
        <Proof p={p} />
        <Tags p={p} />
        <Links p={p} />
      </div>
      <div style={{ flex: "1.4 1 480px", minWidth: 0 }}>
        <ProjectMedia p={p} variant="wide" />
      </div>
    </article>
  );
}
function HalfCard({ p }: { p: Project }) {
  return (
    <article className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <ProjectMedia p={p} variant="half" />
      </div>
      <div style={{ padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        <Head p={p} />
        <Proof p={p} />
        <Tags p={p} />
        <Links p={p} />
      </div>
    </article>
  );
}
function SlimCard({ p }: { p: Project }) {
  return (
    <article className="card" style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ flex: "2 1 420px", minWidth: 0, padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column", gap: 16 }}>
        <Head p={p} />
        <Tags p={p} />
        <Links p={p} />
      </div>
      <div style={{ flex: "1 1 300px", minWidth: 0 }}>
        <ProjectMedia p={p} variant="half" />
      </div>
    </article>
  );
}

export function Work() {
  const [a, b, c, d, e, f, g] = projects;
  return (
    <section id="work" className="wrap section">
      <div className="sec-head">
        <div>
          <div className="eyebrow">03 — selected work</div>
          <h2 className="h2">Products, end to end.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 420 }}>Seven products I designed, built and shipped. Each card shows what the code actually contains — not adjectives.</p>
      </div>
      <WideCard p={a} />
      <div className="grid-2">
        <HalfCard p={b} />
        <HalfCard p={c} />
      </div>
      <WideCard p={d} flip />
      <div className="grid-2">
        <HalfCard p={e} />
        <HalfCard p={f} />
      </div>
      <SlimCard p={g} />
    </section>
  );
}

/* ---------------- Architecture ---------------- */
const arch = [
  { t: "Clients", items: [{ l: "Next.js / React web", s: "lime" }, { l: "React Native app", s: "white" }] },
  { t: "Edge", items: [{ l: "Caddy · auto-HTTPS", s: "" }, { l: "Cloudflare · custom domains", s: "" }, { l: "Auth · JWT + refresh", s: "" }] },
  { t: "Services", items: [{ l: "Spring Boot / Modulith", s: "blue" }, { l: "Express + Socket.IO", s: "blue" }, { l: "Webhooks · cron jobs", s: "dash" }] },
  { t: "Data", items: [{ l: "PostgreSQL · MySQL", s: "" }, { l: "MongoDB", s: "" }, { l: "S3 · Cloudinary", s: "" }] },
];
const boxStyle = (s: string): React.CSSProperties => ({
  border: s === "lime" ? "1px solid var(--lime)" : s === "blue" ? "1px solid var(--blue)" : s === "dash" ? "1px dashed rgba(236,237,243,.3)" : s === "white" ? "1px solid rgba(236,237,243,.4)" : "1px solid rgba(236,237,243,.25)",
  background: s === "lime" ? "rgba(212,255,36,.08)" : s === "blue" ? "rgba(21,88,201,.18)" : "transparent",
  borderRadius: 14,
  padding: 16,
  fontWeight: 600,
});
const principles = [
  { t: "One API, every client", b: "Web and mobile share one contract, so both ship in parallel.", seen: "oneKampus · Shopvra · JobHook · Music" },
  { t: "Secure by default", b: "JWT with refresh, bcrypt, role guards, HMAC-verified webhooks and rate limits.", seen: "oneKampus · site-auto-matrix · Shopvra" },
  { t: "Boundaries before services", b: "Modules with their own schemas and boundary tests — split into services only when it pays.", seen: "oneKampus · Shopvra services" },
  { t: "Cheap to run", b: "Dockerised, tuned to fit 1 GB servers, deployed by CI or one script.", seen: "site-auto-matrix · Music · oneKampus" },
];
export function Architecture() {
  return (
    <section id="arch" className="wrap section">
      <div className="sec-head">
        <div>
          <div className="eyebrow">04 — how I build</div>
          <h2 className="h2">From tap to table.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 420 }}>The shape my systems take — every box is something I&apos;ve designed, written and deployed myself.</p>
      </div>
      <div style={{ border: "1px solid var(--line)", borderRadius: 28, padding: "clamp(20px, 3vw, 40px)", background: "var(--ink-2)", backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "24px 24px", display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
        {arch.map((col, i) => (
          <div key={col.t} style={{ display: "contents" }}>
            {i > 0 && (
              <div aria-hidden="true" style={{ flex: "0 0 56px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)" }}>
                <svg width="48" height="16" viewBox="0 0 48 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 8h44M38 2l6 6-6 6" /></svg>
              </div>
            )}
            <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 12, padding: 8 }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)" }}>{col.t}</div>
              {col.items.map((it) => (
                <div key={it.l} style={boxStyle(it.s)}>{it.l}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 16 }}>
        {principles.map((p, i) => (
          <li key={p.t} style={{ borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="serif" style={{ fontSize: 40, fontWeight: 800, color: "transparent", WebkitTextStroke: "1.5px var(--lime)" }}>0{i + 1}</span>
            <span style={{ fontSize: 19, fontWeight: 600 }}>{p.t}</span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-3)" }}>{p.b}</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--lime-2)" }}>seen in → {p.seen}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- Lab ---------------- */
export function Lab() {
  const total = githubStats.languages;
  return (
    <section id="lab" className="wrap section">
      <div className="sec-head">
        <div>
          <div className="eyebrow">05 — the lab</div>
          <h2 className="h2">More builds, fewer slides.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 420 }}>Earlier products, experiments and a published library — the repos where I learned what the main projects needed.</p>
      </div>
      <div className="lab-shell">
        <div className="lab-bar">
          <i /> <i /> <i />
          <span style={{ marginLeft: 10 }}>ritik@github: ~/lab</span>
        </div>
        <div className="lab-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 14 }}>
            {[
              [String(githubStats.repos), "public repositories"],
              [String(githubStats.contributions), "contributions, last 12 months"],
              [`${githubStats.since}`, "on GitHub since"],
            ].map(([v, l]) => (
              <div key={l} className="mono" style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ fontSize: 28, color: "var(--lime)" }}>{v}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)" }}>{l}</div>
              </div>
            ))}
            <div className="mono" style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
              <div className="langbar" role="img" aria-label={total.map((l) => `${l.name} ${l.pct}%`).join(", ")}>
                {total.map((l) => (
                  <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", fontSize: 11, color: "var(--text-4)" }}>
                {total.map((l) => (
                  <span key={l.name} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                    {l.name} {l.pct}%
                  </span>
                ))}
              </div>
            </div>
          </div>
          <LabGrid />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */
export function Experience() {
  return (
    <section id="experience" className="wrap section" style={{ gap: 40 }}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">06 — experience</div>
          <h2 className="h2">Where I&apos;ve shipped.</h2>
        </div>
        <Link href="/resume" className="btn btn-ghost" style={{ fontSize: 15 }}>
          <Download /> Full résumé (PDF)
        </Link>
      </div>
      <div>
        {experience.map((x) => (
          <div key={x.period} className="xp-row">
            <span className="mono" style={{ flex: "0 0 180px", fontSize: 14, color: "var(--text-3)" }}>{x.period}</span>
            <span style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="serif" style={{ fontSize: 24, fontWeight: 600 }}>{x.role}</span>
              <span style={{ fontSize: 16, color: "var(--text-2)" }}>{x.company}</span>
            </span>
            <span style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-2)" }}>{x.summary}</span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {x.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Education ---------------- */
export function Education() {
  return (
    <section id="education" className="wrap section" style={{ gap: 40 }}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">07 — education &amp; certifications</div>
          <h2 className="h2">The foundations.</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
        <article className="card lift" style={{ flex: "1 1 440px", minWidth: 0, padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", right: 28, top: 28, width: 120, height: 120, perspective: 500 }}>
            <div style={{ width: 120, height: 120, position: "relative", transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-40deg)" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid rgba(236,237,243,.25)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid rgba(21,88,201,.9)", background: "rgba(21,88,201,.14)", transform: "translateZ(22px)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: 16, border: "1px solid var(--lime)", background: "rgba(212,255,36,.12)", transform: "translateZ(44px)" }} />
            </div>
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-3)" }}>{education.period}</div>
          <h3 className="serif" style={{ margin: 0, fontWeight: 600, fontSize: 28, letterSpacing: "-.02em", lineHeight: 1.2, maxWidth: "75%" }}>{education.degree}</h3>
          <div style={{ fontSize: 17, color: "var(--text-2)" }}>{education.school}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
            <span className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>Core subjects</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {education.subjects.map((s) => (
                <span key={s} className="pill">{s}</span>
              ))}
            </div>
          </div>
        </article>
        <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {certifications.map((c) => {
            const inner = (
              <>
                <span aria-hidden="true" style={{ flex: "0 0 52px", height: 52, borderRadius: 14, border: "1px solid rgba(21,88,201,.9)", background: "rgba(21,88,201,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-3)" }}>
                  <IconFor name={c.icon} size={24} />
                </span>
                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{c.title}</span>
                  <span style={{ fontSize: 14, color: "var(--text-3)" }}>{c.issuer}{c.year ? ` · ${c.year}` : ""}</span>
                </span>
                {c.href && <span aria-hidden="true" style={{ color: "var(--lime)", fontSize: 18 }}>↗</span>}
              </>
            );
            const st: React.CSSProperties = { textDecoration: "none", color: "var(--text)", border: "1px solid var(--line)", background: "var(--panel)", borderRadius: 22, padding: "24px 26px", display: "flex", alignItems: "center", gap: 20 };
            return c.href ? (
              <a key={c.title} className="lift" href={c.href} target="_blank" rel="noreferrer" style={st}>{inner}</a>
            ) : (
              <div key={c.title} className="lift" style={st}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */
export function Achievements() {
  const colors = ["var(--lime)", "var(--blue-2)", "var(--text)", "var(--lime)"];
  return (
    <section id="achievements" className="wrap section" style={{ gap: 40 }}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">08 — beyond the job</div>
          <h2 className="h2">The work I do for fun.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 400 }}>Open source, daily problem solving and running my own production servers.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 16 }}>
        {achievements.map((a, i) => (
          <a key={a.title} href={a.href} target="_blank" rel="noreferrer" className="card lift" style={{ borderRadius: 24, padding: 30, display: "flex", flexDirection: "column", gap: 16, textDecoration: "none", color: "var(--text)" }}>
            <span aria-hidden="true" style={{ color: colors[i] }}><IconFor name={a.icon} /></span>
            <span className="mono" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>{a.kicker}</span>
            <span className="serif" style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>{a.title}</span>
            <span style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-3)" }}>{a.body}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact + footer ---------------- */
export function Contact() {
  const L = profile.links;
  const pad = (s: string) => s.padEnd(9, " ");
  return (
    <section id="contact" className="wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ borderRadius: 36, background: "var(--blue)", color: "#fff", padding: "clamp(28px, 5vw, 72px)", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, perspective: 800 }}>
          <div style={{ width: 320, height: 320, border: "2px solid rgba(212,255,36,.45)", borderRadius: "50%", transform: "rotateX(65deg)", boxShadow: "0 0 0 40px rgba(255,255,255,.05)" }} />
        </div>
        <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          <div className="eyebrow">09 — contact</div>
          <h2 className="serif" style={{ margin: 0, fontWeight: 800, fontSize: "clamp(40px, 5.6vw, 80px)", lineHeight: 0.98, letterSpacing: "-.02em" }}>Let&apos;s build the whole thing.</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: 480 }}>API, web app, mobile app — one person accountable for all of it. Hiring for a full-stack or mobile role? Let&apos;s talk.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={`mailto:${profile.email}`} className="btn btn-lime">Email me</a>
            <a href={L.linkedin} target="_blank" rel="noreferrer" className="btn" style={{ border: "1.5px solid #fff", color: "#fff" }}>Connect on LinkedIn</a>
          </div>
        </div>
        <div style={{ flex: "1 1 400px", minWidth: 0, perspective: 1200, position: "relative" }}>
          <div className="mono" style={{ background: "var(--ink)", color: "var(--text)", borderRadius: 20, padding: 28, fontSize: "clamp(12px, 1.4vw, 15px)", lineHeight: 2, transform: "rotateY(-10deg) rotateX(6deg)", boxShadow: "30px 40px 60px rgba(3,4,7,.35)", overflowWrap: "anywhere" }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#3A3D4A" }} />
              ))}
            </div>
            <div><span style={{ color: "var(--lime)" }}>$</span> ritik --contact</div>
            <div><span style={{ color: "var(--text-3)" }}>{pad("email")}</span><a href={`mailto:${profile.email}`} style={{ color: "var(--text)", textDecoration: "none" }}>{profile.email}</a></div>
            <div><span style={{ color: "var(--text-3)" }}>{pad("phone")}</span><a href={`tel:${profile.phone.replace(/-/g, "")}`} style={{ color: "var(--text)", textDecoration: "none" }}>{profile.phone}</a></div>
            <div><span style={{ color: "var(--text-3)" }}>{pad("github")}</span><a href={L.github} style={{ color: "var(--text)", textDecoration: "none" }}>github.com/Ritiksharmaji</a></div>
            <div><span style={{ color: "var(--text-3)" }}>{pad("linkedin")}</span><a href={L.linkedin} style={{ color: "var(--text)", textDecoration: "none" }}>linkedin.com/in/ritiksharmaji</a></div>
            <div>
              <span style={{ color: "var(--text-3)" }}>{pad("status")}</span>
              <span style={{ color: "var(--lime)" }}>open to work</span>{" "}
              <span style={{ display: "inline-block", width: 9, height: 18, background: "var(--lime)", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const L = profile.links;
  return (
    <footer className="wrap no-print" style={{ paddingTop: 32, paddingBottom: 96, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, fontSize: 14, color: "var(--text-3)" }}>
      <span>© 2026 Ritik Sharma · built with Next.js</span>
      <nav aria-label="Social" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <a href={L.github} style={{ color: "var(--text-2)", textDecoration: "none" }}>GitHub</a>
        <a href={L.linkedin} style={{ color: "var(--text-2)", textDecoration: "none" }}>LinkedIn</a>
        <a href={L.scaler} style={{ color: "var(--text-2)", textDecoration: "none" }}>Scaler</a>
      </nav>
    </footer>
  );
}
