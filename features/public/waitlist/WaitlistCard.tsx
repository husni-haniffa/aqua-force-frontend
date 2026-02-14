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
                    <h6 className='text-sm md:text-base text-blue-500'>COMING SOON</h6>
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
                            <Link href={'/waitlist'} className='font-semibold'>
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

           <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    {/* Priority Review */}
    <div className='relative group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'>
        <div className='absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity'></div>
        <div className='relative'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='shrink-0 p-2 rounded-lg bg-blue-50'>
                    <CheckCircle className='w-4 h-4 text-blue-600' strokeWidth={2.5} />
                </div>
                <h1 className='text-sm xl:text-base font-bold text-slate-900'>Priority Review</h1>
            </div>
            <p className='text-xs md:text-sm text-slate-600 leading-relaxed'>
                Fast-track review of research submissions, proposals, and publications for quicker processing and guidance.
            </p>
        </div>
    </div>

    {/* Secure Access */}
    <div className='relative group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'>
        <div className='absolute top-0 right-0 w-16 h-16 bg-cyan-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity'></div>
        <div className='relative'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='shrink-0 p-2 rounded-lg bg-cyan-50'>
                    <svg className='w-4 h-4 text-cyan-600' fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className='text-sm xl:text-base font-bold text-slate-900'>Secure Access</h1>
            </div>
            <p className='text-xs md:text-sm text-slate-600 leading-relaxed'>
                Private workspaces, protected data storage, and secure collaboration for research projects.
            </p>
        </div>
    </div>

    {/* Supervisor & Research Support */}
    <div className='relative group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'>
        <div className='absolute top-0 right-0 w-16 h-16 bg-indigo-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity'></div>
        <div className='relative'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='shrink-0 p-2 rounded-lg bg-indigo-50'>
                    <Users className='w-4 h-4 text-indigo-600' strokeWidth={2.5} />
                </div>
                <h1 className='text-sm xl:text-base font-bold text-slate-900'>Supervisor & Research Support</h1>
            </div>
            <p className='text-xs md:text-sm text-slate-600 leading-relaxed'>
                Assistance in finding supervisors, research placements, study sites, and suitable research collaborations.
            </p>
        </div>
    </div>

    {/* Research Services & Facilities */}
    <div className='relative group bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'>
        <div className='absolute top-0 right-0 w-16 h-16 bg-sky-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity'></div>
        <div className='relative'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='shrink-0 p-2 rounded-lg bg-sky-50'>
                    <svg className='w-4 h-4 text-sky-600' fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className='text-sm xl:text-base font-bold text-slate-900'>Research Services & Facilities</h1>
            </div>
            <p className='text-xs md:text-sm text-slate-600 leading-relaxed'>
                Support for sampling, sample analysis, data analysis, interpretation, and access to research facilities.
            </p>
        </div>
    </div>
</div>

        </div>
        <div className='flex justify-center items-center xl:justify-start pt-9 xl:hidden'>
                    <SignedIn>
                        <Button asChild className='w-full'>
                            <Link href={'/waitlist'} className='font-semibold'>
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