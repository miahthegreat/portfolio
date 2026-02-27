import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/demos", destination: "/dashboard", permanent: true },
      { source: "/demos/onboarding", destination: "/dashboard/onboarding", permanent: true },
      { source: "/demos/marketplace", destination: "/dashboard/marketplace", permanent: true },
      { source: "/demos/analytics", destination: "/dashboard/analytics", permanent: true },
      { source: "/projects", destination: "/dashboard/docs", permanent: true },
      { source: "/projects/:slug*", destination: "/dashboard/docs", permanent: true },
      { source: "/docs", destination: "/dashboard/docs", permanent: true },
    ];
  },
};

export default nextConfig;
