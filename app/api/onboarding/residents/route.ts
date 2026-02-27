import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId");
  if (!propertyId) {
    return apiError("BAD_REQUEST", "Query param propertyId is required", 400);
  }
  const residents = await prisma.resident.findMany({
    where: { propertyId },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, propertyId: true },
  });
  return apiSuccess(residents);
}
