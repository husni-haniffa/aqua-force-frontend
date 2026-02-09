import Image from "next/image"
import Link from "next/link"
import { useNews } from "@/features/public/news/news.hooks"
import { ArrowRight, Calendar } from "lucide-react"
import { AlertError } from "../ui/alert-error"
import { formateDate } from "@/lib/format"

const News = () => {

    const { data, isLoading, error } = useNews()
    if(isLoading) return <p>loading</p>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <h6 className='text-sm md:text-base text-slate-600'>STAY UPDATED</h6>
            <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800'>
                Latest News
            </h1>
        </header>

        <div>
            <div className="columns-1 md:columns-2 gap-9 space-y-9">
                {data?.slice(0,6).map((news) => (
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
                            <div className="px-2 py-4"> 
                                <header>
                                    <h1 className="text-lg xl:text-xl font-bold mb-3 text-slate-800">{news.title}</h1>
                                </header>
                                <div className="pb-3">
                                    <p className="text-xs xl:text-sm text-slate-600">{news.content}</p>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                                    <h6 className='text-xs xl:text-sm text-slate-950'>
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
        
       
    </section>
   
  )
}

export default News