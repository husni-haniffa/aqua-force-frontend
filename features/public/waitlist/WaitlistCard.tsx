"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MembershipForm from './MembershipForm'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Users, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { researchFeatures } from '@/lib/company'
import { container, item } from '@/lib/animation'

const WaitlistCard = () => {
  return (
   <div className="bg-slate-950">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

      {/* LEFT CONTENT */}
      <div className="flex flex-col justify-center">
        <header className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 xl:mb-12">
          
          <motion.h6
            className="text-xs sm:text-sm md:text-base text-blue-500 tracking-wider"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            COMING SOON
          </motion.h6>

          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-slate-50 leading-tight"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Membership Launching Soon
          </motion.h1>

          <motion.p
            className="max-w-xl text-sm sm:text-base text-slate-200 leading-relaxed"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Be the first to access exclusive features, and accelerate your academic career with Research Minds Net membership.
          </motion.p>
        </header>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex justify-start">
          <SignedIn>
            <Button asChild>
              <Link href="/waitlist" className="font-semibold">
                Join the Waitlist
              </Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <Button asChild>
              <Link href="/sign-in?redirect_url=/waitlist" className="font-semibold">
                Join the Waitlist
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>

      {/* FEATURES GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 xl:gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {researchFeatures.map((feature) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={feature.id}
              className="relative group bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* glow */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${feature.color.glow} rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className={`shrink-0 p-2 rounded-lg ${feature.color.bg}`}>
                    <Icon
                      className={`w-4 h-4 ${feature.color.icon}`}
                      strokeWidth={2.5}
                    />
                  </div>

                  <h1 className="text-sm sm:text-base font-bold text-slate-900">
                    {feature.title}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>

    {/* MOBILE CTA */}
    <div className="flex justify-center pt-8 sm:pt-10 lg:hidden">
      <SignedIn>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/waitlist" className="font-semibold">
            Join the Waitlist
          </Link>
        </Button>
      </SignedIn>

      <SignedOut>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/sign-in?redirect_url=/waitlist" className="font-semibold">
            Join the Waitlist
          </Link>
        </Button>
      </SignedOut>
    </div>
  </div>
</div>

   
  )
}

export default WaitlistCard