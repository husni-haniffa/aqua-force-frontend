import z from "zod"

type Status = 'PENDING' | 'UNDER_REVIEW' | 'REJECTED' | 'ACCEPTED' 

export interface SubmissionResponse {
    _id: string
    userId: string
    userName: string
    categoryId: {
        _id: string
        name: string
    }
    title: string
    abstract: string
    fileUrl: string
    status: Status
    isPublished: boolean
    accessLevel: string
    createdAt: string
    updatedAt: string
}

export const formSchema = z.object({
    youtube: z
        .string()
        .optional(),

    facebook: z
        .string()
        .optional(),
        
    instagram: z
        .string()
        .optional(),

    twitter: z
        .string()
        .optional(),
    
    linkedin: z
        .string()
        .optional(),
});