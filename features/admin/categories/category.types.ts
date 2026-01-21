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
        .trim()
        .min(5, "Name must be at least 5 characters")
        .max(25, "Name must not exceed 25 characters")
        .regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
});


