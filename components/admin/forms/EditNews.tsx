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
import { fetchNewsById, updateNews } from "@/api/news"
import { EditNewsFormProps, NewsResponse } from "@/types/news"
import { formSchema } from "@/types/news"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"

export function EditNewsForm({newsId, onSuccess}: EditNewsFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: ""
    },
  })
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: async (values: {
        id: string
        data: z.infer<typeof formSchema>
      }) => {
        const token = await getToken()
        if (!token) throw new Error("Not authenticated")
    
        return updateNews({
          id: values.id,
          data: values.data,
          token,
        })
      },
    onSuccess: () => {
      toast.success('Event updated')
      queryClient.invalidateQueries({
        queryKey: ["news"]
      })
      queryClient.invalidateQueries({
        queryKey: ["news", newsId]
      })
      onSuccess?.()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const { data, isLoading, error } = useQuery<NewsResponse>({
      queryKey: ["news", newsId],
      enabled: !!newsId,
        queryFn: async () => {
          const token = await getToken()
          if (!token) throw new Error("Not authenticated")
      
          return fetchNewsById(newsId, token)
        },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
      })
    }
  }, [data, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutation.mutate({
      id: newsId,
      data: values,
    })
  }

  if (isLoading) return <p>Loading...</p>

  if (error instanceof Error) return <p>{error.message}</p>

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Edit News</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="rhf-news-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="rhf-news-edit-title-label">
                                    Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="rhf-news-edit-title-value"
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
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="rhf-news-edit-content-label">
                                    Content
                                </FieldLabel>
                            <Textarea
                                {...field}
                                id="rhf-news-edit-content-value"
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
                  form="rhf-news-edit-form"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? <ButtonLoader text="Saving" /> : "Update"}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}
