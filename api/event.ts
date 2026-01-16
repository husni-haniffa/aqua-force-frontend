import { EventRequest, EventResponse} from "@/types/events";
import { BASE_URL } from "@/types/api";

export const createEvent = async (data: EventRequest) => {
    const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to create event")
    }
    return result
}

export const fetchEvents = async (): Promise<EventResponse[]> => {
    const response = await fetch(`${BASE_URL}/events`)
    const result = await response.json()
    if(!response.ok){
        throw new Error(result.message || 'Failed to fetch events')
    }
    return result.data
}

export const deleteEvent = async (id: string) => {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) {
        throw new Error(result.message || "Failed to delete event")
    }
    return result
}