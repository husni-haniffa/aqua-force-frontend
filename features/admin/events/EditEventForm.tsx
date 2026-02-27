"use client"
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditEventFormProps, editFormSchema, EditFormSchema } from "./event.types"
import { useEventById, useUpdateEvent } from "./event.hooks"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"

import { useEffect } from "react"
import { EventFormSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"
import Image from "next/image"

const EditEventForm = ({ eventId, onSuccess } : EditEventFormProps) => {

    const form = useForm<EditFormSchema>({
        resolver: zodResolver(editFormSchema),
        defaultValues: { title: "", description: "", eventDate: new Date(), eventTime: "10:30", location: "", file: undefined},
    })
    
    const { data, isLoading, error} = useEventById(eventId)
    const updateMutation = useUpdateEvent(eventId, onSuccess)

    useEffect(() => {
        if (data) {
            form.reset({ title: data.title, description: data.description,
                eventDate: new Date(data.eventDate),eventTime: data.eventTime,
                location: data.location, file: undefined
            })
        }
      }, [data, form])

    if (isLoading) return <EventFormSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Edit Event</CardTitle>
            <CardDescription>Update event information or scheduling details</CardDescription>
        </CardHeader>
        <CardContent>
            <form id="edit-event" onSubmit={form.handleSubmit((v) => updateMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="edit-event-title-label">
                                    Enter Event Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="edit-event-title-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Data Science Workshop"
                                    autoComplete="off"
                                    className="text-xs xl:text-sm"
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
                                <FieldLabel htmlFor="edit-event-description-label">
                                    Enter Event Description
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="edit-event-description-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="This workshop covers applied data science concepts and tools."
                                    autoComplete="off"
                                    className="text-xs xl:text-sm"
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
                                    <FieldLabel>
                                        Enter Event Date
                                    </FieldLabel>
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
                                <FieldLabel htmlFor="edit-event-time-label">
                                    Enter Event Time
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="time"
                                    id="edit-event-time-value"
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-xs xl:text-sm"
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
                                <FieldLabel htmlFor="create-event-location-label">
                                    Enter Event Location
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="edit-event-location-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="University of Moratuwa"
                                    autoComplete="off"
                                    className="text-xs xl:text-sm"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="file"
                        control={form.control}
                        render={({ field }) => (
                        <Field>
                            <FieldLabel>
                                Replace Flyer Post
                            </FieldLabel>
                            <div>
                                {data?.imageUrl && (
                                    <Image
                                        src={`${data.imageUrl}?v=${data.updatedAt}`}
                                        alt="current event post"
                                        width={500}
                                        height={500}
                                    />
                                )}
                            </div>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
                            />
                            </Field>
                        )}
                    />  
                </FieldGroup>
            </form>
        </CardContent>
        <CardFooter>
            <Field orientation="horizontal">
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={updateMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="edit-event" disabled={updateMutation.isPending} variant={'add'}>
                    {updateMutation.isPending ? <ButtonLoader text="Updating"/> : 'Update'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default EditEventForm