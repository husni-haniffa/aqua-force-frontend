import { useNewsById } from './news.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { NewsArticleSkeleton } from './Skeleton'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

// ReadNews
const ReadNews = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useNewsById(id)
  if (error instanceof Error) return <AlertError message={error.message} />
  if (isLoading) return <NewsArticleSkeleton />

  return (
    <section className="container pt-6 xl:pt-12 pb-16 xl:pb-24">
      <motion.article
        key={data?._id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className=" flex flex-col gap-8">

        {/* Hero image */}
        {data?.imageUrl && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl">
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight">
          {data?.title}
        </h1>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {data?.updatedAt && formateDate(data.updatedAt)}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Content */}
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
          {data?.content}
        </p>

        <div className="h-px bg-slate-100" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">Thanks for reading</span>
          <Button asChild size="sm" className="shrink-0">
            <Link href="/news" className="flex items-center gap-1.5 font-semibold">
              More News
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

      </motion.article>
    </section>
  )
}

export default ReadNews