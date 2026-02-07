import React from 'react'
import { useNewsById } from './news.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Calendar, ArrowLeft, User } from 'lucide-react'

const ReadNews = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useNewsById(id)

  if (isLoading) return (
    <div className="container py-12">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading article...</p>
      </div>
    </div>
  )
  if (error instanceof Error) return <AlertError message={error.message} />

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {data?.imageUrl ? (
            <div className="relative w-full aspect-video lg:aspect-[16/9] overflow-hidden">
              <Image
                src={data?.imageUrl}
                alt="news-post-image"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
          ) : (
            <div className="w-full aspect-video lg:aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-slate-400 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-3" />
                <span className="text-base">No Image Available</span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-slate-800 text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                {data?.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {data?.updatedAt && new Date(data.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Research Team</span>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none">
              <div className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                {data?.content}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-slate-500 text-sm">
                  Published on {data?.updatedAt && new Date(data.updatedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
                >
                  Read More Articles
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ReadNews