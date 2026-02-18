import z from "zod";

export interface WaitlistRequest {
    userId: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
}

export interface WaitlistResponse {
    userId: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    createdAt: Date
    updatedAt: Date
}

export const formSchema = z.object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    phoneNumber: z
        .string()
        .trim()
        .regex(/^07\d{8}$/, "Phone number must start with 07 and be 10 digits")
});
