import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth, useUser } from "@clerk/nextjs"
import { EditFormSchema, formSchema } from "./submission.types"
import { fetchSubmissionByUserId, createSubmission, updateSubmission, fetchSubmissionById} from "./submission.api"
import z from "zod"

export function useSubmissionByUserId() {
    const { getToken, userId } = useAuth()
    return useQuery({
        queryKey: ["submissions", userId],
        enabled: !!userId,
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            if (!userId) throw new Error("Not authenticated")
            return fetchSubmissionByUserId(userId, token)
        },
    })
}

export function useSubmissionById(id: string) {
    const { getToken } = useAuth()
    return useQuery({
        queryKey: ["submissions", id],
        enabled: !!id,
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchSubmissionById(id, token)
        },
    })
}

export function useCreateSubmission(onSuccess?: () => void) {
    const { getToken, userId,  } = useAuth()
    const { user } = useUser()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            if (!userId) throw new Error("User not signed in")
            if (!user?.fullName) throw new Error("User profile incomplete")
            const formData = new FormData()    
            formData.append("userId", userId)
            formData.append("userName", user.fullName)
            formData.append("researchTypeId", data.researchTypeId)
            formData.append("categoryId", data.categoryId)
            formData.append("title", data.title)
            formData.append("abstract", data.abstract)
            formData.append("keywords", JSON.stringify(data.keywords))
            if (data.file) {
                formData.append("file", data.file)
            }
            return createSubmission(formData, token)
        },
        onSuccess: () => {
            toast.success("Submission created")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}

export function useUpdateSubmission(submissionId: string, onSuccess?: () => void) {
    const { getToken, userId } = useAuth()
    const { user } = useUser()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: EditFormSchema) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            if (!userId) throw new Error("User not signed in")
            if (!user?.fullName) throw new Error("User profile incomplete")
            const formData = new FormData()
            formData.append("userId", userId)
            formData.append("userName", user.fullName)
            formData.append("researchTypeId", data.researchTypeId)
            formData.append("categoryId", data.categoryId)
            formData.append("title", data.title)
            formData.append("abstract", data.abstract)
            formData.append("keywords", JSON.stringify(data.keywords))
            if (data.file) {
                formData.append("file", data.file)
            }
            return updateSubmission(submissionId, formData, token)
        },
        onSuccess: () => {
            toast.success("Submission updated")
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}