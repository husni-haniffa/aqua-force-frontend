import * as React from "react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useSubmissionApproved, useSubmissionReject, useSubmissionUnderReview } from "./submission.hooks"
import ButtonLoader from "@/components/ui/button-loader"

type Status = | "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"

type UpdateSubmissionStatusProps = {
  id: string
  currentStatus: Status
}

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
] as const

const UpdateSubmissionStatus: React.FC<UpdateSubmissionStatusProps> = ({
  id,
  currentStatus,
}) => {

  const [status, setStatus] = React.useState<Status>(currentStatus)
  const [open, setOpen] = React.useState(false)

  const underReviewMutation = useSubmissionUnderReview()
  const approvedMutation = useSubmissionApproved()
  const rejectedMutation = useSubmissionReject()

  const isLoading = underReviewMutation.isPending || approvedMutation.isPending || rejectedMutation.isPending

  const handleConfirm = () => {
    if (status === currentStatus) return
    const onSuccess = () => setOpen(false)
    switch (status) {
      case "UNDER_REVIEW":
        underReviewMutation.mutate(id, { onSuccess })
        break
      case "APPROVED":
        approvedMutation.mutate(id, { onSuccess })
        break
      case "REJECTED":
        rejectedMutation.mutate(id, { onSuccess })
        break
      default:
        break
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          Update Status
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Update Submission Status
          </AlertDialogTitle>
        </AlertDialogHeader>
        <RadioGroup
          value={status}
          onValueChange={(value) =>
            setStatus(value as Status)
          }
          className="space-y-3"
          defaultValue={currentStatus}
        >
          {statusOptions.map((item) => (
            <div
              key={item.value}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem
                value={item.value}
                id={item.value}
                disabled={isLoading}
              />
              <Label htmlFor={item.value}>
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={
              isLoading || status === currentStatus
            }
          >
            {isLoading ? <ButtonLoader text="Updating" /> : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UpdateSubmissionStatus
