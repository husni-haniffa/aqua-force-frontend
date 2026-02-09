"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvents } from '@/features/admin/events/event.hooks'
import { Calendar, Clock, MapPin, ArrowRight, Bell } from 'lucide-react'
import Link from 'next/link'
import { AlertError } from '../ui/alert-error'
import { formateDate, formateTime } from '@/lib/format'
import { EventCardsSkeleton } from '@/features/public/events/Skeleton'

const Event = () => {

    const { data, isLoading, error} = useEvents()
    if(isLoading) return <EventCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
        const handleAddToCalendar = (event: any) => {
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

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-slate-600'>MARK YOUR CALENDER</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Upcoming Events
            </h1>
        </header>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-9'>
            {data?.slice(0,6).map((event) => (
                <div key={event._id} className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
    <div className='px-4 py-4'>
        <header className='flex flex-col mb-4'>
            <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md w-fit mb-3'>
                {event.title.slice(0,6)}
            </span>       
            <h1 className='text-lg font-bold text-slate-950 hover:text-slate-800 transition-colors'>
                {event.title}
            </h1>
        </header>
        
         <div className='space-y-3'>
                              {/* Date */}
                              <div className='flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors'>
                                <div className='bg-blue-50 p-2 rounded-lg'>
                                  <Calendar className='w-4 h-4 text-blue-600'/>
                                </div>
                                <span className='text-sm font-medium'>
                                  {formateDate(event.eventDate)}
                                </span>
                              </div>
      
                              {/* Time */}
                              <div className='flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors'>
                                <div className='bg-amber-50 p-2 rounded-lg'>
                                  <Clock className='w-4 h-4 text-amber-600'/>
                                </div>
                                <span className='text-sm font-medium'>
                                  {formateTime(event.eventTime)}
                                </span>
                              </div>
      
                              {/* Location */}
                              <div className='flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors'>
                                <div className='bg-red-50 p-2 rounded-lg'>
                                  <MapPin className='w-4 h-4 text-red-600'/>
                                </div>
                                <span className='text-sm font-medium'>
                                  {event.location}
                                </span>
                              </div>
                            </div>
                              <div className='mt-5 pt-4 border-t border-slate-100'>
      <button 
        onClick={() => handleAddToCalendar(event)}
        className='w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 group/btn'
      >
        <Bell className='w-4 h-4 group-hover/btn:animate-pulse' />
        Add to Calendar
      </button>
    </div>
    </div>
</div>
            ))}
        </div>
        
        
        
    </section>
    
  )
}

export default Event