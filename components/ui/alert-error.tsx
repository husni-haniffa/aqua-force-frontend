import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleX } from "lucide-react"

export function AlertError({message} : {message: string}) {
  return (
    <div className="flex justify-center items-center mt-9 mb-6">
      <Alert className="max-w-md border-red-300 bg-red-50">
        <CircleX color="red"/>
        <AlertTitle className="text-red-500 font-semibold">{message}</AlertTitle>
          <AlertDescription className="sr-only">
            Error Message
          </AlertDescription>
      </Alert>
    </div>
  )
}
