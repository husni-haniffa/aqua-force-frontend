import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchPlacement, fetchResearchPlacement } from "./placement.api"
import { formSchema } from "./types"


export function useResearchPlacements() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-placements"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchPlacement(token)
        },
    })
}

export function useCreateResearchPlacements(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchPlacement(data)
        },
        onSuccess: () => {
            toast.success("Research Placements Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-placements"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}
