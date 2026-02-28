"use client";

export function ResumePrintButton() {
  return (
    <div className="mb-8 flex justify-end print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
