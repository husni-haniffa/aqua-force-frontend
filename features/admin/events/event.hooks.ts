import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { fetchEvents, fetchEventById, createEvent, updateEvent, deleteEvent } from "./event.api"
import * as z from "zod"
import { EventResponse, formSchema } from "./event.types"

export function useEvents() {
    return useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents
    })
}

export function useEventById(eventId: string) {
    return useQuery<EventResponse>({
        queryKey: ["events", eventId],
        enabled: !!eventId,
        queryFn: () => fetchEventById(eventId),
    })
}

export function useCreateEvent(onSuccess?: () => void) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return createEvent(data, token)
        },
        onSuccess: () => {
            toast.success("Event created")
            queryClient.invalidateQueries({ queryKey: ["events"] })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Create failed")
        },
    })
}

export function useUpdateEvent(
    eventId: string,
    onSuccess?: () => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return updateEvent({ id: eventId, data, token })
        },
        onSuccess: () => {
            toast.success("Event updated")
            queryClient.invalidateQueries({ queryKey: ["events"] })
            queryClient.invalidateQueries({
                queryKey: ["events", eventId],
            })
            onSuccess?.()
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Update failed")
        },
    })
}

export function useDeleteEvent(
    setDeletingId: (id: string | null) => void
) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken()
            if (!token) throw new Error("Not authenticated")
            return deleteEvent(id, token)
        },
        onMutate: (id) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            toast.success("Event deleted")
            queryClient.invalidateQueries({ queryKey: ["events"] })
        },
        onError: (err: Error) => {
            toast.error(err.message ?? "Delete failed")
        },
    })
}
