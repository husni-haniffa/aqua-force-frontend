"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/navLinks";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useCheckRole } from "@/utils/checkRole";

// MobileNavbar
const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = useCheckRole('admin')

  return (
    <div className="lg:hidden">

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
        aria-label="Toggle menu">
        {isOpen
          ? <X className="w-5 h-5" />
          : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-lg shadow-slate-200/50">

            <div className="container py-4 flex flex-col gap-1">

              {/* Nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
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
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === "/user/submissions"
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}>
                  Submissions
                </Link>
              </SignedIn>

              {/* Divider */}
              <div className="h-px bg-slate-100 my-2" />

              {/* Actions */}
              <div className="flex flex-col gap-2 px-1 pb-2">
                {isAdmin && (
                  <Button asChild size="sm"  className="font-semibold w-full bg-slate-900 hover:bg-slate-800 text-white border-none">
                    <Link href="/admin" onClick={() => setIsOpen(false)}>Admin</Link>
                  </Button>
                )}
                <SignedOut>
                  <Button asChild size="sm" className="font-semibold w-full bg-blue-600 hover:bg-blue-500 text-white border-none">
                    <Link href="/sign-in?redirect_url=/user/submissions" onClick={() => setIsOpen(false)}>
                      Submit Your Paper
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="font-semibold w-full bg-slate-900 hover:bg-slate-800 text-white border-none">
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <UserButton />
                    <span className="text-sm text-slate-500">My Account</span>
                  </div>
                </SignedIn>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavbar