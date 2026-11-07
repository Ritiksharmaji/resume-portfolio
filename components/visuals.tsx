import type { Project } from "@/data/projects";

// Pure-CSS 3D mockups, one per project type. Decorative only.

const browserBar = (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#3A3D4A" }} />
    ))}
    <span style={{ marginLeft: 12, flex: 1, height: 22, borderRadius: 6, background: "rgba(255,255,255,.06)" }} />
  </div>
);

function Dashboard() {
  return (
    <div style={{ minHeight: 440, perspective: 1400, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, boxSizing: "border-box", backgroundImage: "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "22px 22px", height: "100%" }}>
      <div style={{ width: "100%", maxWidth: 580, transform: "rotateY(-18deg) rotateX(8deg)", borderRadius: 16, border: "1px solid rgba(255,255,255,.18)", background: "#060912", boxShadow: "40px 50px 80px rgba(0,0,0,.6)", overflow: "hidden" }}>
        {browserBar}
        <div style={{ display: "flex", gap: 16, padding: 20 }}>
          <div style={{ width: "24%", display: "flex", flexDirection: "column", gap: 10, fontFamily: "var(--mono)", fontSize: 10, color: "#9A9DB0" }}>
            {["IMS", "LMS", "Exams", "Hiring"].map((m, i) => (
              <div key={m} style={{ padding: "7px 8px", borderRadius: 6, background: i === 0 ? "#D4FF24" : "rgba(255,255,255,.06)", color: i === 0 ? "#030407" : "#C9CBD8" }}>{m}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 10 }}>
              <div style={{ height: 64, borderRadius: 10, background: "rgba(212,255,36,.14)", border: "1px solid rgba(212,255,36,.3)" }} />
              <div style={{ height: 64, borderRadius: 10, background: "rgba(21,88,201,.25)", border: "1px solid rgba(21,88,201,.54)" }} />
              <div style={{ height: 64, borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }} />
            </div>
            <div style={{ height: 150, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "flex-end", gap: 8, padding: 14, boxSizing: "border-box" }}>
              {[30, 55, 42, 75, 62, 92].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? "#D4FF24" : "rgba(21,88,201,.9)", borderRadius: "4px 4px 0 0" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tenants() {
  const sites = ["school.onekampus.com", "shop.onekampus.com", "acme.co.in"];
  return (
    <div style={{ height: 360, perspective: 1200, display: "flex", alignItems: "center", justifyContent: "center", background: "#060912", backgroundImage: "linear-gradient(rgba(212,255,36,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,255,36,.08) 1px, transparent 1px)", backgroundSize: "32px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", width: 260, height: 200, transformStyle: "preserve-3d", transform: "rotateX(52deg) rotateZ(-36deg)" }}>
        {sites.map((s, i) => (
          <div key={s} style={{ position: "absolute", inset: 0, borderRadius: 14, border: `1px solid ${i === 2 ? "#D4FF24" : "rgba(236,237,243,.3)"}`, background: i === 2 ? "rgba(212,255,36,.12)" : "rgba(10,15,30,.95)", transform: `translateZ(${i * 55}px)`, fontFamily: "var(--mono)", fontSize: 11, color: i === 2 ? "#E8FF8A" : "#C9CBD8", padding: 12, boxSizing: "border-box" }}>
            {s}
            <div style={{ marginTop: 10, height: 8, width: "60%", borderRadius: 3, background: "rgba(255,255,255,.15)" }} />
            <div style={{ marginTop: 6, height: 8, width: "40%", borderRadius: 3, background: "rgba(255,255,255,.08)" }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 20, bottom: 20, fontFamily: "var(--mono)", fontSize: 12, color: "#DCE5FF", background: "rgba(10,15,30,.95)", border: "1px solid rgba(21,88,201,.9)", borderRadius: 10, padding: "8px 12px" }}>
        Host → tenant → TLS ✓
      </div>
    </div>
  );
}

function Phones({ lime = true }: { lime?: boolean }) {
  return (
    <div style={{ height: 360, perspective: 1200, display: "flex", alignItems: "center", justifyContent: "center", background: lime ? "#D4FF24" : "#1558C9", position: "relative", overflow: "hidden" }}>
      <div style={{ width: 150, height: 300, borderRadius: 30, background: "#030407", border: "6px solid #030407", transform: "rotateY(28deg) rotateX(10deg) translateX(30px) translateZ(-60px)", boxShadow: "-30px 40px 60px rgba(0,0,0,.35)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 8, padding: 14, boxSizing: "border-box" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "#9A9DB0" }}>listening now</div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: i === 0 ? "#D4FF24" : "rgba(255,255,255,.2)" }} />
            <span style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,.2)" }} />
          </div>
        ))}
        <div style={{ marginTop: "auto", height: 60, borderRadius: 12, background: "rgba(21,88,201,.63)" }} />
      </div>
      <div style={{ width: 160, height: 320, borderRadius: 32, background: "#030407", border: "6px solid #030407", transform: "rotateY(-22deg) rotateX(10deg) translateZ(40px)", boxShadow: "30px 50px 70px rgba(0,0,0,.45)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 10, padding: 16, boxSizing: "border-box" }}>
        <div style={{ height: 10, width: "60%", borderRadius: 3, background: "rgba(255,255,255,.35)" }} />
        <div style={{ height: 120, borderRadius: 16, background: "linear-gradient(135deg,#D4FF24,#7FA6F4)" }} />
        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.15)", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, width: "38%", background: "#D4FF24", borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, alignItems: "center", color: "#ECEDF3" }}>
          <span style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderRight: "10px solid #ECEDF3" }} />
          <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#D4FF24", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "11px solid #030407", marginLeft: 3 }} />
          </span>
          <span style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "10px solid #ECEDF3" }} />
        </div>
        <div style={{ marginTop: "auto", height: 36, borderRadius: 12, background: "#1558C9" }} />
      </div>
    </div>
  );
}

function Layers() {
  const rows = [
    { t: "mongodb · postgres ×3", c: "rgba(236,237,243,.3)", bg: "rgba(10,15,30,.95)", fg: "#9A9DB0" },
    { t: "user-svc · product-svc · order-svc", c: "#1558C9", bg: "rgba(21,88,201,.32)", fg: "#DCE5FF" },
    { t: "express api · stripe webhook", c: "#D4FF24", bg: "rgba(212,255,36,.14)", fg: "#E8FF8A" },
  ];
  return (
    <div style={{ minHeight: 440, height: "100%", perspective: 1200, display: "flex", alignItems: "center", justifyContent: "center", background: "#060912", backgroundImage: "linear-gradient(rgba(21,88,201,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(21,88,201,.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
      <div style={{ width: 280, height: 190, position: "relative", transformStyle: "preserve-3d", transform: "rotateX(56deg) rotateZ(-38deg)" }}>
        {rows.map((r, i) => (
          <div key={r.t} style={{ position: "absolute", inset: 0, borderRadius: 14, border: `1px solid ${r.c}`, background: r.bg, transform: `translateZ(${i * 60}px)`, fontFamily: "var(--mono)", fontSize: 11, color: r.fg, padding: 12, boxSizing: "border-box" }}>{r.t}</div>
        ))}
      </div>
    </div>
  );
}

function Pipeline() {
  const cols = [
    { t: "Applied", n: 3 },
    { t: "Interview", n: 2 },
    { t: "Offered", n: 1 },
  ];
  return (
    <div style={{ height: 360, perspective: 1200, display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0F1E", backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <div style={{ display: "flex", gap: 12, transform: "rotateY(-16deg) rotateX(10deg)", transformStyle: "preserve-3d" }}>
        {cols.map((c, ci) => (
          <div key={c.t} style={{ width: 110, borderRadius: 14, border: "1px solid rgba(255,255,255,.14)", background: "#060912", padding: 10, display: "flex", flexDirection: "column", gap: 8, transform: `translateZ(${ci * 30}px)`, boxShadow: "20px 30px 50px rgba(0,0,0,.5)" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: ci === 2 ? "#D4FF24" : "#9A9DB0" }}>{c.t}</div>
            {Array.from({ length: c.n }).map((_, i) => (
              <div key={i} style={{ borderRadius: 8, padding: 8, background: ci === 2 ? "rgba(212,255,36,.14)" : "rgba(255,255,255,.05)", border: `1px solid ${ci === 2 ? "rgba(212,255,36,.4)" : "rgba(255,255,255,.08)"}` }}>
                <div style={{ height: 6, width: "70%", borderRadius: 3, background: "rgba(255,255,255,.3)" }} />
                <div style={{ height: 5, width: "45%", borderRadius: 3, marginTop: 5, background: "rgba(255,255,255,.12)" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Storefront() {
  return (
    <div style={{ height: 360, perspective: 1200, display: "flex", alignItems: "center", justifyContent: "center", background: "#060912", overflow: "hidden" }}>
      <div style={{ width: "82%", maxWidth: 420, transform: "rotateY(18deg) rotateX(8deg)", borderRadius: 14, border: "1px solid rgba(255,255,255,.18)", background: "#0A0F1E", overflow: "hidden", boxShadow: "-30px 40px 70px rgba(0,0,0,.6)" }}>
        {browserBar}
        <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", padding: 8 }}>
              <div style={{ height: 44, borderRadius: 8, background: i % 3 === 0 ? "rgba(212,255,36,.25)" : "rgba(127,166,244,.2)" }} />
              <div style={{ height: 5, marginTop: 6, width: "70%", borderRadius: 3, background: "rgba(255,255,255,.25)" }} />
            </div>
          ))}
        </div>
        <div style={{ margin: "0 16px 16px", height: 30, borderRadius: 8, background: "#D4FF24", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, color: "#030407" }}>Pay with Stripe · ₹</div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div style={{ minHeight: 220, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 28, boxSizing: "border-box", background: "#060912" }}>
      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 4 ? "#D4FF24" : "rgba(255,255,255,.12)" }} />
          ))}
        </div>
        <div style={{ borderRadius: 10, border: "1px solid rgba(255,255,255,.14)", padding: 12, height: 70, position: "relative" }}>
          <div style={{ height: 6, width: "80%", borderRadius: 3, background: "rgba(255,255,255,.2)" }} />
          <div style={{ height: 6, width: "60%", marginTop: 6, borderRadius: 3, background: "rgba(255,255,255,.12)" }} />
          <span style={{ position: "absolute", right: 10, bottom: 8, fontFamily: "var(--mono)", fontSize: 10, color: "#D4FF24" }}>1,284 / 2,000</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  switch (type) {
    case "dashboard":
      return <Dashboard />;
    case "tenants":
      return <Tenants />;
    case "phones":
      return <Phones />;
    case "layers":
      return <Layers />;
    case "pipeline":
      return <Pipeline />;
    case "storefront":
      return <Storefront />;
    case "form":
      return <Form />;
  }
}
