import { CategoryRequest, CategoryResponse } from "@/types/category";
import { BASE_URL } from "@/types/api";

export const createCategory = async (data: CategoryRequest, token: string) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create category")
    }
    return result
}

export const fetchCategories = async (token: string): Promise<CategoryResponse[]> => {
    const response = await fetch(`${BASE_URL}/categories`,{
            headers: {  
                'Authorization': `Bearer ${token}`
            },
        }
    )
    const result = await response.json()
    if(!response.ok){
        throw new Error(result.message || 'Failed to fetch categories')
    }
    return result.data
}

export const fetchCategoryById = async (id: string, token: string): Promise<CategoryResponse> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch category with id')
    }
    return result.data
}

export const updateCategory = async ({id, data, token}: {id: string, data: CategoryRequest, token: string}): Promise<CategoryResponse> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update category")
    }
    return result.data
}

export const deleteCategory = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create category")
    }
    return result
}