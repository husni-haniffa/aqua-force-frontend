"use client"
import Link from 'next/link'
import { User, ArrowRight, Youtube, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { usePublications } from '@/features/public/publications/publication.hooks'
import { AlertError } from '../ui/alert-error'
import { PublicationCardSkeleton } from '@/features/public/publications/Skeleton'
import { formateDate } from '@/lib/format'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'
import Card from '@/features/public/publications/Card'

const Publication = () => {

    const { data, isLoading, error } = usePublications()
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
        
        {isLoading ? (
            <PublicationCardSkeleton/>
        ) : (
             <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-9" 
          variants={container}
                                   initial="hidden"
                                    whileInView="visible"
                                        viewport={{ once: false, amount: 0.1 }}>
                                           

            {data?.slice(0,6).map((publication) => (

                <Card publication={publication} key={publication._id} variants={item}/>
            ))}

        </motion.div>
        )}
       

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