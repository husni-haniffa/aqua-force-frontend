"use client"
import { howWeSupport } from "@/lib/about"
import { container, item } from "@/lib/animation"
import { motion } from 'framer-motion'

const HowWeSupport = () => {
  return (
    <section className="container pt-16 xl:pt-24 pb-16">

  {/* Header */}
  <header className="flex flex-col items-center gap-3 mb-16 text-center">
    <motion.p
      className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}>
      Our Goal
    </motion.p>
    <motion.h2
      className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: false, amount: 0.3 }}>
      How We <span className="text-blue-500">Support You</span>
    </motion.h2>
    <motion.p
      className="text-sm md:text-base text-slate-400 max-w-xl mt-1"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: false, amount: 0.3 }}>
      We provide comprehensive support across the entire research lifecycle.
    </motion.p>
  </header>

  {/* Cards */}
  <motion.div
    className="grid grid-cols-1 lg:grid-cols-2 gap-5"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}>

    {howWeSupport.map((support) => (
      <motion.div
        key={support.title}
        variants={item}
        className="group relative flex flex-col gap-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">

        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon + Title */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
            <support.icon className={support.ui} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {support.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed">
          {support.description}
        </p>

        <div className="h-px bg-slate-100" />

        {/* Features */}
        <ul className="flex flex-col gap-2">
          {support.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                <span className="text-emerald-500 text-xs font-bold leading-none">✓</span>
              </div>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

      </motion.div>
    ))}

  </motion.div>

</section>
  )
}

export default HowWeSupport