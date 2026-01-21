
import { EventRequest, EventResponse } from "@/features/admin/events/event.types";
import { BASE_URL } from "@/types/api";

export const fetchEvents = async (): Promise<EventResponse[]> => {
    const response = await fetch(`${BASE_URL}/events`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch events')
    }
    return result.data
}

export const fetchEventById = async (id: string): Promise<EventResponse> => {
    const response = await fetch(`${BASE_URL}/events/${id}`)
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch event with id')
    }
    return result.data
}

export const createEvent = async (data: EventRequest, token: string) => {
    const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create event")
    }
    return result
}

export const updateEvent = async ({id, data, token}: {id: string, data: EventRequest, token: string}): Promise<EventResponse> => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json" ,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to update event")
    }
    return result.data
}

export const deleteEvent = async (id: string, token: string) => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to delete event")
    }
    return result
}