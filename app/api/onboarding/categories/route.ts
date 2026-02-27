import { prisma } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  const categories = await prisma.taskCategory.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, sortOrder: true },
  });
  return apiSuccess(categories);
}
