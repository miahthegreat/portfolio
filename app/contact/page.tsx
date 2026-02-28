"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const message = (fd.get("message") as string)?.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();

      if (!res.ok) {
        const msg = json?.error?.message ?? "Something went wrong.";
        toast.error(msg);
        return;
      }

      setSent(true);
      form.reset();
      toast.success("Message sent. I’ll get back to you soon.");
    } catch {
      toast.error("Failed to send. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[60vh] bg-gradient-subtle bg-gradient-mesh">
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Contact</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Have a question or want to work together? Send a message and I’ll get back to you.
        </p>

        <div className="mt-10 max-w-md">
          {sent ? (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="font-medium text-foreground">Thanks for reaching out.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                I’ll reply as soon as I can. Want to send another?{" "}
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-primary hover:underline"
                >
                  Send again
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={200}
                  placeholder="Your name"
                  className="mt-1.5"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={320}
                  placeholder="you@example.com"
                  className="mt-1.5"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={10_000}
                  placeholder="What's on your mind?"
                  rows={5}
                  className="mt-1.5 resize-y"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-fit">
                {loading ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
