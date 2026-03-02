"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardChrome } from "@/components/dashboard-chrome";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/dashboard/login";

  if (isLoginPage) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col">
        <ScrollArea className="flex-1 min-h-0 w-full">
          <div className="flex min-h-screen w-full items-center justify-center p-4">
            {children}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <DashboardChrome>{children}</DashboardChrome>
    </div>
  );
}
