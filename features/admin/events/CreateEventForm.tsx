import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { CreateEventFormProps, formSchema } from "./event.types"
import { useCreateEvent } from "./event.hooks"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"

const CreateEventForm = ({ onSuccess } : CreateEventFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", description: "", eventDate: new Date(), eventTime: "10:10", location: "" },
    })
    
    const createMutation = useCreateEvent(onSuccess)

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="create-event" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-event-title-label">
                                    Enter Event Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-event-title-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Research Methodology Workshop"
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
                                <FieldLabel htmlFor="create-event-description-label">
                                    Enter Event Description
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="create-event-description-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="A hands-on workshop focusing on quantitative and qualitative research methods for undergraduate and postgraduate students."
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
                                <FieldLabel htmlFor="create-event-time-label">
                                    Enter Event Time
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type="time"
                                    id="create-event-time-value"
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
                                <FieldLabel htmlFor="create-event-location-label">
                                    Enter Event Location
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-event-location-value"
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
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="create-event" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Creating"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default CreateEventForm