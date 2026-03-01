"use client"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePublications } from '@/features/public/publications/publication.hooks'
import { AlertError } from '../ui/alert-error'
import { PublicationCardSkeleton } from '@/features/public/publications/Skeleton'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'
import Card from '@/features/public/publications/Card'

const Publication = () => {

    const { data, isLoading, error } = usePublications()
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

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
        
        {isLoading ? (
            <PublicationCardSkeleton/>
        ) : (
            <motion.div 
                className="grid grid-cols-1 xl:grid-cols-2 gap-9" 
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
            viewport={{ once: false, amount: 0.3 }}>
            <Button asChild className="font-semibold bg-slate-900 hover:bg-slate-800 text-white border-none">
                <Link href={'/publications'}>
                    Explore More Publications <ArrowRight/>
                </Link>
            </Button>
        </motion.div >
        
    </section>
   )
}

export default Publication