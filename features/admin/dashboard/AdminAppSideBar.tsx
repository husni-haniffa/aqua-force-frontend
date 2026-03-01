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
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminAppSideBar() {
  
  const pathname = usePathname()
  
  return (
    <Sidebar className="bg-slate-900 border-r border-slate-900 [&_.bg-slate-50]:bg-slate-900 [&_.bg-white]:bg-slate-800 [&_div[data-sidebar='sidebar-inner']]:bg-slate-900 [&_div[data-sidebar='group']]:bg-slate-800 [&_button[data-sidebar='menu-button']]:text-slate-300 [&_button[data-sidebar='menu-button']]:hover:bg-slate-700 [&_button[data-sidebar='menu-button']]:hover:text-white [&_button[data-sidebar='menu-button'][data-active='true']]:bg-blue-600 [&_button[data-sidebar='menu-button'][data-active='true']]:text-white [&_button[data-sidebar='menu-button'][data-active='true']]:font-semibold [&_span[data-sidebar='group-label']]:text-blue-400 [&_svg]:text-slate-400 [&_button[data-sidebar='menu-button'][data-active='true']_svg]:text-white">
      <SidebarHeader className="border-b border-slate-700 h-16 px-3 pt-3">
        <Link href="/" className="px-2 py-1.5">
            <span className="font-bold text-base sm:text-lg text-white">
              Research<span className="text-blue-400"> Minds Net</span>
            </span>
          </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-3 px-1">
        {adminNavLinks.map((group) => (
          <SidebarGroup key={group.label} className="mb-4">
            <SidebarGroupLabel className="text-xs font-semibold text-blue-400 uppercase tracking-wider px-2 mb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-0.5">
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
                        className={isActive ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 font-semibold" : "text-slate-300 hover:bg-slate-700 hover:text-white"}
                      >
                        <Link href={item.url} className="flex items-center gap-2 px-2 py-2">
                          <item.icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                          <span className={`text-sm font-medium ${isActive ? "text-white font-semibold" : ""}`}>{item.title}</span>
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