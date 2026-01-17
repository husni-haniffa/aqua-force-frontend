import z from "zod"

export interface NewsRequest {
    title: string
    content: string
}

export interface NewsResponse {
    _id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

export interface NewsFormProps {
    onSuccess?: () => void
}

export interface EditNewsFormProps extends NewsFormProps {
    newsId: string
}

export const formSchema = z.object({
    title: z
    .string()
    .min(25, 'Title must be atleast 25 characters')
    .max(50, 'Title must not be more than 50 characters'),

    content: z
    .string()
    .min(75, 'Content must be atleast 75 characters')
    .max(725, 'Content must not be more than 725 characters')
})



