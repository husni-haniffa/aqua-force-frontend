import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const PublicationHeader = ({ onSearch }: { onSearch: (value: string) => void }) => {
  return (
 <div className='flex flex-col justify-center items-center'>
       <header className="flex flex-col items-center gap-3 mb-16 text-center">
  <motion.p
    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}>
    Latest Research
  </motion.p>
  <motion.h2
    className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1 }}
    viewport={{ once: false, amount: 0.3 }}>
    Featured <span className="text-blue-500">Publications</span>
  </motion.h2>
  <motion.p
    className="text-sm md:text-base text-slate-400 max-w-xl mt-1"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    viewport={{ once: false, amount: 0.3 }}>
    Discover innovative research conducted by students across diverse academic disciplines.
  </motion.p>
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