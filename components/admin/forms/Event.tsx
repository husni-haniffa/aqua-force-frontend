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
import { DatePicker } from "@/components/ui/date-picker"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEvent } from "@/api/event"
import ButtonLoader from "@/components/ui/button-loader"
import { EventFormProps, formSchema } from "@/types/events"

export function EventForm({onSuccess}: EventFormProps) {

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

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
    toast.success('Event created')
    queryClient.invalidateQueries({
      queryKey: ["events"]
    })
    onSuccess?.()
    },
    onError: (err) => {
    toast.error(err.message)
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    createMutation.mutate(data)
  }

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="rhf-event-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-event-title-label">
                            Title
                        </FieldLabel>
                        <Input
                          {...field}
                          id="rhf-event-title-value"
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
                          <FieldLabel htmlFor="rhf-news-description-label">
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
                        <FieldLabel htmlFor="rhf-event-time-label">
                          Event Time
                        </FieldLabel>
                        <Input
                          {...field}
                          type="time"
                          id="rhf-event-time-value"
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
                          <FieldLabel htmlFor="rhf-news-location-label">
                            Location
                          </FieldLabel>
                          <Input
                              {...field}
                              id="rhf-event-location-value"
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
                <Button type="submit" form="rhf-event" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Saving"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}
