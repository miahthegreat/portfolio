import Link from "next/link";
import { resumeData } from "@/lib/resume-data";
import { siteConfig } from "@/lib/site-config";
import { ResumePrintButton } from "@/components/resume-print-button";

export const metadata = {
  title: "Resume",
  description:
    "Jeremiah Schmid — Strategic Business Planning Manager & Analyst. Experience, skills, and education. SQL, Tableau, SSRS, Python, report development.",
  openGraph: {
    title: "Resume | Jeremiah Schmid",
    description: "Strategic Business Planning Manager & Analyst. Experience, skills, and education.",
  },
};

export default function ResumePage() {
  const { contact, summary, skills, links, experience, education } = resumeData;

  return (
    <div className="resume-page relative min-h-[60vh] bg-gradient-subtle bg-gradient-mesh print:bg-white">
      <div className="relative mx-auto min-w-0 max-w-full max-w-3xl px-4 py-16 sm:px-6 lg:max-w-5xl print:max-w-none print:py-8">
        <ResumePrintButton />

        <article className="rounded-xl border border-border bg-card p-8 shadow-sm print:border-0 print:shadow-none print:p-0">
          {/* Contact - full width */}
          <header className="border-b border-border pb-6 print:pb-4">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{contact.name}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{contact.title}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{contact.location}</span>
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                {contact.phone}
              </a>
              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                linkedin.com/in/jeremiah-schmid
              </a>
            </div>
          </header>

          {/* Two columns on lg+: left = skills/links/education, right = summary/experience */}
          <div className="mt-6 grid gap-8 print:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] print:grid-cols-1">
            {/* Left column - order-2 on small so it appears after main content */}
            <div className="flex flex-col gap-6 print:order-2 lg:order-1">
              {/* Skills */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Skills
                </h2>
                <ul className="mt-3 grid gap-2">
                  {skills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-3">
                      <span className="w-32 shrink-0 text-sm text-foreground lg:w-28">{skill.name}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary/80"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Links */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Links
                </h2>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {links.map((link) => {
                    const href = link.href.startsWith("/") ? `${siteConfig.url}${link.href}` : link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={href}
                          className="text-sm text-primary hover:underline print:no-underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Education */}
              <section className="border-t border-border pt-6 print:pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Education
                </h2>
                <div className="mt-3">
                  <p className="font-medium text-foreground">{education.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {education.institution}, {education.location}
                  </p>
                </div>
              </section>
            </div>

            {/* Right column - summary + experience */}
            <div className="flex flex-col gap-6 print:order-1 lg:order-2">
              {/* Professional Summary */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Professional Summary
                </h2>
                <p className="mt-2 text-foreground leading-relaxed">{summary}</p>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Professional Experience
                </h2>
                <ul className="mt-4 space-y-6">
                  {experience.map((job, i) => (
                    <li key={`${job.company}-${job.title}-${i}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <span className="text-sm text-muted-foreground">{job.dates}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {job.company}
                        {job.location && `, ${job.location}`}
                      </p>
                      {job.bullets && job.bullets.length > 0 && (
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
                          {job.bullets.map((bullet, j) => (
                            <li key={j}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
