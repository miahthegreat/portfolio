import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, ShoppingBag, BarChart3 } from "lucide-react";

const demos = [
  {
    href: "/demos/onboarding",
    title: "Resident Onboarding",
    description: "Checklists, Kanban view, progress tracking, and task management.",
    icon: Layers,
  },
  {
    href: "/demos/marketplace",
    title: "Services Marketplace",
    description: "Search, filter, cart, checkout, and order history.",
    icon: ShoppingBag,
  },
  {
    href: "/demos/analytics",
    title: "Analytics & Forecasting",
    description: "Time-series metrics, forecast methods, and confidence bands.",
    icon: BarChart3,
  },
];

export default function DemosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-foreground">Interactive demos</h1>
        <p className="mt-2 text-muted-foreground">
          Click through and use each demo. Each is backed by a real database and API.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href} className="block transition-opacity hover:opacity-95">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <Icon className="size-9 text-primary/80" />
                <CardTitle className="mt-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm font-medium text-primary">Open demo →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
