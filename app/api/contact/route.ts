import { z } from "zod";
import { prisma } from "@/lib/db";
import { apiError, apiSuccess, parseBody } from "@/lib/api-response";
import { getClientIdentifier, isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required").max(320),
  message: z.string().min(1, "Message is required").max(10_000),
});

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return apiSuccess(messages);
  } catch {
    return apiError("INTERNAL_ERROR", "Failed to load messages", 500);
  }
}

const CONTACT_RATE_LIMIT = 5;
const CONTACT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: Request) {
  const clientId = getClientIdentifier(request);
  if (isRateLimited(`contact:${clientId}`, CONTACT_RATE_LIMIT, CONTACT_WINDOW_MS)) {
    return apiError("RATE_LIMITED", "Too many contact requests. Try again later.", 429);
  }
  const [err, body] = await parseBody(request, contactSchema);
  if (err) return err;
  const data = body!;

  try {
    const message = await prisma.contactMessage.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      },
    });
    return apiSuccess({ id: message.id }, 201);
  } catch {
    return apiError("INTERNAL_ERROR", "Failed to save message", 500);
  }
}
