import { ResearchHelps } from "@/features/public/conduct-research/research-helps/types"
import { BASE_URL } from "@/types/api"
import { z } from "zod"
import { formSchema } from "@/features/public/conduct-research/research-helps/types"

type ResearchHelpsRequest = z.infer<typeof formSchema>;

export const createResearchHelp = async (data: ResearchHelpsRequest) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-help`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result
}

export const fetchResearchHelp = async (token: string): Promise<ResearchHelps[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-help`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result.data
}