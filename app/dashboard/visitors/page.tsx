"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface VisitorRow {
  id: string;
  ip: string;
  visitCount: number;
  firstSeen: string;
  lastSeen: string;
}

export default function GuestVisitorsPage() {
  const { data: session, status } = useSession();
  const [visitors, setVisitors] = useState<VisitorRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") return;
    const controller = new AbortController();
    const id = setTimeout(() => setLoading(true), 0);
    fetch("/api/visitors", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((json) => setVisitors(json?.data ?? []))
      .catch((err) => {
        if (err?.name !== "AbortError") setVisitors([]);
      })
      .finally(() => setLoading(false));
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [status, session?.user?.role]);

  if (status === "loading" || (session?.user && session.user.role !== "admin")) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Guest visitors by IP</h1>
          <p className="mt-1 text-muted-foreground">
            {status === "loading"
              ? "Loading…"
              : "Admin access required. Sign in with the password to view visitor data."}
          </p>
        </div>
        {status === "loading" && <Skeleton className="h-64 w-full" />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Guest visitors by IP</h1>
        <p className="mt-1 text-muted-foreground">
          Dashboard visits from guest IPs (recorded when anyone loads the demo).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Visitors
          </CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${visitors.length} unique IP${visitors.length === 1 ? "" : "s"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-64 w-full" />
          ) : visitors.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No visitor data yet. Visits are recorded when the dashboard is loaded.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IP</TableHead>
                  <TableHead className="text-right">Visits</TableHead>
                  <TableHead className="text-right">First seen</TableHead>
                  <TableHead className="text-right">Last seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-mono font-medium">{v.ip}</TableCell>
                    <TableCell className="text-right">{v.visitCount}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(v.firstSeen).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(v.lastSeen).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
