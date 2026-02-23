"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvents } from '@/features/admin/events/event.hooks'
import { Calendar, Clock, MapPin, ArrowRight, Bell } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AlertError } from '../ui/alert-error'
import { formateDate, formateTime } from '@/lib/format'
import { EventCardsSkeleton } from '@/features/public/events/Skeleton'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'

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
            <motion.h6 className='text-sm md:text-base text-blue-500' initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}>MARK YOUR CALENDER</motion.h6>
            <motion.h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'
            initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}>
                Upcoming Events
            </motion.h1>
        </header>
        
        <motion.div className='grid grid-cols-1 md:grid-cols-3 gap-9'
          variants={container}
                                   initial="hidden"
                                   whileInView="visible"
                                        viewport={{ once: false, amount: 0.1 }}
        >
            {data?.slice(0,6).map((event) => (
                <motion.div key={event._id}
                variants={item}
                 className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
    <div className='px-4 py-4'>
        {/* Event Image */}
        {event.imageUrl && (
            <div className='relative overflow-hidden rounded-lg -mx-4 -mt-4'>
                <Image 
                    src={event.imageUrl} 
                    alt={event.title}
                    width={800}
                    height={200}
                    className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                    priority={false}
                />
            </div>
        )}
        
        <header className='flex flex-col mb-4 mt-4'>
            <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md w-fit mb-3'>
                {event.title}
            </span>       
            <h1 className='text-lg font-bold text-slate-950 hover:text-slate-800 transition-colors'>
                {event.description}
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
      <motion.button 
        onClick={() => handleAddToCalendar(event)}
        className='w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2 group/btn'
 whileHover={{ scale: 1 }}
                        whileTap={{ scale:0.5 }}
                        transition={{ type: "spring", stiffness: 300}}
                       
                        >
      
        <Bell className='w-4 h-4 group-hover/btn:animate-pulse' />
        Add to Calendar
      </motion.button>
    </div>
    </div>
</motion.div>
            ))}
        </motion.div>
        
        <motion.div className='flex justify-center pt-12'
        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 300}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale:1 }}
                        viewport={{ once: false, amount: 0.3 }}>
            <Button asChild>
                <Link href={'/events'}>
                    Explore More Events <ArrowRight/>
                </Link>
            </Button>
        </motion.div>
        
        
    </section>
    
  )
}

export default Event