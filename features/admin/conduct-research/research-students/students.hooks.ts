import { deleteResearchStudent } from "@/api/research-student";
import { useResearchStudents } from "@/features/public/conduct-research/research-students/students.hooks";
export { useResearchStudents }
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteResearchStudent(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteResearchStudent(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Application deleted")
            queryClient.invalidateQueries({ queryKey: ["research-student"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}