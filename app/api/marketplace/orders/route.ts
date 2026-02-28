import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");

  if (!propertyId) {
    return apiError("BAD_REQUEST", "Query param propertyId is required", 400);
  }

  const residentIds = await prisma.resident
    .findMany({
      where: { propertyId },
      select: { id: true },
    })
    .then((r: { id: string }[]) => r.map((x: { id: string }) => x.id));

  if (residentIds.length === 0) {
    return apiSuccess([]);
  }

  const orders = await prisma.order.findMany({
    where: { residentId: { in: residentIds } },
    orderBy: { createdAt: "desc" },
    include: {
      resident: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          service: { select: { id: true, name: true, category: true } },
        },
      },
    },
  });

  const withTotals = orders.map((order: (typeof orders)[number]) => {
    const totalCents = order.items.reduce(
      (sum: number, i: { priceCents: number; quantity: number }) =>
        sum + i.priceCents * i.quantity,
      0
    );
    return { ...order, totalCents };
  });

  return apiSuccess(withTotals);
}
