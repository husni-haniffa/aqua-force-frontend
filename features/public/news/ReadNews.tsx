import React from 'react'
import { useNewsById } from './news.hooks'
import { AlertError } from '@/components/ui/alert-error'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Calendar, ArrowLeft, User, ArrowRight } from 'lucide-react'
import { formateDate } from '@/lib/format'

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
    <div className='container pt-16 xl:pt-24 pb-16 xl:pb-24'>
      <div >
      
      
        <article>
             <div key={data?._id}>
                                  <div>
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
                                      <div className="flex flex-col gap-3 pt-6"> 
                                          <header>
                                              <h1 className="text-lg xl:text-xl font-bold mb-3 text-slate-800">{data?.title}</h1>
                                          </header>
                                          <div>
                                              <p className="text-xs xl:text-sm text-slate-600">{data?.content}</p>
                                          </div>
          
                                          <div className="flex justify-between items-center border-t border-slate-200 pt-6 mt-6">
                                              <h6 className='text-xs xl:text-sm text-slate-600'>
                                                  {data?.updatedAt && formateDate(data.updatedAt)}
                                                
                                              </h6>
                                              <Link 
                                          href={`/news/${data?._id}/read`}
                                          className='text-xs xl:text-sm flex items-center text-blue-500 gap-2'
                                      >
                                          Read More
                                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                      </Link>
                                          </div>
                                      </div>                    
                                      
                                  </div>
                              </div>
        </article>
      </div>
    </div>
  )
}

export default ReadNews