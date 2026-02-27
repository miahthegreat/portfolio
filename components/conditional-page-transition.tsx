"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/page-transition";

/**
 * Wraps children in PageTransition only for non-dashboard routes.
 * Dashboard has its own fixed sidebar; wrapping it in PageTransition would make
 * the sidebar's containing block the animated div, so it would scroll with the page.
 */
export function ConditionalPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }
  return <PageTransition>{children}</PageTransition>;
}
