"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { container, item } from "@/lib/animation"
import { conductResearchFeatures, iconStyles } from "./conduct-research-features"

const Card = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}>

      {conductResearchFeatures.map((feature) => (
        <motion.div
          key={feature.id}
          variants={item}
          className="group relative flex flex-col gap-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon + Label */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${iconStyles[feature.id]}`}>
                <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {feature.label}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed flex-1">
            {feature.description}
          </p>

          <div className="h-px bg-slate-100" />

          {/* CTA */}
   <div className="flex justify-end w-full">
  <Link
    href={feature.href}
    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 rounded-xl px-4 py-2.5 transition-all duration-200 w-full sm:w-auto">
    Apply Now
    <ArrowRight className="w-3.5 h-3.5" />
  </Link>
</div>
          

        </motion.div>
      ))}

    </motion.div>
  )
}

export default Card