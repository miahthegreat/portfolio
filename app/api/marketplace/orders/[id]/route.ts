import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      resident: { select: { id: true, name: true, email: true, propertyId: true } },
      items: {
        include: {
          service: { select: { id: true, name: true, category: true, priceCents: true } },
        },
      },
    },
  });

  if (!order) return apiError("NOT_FOUND", "Order not found", 404);

  const totalCents = order.items.reduce(
    (sum: number, i: { priceCents: number; quantity: number }) =>
      sum + i.priceCents * i.quantity,
    0
  );

  return apiSuccess({ ...order, totalCents });
}
