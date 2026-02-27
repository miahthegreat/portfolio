"use client";

import { cn } from "@/lib/utils";

/**
 * Subtle grid of dots – use as background behind content.
 */
export function DotsPattern({
  className,
  size = 32,
  radius = 1,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number; radius?: number }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id="dots"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="fill-foreground/[0.07] dark:fill-foreground/[0.1]"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

/**
 * Soft grid lines – optional background.
 */
export function GridPattern({
  className,
  size = 48,
  strokeWidth = 0.5,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id="grid"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-foreground/[0.04] dark:text-foreground/[0.06]"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/**
 * Single floating blob behind hero content – subtle, animated, sits behind everything.
 */
export function HeroBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[min(90vmax,480px)] w-[min(90vmax,480px)] -translate-x-1/2 -translate-y-1/2 animate-blob-float rounded-full opacity-[0.2] blur-[120px] dark:opacity-[0.25]"
        style={{
          background: `radial-gradient(circle, var(--palette-1) 0%, var(--palette-2) 40%, var(--palette-3) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}
