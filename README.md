# Jeremiah Schmid — Portfolio

Personal portfolio and resume site built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL**. Public site (hero, about, resume, projects, contact) plus a password-protected **dashboard** (onboarding demos, marketplace, analytics, docs, contact messages).

## Tech stack

- **Next.js** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS 4**, **Motion**, **shadcn/ui**-style components
- **Prisma** + **PostgreSQL**
- **NextAuth** (credentials) for dashboard login
- **pnpm** for package management

## Getting started

1. **Clone and install**
   ```bash
   pnpm install
   ```

2. **Environment**  
   Copy `.env.example` to `.env` and set at least `DATABASE_URL`. For local dashboard login, set `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (e.g. `http://localhost:3002` if dev runs on 3002), and `DASHBOARD_PASSWORD`.

3. **Database**
   ```bash
   pnpm db:up        # start Postgres via Docker
   pnpm db:migrate   # run migrations
   pnpm db:seed      # optional seed
   ```

4. **Run dev**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or 3002 if you use a different port). Dashboard: [/dashboard](http://localhost:3000/dashboard) (sign in with `DASHBOARD_PASSWORD`).

## Scripts

| Command | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Prisma generate + Next.js build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:e2e:a11y` | Run accessibility (axe) E2E tests |
| `pnpm db:up` | Start Postgres (Docker) |
| `pnpm db:migrate` | Run Prisma migrations (dev) |
| `pnpm db:studio` | Open Prisma Studio |

## Deployment

See **[docs/DEPLOY.md](docs/DEPLOY.md)** for production env vars (NextAuth, database, dashboard password), Docker, Vercel, and other platforms. The app exposes **GET /api/health** for health checks and includes rate limiting and security headers (see docs).

## Docs

- [docs/DEPLOY.md](docs/DEPLOY.md) — Deployment, env vars, security, monitoring
- [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) — Accessibility notes and testing
- [docs/testing.md](docs/testing.md) — Unit, E2E, and Lighthouse testing
