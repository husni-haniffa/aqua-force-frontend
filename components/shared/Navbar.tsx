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
                  <Link href={"/"} className='flex items-center gap-3 group'>
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-lg leading-tight bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              AquaForce
                            </span>
                            <span className="text-xs text-slate-500">
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
                                    ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                    : "hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-bold hover:shadow-md hover:shadow-blue-500/20"
                            }`}>
                            {link.name}
                        </Link>
                    ))}
                    <SignedIn>
                        <Link 
                            href="/user/submissions"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                pathname === "/user/submissions"
                                    ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                    : "hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-bold hover:shadow-md hover:shadow-blue-500/20"
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