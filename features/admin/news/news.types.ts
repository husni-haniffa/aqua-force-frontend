import z from "zod"

export interface NewsResponse {
    _id: string
    title: string
    content: string
    imageUrl?: string
    imagePath?: string
    createdAt: string
    updatedAt: string
}

export interface CreateNewsFormProps {
    onSuccess?: () => void
}

export interface EditNewsFormProps extends CreateNewsFormProps {
    newsId: string
}

export const formSchema = z.object({
    title: z
    .string()
    .min(10, 'Title must be atleast 25 characters')
    .max(10, 'Title must not be more than 50 characters'),

    content: z
    .string()
    .min(10, 'Content must be atleast 75 characters')
    .max(10, 'Content must not be more than 725 characters'),

    file: z
        .instanceof(File)
        .optional()
        .refine(
            (file) =>
                !file ||
                [ "image/jpeg", "image/png", "image/jpg"].includes(
                    file.type
                ),
            {
                message: " JPG, JPEG, or PNG files are allowed",
            }
        ),

})



