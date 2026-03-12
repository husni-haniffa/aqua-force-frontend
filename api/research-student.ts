import { ResearchStudents } from "@/features/public/conduct-research/research-students/types"
import { BASE_URL } from "@/types/api"
import { z } from "zod"
import { formSchema } from "@/features/public/conduct-research/research-students/types"

type ResearchStudentsRequest = z.infer<typeof formSchema>;

export const createResearchStudent = async (data: ResearchStudentsRequest) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-student`, {
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

export const fetchResearchStudent = async (token: string): Promise<ResearchStudents[]> => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-student`, {
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

export const deleteResearchStudent = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/conduct-research/research-student/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Network request failed")
    }
    return result
}