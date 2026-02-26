"use client"

import Link from "next/link"
import { Youtube, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

type SocialLinksProps = {
  links: {
    youtube?: string
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
}

const SOCIAL_CONFIG = {
  youtube: {
    icon: Youtube,
    className: "text-red-600 hover:text-red-700",
    title: "YouTube",
  },
  facebook: {
    icon: Facebook,
    className: "text-blue-600 hover:text-blue-700",
    title: "Facebook",
  },
  instagram: {
    icon: Instagram,
    className: "text-pink-600 hover:text-pink-700",
    title: "Instagram",
  },
  twitter: {
    icon: Twitter,
    className: "text-sky-600 hover:text-sky-700",
    title: "Twitter",
  },
  linkedin: {
    icon: Linkedin,
    className: "text-blue-700 hover:text-blue-800",
    title: "LinkedIn",
  },
} as const

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {Object.entries(links).map(([key, url]) => {
        if (!url) return null

        const config = SOCIAL_CONFIG[key as keyof typeof SOCIAL_CONFIG]
        if (!config) return null

        const Icon = config.icon

        return (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 transition-colors bg-slate-100 shadow-sm px-2 py-2 rounded-md ${config.className}`}
            title={config.title}
          >
            <Icon className="w-4 h-4" />
          </Link>
        )
      })}
    </div>
  )
}