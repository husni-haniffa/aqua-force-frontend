import { deleteResearchFunding } from "@/api/research-funding";
import { useResearchFunding } from "@/features/public/conduct-research/research-funding/funding.hooks";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export { useResearchFunding }

export function useDeleteResearchFunding(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchFunding(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Application deleted")
            queryClient.invalidateQueries({ queryKey: ["research-funding"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}