import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { fetchWaitlist } from "./waitlist.api"

export function useWaitlist() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["waitlist"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchWaitlist(token)
        },
    })
}