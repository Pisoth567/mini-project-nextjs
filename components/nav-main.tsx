"use client"

import { IconCirclePlusFilled, IconEye, IconPencil, IconTrash, IconFilePlus } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain() {
  const pathname = usePathname()

  const items = [
    {
      title: "Create",
      url: "/dashboard/create",
      icon: IconFilePlus,
    },
    {
      title: "Delete",
      url: "/dashboard/delete",
      icon: IconTrash,
    },
    {
      title: "Update",
      url: "/dashboard/update",
      icon: IconPencil,
    },
    {
      title: "View",
      url: "/dashboard/view",
      icon: IconEye,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        
        {/* Quick Create */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/dashboard/create" className="flex items-center gap-2">
                <IconCirclePlusFilled />
                <span>Quick Create</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Navigation */}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.startsWith(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}