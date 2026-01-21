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
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border'>
        <div className='container'>
            <div className='flex items-center justify-between h-16'>          
                <Link href={"/"} className='flex items-center gap-2 group'>
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                        <Brain className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight text-foreground">
                            AquaForce
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                            TOGETHER. FUTURE. LIFE
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
                                ? "bg-secondary text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <SignedIn>
                        <Link href="/user/submissions"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            pathname === "/submissions"
                                ? "bg-secondary text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                        >
                            Submissions
                        </Link>
                    </SignedIn>
                </div>
                <div className='hidden lg:flex items-center gap-3'>
                    {isAdmin && <Link href="/admin">Admin</Link>}
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild>
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