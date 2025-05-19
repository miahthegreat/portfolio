"use client"

import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      {items.map((item) => {
        return (
          <div key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuSub className="ml-2 pl-2">
                  {item.items?.map((sub) => {
                    const subActive = pathname === sub.url
                    return (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={sub.url}
                            className={
                              subActive
                                ? "font-semibold bg-muted"
                                : "text-gray-500 hover:text-gray-900"
                            }
                          >
                            {sub.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        )
      })}
    </SidebarGroup>
  )
}
