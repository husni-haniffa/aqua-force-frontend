import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useCreateResearchType } from "./research-type.hooks"
import { CreateResearchTypeFormProps, formSchema } from "./research-type.types"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

const CreateResearchTypeForm = ({ onSuccess } : CreateResearchTypeFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" },
    })

    const createMutation = useCreateResearchType(onSuccess)

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Create Research Type</CardTitle>
            <CardDescription>Add a new research type to structure research submissions.</CardDescription>
        </CardHeader>
        <CardContent>
            <form id="create-research-type" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-research-type-name-label">
                                    Enter Research Type Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-research-type-name-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Journal"
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
                <Button type="submit" form="create-research-type" disabled={createMutation.isPending} variant={'add'}>
                    {createMutation.isPending ? <ButtonLoader text="Creating"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default CreateResearchTypeForm