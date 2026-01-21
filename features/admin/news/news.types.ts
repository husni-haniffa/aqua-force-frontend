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
        .trim()
        .min(25, "Title must be at least 25 characters")
        .max(50, "Title must not exceed 50 characters"),

    content: z
        .string()
        .trim()
        .min(75, "Content must be at least 75 characters")
        .max(725, "Content must not exceed 725 characters"),

    file: z
        .instanceof(File)
        .optional()
        .refine(
            (file) =>
                !file ||
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Only JPG, JPEG, or PNG files are allowed",
            }
        ),
});




