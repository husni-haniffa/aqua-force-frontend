import Image from "next/image"
import Link from "next/link"
import { useNews } from "@/features/public/news/news.hooks"
import { ArrowRight, Calendar } from "lucide-react"
import { AlertError } from "../ui/alert-error"
import { formateDate } from "@/lib/format"
import { Button } from "../ui/button"
import { NewsCardsSkeleton } from "@/features/public/news/Skeleton"
import { motion } from "framer-motion"
import { container, item } from "@/lib/animation"
const News = () => {

    const { data, isLoading, error } = useNews()
    if(isLoading) return <NewsCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <motion.h6 className='text-sm md:text-base text-blue-500' initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}>STAY UPDATED</motion.h6>
            <motion.h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800' initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut"  }}
                    viewport={{ once: false, amount: 0.3 }}>
                Latest News
            </motion.h1>
        </header>

        
            <motion.div className="columns-1 md:columns-2 gap-9 space-y-9" 
              variants={container}
                                       initial="hidden"
                                       whileInView="visible"
                                        viewport={{ once: false, amount: 0.1 }}
                                       >
                {data?.slice(0,6).map((news) => (
                    <motion.div key={news._id} 
                    variants={item}
                    
                    className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
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
                                    <p className="text-xs xl:text-sm text-slate-600">{news.content.slice(0,5000)}</p>
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
                    </motion.div>
                ))}
            </motion.div>
        <motion.div className='flex justify-center pt-12'  initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 300}}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale:1 }}
                        viewport={{ once: false, amount: 0.3 }}>
            <Button asChild>
                <Link href={'/news'}>
                    Explore More News <ArrowRight/>
                </Link>
            </Button>
        </motion.div>
        
       
    </section>
   
  )
}

export default News