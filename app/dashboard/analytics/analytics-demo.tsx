"use client";

import { useCallback, useEffect, useState } from "react";

/** Match Tailwind sm breakpoint: hide Y axis labels below 640px to free chart space. */
function useSmallScreen() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return small;
}
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, TrendingUp, DollarSign, Users, Percent } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProperty } from "@/contexts/property-context";
import type { DailyMetric, TimeRange } from "./types";

/** Chart colors: distinct per series, readable in light and dark mode */
function useChartColors() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return {
    grid: isDark ? "hsl(0 0% 35%)" : "hsl(220 10% 88%)",
    tick: isDark ? "hsl(0 0% 75%)" : "hsl(220 10% 40%)",
    tooltipBg: isDark ? "hsl(0 0% 18%)" : "hsl(0 0% 100%)",
    tooltipBorder: isDark ? "hsl(0 0% 28%)" : "hsl(220 10% 88%)",
    tooltipText: isDark ? "hsl(0 0% 95%)" : "hsl(220 15% 15%)",
    revenue: isDark ? "hsl(217 91% 60%)" : "hsl(217 91% 45%)",
    adoption: isDark ? "hsl(160 84% 52%)" : "hsl(160 84% 38%)",
    attach: isDark ? "hsl(38 92% 55%)" : "hsl(38 92% 42%)",
    churn: isDark ? "hsl(280 67% 65%)" : "hsl(280 67% 48%)",
  };
}

const API = "/api/analytics/metrics";

function formatDate(s: string) {
  return new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function toYYYYMMDD(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Returns inclusive [from, to] so the number of calendar days matches the range (7, 30, or 90). */
function getRangeDates(range: TimeRange): { from: string; to: string } {
  const to = new Date();
  const from = new Date(to);
  if (range === "7d") from.setDate(from.getDate() - 6);   // 7 days: today-6..today
  else if (range === "30d") from.setDate(from.getDate() - 29); // 30 days
  else from.setDate(from.getDate() - 89);                    // 90 days
  return { from: toYYYYMMDD(from), to: toYYYYMMDD(to) };
}

function formatPercent(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}
function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function AnalyticsDemo() {
  const { selectedPropertyId } = useProperty();
  const colors = useChartColors();
  const smallScreen = useSmallScreen();
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<TimeRange>("30d");

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const { from, to } = getRangeDates(range);
      const res = await fetch(`${API}?from=${from}&to=${to}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Failed to load metrics");
      setMetrics(json.data ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load metrics");
      setMetrics([]);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // Card values: aggregates for the selected range; cap to exact 7/30/90 days so revenue is never over-counted
  const expectedDays = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const capped = metrics.length > expectedDays ? metrics.slice(-expectedDays) : metrics;
  const n = capped.length;
  const totalRevenue = n ? capped.reduce((s, m) => s + m.revenue, 0) : 0;
  const avgAdoption = n ? capped.reduce((s, m) => s + m.adoptionRate, 0) / n : 0;
  const avgAttach = n ? capped.reduce((s, m) => s + m.attachRate, 0) / n : 0;
  const avgChurn = n ? capped.reduce((s, m) => s + m.churnRate, 0) / n : 0;
  // Trend: compare second half of period to first half (no extra fetch)
  const mid = Math.floor(n / 2);
  const firstHalf = mid > 0 ? capped.slice(0, mid) : [];
  const secondHalf = mid > 0 ? capped.slice(mid) : capped;
  const revFirst = firstHalf.reduce((s, m) => s + m.revenue, 0);
  const revSecond = secondHalf.reduce((s, m) => s + m.revenue, 0);
  const adoptionFirst = firstHalf.length ? firstHalf.reduce((s, m) => s + m.adoptionRate, 0) / firstHalf.length : 0;
  const adoptionSecond = secondHalf.length ? secondHalf.reduce((s, m) => s + m.adoptionRate, 0) / secondHalf.length : 0;
  const attachFirst = firstHalf.length ? firstHalf.reduce((s, m) => s + m.attachRate, 0) / firstHalf.length : 0;
  const attachSecond = secondHalf.length ? secondHalf.reduce((s, m) => s + m.attachRate, 0) / secondHalf.length : 0;
  const churnFirst = firstHalf.length ? firstHalf.reduce((s, m) => s + m.churnRate, 0) / firstHalf.length : 0;
  const churnSecond = secondHalf.length ? secondHalf.reduce((s, m) => s + m.churnRate, 0) / secondHalf.length : 0;
  const rangeLabel = range === "7d" ? "7d" : range === "30d" ? "30d" : "90d";

  if (!selectedPropertyId) {
    return (
      <div data-testid="analytics-page" className="mx-auto min-w-0 max-w-full max-w-6xl px-4 py-8 sm:px-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No property selected.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a property in the sidebar to view analytics and metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-testid="analytics-page" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Platform metrics, trends, and time-range filters. Data is aggregated across properties.
          </p>
        </div>
        <Link href="/dashboard/docs#api" className="text-sm font-medium text-primary hover:underline">
          API docs →
        </Link>
      </div>

      <Tabs value={range} onValueChange={(v) => setRange(v as TimeRange)} className="space-y-6" data-testid="analytics-tabs">
        <TabsList>
          <TabsTrigger data-testid="analytics-range-7d" value="7d">
            7 days
          </TabsTrigger>
          <TabsTrigger data-testid="analytics-range-30d" value="30d">
            30 days
          </TabsTrigger>
          <TabsTrigger data-testid="analytics-range-90d" value="90d">
            90 days
          </TabsTrigger>
        </TabsList>

        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : metrics.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No metrics in this range. Run <code className="rounded bg-muted px-1">pnpm db:seed</code> to populate sample data.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" key={range}>
              <Card data-testid="analytics-card-revenue">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                  <DollarSign className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{n ? formatCurrency(totalRevenue) : "—"}</div>
                  {n > 1 && revFirst > 0 && (
                    <p className={`mt-1 flex items-center text-xs ${revSecond >= revFirst ? "text-emerald-600" : "text-red-600"}`}>
                      {revSecond >= revFirst ? (
                        <TrendingUp className="mr-1 size-3 text-emerald-600" />
                      ) : null}
                      {`${(((revSecond - revFirst) / revFirst) * 100).toFixed(1)}% vs first half of ${rangeLabel}`}
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card data-testid="analytics-card-adoption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Adoption rate</CardTitle>
                  <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{n ? formatPercent(avgAdoption) : "—"}</div>
                  {n > 1 && (
                    <p className={`mt-1 flex items-center text-xs ${adoptionSecond >= adoptionFirst ? "text-emerald-600" : "text-red-600"}`}>
                      {adoptionSecond >= adoptionFirst ? (
                        <TrendingUp className="mr-1 size-3 text-emerald-600" />
                      ) : null}
                      {formatPercent(adoptionSecond - adoptionFirst)} vs first half of {rangeLabel}
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card data-testid="analytics-card-attach">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Attach rate</CardTitle>
                  <Percent className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{n ? formatPercent(avgAttach) : "—"}</div>
                  {n > 1 && (
                    <p className={`mt-1 flex items-center text-xs ${attachSecond >= attachFirst ? "text-emerald-600" : "text-red-600"}`}>
                      {attachSecond >= attachFirst ? (
                        <TrendingUp className="mr-1 size-3 text-emerald-600" />
                      ) : null}
                      {formatPercent(attachSecond - attachFirst)} vs first half of {rangeLabel}
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card data-testid="analytics-card-churn">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Churn rate</CardTitle>
                  <BarChart3 className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{n ? formatPercent(avgChurn) : "—"}</div>
                  {n > 1 && (
                    <p className={`mt-1 flex items-center text-xs ${churnSecond <= churnFirst ? "text-emerald-600" : "text-red-600"}`}>
                      {churnSecond <= churnFirst ? (
                        <TrendingUp className="mr-1 size-3 text-emerald-600" />
                      ) : null}
                      {formatPercent(churnSecond - churnFirst)} vs first half of {rangeLabel}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue &amp; rates over time</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Revenue (left axis) and adoption / attach / churn rates (right axis) for the selected range.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart key={`rates-${range}`} data={metrics} margin={{ top: 48, right: 20, left: smallScreen ? 4 : 12, bottom: 12 }}>
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatDate(v)}
                        tick={{ fill: colors.tick, fontSize: 13 }}
                        tickMargin={10}
                        axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
                      />
                      <YAxis
                        yAxisId="left"
                        hide={smallScreen}
                        tickFormatter={formatCurrency}
                        tick={{ fill: colors.tick, fontSize: 13 }}
                        tickMargin={12}
                        axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
                        width={smallScreen ? 0 : 64}
                        domain={["auto", "auto"]}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        hide={smallScreen}
                        tickFormatter={formatPercent}
                        tick={{ fill: colors.tick, fontSize: 13 }}
                        tickMargin={12}
                        axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
                        width={smallScreen ? 0 : 52}
                        domain={[0, 1]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: colors.tooltipBg,
                          border: `1px solid ${colors.tooltipBorder}`,
                          borderRadius: "var(--radius)",
                          color: colors.tooltipText,
                          ...(smallScreen && { fontSize: 11, padding: "6px 8px" }),
                        }}
                        labelStyle={{ color: colors.tooltipText, ...(smallScreen && { fontSize: 11 }) }}
                        labelFormatter={(v) => formatDate(v)}
                        formatter={(value, name, item) => {
                          const key = String(item?.dataKey ?? name);
                          const isRevenue = key === "revenue" || String(name).toLowerCase() === "revenue";
                          if (isRevenue) return [formatCurrency(Number(value)), "Revenue"];
                          return [formatPercent(Number(value)), name];
                        }}
                      />
                      <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 13, paddingBottom: 12 }} formatter={(value) => <span style={{ color: colors.tick }}>{value}</span>} iconSize={10} iconType="line" />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke={colors.revenue}
                        strokeWidth={2}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="adoptionRate"
                        name="Adoption"
                        stroke={colors.adoption}
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="attachRate"
                        name="Attach"
                        stroke={colors.attach}
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="churnRate"
                        name="Churn"
                        stroke={colors.churn}
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue trend</CardTitle>
                <p className="text-sm text-muted-foreground">Daily revenue (area chart).</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics} margin={{ top: 20, right: 20, left: smallScreen ? 4 : 12, bottom: 12 }}>
                      <defs>
                        <linearGradient id="analytics-revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.revenue} stopOpacity={0.4} />
                          <stop offset="100%" stopColor={colors.revenue} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tickFormatter={(v) => formatDate(v)}
                        tick={{ fill: colors.tick, fontSize: 13 }}
                        tickMargin={10}
                        axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
                      />
                      <YAxis
                        hide={smallScreen}
                        tickFormatter={(v) => formatCurrency(v)}
                        tick={{ fill: colors.tick, fontSize: 13 }}
                        tickMargin={12}
                        axisLine={{ stroke: colors.grid, strokeWidth: 1 }}
                        width={smallScreen ? 0 : 64}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: colors.tooltipBg,
                          border: `1px solid ${colors.tooltipBorder}`,
                          borderRadius: "var(--radius)",
                          color: colors.tooltipText,
                          ...(smallScreen && { fontSize: 11, padding: "6px 8px" }),
                        }}
                        labelStyle={{ color: colors.tooltipText, ...(smallScreen && { fontSize: 11 }) }}
                        labelFormatter={(v) => formatDate(v)}
                        formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke={colors.revenue}
                        strokeWidth={2}
                        fill="url(#analytics-revenue-gradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </Tabs>
    </div>
  );
}
