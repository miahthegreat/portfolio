import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function PortfolioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} Portfolio.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1" role="list">
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
