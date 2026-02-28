# Testing

## Vitest (unit / component tests)

- **`pnpm test`** – Run Vitest in **watch mode** (re-runs on file changes).
- **`pnpm test:run`** – Run Vitest **once** (e.g. for CI).

Configuration: `vitest.config.ts` (jsdom, React, `@/` path alias).  
Setup: `vitest.setup.ts` (e.g. `@testing-library/jest-dom`).  
Test files: `**/*.{test,spec}.{ts,tsx}` (excluding `e2e/` and `.next/`).

## Playwright (e2e tests)

- **`pnpm test:e2e`** – Run Playwright e2e tests (starts dev server if needed).
- **`pnpm test:e2e:ui`** – Run with Playwright UI.
- **`pnpm test:e2e:a11y`** – Run only accessibility (axe) e2e tests.

Configuration: `playwright.config.ts`.  
Test files: `e2e/**/*.spec.ts`.  
Stable selectors: see [test-selectors.md](./test-selectors.md).  
Accessibility and Lighthouse: see [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Summary

| Command            | What it runs   | Mode        |
|--------------------|----------------|-------------|
| `pnpm test`        | Vitest         | Watch       |
| `pnpm test:run`    | Vitest         | Single run  |
| `pnpm test:e2e`    | Playwright     | Single run  |
| `pnpm test:e2e:ui` | Playwright     | UI mode     |
| `pnpm test:e2e:a11y` | Playwright (axe) | Single run |
