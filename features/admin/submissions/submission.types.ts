import z from "zod"

type Status = 'PENDING' | 'UNDER_REVIEW' | 'REJECTED' | 'ACCEPTED' 

export interface SubmissionResponse {
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
    fileUrl: string
    status: Status
    isPublished: boolean
    accessLevel: string
    socialMediaLinks?: {
        youtube?: string
        facebook?: string
        instagram?: string
        linkedin?: string
    }
    createdAt: string
    updatedAt: string
}

export const formSchema = z.object({
    youtube: z
        .string()
        .url("Please enter a valid YouTube URL")
        .optional()
        .or(z.literal("")),

    facebook: z
        .string()
        .url("Please enter a valid Facebook URL")
        .optional()
        .or(z.literal("")),

    instagram: z
        .string()
        .url("Please enter a valid Instagram URL")
        .optional()
        .or(z.literal("")),

    linkedin: z
        .string()
        .url("Please enter a valid LinkedIn URL")
        .optional()
        .or(z.literal("")),
});