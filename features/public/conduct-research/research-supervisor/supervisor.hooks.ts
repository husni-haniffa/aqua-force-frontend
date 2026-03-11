import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchSupervisor, fetchResearchSupervisor } from "./supervisor.api"
import { formSchema } from "./types"


export function useResearchSupervisor() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-supervisor"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchSupervisor(token)
        },
    })
}

export function useCreateResearchSupervisor(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchSupervisor(data)
        },
        onSuccess: () => {
            toast.success("Research Supervisor Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-supervisor"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}