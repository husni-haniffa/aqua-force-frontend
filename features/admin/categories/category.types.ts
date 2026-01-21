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

export interface CreateCategoryFormProps {
    onSuccess?: () => void
}

export interface EditCategoryFormProps extends CreateCategoryFormProps {
    categoryId: string
}

export const formSchema = z.object({
    name: z
    .string()
    .min(5, 'Name must be atleast 5 characters')
    .max(25, 'Name must not be more than 25 characters')
    .regex(/^[a-zA-Z ]+$/, 'Name must be only alphabets')
})

