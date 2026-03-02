import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center bg-gradient-subtle bg-gradient-mesh px-4 py-16">
      <div className="mx-auto min-w-0 max-w-full max-w-md px-4 text-center">
        <p className="text-6xl font-bold text-muted-foreground/50 sm:text-8xl">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">
          Page not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/" className="inline-flex items-center gap-2">
            <Home className="size-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
