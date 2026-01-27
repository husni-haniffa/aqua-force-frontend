"use client"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ArrowRight, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28">

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
       
        <div className="container relative z-10 py-16 md:py-24">

            <div className="max-w-3xl mx-auto">

                <span 
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600 text-yellow-400 text-sm md:text-base mb-6 w-fit">
                    <Award className="w-5 h-5 text-yellow-600" strokeWidth={'2px'}/>
                    Trusted by Leading Institutions
                </span>

                <header className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Advancing Knowledge Through{" "}
                    <span className="text-sky-400">Open Research</span>
                </header>

                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
                    Join a global community of researchers. Submit, review, and discover
                    groundbreaking publications across all scientific disciplines.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">

                    <SignedIn>
                        <Button className="font-semibold" size={"lg"} asChild>                     
                            <Link href={'/user/submissions'}>
                                Submit Your Research 
                                <ArrowRight/>
                            </Link>                   
                        </Button>
                    </SignedIn>

                    <SignedOut>
                        <Button className="font-semibold" size={"lg"} asChild>
                            <Link href={'/sign-in'}>
                                Submit Your Research 
                                <ArrowRight/>
                            </Link>                   
                        </Button>
                    </SignedOut>

                    <Button variant={'outline'}  size={"lg"} asChild>
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