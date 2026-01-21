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

export interface CreateEventFormProps {
    onSuccess?: () => void
}

export interface EditEventFormProps extends CreateEventFormProps {
    eventId: string
}

export const formSchema = z.object({
    title: z
    .string()
    .trim()
    .min(5, 'Title must be atleast 5 characters')
    .max(25, 'Title must not be more than 25 characters'),

    description: z
    .string()
    .trim()
    .min(25, 'Description must be alteast 25 characters')
    .max(50, 'Description must not be more than 50 characters'),

    eventDate: z
    .date().refine(
        (date) => date > new Date(),
        { message: 'Date must be in future' }
    ),

    eventTime: z
    .string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time'),

    location: z
    .string()
    .trim()
    .min(15, 'Location must be atleast 15 characters')
    .max(30, 'Location must not be more than 30 characters')
    .regex(/^[a-zA-Z0-9 ,.-]+$/, 'Location must be only alphabets, numbers and .,-'),
})
