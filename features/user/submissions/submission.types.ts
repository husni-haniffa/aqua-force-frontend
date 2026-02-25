import z from "zod"

type Status = 'PENDING' | 'UNDER_REVIEW' | 'REJECTED' | 'ACCEPTED'

export interface UserSubmissionResponse {
    _id: string
    userId: string
    userName: string
    researchTypeId: {
        _id: string
        name: string
    }
    categoryId: {
        _id: string
        name: string
    }
    title: string
    abstract: string
    keywords: string[]
    fileUrl: string
    status: Status
    isPublished: boolean
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

    researchTypeId: z.string().min(1, "Research Type is required"),

    title: z
        .string()
        .trim()
        .min(50, "Title must be at least 50 characters")
        .max(200, "Title must not exceed 200 characters")
        .regex(
            /^[A-Za-z0-9\s:,\-()./]+$/,
            "Title contains invalid characters"
        ),

    abstract: z
        .string()
        .trim()
        .min(1000, "Abstract must be at least 1,000 characters")
        .max(10000, "Abstract must not exceed 10,000 characters"),

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
            { message: "Only PDF, DOC, or DOCX files are allowed" }
        )

        
});

export const editFormSchema = formSchema.extend({
    file: z
        .instanceof(File)
        .refine(
            (file) =>
                    [
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ].includes(file.type),
                { message: "Only PDF, DOC, or DOCX files are allowed" }
            )
        .optional()

})



export type EditFormSchema = z.infer<typeof editFormSchema>