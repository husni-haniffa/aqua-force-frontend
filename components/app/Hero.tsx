"use client"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ArrowRight, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion'

const Hero = () => {
  return (
<section className="relative min-h-screen flex items-start md:items-center overflow-hidden pt-20 sm:pt-24 md:pt-0">
        <div className="absolute inset-0 z-0">
            <Image 
                src={'/hero-research.jpg'} 
                alt="hero-research-image" 
                fill 
                priority 
                className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[hsl(220,70%,20%)] via-[hsl(220,70%,20%)]/90 to-[hsl(220,60%,30%)]/75" />
        </div>
       
        <div className="container relative z-10">

            <div className="max-w-6xl mx-auto">

                <motion.span 
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600 text-amber-400 text-xs xl:text-sm mb-6 w-fit"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <Award className="w-5 h-5 text-amber-600" strokeWidth={'2px'}/>
                    Trusted by Leading Institutions
                </motion.span>

                <motion.header 
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                   A place for minds to connect, ideas to grow, and research to create {" "}
                    <span className="text-sky-400">real-world impact.</span>
                </motion.header>

                <motion.p 
                    className="text-white/90 text-sm xl:text-lg max-w-3xl mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                  A shared digital space for our university’s academic community to publish research, explore publications, and collaborate across disciplines — supporting learning, discovery, and real-world solutions.
                </motion.p>

                <div className="flex flex-col md:flex-row gap-6">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 300}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale:1 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <SignedIn>
                            <Button className="font-semibold w-full" asChild>                     
                                <Link href={'/user/submissions'}>
                                    Submit Your Paper 
                                    <ArrowRight/>
                                </Link>                   
                            </Button>
                        </SignedIn>

                        <SignedOut>
                            <Button className="font-semibold w-full" asChild>
                                <Link href={'/sign-in'}>
                                    Submit Your Paper 
                                    <ArrowRight/>
                                </Link>                   
                            </Button>
                        </SignedOut>
                    </motion.div>
                   
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                         transition={{ type: "spring", stiffness: 300}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale:1 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <Button variant={'outline'} asChild className="w-full">
                            <Link href={'/publications'}>
                                Explore Publications
                            </Link>
                        </Button>
                    </motion.div>
                   

                </div>

            </div>
            
        </div>

    </section>
  )
}

export default Hero