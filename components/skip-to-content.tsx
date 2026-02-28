"use client";

/**
 * Skip-to-content link for keyboard/screen reader users.
 * Visually hidden until focused; first tab stops here.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-md border-2 border-primary bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      Skip to main content
    </a>
  );
}
