"use client"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ArrowRight, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

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

                <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600 text-amber-400 text-sm mb-6 w-fit">
                    <Award className="w-5 h-5 text-amber-600" strokeWidth={'2px'}/>
                    Trusted by Leading Institutions
                </span>

                <header className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                   A place for minds to connect, ideas to grow, and research to create {" "}
                    <span className="text-sky-400">real-world impact.</span>
                </header>

                <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-3xl mb-8">
                  A shared digital space for our university’s academic community to publish research, explore publications, and collaborate across disciplines — supporting learning, discovery, and real-world solutions.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">

                    <SignedIn>
                        <Button className="font-semibold" asChild>                     
                            <Link href={'/user/submissions'}>
                                Submit Your Paper 
                                <ArrowRight/>
                            </Link>                   
                        </Button>
                    </SignedIn>

                    <SignedOut>
                        <Button className="font-semibold" asChild>
                            <Link href={'/sign-in'}>
                                Submit Your Paper 
                                <ArrowRight/>
                            </Link>                   
                        </Button>
                    </SignedOut>

                    <Button variant={'outline'} asChild>
                        <Link href={'/publications'}>
                            Explore Publications
                        </Link>
                    </Button>

                </div>

            </div>
            
        </div>

    </section>
  )
}

export default Hero