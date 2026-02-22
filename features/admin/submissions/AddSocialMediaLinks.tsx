import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { formSchema } from "./submission.types"

const AddSocialMediaLinks = () => {

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: { name: "" },
        })
  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add Social Media Links</CardTitle>
            <CardDescription>Add social media links to allow users to view from other areas</CardDescription>
        </CardHeader>
        <CardContent>
            <form id="add-social-media-links" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-category-name-label">
                                    Enter Category Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-category-name-value"
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
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="create-category" disabled={createMutation.isPending} variant={'add'}>
                    {createMutation.isPending ? <ButtonLoader text="Creating"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default AddSocialMediaLinks