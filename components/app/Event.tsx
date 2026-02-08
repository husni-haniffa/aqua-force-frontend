"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEvents } from '@/features/admin/events/event.hooks'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AlertError } from '../ui/alert-error'
import { formateDate, formateTime } from '@/lib/format'

const Event = () => {

    const { data, isLoading, error} = useEvents()
    if(isLoading) return <p>loading</p>
    if(error instanceof Error) return <AlertError message={error.message}/>

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
        
        <div className='flex items-center gap-3 mb-4'>       
            <Calendar className='w-4 h-4 text-blue-500'/>
            <h6 className='text-sm md:text-base text-slate-700'>
                {formateDate(event.eventDate)}
            </h6>
        </div>
        
        <div className='flex items-center gap-3 mb-4'>
            <Clock className='w-4 h-4 text-amber-500'/>
            <h6 className='text-sm md:text-base text-slate-700'>
                {formateTime(event.eventTime)}
            </h6>    
        </div>
        
        <div className='flex items-center gap-3 mb-4'>
            <MapPin className='w-4 h-4 text-red-500'/>
            <h6 className='text-sm md:text-base text-slate-700'>
                {event.location}
            </h6>    
        </div>
    </div>
</div>
            ))}
        </div>
        
        
        
    </section>
    
  )
}

export default Event