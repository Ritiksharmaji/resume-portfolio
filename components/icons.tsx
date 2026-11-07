type P = { size?: number; className?: string };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const ArrowUpRight = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M7 17L17 7M9 7h8v8" /></svg>
);
export const Download = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M12 4v12M6 10l6 6 6-6M5 20h14" /></svg>
);
export const Lock = ({ size = 14 }: P) => (
  <svg {...base(size)}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const Menu = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Bolt = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
);
export const Mail = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);

const big = (size: number) => ({ ...base(size), strokeWidth: 1.6 });
export const IconFor = ({ name, size = 30 }: { name: string; size?: number }) => {
  switch (name) {
    case "badge":
      return <svg {...big(size)}><circle cx="12" cy="9" r="5" /><path d="M9 13.5L7.5 21l4.5-2.5 4.5 2.5L15 13.5" /></svg>;
    case "cap":
      return <svg {...big(size)}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></svg>;
    case "package":
      return <svg {...big(size)}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></svg>;
    case "code":
      return <svg {...big(size)}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>;
    case "server":
      return <svg {...big(size)}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>;
    case "git":
      return <svg {...big(size)}><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M18 10.5c0 4-6 3-11 5.5" /></svg>;
    default:
      return null;
  }
};
