import { BASE_URL } from "@/types/api";

export const createSubmission = async (
    formData: FormData,
    token: string
) => {
    const response = await fetch(`${BASE_URL}/submissions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // ✅ keep auth
            // ❌ DO NOT set Content-Type
        },
        body: formData,
    })

    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create submission")
    }

   return result

}

export const getSubmissionByUserId = async(userId: string, token: string) => {
    const response = await fetch(`${BASE_URL}/submissions/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // ✅ keep auth
            // ❌ DO NOT set Content-Type
        },
    })

    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create submission")
    }

    return result.data
}

export const getAllSubmissions = async (token: string) => {
    const response = await fetch(`${BASE_URL}/submissions`, {
        headers: {
            Authorization: `Bearer ${token}`, // ✅ keep auth
            // ❌ DO NOT set Content-Type
        },
    })

    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create submission")
    }

    return result.data
}