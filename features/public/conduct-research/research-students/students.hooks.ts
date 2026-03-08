import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import * as z from "zod"
import { createResearchStudent, fetchResearchStudent } from "./students.api"
import { formSchema } from "./types"


export function useResearchStudents() {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ["research-students"],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return fetchResearchStudent(token)
        },
    })
}

export function useCreateResearchStudents(onSuccess?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return createResearchStudent(data)
        },
        onSuccess: () => {
            toast.success("Research Students Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["research-students"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Network request failed")
        },
    })
}