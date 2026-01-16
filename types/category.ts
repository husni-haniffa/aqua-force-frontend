import z from "zod"

export interface CategoryRequest {
    name: string
}

export interface CategoryResponse {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface CategoryFormProps {
    onSuccess?: () => void
}

export const formSchema = z.object({
    name: z
    .string()
    .min(5, 'Category name must be atleast 5 characters')
    .max(25, 'Category name must not be more than 25 characters')
    .regex(/^[a-zA-Z ]+$/, 'Category name must contain be only alphabets')
})

