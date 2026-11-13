// Secondary builds — shown in the "Lab" section with its own terminal look.

export type LabItem = {
  name: string;
  repo: string;
  category: "Web" | "Mobile" | "Backend" | "Library";
  pitch: string;
  stack: string[];
  highlights: string[];
  live?: string;
  privateRepo?: boolean;
  size: "wide" | "normal";
};

export const lab: LabItem[] = [
  {
    name: "Orbitly LMS",
    repo: "LMS-PROJECT",
    category: "Web",
    pitch: "Learning platform with student, instructor and admin roles on web and native mobile — the precursor to oneKampus's LMS module.",
    stack: ["Spring Boot 4", "PostgreSQL", "Flyway", "Next.js 16", "React Native"],
    highlights: ["Course + quiz builder, gradebook, verifiable certificates", "117 Java files across 10 domain packages · 10 migrations"],
    size: "wide",
  },
  {
    name: "Tomato — Food Order",
    repo: "Food-Order-Application",
    category: "Web",
    pitch: "MERN food-ordering storefront with a separate admin panel — the first version before Dabba.",
    stack: ["Express", "MongoDB", "React + Vite", "Stripe"],
    highlights: ["Stripe Checkout and cash on delivery", "Server-side cart, order tracking, admin menu uploads"],
    live: "https://food-order-application-chi.vercel.app",
    size: "normal",
  },
  {
    name: "Institute Manager",
    repo: "IMS-Project",
    category: "Backend",
    pitch: "Management system for coaching institutes: admissions, fees, attendance, timetable and a parent portal.",
    stack: ["Spring Boot 4", "PostgreSQL", "React + TS", "React Native"],
    highlights: ["Tests for tenant isolation and concurrent payments on embedded Postgres", "24 controllers · Swagger docs"],
    privateRepo: true,
    size: "normal",
  },
  {
    name: "ritik-react-ui-library",
    repo: "my-react-ui-library",
    category: "Library",
    pitch: "A reusable React component library, built with Vite library mode and published to npm.",
    stack: ["React", "Vite", "npm"],
    highlights: ["5 releases to v1.1.5", "Documented publish process for multiple ecosystems"],
    live: "https://www.npmjs.com/package/ritik-react-ui-library",
    size: "normal",
  },
  {
    name: "TaskManager",
    repo: "TaskManagment-Web-Mobile-App",
    category: "Mobile",
    pitch: "Task manager where one Express API serves both a React web client and a React Native app.",
    stack: ["Express", "MongoDB", "React", "React Native"],
    highlights: ["Shared JWT backend for web and mobile", "Offline token storage with AsyncStorage"],
    size: "normal",
  },
  {
    name: "MERN Shop",
    repo: "ECommerce_App_MERN",
    category: "Web",
    pitch: "Full MERN store with an admin dashboard, PayPal checkout and Cloudinary image uploads.",
    stack: ["Express", "MongoDB", "React", "Redux Toolkit", "PayPal"],
    highlights: ["Admin product management", "Cookie-based JWT sessions"],
    size: "normal",
  },
  {
    name: "Finance Dashboard",
    repo: "FULL-STACK-MERN-PROJECT",
    category: "Web",
    pitch: "MERN dashboard for tracking income and expenses with charts.",
    stack: ["Express", "MongoDB", "React", "Chart.js"],
    highlights: ["Charts over date-filtered transactions", "Deployed on Vercel"],
    live: "https://full-stack-mern-project-rho.vercel.app",
    size: "normal",
  },
  {
    name: "Movie Finder",
    repo: "Movie-app-ReactNative",
    category: "Mobile",
    pitch: "Movie discovery app on the TMDB API with trending lists driven by what users search.",
    stack: ["Expo Router", "NativeWind", "TypeScript", "Appwrite"],
    highlights: ["Search analytics stored in Appwrite", "Typed API layer"],
    size: "normal",
  },
  {
    name: "CMS Portfolio",
    repo: "resume-react-sanity",
    category: "Web",
    pitch: "An earlier portfolio whose content is edited in Sanity, a headless CMS.",
    stack: ["React", "Sanity", "Framer Motion", "Sass"],
    highlights: ["Content editable without code", "Animated sections"],
    live: "https://ritik-resume-react.vercel.app",
    size: "normal",
  },
];
