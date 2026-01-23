import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { CreateNewsFormProps, formSchema } from './news.types'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useCreateNews } from './news.hooks'
import { Textarea } from "@/components/ui/textarea"

const CreateNewsForm = ({ onSuccess } : CreateNewsFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", content: "" },
    })
    
    const createMutation = useCreateNews(onSuccess)

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add News</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="create-news" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-news-title-label">
                                    Enter News Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-news-title-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="University Launches New Artificial Intelligence Research Center"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-news-content-label">
                                    Enter News Content
                                </FieldLabel>
                            <Textarea
                                {...field}
                                id="create-news-content-value"
                                aria-invalid={fieldState.invalid}
                                placeholder="The university has launched a new AI research center focusing on innovation, collaboration, and real-world applications across multiple departments."
                                autoComplete="off"
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
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                                News Post
                            </FieldLabel>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={(e) => field.onChange(e.target.files?.[0])}
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
                <Button type="submit" form="create-news" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Creating"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default CreateNewsForm