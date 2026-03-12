import { deleteResearchHelp } from "@/api/research-help";
import { useResearchHelps } from "@/features/public/conduct-research/research-helps/helps.hooks";
export { useResearchHelps }
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useDeleteResearchHelp(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchHelp(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Application deleted")
            queryClient.invalidateQueries({ queryKey: ["research-help"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}