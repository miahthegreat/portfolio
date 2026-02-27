import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, parseBody } from "@/lib/api-response";

const patchServiceSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional().nullable(),
  category: z.string().min(1).max(100).optional(),
  priceCents: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return apiError("NOT_FOUND", "Service not found", 404);
  return apiSuccess(service);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [err, body] = await parseBody(request, patchServiceSchema);
  if (err) return err;
  const data = body!;

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Service not found", 404);

  const service = await prisma.service.update({
    where: { id },
    data: {
      ...(data.name != null && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.category != null && { category: data.category }),
      ...(data.priceCents != null && { priceCents: data.priceCents }),
      ...(data.enabled != null && { enabled: data.enabled }),
    },
  });
  return apiSuccess(service);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Service not found", 404);

  const withOrders = await prisma.orderItem.count({ where: { serviceId: id } });
  if (withOrders > 0) {
    return apiError(
      "CONFLICT",
      "Cannot delete service that has been ordered. Disable it instead.",
      409
    );
  }

  await prisma.service.delete({ where: { id } });
  return apiSuccess({ deleted: true });
}
