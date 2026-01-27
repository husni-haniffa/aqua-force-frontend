"use client"

import { UserNameSkeleton } from "@/features/admin/dashboard/Skeleton"
import { useUser } from "@clerk/nextjs"

const Page = () => {

  const { isLoaded, user} = useUser()

  return (
    <div>
      <header className="text-3xl lg:text-4xl text-slate-800">
        Welcome back, {!isLoaded ? <UserNameSkeleton/> : <span className="font-bold">{user?.firstName}!</span>}
      </header>
    </div>
  )
}

export default Page