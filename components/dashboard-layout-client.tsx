"use client";

import { usePathname } from "next/navigation";
import { DashboardChrome } from "@/components/dashboard-chrome";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/dashboard/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardChrome>{children}</DashboardChrome>
    </div>
  );
}
