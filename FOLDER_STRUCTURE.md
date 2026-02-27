# Portfolio – final folder structure

```
portfolio/
├── app/
│   ├── layout.tsx                 # Root layout (navbar, footer, theme)
│   ├── page.tsx                   # Landing
│   ├── globals.css
│   ├── projects/
│   │   ├── page.tsx               # Case study index
│   │   └── [slug]/page.tsx        # Case study detail
│   ├── demos/
│   │   ├── page.tsx               # Demo hub
│   │   ├── onboarding/page.tsx
│   │   ├── marketplace/page.tsx
│   │   └── analytics/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── docs/page.tsx              # Engineering philosophy
├── components/
│   ├── ui/                        # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── accordion.tsx
│   │   ├── skeleton.tsx
│   │   ├── progress.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tooltip.tsx
│   │   └── ...
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── demo-guide.tsx             # Reusable collapsible guide panel
├── app/api/
│   ├── onboarding/
│   │   └── tasks/
│   │       ├── route.ts           # GET, POST
│   │       └── [id]/route.ts      # PATCH, DELETE
│   ├── marketplace/
│   │   ├── services/route.ts      # GET
│   │   ├── orders/route.ts        # POST
│   │   └── admin/services/[id]/route.ts  # PATCH
│   └── analytics/
│       └── metrics/route.ts       # GET
├── lib/
│   ├── utils.ts
│   ├── db.ts                      # Prisma client singleton
│   ├── api-response.ts            # Consistent API error/success format
│   └── forecasting/               # Analytics forecast helpers
│       ├── index.ts
│       └── forecasting.test.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── docker-compose.yml             # Postgres
├── .env.example
├── vitest.config.ts
├── .prettierrc
├── .github/
│   └── workflows/
│       └── ci.yml
├── components.json
├── package.json
├── tsconfig.json
└── DEPENDENCIES.md
```
