
import { Card,CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card'
import { SubmissionResponse } from './submission.types'

const SubmissionView = ({submission} : {submission: SubmissionResponse})  => {
  return (
    <Card className='w-w-full border-0 shadow-none' key={submission._id}>
        <CardHeader>
            <CardTitle className='text-slate-800'>
                {submission.title}
            </CardTitle>
            <CardDescription className='text-slate-600'>
                {submission.categoryId.name}
            </CardDescription>
        </CardHeader>
        <CardContent>
            {submission.abstract}
        </CardContent>
        <CardFooter className='text-sm'>
            <span className='font-semibold mr-3 text-sm'>
                Created:
            </span>
            {submission.createdAt}
        </CardFooter>
    </Card>
  )
}

export default SubmissionView