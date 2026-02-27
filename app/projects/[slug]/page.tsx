import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const CASE_STUDIES: Record<string, { title: string; demoHref: string }> = {
  onboarding: {
    title: "Resident Onboarding",
    demoHref: "/demos/onboarding",
  },
  marketplace: {
    title: "Services Marketplace",
    demoHref: "/demos/marketplace",
  },
  analytics: {
    title: "Analytics & Forecasting",
    demoHref: "/demos/analytics",
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-foreground">{study.title}</h1>
      <p className="mt-2 text-muted-foreground">
        Case study write-up (problem, architecture, data model, API, reliability, performance, tradeoffs) — coming soon.
      </p>
      <Button asChild className="mt-6">
        <Link href={study.demoHref}>Open interactive demo</Link>
      </Button>
    </div>
  );
}
