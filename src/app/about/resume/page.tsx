import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";

const Resume: React.FC = () => (
  <ScrollArea className="h-[calc(var(--app-height)-4rem)]">
    <div className="max-w-6xl mx-auto p-6 lg:grid lg:grid-cols-[minmax(300px,1fr)_2fr] gap-12">
      {/* ──────────── SIDEBAR ──────────── */}
      <aside className="space-y-8 lg:sticky lg:top-6">
        {/* Contact Card */}
        <div className="@container p-6 bg-gray-200 dark:bg-[rgb(0,33,57)] rounded-2xl space-y-4">
          <header className="space-y-1">
            <h1 className="text-4xl font-bold">Jeremiah</h1>
            <h1 className="text-4xl font-bold">Schmid</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sr. Data Analyst</p>
          </header>
          <address className="not-italic space-y-2 text-xs">
            <p>Stamford, CT, USA, 06902</p>
            <a href="tel:716-445-6283" className="block text-primary underline-offset-4 hover:underline">
              716 445 6283
            </a>
            <a
              href="mailto:jjschmid85@gmail.com"
              target="_blank"
              className="block text-primary underline-offset-4 hover:underline"
            >
              jjschmid85@gmail.com
            </a>
          </address>
        </div>

        {/* Skills Card */}
        <div className="@container p-6 bg-gray-200 dark:bg-[rgb(0,33,57)] rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-1 gap-3 text-sm">
            {[
              ['SQL', 'Experienced'],
              ['SSRS', 'Skillful'],
              ['Python', 'Experienced'],
              ['Tableau', 'Skillful'],
              ['Microsoft Office Suite', 'Expert'],
              ['Project Management', 'Experienced'],
              ['Time Management', 'Skillful'],
              ['Report Development', 'Expert'],
              ['Data Analysis', 'Experienced'],
              ['Team Leadership', 'Experienced'],
              ['Business Strategy', 'Experienced'],
            ].map(([skill, level]) => (
              <div key={skill} className="flex justify-between">
                <span className="font-bold">{skill}</span>
                <span className="italic opacity-50">{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links Card */}
        <div className="@container p-6 bg-gray-200 dark:bg-[rgb(0,33,57)] rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">Links</h2>
          <Link
            href="/"
            className="text-primary underline-offset-4 hover:underline text-sm"
          >
            Portfolio
          </Link>
        </div>
      </aside>

      {/* ──────────── MAIN CONTENT ──────────── */}
      <main className="space-y-12">
        {/* Summary */}
        <section className="@container rounded-2xl mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-2">Professional Summary</h2>
          <p>
            Senior Data Analyst with over three years of experience in report
            development and project management, adept at utilizing SQL, SSRS,
            Tableau, <span className="s6">&amp;</span> Python to streamline
            reporting processes and enhance business insights. Demonstrates strong
            leadership in fostering team growth and driving innovation, with a focus
            on achieving strategic objectives and boosting operational efficiency.
            Committed to leveraging technical expertise and performance analysis to
            deliver measurable results and support organizational success.
          </p>
        </section>

        {/* Employment Timeline */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Employment history</h2>
          <ScrollArea className="h-128 pr-16">
            <div className="relative border-l-2 border-primary/50 pl-8 space-y-12">
              {[
                {
                  dates: 'Dec 2023 - Present',
                  title: 'Sr. Data Analyst, Charter Communications',
                  location: 'Stamford, CT',
                  bullets: [
                    'Analyzed large datasets to uncover actionable insights, driving data-informed decisions that enhanced operational efficiency.',
                    'Streamlined reporting processes, reducing data retrieval times significantly and improving stakeholder access to critical metrics.',
                    'Maintained comprehensive documentation of data processes to ensure compliance and facilitate knowledge transfer across teams.',
                    'Fostered effective communication between technical and non-technical teams, ensuring alignment on project goals and enhancing overall productivity.',
                    'Conducted in-depth analyses of complex datasets, delivering actionable insights that drove strategic initiatives and improved operational efficiency.'
                  ]
                },
                {
                  dates: 'Oct 2022 - Dec 2023',
                  title: 'Data Analyst, Charter Communications',
                  location: 'Stamford, CT',
                  bullets: [
                    'Analyzed data discrepancies in reporting processes, implementing solutions that enhanced accuracy and reliability for stakeholders.',
                    'Streamlined SQL report generation, resulting in substantial improvements in data retrieval speed and enhanced decision-making capabilities.',
                    'Developed automated reporting systems using SSRS, Tableau, <span className="s9">&amp;</span> Python, reducing manual effort and increasing efficiency across multiple departments.',
                    'Fostered collaboration with cross-functional teams to address reporting issues, leading to noticeable gains in user satisfaction and data clarity.',
                    'Maintained a proactive approach to project management, ensuring timely delivery of reports and aligning team efforts towards common goals.'
                  ]
                },
                { dates: 'Dec 2021 - Oct 2022', title: 'Managed WiFi Supervisor, Charter Communications', location: 'Buffalo, NY', bullets: [] },
                { dates: 'Mar 2021 - Dec 2021', title: 'Managed WiFi Lead, Charter Communications', location: 'Buffalo, NY', bullets: [] },
                { dates: 'Feb 2021 - Mar 2021', title: 'Repair Lead, Charter Communications', location: 'Buffalo, NY', bullets: [] },
              ].map((job, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[25px] -top-[0px] bg-white dark:bg-gray-900 w-4 h-4 rounded-full border-2 border-primary"></span>
                  <time className="block text-xs text-gray-500 dark:text-gray-400">{job.dates}</time>
                  <h3 className="mt-1 italic text-sm">{job.title}</h3>
                  <h4 className="mb-2 text-xs">{job.location}</h4>
                  {job.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      {job.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="@container p-6 bg-gray-200 dark:bg-[rgb(0,33,57)] rounded-2xl space-y-2 text-sm">
            <h3 className="opacity-50">High School Diploma, Computer Science</h3>
            <p className="italic">Hutchinson Central Technical High School</p>
            <p>Buffalo, NY</p>
          </div>
        </section>
      </main>
    </div>
  </ScrollArea>

);

export default Resume;
