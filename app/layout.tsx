import type { Metadata } from "next";
import { Red_Hat_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/components/session-provider";
import { AppShell } from "@/components/app-shell";
import { SkipToContent } from "@/components/skip-to-content";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const rhMono = Red_Hat_Mono({
  variable: "--font-redhat-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Portfolio",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rhMono.variable} flex h-screen flex-col overflow-hidden font-mono antialiased`}
      >
        <SkipToContent />
        <ThemeProvider>
          <SessionProvider>
            <TooltipProvider delayDuration={200}>
              <div className="flex min-h-0 flex-1 flex-col">
                <AppShell>{children}</AppShell>
              </div>
              <Toaster
              position="bottom-right"
              richColors
              closeButton
              toastOptions={{
                className: "font-sans",
              }}
            />
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
