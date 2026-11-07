"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { stack } from "@/data/stack";
import { lab, type LabItem } from "@/data/lab";
import { profile, heroStats } from "@/data/profile";
import { projects } from "@/data/projects";
import { ArrowUpRight, Bolt, Close, Download, Lock, Menu } from "./icons";

/* ---------------- Nav ---------------- */
export function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const p = home ? "" : "/";
  const items = [
    ["About", "#about"],
    ["Stack", "#stack"],
    ["Work", "#work"],
    ["Lab", "#lab"],
    ["Experience", "#experience"],
    ["Education", "#education"],
  ];
  return (
    <header className={`nav no-print ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner" style={{ position: "relative" }}>
        <Link href="/#top" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "var(--text)" }}>
          <span className="cube" aria-hidden="true">
            <span>
              <i style={{ transform: "translateZ(15px)" }} />
              <i style={{ transform: "rotateY(180deg) translateZ(15px)" }} />
              <i style={{ transform: "rotateY(90deg) translateZ(15px)" }} />
              <i style={{ transform: "rotateY(-90deg) translateZ(15px)" }} />
              <i style={{ transform: "rotateX(90deg) translateZ(15px)", background: "rgba(212,255,36,.25)" }} />
              <i style={{ transform: "rotateX(-90deg) translateZ(15px)" }} />
            </span>
          </span>
          <span className="serif" style={{ fontWeight: 600, fontSize: 16, letterSpacing: ".02em" }}>ritik.sharma</span>
        </Link>
        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </button>
        <nav aria-label="Primary" className={`nav-links ${open ? "open" : ""}`}>
          {items.map(([l, h]) => (
            <a key={h} className="link" href={`${p}${h}`} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href={`${p}#contact`} className="btn btn-lime" style={{ padding: "12px 20px", fontSize: 15, marginLeft: 8, justifyContent: "center" }} onClick={() => setOpen(false)}>
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Stack tabs ---------------- */
export function StackTabs() {
  const [id, setId] = useState(stack[0].id);
  const cur = stack.find((s) => s.id === id)!;
  const count = cur.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      <div role="tablist" aria-label="Technology layers" className="tabs">
        {stack.map((s) => (
          <button key={s.id} role="tab" id={`tab-${s.id}`} aria-controls="stack-panel" aria-selected={s.id === id} className="tab" onClick={() => setId(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div id="stack-panel" role="tabpanel" aria-labelledby={`tab-${id}`} style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
        <div style={{ flex: "1 1 340px", minWidth: 0, border: "1px solid var(--line)", background: "var(--panel)", borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 22, position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", right: -60, bottom: -60, width: 240, height: 240, perspective: 600 }}>
            <div style={{ width: 240, height: 240, border: "1px solid rgba(212,255,36,.35)", borderRadius: 32, transform: "rotateX(55deg) rotateZ(35deg)", boxShadow: "0 0 0 24px rgba(212,255,36,.05), 0 0 0 48px rgba(212,255,36,.03)" }} />
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--text-3)" }}>{cur.kicker}</div>
          <div className="serif" style={{ fontWeight: 600, fontSize: 34, letterSpacing: "-.02em" }}>{cur.label}</div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--text-2)", position: "relative" }}>{cur.blurb}</p>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)" }}>Proven in</span>
            <span style={{ fontSize: 15, color: "var(--text)" }}>{cur.where}</span>
          </div>
          <div className="mono" style={{ marginTop: "auto", fontSize: 13, color: "var(--lime)", position: "relative" }}>{count} tools in this layer</div>
        </div>
        <div style={{ flex: "999 1 560px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 16 }}>
          {cur.groups.map((g) => (
            <div key={g.title} className="reveal" style={{ border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="mono" style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-3)" }}>{g.title}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((it) => (
                  <span key={it} className="pill">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------- Lab grid ---------------- */
const cats = ["All", "Web", "Mobile", "Backend", "Library"] as const;
export function LabGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const items = lab.filter((l) => cat === "All" || l.category === cat);
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 13, color: "var(--text-3)", marginRight: 6 }}>
          <span style={{ color: "var(--lime)" }}>$</span> ls ./lab --type
        </span>
        {cats.map((c) => (
          <button key={c} className="filter" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c.toLowerCase()}
          </button>
        ))}
      </div>
      <div className="lab-grid">
        {items.map((l) => (
          <LabCard key={l.repo} l={l} />
        ))}
      </div>
    </>
  );
}

function LabCard({ l }: { l: LabItem }) {
  return (
    <article className={`lab-card reveal ${l.size === "wide" ? "wide" : ""}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-3)" }}>
        <span>~/{l.repo}</span>
        <span style={{ color: "var(--lime)" }}>{l.category.toLowerCase()}</span>
      </div>
      <h3>{l.name}</h3>
      <p>{l.pitch}</p>
      <ul>
        {l.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
        {l.stack.map((s) => (
          <span key={s} className="chip" style={{ fontSize: 11 }}>{s}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
        {l.live && (
          <a href={l.live} target="_blank" rel="noreferrer" style={{ textDecoration: "none", padding: "8px 0" }}>live ↗</a>
        )}
        {!l.privateRepo ? (
          <a href={`https://github.com/Ritiksharmaji/${l.repo}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "var(--text-2)", padding: "8px 0" }}>source ↗</a>
        ) : (
          <span style={{ color: "var(--text-3)", display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 0" }}><Lock size={12} /> private repo</span>
        )}
      </div>
    </article>
  );
}

/* ---------------- Recruiter mode ---------------- */
export function RecruiterMode() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);
  const top = projects.slice(0, 5);
  return (
    <>
      <button className="btn btn-lime fab no-print" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <Bolt /> 30-second view
      </button>
      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="rm-title" className="drawer">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow">Recruiter view</span>
              <button className="nav-toggle" style={{ display: "inline-flex" }} aria-label="Close" onClick={() => setOpen(false)} autoFocus>
                <Close />
              </button>
            </div>
            <div>
              <h2 id="rm-title" className="serif" style={{ margin: 0, fontSize: 36, fontWeight: 600 }}>{profile.name}</h2>
              <p style={{ margin: "6px 0 0", color: "var(--text-2)" }}>
                {profile.role} · {profile.headline}
              </p>
              <p className="mono" style={{ margin: "10px 0 0", fontSize: 13, color: "var(--lime)", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="dot" /> {profile.status} · {profile.city}, {profile.country} · {profile.yearsShipping} years building
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 1, background: "var(--line)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)" }}>
              {heroStats.map((s) => (
                <div key={s.label} style={{ background: "var(--panel)", padding: 16 }}>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 800, color: "var(--lime)" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--text-4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>Now</span>
              <span>Executive Software Developer · Durolt <span style={{ color: "var(--text-3)" }}>(Aug 2025 — present)</span></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>Top projects</span>
              {top.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} onClick={() => setOpen(false)} style={{ textDecoration: "none", color: "var(--text)", border: "1px solid var(--line)", borderRadius: 14, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <b style={{ fontWeight: 600 }}>{p.name}</b>
                    <span className="mono" style={{ fontSize: 11, color: "var(--lime)" }}>{p.live ? "live" : p.privateRepo ? "private" : "code"}</span>
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>{p.proof.slice(0, 2).map((x) => `${x.value} ${x.label}`).join(" · ")}</span>
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--text-3)" }}>Core stack</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Java", "Spring Boot", "Node / Express", "TypeScript", "React", "Next.js", "React Native", "PostgreSQL", "MongoDB", "Docker", "AWS"].map((s) => (
                  <span key={s} className="pill" style={{ fontSize: 13 }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
              <a className="btn btn-lime" href={`mailto:${profile.email}`}>Email Ritik</a>
              <Link className="btn btn-ghost" href="/resume"><Download /> Résumé</Link>
              <a className="btn btn-ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function PrintButton() {
  return (
    <button className="btn btn-lime no-print" onClick={() => window.print()}>
      <Download /> Save as PDF
    </button>
  );
}
