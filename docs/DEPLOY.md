# Deployment

Production checklist for env vars and common platforms.

## Environment variables

Set these in your host (Vercel, Railway, Docker, etc.).

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string. |
| `NEXTAUTH_SECRET` | Yes (prod) | Secret for JWT signing. Generate: `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Yes (prod) | Full URL of the app, no trailing slash (e.g. `https://yourdomain.com`). |
| `DASHBOARD_PASSWORD` | Yes (prod) | Password to sign in to `/dashboard`. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Same as `NEXTAUTH_URL`. Used for sitemap, Open Graph, and resume “My Portfolio” link. |

- **Development:** Copy `.env.example` to `.env` and set values. Use `NEXTAUTH_URL=http://localhost:3002` if dev runs on 3002 (e.g. when Docker uses 3000).
- **Production:** Never commit `.env`. Set all variables in the platform’s env/config UI.

## Docker (this repo)

Frontend runs on port **3000**; postgres on **5432**.

1. **Build and run**
   ```bash
   docker compose up -d --build
   ```
2. **Production env**  
   Add auth and site URL for the frontend. Either:
   - **Option A:** Create a `.env` (or `.env.production`) and reference it in `docker-compose.yml`:
     ```yaml
     frontend:
       env_file: .env
     ```
   - **Option B:** Set in `docker-compose.yml` under `frontend.environment` (avoid secrets in the file; use secrets or env_file in production).

   Required for production:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = your public URL (e.g. `https://portfolio.example.com`)
   - `DASHBOARD_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` = same as `NEXTAUTH_URL` (for sitemap/OG/resume link)

3. **Migrations**  
   Run once after first deploy (e.g. in a one-off container or your CI):
   ```bash
   docker compose run --rm frontend pnpm exec prisma migrate deploy
   ```
   Optional: seed with `pnpm exec prisma db seed` (or a custom seed script).

## Vercel

1. Connect the repo and set **Framework Preset** to Next.js.
2. **Environment variables** (Project → Settings → Environment Variables): add all from the table above. For `DATABASE_URL`, use a Postgres provider (Vercel Postgres, Neon, Supabase, etc.).
3. **Build command:** `pnpm build` (or leave default if it runs `next build`).
4. Set **Root Directory** if the app is not at the repo root.
5. **NEXTAUTH_URL:** set to the Vercel URL (e.g. `https://your-app.vercel.app`) or your custom domain.
6. Run migrations (and seed if needed) against the production DB from your machine or a script:
   ```bash
   DATABASE_URL="postgresql://..." pnpm exec prisma migrate deploy
   ```

## Other platforms (Railway, Render, Fly.io, etc.)

- Use the same env vars as above.
- **NEXTAUTH_URL** must be the public URL of the app (no trailing slash).
- **DATABASE_URL** from the platform’s Postgres add-on or your own instance.
- Build: `pnpm install && pnpm build`. Start: `pnpm start` (or the platform’s Node start command).
- Run `prisma migrate deploy` after deploy (or in a release phase) so the DB schema is up to date.
