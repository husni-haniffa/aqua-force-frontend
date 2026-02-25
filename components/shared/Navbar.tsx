"use client"
import Link from 'next/link'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/navLinks'
import { usePathname } from 'next/navigation'
import MobileNavbar from './MobileNavbar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useCheckRole } from '@/utils/checkRole'
import { ShieldUser } from 'lucide-react'

const Navbar = () => {
    
    const pathname = usePathname()
    const isAdmin = useCheckRole('admin')
    
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border bg-white'>
        <div className='container'>
            <div className='flex items-center justify-between h-16'>          
                  <Link href={"/"} className='bg-blue-100 px-2 py-1 rounded-lg'>                       
                    <span className="font-bold text-lg sm:text-xl lg:text-2xl leading-tight bg-blue-500 bg-clip-text text-transparent">
                        Research Minds Net
                    </span> 
                </Link>
                <div className='hidden lg:flex items-center gap-1'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-base transition-colors ${
                                pathname === link.href
                                    ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                    : "text-slate-800 hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-semibold hover:shadow-md hover:shadow-blue-500/20"
                            }`}>
                            {link.name}
                        </Link>
                    ))}
                    <SignedIn>
                        <Link 
                            href="/user/submissions"
                            className={`px-4 py-2 rounded-lg text-base transition-colors ${
                                pathname === "/user/submissions"
                                    ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                                    : "text-slate-800 hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-bold hover:shadow-md hover:shadow-blue-500/20"
                            }`}
                        >
                            Submissions
                        </Link>
                    </SignedIn>
                </div>
                <div className='hidden lg:flex items-center gap-6'>
                    {isAdmin && 
                        <Button asChild className='bg-blue-950 hover:bg-blue-900'>
                            <Link href="/admin" className='font-semibold'>
                                Admin
                            </Link>
                        </Button>
                        
                    }
                    <SignedOut>
                        <Button asChild className='font-semibold' variant={'secondary'}>
                            <Link href={"/sign-in?redirect_url=/user/submissions"}>Submit Your Paper</Link>
                        </Button>
                    </SignedOut>
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