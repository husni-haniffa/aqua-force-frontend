"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ButtonLoader from "@/components/ui/button-loader"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EventResponse, formSchema } from "@/types/events"
import { EditEventFormProps } from "@/types/events"
import { DatePicker } from "@/components/ui/date-picker"
import { fetchEventById, updateEvent } from "@/api/event"
import { useEffect } from "react"

export function EditEventForm({onSuccess, eventId}: EditEventFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        eventDate: new Date(),
        eventTime: "10:10",
        location: "",  
      },
    })

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      toast.success('Event updated')
      queryClient.invalidateQueries({
        queryKey: ["events"]
      })
      queryClient.invalidateQueries({
        queryKey: ["events", eventId]
      })
      onSuccess?.()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const { data, isLoading, error } = useQuery<EventResponse>({
      queryKey: ["events", eventId],
      queryFn: () => fetchEventById(eventId)
  })

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        eventDate: new Date(data.eventDate),
        eventTime: data.eventTime,
        location: data.location,
      })
    }
  }, [data, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutation.mutate({
      id: eventId,
      data: values,
    })
  }

  if (isLoading) return <p>Loading...</p>

  if (error instanceof Error) return <p>{error.message}</p>

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="rhf-event-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-event-edit-title-label">
                            Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="rhf-event-edit-title-value"
                          aria-invalid={fieldState.invalid}
                          placeholder="Did you know?"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="rhf-event-edit-description-label">
                              Description
                          </FieldLabel>
                          <Textarea
                            {...field}
                            id="rhf-event-description-value"
                            aria-invalid={fieldState.invalid}
                            placeholder="Yes i know..."
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                          )}
                      </Field>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="eventDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Event Date</FieldLabel>
                          <DatePicker
                            value={field.value}
                            onChange={(date) => {
                              field.onChange(date) 
                            }}
                            error={fieldState.invalid}
                          />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="eventTime"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-event-edit-time-label">
                          Event Time
                        </FieldLabel>
                        <Input
                          {...field}
                          type="time"
                          id="rhf-event-edit-time-value"
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="rhf-evemt-edit-location-label">
                            Location
                          </FieldLabel>
                          <Input
                              {...field}
                              id="rhf-event-edit-location-value"
                              aria-invalid={fieldState.invalid}
                              placeholder="GOA"
                              autoComplete="off"
                          />
                          {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                          )}
                      </Field>
                  )}
                />     
              </FieldGroup>
            </form>
        </CardContent>
        <CardFooter>
            <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Cancel
                </Button>
                 <Button
                  type="submit"
                  form="rhf-event-edit-form"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? <ButtonLoader text="Saving" /> : "Update"}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}
