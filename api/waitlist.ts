import { WaitlistRequest, WaitlistResponse } from "@/features/public/waitlist/waitlist.types"
import { BASE_URL } from "@/types/api"

export const createWaitlist = async (data: WaitlistRequest, token: string) => {
    const response = await fetch(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        console.log(response)
        throw new Error(result.message || "Network request failed")
    }
    return result
}

export const fetchWaitlist = async(token: string): Promise<WaitlistResponse[]>=> {
    const response = await fetch(`${BASE_URL}/waitlist`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        console.log(response)
        throw new Error(result.message || "Network request failed")
    }
    return result.data
}