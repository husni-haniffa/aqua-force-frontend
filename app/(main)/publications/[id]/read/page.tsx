"use client"

import ReadNews from "@/features/public/news/ReadNews"
import ReadPublication from "@/features/public/publications/ReadPublication"
import { use } from "react"

interface PageProps {
    params: Promise<{ id: string}>
}

const ReadPublishedPaper = ({params} : PageProps) => {

    const {id} = use(params);

    return (
        <div className="bg-white">
            <ReadPublication id={id}/>
        </div>
    )
   
}

export default ReadPublishedPaper