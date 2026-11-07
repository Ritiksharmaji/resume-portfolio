// Only tools that appear in real repos. "where" says which projects prove it.

export type StackLayer = {
  id: string;
  label: string;
  kicker: string;
  blurb: string;
  where: string;
  groups: { title: string; items: string[] }[];
};

export const stack: StackLayer[] = [
  {
    id: "spring",
    label: "Spring Boot",
    kicker: "backend / java",
    blurb:
      "Secure Java APIs from modular monoliths to database-per-service microservices — with migrations, tests and API docs from day one.",
    where: "oneKampus · JobHook · Shopvra services · Orbitly LMS · IMS",
    groups: [
      { title: "Core", items: ["Java 17 / 21", "Spring Boot 3 & 4", "Spring MVC", "Spring Modulith", "Bean Validation", "@Scheduled jobs"] },
      { title: "Security", items: ["Spring Security", "JWT (jjwt)", "OAuth2 Resource Server", "Refresh tokens", "BCrypt", "Signed webhooks"] },
      { title: "Data", items: ["Spring Data JPA", "Hibernate", "Spring Data MongoDB", "PostgreSQL", "MySQL", "Flyway"] },
      { title: "Architecture", items: ["Modular monolith", "Schema per module", "Database per service", "REST API design", "Actuator"] },
      { title: "Productivity", items: ["Lombok", "Maven", "Gradle (Kotlin DSL)", "springdoc / OpenAPI", "JavaMail", "Postman"] },
      { title: "Quality", items: ["JUnit 5", "Mockito", "Embedded Postgres tests", "Modulith boundary tests", "Servlets / JSP"] },
    ],
  },
  {
    id: "express",
    label: "Express.js",
    kicker: "backend / node",
    blurb:
      "Lean Node.js APIs in TypeScript: real-time sockets, payments with verified webhooks, file storage and scheduled jobs.",
    where: "Shopvra · Music app · Tomato · TaskManager",
    groups: [
      { title: "Core", items: ["Node.js", "Express 4 & 5", "TypeScript", "REST", "Socket.IO"] },
      { title: "Data", items: ["MongoDB", "Mongoose", "MongoDB Atlas"] },
      { title: "Auth", items: ["JWT", "bcrypt", "Role guards", "Rate limiting"] },
      { title: "Files & payments", items: ["Multer", "Cloudinary", "AWS S3 presigned URLs", "Stripe + webhooks", "PayPal", "Razorpay"] },
      { title: "Jobs & mail", items: ["node-cron", "Nodemailer", "WhatsApp Cloud API"] },
    ],
  },
  {
    id: "web",
    label: "React & Next.js",
    kicker: "frontend / web",
    blurb:
      "Server-rendered Next.js for platforms and admin tools, React for rich stateful UI — from rich-text editors to in-browser code previews.",
    where: "oneKampus · site-auto-matrix · JobHook · Shopvra",
    groups: [
      { title: "Core", items: ["React 18 / 19", "Next.js 15 & 16 App Router", "Server Actions", "Middleware", "TypeScript"] },
      { title: "Styling & UI", items: ["Tailwind CSS", "Material UI", "Mantine", "Radix / shadcn", "Sass"] },
      { title: "State & data", items: ["Redux Toolkit", "Zustand", "TanStack Query", "Axios", "Zod", "Prisma"] },
      { title: "Rich features", items: ["Tiptap editor", "Monaco editor", "esbuild-wasm preview", "hls.js video", "WebRTC", "Chart.js"] },
      { title: "Build & ship", items: ["Vite", "Playwright", "Vercel"] },
    ],
  },
  {
    id: "mobile",
    label: "React Native",
    kicker: "mobile / ios + android",
    blurb:
      "Both Expo and bare React Native CLI apps that share an API with the web — media playback, file uploads, payments and store builds.",
    where: "oneKampus · Music app · Shopvra · JobHook · Durolt",
    groups: [
      { title: "Core", items: ["React Native CLI", "Expo 51 / 54", "Expo Router", "React Navigation 7", "TypeScript"] },
      { title: "UI", items: ["NativeWind", "Tab + stack navigation", "Mini-player UI", "Admin consoles on mobile"] },
      { title: "Native features", items: ["react-native-track-player", "react-native-video", "WebView bridges", "Document & image picker"] },
      { title: "Storage & auth", items: ["SecureStore", "AsyncStorage", "JWT sessions"] },
      { title: "Ship", items: ["EAS Build (APK / AAB)", "Expo → CLI migration", "iOS & Android projects"] },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    kicker: "infra / deploy",
    blurb:
      "I deploy what I build: Dockerised stacks on small cloud boxes, automatic HTTPS, CI pipelines and memory tuning that fits a 1 GB server.",
    where: "oneKampus · site-auto-matrix · Music app",
    groups: [
      { title: "Containers", items: ["Docker", "Docker Compose", "Multi-stage builds", "Next standalone output"] },
      { title: "Edge", items: ["Caddy auto-HTTPS", "On-demand TLS", "Cloudflare", "Custom domains"] },
      { title: "Cloud", items: ["AWS Lightsail", "AWS S3", "Vercel", "Render", "MongoDB Atlas"] },
      { title: "CI / CD", items: ["GitHub Actions", "SSH deploys", "Webhook-triggered deploys", "Rollbacks"] },
      { title: "Ops", items: ["JVM & Postgres tuning", "Backups & snapshots", "Shell scripting", "Git"] },
    ],
  },
];

export const marquee = [
  "Spring Boot",
  "Express.js",
  "React",
  "Next.js",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "Stripe",
  "Socket.IO",
  "Docker",
  "AWS",
];
