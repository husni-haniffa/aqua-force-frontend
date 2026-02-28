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

      <header className="flex flex-col items-center gap-3 mb-16 text-center">
  <motion.p
    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}>
    Stay Updated
  </motion.p>
  <motion.h2
    className="text-3xl md:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1 }}
    viewport={{ once: false, amount: 0.3 }}>
    Latest <span className="text-blue-500">News</span>
  </motion.h2>
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
                <Button asChild className="font-semibold bg-slate-900 hover:bg-slate-800 text-white border-none">
                    <Link href={'/news'}>
                        Explore More News <ArrowRight/>
                    </Link>
                </Button>
            </motion.div>
        
    </section>
   
  )
}

export default News