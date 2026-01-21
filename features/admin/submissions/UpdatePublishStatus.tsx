import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { usePublishSubmission } from "./submission.hooks"
import ButtonLoader from "@/components/ui/button-loader"

type UpdatePublishStatusProps = {
  id: string
  defaultVisibility?: "PUBLIC" | "MEMBERS"
}

const UpdatePublishStatus = ({id, defaultVisibility = "PUBLIC"}: UpdatePublishStatusProps) => {

  const [visibility, setVisibility] = React.useState<"PUBLIC" | "MEMBERS">(defaultVisibility)
  const [open, setOpen] = React.useState(false)

  const publishMutation = usePublishSubmission()

  const handleConfirm = () => {
    const onSuccess = () => setOpen(false)
    publishMutation.mutate({id,accessLevel: visibility,}, {onSuccess})
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
             Publish Settings
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <RadioGroup
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as "PUBLIC" | "MEMBERS")}
            >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PUBLIC" id="public" />
              <Label htmlFor="public">Public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MEMBERS" id="members" />
              <Label htmlFor="members">Members only</Label>
            </div>
          </RadioGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel  disabled={publishMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={publishMutation.isPending}>
            {publishMutation.isPending ? <ButtonLoader text="Publishing"/> : "Publish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdatePublishStatus
