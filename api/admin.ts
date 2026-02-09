import { AdminOverview } from "@/features/admin/overview/overview.types";
import { UserResponse } from "@/features/admin/users/user.types";
import { BASE_URL } from "@/types/api";

export const fetchUserList = async(token: string): Promise<UserResponse[]>=> {
    const response = await fetch(`${BASE_URL}/admin/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if(!response.ok) {
        throw new Error(result.message || 'Network Request Failed')
    }
    return result.data
}

export const updateRoleToAdmin = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/admin/user/admin/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Network Request Failed')
    }
    return result
}

export const removeRoleFromAdmin = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/admin/user/admin/remove/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Network Request Failed')
    }
    return result
}

export const fetchAdminOverview = async (token: string): Promise<AdminOverview> => {
    const response = await fetch(`${BASE_URL}/admin/dashboard/overview`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Network Request Failed')
    }
    return result
}