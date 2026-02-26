import React from 'react'
import { StatCard } from './overview.types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Card = ({ label, description, value, icon: Icon, href, cta, gradient }: StatCard) => {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br ${gradient} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1`}>
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />

      <div className="relative flex flex-col gap-4">
        {/* Icon */}
        <div className="inline-flex p-3 rounded-lg bg-white/20 backdrop-blur-sm w-fit">
          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>

        {/* Label + description */}
        <header>
          <h1 className="text-lg font-semibold text-white mb-1">{label}</h1>
          <p className="text-sm text-white/80">{description}</p>
        </header>

        {/* Stat number */}
        <span className="text-4xl font-bold text-white">{value}</span>

        {/* CTA */}
        <Button
          asChild
          variant="secondary"
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold"
        >
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </div>
  )
}

export default Card