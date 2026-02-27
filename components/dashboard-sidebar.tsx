"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  BarChart3,
  BookOpen,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProperty } from "@/contexts/property-context";
import { useNavIndicator } from "@/hooks/use-nav-indicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Home } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/onboarding", label: "Onboarding", icon: Layers },
  { href: "/dashboard/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/docs", label: "Docs", icon: BookOpen },
] as const;

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const {
    properties,
    selectedPropertyId,
    setSelectedPropertyId,
    loading: propertiesLoading,
  } = useProperty();
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
  const sidebarNavRef = useRef<HTMLDivElement>(null);
  const activeIndex = navLinks.findIndex(
    ({ href }) =>
      href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href)
  );
  const { indicatorStyle, blobStyle, setHoveredIndex } = useNavIndicator(
    sidebarNavRef,
    activeIndex
  );

  return (
    <aside
      data-testid="dashboard-sidebar"
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col overflow-hidden border-r border-border/50 bg-background/95 shadow-xl backdrop-blur-xl dark:bg-black/80 lg:flex",
        className
      )}
    >
      <div className="border-b border-border/50 p-4">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Property
        </p>
        {propertiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Select
            value={selectedPropertyId ?? ""}
            onValueChange={(v) => setSelectedPropertyId(v || null)}
          >
            <SelectTrigger data-testid="dashboard-property-select" className="h-9 w-full">
              <Building2 className="size-4 shrink-0 text-muted-foreground" />
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {selectedProperty?.address && (
          <p className="mt-1.5 truncate px-1 text-xs text-muted-foreground">
            {selectedProperty.address}
          </p>
        )}
      </div>
      <nav data-testid="dashboard-sidebar-nav" className="flex flex-1 flex-col gap-1 p-4" aria-label="Dashboard">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sections
        </p>
        <div ref={sidebarNavRef} className="relative flex flex-col gap-1">
          {/* Hover glass blob */}
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
          {/* Active indicator (slides on navigate) */}
          <div
            aria-hidden
            className="pointer-events-none absolute rounded-lg z-0 bg-primary/15 dark:bg-white/15"
            style={indicatorStyle}
          />
          {navLinks.map(({ href, label, icon: Icon }, i) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <div
                key={href}
                data-nav-index={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative z-10"
              >
                <Link
                  data-testid={`sidebar-link-${href === "/dashboard" ? "overview" : href.replace("/dashboard/", "")}`}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    "hover:bg-accent/70 hover:text-foreground dark:hover:bg-white/10",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-auto border-t border-border/50 p-4">
          <Link
            data-testid="sidebar-portfolio-link"
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5"
          >
            <Home className="size-4 shrink-0" />
            Portfolio
          </Link>
        </div>
      </nav>
    </aside>
  );
}
