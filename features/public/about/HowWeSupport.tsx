"use client"
import { howWeSupport } from "@/lib/about"
import { container, item } from "@/lib/animation"
import { motion } from 'framer-motion'

const HowWeSupport = () => {
  return (
    <div className='container pt-16 xl:pt-24'>
       <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <motion.h6 className='text-sm md:text-base text-blue-500'
             initial={{opacity:0, x:-40}}
                        whileInView={{opacity:1, x:0}}
                        transition={{duration:1, ease:"easeInOut"}}>OUR GOAL</motion.h6>
            <motion.h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'
             initial={{opacity:0, y:-40}}
                        whileInView={{opacity:1, y:0}}
                        transition={{duration:1, ease:"easeInOut"}}>
                How We Support You
            </motion.h1>
            <motion.p className='max-w-2xl xl:max-w-3xl text-sm md:text-base text-slate-600'
             initial={{opacity:0, y:-40}}
                        whileInView={{opacity:1, y:0}}
                        transition={{duration:1, ease:"easeInOut"}}>
               We provide comprehensive support across the entire research lifecycle
            </motion.p>     
        </header>
        <div>
  <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
     variants={container}
                       initial="hidden"
                       whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}>
  {howWeSupport.map((support) => (
    <motion.div 
    variants={item}
      key={support.title} 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 border border-slate-200"
    >
      {/* Header Section */}
      <div className="flex flex-col mb-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 shrink-0">
                <support.icon className={support.ui} />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                {support.title}
              </h3>
            </div>
         <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {support.description}
          </p>
      </div>
      
      {/* Features List */}
      <ul className="space-y-1.5 sm:space-y-2 ml-0">
        {support.features.map((feature, index) => (
          <li 
            key={index} 
            className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
          >
            <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">✓</span>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  ))}
</motion.div>
        </div>
    </div>
  )
}

export default HowWeSupport