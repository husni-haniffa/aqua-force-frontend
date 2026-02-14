import React from 'react'
import EventCard from './EventCard'
import { Calendar, MapPin } from 'lucide-react'

const PublicEvents = () => {
  return (
    <section className='container pt-12 xl:pt-24 pb-16 xl:pb-24'>
          <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-blue-500'>MARK YOUR CALENDER</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Upcoming Events
            </h1>
        </header>
        <EventCard/>
    </section>
  )
}

export default PublicEvents