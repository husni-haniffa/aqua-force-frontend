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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNews } from "@/api/news"
import { NewsFormProps } from "@/types/news"
import { formSchema } from "@/types/news"
import { useAuth } from "@clerk/nextjs"

export function NewsForm({onSuccess}: NewsFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: ""
    },
  })

  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const token = await getToken()
        
            if (!token) {
              throw new Error("Not authenticated")
            }
        
            return createNews(data, token)
          },
        onSuccess: () => {
        toast.success('News created')
        queryClient.invalidateQueries({
        queryKey: ["news"]
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
            <CardTitle>Add News</CardTitle>
        </CardHeader>
        <CardContent>
            <form id="rhf-news-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="rhf-news-title-label">
                                    Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="rhf-news-title-value"
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
                                <FieldLabel htmlFor="rhf-news-content-label">
                                    Content
                                </FieldLabel>
                            <Textarea
                                {...field}
                                id="rhf-news-content-value"
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
                <Button type="submit" form="rhf-news-form" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Saving"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}
