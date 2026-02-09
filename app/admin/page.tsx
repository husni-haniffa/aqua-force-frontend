"use client"

import { UserNameSkeleton } from "@/features/admin/dashboard/Skeleton"
import AdminOverview from "@/features/admin/overview/Overview"
import { useUser } from "@clerk/nextjs"

const Page = () => {

  const { isLoaded, user} = useUser()

  return (
    <div className="flex flex-col gap-9"> 
      <header className="text-3xl lg:text-4xl text-slate-800">
        Welcome back, {!isLoaded ? <UserNameSkeleton/> : <span className="font-bold">{user?.firstName}!</span>}
      </header>
      <AdminOverview/>
    </div>
  )
}

export default Page