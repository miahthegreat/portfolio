"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface DemoGuideProps {
  title?: string;
  steps: string[];
  children?: React.ReactNode;
  className?: string;
}

export function DemoGuide({
  title = "Demo guide",
  steps,
  children,
  className,
}: DemoGuideProps) {
  return (
    <Accordion type="single" collapsible defaultValue="guide" className={cn("w-full", className)}>
      <AccordionItem value="guide" className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline py-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </AccordionTrigger>
        <AccordionContent className="pb-4">
          <ul className="list-disc list-inside space-y-1 break-words text-sm text-muted-foreground">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
