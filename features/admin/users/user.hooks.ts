import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { fetchUserList, removeRoleFromAdmin, updateRoleToAdmin } from "./user.api"
import { toast } from "sonner"

export function useFetchUsers() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchUserList(token)
        },
    })
}

export function useUpdateRoleToAdmin(setDeletingId: (id: string | null) => void){
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(id: string) => {
            const token = await getToken()
            if(!token) throw new Error('Not authenticated')
            return updateRoleToAdmin(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess:() => {
            toast.success('Updated role to Admin')
            queryClient.invalidateQueries({ queryKey: ["users"] })
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useRemoveRoleFromAdmin(setRemovingId: (id: string | null) => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error('Not authenticated')
            return removeRoleFromAdmin(id, token)
        },
        onMutate: (id) => setRemovingId(id),
        onSettled: () => setRemovingId(null),
        onSuccess: () => {
            toast.success('Removed role from Admin')
            queryClient.invalidateQueries({ queryKey: ["users"] })
            queryClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}
