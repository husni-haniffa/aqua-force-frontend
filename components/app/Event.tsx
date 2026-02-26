"use client"
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
import Card from '@/features/public/events/Card'

const Event = () => {

    const { data, isLoading, error} = useEvents()
    if(isLoading) return <EventCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
        const handleAddToCalendar = (event: EventResponse) => {
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
   <Card event={event} variants={item} key={event._id}/>
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