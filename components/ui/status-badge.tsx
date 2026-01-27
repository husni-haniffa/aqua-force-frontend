import React from "react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

type Status = "PENDING" | "UNDER_REVIEW" | "REJECTED" | "ACCEPTED" 

type StatusBadgeProps = {
  status: Status
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseStyles =
    "border px-2 py-0.5 text-xs font-medium rounded-md"

  const statusStyles =
    status === "PENDING"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : status === "UNDER_REVIEW"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : status === "ACCEPTED"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200"

  const label = status.replace("_", " ")

  return (
    <Badge className={cn(baseStyles, statusStyles)}>
      {label}
    </Badge>
  )
}

export default StatusBadge
