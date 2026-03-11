import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchHelp, fetchResearchHelp } from "./helps.api"
import { formSchema } from "./types"

export function useResearchHelps() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-helps"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchHelp(token)
        },
    })
}

export function useCreateResearchHelps(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchHelp(data)
        },
        onSuccess: () => {
            toast.success("Research Helps Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-helps"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}