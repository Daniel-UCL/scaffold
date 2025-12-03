// src/content/navConfig.ts
import type { PageKey } from "@/content/pageCopy";

export type Audience = "students" | "researchers" | "partners";

export type ServiceNavConfig = {
  key: string;             // arbitrary key, usually slug or app ID
  href: string;
  title: string;           // default label (e.g. Jekyll service title)
  navLabel?: string;       // override, like Jekyll nav_label ("CV Library")
  audiences: Audience[];   // which dropdown(s) this service appears in
  requireAuth?: boolean;
  active?: boolean;
  pageKey?: PageKey;       // optional link into pageCopy
};

export const serviceNavConfig: ServiceNavConfig[] = [
  {
    key: "membershipDashboard",
    href: "/membership-dashboard",
    title: "Membership Dashboard",
    audiences: ["partners"],
    requireAuth: true,
    active: true,
    pageKey: "membershipDashboard",
  },
  {
    key: "ixnWorkflowManager",
    href: "/ixn-workflow-manager",
    title: "IXN Workflow Manager",
    audiences: ["partners"],
    requireAuth: true,
    active: true,
    pageKey: "ixnWorkflowManager",
  },
  {
    // Mirrors the Jekyll “Recruit new talent” service
    key: "talentDiscovery",
    href: "/talent-discovery",
    title: "Recruit new talent", // service title
    navLabel: "CV Library",      // nav_label override
    audiences: ["partners"],
    requireAuth: true,
    active: true,
    pageKey: "talentDiscovery",
  },
  // Later, you can add more services, e.g.:
  // {
  //   key: "findYourNextJob",
  //   href: "/services/find-your-next-job",
  //   title: "Find your next job",
  //   audiences: ["students"],
  //   active: false,
  // },
];

type NavRootItem =
  | { type: "link"; label: string; href: string }
  | { type: "audienceDropdown"; audience: Audience; label: string }
  | { type: "account" }
  | { type: "contact"; label: string; href: string };

export type NavRootConfigItem = NavRootItem;

export const navRootConfig: NavRootConfigItem[] = [
  { type: "link", label: "Home", href: "/" },

  // Jekyll-style audience dropdowns; only shown if they have items
  { type: "audienceDropdown", audience: "students", label: "For students" },
  {
    type: "audienceDropdown",
    audience: "researchers",
    label: "For researchers",
  },
  { type: "audienceDropdown", audience: "partners", label: "For partners" },

  // Special case: this will be Sign in (when logged out) or Account dropdown (when logged in)
  { type: "account" },

  { type: "contact", label: "Contact us", href: "/contact" },
];
