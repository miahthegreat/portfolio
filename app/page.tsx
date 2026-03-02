import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Mail, FileText, LayoutDashboard } from "lucide-react";
import { DotsPattern, HeroBlobs } from "@/components/svg-backgrounds";

export default function Home() {
  return (
    <div
      data-testid="hero"
      className="relative flex min-w-0 flex-col justify-center overflow-hidden bg-gradient-hero -mx-4 w-[calc(100%+2rem)] min-h-[100vh] min-h-[100dvh] max-h-[100vh] max-h-[100dvh] sm:-mx-6 sm:w-[calc(100%+3rem)] md:min-h-[calc(100vh-4rem)] md:min-h-[calc(100dvh-4rem)] md:max-h-[calc(100vh-4rem)] md:max-h-[calc(100dvh-4rem)] lg:-mx-0 lg:ml-[calc(50%-50vw)] lg:w-screen"
    >
      <HeroBlobs />
      <DotsPattern size={40} radius={1.5} className="opacity-100" />

      <div className="relative mx-auto flex min-w-0 max-w-full max-w-6xl flex-1 flex-col justify-center px-4 py-4 sm:px-6 sm:py-8">
        <div className="mx-auto min-w-0 max-w-full max-w-3xl text-center">
          <h1 data-testid="hero-title" className="font-sans animate-slide-up text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-foreground">Jeremiah</span>
            <br />
            <span className="text-gradient bg-clip-text">Schmid</span>
          </h1>
          <p className="mt-3 animate-slide-up text-lg text-muted-foreground opacity-0 [animation-fill-mode:forwards] [animation-delay:100ms] sm:mt-4 sm:text-xl">
            Developer & Data Analyst — full-stack apps, analytics, and data-driven solutions.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-0 [animation-fill-mode:forwards] [animation:slide-up_0.5s_var(--ease-out-expo)_0.2s_forwards] sm:mt-8 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="group/btn gap-2 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] text-white shadow-lg shadow-primary/30 transition-smooth-slow hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98]"
            >
              <Link data-testid="hero-cta-about" href="/about" className="flex items-center gap-2">
                <User className="size-4" />
                About
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="group/btn gap-2 border-2 border-primary/30 bg-white/60 backdrop-blur-sm text-foreground transition-smooth-slow hover:scale-[1.03] hover:border-primary/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40"
            >
              <Link data-testid="hero-cta-contact" href="/contact" className="flex items-center gap-2">
                <Mail className="size-4" />
                Contact
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-primary/30 bg-white/60 backdrop-blur-sm transition-smooth-slow hover:scale-[1.03] hover:border-primary/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40"
            >
              <Link data-testid="hero-cta-resume" href="/resume" className="flex items-center gap-2">
                <FileText className="size-4" />
                Resume
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:mx-auto sm:max-w-md sm:grid-cols-1 sm:mt-16">
          <Link
            data-testid="hero-dashboard-card"
            href="/dashboard"
            className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/70 p-4 text-left shadow-xl backdrop-blur-xl opacity-0 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 dark:border-white/20 dark:bg-black/40 animate-slide-up [animation-fill-mode:forwards] sm:p-5"
            style={{ animationDelay: "350ms" }}
          >
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <LayoutDashboard className="relative size-9 text-primary transition-transform duration-300 group-hover:scale-110 sm:size-10" />
            <h2 className="relative mt-3 font-sans text-lg font-bold text-foreground sm:mt-4 sm:text-xl">Admin dashboard</h2>
            <p className="relative mt-1.5 text-sm text-muted-foreground sm:mt-2">
              Sample full-stack app — onboarding, marketplace, and analytics. Built with Next.js, TypeScript, Prisma, and PostgreSQL.
            </p>
            <span className="relative mt-3 inline-flex items-center text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1 sm:mt-4">
              Open dashboard
              <ArrowRight className="ml-2 size-4 opacity-0 transition-all duration-200 group-hover:ml-3 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
