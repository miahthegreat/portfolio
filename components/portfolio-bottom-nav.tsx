"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Mail, FileText, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

export function PortfolioBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border/50 bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Portfolio"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            data-testid={`bottom-nav-${href === "/" ? "home" : href.replace("/", "")}`}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground hover:bg-accent/70 hover:text-foreground dark:hover:bg-white/10"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
