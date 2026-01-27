"use client"

import { UserNameSkeleton } from "@/features/admin/dashboard/Skeleton"
import { useUser } from "@clerk/nextjs"

const Page = () => {

  const { isLoaded, user} = useUser()

  return (
    <div>
      <header>
        Welcome back, {!isLoaded ? <UserNameSkeleton/> : user?.firstName}
      </header>
    </div>
  )
}

export default Page