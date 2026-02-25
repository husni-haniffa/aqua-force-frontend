import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useResearchTypeById, useUpdateResearchType } from "./research-type.hooks"
import { EditResearchTypeFormProps, formSchema } from "./research-type.types"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useEffect } from "react"
import { CategoryFormSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"

const EditResearchTypeForm = ({ researchTypeId, onSuccess }: EditResearchTypeFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  })

  const { data, isLoading, error} = useResearchTypeById(researchTypeId)
  const updateMutation = useUpdateResearchType(researchTypeId, onSuccess)

  useEffect(() => {
    if (data) form.reset({ name: data.name })
  }, [data, form])

  if (isLoading) return <CategoryFormSkeleton/>
  if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Edit Research Type</CardTitle>
        <CardDescription>Update research type details</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="edit-research-type" onSubmit={form.handleSubmit(v => updateMutation.mutate(v))}>
            <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="edit-cresearch-type-name-label">
                          Enter Research Type Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="edit-research-type-name-value"
                          aria-invalid={fieldState.invalid}
                          placeholder="Computer Science"
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
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={updateMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="edit-research-type" disabled={updateMutation.isPending} variant={'add'}>
                  {updateMutation.isPending ? <ButtonLoader text="Updating" /> : "Update"}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default EditResearchTypeForm