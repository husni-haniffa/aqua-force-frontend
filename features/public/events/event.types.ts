import { EventResponse } from "@/features/admin/events/event.types";
import { Variant } from "framer-motion";

export const handleAddToCalendar = (event: EventResponse) => {
    try {
        // eventDate is already an ISO string, so parse it directly
        const eventDate = new Date(event.eventDate);

        // Extract hours and minutes from eventTime (format: "10:15")
        const [hours, minutes] = event.eventTime.split(':').map(Number);

        // Set the time on the date object
        eventDate.setHours(hours, minutes, 0, 0);

        // Create end time (1 hour later)
        const endDateTime = new Date(eventDate.getTime() + 60 * 60 * 1000);

        // Format for Google Calendar (YYYYMMDDTHHmmssZ)
        const formatDateForGoogle = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const mins = String(date.getMinutes()).padStart(2, '0');
            const secs = String(date.getSeconds()).padStart(2, '0');

            return `${year}${month}${day}T${hours}${mins}${secs}`;
        };

        const startDateFormatted = formatDateForGoogle(eventDate);
        const endDateFormatted = formatDateForGoogle(endDateTime);

        // Encode event details
        const eventTitle = encodeURIComponent(event.title);
        const eventLocation = encodeURIComponent(event.location);
        const eventDetails = encodeURIComponent(event.description || `Event: ${event.title}\nLocation: ${event.location}`);

        // Build Google Calendar URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateFormatted}/${endDateFormatted}&details=${eventDetails}&location=${eventLocation}`;

        // Open in new tab
        window.open(googleCalendarUrl, '_blank');

    } catch (error) {
        console.error('Error adding to calendar:', error);
        alert('Unable to add to calendar. Please try again.');
    }
};

export interface EventCardProps {
    event: EventResponse
    variants?: Variant
}