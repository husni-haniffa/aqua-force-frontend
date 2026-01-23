import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
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
import { SubmissionFormSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"

const EditSubmissionForm = ({ submissionId, onSuccess } : EditSubmissionFormProps) => {

    const { data, isLoading, error} = useSubmissionById(submissionId)
    const updateMutation = useUpdateSubmission(submissionId, onSuccess)
    const {data: categories, isLoading: categoriesLoading, error: categoriesError} = useCategories()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: "",
      title: "",
      abstract: "",
      keywords: [],
      
    },
    })

    useEffect(() => {
        if (data) form.reset({ 
          title: data.title,
          abstract: data.abstract,
          keywords: data.keywords,
          categoryId: data.categoryId._id 
        })
    }, [data, form])
      
    if (isLoading) return <SubmissionFormSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>

    if (categoriesLoading) return <p>Loading categories...</p>
    if (categoriesError instanceof Error) return <AlertError message={categoriesError.message}/>
    if (!categories || categories.length === 0) return <p>No categories</p>
      
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
                          Enter Research Title
                        </FieldLabel>
                        <Input
                            {...field}
                            id="edit-submission-title-value"
                            aria-invalid={fieldState.invalid}
                            placeholder="A Study on Cyber Security Threat Detection"
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
                          Enter Research Abstract
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="edit-submission-abstract-value"
                            aria-invalid={fieldState.invalid}                        
                            placeholder="This study explores modern cyber security threat detection techniques including anomaly detection and 
                            machine learning approaches. The research evaluates effectiveness, scalability, and accuracy across simulated environments.
                            Keywords: cyber security, threat detection"
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
                      <FieldLabel>Enter Keywords</FieldLabel>
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
                      <FieldLabel>Upload Research Paper</FieldLabel>
                        <Input
                          type="file"
                          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                    <FieldLabel>Select Research Category</FieldLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category"/>
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
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={updateMutation.isPending}>
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