import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Textarea } from "@/components/ui/textarea"
import { KeywordsInput } from "@/components/ui/keywords-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditSubmissionFormProps, formSchema } from "./submission.types"
import { useEffect } from "react"
import { useSubmissionById, useSubmissionByUserId, useUpdateSubmission } from "./submission.hooks"
import { useCategories } from "@/features/admin/categories/category.hooks"

const EditSubmissionForm = ({ submissionId, onSuccess } : EditSubmissionFormProps) => {

    const { data, isLoading, error} = useSubmissionById(submissionId)
    const updateMutation = useUpdateSubmission(submissionId, onSuccess)
      
    if (isLoading) return <p>Loading...</p>
    if (error instanceof Error) return <p>{error.message}</p>

    const {data: categories, isLoading: categoriesLoading, error: categoriesError} = useCategories()

    if (categoriesLoading) return <p>Loading categories...</p>
    if (categoriesError instanceof Error) return <p>{categoriesError.message}</p>
    if (!categories || categories.length === 0) return <p>No categories</p>
      

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: "",
      title: "",
      abstract: "",
      keywords: []},
    })

    useEffect(() => {
        if (data) form.reset({ 
          title: data.title,
          abstract: data.abstract,
          keywords: data.keywords,   
        })
    }, [data, form])
  
  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Submission</CardTitle>
      </CardHeader>
        <CardContent>
          <form id="edit-submission" onSubmit={form.handleSubmit(v => updateMutation.mutate(v))}>
            <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="edit-submission-title-label">
                          Title
                        </FieldLabel>
                        <Input
                            {...field}
                            id="edit-submission-title-value"
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
                        <FieldLabel htmlFor="edit-submission-abstract-title">
                          Title
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="edit-submission-abstract-value"
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
                          {categories?.map((category) => (
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
                <Button type="submit" form="edit-submission" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default EditSubmissionForm