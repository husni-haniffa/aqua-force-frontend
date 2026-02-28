"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { researchFeatures } from '@/lib/company'
import { container, item } from '@/lib/animation'
import { ArrowRight } from 'lucide-react'

const WaitlistCard = () => {
  return (
    <div className="bg-slate-950 relative overflow-hidden">

  {/* Subtle background glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

  <div className="container py-16 xl:py-24 relative z-10">
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 xl:gap-20 lg:items-center">

      {/* ── LEFT: Content ── */}
      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-4">
          <motion.p
            className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}>
            Coming Soon
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}>
            Membership{" "}
            <span className="text-blue-500">Launching Soon</span>
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}>
            Be the first to access exclusive features and accelerate your
            academic career with a Research Minds Net membership.
          </motion.p>
        </div>

        <div className="w-12 h-px bg-slate-700" />

        {/* CTA — desktop */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}>
          <SignedIn>
            <Button asChild size="lg">
              <Link href="/waitlist" className="font-semibold">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-in?redirect_url=/waitlist" className="font-semibold">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </SignedOut>
          <span className="text-xs text-slate-500">Free to join. No credit card required.</span>
        </motion.div>

      </div>

      {/* ── RIGHT: Feature cards ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}>
        {researchFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.id}
              variants={item}
              className="relative group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 overflow-hidden">

              {/* Glow blob */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${feature.color.glow} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />

              <div className="relative flex flex-col gap-3">
                <div className={`w-fit p-2.5 rounded-xl ${feature.color.bg}`}>
                  <Icon className={`w-4 h-4 ${feature.color.icon}`} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>

            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA — mobile */}
      <motion.div
        className="lg:hidden flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.3 }}>
        <SignedIn>
          <Button asChild className="w-full sm:w-auto" size="lg">
            <Link href="/waitlist" className="font-semibold">
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <Button asChild className="w-full sm:w-auto" size="lg">
            <Link href="/sign-in?redirect_url=/waitlist" className="font-semibold">
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </SignedOut>
        <span className="text-xs text-slate-500">Free to join. No credit card required.</span>
      </motion.div>

    </div>
  </div>
</div>

   
  )
}

export default WaitlistCard