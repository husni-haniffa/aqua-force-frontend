"use client"
import EventCard from './EventCard'
import { motion } from 'framer-motion'

const PublicEvents = () => {
  return (
    <section className='container pt-12 xl:pt-24 pb-16 xl:pb-24'>
          <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <motion.h6 
              className='text-sm md:text-base text-blue-500' 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut"}}
              viewport={{ once: false, amount: 0.3 }}>
                MARK YOUR CALENDER
            </motion.h6>
            <motion.h1 
              className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut"}}
              viewport={{ once: false, amount: 0.3 }}>
                Upcoming Events
            </motion.h1>
        </header>
        <EventCard/>
    </section>
  )
}

export default PublicEvents