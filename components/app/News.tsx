import Link from "next/link"
import { useNews } from "@/features/public/news/news.hooks"
import { ArrowRight } from "lucide-react"
import { AlertError } from "../ui/alert-error"
import { Button } from "../ui/button"
import { NewsCardsSkeleton } from "@/features/public/news/Skeleton"
import { motion } from "framer-motion"
import { container, item } from "@/lib/animation"
import Card from "@/features/public/news/Card"

const News = () => {

    const { data, isLoading, error } = useNews()
    if(error instanceof Error) return <AlertError message={error.message}/>

  return (
    <section className='pt-16 xl:pt-24'>

        <header className='flex flex-col items-center justify-center gap-3 mb-12 text-center'>
            <motion.h6 
                className='text-sm md:text-base text-blue-500' initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut"  }}
                viewport={{ once: false, amount: 0.3 }}>
                    STAY UPDATED
            </motion.h6>
            <motion.h1 
                className='text-2xl md:text-3xl xl:text-4xl font-bold text-slate-800' 
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut"  }}
                viewport={{ once: false, amount: 0.3 }}>
                    Latest News
            </motion.h1>
        </header>

            {isLoading ? (
                <NewsCardsSkeleton/>
            ) : (
                <motion.div className="columns-1 md:columns-2 gap-9 space-y-9" 
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}>
                    {data?.slice(0,6).map((news) => (
                        <Card news={news} key={news._id} variants={item}/>
                    ))}
                </motion.div>
            )}

            <motion.div 
                className='flex justify-center pt-12'  initial={{ opacity: 0, x: -40 }}
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