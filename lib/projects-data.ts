/**
 * Portfolio projects — placeholder entries to replace with real builds.
 * Update slugs, links, and descriptions as you ship each project.
 */
export type ProjectStatus = "Live" | "In development" | "Coming soon";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  status: ProjectStatus;
  /** Optional: image path under /public or external URL */
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "resident-experience-platform",
    title: "Resident Experience Platform",
    shortDescription: "Full-stack property management demo: onboarding, marketplace, and analytics.",
    longDescription:
      "A production-style dashboard for property managers: resident onboarding with task tracking, services marketplace with orders, and analytics with time-range filters and Recharts. Built to demonstrate full-stack ownership from schema design to API and UI.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Recharts"],
    liveUrl: "/dashboard",
    repoUrl: "https://github.com/miahthegreat/portfolio",
    status: "Live",
    image: "/projects/placeholder.svg",
  },
  {
    slug: "data-pipeline-dashboard",
    title: "Data Pipeline & ETL Dashboard",
    shortDescription: "Orchestrated ETL jobs with monitoring and trend dashboards.",
    longDescription:
      "Internal platform for scheduling and monitoring data pipelines. Tracks job runs, data freshness, and key metrics with alerting. Dashboards built for stakeholder visibility and incident triage.",
    tech: ["Python", "SQL", "Airflow", "dbt", "Metabase", "Docker"],
    status: "In development",
    image: "/projects/placeholder.svg",
  },
  {
    slug: "internal-admin-toolkit",
    title: "Internal Admin & Automation Toolkit",
    shortDescription: "CRUD, bulk actions, and reporting for ops and support teams.",
    longDescription:
      "Secure admin UI for internal operations: user/entity management, bulk imports, and configurable reports. Reduces manual work and standardizes how support and ops teams interact with core data.",
    tech: ["React", "Node.js", "PostgreSQL", "Role-based access"],
    status: "Coming soon",
    image: "/projects/placeholder.svg",
  },
  {
    slug: "api-integration-service",
    title: "API & Integration Service",
    shortDescription: "Reliable sync and webhooks for third-party and internal systems.",
    longDescription:
      "Service that integrates internal systems with external APIs and partners. Handles retries, idempotency, and webhook delivery with visibility into sync status and failure reasons.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Webhooks", "REST"],
    status: "Coming soon",
    image: "/projects/placeholder.svg",
  },
  {
    slug: "design-system-components",
    title: "Design System & Component Library",
    shortDescription: "Reusable UI components and docs for product consistency.",
    longDescription:
      "Shared component library and design tokens used across multiple apps. Documentation site with props, examples, and accessibility notes to keep teams aligned and shipping faster.",
    tech: ["React", "TypeScript", "Tailwind", "Storybook", "Figma"],
    status: "Coming soon",
    image: "/projects/placeholder.svg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
