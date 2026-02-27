import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, parseBody } from "@/lib/api-response";

const patchTaskSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  categoryId: z.string().min(1).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  owner: z.enum(["RESIDENT", "PM", "SYSTEM"]).optional(),
  // Accept any date string (e.g. from datetime-local) or empty/null
  dueDate: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v && v.trim() ? v : null)),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [err, body] = await parseBody(request, patchTaskSchema);
  if (err) return err;
  const data = body!;

  const updatePayload: {
    title?: string;
    categoryId?: string;
    status?: "TODO" | "IN_PROGRESS" | "DONE";
    owner?: "RESIDENT" | "PM" | "SYSTEM";
    dueDate?: Date | null;
    completedAt?: Date | null;
  } = {};

  if (data.title !== undefined) updatePayload.title = data.title;
  if (data.categoryId !== undefined) updatePayload.categoryId = data.categoryId;
  if (data.status !== undefined) updatePayload.status = data.status;
  if (data.owner !== undefined) updatePayload.owner = data.owner;
  if (data.dueDate !== undefined) {
    updatePayload.dueDate =
      data.dueDate && !isNaN(Date.parse(data.dueDate))
        ? new Date(data.dueDate)
        : null;
  }

  // Idempotent completion: when marking DONE, set completedAt; when moving back, clear it
  if (data.status === "DONE") {
    updatePayload.completedAt = new Date();
  } else if (data.status === "TODO" || data.status === "IN_PROGRESS") {
    updatePayload.completedAt = null;
  }

  const task = await prisma.onboardingTask.update({
    where: { id },
    data: updatePayload,
    include: {
      category: { select: { id: true, name: true, sortOrder: true } },
    },
  }).catch(() => null);

  if (!task) {
    return apiError("NOT_FOUND", "Task not found", 404);
  }

  return apiSuccess(task);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const task = await prisma.onboardingTask.delete({ where: { id } }).catch(() => null);
  if (!task) {
    return apiError("NOT_FOUND", "Task not found", 404);
  }
  return apiSuccess({ deleted: true }, 200);
}
