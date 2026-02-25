
import { Card,CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction} from '@/components/ui/card'
import { SubmissionResponse } from './submission.types'

const SubmissionView = ({submission} : {submission: SubmissionResponse})  => {
  return (
    <Card className='w-w-full border-0 shadow-none' key={submission._id}>
        <CardHeader>
            <CardTitle className='text-slate-800 text-sm'>
                {submission.title}
            </CardTitle>
            <CardDescription className='text-slate-600 text-xs'>
                {submission.categoryId.name}
            </CardDescription>
            <CardAction className='text-xs text-amber-600'>
                {submission.researchTypeId.name}
            </CardAction>
        </CardHeader>
        <CardContent className='text-sm'>
            {submission.abstract.slice(0,250)}
        </CardContent>
        <CardFooter className='text-xs'>
            <span className='font-semibold mr-3 text-xs'>
                Created:
            </span>
            {submission.createdAt}
        </CardFooter>
    </Card>
  )
}

export default SubmissionView