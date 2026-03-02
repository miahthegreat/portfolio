"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioHeader } from "@/components/portfolio-header";
import { PortfolioBottomNav } from "@/components/portfolio-bottom-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div data-testid="portfolio-shell" className="relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <PortfolioHeader />
      <ScrollArea className="min-h-0 min-w-0 flex-1" data-testid="main-scroll">
        <main
          id="main-content"
          data-testid="main-content"
          className={
            pathname === "/"
              ? "relative mx-auto flex h-full min-h-0 min-w-0 max-w-6xl flex-col px-4 sm:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[90rem]"
              : "relative mx-auto max-w-6xl min-w-0 px-4 py-6 pb-24 sm:px-6 sm:py-8 md:pb-8 lg:px-8 lg:py-10 xl:max-w-7xl 2xl:max-w-[90rem]"
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              className={pathname === "/" ? "flex h-full min-h-0 min-w-0 max-w-full flex-col" : "min-w-0 max-w-full"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </ScrollArea>
      <PortfolioBottomNav />
    </div>
  );
}
