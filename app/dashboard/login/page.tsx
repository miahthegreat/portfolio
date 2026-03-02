"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardLoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      password,
      redirect: true,
      callbackUrl,
    });
    setLoading(false);
  }

  async function handleGuestSignIn() {
    setLoading(true);
    await signIn("credentials", {
      guest: "true",
      redirect: true,
      callbackUrl,
    });
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Dashboard sign in</CardTitle>
        <CardDescription>
          Sign in with the admin password for Messages and Guest visitors by IP, or continue as guest to view the demo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error === "CredentialsSignin" && (
            <p className="text-sm text-destructive" role="alert">
              Invalid password. Try again.
            </p>
          )}
          <div>
            <Label htmlFor="password">Admin password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-1.5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleGuestSignIn}
            >
              Continue as guest
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            ← Back to portfolio
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function LoginFallback() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Dashboard sign in</CardTitle>
        <CardDescription>
          Enter the dashboard password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-10 rounded-md bg-muted/50" />
          <div className="h-9 rounded-md bg-muted/50" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardLoginPage() {
  return (
    <main id="main-content" className="flex min-h-full w-full items-center justify-center px-4">
      <Suspense fallback={<LoginFallback />}>
        <DashboardLoginForm />
      </Suspense>
    </main>
  );
}
