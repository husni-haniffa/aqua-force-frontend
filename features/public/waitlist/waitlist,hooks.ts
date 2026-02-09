import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { formSchema } from "./waitlist.types";
import { createWaitlist } from "./waitlist.api";
import { toast } from "sonner";

export function useCreateWaitlist() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return createWaitlist(data, token)
        },
        onSuccess: () => {
            toast.success("Application Submitted")
            queryClient.invalidateQueries({ queryKey: ["waitlist"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}