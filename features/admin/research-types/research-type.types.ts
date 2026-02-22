import z from "zod"

export interface ResearchTypeRequest {
    name: string
}

export interface ResearchTypeResponse {
    _id: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface CreateResearchTypeFormProps {
    onSuccess?: () => void
}

export interface EditResearchTypeFormProps extends CreateResearchTypeFormProps {
    researchTypeId: string
}

export const formSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5, "Name must be at least 5 characters")
        .max(25, "Name must not exceed 25 characters")
        .regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
});


