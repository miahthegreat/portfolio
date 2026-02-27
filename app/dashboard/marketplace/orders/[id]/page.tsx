"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderDetail {
  id: string;
  residentId: string;
  createdAt: string;
  resident: { id: string; name: string; email: string };
  items: Array<{
    id: string;
    quantity: number;
    priceCents: number;
    service: { id: string; name: string; category: string; priceCents: number };
  }>;
  totalCents: number;
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/marketplace/orders/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to load order");
      setOrder(json.data);
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (!id || loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-6 h-48 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <p className="text-muted-foreground">Order not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link href="/dashboard/marketplace" className="gap-2">
          <ArrowLeft className="size-4" />
          Marketplace
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Order {order.id.slice(0, 8)}…</CardTitle>
          <p className="text-sm text-muted-foreground">
            {order.resident.name} · {order.resident.email}
          </p>
          <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.service.name}</TableCell>
                  <TableCell>{item.service.category}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatPrice(item.priceCents)}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(item.priceCents * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end border-t pt-4">
            <p className="text-lg font-semibold">Total {formatPrice(order.totalCents)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
