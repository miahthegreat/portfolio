/**
 * In-memory rate limiter for API routes and auth.
 * Suitable for single-instance deploy (e.g. Docker). For multi-instance, use Redis (e.g. Upstash).
 */

type WindowEntry = { count: number; resetAt: number };

const store = new Map<string, WindowEntry>();

function getWindow(key: string, windowMs: number): WindowEntry {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    const next = { count: 0, resetAt: now + windowMs };
    store.set(key, next);
    return next;
  }
  return entry;
}

/**
 * Returns true if the request should be rate limited (over limit).
 * Call this and if true, return 429 or reject auth.
 */
export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const window = getWindow(key, windowMs);
  window.count += 1;
  return window.count > limit;
}

function readHeader(
  headers: Headers | Record<string, string | string[] | undefined>,
  name: string
): string | null {
  if (typeof (headers as Headers).get === "function") {
    const v = (headers as Headers).get(name);
    return v ?? null;
  }
  const rec = headers as Record<string, string | string[] | undefined>;
  const v = rec[name] ?? rec[name.toLowerCase()];
  if (Array.isArray(v)) return v[0] ?? null;
  return typeof v === "string" ? v : null;
}

/**
 * Get a stable client identifier from request headers (e.g. for rate limiting by IP).
 * Prefers x-forwarded-for (first hop), then x-real-ip, then "unknown".
 * Works with Web Request (Headers) or Node IncomingHttpHeaders (e.g. NextAuth req).
 */
export function getClientIdentifier(request: {
  headers: Headers | Record<string, string | string[] | undefined>;
}): string {
  const headers = request.headers;
  const forwarded = readHeader(headers, "x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = readHeader(headers, "x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
