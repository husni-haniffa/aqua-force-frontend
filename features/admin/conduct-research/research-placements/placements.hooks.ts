import { deleteResearchPlacement } from "@/api/research-placement";
import { useResearchPlacements } from "@/features/public/conduct-research/research-placements/placements.hooks";
export { useResearchPlacements }
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteResearchPlacement(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchPlacement(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Application deleted")
            queryClient.invalidateQueries({ queryKey: ["research-placements"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}