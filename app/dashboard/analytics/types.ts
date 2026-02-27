export interface DailyMetric {
  id: string;
  date: string;
  adoptionRate: number;
  revenue: number;
  attachRate: number;
  churnRate: number;
}

export type TimeRange = "7d" | "30d" | "90d";
