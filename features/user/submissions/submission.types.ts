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
        .max(50, "Title must not exceed 50 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    abstract: z
        .string()
        .trim()
        .min(500, "Abstract must be at least 500 characters")
        .max(1000, "Abstract must not exceed 1000 characters"),

    keywords: z
        .array(
            z
            .string()
            .trim()
            .min(1, "Keyword cannot be empty")
            .regex(/^[A-Za-z0-9\- ]+$/, "Invalid keyword")
    )
        .min(1, "At least one keyword is required")
        .max(5, "No more than 5 keywords allowed"),

    file: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ].includes(file.type),
            {
                message: "Only PDF, DOC, or DOCX files are allowed",
            }
        ),
});
