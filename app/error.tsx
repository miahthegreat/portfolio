"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-subtle bg-gradient-mesh px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Something went wrong
        </h1>
        <p className="mt-2 text-muted-foreground">
          An error occurred. You can try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="outline" className="inline-flex items-center gap-2">
            <RefreshCw className="size-4" />
            Try again
          </Button>
          <Button asChild className="inline-flex items-center gap-2">
            <Link href="/">
              <Home className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
