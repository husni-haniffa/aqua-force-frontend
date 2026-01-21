import z from "zod"

export interface UserSubmissionResponse {
    _id: string
    userId: string
    title: string
    abstract: string
    keywords: string[]
    fileUrl: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface CreateSubmissionFormProps {
    onSuccess?: () => void
}

export interface EditSubmissionFormProps extends CreateSubmissionFormProps {
    submissionId: string
}

export const formSchema = z.object({
    categoryId: z.string().min(1, "Category is required"),

    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(50, "Title must not exceed 50 characters"),

    abstract: z
        .string()
        .trim()
        .min(25, "Abstract must be at least 25 characters")
        .max(25, "Abstract must not exceed 1000 characters"),

    keywords: z
        .array(z.string().trim().min(1))
        .min(1)
        .max(5),

    file: z
        .instanceof(File)
        .refine((file) => file.type === "application/pdf", {
            message: "Only PDF files are allowed",
        }),
});