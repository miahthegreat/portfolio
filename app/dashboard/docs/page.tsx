import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Cpu,
  Play,
  FlaskConical,
  Code2,
  Database,
  ArrowRight,
  Shield,
  Users,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Docs",
  description: "How this site works, tech stack, setup, testing, and API reference.",
};

const sections = [
  { id: "overview", title: "Overview", icon: BookOpen },
  { id: "access", title: "Dashboard access", icon: Shield },
  { id: "tech-stack", title: "Tech stack", icon: Cpu },
  { id: "setup", title: "Development setup", icon: Play },
  { id: "testing", title: "Testing", icon: FlaskConical },
  { id: "api", title: "API reference", icon: Code2 },
] as const;

export default function DashboardDocsPage() {
  return (
    <div data-testid="docs-page" className="mx-auto box-border w-full min-w-0 max-w-4xl overflow-x-clip px-2 py-12 sm:px-6 [&_code]:break-all">
      <div className="mb-12 min-w-0">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Docs</h1>
        <p className="mt-2 break-words text-muted-foreground">
          How the site works, what it’s built with, how to run it locally, testing, and API endpoints.
        </p>
        <nav data-testid="docs-nav" className="mt-6 flex min-w-0 max-w-full flex-wrap gap-2" aria-label="Docs sections">
          {sections.map(({ id, title, icon: Icon }) => (
            <a
              key={id}
              data-testid={`docs-nav-${id}`}
              href={`#${id}`}
              className="inline-flex min-w-0 max-w-full items-center gap-1.5 break-words rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-sm font-medium text-foreground no-underline transition-colors hover:bg-muted/60"
            >
              <Icon className="size-4 shrink-0" />
              {title}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-16 min-w-0">
        <section id="overview" data-testid="docs-section-overview" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <BookOpen className="size-5 shrink-0 text-primary/80" />
            Overview
          </h2>
          <div className="mt-4 space-y-4 break-words text-muted-foreground">
            <p>
              This is a production-style <strong className="text-foreground">admin dashboard</strong> for a Resident Experience Platform: multiple <strong className="text-foreground">properties</strong>, onboarding per property, services marketplace, and analytics. The dashboard is its own route: select a property in the sidebar, then use Onboarding, Marketplace, or Analytics for that property.
            </p>
            <p>
              <strong className="text-foreground">Dashboard</strong> (<Link href="/dashboard" className="font-medium text-primary hover:underline">/dashboard</Link>) includes the sidebar (property selector + sections) and Docs. Onboarding is scoped to the selected property: residents and tasks belong to that property. Marketplace and Analytics provide demo data.
            </p>
            <p>
              Data is stored in PostgreSQL via <strong className="text-foreground">Prisma</strong>. The UI calls <strong className="text-foreground">REST APIs</strong> under <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">/api/*</code>. The dashboard supports <strong className="text-foreground">guest access</strong> (no sign-in) and <strong className="text-foreground">admin sign-in</strong> for Messages and Guest visitors by IP.
            </p>
          </div>
        </section>

        <section id="access" data-testid="docs-section-access" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <Shield className="size-5 shrink-0 text-primary/80" />
            Dashboard access
          </h2>
          <div className="mt-4 space-y-4 break-words text-muted-foreground">
            <p>
              The dashboard demo is open to everyone. At <Link href="/dashboard/login" className="font-medium text-primary hover:underline">/dashboard/login</Link> you can:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li><strong className="text-foreground">Continue as guest</strong> — view Overview, Onboarding, Marketplace, Analytics, and Docs with no password</li>
              <li><strong className="text-foreground">Sign in</strong> — enter the admin password to access Messages and Guest visitors by IP</li>
            </ul>
            <p>
              <strong className="text-foreground">Admin-only routes</strong> (visible in the sidebar when signed in): <strong className="text-foreground">Messages</strong> lists contact form submissions with archive/delete actions; <strong className="text-foreground">Guest visitors by IP</strong> lists dashboard visits recorded by IP. Authentication uses NextAuth with a credentials provider (JWT, 7-day session).
            </p>
          </div>
        </section>

        <section id="tech-stack" data-testid="docs-section-tech-stack" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <Cpu className="size-5 shrink-0 text-primary/80" />
            Tech stack
          </h2>
          <div className="mt-4 space-y-4 break-words text-muted-foreground">
            <ul className="list-inside list-disc space-y-1">
              <li><strong className="text-foreground">Next.js</strong> (App Router), <strong className="text-foreground">TypeScript</strong>, <strong className="text-foreground">Tailwind CSS</strong>, <strong className="text-foreground">shadcn/ui</strong></li>
              <li><strong className="text-foreground">Prisma</strong>, <strong className="text-foreground">PostgreSQL</strong> (Docker)</li>
              <li><strong className="text-foreground">NextAuth</strong>, <strong className="text-foreground">Zod</strong>, <strong className="text-foreground">Vitest</strong>, <strong className="text-foreground">Recharts</strong>, <strong className="text-foreground">Sonner</strong>, <strong className="text-foreground">Motion</strong>, <strong className="text-foreground">next-themes</strong></li>
            </ul>
            <p>Package manager: <strong className="text-foreground">pnpm</strong>.</p>
          </div>
        </section>

        <section id="setup" data-testid="docs-section-setup" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <Play className="size-5 shrink-0 text-primary/80" />
            Development setup
          </h2>
          <div className="mt-4 space-y-4 break-words text-muted-foreground">
            <p>Prerequisites: Node 20+, pnpm, Docker.</p>
            <div className="min-w-0 max-w-full">
              <pre className="min-w-0 max-w-full overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-4 text-sm">
{`git clone <repo-url> && cd portfolio
pnpm install
cp .env.example .env   # set DATABASE_URL, DASHBOARD_PASSWORD, NEXTAUTH_SECRET, NEXTAUTH_URL
pnpm db:up && pnpm db:migrate && pnpm db:seed
pnpm dev`}
              </pre>
            </div>
            <p>Required env: <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">DATABASE_URL</code>, <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">DASHBOARD_PASSWORD</code>, <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">NEXTAUTH_SECRET</code>, <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">NEXTAUTH_URL</code>. Open <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">http://localhost:3000</code>, then <Link href="/dashboard" className="font-medium text-primary hover:underline">/dashboard</Link>. Optional: <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">pnpm db:studio</code>, <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">pnpm db:reset</code>.</p>
          </div>
        </section>

        <section id="testing" data-testid="docs-section-testing" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <FlaskConical className="size-5 shrink-0 text-primary/80" />
            Testing
          </h2>
          <div className="mt-4 space-y-4 break-words text-muted-foreground">
            <p><strong className="text-foreground">Vitest</strong> + React Testing Library + jsdom.</p>
            <div className="min-w-0 max-w-full">
              <pre className="min-w-0 max-w-full overflow-x-auto rounded-lg border border-border/60 bg-muted/50 p-4 text-sm">
{`pnpm test        # Watch
pnpm test:run     # CI`}
              </pre>
            </div>
          </div>
        </section>

        <section id="api" data-testid="docs-section-api" className="scroll-mt-24 min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold text-foreground">
            <Code2 className="size-5 shrink-0 text-primary/80" />
            API reference
          </h2>
          <p className="mt-4 break-words text-muted-foreground">
            JSON responses: success <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{"{ data: T }"}</code>, errors <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{"{ error: { code, message, details? } }"}</code>.
          </p>
          <div className="mt-8 space-y-10 min-w-0 max-w-full break-words [&_li_code]:max-w-full [&_li_code]:break-all">
            <div>
              <h3 className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                <Database className="size-4 text-primary/80" />
                Properties & Onboarding
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/properties</code>
                  <p className="mt-1 text-sm text-muted-foreground">List all properties. Response: <code className="rounded bg-muted/70 px-1 py-0.5">{"{ id, name, slug, address }[]"}</code>.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/onboarding/residents?propertyId=:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">List residents for a property. <code className="rounded bg-muted/70 px-1 py-0.5">propertyId</code> required.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/onboarding/categories</code>
                  <p className="mt-1 text-sm text-muted-foreground">List task categories.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/onboarding/tasks?residentId=:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">List tasks for a resident.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">POST /api/onboarding/tasks</code>
                  <p className="mt-1 text-sm text-muted-foreground">Create task (body: residentId, categoryId, title, optional status, owner, dueDate).</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">PATCH /api/onboarding/tasks/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Update task. Idempotent completion.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">DELETE /api/onboarding/tasks/:id</code>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">POST /api/onboarding/reset</code>
                  <p className="mt-1 text-sm text-muted-foreground">Reset onboarding demo data.</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                <Database className="size-4 text-primary/80" />
                Marketplace
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/marketplace/services</code>
                  <p className="mt-1 text-sm text-muted-foreground">List services. Optional query: <code className="rounded bg-muted/70 px-1 py-0.5">category</code>, <code className="rounded bg-muted/70 px-1 py-0.5">enabled=false</code> to include disabled.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">POST /api/marketplace/services</code>
                  <p className="mt-1 text-sm text-muted-foreground">Create service (body: name, description?, category, priceCents, enabled?).</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">PATCH /api/marketplace/services/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Update service (partial).</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">DELETE /api/marketplace/services/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Delete service (fails if it has orders).</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/marketplace/orders?propertyId=:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">List orders for residents of the property. <code className="rounded bg-muted/70 px-1 py-0.5">propertyId</code> required.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/marketplace/orders/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Get order with items and resident.</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                <Mail className="size-4 text-primary/80" />
                Contact messages
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/contact</code>
                  <p className="mt-1 text-sm text-muted-foreground">List contact messages. <strong>Admin only.</strong> Query <code className="rounded bg-muted/70 px-1 py-0.5">?archived=true</code> to include archived.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">POST /api/contact</code>
                  <p className="mt-1 text-sm text-muted-foreground">Submit message (body: name, email, message). Public. Rate limited.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">PATCH /api/contact/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Archive or unarchive. Body: <code className="rounded bg-muted/70 px-1 py-0.5">{"{ archive: true }"}</code> or <code className="rounded bg-muted/70 px-1 py-0.5">{"{ unarchive: true }"}</code>. <strong>Admin only.</strong></p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">DELETE /api/contact/:id</code>
                  <p className="mt-1 text-sm text-muted-foreground">Delete message permanently. <strong>Admin only.</strong></p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="flex min-w-0 items-center gap-2 font-semibold text-foreground">
                <Users className="size-4 text-primary/80" />
                Guest visitors
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">POST /api/visitors/record</code>
                  <p className="mt-1 text-sm text-muted-foreground">Record a dashboard visit by IP. No auth. Called when the dashboard loads.</p>
                </li>
                <li>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium">GET /api/visitors</code>
                  <p className="mt-1 text-sm text-muted-foreground">List visitors by IP (ip, visitCount, firstSeen, lastSeen). <strong>Admin only.</strong></p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16 flex min-w-0 max-w-full flex-wrap justify-between gap-4 border-t border-border/60 pt-8">
        <Link href="/dashboard" className="inline-flex min-w-0 max-w-full shrink-0 items-center gap-1.5 break-words text-sm font-medium text-primary hover:underline">
          <ArrowRight className="size-4 shrink-0 rotate-180" />
          Overview
        </Link>
        <a href="#overview" className="inline-flex min-w-0 max-w-full shrink-0 items-center gap-1.5 break-words text-sm font-medium text-muted-foreground hover:text-foreground">
          Back to top
        </a>
      </div>
    </div>
  );
}
