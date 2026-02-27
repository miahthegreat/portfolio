"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps children and animates on route change.
 * Key = first path segment so top-level sections (home, dashboard, about, contact) animate;
 * dashboard sub-routes don't re-mount this wrapper (dashboard layout handles its own transition).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segment = pathname === "/" ? "home" : pathname.split("/").filter(Boolean)[0] ?? "home";

  return (
    <div key={segment} className="animate-page-in">
      {children}
    </div>
  );
}
