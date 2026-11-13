// Everything personal lives here. Edit this file to update the site — no design code needed.

export const profile = {
  name: "Ritik Sharma",
  first: "Ritik",
  last: "Sharma",
  role: "Full-stack Engineer",
  headline: "Spring Boot · Express · Next.js · React Native",
  city: "Pune",
  country: "India",
  status: "Open to work",
  email: "ritiksharma555598@gmail.com",
  phone: "+91-8125625828",
  photo: "/photo.jpg",
  links: {
    github: "https://github.com/Ritiksharmaji",
    linkedin: "https://www.linkedin.com/in/ritiksharmaji/",
    scaler: "https://www.scaler.com/academy/profile/81df0e28f9e8",
  },
  intro:
    "Full-stack engineer who ships the whole product — Spring Boot & Express APIs, React & Next.js frontends, and React Native apps for iOS and Android.",
  about: [
    "I'm Ritik, a full-stack engineer at Durolt, where I build the Smart Locker platform across web and mobile. Outside work I build and self-host complete products: a multi-module education platform, a multi-tenant website builder, a real-time music app.",
    "I design the API, model the data, build the web app and the mobile app, then deploy them myself on servers I tune by hand. Teams get one person who can take a feature from database to device without hand-offs.",
  ],
  facts: [
    { k: "Based in", v: "Pune, India" },
    { k: "Focus", v: "Full-stack · Mobile" },
    { k: "Languages", v: "English · Hindi" },
    { k: "Currently", v: "Smart Locker platform @ Durolt" },
  ],
  yearsShipping: "2.5+",
};

// Hero proof strip — every number is counted from real repos.
export const heroStats = [
  { value: "7", label: "products shipped end-to-end" },
  { value: "5", label: "live in production right now" },
  { value: "387", label: "API endpoints in my largest system" },
  { value: "233", label: "GitHub contributions this year" },
];

export const experience = [
  {
    period: "Aug 2025 — Present",
    role: "Executive Software Developer",
    company: "Durolt",
    summary:
      "Build and maintain features for the Smart Locker platform across web and mobile — parcel and locker workflows. Own the mobile app and its integration with backend REST APIs, keeping data flows consistent across clients.",
    tech: ["React Native", "React.js", "REST APIs", "Mobile"],
  },
  {
    period: "May 2025 — Jul 2025",
    role: "Software Developer Intern",
    company: "Durolt",
    summary:
      "Shipped a new Parcel use case end-to-end, integrating APIs and data flows with existing systems, and resolved issues across existing Smart Locker modules.",
    tech: ["React.js", "REST APIs", "Integration"],
  },
  {
    period: "Apr 2024 — May 2025",
    role: "Software Engineer Trainee",
    company: "Vignan University",
    summary:
      "Built Java backends for staff and student management systems, from Servlets/JSP to Spring Boot — relational data models and server-side business logic for institutional workflows.",
    tech: ["Java", "Spring Boot", "JSP / Servlets", "MySQL"],
  },
];

export const education = {
  period: "Graduated 2024",
  degree: "MCA · BCA — Computer Applications",
  school: "Vignan University",
  subjects: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Java", "Web Technologies"],
};

export const certifications = [
  {
    title: "Programming in Java — 12-week certification",
    issuer: "NPTEL",
    year: "",
    href: "",
    icon: "badge",
  },
  {
    title: "Scaler Academy — DSA, LLD & System Design track",
    issuer: "Scaler",
    year: "",
    href: "https://www.scaler.com/academy/profile/81df0e28f9e8",
    icon: "cap",
  },
];

export const achievements = [
  {
    icon: "package",
    kicker: "Open source",
    title: "Published an npm package",
    body: "ritik-react-ui-library — a reusable React component library, 5 releases to v1.1.5.",
    href: "https://www.npmjs.com/package/ritik-react-ui-library",
  },
  {
    icon: "code",
    kicker: "Problem solving",
    title: "200+ DSA solutions in Java",
    body: "Daily practice across 25 topic modules up to Advanced DSA, with dry-run diagrams.",
    href: "https://github.com/Ritiksharmaji/Daily-Coding",
  },
  {
    icon: "server",
    kicker: "Self-hosting",
    title: "Runs his own production",
    body: "Platform and music app live on AWS Lightsail — Docker, Caddy auto-HTTPS, tuned for 1 GB boxes.",
    href: "https://sites.onekampus.com",
  },
  {
    icon: "git",
    kicker: "Consistency",
    title: "103 public repos since 2022",
    body: "233 contributions in the last year. TypeScript, JavaScript and Java across web, mobile and backend.",
    href: "https://github.com/Ritiksharmaji",
  },
];

export const githubStats = {
  repos: 103,
  contributions: 233,
  since: 2022,
  languages: [
    { name: "TypeScript", pct: 54.5, color: "#7FA6F4" },
    { name: "JavaScript", pct: 25.9, color: "#D4FF24" },
    { name: "Java", pct: 14.7, color: "#ECEDF3" },
    { name: "Other", pct: 4.9, color: "#3A3D4A" },
  ],
};
