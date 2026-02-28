/**
 * Site-wide config for SEO and sharing. Set NEXT_PUBLIC_SITE_URL in production.
 */
export const siteConfig = {
  name: "Jeremiah Schmid",
  title: "Jeremiah Schmid | Portfolio",
  description:
    "Strategic Business Planning Manager & Developer. Full-stack apps, analytics, and data-driven solutions. Portfolio, resume, and contact.",
  /** Base URL for sitemap and Open Graph. No trailing slash. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
};
