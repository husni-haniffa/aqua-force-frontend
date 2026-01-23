import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchSubmissions, submissionApproved, submissionRejected, submissionUnderReview, publishSubmission, deleteSubmission } from "./submission.api"
import { toast } from "sonner"


export function useSubmissions() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["submissions"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchSubmissions(token)
        },
    })
}

export function useSubmissionUnderReview() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionUnderReview(id, token)
        },
        onSuccess: () => {
            toast.success("Moved to Under Review")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
          
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },

    })
}

export function useSubmissionApproved() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionApproved(id, token)
        },
        onSuccess: () => {
            toast.success("Moved to Approved")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useSubmissionReject() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return submissionRejected(id, token)
        },
        onSuccess: () => {
            toast.success("Moved to Rejected")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function usePublishSubmission() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            id,
            accessLevel,
        }: {
            id: string
            accessLevel: "PUBLIC" | "MEMBERS"
        }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return publishSubmission(id, accessLevel, token)
        },
        onSuccess: () => {
            toast.success("Submission published")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Publish failed")
        },
    })
}

export function useDeleteSubmission(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteSubmission(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Submission deleted")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}