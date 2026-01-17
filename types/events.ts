import z from "zod"

export interface EventRequest {
    title: string
    description: string
    eventDate: Date  
    eventTime: string  
    location: string
}

export interface EventResponse {
    _id: string
    title: string
    description: string
    eventDate: Date
    eventTime: string
    location: string
    createdAt: string
    updatedAt: string
}

export interface EventFormProps {
    onSuccess?: () => void
}

export interface EditEventFormProps extends EventFormProps {
    eventId: string
}

export const formSchema = z.object({
    title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(25, 'Title must not exceed 25 characters'),

    description: z
    .string()
    .trim()
    .min(25, 'Description must be at least 25 characters')
    .max(100, 'Description must not exceed 100 characters'),

    eventDate: z
    .date().refine(
        (date) => date > new Date(),
        { message: 'Event must be in future' }
    ),

    eventTime: z
    .string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time'),

    location: z
    .string()
    .trim()
    .min(3, 'Location must be at least 3 characters')
    .max(50, 'Location must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9 ,.-]+$/, 'Location contains invalid characters'),
})
