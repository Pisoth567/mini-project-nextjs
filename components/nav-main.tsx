"use client"

import { IconCirclePlusFilled, IconEye, IconPencil, IconTrash, IconFilePlus, type Icon } from "@tabler/icons-react"
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


  const pathname = usePathname();
  
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
  ];

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              asChild
            >
              <Link href="/dashboard?tab=create" className="flex items-center gap-2">
                <IconCirclePlusFilled />
                <span>Quick Create</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.includes(item.title.toLowerCase()) || 
                            (typeof window !== 'undefined' && 
                             new URLSearchParams(window.location.search).get('tab') === item.title.toLowerCase());
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  asChild
                  isActive={isActive}
                  className={isActive ? "bg-primary/10 text-primary" : ""}
                >
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}