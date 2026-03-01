"use client"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ArrowRight, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion'

const Hero = () => {

  return (
    <section className="relative min-h-fit lg:min-h-screen flex flex-col justify-center overflow-hidden pt-16">

  {/* Background */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/hero-research.jpg"
      alt="hero-research-image"
      fill
      priority
      className="object-cover"
    />
<div className="absolute inset-0 bg-slate-950/85" />  </div>

  <div className="container relative z-10">
    <div className="max-w-4xl">

      {/* Badge */}
      <motion.span
className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-10"        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}>
      <Award className="w-3.5 h-3.5 text-blue-400" />
  Trusted by Leading Institutions
      </motion.span>

      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}>
 A place for minds to connect, ideas to grow, and research to create{" "}
  <span className="bg-linear-to-r from-white to-blue-500 bg-clip-text text-transparent">real-world impact.</span>  </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-slate-50 text-sm md:text-base xl:text-lg max-w-2xl leading-relaxed mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}>
        A shared digital space for our university&apos;s<s></s> academic community to publish
        research, explore publications, and collaborate across disciplines —
        supporting learning, discovery, and real-world solutions.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <SignedIn>
            <Button className="w-full sm:w-auto font-semibold px-6" asChild>
              <Link href="/user/submissions">
                Submit Your Paper
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="w-full sm:w-auto font-semibold px-6" asChild>
              <Link href="/sign-in">
                Submit Your Paper
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </SignedOut>
        </motion.div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto font-semibold px-6 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            <Link href="/publications">
              Explore Publications
            </Link>
          </Button>
        </motion.div>

      </motion.div>

    </div>
  </div>

</section>
  )
}

export default Hero