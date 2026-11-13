import type { Metadata } from "next";
import Link from "next/link";
import { profile, experience, education } from "@/data/profile";
import { projects } from "@/data/projects";
import { PrintButton } from "@/components/client";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = { title: "Résumé · Ritik Sharma" };

const skills: [string, string][] = [
  ["Languages", "Java, TypeScript, JavaScript, SQL"],
  ["Backend", "Spring Boot (3/4), Spring Security, Spring Data JPA/MongoDB, Spring Modulith, Flyway, Node.js, Express, Socket.IO"],
  ["Frontend", "React, Next.js (App Router, Server Actions), Angular, Redux Toolkit, Zustand, TanStack Query, Tailwind, MUI"],
  ["Mobile", "React Native (CLI & Expo), Expo Router, React Navigation, EAS builds"],
  ["Data", "PostgreSQL, MySQL, MongoDB, Prisma, AWS S3"],
  ["DevOps", "Docker, Caddy, AWS Lightsail, Cloudflare, GitHub Actions, Vercel, Render"],
  ["Practices", "REST API design, JWT/OAuth2, Stripe webhooks, WebSockets (STOMP, Socket.IO), modular monoliths, microservices, JUnit, Vitest, DSA"],
];



export default function Resume() {
  const list = projects.filter((p) => p.resumeBullets?.length);
  return (
    <div style={{ background: "#e9eaee", minHeight: "100vh", padding: "24px 12px" }}>
      <div className="no-print" style={{ maxWidth: 820, margin: "0 auto 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#030407", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", padding: "12px 0" }}>
          <ArrowLeft /> Back to portfolio
        </Link>
        <PrintButton />
      </div>
      <article
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: "#fff",
          color: "#14151a",
          padding: "40px 44px",
          boxSizing: "border-box",
          fontFamily: "var(--sans)",
          fontSize: 11.5,
          lineHeight: 1.45,
          boxShadow: "0 10px 40px rgba(0,0,0,.12)",
        }}
      >
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", borderBottom: "2px solid #14151a", paddingBottom: 12 }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <h1 className="serif" style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: "-.01em" }}>{profile.name}</h1>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1558C9" }}>Full-stack Developer · Java / Spring Boot · React / Next.js · React Native</div>
          </div>
          <div style={{ flex: "0 0 auto", textAlign: "right", fontSize: 10.5, color: "#444" }}>
            <div>{profile.city}, {profile.country} · {profile.phone}</div>
            <div><a href={`mailto:${profile.email}`} style={{ color: "#14151a" }}>{profile.email}</a></div>
            <div>
              <a href={profile.links.linkedin} style={{ color: "#14151a" }}>linkedin.com/in/ritiksharmaji</a> · <a href={profile.links.github} style={{ color: "#14151a" }}>github.com/Ritiksharmaji</a>
            </div>
          </div>
        </header>

        <p style={{ margin: "12px 0 0" }}>
          Full-stack developer who builds and deploys complete products — Spring Boot and Express APIs, Next.js web apps and React Native mobile apps. 7 products shipped end-to-end, 5 live in production, self-hosted on AWS. Currently building the Smart Locker platform at Durolt.
        </p>

        <H>Technical skills</H>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "2px 10px" }}>
          {skills.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <b style={{ fontWeight: 600 }}>{k}</b>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <H>Experience</H>
        {experience.map((x) => (
          <div key={x.period} style={{ marginBottom: 7 }}>
            <Row l={<><b>{x.role}</b> · {x.company}</>} r={x.period} />
            <div>{x.summary}</div>
          </div>
        ))}

        <H>Projects</H>
        {list.map((p) => (
          <div key={p.slug} style={{ marginBottom: 7 }}>
            <Row
              l={
                <>
                  <b>{p.name}</b> <span style={{ color: "#555" }}>· {p.tags.map((t) => t.label).join(", ")}</span>
                </>
              }
              r={p.live ? <a href={p.live} style={{ color: "#1558C9" }}>{p.liveLabel}</a> : p.privateRepo ? "private repo" : ""}
            />
            <ul style={{ margin: "2px 0 0", paddingLeft: 16 }}>
              {p.resumeBullets!.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <H>Education &amp; achievements</H>
        <Row l={<><b>{education.degree}</b> · {education.school}</>} r="2024" />
        <ul style={{ margin: "4px 0 0", paddingLeft: 16 }}>
          <li>NPTEL — Programming in Java, 12-week certification.</li>
          <li>Published npm package <i>ritik-react-ui-library</i> (5 releases); 200+ DSA solutions in Java; 103 public GitHub repositories.</li>
        </ul>
        <p style={{ margin: "10px 0 0", fontSize: 10, color: "#666" }}>Interactive portfolio with case studies and code links: see the web version of this résumé.</p>
      </article>
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ margin: "14px 0 6px", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#1558C9", borderBottom: "1px solid #d6d8e0", paddingBottom: 3 }}>
      {children}
    </h2>
  );
}
function Row({ l, r }: { l: React.ReactNode; r: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <span>{l}</span>
      <span style={{ color: "#555", fontSize: 10.5 }}>{r}</span>
    </div>
  );
}
