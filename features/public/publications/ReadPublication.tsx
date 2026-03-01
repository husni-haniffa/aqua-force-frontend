"use client"
import { usePublicationById } from './publication.hooks'
import Link from 'next/link'
import { Download} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formateDate } from '@/lib/format'
import { AlertError } from '@/components/ui/alert-error'
import { ReadPublicationSkeleton } from './Skeleton'
import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import { Label } from '@/components/ui/label'

// ReadPublication
const ReadPublication = ({ id }: { id: string }) => {
  const { data, isLoading, error } = usePublicationById(id)
  if (isLoading) return <ReadPublicationSkeleton />
  if (error instanceof Error) return <AlertError message={error.message} />

  return (
    <section className="container pt-6 xl:pt-12 pb-16 xl:pb-24">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-5">

        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <div className="bg-green-50 border border-green-100 px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-green-600">
              {data?.categoryId.name}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Published on {data?.updatedAt ? formateDate(data.updatedAt) : "N/A"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight">
          {data?.title}
        </h1>

        {/* Author + research type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-blue-600">
                {data?.userName.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-700">
              {data?.userName}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            {data?.researchTypeId.name}
          </span>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Abstract */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-slate-800">Abstract</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {data?.abstract}
          </p>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5">
          {data?.keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-slate-50 border border-slate-200 text-slate-500 text-xs px-2.5 py-1 rounded-full">
              {keyword}
            </span>
          ))}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Footer: social links + download */}
        <div className="flex items-center justify-between gap-4">
          {data?.socialMediaLinks && (
            <SocialLinks links={data.socialMediaLinks} />
          )}
          <Button asChild className="ml-auto shrink-0">
            <Link href={data?.filePath || ""} target="_blank" className="flex items-center gap-1.5 font-semibold">
              <Download className="w-4 h-4" />
              Download Paper
            </Link>
          </Button>
        </div>

      </motion.article>
    </section>
  )
}

export default ReadPublication