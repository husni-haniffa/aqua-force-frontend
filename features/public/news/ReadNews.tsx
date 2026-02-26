import React from 'react'
import { useNewsById } from './news.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Calendar, ArrowLeft, User, ArrowRight } from 'lucide-react'
import { formateDate } from '@/lib/format'
import { NewsArticleSkeleton } from './Skeleton'
import { Button } from '@/components/ui/button'

const ReadNews = ({ id }: { id: string }) => {

  const { data, isLoading, error } = useNewsById(id)

  if (error instanceof Error) return <AlertError message={error.message} />

  return (
    <div className='container pt-16 xl:pt-24 pb-16 xl:pb-24'>

        {isLoading ? (
            <NewsArticleSkeleton/>
        ) : (
            <article key={data?._id}>
                {data?.imageUrl && (
                    <div className="relative w-full h-100">
                        <Image
                            src={data?.imageUrl}
                            alt="news-post"
                            fill
                            priority
                            className="object-cover rounded-lg"
                        />
                    </div>
                )} 
                <div className='flex flex-col gap-6 mt-6 mb-6'>
                    <h1 className='text-lg xl:text-xl font-bold text-slate=800'>{data?.title}</h1>
                    <p className='text-xs xl:text-sm text-slate-600 leading-relaxed'>{data?.content}</p>
                </div>
                <div className='border-t'>
                    <div className='mt-6 flex items-center justify-between'>
                        <Label className='text-slate-800 text-xs xl:text-sm'>{data?.updatedAt && formateDate(data.updatedAt)}</Label>
                        <Button asChild variant={'outline'} className='border-none'>
      <Link href={`/news/${data?._id}/read`} className='text-blue-500'>
        Read More News
        <ArrowRight />
      </Link>
    </Button>
                    </div>
                </div>
            </article>
        )}
     
      
      
    </div>
  )
}

export default ReadNews