import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Dev often runs on 3002 when Docker/production uses 3000. Allow both.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3002",
    "http://10.0.25.135:3000",
    "http://10.0.25.135:3002",
  ],
  async redirects() {
    return [
      { source: "/demos", destination: "/dashboard", permanent: true },
      { source: "/demos/onboarding", destination: "/dashboard/onboarding", permanent: true },
      { source: "/demos/marketplace", destination: "/dashboard/marketplace", permanent: true },
      { source: "/demos/analytics", destination: "/dashboard/analytics", permanent: true },
      { source: "/docs", destination: "/dashboard/docs", permanent: true },
    ];
  },
};

export default nextConfig;
