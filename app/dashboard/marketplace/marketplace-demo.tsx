"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Package, DollarSign, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProperty } from "@/contexts/property-context";
import type { Service, Order } from "./types";

const API = "/api/marketplace";

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

export function MarketplaceDemo() {
  const { selectedPropertyId } = useProperty();
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<(Order & { totalCents: number })[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [tab, setTab] = useState<"services" | "orders">("services");
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPriceCents, setFormPriceCents] = useState("");
  const [formEnabled, setFormEnabled] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const res = await fetch(`${API}/services`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to load services");
      setServices(json.data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load services");
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!selectedPropertyId) {
      setOrders([]);
      return;
    }
    setLoadingOrders(true);
    try {
      const res = await fetch(`${API}/orders?propertyId=${encodeURIComponent(selectedPropertyId)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to load orders");
      setOrders(json.data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load orders");
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  }, [selectedPropertyId]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (tab === "orders") fetchOrders();
  }, [tab, fetchOrders]);

  const openCreateService = () => {
    setEditingService(null);
    setFormName("");
    setFormDescription("");
    setFormCategory("Add-ons");
    setFormPriceCents("");
    setFormEnabled(true);
    setServiceDialogOpen(true);
  };

  const openEditService = (s: Service) => {
    setEditingService(s);
    setFormName(s.name);
    setFormDescription(s.description ?? "");
    setFormCategory(s.category);
    setFormPriceCents(String(s.priceCents));
    setFormEnabled(s.enabled);
    setServiceDialogOpen(true);
  };

  const saveService = async () => {
    const price = parseInt(formPriceCents, 10);
    if (!formName.trim() || !formCategory.trim() || isNaN(price) || price < 0) {
      toast.error("Name, category, and a valid price are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingService) {
        const res = await fetch(`${API}/services/${editingService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            description: formDescription.trim() || null,
            category: formCategory.trim(),
            priceCents: price,
            enabled: formEnabled,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message ?? "Update failed");
        setServices((prev) => prev.map((s) => (s.id === editingService.id ? json.data : s)));
        toast.success("Service updated");
      } else {
        const res = await fetch(`${API}/services`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            description: formDescription.trim() || null,
            category: formCategory.trim(),
            priceCents: price,
            enabled: formEnabled,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message ?? "Create failed");
        setServices((prev) => [...prev, json.data]);
        toast.success("Service created");
      }
      setServiceDialogOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleServiceEnabled = async (s: Service) => {
    try {
      const res = await fetch(`${API}/services/${s.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !s.enabled }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Update failed");
      setServices((prev) => prev.map((x) => (x.id === s.id ? json.data : x)));
      toast.success(s.enabled ? "Service disabled" : "Service enabled");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
  };

  if (!selectedPropertyId) {
    return (
      <div data-testid="marketplace-page" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No property selected.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a property in the sidebar to view marketplace services and orders.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = Array.from(new Set(services.map((s) => s.category))).sort();

  return (
    <div data-testid="marketplace-page" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Marketplace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Services catalog and orders for this property. Add or edit services; view orders by residents.
          </p>
        </div>
        <Link
          href="/dashboard/docs#api"
          className="text-sm font-medium text-primary hover:underline"
        >
          API docs →
        </Link>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as "services" | "orders")} className="space-y-4" data-testid="marketplace-tabs">
        <TabsList>
          <TabsTrigger data-testid="marketplace-tab-services" value="services" className="gap-2">
            <DollarSign className="size-4" />
            Services
          </TabsTrigger>
          <TabsTrigger data-testid="marketplace-tab-orders" value="orders" className="gap-2">
            <Package className="size-4" />
            Orders
          </TabsTrigger>
        </TabsList>

        {tab === "services" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button data-testid="marketplace-new-service-btn" onClick={openCreateService} size="sm" className="gap-1">
                <Plus className="size-4" />
                New service
              </Button>
            </div>
            {loadingServices ? (
              <Skeleton className="h-48 w-full" />
            ) : services.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No services yet. Add one to get started.
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{s.name}</p>
                            {s.description && (
                              <p className="text-xs text-muted-foreground">{s.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{s.category}</Badge>
                        </TableCell>
                        <TableCell>{formatPrice(s.priceCents)}</TableCell>
                        <TableCell>
                          <Badge variant={s.enabled ? "default" : "outline"}>
                            {s.enabled ? "Active" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => openEditService(s)}
                              aria-label="Edit service"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleServiceEnabled(s)}
                            >
                              {s.enabled ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {loadingOrders ? (
              <Skeleton className="h-48 w-full" />
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No orders for this property yet.
                </CardContent>
              </Card>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resident</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <p className="font-medium">{order.resident?.name ?? "—"}</p>
                          {order.resident?.email && (
                            <p className="text-xs text-muted-foreground">{order.resident.email}</p>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(order.totalCents ?? 0)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/marketplace/orders/${order.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}
          </div>
        )}
      </Tabs>

      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit service" : "New service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="service-name">Name</Label>
              <Input
                id="service-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Premium Internet"
              />
            </div>
            <div>
              <Label htmlFor="service-desc">Description (optional)</Label>
              <Input
                id="service-desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Short description"
              />
            </div>
            <div>
              <Label htmlFor="service-category">Category</Label>
              <Input
                id="service-category"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="e.g. Utilities, Add-ons"
                list="service-categories"
              />
              <datalist id="service-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <Label htmlFor="service-price">Price (cents)</Label>
              <Input
                id="service-price"
                type="number"
                min={0}
                value={formPriceCents}
                onChange={(e) => setFormPriceCents(e.target.value)}
                placeholder="5999"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {formPriceCents && !isNaN(Number(formPriceCents))
                  ? formatPrice(Number(formPriceCents))
                  : "Enter amount in cents (e.g. 5999 = $59.99)"}
              </p>
            </div>
            {editingService && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="service-enabled"
                  checked={formEnabled}
                  onChange={(e) => setFormEnabled(e.target.checked)}
                  className="rounded border-input"
                />
                <Label htmlFor="service-enabled">Enabled (visible in catalog)</Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveService} disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {editingService ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
