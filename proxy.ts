import type { NextRequest } from "next/server";
import nextAuthMiddleware from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

/**
 * Protect all dashboard routes except /dashboard/login.
 * Unauthenticated users are redirected to signIn page (/dashboard/login).
 */
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/((?!login).*)",
  ],
};

export function proxy(request: NextRequest) {
  return nextAuthMiddleware(request as NextRequestWithAuth);
}
