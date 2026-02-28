"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export function DashboardChrome({ children }: { children: React.ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const t = setTimeout(() => setSheetOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar: menu + Portfolio + theme */}
      <header data-testid="dashboard-mobile-header" className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-border/50 bg-background/95 px-4 backdrop-blur-xl lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button data-testid="dashboard-mobile-menu-trigger" variant="ghost" size="icon" className="shrink-0" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0" aria-describedby={undefined}>
            <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
            <DashboardSidebar className="relative top-0 flex h-full w-full border-0 shadow-none" />
          </SheetContent>
        </Sheet>
        <Link
          data-testid="dashboard-mobile-portfolio-link"
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home className="size-4" />
          Portfolio
        </Link>
        <div data-testid="dashboard-mobile-theme-toggle">
          <ThemeToggle />
        </div>
      </header>

      {/* Desktop: sidebar (fixed) */}
      <DashboardSidebar />

      {/* Desktop: floating theme toggle (icon only) */}
      <div className="fixed right-4 top-4 z-50 hidden lg:block" data-testid="dashboard-desktop-theme-toggle">
        <ThemeToggle />
      </div>

      {/* Main: scrollable area */}
      <div id="main-content" data-testid="dashboard-main" className="min-h-0 w-full min-w-0 flex-1 overflow-x-hidden pl-0 lg:pl-64" tabIndex={-1}>
        <ScrollArea className="h-[calc(100vh-3.5rem)] w-full min-w-0 lg:h-screen">
          <div className="min-w-0 max-w-full w-full overflow-x-hidden p-4 sm:p-6 lg:p-8 [&>*]:min-w-0 [&>*]:w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                className="min-w-0 w-full max-w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
