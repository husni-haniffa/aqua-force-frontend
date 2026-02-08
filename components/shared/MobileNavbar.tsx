"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/navLinks";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const MobileNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
    
  return (
    <div className="lg:hidden">
        <Button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 sm:p-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            aria-label="Toggle menu"
            variant="secondary"
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800" />
            )}
        </Button>
        <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 z-40 border-b border-border"
          >
            <div className="container py-4 px-4 sm:px-6 space-y-3 sm:space-y-4 bg-slate-50"> 
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                      pathname === link.href
                          ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-800 hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-bold hover:shadow-md hover:shadow-blue-500/20"
                  }`}
                >
                      {link.name}
                  </Link>
              ))}
              <SignedIn>
                <Link 
                  href="/user/submissions"
                  className={`block px-4 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                      pathname === "/user/submissions"
                          ? "bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-800 hover:bg-linear-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:font-bold hover:shadow-md hover:shadow-blue-500/20"
                  }`}>
                  Submissions
                </Link>
              </SignedIn>
              <div className="pt-6 px-4 flex flex-col gap-3 sm:gap-4">
                <SignedIn>
                  <div className="flex items-center justify-center bg-slate-200 rounded-lg py-1.5">
                    <UserButton/>
                  </div>
                </SignedIn>
                <SignedOut>
                  <Button 
                    asChild
                    className='font-semibold'
                  >
                    <Link href={"/sign-in"} className="text-white">Sign In</Link>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavbar