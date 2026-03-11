import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchIdea, fetchResearchIdea } from "./ideas.api"
import { formSchema } from "./types"


export function useResearchIdea() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-idea"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchIdea(token)
        },
    })
}

export function useCreateResearchIdea(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchIdea(data)
        },
        onSuccess: () => {
            toast.success("Research Idea Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-idea"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}
