"use client"
import { Brain } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/navLinks'
import { usePathname } from 'next/navigation'
import MobileNavbar from './MobileNavbar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useCheckRole } from '@/utils/checkRole'


const Navbar = () => {
    
    const pathname = usePathname()
    const isAdmin = useCheckRole('admin')
    
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border bg-slate-50'>
        <div className='container'>
            <div className='flex items-center justify-between h-16'>          
                <Link href={"/"} className='flex items-center gap-2 group'>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-9 h-9 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight text-blue-600">
                            AquaForce
                        </span>
                        <span className="text-xs hidden sm:block ">
                            Together, Future, Life
                        </span>
                    </div>
                </Link>
                <div className='hidden lg:flex items-center gap-1'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            pathname === link.href
                               ? "bg-slate-200"
                                : "hover:font-semibold hover:bg-slate-200"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <SignedIn>
                        <Link href="/user/submissions"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            pathname === "/user/submissions"
                                ? "bg-slate-200"
                                : "hover:font-semibold hover:bg-slate-200"
                            }`}
                        >
                            Submissions
                        </Link>
                    </SignedIn>
                </div>
                <div className='hidden lg:flex items-center gap-6'>
                    {isAdmin && 
                        <Link href="/admin" className='text-blue-600 font-semibold'>
                            Admin
                        </Link>
                    }
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className='font-semibold'>
                            <Link href={"/sign-in"}>Sign In</Link>
                        </Button>
                    </SignedOut>
                </div>
                <MobileNavbar/>           
            </div>
        </div>
    </nav>
  )
}

export default Navbar