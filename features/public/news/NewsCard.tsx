import Image from "next/image"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useNews } from "./news.hooks"
import { Calendar, ArrowRight } from "lucide-react"
import { formateDate } from "@/lib/format"
import { NewsCardsSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"

const NewsCard = () => {
    const { data, isLoading, error } = useNews()
    if(isLoading) return <NewsCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
  return (
    
        <div>
            <div className="columns-1 md:columns-2 gap-9 space-y-9">
                {data?.map((news) => (
                    <div key={news._id} className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
                        <div>
                            {news.imageUrl && (
                                <div className="relative w-full h-50">
                                    <Image
                                        src={news.imageUrl}
                                        alt="news-post"
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            )}  
                            <div className="px-2 py-2"> 
                                <header>
                                    <h1 className="text-lg xl:text-xl font-bold mb-3 text-slate-800">{news.title}</h1>
                                </header>
                                <div>
                                    <p className="text-xs xl:text-sm text-slate-600">{news.content}</p>
                                </div>

                                <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                                    <h6 className='text-xs xl:text-sm text-slate-600'>
                                        {formateDate(news.updatedAt)}
                                      
                                    </h6>
                                    <Link 
                                href={`/news/${news._id}/read`}
                                className='text-xs xl:text-sm flex items-center text-blue-500 gap-2'
                            >
                                Read More
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                                </div>
                            </div>                    
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default NewsCard