import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { EditNewsFormProps, formSchema } from './news.types'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useNewsById, useUpdateNews } from './news.hooks'
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import Image from "next/image"
import { NewsFormSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"

const EditNewsForm = ({ newsId, onSuccess } : EditNewsFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", content: ""},
    })
    
    const { data, isLoading, error} = useNewsById(newsId)
    const updateMutation = useUpdateNews(newsId, onSuccess)
    
    useEffect(() => {
        if (data) form.reset({ title: data.title, content: data.content, file: undefined })
    }, [data, form])
    
    if (isLoading) return <NewsFormSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Edit News</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="edit-news" onSubmit={form.handleSubmit((v) => updateMutation.mutate(v))}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="edit-news-title-label">
                                    Enter News Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="edit-news-title-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Call for Papers: International Conference on AI 2026"
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
                                <FieldLabel htmlFor="edit-news-content-label">
                                    Enter News Content
                                </FieldLabel>
                            <Textarea
                                {...field}
                                id="edit-news-content-value"
                                aria-invalid={fieldState.invalid}
                                placeholder="Researchers are invited to submit original papers for the upcoming International Conference on Artificial Intelligence 2026. Selected papers will be published in indexed proceedings."
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
                        render={({ field }) => (
                        <Field>
                            <FieldLabel>
                                News Post
                            </FieldLabel>
                            {data?.imageUrl && (
                                <Image
                                    src={`${data.imageUrl}?t=${Date.now()}`}
                                    alt="current news post"
                                    width={500}
                                    height={500}
                                />
                            )}
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
                <Button type="submit" form="edit-news" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? <ButtonLoader text="Updating"/> : 'Update'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default EditNewsForm