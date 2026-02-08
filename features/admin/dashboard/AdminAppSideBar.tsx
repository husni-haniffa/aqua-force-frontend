import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { adminNavLinks } from "@/lib/adminNavLinks"
import { Brain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminAppSideBar() {
  
  const pathname = usePathname()
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-16 px-4">
        <Link href={"/"} className='flex items-center py-3'>
         
       
            <span className="font-bold text-lg leading-tight bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Research Minds Net
            </span>
  
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-4 px-2">
        {adminNavLinks.map((group) => (
          <SidebarGroup key={group.label} className="mb-6">
            <SidebarGroupLabel className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.url || pathname.startsWith(item.url + "/")

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className={isActive ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-md shadow-blue-500/20" : ""}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}