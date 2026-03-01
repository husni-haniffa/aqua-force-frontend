import React from 'react'
import { StatCard } from './overview.types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Card = ({ label, description, value, icon: Icon, href, cta, gradient }: StatCard) => {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br ${gradient} rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 pointer-events-none" />

      <div className="relative flex flex-col gap-5">

        {/* Icon + value on same row */}
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-4xl font-black text-white tracking-tight">{value}</span>
        </div>

        {/* Label + description */}
        <div>
          <h3 className="text-base font-bold text-white mb-1">{label}</h3>
          <p className="text-xs text-white/70 leading-relaxed">{description}</p>
        </div>

        {/* CTA */}
        <Button
          asChild
          className="w-full bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/20 backdrop-blur-sm transition-all duration-200"
          variant="secondary">
          <Link href={href} className="flex items-center justify-center gap-1.5">
            {cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>

      </div>
    </div>
  )
}
export default Card