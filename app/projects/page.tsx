import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects-data";

export const metadata = {
  title: "Projects",
  description:
    "Portfolio projects — full-stack apps, data pipelines, and internal tools. Resident Experience Platform, analytics, and more.",
  openGraph: {
    title: "Projects | Jeremiah Schmid",
    description: "Full-stack apps, data pipelines, and internal tools. Built to ship and scale.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-[60vh] bg-gradient-subtle bg-gradient-mesh">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Projects</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Full-stack apps, data pipelines, and internal tools — built to ship and scale. More going live as they’re ready.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Card className="flex h-full flex-col overflow-hidden border-border/80 transition-smooth hover:border-primary/30 hover:shadow-md">
                {project.image && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block aspect-[400/240] w-full shrink-0 overflow-hidden bg-muted/50"
                    aria-label={`View ${project.title} project`}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      width={400}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                )}
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-foreground">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                  <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View details
                      <ArrowRight className="size-3.5" />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        aria-label={`Open ${project.title} live`}
                      >
                        <ExternalLink className="size-3.5" />
                        Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        aria-label={`Open ${project.title} repo`}
                      >
                        <Github className="size-3.5" />
                        Repo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
