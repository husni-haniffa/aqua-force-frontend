import { Card,CardHeader, CardTitle, CardContent, CardFooter} from '@/components/ui/card'
import { NewsResponse } from './news.types'

const NewsView = ({news} : {news: NewsResponse})  => {
  return (
    <Card className='w-w-full border-0 shadow-none' key={news._id}>
        <CardHeader>
            <CardTitle className='text-slate-800'>
                {news.title}
            </CardTitle>
        </CardHeader>
        <CardContent className='text-slate-600'>
            {news.content}
        </CardContent>
        <CardFooter className='text-sm'>
            <span className='font-semibold mr-3'>
                Created:
            </span>
            {news.createdAt}
        </CardFooter>
    </Card>
  )
}

export default NewsView