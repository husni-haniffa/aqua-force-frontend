import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { fetchNews, fetchNewsById, createNews, updateNews, deleteNews } from "./news.api"
import * as z from "zod"
import { formSchema } from "./news.types"


export function useNews() {
    return useQuery({
        queryKey: ["news"],
        queryFn: fetchNews
    })
}

export function useNewsById(newsId: string) {
    return useQuery({
        queryKey: ["news", newsId],
        enabled: !!newsId,
        queryFn: () => fetchNewsById(newsId)
    })
}

export function useCreateNews(onSuccess?: () => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            const formData = new FormData()
            if (data.file) {
                formData.append("file", data.file)
            }
            formData.append("title", data.title)
            formData.append("content", data.content)
            return createNews(formData, token)
        },
        onSuccess: () => {
            toast.success("News created")
            queryClient.invalidateQueries({ queryKey: ["news"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}

export function useUpdateNews(newsId: string, onSuccess?: () => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema> & { image?: File }) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            const formData = new FormData()
            if (data.file) {
                formData.append("file", data.file)
            }
            formData.append("title", data.title)
            formData.append("content", data.content)
            return updateNews({ id: newsId, formData, token })
        },
        onSuccess: () => {
            toast.success("News updated")
            queryClient.invalidateQueries({ queryKey: ["news"] })
            queryClient.invalidateQueries({ queryKey: ["news", newsId] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useDeleteNews(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteNews(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("News deleted")
            queryClient.invalidateQueries({ queryKey: ["news"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}
