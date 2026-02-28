"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavIndicator } from "@/hooks/use-nav-indicator";

const portfolioNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
] as const;

export function PortfolioHeader() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = portfolioNavItems.findIndex(
    ({ href }) =>
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
  );
  const { indicatorStyle, blobStyle, setHoveredIndex } = useNavIndicator(
    containerRef,
    activeIndex
  );

  return (
    <header data-testid="portfolio-header" className="sticky top-0 z-50 hidden w-full border-b border-border/50 bg-background/80 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-16">
        <Link
          data-testid="header-logo"
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-foreground no-underline transition-opacity hover:opacity-90 lg:text-xl"
        >
          Portfolio
        </Link>
        {/* Desktop nav: hidden on small screens (use bottom nav there) */}
        <div className="hidden items-center gap-1 md:flex" data-testid="header-desktop-nav">
          <div ref={containerRef} className="relative flex items-center gap-0.5">
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-lg z-0"
              style={{
                ...blobStyle,
                background: "var(--glass-spot)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-lg z-0 bg-primary/15 dark:bg-white/15"
              style={indicatorStyle}
            />
            <nav className="relative z-10 flex items-center gap-0.5" aria-label="Portfolio">
              {portfolioNavItems.map(({ href, label }, i) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <div
                    key={href}
                    data-nav-index={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      data-testid={`nav-link-${href === "/" ? "home" : href.slice(1)}`}
                      href={href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent/70 hover:text-foreground dark:hover:bg-white/10",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
          <Link
            data-testid="header-dashboard-link"
            href="/dashboard"
            className="ml-2 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="ml-2 border-l border-border/50 pl-2" data-testid="header-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
