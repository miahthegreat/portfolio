import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Dashboard auth: single shared password from DASHBOARD_PASSWORD.
 * Set NEXTAUTH_SECRET (random string), NEXTAUTH_URL, and DASHBOARD_PASSWORD in .env.
 * In development only, a fallback secret is used if NEXTAUTH_SECRET is missing.
 */
const isDev = process.env.NODE_ENV === "development";
const secret =
  process.env.NEXTAUTH_SECRET ||
  (isDev ? "dev-secret-min-32-chars-change-in-production" : undefined);

if (!secret && !isDev) {
  console.warn("NEXTAUTH_SECRET is not set; dashboard auth may not work in production.");
}

export const authOptions: NextAuthOptions = {
  secret,
  providers: [
    CredentialsProvider({
      name: "Dashboard",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const expected = process.env.DASHBOARD_PASSWORD;
        if (!expected) {
          console.warn("DASHBOARD_PASSWORD not set; dashboard auth will reject all logins.");
          return null;
        }
        if (credentials?.password === expected) {
          return { id: "dashboard-admin", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
