"use client"
import { founders } from '@/lib/about'
import { container, item } from '@/lib/animation'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const MeetTheTeam = () => {
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
      Founders
    </motion.p>
    <motion.h2
      className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: false, amount: 0.3 }}>
      Meet the <span className="text-blue-500">Visionary Team</span>
    </motion.h2>
    <motion.p
      className="text-sm text-slate-400 max-w-md mt-1"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: false, amount: 0.3 }}>
      The people behind Research Minds Net — building the future of academic collaboration.
    </motion.p>
  </header>

  {/* Cards */}
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}>
    {founders.map((founder) => (
      <motion.div
        key={founder.name}
        variants={item}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1.5">

        {/* Image */}
        <div className="relative overflow-hidden h-80">
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient fade into card body */}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-6 pb-6 mt-4">

          {/* Name + Role */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {founder.name}
            </h3>
            <p className="text-xs font-semibold text-blue-500 mt-0.5 uppercase tracking-widest">
              {founder.role}
            </p>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <Link
              href={`mailto:${founder.email}`}
              className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-blue-500 transition-colors duration-200 group/link">
              <div className="p-1.5 bg-slate-100 group-hover/link:bg-blue-50 rounded-md transition-colors duration-200">
                <Mail className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-blue-500 transition-colors duration-200" />
              </div>
              {founder.email}
            </Link>

            <Link
              href={`tel:${founder.phone}`}
              className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-blue-500 transition-colors duration-200 group/link">
              <div className="p-1.5 bg-slate-100 group-hover/link:bg-blue-50 rounded-md transition-colors duration-200">
                <Phone className="w-3.5 h-3.5 text-slate-500 group-hover/link:text-blue-500 transition-colors duration-200" />
              </div>
              {founder.phone}
            </Link>
          </div>

        </div>
      </motion.div>
    ))}
  </motion.div>

</section>
  )
}

export default MeetTheTeam