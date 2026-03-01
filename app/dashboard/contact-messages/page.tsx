"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Mail, Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  archivedAt: string | null;
}

function fetchMessages(archived: boolean): Promise<ContactMessage[]> {
  const url = archived ? "/api/contact?archived=true" : "/api/contact";
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load");
    return res.json().then((json) => json?.data ?? []);
  });
}

export default function ContactMessagesPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);

  const load = useCallback(() => {
    if (session?.user?.role !== "admin") return;
    setLoading(true);
    fetchMessages(showArchived)
      .then(setMessages)
      .catch(() => toast.error("Failed to load messages"))
      .finally(() => setLoading(false));
  }, [session?.user?.role, showArchived]);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") {
      setLoading(false);
      return;
    }
    load();
  }, [status, session?.user?.role, load]);

  async function archive(id: string) {
    setActingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archive: true }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? "Failed to archive");
      }
      toast.success("Message archived");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to archive");
    } finally {
      setActingId(null);
    }
  }

  async function unarchive(id: string) {
    setActingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unarchive: true }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? "Failed to unarchive");
      }
      toast.success("Message restored");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to unarchive");
    } finally {
      setActingId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Permanently delete this message?")) return;
    setActingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error?.message ?? "Failed to delete");
      }
      toast.success("Message deleted");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setActingId(null);
    }
  }

  if (status === "loading" || (session?.user && session.user.role !== "admin")) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Contact messages</h1>
          <p className="mt-1 text-muted-foreground">
            {status === "loading"
              ? "Loading…"
              : "Admin access required. Sign in with the password to view and manage messages."}
          </p>
        </div>
        {status === "loading" && <Skeleton className="h-64 w-full" />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Contact messages</h1>
        <p className="mt-1 text-muted-foreground">
          Messages submitted from the portfolio contact form. Archive or delete to manage inbox.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" />
              Messages
            </CardTitle>
            <CardDescription>
              {loading ? "Loading…" : `${messages.length} message${messages.length === 1 ? "" : "s"}`}
              {showArchived ? " (archived)" : ""}
            </CardDescription>
          </div>
          <Button
            variant={showArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setShowArchived((v) => !v)}
            disabled={loading}
          >
            {showArchived ? "Show active" : "Show archived"}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-64 w-full" />
          ) : messages.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              {showArchived
                ? "No archived messages."
                : "No messages yet. Submissions from the contact page will appear here."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="max-w-[280px]">Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-primary hover:underline"
                      >
                        {m.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[280px] truncate text-muted-foreground">
                      {m.message}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(m.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {showArchived ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => unarchive(m.id)}
                            disabled={actingId !== null}
                            title="Restore from archive"
                          >
                            <ArchiveRestore className="size-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => archive(m.id)}
                            disabled={actingId !== null}
                            title="Archive"
                          >
                            <Archive className="size-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:text-destructive"
                          onClick={() => remove(m.id)}
                          disabled={actingId !== null}
                          title="Delete permanently"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
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
