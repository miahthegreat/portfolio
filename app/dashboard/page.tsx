import Link from "next/link";
import { Layers, ShoppingBag, BarChart3, ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardOverviewClient } from "./dashboard-overview-client";

const sections = [
  { href: "/dashboard/onboarding", title: "Onboarding", description: "Residents and tasks for this property.", icon: Layers },
  { href: "/dashboard/marketplace", title: "Marketplace", description: "Services and orders. (Coming soon)", icon: ShoppingBag },
  { href: "/dashboard/analytics", title: "Analytics", description: "Metrics, time-range filters, and charts.", icon: BarChart3 },
];

export default function DashboardOverviewPage() {
  return (
    <div data-testid="dashboard-overview-page" className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <DashboardOverviewClient />
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Select a property in the sidebar, then open a section below to manage onboarding, marketplace, or analytics for that property.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} data-testid={`dashboard-section-${href.split("/").pop()}`} href={href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <Icon className="size-8 text-primary/80" />
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="ml-1 size-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
