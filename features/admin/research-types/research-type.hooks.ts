import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { fetchResearchTypeById, fetchResearchTypes, createResearchType, updateResearchType, deleteResearchType } from "./research-type.api"
import * as z from "zod"
import { formSchema } from "./research-type.types"

export function useResearchTypes() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["researchTypes"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchTypes(token)
        },
    })
}

export function useResearchTypeById(researchTypeId: string) {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["researchTypes", researchTypeId],
        enabled: !!researchTypeId,
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchTypeById(researchTypeId, token)
        },
    })
}

export function useCreateResearchType(onSuccess?: () => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return createResearchType(data, token)
        },
        onSuccess: () => {
            toast.success("Research Type created")
            queryClient.invalidateQueries({ queryKey: ["researchTypes"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}

export function useUpdateResearchType(
    researchTypeId: string,
    onSuccess?: () => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return updateResearchType({ id: researchTypeId, data, token })
        },
        onSuccess: () => {
            toast.success("Research Type updated")
            queryClient.invalidateQueries({ queryKey: ["researchTypes"] })
            queryClient.invalidateQueries({
                queryKey: ["researchTypes", researchTypeId],
            })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useDeleteResearchType(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchType(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Research Type deleted")
            queryClient.invalidateQueries({ queryKey: ["researchTypes"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}
