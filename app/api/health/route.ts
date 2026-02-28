import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Health check for Docker, orchestration, and load balancers.
 * GET /api/health returns 200 with { ok: true } and optional DB status.
 */
export async function GET() {
  const body: { ok: boolean; db?: "ok" | "error"; timestamp?: string } = {
    ok: true,
    timestamp: new Date().toISOString(),
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    body.db = "ok";
  } catch {
    body.db = "error";
  }
  return NextResponse.json(body, { status: 200 });
}
