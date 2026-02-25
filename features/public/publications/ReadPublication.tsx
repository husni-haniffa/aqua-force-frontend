"use client"
import { usePublicationById } from './publication.hooks'
import Link from 'next/link'
import { User} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formateDate } from '@/lib/format'
import { AlertError } from '@/components/ui/alert-error'
import { ReadPublicationSkeleton } from './Skeleton'
import { motion } from 'framer-motion'

const ReadPublication =  ({id} : {id: string}) => {

    const { data, isLoading, error } = usePublicationById(id)
    if(isLoading) return <ReadPublicationSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
  return (
    <div className='pt-16 xl:pt-24 pb-16 xl:pb-24'>
        <div className='container'>
            <motion.article 
            initial={{opacity:0, x: -40}}
            animate={{opacity:1, x:0}}
            transition={{duration: 0.8, ease: "easeInOut"}}
            >  
                <header className="mb-8">            
                    <div className="mb-4">
                        <span className='text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md'>
                            {data?.categoryId.name}
                        </span>                       
                    </div>               
                    <h1 className="text-slate-800 text-xl md:text-2xl font-bold mb-6 leading-tight">
                        {data?.title}
                    </h1>                     
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600 mb-6">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {data?.userName} <span className='ml-6 font-bold text-amber-600'>{data?.researchTypeId.name}</span>
                            </span>
                        </div>
                    </div>                               
                    <div className="flex flex-wrap gap-2 mb-6">
                        {data?.keywords.map((keyword, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-md"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                    <div>
                        <h6 className="text-slate-500 text-xs xl:text-sm">
                            Published on {data?.updatedAt ? formateDate(data.updatedAt) : 'N/A'}
                        </h6>
                    </div>
                      
                </header>
                   
                <section className="mb-6">
                    <h2 className="text-slate-800 text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
                        Abstract
                    </h2>
                    <div>
                        <p className="text-slate-700 text-xs lg:text-base leading-relaxed">
                            {data?.abstract}
                        </p>
                    </div>
                </section>
                    
                <div className="pt-6 border-t border-slate-200">
                    <div className="flex justify-end"
                    
                >
                      
                        <Button asChild>
                            <Link href={data?.filePath || ''} target='_blank'>Download</Link>
                        </Button>
                                              
                    </div>
                </div>
            </motion.article>
        </div>
    </div>
  )
}

export default ReadPublication