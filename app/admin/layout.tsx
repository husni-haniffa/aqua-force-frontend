"use client"
import { Label } from "@/components/ui/label"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AdminAppSideBar } from "@/features/admin/dashboard/AdminAppSideBar"
import { UserInfoSkeleton } from "@/features/admin/dashboard/Skeleton"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { isLoaded, user} = useUser()

  return (
    <SidebarProvider>
      <AdminAppSideBar />
      <SidebarInset className="bg-slate-50">
        
        <header className="sticky top-0 z-10 h-16 border-b">
          <div className="container flex h-full items-center justify-between px-6">
            <SidebarTrigger />

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-0.5">
                <Label className="text-sm font-semibold">{!isLoaded ? <UserInfoSkeleton/> : user?.fullName}</Label>
                <Label className="text-xs text-muted-foreground">Administrator</Label>
              </div>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </header>

        <main className="container py-8 px-6">
          {children}
        </main>
        
      </SidebarInset>
    </SidebarProvider>
  )
}