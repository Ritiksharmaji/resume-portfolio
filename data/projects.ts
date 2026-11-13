// Primary projects. Content lives in projects.json so the sync workflow
// (scripts/sync) can update it when a project repo merges to main.
// Every number is counted from the repository itself — nothing is estimated.
import data from "./projects.json";
import changelogData from "./changelog.json";

export type Layer = {
  kind: "backend" | "frontend" | "mobile" | "infra";
  title: string;
  points: string[];
  tech: string;
};

export type Project = {
  slug: string;
  code: string; // P/01
  name: string;
  kicker: string;
  tagline: string; // one line on the card
  problem: string; // two sentences on the case study
  role: string;
  timeline: string;
  platforms: string;
  live?: string;
  liveLabel?: string;
  source?: string;
  privateRepo?: boolean;
  badge?: string; // honesty label, e.g. "Team project"
  note?: string; // honesty note on the case study
  visual: "dashboard" | "tenants" | "phones" | "layers" | "pipeline" | "storefront" | "form";
  shots?: { cover: string; caption: string; mobile?: string; gallery: { src: string; caption: string }[] };
  tags: { label: string; tone: "lime" | "blue" | "white" | "grey" }[];
  proof: { value: string; label: string }[]; // shown on the card + case study
  layers: Layer[];
  decisions: { title: string; body: string }[];
  apiChip: string;
  resumeBullets?: string[]; // used on the one-page /resume
};

export const projects = data as Project[];

export type ChangelogEntry = {
  date: string; // YYYY-MM-DD
  sha: string; // short commit of the project repo
  title: string;
  points: string[];
};

const changelog = changelogData as Record<string, ChangelogEntry[]>;
export const getChangelog = (slug: string): ChangelogEntry[] => changelog[slug] ?? [];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
