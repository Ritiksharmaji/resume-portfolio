import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./visuals";

type Variant = "wide" | "half" | "hero";

const dims: Record<Variant, { h: number | string; browser: string; phone: number; tilt: string; pad: number }> = {
  wide: { h: "100%", browser: "min(560px, 86%)", phone: 112, tilt: "rotateY(-14deg) rotateX(6deg)", pad: 40 },
  half: { h: 380, browser: "min(440px, 80%)", phone: 92, tilt: "rotateY(-12deg) rotateX(6deg)", pad: 24 },
  hero: { h: "clamp(320px, 50vw, 660px)", browser: "min(740px, 88%)", phone: 150, tilt: "rotateX(10deg) rotateY(-18deg)", pad: 40 },
};

function Browser({ src, alt, host, sizes, eager }: { src: string; alt: string; host?: string; sizes: string; eager?: boolean }) {
  return (
    <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,.18)", background: "#060912", overflow: "hidden", boxShadow: "40px 50px 80px rgba(0,0,0,.55)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "#3A3D4A", flex: "none" }} />
        ))}
        <span className="mono" style={{ marginLeft: 10, flex: 1, minWidth: 0, height: 20, borderRadius: 6, background: "rgba(255,255,255,.06)", fontSize: 10, color: "#9A9DB0", display: "flex", alignItems: "center", padding: "0 10px", overflow: "hidden", whiteSpace: "nowrap" }}>
          {host}
        </span>
      </div>
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: "#0A0F1E" }}>
        <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

function Phone({ src, alt, w, eager }: { src: string; alt: string; w: number; eager?: boolean }) {
  return (
    <div style={{ width: "100%", aspectRatio: "9 / 19", borderRadius: "18% / 8.5%", border: `${Math.max(3, Math.round(w * 0.035))}px solid #1C1F2A`, background: "#030407", overflow: "hidden", position: "relative", boxShadow: "30px 40px 70px rgba(0,0,0,.6), 0 0 0 1px rgba(212,255,36,.4)" }}>
      <Image src={src} alt={alt} fill sizes={`${w * 2}px`} loading={eager ? "eager" : "lazy"} style={{ objectFit: "cover", objectPosition: "top" }} />
    </div>
  );
}

export function ProjectMedia({ p, variant }: { p: Project; variant: Variant }) {
  if (!p.shots) {
    return (
      <div aria-hidden="true" style={{ height: "100%" }}>
        <ProjectVisual type={p.visual} />
      </div>
    );
  }
  const d = dims[variant];
  const host = p.liveLabel ?? (p.privateRepo ? "private build · demo data" : "local build · demo data");
  const sizes = variant === "hero" ? "(max-width: 900px) 90vw, 860px" : "(max-width: 900px) 90vw, 600px";
  return (
    <div
      style={{
        position: "relative",
        height: d.h,
        minHeight: variant === "wide" ? 440 : undefined,
        perspective: 1600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: d.pad,
        boxSizing: "border-box",
        overflow: "hidden",
        background: variant === "hero" ? "#0A0F1E" : "transparent",
        backgroundImage:
          variant === "hero"
            ? "linear-gradient(rgba(212,255,36,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,36,.08) 1px, transparent 1px)"
            : "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
        backgroundSize: variant === "hero" ? "48px 48px" : "22px 22px",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", right: "-10%", top: "-20%", width: "70%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(21,88,201,.35), transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", width: d.browser, transform: d.tilt, transformStyle: "preserve-3d" }}>
        <Browser src={p.shots.cover} alt={`${p.name} — ${p.shots.caption}`} host={host} sizes={sizes} eager={variant === "hero"} />
        {p.shots.mobile && (
          <div style={{ position: "absolute", width: `min(${d.phone}px, 27%)`, right: "-5%", bottom: "-9%", transform: "translateZ(90px)" }}>
            <Phone src={p.shots.mobile} alt={`${p.name} on mobile`} w={d.phone} eager={variant === "hero"} />
          </div>
        )}
      </div>
    </div>
  );
}

export function Gallery({ p }: { p: Project }) {
  if (!p.shots || p.shots.gallery.length === 0) return null;
  return (
    <section className="wrap section" style={{ paddingTop: 24 }}>
      <div className="sec-head">
        <div>
          <div className="eyebrow">screens</div>
          <h2 className="h2" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>The product, up close.</h2>
        </div>
        <p className="lede" style={{ maxWidth: 380 }}>Real screenshots from the running app — not mockups.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: 20 }}>
        {p.shots.gallery.map((g) => (
          <figure key={g.src} className="card lift" style={{ margin: 0, borderRadius: 22 }}>
            <a href={g.src} target="_blank" rel="noreferrer" style={{ display: "block", position: "relative", aspectRatio: "16 / 10", background: "#060912" }}>
              <Image src={g.src} alt={g.caption} fill sizes="(max-width: 900px) 92vw, 620px" style={{ objectFit: "cover", objectPosition: "top" }} />
            </a>
            <figcaption className="mono" style={{ padding: "14px 18px", fontSize: 13, color: "var(--text-4)", borderTop: "1px solid var(--line)" }}>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
