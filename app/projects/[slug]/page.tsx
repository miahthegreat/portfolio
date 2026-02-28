import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug } from "@/lib/projects-data";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-[60vh] bg-gradient-subtle bg-gradient-mesh">
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{project.title}</h1>
          <Badge variant="secondary">{project.status}</Badge>
        </div>

        {project.image && (
          <div className="mt-6 aspect-[400/240] w-full overflow-hidden rounded-lg border border-border bg-muted/50">
            <Image
              src={project.image}
              alt=""
              width={800}
              height={480}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <p className="mt-6 text-muted-foreground">{project.longDescription}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted/80 px-2.5 py-1 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="size-4" />
                View live
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="size-4" />
                Source code
              </a>
            </Button>
          )}
          {project.slug === "resident-experience-platform" && (
            <Button variant="outline" asChild>
              <Link href="/dashboard">Open dashboard demo</Link>
            </Button>
          )}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Detailed case study (architecture, tradeoffs, metrics) — coming as each project ships.
        </p>
      </div>
    </div>
  );
}
