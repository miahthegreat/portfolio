export const metadata = {
  title: "About",
  description:
    "About Jeremiah Schmid — Strategic Business Planning Manager, data analyst, and developer. Mets & Bills fan, homelab enthusiast, and full-stack builder.",
  openGraph: {
    title: "About | Jeremiah Schmid",
    description:
      "About Jeremiah Schmid — Strategic Business Planning Manager, data analyst, and developer. Mets & Bills fan, homelab enthusiast.",
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-[60vh] bg-gradient-subtle bg-gradient-mesh">
      <div className="relative mx-auto min-w-0 max-w-full max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">About</h1>

        <div className="mt-8 space-y-6 break-words text-foreground">
          <p className="leading-relaxed">
            I’m a Strategic Business Planning Manager & Analyst with a focus on automated
            reporting, scenario modeling, and KPI-driven dashboards. I work with SQL, Tableau,
            SSRS, and Python to improve forecasting, cut data retrieval time, and help teams make
            better decisions. I also build full-stack apps and demos — like the dashboard on this
            site — to stay sharp and ship things end-to-end.
          </p>
          <p className="leading-relaxed">
            When I’m not in spreadsheets or code, I’m a Buffalo Bills and New York Mets fan, a
            Teenage Mutant Ninja Turtles enthusiast, and I spend a lot of time with video games and
            coding side projects. I keep a homelab running Unifi networking and Proxmox with VMs
            for self-hosted services — tinkering there keeps the infrastructure and automation side
            of my brain happy.
          </p>
          <p className="leading-relaxed">
            I like bridging technical and non-technical teams, mentoring on data and tools, and
            improving how work gets done. If that lines up with what you’re building,{" "}
            <a href="/contact" className="text-primary hover:underline">
              get in touch
            </a>
            .
          </p>
        </div>

        <section className="mt-10 border-t border-border pt-8" aria-label="Quick facts">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick facts
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2" role="list">
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-muted-foreground">Teams</span>
              <span>Bills, Mets</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-muted-foreground">Fandom</span>
              <span>TMNT</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-muted-foreground">Hobbies</span>
              <span>Video games, coding</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-muted-foreground">Homelab</span>
              <span>Unifi, Proxmox, self-hosted VMs</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
