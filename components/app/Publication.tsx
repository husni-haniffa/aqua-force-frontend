"use client"
import Link from 'next/link'
import { User, ArrowRight } from 'lucide-react'
import { usePublications } from '@/features/public/publications/publication.hooks'
import { AlertError } from '../ui/alert-error'
import { PublicationCardSkeleton } from '@/features/public/publications/Skeleton'
import { formateDate } from '@/lib/format'

const Publication = () => {

    const { data, isLoading, error } = usePublications()
    if(isLoading) return <PublicationCardSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-slate-600'>LATEST RESEARCH</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Featured Publications
            </h1>
            <p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'>
                Discover innovative research conducted by students across diverse academic disciplines
            </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-9">

            {data?.slice(0,6).map((publication) => (

                <div key={publication._id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

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
                            <h6 className='text-xs xl:text-sm text-slate-950'>
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

                </div>
            ))}

        </div>
        
    </section>
   )
}

export default Publication