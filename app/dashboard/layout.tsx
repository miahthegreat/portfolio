import { PropertyProvider } from "@/contexts/property-context";
import { DashboardChrome } from "@/components/dashboard-chrome";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PropertyProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardChrome>{children}</DashboardChrome>
      </div>
    </PropertyProvider>
  );
}
