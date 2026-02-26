"use client"

import { useEvents } from '@/features/admin/events/event.hooks'
import { EventCardsSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'
import Card from './Card'

const EventCard = () => {

    const { data, isLoading, error} = useEvents()
    if(isLoading) return <EventCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-3 gap-9'
        variants={container}
        initial="hidden"
        animate="visible">
          {data?.map((event) => (
            <Card event={event} variants={item} key={event._id}/>
          ))}
      </motion.div>
  )
}

export default EventCard