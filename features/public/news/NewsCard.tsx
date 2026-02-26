import Image from "next/image"
import Link from "next/link"
import { useNews } from "./news.hooks"
import { ArrowRight } from "lucide-react"
import { formateDate } from "@/lib/format"
import { NewsCardsSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"
import { motion } from "framer-motion"
import { container, item } from "@/lib/animation"
import Card from "./Card"



const NewsCard = () => {
    const { data, isLoading, error } = useNews()
    if(isLoading) return <NewsCardsSkeleton/>
    if(error instanceof Error) return <AlertError message={error.message}/>
  return (
    
        <div className="container">
            <motion.div className="columns-1 md:columns-2 gap-9 space-y-9"
               variants={container}
                                 initial="hidden"
                                 animate="visible"
                                 >
                {data?.map((news) => (
                   <Card news={news} key={news._id} variants={item}/>
                ))}
            </motion.div>
        </div>
  )
}

export default NewsCard