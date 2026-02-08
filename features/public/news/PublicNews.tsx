"use client"
import NewsCard from './NewsCard'
import { Newspaper } from 'lucide-react'

const PublicNews = () => {
  return (
    <section className='pt-16 xl:pt-24'>
        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-slate-600'>STAY UPDATED</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Latest News
            </h1>
        </header>
        <NewsCard/>
    </section>
  )
}

export default PublicNews