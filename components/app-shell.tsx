"use client";

import { usePathname } from "next/navigation";
import { PortfolioShell } from "@/components/portfolio-shell";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }
  return <PortfolioShell>{children}</PortfolioShell>;
}
