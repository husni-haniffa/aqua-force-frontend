import { deleteResearchSupervisor } from "@/api/research-supervisor";
import { useResearchSupervisor } from "@/features/public/conduct-research/research-supervisor/supervisor.hooks";
export { useResearchSupervisor }
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteResearcSupervisor(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchSupervisor(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Application deleted")
            queryClient.invalidateQueries({ queryKey: ["research-supervisor"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}
