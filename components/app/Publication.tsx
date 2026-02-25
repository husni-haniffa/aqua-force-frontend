"use client"
import Link from 'next/link'
import { User, ArrowRight, Youtube, Facebook, Instagram, Linkedin } from 'lucide-react'
import { usePublications } from '@/features/public/publications/publication.hooks'
import { AlertError } from '../ui/alert-error'
import { PublicationCardSkeleton } from '@/features/public/publications/Skeleton'
import { formateDate } from '@/lib/format'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'

const Publication = () => {

    const { data, isLoading, error } = usePublications()
    if(isLoading) return <PublicationCardSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <motion.h6 className='text-sm md:text-base text-blue-500'
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
            >
                LATEST RESEARCH
            </motion.h6>
            <motion.h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut"  }}
                viewport={{ once: false, amount: 0.3 }}
            >
                Featured Publications
            </motion.h1>
            <motion.p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut"  }}
                viewport={{ once: false, amount: 0.3 }}>
                Discover innovative research conducted by students across diverse academic disciplines
            </motion.p>
        </header>

        <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-9" 
          variants={container}
                                   initial="hidden"
                                    whileInView="visible"
                                        viewport={{ once: false, amount: 0.1 }}>

            {data?.slice(0,6).map((publication) => (

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
                                {publication.userName} <span className='ml-6 font-bold text-amber-600'>{publication.researchTypeId.name}</span>
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
                        
                    
                        {publication.socialMediaLinks && (
                             <div className="mb-8">
                            {publication.socialMediaLinks && (
                                <div className="flex items-center gap-3">
                                    {publication.socialMediaLinks.youtube && (
                                        <Link 
                                            href={publication.socialMediaLinks.youtube} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors bg-red-100 px-1 py-1 rounded-full"
                                            title="YouTube"
                                        >
                                            <Youtube className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.facebook && (
                                        <Link 
                                            href={publication.socialMediaLinks.facebook} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors bg-blue-100 px-1 py-1 rounded-full"
                                            title="Facebook"
                                        >
                                            <Facebook className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.instagram && (
                                        <Link 
                                            href={publication.socialMediaLinks.instagram} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition-colors bg-pink-100 px-1 py-1 rounded-full"
                                            title="Instagram"
                                        >
                                            <Instagram className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {publication.socialMediaLinks.linkedin && (
                                        <Link 
                                            href={publication.socialMediaLinks.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors bg-blue-100 px-1 py-1 rounded-full"
                                            title="LinkedIn"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        )}
                        
                    
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

                </motion.div>
            ))}

        </motion.div>

        <motion.div className='flex justify-center pt-12'
        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 300}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale:1 }}
                        viewport={{ once: false, amount: 0.3 }}
        >
            <Button asChild>
                <Link href={'/publications'}>
                    Explore More Publications <ArrowRight/>
                </Link>
            </Button>
        </motion.div >
        
    </section>
   )
}

export default Publication