import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { fetchCategories, fetchCategoryById, createCategory, updateCategory, deleteCategory } from "./category.api"
import * as z from "zod"
import { formSchema } from "./category.types"

export function useCategories() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchCategories(token)
        },
    })
}

export function useCategoryById(categoryId: string) {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["categories", categoryId],
        enabled: !!categoryId,
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchCategoryById(categoryId, token)
        },
    })
}

export function useCreateCategory(onSuccess?: () => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return createCategory(data, token)
        },
        onSuccess: () => {
            toast.success("Category created")
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            onSuccess?.()
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}

export function useUpdateCategory(
    categoryId: string,
    onSuccess?: () => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return updateCategory({ id: categoryId, data, token })
        },
        onSuccess: () => {
            toast.success("Category updated")
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({
                queryKey: ["categories", categoryId],
            })
            onSuccess?.()
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useDeleteCategory(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteCategory(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Category deleted")
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (err: any) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}
