import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PublicationCardProps } from './publication.types'
import { formateDate } from '@/lib/format'
import SocialLinks from './SocialLinks'
import { motion } from "framer-motion"


const Card = ({ publication }: PublicationCardProps) => {
  return (
    <motion.div
  key={publication._id}
  className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-fit">

  <div className="flex flex-col gap-5 p-6">

    {/* Top row: category + date */}
    <div className="flex items-center justify-between">
      <div className="bg-green-50 border border-green-100 px-3 py-1 rounded-full">
        <span className="text-xs font-semibold text-green-600">
          {publication.categoryId.name}
        </span>
      </div>
      <span className="text-xs text-slate-400">
        {formateDate(publication.updatedAt)}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-base xl:text-lg font-bold text-slate-900 leading-snug">
      {publication.title}
    </h3>

    {/* Author + research type */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-blue-600">
            {publication.userName.charAt(0)}
          </span>
        </div>
        <span className="text-sm text-slate-700 font-medium">
          {publication.userName}
        </span>
      </div>
      <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
        {publication.researchTypeId.name}
      </span>
    </div>

    <div className="h-px bg-slate-100" />

    {/* Abstract */}
    <p className="text-sm text-slate-500 leading-relaxed">
      {publication.abstract.slice(0, 500)}...
    </p>

    {/* Keywords */}
    <div className="flex flex-wrap gap-1.5">
      {publication.keywords.map((keyword, index) => (
        <span
          key={index}
          className="bg-slate-50 border border-slate-200 text-slate-500 text-xs px-2.5 py-1 rounded-full">
          {keyword}
        </span>
      ))}
    </div>

    <div className="h-px bg-slate-100" />

    {/* Footer: social links + CTA */}
    <div className="flex items-center justify-between gap-4">
      {publication.socialMediaLinks && (
        <SocialLinks links={publication.socialMediaLinks} />
      )}
      <Button asChild size="sm" className="ml-auto shrink-0">
        <Link
          href={`/publications/${publication._id}/read`}
          className="flex items-center gap-1.5 font-semibold">
          Read Publication
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </Button>
    </div>

  </div>
</motion.div>
  )
}

export default Card