import Link from "next/link";

const footerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/docs", label: "Docs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-white/20 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-black/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm font-medium text-muted-foreground">
            © {year} Portfolio. Built for Second Nature.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1" role="list">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
