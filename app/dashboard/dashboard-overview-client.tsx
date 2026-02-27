"use client";

import { useProperty } from "@/contexts/property-context";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardOverviewClient() {
  const { selectedPropertyId, properties, loading } = useProperty();
  const property = properties.find((p) => p.id === selectedPropertyId);

  if (loading || !property) return null;

  return (
    <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm backdrop-blur-sm dark:from-primary/20 dark:to-primary/10">
      <CardContent className="flex items-center gap-3 py-4">
        <Building2 className="size-8 shrink-0 text-primary/80" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current property
          </p>
          <p className="font-semibold text-foreground">{property.name}</p>
          {property.address && (
            <p className="text-sm text-muted-foreground">{property.address}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
