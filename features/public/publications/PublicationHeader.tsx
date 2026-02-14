import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

const PublicationHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
 <div className='flex flex-col justify-center items-center'>
       <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-blue-500'>LATEST RESEARCH</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Featured Publications
            </h1>
            <p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'>
                Discover innovative research conducted by students across diverse academic disciplines
            </p>
             
        </header>

    <div className="relative w-full max-w-xl mb-9 px-4">
        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by title or category..."
          className="pl-10 bg-white focus-visible:bg-white border-blue-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 transition-all text-xs xl:text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
   
  )
}

export default PublicationHeader