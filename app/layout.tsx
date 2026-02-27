import type { Metadata } from "next";
import { Space_Mono, JetBrains_Mono, Red_Hat_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const rhMono = Red_Hat_Mono({
  variable: "--font-redhat-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Jeremiah Schmid | Portfolio",
    template: "%s | Portfolio",
  },
  description:
    "Full-stack portfolio: Resident Experience Platform — onboarding, marketplace, and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rhMono.variable} min-h-screen overflow-x-hidden font-mono antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <AppShell>{children}</AppShell>
            <Toaster
              position="bottom-right"
              richColors
              closeButton
              toastOptions={{
                className: "font-sans",
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
