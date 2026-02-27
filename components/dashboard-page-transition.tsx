"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps dashboard main content and animates when navigating between dashboard sub-routes.
 * Sidebar stays fixed; only this content area animates.
 */
export function DashboardPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="min-h-[calc(100vh-3.5rem)] animate-page-in-right">
      {children}
    </div>
  );
}
