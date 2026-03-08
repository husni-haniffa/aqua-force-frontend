import { ResearchStudents } from "@/features/public/conduct-research/research-students/types"
import { BASE_URL } from "@/types/api"

export const createResearchStudent = async (data: any) => {
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