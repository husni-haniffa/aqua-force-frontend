import { SubmissionResponse } from "@/features/admin/submissions/submission.types";
import { BASE_URL } from "@/types/api";

export const fetchSubmissions = async (token: string): Promise<SubmissionResponse[]> => {
    const response = await fetch(`${BASE_URL}/submissions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch submission")
    }
    return result.data
}

export const submissionUnderReview = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/submissions/review/${id}`, {
        method: 'PUT',
        headers: {       
            Authorization: `Bearer ${token}`,        
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update submission status")
    }
    return result.message
}

export const submissionApproved = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/submissions/accept/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update submission status")
    }
    return result.message
}

export const submissionRejected = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/submissions/reject/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update submission status")
    }
    return result.message
}

export const publishSubmission = async (
    id: string,
    accessLevel: "PUBLIC" | "MEMBERS",
    token: string
) => {
    const response = await fetch(`${BASE_URL}/submissions/publish/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accessLevel }),
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to publish")
    }
    return result.message
}
