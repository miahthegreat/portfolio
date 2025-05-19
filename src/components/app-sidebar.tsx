"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import ThemeToggle from "./theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FaGithub } from "react-icons/fa"
import { TbApiApp } from "react-icons/tb"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Reporting UI Elements",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Sample Dashboard",
          url: "/ui/dashboard",
        },
        {
          title: "Charts",
          url: "/ui/charts",
        },
        {
          title: "Tables",
          url: "/ui/tables",
        },
      ],
    },
    {
      title: "About",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Cover Letter",
          url: "/about/cover-letter",
        },
        {
          title: "Resume",
          url: "/about/resume",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={cn(
          "grid gap-2",
          open ? "grid-cols-2" : "grid-cols-1"
        )}>
          <Link href='/' className={buttonVariants({
            variant: "ghost"
          })}>
            <HomeIcon />
          </Link>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <div className="flex gap-6 items-center justify-center mb-4">
          <a 
            href='https://github.com/miahthegreat/' 
            target="_blank" 
            referrerPolicy="no-referrer" 
            // className={cn(
            //   buttonVariants({
            //     variant: "outline",
            //     className: "flex text-sm items-center gap-1"
            //   })
            // )}
          >
            <FaGithub className="h-6 w-6" /><span className="sr-only">github</span>
          </a>
          <a 
            href='https://frontend.jeremiahschmid.dev' 
            target="_blank" 
            referrerPolicy="no-referrer"
          >
            <TbApiApp className="h-6 w-6" /><span className="sr-only">apis</span>
          </a>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
