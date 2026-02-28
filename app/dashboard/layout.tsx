import { PropertyProvider } from "@/contexts/property-context";
import { DashboardLayoutClient } from "@/components/dashboard-layout-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PropertyProvider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </PropertyProvider>
  );
}
