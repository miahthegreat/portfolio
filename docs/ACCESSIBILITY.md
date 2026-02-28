# Accessibility

## Implemented

- **Skip to main content:** First focusable element on the page; visible when focused so keyboard users can jump past the header/nav. Target: `#main-content` (portfolio main, dashboard main area, login page).
- **Focus visibility:** `focus-visible` styles on links and buttons (2px outline with `--ring`, offset 2px) so keyboard focus is clear without changing mouse-only focus.
- **Semantic structure:** Main content in `<main>` with `id="main-content"` where appropriate; nav with `aria-label`, `aria-current="page"` on active nav item.

## Automated checks

### axe (WCAG 2 A/AA) in e2e

- **Run:** `pnpm test:e2e:a11y` (or `pnpm test:e2e` to run all e2e including a11y).
- **First time:** If Playwright reports missing browsers, run `pnpm exec playwright install`.
- **What it does:** Runs [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright) on public routes (home, about, resume, contact, projects) and dashboard login. Fails if any WCAG 2 Level A or AA violations are reported.
- **CI:** Include `pnpm test:e2e:a11y` in your pipeline (with the app or `webServer` serving on the configured base URL). Ensure Playwright browsers are installed (e.g. `pnpm exec playwright install --with-deps` or use a CI image that includes them).

### Lighthouse

- **Run (a11y only):** Start the app on 3002 (`pnpm dev`), then `pnpm lighthouse`. Default URL is `http://localhost:3002`. Writes `lighthouse-a11y.html`.
- **Open report in browser:** `pnpm lighthouse --view` or `pnpm lighthouse http://localhost:3002 --view`.
- **Run (all categories):** `pnpm lighthouse:full`. Writes `lighthouse-report.html`.
- **Production (port 3000) or other URL:** `pnpm lighthouse http://localhost:3000` or `pnpm lighthouse:full http://localhost:3000`.
- **Use http for localhost:** Chrome blocks `https://localhost` with a cert interstitial; use `http://localhost:3002` (or 3000) so the page loads.
- **Chrome not installed:** The scripts use Playwright’s Chromium (same as e2e). Run `pnpm exec playwright install chromium` once if needed.
