"use client"
import { navLinks } from '@/lib/navLinks'
import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Label } from '../ui/label'
import { socialMedia } from '@/lib/socialMedia'
import { contactInfo } from '@/lib/company'

const Footer = () => {

    const pathname = usePathname()

  return (
    <footer className='bg-white py-8 sm:py-10 md:py-12'>
        <div className='container'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>

           
                <div className='flex flex-col gap-4 lg:flex-1'>
                    <Link href={"/"} className='bg-blue-100 px-2 py-1 rounded-lg w-fit'>
                        <span className="font-bold text-lg sm:text-xl lg:text-2xl leading-tight bg-blue-500 bg-clip-text text-transparent">
                            Research Minds Net
                        </span>
                    </Link>

                    <p className='text-slate-600 text-xs lg:text-base leading-relaxed max-w-xl'>
A place for minds to connect, ideas to grow, and research to create real-world impact.                   </p>
                    
                    <div className='flex flex-row gap-3 sm:gap-4'>
                        {socialMedia.map((social) => (
                            <Link 
                                key={social.id} 
                                href={social.href}
                            >
                                <social.icon size={20} className="sm:w-6 sm:h-6" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-24 lg:flex'>
                
                    <div className='flex flex-col gap-4'>
                        <header className='text-slate-800 font-bold text-base sm:text-lg lg:text-xl mb-3'>
                            Contact
                        </header>
                        <div className='flex flex-col gap-3'>
                            {contactInfo.map((contact) => (
                                <Link 
                                    key={contact.id} 
                                    href={contact.href}
                                    className="text-slate-600 hover:text-slate-800 transition-colors text-sm sm:text-base"
                                >
                                    {contact.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <header className='text-slate-800 font-bold text-base sm:text-lg lg:text-xl mb-3'>
                            Company
                        </header>
                        <div className='flex flex-col gap-3'>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-600 hover:text-slate-800 transition-colors text-sm sm:text-base"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <SignedIn>
                                <Link 
                                    href="/user/submissions"
                                    className="text-slate-600 hover:text-slate-800 transition-colors text-sm sm:text-base"
                                >
                                    Submissions
                                </Link>
                            </SignedIn>
                        </div>
                    </div>
                </div>

            </div>

            <div className='border-t border-slate-300 mt-8 sm:mt-12 pt-6 sm:pt-8'>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <Label className='text-slate-500 text-xs sm:text-sm'>
                        &copy; {new Date().getFullYear()} Research Minds Net. All rights reserved
                    </Label>
                    <div>
                        <Link href="/Policy Note.pdf" className="text-slate-500 hover:text-slate-800 transition-colors text-xs sm:text-sm" target='_blank'  rel="noopener noreferrer">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer