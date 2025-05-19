// components/HeaderWithTitle.tsx
"use client";

import { usePageTitle } from "@/context";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function HeaderWithTitle() {
  const { title } = usePageTitle();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <h1>{title || ""}</h1>
      </div>
    </header>
  );
}
