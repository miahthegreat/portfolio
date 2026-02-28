import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "BAD_REQUEST"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export interface ApiErrorBody {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
}

export interface ApiSuccessBody<T> {
  data: T;
}

/**
 * Consistent JSON error response for API routes.
 */
export function apiError(
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: unknown
) {
  return NextResponse.json(
    {
      error: { code, message, ...(details != null && { details }) },
    } satisfies ApiErrorBody,
    { status }
  );
}

/**
 * Consistent JSON success response.
 */
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ data } satisfies ApiSuccessBody<T>, { status });
}

/**
 * Parse JSON body and validate with zod. Returns [null, parsed] or [NextResponse, undefined].
 */
export async function parseBody<T>(
  request: Request,
  schema: { safeParseAsync: (v: unknown) => Promise<{ success: true; data: T } | { success: false; error: { flatten: () => unknown } }> }
): Promise<[NextResponse | null, T | undefined]> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return [apiError("BAD_REQUEST", "Invalid JSON body", 400), undefined];
  }
  const result = await schema.safeParseAsync(raw);
  if (!result.success) {
    return [
      apiError("VALIDATION_ERROR", "Validation failed", 422, result.error.flatten()),
      undefined,
    ];
  }
  return [null, result.data];
}
