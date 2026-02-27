import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, parseBody } from "@/lib/api-response";

const createTaskSchema = z.object({
  residentId: z.string().min(1, "residentId is required"),
  categoryId: z.string().min(1, "categoryId is required"),
  title: z.string().min(1, "title is required").max(500),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional().default("TODO"),
  owner: z.enum(["RESIDENT", "PM", "SYSTEM"]).optional().default("RESIDENT"),
  // Accept any date string (e.g. from datetime-local "YYYY-MM-DDTHH:mm") or empty/null
  dueDate: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v && v.trim() ? v : null)),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const residentId = searchParams.get("residentId");
  if (!residentId) {
    return apiError("BAD_REQUEST", "Query param residentId is required", 400);
  }

  const tasks = await prisma.onboardingTask.findMany({
    where: { residentId },
    orderBy: [{ category: { sortOrder: "asc" } }, { createdAt: "asc" }],
    include: {
      category: { select: { id: true, name: true, sortOrder: true } },
    },
  });
  return apiSuccess(tasks);
}

export async function POST(request: Request) {
  const [err, body] = await parseBody(request, createTaskSchema);
  if (err) return err;
  const data = body!;

  const dueDate =
    data.dueDate && !isNaN(Date.parse(data.dueDate))
      ? new Date(data.dueDate)
      : null;

  const task = await prisma.onboardingTask.create({
    data: {
      residentId: data.residentId,
      categoryId: data.categoryId,
      title: data.title,
      status: data.status,
      owner: data.owner,
      dueDate,
    },
    include: {
      category: { select: { id: true, name: true, sortOrder: true } },
    },
  });
  return apiSuccess(task, 201);
}
