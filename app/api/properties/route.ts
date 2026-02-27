import { prisma } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  const properties = await prisma.property.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true, address: true },
  });
  return apiSuccess(properties);
}
