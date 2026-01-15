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
            className="lg:hidden p-2 rounded-lg"
            aria-label="Toggle menu"
            variant={"secondary"}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
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
            <div className="container py-4 space-y-2"> 
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <SignedIn>
                <Link href="/my-submissions"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === "/my-submissions"
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                    My Submissions
                </Link>
              </SignedIn>
              <div className="pt-6 px-4 flex flex-col gap-2">
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                  <Button asChild>
                    <Link href={"/sign-in"}>Sign In</Link>
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