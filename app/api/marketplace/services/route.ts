import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiSuccess, parseBody } from "@/lib/api-response";

const createServiceSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional().nullable(),
  category: z.string().min(1).max(100),
  priceCents: z.number().int().min(0),
  enabled: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const enabledOnly = searchParams.get("enabled") !== "false";

  const services = await prisma.service.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(enabledOnly ? { enabled: true } : {}),
    },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  return apiSuccess(services);
}

export async function POST(request: Request) {
  const [err, body] = await parseBody(request, createServiceSchema);
  if (err) return err;
  const data = body!;

  const service = await prisma.service.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      category: data.category,
      priceCents: data.priceCents,
      enabled: data.enabled,
    },
  });
  return apiSuccess(service, 201);
}
