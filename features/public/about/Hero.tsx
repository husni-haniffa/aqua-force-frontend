"use client"
import Image from 'next/image'
import { researchServices } from '@/lib/about'
import { motion } from 'framer-motion'
import { container, item } from '@/lib/animation'

const Hero = () => {
    
  return (
    
   <section className="container relative pt-6 xl:pt-12 pb-12  overflow-hidden">

  <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50 rounded-r-3xl -z-10" />

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

    {/* ── LEFT: Content ── */}
    <div className="flex flex-col gap-8">

      <motion.p
        className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}>
        Research · Future · Life
      </motion.p>

      <motion.h2
        className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}>
        Built for collaboration across our{" "}
        <span className="text-blue-500">academic community</span>
      </motion.h2>

      <motion.p
        className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}>
        Created for our university&apos;s students, researchers, and academics,
        Research Minds Net supports interdisciplinary collaboration, knowledge
        sharing, and research development within a single connected platform.
      </motion.p>

      <div className="w-12 h-px bg-blue-300" />

      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}>
        {researchServices.map((service) => (
          <motion.div
            key={service.label}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 px-4 py-3 rounded-xl"
            variants={item}>
            <div className="p-2 bg-blue-50 rounded-lg shrink-0">
              <service.icon className={service.ui} />
            </div>
            <span className="text-xs xl:text-sm font-medium text-slate-700">
              {service.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

    </div>

    {/* ── RIGHT: Image ── */}
    <div className="relative w-full aspect-4/3 lg:aspect-3/4 xl:aspect-4/3">
      <Image
        src="/research-team.png"
        alt="Research collaboration"
        fill
        className="object-cover rounded-2xl shadow-xl"
        priority
      />
    
    </div>

  </div>
</section>
  )
}

export default Hero