"use client"
import { navLinks } from '@/lib/navLinks'
import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Label } from '../ui/label'
import { socialMedia } from '@/lib/socialMedia'
import { contactInfo } from '@/lib/company'

const Footer = () => {


  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
  <div className="container">

    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">

      {/* Brand column */}
      <div className="flex flex-col gap-5 lg:max-w-xs">
        <Link href="/" className="w-fit">
          <span className="font-bold text-xl text-white">
            Research<span className="text-blue-500"> Minds Net</span>
          </span>
        </Link>

        <p className="text-sm text-slate-400 leading-relaxed">
          A place for minds to connect, ideas to grow, and research to create real-world impact.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3 mt-1">
          {socialMedia.map((social) => (
            <Link
              key={social.id}
              href={social.href}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200">
              <social.icon size={15} />
            </Link>
          ))}
        </div>
      </div>

      {/* Links columns */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10 lg:gap-20 lg:ml-auto">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Contact
          </p>
          <div className="flex flex-col gap-3">
            {contactInfo.map((contact) => (
              <Link
                key={contact.id}
                href={contact.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                {contact.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Company
          </p>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                {link.name}
              </Link>
            ))}
            <SignedIn>
              <Link
                href="/user/submissions"
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                Submissions
              </Link>
            </SignedIn>
          </div>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Research Minds Net. All rights reserved.
      </span>
      <Link
        href="/Policy Note.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-slate-500 hover:text-white transition-colors duration-200">
        Privacy Policy
      </Link>
    </div>

  </div>
</footer>
  )
}

export default Footer