import { prisma } from "@/lib/db";
import { apiSuccess } from "@/lib/api-response";
import { getClientIdentifier } from "@/lib/rate-limit";

/**
 * Records a dashboard visit by IP. No auth required (so guest visits are counted).
 * Call from dashboard client on load.
 */
export async function POST(request: Request) {
  const ip = getClientIdentifier(request);
  if (ip === "unknown") {
    return apiSuccess({ recorded: false });
  }
  try {
    await prisma.visitorLog.upsert({
      where: { ip },
      create: { ip },
      update: { visitCount: { increment: 1 } },
    });
    return apiSuccess({ recorded: true });
  } catch {
    return apiSuccess({ recorded: false });
  }
}
