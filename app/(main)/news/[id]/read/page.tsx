"use client"

import ReadNews from "@/features/public/news/ReadNews"
import { use } from "react"

interface PageProps {
    params: Promise<{ id: string}>
}

const ReadNewsPage = ({params} : PageProps) => {

    const {id} = use(params);
    return (
         <div className="container py-24">
        <ReadNews id={id}/>
    </div>
    )
   
}

export default ReadNewsPage