
import { Card,CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '@/components/ui/card'
import { EventResponse } from './event.types'

const EventView = ({event} : {event: EventResponse})  => {
  return (
    <Card className='w-w-full border-0 shadow-none' key={event._id}>
        <CardHeader>
            <CardTitle className='text-slate-800'>
                {event.title}
            </CardTitle>
            <CardDescription className='text-slate-600'>
                {event.description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className='flex flex-row items-center gap-3'>
                <header className='font-semibold'>Date</header>
                <p>
                    {new Date(event.eventDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    })}
                </p>
            </div>
            <div className='flex flex-row items-center gap-3'>
                <header className='font-semibold'>Time</header>
                <p>
                     {(() => {
                        const [hour, minute] = event.eventTime.split(":").map(Number)
                        const period = hour >= 12 ? "PM" : "AM"
                        const hour12 = hour % 12 === 0 ? 12 : hour % 12
                        return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`
                      })()}
                </p>
            </div>
            <div className='flex flex-row items-center gap-3'>
                <header className='font-semibold'>Location</header>
                <p>
                    {event.location}
                </p>
            </div>
        </CardContent>
        <CardFooter className='text-sm'>
            <span className='font-semibold mr-3'>
                Created:
            </span>
            {event.createdAt}
        </CardFooter>
    </Card>
  )
}

export default EventView