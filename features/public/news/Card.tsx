import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NewsResponse } from '@/features/admin/news/news.types'
import { formateDate } from '@/lib/format'
import { Variant } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
    news: NewsResponse
    variants?: Variant
}

const Card = ({news} : NewsCardProps) => {

  return (

    <motion.div
  key={news._id}
  className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-fit">

  {/* Image */}
  {news.imageUrl && (
    <div className="relative w-full h-48 overflow-hidden">
      <Image
        src={news.imageUrl}
        alt={news.title}
        fill
        priority
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )}

  <div className="flex flex-col gap-5 p-5">

    {/* Title */}
    <h3 className="text-base xl:text-lg font-bold text-slate-900 leading-snug">
      {news.title}
    </h3>

    {/* Content preview */}
    <p className="text-sm text-slate-500 leading-relaxed">
      {news.content.slice(0, 500)}...
    </p>

    <div className="h-px bg-slate-100" />

    {/* Footer */}
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        {formateDate(news.updatedAt)}
      </div>
      <Button asChild size="sm" className="shrink-0">
        <Link
          href={`/news/${news._id}/read`}
          className="flex items-center gap-1.5 font-semibold">
          Read More
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </Button>
    </div>

  </div>
</motion.div>
  )
}

export default Card