import { z } from "zod";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess, parseBody } from "@/lib/api-response";

const patchSchema = z.object({
  archive: z.boolean().optional(),
  unarchive: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return apiError("BAD_REQUEST", "Admin access required", 403);
  }
  const { id } = await params;
  const [err, body] = await parseBody(request, patchSchema);
  if (err) return err;
  if (!body?.archive && !body?.unarchive) {
    return apiError("BAD_REQUEST", "Provide archive: true or unarchive: true", 400);
  }
  try {
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) return apiError("NOT_FOUND", "Message not found", 404);
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        archivedAt: body.archive ? new Date() : body.unarchive ? null : undefined,
      },
    });
    return apiSuccess(updated);
  } catch {
    return apiError("INTERNAL_ERROR", "Failed to update message", 500);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return apiError("BAD_REQUEST", "Admin access required", 403);
  }
  const { id } = await params;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (e) {
    const msg = e as { code?: string };
    if (msg?.code === "P2025") return apiError("NOT_FOUND", "Message not found", 404);
    return apiError("INTERNAL_ERROR", "Failed to delete message", 500);
  }
}
