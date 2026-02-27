"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavIndicator } from "@/hooks/use-nav-indicator";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = navItems.findIndex(
    ({ href }) =>
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
  );
  const { indicatorStyle, blobStyle, setHoveredIndex } = useNavIndicator(
    containerRef,
    activeIndex
  );

  return (
    <header className="relative sticky top-0 z-50 w-full border-b-2 border-white/20 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-black/70 dark:shadow-none">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6" aria-label="Main">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-foreground no-underline transition-smooth hover:opacity-90 font-sans"
        >
          Portfolio
        </Link>
        <div className="flex flex-1 items-center justify-end gap-1">
          <div
            ref={containerRef}
            className="relative flex items-center gap-0.5"
          >
            {/* Hover glass blob */}
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-xl z-0"
              style={{
                ...blobStyle,
                background: "var(--glass-spot)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            {/* Active indicator (slides on navigate) */}
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-xl z-0 bg-primary/15 dark:bg-white/15"
              style={indicatorStyle}
            />
            <ul className="relative z-10 flex items-center gap-0.5" role="list">
              {navItems.map(({ href, label }, i) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li
                    key={href}
                    data-nav-index={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={href}
                      className={cn(
                        "relative block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                        "hover:bg-accent/70 hover:text-foreground dark:hover:bg-white/10",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="relative z-10 ml-3 flex items-center border-l-2 border-border/50 pl-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
