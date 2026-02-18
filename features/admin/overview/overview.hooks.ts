import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { fetchAdminOverview } from "./overview.api"

export function useFetchAdminOverview() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["overview"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchAdminOverview(token)
        },
    })
}
