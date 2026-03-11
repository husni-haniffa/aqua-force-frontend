import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchFunding, fetchResearchFunding } from "./funding.api"
import { formSchema } from "./types"


export function useResearchFunding() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-funding"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchFunding(token)
        },
    })
}

export function useCreateResearchFudning(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchFunding(data)
        },
        onSuccess: () => {
            toast.success("Funding Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-funding"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}