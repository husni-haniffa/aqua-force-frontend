"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MembershipForm from './MembershipForm'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Users, ArrowRight, CheckCircle } from 'lucide-react'

const WaitlistCard = () => {
  return (
    <div className='bg-slate-950'>
         <div className='container py-16 xl:py-24'>
        <div className='grid grid-cols-1 md:grid-cols-2'>

            <div>
                <header className='flex flex-col gap-3 mb-12'>
                    <h6 className='text-sm md:text-base text-slate-50'>COMING SOON</h6>
                    <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-50'>
                        Membership Launching Soon
                    </h1>
                    <p className='max-w-2xl text-sm md:text-base text-slate-100'>
                       Be the first to access exclusive features, and accelerate your academic career with Research Minds Net membership.
                    </p>
                </header>
                <div className='hidden xl:flex justify-center items-center xl:justify-start mb-9'>
                    <SignedIn>
                        <Button asChild>
                            <Link href={'/membership'} className='font-semibold'>
                                Join the Waitlist
                            </Link>
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild>
                            <Link href="/sign-in?redirect_url=/membership" className='font-semibold'>
                                Join the Waitlist
                            </Link>
                        </Button>
                    </SignedOut>
                  
                </div>
              
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
                <div className='bg-white rounded-2xl px-4 py-4'>
                    <header>
                        <h1 className='text-base xl:text-lg font-bold text-center'>Priority Review</h1>
                    </header>
                    <p className='text-xs md:text-sm text-center max-w-xl'>Fast-track review of research submissions, proposals, and publications for quicker processing and guidance.</p>
                </div>
                 <div className='bg-white rounded-2xl px-4 py-4'>
                    <header>
                        <h1 className='text-base xl:text-lg font-bold text-center'>Secure Access</h1>
                    </header>
                    <p className='text-xs md:text-sm text-center max-w-xl'>Private workspaces, protected data storage, and secure collaboration for research projects.</p>
                </div>
                 <div className='bg-white rounded-2xl px-4 py-4'>
                    <header>
                        <h1 className='text-base xl:text-lg font-bold text-center'>Supervisor & Research Support</h1>
                    </header>
                    <p className='text-xs md:text-sm text-center max-w-xl'>Assistance in finding supervisors, research placements, study sites, and suitable research collaborations.</p>
                </div>
                 <div className='bg-white rounded-2xl px-4 py-4'>
                    <header>
                        <h1 className='text-base xl:text-lg font-bold text-center'>Research Services & Facilities</h1>
                    </header>
                    <p className='text-xs md:text-sm text-center max-w-xl'>Support for sampling, sample analysis, data analysis, interpretation, and access to research facilities.</p>
                </div>
            </div>

        </div>
        <div className='flex justify-center items-center xl:justify-start pt-9 xl:hidden'>
                    <SignedIn>
                        <Button asChild className='w-full'>
                            <Link href={'/membership'} className='font-semibold'>
                                Join the Waitlist
                            </Link>
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className='w-full'>
                            <Link href="/sign-in?redirect_url=/membership" className='font-semibold'>
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