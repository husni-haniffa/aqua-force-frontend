import React from 'react'
import Image from 'next/image'
import { researchServices } from '@/lib/about'
const Hero = () => {
  return (
    <div className='bg-white'>
        <div className='container pt-16 pb-16'>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>

                <div className='flex flex-col justify-between gap-9'>

                    <header className='flex flex-col gap-3'>
                        <h6 className='text-sm md:text-base text-blue-500'>RESEARCH TOGETHER. FUTURE. LIFE</h6>
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                            Built for collaboration across our academic community
                        </h1>
                    </header>

                    <div>
                        <p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'>
                            Created for our university’s students, researchers, and academics, 
                            Research Minds Net supports interdisciplinary collaboration, knowledge sharing, 
                            and research development within a single connected platform.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {researchServices.map((service) => (
                            <div className='flex items-center gap-3 bg-slate-200 px-4 py-2 rounded-lg shadow' key={service.label}>
                                {<service.icon className={service.ui}/>}
                                <span className='text-xs xl:text-sm text-slate-950'>{service.label}</span>
                            </div>
                        ))}                     
                    </div>

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