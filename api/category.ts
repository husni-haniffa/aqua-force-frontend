import { CategoryRequest, CategoryResponse } from "@/types/category";
import { BASE_URL } from "@/types/api";

export const createCategory = async (data: CategoryRequest) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create category")
    }
    return result
}

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
    const response = await fetch(`${BASE_URL}/categories`)
    const result = await response.json()
    if(!response.ok){
        throw new Error(result.message || 'Failed to fetch categories')
    }
    return result.data
}

export const fetchCategoryById = async (id: string): Promise<CategoryResponse> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch category with id')
    }
    return result.data
}

export const updateCategory = async ({id, data}: {id: string, data: CategoryRequest}): Promise<CategoryResponse> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update category")
    }
    return result.data
}

export const deleteCategory = async (id: string) => {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create category")
    }
    return result
}