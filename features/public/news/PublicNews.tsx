"use client"
import NewsCard from './NewsCard'
import { motion } from 'framer-motion'

const PublicNews = () => {
  return (
    <section className='pt-6 xl:pt-12 pb-16 xl:pb-24'>
       <header className="flex flex-col items-center gap-3 mb-16 text-center">
  <motion.p
    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}>
    Stay Updated
  </motion.p>
  <motion.h2
    className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1 }}
    viewport={{ once: false, amount: 0.3 }}>
    Latest <span className="text-blue-500">News</span>
  </motion.h2>
</header>
        <NewsCard/>
    </section>
  )
}

export default PublicNews