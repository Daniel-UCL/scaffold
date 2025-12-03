// src/content/releases.ts
export type Release = {
  version: string;
  slug: string;      // used in the URL, e.g. "v0-1-0"
  date: string;      // ISO date string, e.g. "2025-10-08"
  status: string;    // e.g. "closed alpha"
  highlights: string[];
  fixes: string[];
};

export const releases: Release[] = [
  {
    version: "0.1.0",
    slug: "v0-1-0",
    date: "2025-10-08",
    status: "closed alpha",
    highlights: [
      "Initial scaffold: global banner, LCD announcement, 6-item nav, footer, base styles.",
      "Collections added: services, pathways.",
      "Added release notes collection.",
    ],
    fixes: [
      "Logo path set to `/assets/images/`.",
    ],
  },

  {
    version: "0.1.1",
    slug: "v0-1-1",
    date: "2025-12-03",
    status: "closed alpha",
    highlights: [
      "Initial scaffold: Migrated Jekyll wireframe to next.js app proof of concept.",
      "Collections added: services, pathways on next.js app.",
      "Added release notes collection to next.js app.",
    ],
    fixes: [
      "User authentication and rooting to default apps.",
    ],
  },

  // Add future releases here:
  // {
  //   version: "0.2.0",
  //   slug: "v0-2-0",
  //   date: "2026-01-15",
  //   status: "beta",
  //   highlights: [...],
  //   fixes: [...],
  // },
];

export function getReleasesSorted(): Release[] {
  return [...releases].sort((a, b) => (a.date < b.date ? 1 : -1));
}
