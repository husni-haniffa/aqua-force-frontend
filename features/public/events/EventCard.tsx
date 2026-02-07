"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvents } from '@/features/admin/events/event.hooks'
import { formateDate, formateTime } from '@/lib/format'
import { Calendar, Clock, MapPin } from 'lucide-react'

const EventCard = () => {
    const { data, isLoading, error} = useEvents()
    if(isLoading) return <p className="text-center py-8">Loading events...</p>
    if(error instanceof Error) return <p className="text-center py-8 text-red-500">Error loading events</p>
  return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-9'>
               {data?.map((event) => (
                   <div key={event._id} className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group  h-fit'>
   
                       <div className='px-4 py-4'>
                           <header className='flex flex-col mb-4'>
                               <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md w-fit mb-3'>
                                   {event.title.slice(0,6)}
                               </span>       
                               <h1 className='text-lg font-bold text-slate-950 hover:text-slate-800 transition-colors'>{event.title}</h1>
                           </header>
                           <div className='flex items-center gap-3 mb-4'>       
                               <Calendar className='w-4 h-4'/>
                               <h6 className='text-sm md:text-base'>
                                   {formateDate(event.eventDate)}
                               </h6>
                           </div>
                            <div className='flex items-center gap-3 mb-4'>
                               <Clock className='w-4 h-4'/>
                               <h6 className='text-sm md:text-base'>{formateTime(event.eventTime)}</h6>    
                           </div>
                           <div className='flex items-center gap-3 mb-4'>
                               <MapPin className='w-4 h-4'/>
                               <h6 className='text-sm md:text-base'>{event.location}</h6>    
                           </div>
                          
                       </div>
                       
   
                   </div>
               ))}
           </div>
  )
}

export default EventCard