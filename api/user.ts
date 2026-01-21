import { UserSubmissionResponse } from "@/features/user/submissions/submission.types"
import { BASE_URL } from "@/types/api"

export const fetchSubmissionByUserId = async (id: string, token: string): Promise<UserSubmissionResponse[]> => {
    const response = await fetch(`${BASE_URL}/users/submissions/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch submission with user id')
    }
    return result.data
}

export const fetchSubmissionById = async (id: string, token: string): Promise<UserSubmissionResponse> => {
    const response = await fetch(`${BASE_URL}/users/submissions/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch submission with id')
    }
    return result.data
}

export const createSubmission = async(formData: FormData, token: string) => {
   const response = await fetch(`${BASE_URL}/users/submissions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create submission")
    }
    return result
}

export const updateSubmission = async (id: string, formData: FormData, token: string) => {
   const response = await fetch(`${BASE_URL}/users/submission/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create news")
    }
    return result
}