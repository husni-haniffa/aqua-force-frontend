import z from "zod"



export interface EventResponse {
    _id: string
    title: string
    description: string
    eventDate: Date
    eventTime: string
    location: string
    imageUrl: string
    imagePath: string
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
        .max(20, "Title must not exceed 20 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    description: z
        .string()
        .trim()
        .min(15, "Description must be at least 15 characters")
        .max(125, "Description must not exceed 125 characters"),

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
        .min(3, "Location must be at least 3 characters")
        .max(75, "Location must not exceed 75 characters")
        .regex(
            /^[A-Za-z0-9 ,.-]+$/,
            "Location contains invalid characters"
        ),

    file: z
        .instanceof(File)
        .refine(
            (file) =>
                !file ||
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Only JPG, JPEG, or PNG files are allowed",
            }
        ),
});

export const editFormSchema = formSchema.extend({
    file: z.instanceof(File)
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            { message: "Only JPG, JPEG, or PNG files are allowed" }
        )
        .optional(),
})

export type EditFormSchema = z.infer<typeof editFormSchema>