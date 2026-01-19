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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchCategories } from "@/api/category"
import ButtonLoader from "@/components/ui/button-loader"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAuth } from "@clerk/nextjs"
import { formSchema } from "@/types/submission"
import { Textarea } from "@/components/ui/textarea"
import { KeywordsInput } from "@/components/ui/keywords-input"
import { CategoryResponse } from "@/types/category"
import { createSubmission } from "@/api/submission"



const SubmissionForm = () => {

  const { getToken, userId } = useAuth()

  

  const { data, isLoading, error } = useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: async () => {
        const token = await getToken()
        if (!token) throw new Error("Not authenticated")
        return fetchCategories(token)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    categoryId: "",
    title: "",
    abstract: "",
    keywords: []
    },
  })

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Not authenticated")
      }
      return createSubmission(formData, token)
    },
    onSuccess: () => {
      toast.success("Submitted Successfully")
      // queryClient.invalidateQueries({ queryKey: ["submissions"] })
      
      form.reset()
    },
    onError: (err: any) => {
      toast.error(err.message ?? "Something went wrong")
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {

    if (!userId) {
      toast.error("User not authenticated")
      return
    }

    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("categoryId", data.categoryId)
    formData.append("title", data.title)
    formData.append("abstract", data.abstract)
    formData.append("keywords", JSON.stringify(data.keywords))
    formData.append("file", data.file)

    createMutation.mutate(formData)
}

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Submission</CardTitle>
      </CardHeader>
        <CardContent>
          <form id="rhf-submission-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-submission-form-title-label">
                          Title
                        </FieldLabel>
                        <Input
                            {...field}
                            id="rhf-submission-form-title-value"
                            aria-invalid={fieldState.invalid}
                            placeholder="Research title"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                  )}
                />
                <Controller
                  name="abstract"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-submission-form-abstract-label">
                          Title
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="rhf-submission-form-abstract-value"
                            aria-invalid={fieldState.invalid}
                            placeholder="Research Abstract"
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                  )}
                />
                <Controller
                  name="keywords"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Keywords</FieldLabel>
                      <KeywordsInput
                        value={field.value}
                        onChange={field.onChange}
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
                      <FieldLabel>Research Paper (PDF)</FieldLabel>

                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Research Category</FieldLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select research category" />
                      </SelectTrigger>

                      <SelectContent>
                        {data?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                <Button type="submit" form="rhf-submission-form" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting.."/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default SubmissionForm