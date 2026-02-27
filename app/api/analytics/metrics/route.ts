import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  let from: Date;
  let to: Date;

  if (fromParam && toParam) {
    from = new Date(fromParam + "T00:00:00");
    to = new Date(toParam + "T23:59:59.999");
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return apiError("BAD_REQUEST", "Invalid from or to date (use YYYY-MM-DD)", 400);
    }
    if (from > to) {
      return apiError("BAD_REQUEST", "from must be before or equal to to", 400);
    }
  } else {
    to = new Date();
    from = new Date(to);
    from.setDate(from.getDate() - 90);
    from.setHours(0, 0, 0, 0);
  }

  const metrics = await prisma.dailyMetric.findMany({
    where: {
      date: { gte: from, lte: to },
    },
    orderBy: { date: "asc" },
  });

  const data = metrics.map((m) => ({
    id: m.id,
    date: m.date.toISOString().slice(0, 10),
    adoptionRate: m.adoptionRate,
    revenue: m.revenue,
    attachRate: m.attachRate,
    churnRate: m.churnRate,
  }));

  return apiSuccess(data);
}
