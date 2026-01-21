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
        .min(5, "Title must be at least 5 characters")
        .max(25, "Title must not exceed 25 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(25, "Description must be at least 25 characters")
        .max(50, "Description must not exceed 50 characters"),

    eventDate: z
        .date()
        .refine((date) => date > new Date(), {
            message: "Date must be in the future",
        }),

    eventTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

    location: z
        .string()
        .trim()
        .min(15, "Location must be at least 15 characters")
        .max(30, "Location must not exceed 30 characters")
        .regex(
            /^[A-Za-z0-9 ,.-]+$/,
            "Location contains invalid characters"
        ),
});

