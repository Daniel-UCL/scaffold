// src/content/siteMeta.ts
import pkg from "../../package.json";

export type Announcement = {
  enabled: boolean;
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const siteAnnouncement: Announcement = {
  enabled: true,
  text: "This site is released as a closed alpha version. All feedback welcome.",
  ctaLabel: "Share feedback",
  ctaHref: "/feedback",
};

export const siteMeta = {
  // Version comes from package.json (single source of truth)
  version: pkg.version,

  // Status is controlled here (e.g. "closed alpha", "beta", "public release")
  status: "closed alpha",
};
