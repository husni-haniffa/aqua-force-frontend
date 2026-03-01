import { Button } from "@/components/ui/button"
import { formateDate, formateTime } from "@/lib/format"
import { motion } from "framer-motion"
import { Bell, Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { EventCardProps, handleAddToCalendar } from "./event.types"

const Card = ({event} : EventCardProps) => {
    
  return (
    <motion.div
  key={event._id}
  className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-fit">

  {/* Image */}
  {event.imageUrl && (
    <div className="relative overflow-hidden h-48">
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={false}
      />
      {/* Category badge overlaid on image */}
      <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-white text-xs font-semibold">{event.title}</span>
      </div>
    </div>
  )}

  <div className="flex flex-col gap-5 p-5">

    {/* Category badge — shown only if no image */}
    {!event.imageUrl && (
      <div className="bg-amber-50 border border-amber-100 px-3 py-1 rounded-full w-fit">
        <span className="text-amber-600 text-xs font-semibold">{event.title}</span>
      </div>
    )}

    {/* Description */}
    <h3 className="text-slate-800 text-base xl:text-lg font-bold leading-snug">
      {event.description}
    </h3>

    <div className="h-px bg-slate-100" />

    {/* Meta info */}
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg shrink-0">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <span className="text-sm text-slate-600">{formateDate(event.eventDate)}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-50 rounded-lg shrink-0">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <span className="text-sm text-slate-600">{formateTime(event.eventTime)}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 rounded-lg shrink-0">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
        </div>
        <span className="text-sm text-slate-600">{event.location}</span>
      </div>
    </div>

    <div className="h-px bg-slate-100" />

    {/* CTA */}
    <Button
      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-semibold border border-blue-100 hover:border-blue-200 transition-all duration-200"
      onClick={() => handleAddToCalendar(event)}>
      <Bell className="w-4 h-4 mr-1" />
      Add to Calendar
    </Button>

  </div>
</motion.div>
  )
}

export default Card