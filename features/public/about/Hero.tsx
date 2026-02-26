"use client"
import Image from 'next/image'
import { researchServices } from '@/lib/about'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'

const Hero = () => {
    
  return (
    <div className='bg-white'>
        <div className='container pt-16 pb-16'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>

                <div className='flex flex-col justify-between gap-9'>

                    <header className='flex flex-col gap-3'>
                        <motion.h6 
                            className='text-sm md:text-base text-blue-500'
                            initial={{opacity:0, x:-40}}
                            whileInView={{opacity:1, x:0}}
                            transition={{duration:1, ease:"easeInOut"}}
                            viewport={{ once: false, amount: 0.3 }}>
                            RESEARCH TOGETHER. FUTURE. LIFE
                        </motion.h6>
                        <motion.h1 
                            className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'
                            initial={{opacity:0, y:-40}}
                            whileInView={{opacity:1, y:0}}
                            transition={{duration:1, ease:"easeInOut"}}
                            viewport={{ once: false, amount: 0.3 }}>
                            Built for collaboration across our academic community
                        </motion.h1>
                    </header>

                    <div>
                        <motion.p 
                            className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'
                            initial={{opacity:0, y:-40}}
                            whileInView={{opacity:1, y:0}}
                            transition={{duration:1, ease:"easeInOut"}}
                            viewport={{ once: false, amount: 0.3 }}>
                            Created for our university’s students, researchers, and academics, 
                            Research Minds Net supports interdisciplinary collaboration, knowledge sharing, 
                            and research development within a single connected platform.
                        </motion.p>
                    </div>

                    <motion.div 
                        className='grid grid-cols-1 md:grid-cols-2 gap-3'
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}>
                        {researchServices.map((service) => (
                            <motion.div 
                            className='flex items-center gap-3 bg-slate-200 px-4 py-2 rounded-lg shadow' 
                            key={service.label} 
                            variants={item}
                            >
                                {<service.icon className={service.ui}/>}
                                <span className='text-xs xl:text-sm text-slate-950'>{service.label}</span>
                            </motion.div>
                        ))}                     
                    </motion.div>

                </div>

               <div className="w-full h-full relative min-h-50 md:min-h-75 xl:min-h-100">
                    <Image
                        src="/research-team.png"
                        alt="about-us-hero-image"
                        fill
                        className="object-contain md:object-cover rounded-lg"
                        priority
                    />
                </div>

            </div>

        </div> 
    </div>
  )
}

export default Hero