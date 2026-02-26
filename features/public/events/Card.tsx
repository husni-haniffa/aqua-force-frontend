import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formateDate, formateTime } from "@/lib/format"
import { motion } from "framer-motion"
import { Bell, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { EventCardProps, handleAddToCalendar } from "./event.types"

const Card = ({event, variants} : EventCardProps) => {
    
  return (
    <motion.div 
        key={event._id}
        className='bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group  h-fit'>

        {event.imageUrl && (
            <div className='relative overflow-hidden rounded-lg'>
                <Image 
                    src={event.imageUrl} 
                    alt={event.title}
                    width={800}
                    height={200}
                    className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                    priority={false}
                />
            </div>
        )}
        
        <div className="px-4 py-4 flex flex-col gap-6">
            <div className="bg-amber-50 px-2 py-1 rounded-md w-fit">
                <Label className="text-amber-600 text-xs xl:text-sm">{event.title}</Label>
            </div>
            <div className="mb-4">
                <h1 className="text-slate-800 text-lg xl:text-xl mb-6 font-bold">{event.description}</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-6">
                        <div className="bg-blue-100 px-2 py-2 rounded-lg">
                            <Calendar className="text-blue-600 w-4 h-4"/>
                        </div>
                        <Label>{formateDate(event.eventDate)}</Label>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="bg-amber-100 px-2 py-2 rounded-lg">
                            <Clock className="text-amber-600 w-4 h-4"/>
                        </div>
                        <Label>{formateTime(event.eventTime)}</Label>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="bg-red-100 px-2 py-2 rounded-lg">
                            <MapPin className="text-red-600 w-4 h-4"/>
                        </div>
                        <Label>{event.location}</Label>
                    </div>
                </div>
            </div>
            <div>
                <Button className="bg-blue-100 text-blue-600 hover:bg-blue-200 w-full hover:text-blue-700 font-semibold" onClick={() => handleAddToCalendar(event)}>
                    <Bell className="text-blue-600 hover:text-blue-700"/>
                    Add to Calender
                </Button>
            </div>
        </div>
    </motion.div>
  )
}

export default Card