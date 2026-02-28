# Portfolio – folder structure (approximate)

This is a rough reference; the repo has evolved (dashboard, auth, a11y, proxy). See the repo for the current layout.

```
portfolio/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing
│   ├── globals.css
│   ├── not-found.tsx, error.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── demos/                     # Redirects to /dashboard/*
│   ├── about/, contact/, resume/
│   ├── dashboard/                 # Protected; login, onboarding, analytics, etc.
│   └── api/                       # Auth, contact, onboarding, marketplace, analytics
├── components/
│   ├── ui/                        # shadcn
│   ├── theme-provider.tsx, theme-toggle.tsx
│   ├── portfolio-header.tsx, portfolio-bottom-nav.tsx, portfolio-shell.tsx
│   ├── dashboard-sidebar.tsx, dashboard-chrome.tsx, dashboard-layout-client.tsx
│   ├── skip-to-content.tsx, session-provider.tsx
│   └── ...
├── lib/
├── prisma/
├── e2e/                           # Playwright specs (including a11y)
├── scripts/                       # run-lighthouse.cjs
├── docs/                          # DEPLOY.md, ACCESSIBILITY.md, testing.md, etc.
├── docker-compose.yml
├── proxy.ts                       # Dashboard route protection
└── package.json, tsconfig.json, ...
```
