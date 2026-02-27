# Portfolio – pnpm dependency list

## Production

| Package | Version | Purpose |
|--------|---------|--------|
| `next` | (existing) | App framework |
| `react`, `react-dom` | (existing) | UI |
| `typescript` | (existing) | Type safety |
| `tailwindcss`, `@tailwindcss/postcss` | (existing) | Styling |
| `class-variance-authority` | (existing) | Component variants |
| `clsx` | (existing) | Class names |
| `tailwind-merge` | (existing) | Merge Tailwind classes |
| `lucide-react` | (existing) | Icons |
| `radix-ui` | (existing) | Primitives (shadcn) |
| `@prisma/client` | ^6 | DB client |
| `prisma` | ^6 | Dev CLI + migrations (also used at build for generate) |
| `zod` | ^3 | Schema validation (API + forms) |
| `recharts` | ^2 | Charts (Analytics demo) |
| `next-themes` | ^0.4 | Dark/light theme |
| `sonner` | ^1 | Toasts |

## Dev / Test

| Package | Version | Purpose |
|--------|---------|--------|
| `eslint`, `eslint-config-next` | (existing) | Linting |
| `prettier` | ^3 | Formatting |
| `eslint-config-prettier` | ^9 | Disable ESLint rules that conflict with Prettier |
| `vitest` | ^2 | Unit/integration tests |
| `@vitejs/plugin-react` | ^4 | React support for Vitest |
| `jsdom` | ^25 | DOM environment for tests |
| `@testing-library/react` | ^16 | React component tests |
| `@types/node` | (existing) | Node types |

All commands use **pnpm**.
