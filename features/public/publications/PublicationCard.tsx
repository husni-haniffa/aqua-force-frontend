"use client"
import { usePublications } from './publication.hooks'
import Link from 'next/link'
import { User, Tag, ArrowRight, Search } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { PublicationCardSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'

const PublicationCard = ({ search }: { search: string }) => {

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedSearch(search)
        }, 300) 
        return () => clearTimeout(timer)
    }, [search])

        const isSearchingPublication = search !== debouncedSearch;

    const { data, isLoading, error } = usePublications()
    if(isLoading || isSearchingPublication ) return <PublicationCardSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
        if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No publications, create one</p>

    const filtered = data?.filter((publication) => 
        publication.title.toLowerCase().includes(search.toLowerCase()) || publication.categoryId.name.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No publication found</p>

  return (
  

        

 
        
        <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-9"
           variants={container}
                             initial="hidden"
                             animate="visible"
                              >

            {filtered?.map((publication) => (

                <motion.div key={publication._id} 
                variants={item}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

                    <div className="px-4 py-4">
                        
                        <div className="mb-4">
                            <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md'>
                                {publication.categoryId.name}
                            </span>                       
                        </div>
                        
                   
                        <header className="mb-4">
                            <h3 className="text-lg xl:text-xl font-bold text-slate-950 hover:text-slate-800 transition-colors">
                                {publication.title}
                            </h3>
                        </header>
                        
                 
                        <div className="flex items-center gap-1 mb-4">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-900" />
                            <span className="text-slate-900 text-xs xl:text-sm">
                                {publication.userName}
                            </span>
                        </div>
                        
                   
                        <div className="flex-1 mb-4">
                            <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                {publication.abstract}
                            </p>
                        </div>
                        
                    
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {publication.keywords.map((keyword, index) => (
                                    <span 
                                        key={index} 
                                        className="px-1.5 sm:px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                    
                        <div className="flex justify-between items-center">
                            <h6 className='text-xs xl:text-sm text-slate-600'>
                                {formateDate(publication.updatedAt)}
                            </h6>
                            <Link 
                                href={`/publications/${publication._id}/read`}
                                className='text-xs xl:text-sm flex items-center text-blue-500 gap-2'
                            >
                                Read full publication
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                        
                    </div>

                </motion.div>
            ))}

        </motion.div>
        
   
   
  )
}

export default PublicationCard