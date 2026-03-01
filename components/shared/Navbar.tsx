"use client"
import Link from 'next/link'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/navLinks'
import { usePathname } from 'next/navigation'
import MobileNavbar from './MobileNavbar'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useCheckRole } from '@/utils/checkRole'

// Navbar
const Navbar = () => {
  const pathname = usePathname()
  const isAdmin = useCheckRole('admin')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/">
            <span className="font-bold text-lg sm:text-xl text-slate-900">
              Research<span className="text-blue-500"> Minds Net</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}>
                {link.name}
              </Link>
            ))}
            <SignedIn>
              <Link
                href="/user/submissions"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/user/submissions"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}>
                Submissions
              </Link>
            </SignedIn>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdmin && (
              <Button asChild size="sm" className="font-semibold w-full bg-slate-900 hover:bg-slate-800 text-white border-none">
                <Link href="/admin">Admin</Link>
              </Button>
            )}
            <SignedOut>
              <Button asChild size="sm" className="font-semibold bg-blue-600 hover:bg-blue-500 text-white border-none">
                <Link href="/sign-in?redirect_url=/user/submissions">
                  Submit Your Paper
                </Link>
              </Button>
              <Button asChild size="sm" className="font-semibold bg-slate-900 hover:bg-slate-800 text-white border-none">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <MobileNavbar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar