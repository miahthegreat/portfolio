import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";

/**
 * List guest visitors by IP. Admin only.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return apiError("BAD_REQUEST", "Admin access required", 403);
  }
  try {
    const visitors = await prisma.visitorLog.findMany({
      orderBy: { lastSeen: "desc" },
      take: 500,
    });
    return apiSuccess(
      visitors.map((v) => ({
        id: v.id,
        ip: v.ip,
        visitCount: v.visitCount,
        firstSeen: v.firstSeen.toISOString(),
        lastSeen: v.lastSeen.toISOString(),
      }))
    );
  } catch {
    return apiError("INTERNAL_ERROR", "Failed to load visitors", 500);
  }
}
