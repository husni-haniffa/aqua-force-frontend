import { Roles } from "@/types/globals"
import { useUser } from "@clerk/nextjs"

export const useCheckRole = (role: Roles) => {
    const { user } = useUser()
    if (!user) return false
    return user.publicMetadata.role === role
}