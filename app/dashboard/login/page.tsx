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

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Dashboard sign in</CardTitle>
        <CardDescription>
          Enter the dashboard password to continue.
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1.5"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
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
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4">
      <Suspense fallback={<LoginFallback />}>
        <DashboardLoginForm />
      </Suspense>
    </main>
  );
}
