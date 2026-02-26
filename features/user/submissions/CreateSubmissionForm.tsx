import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KeywordsInput } from "@/components/ui/keywords-input"
import { Textarea } from "@/components/ui/textarea"
import { CreateSubmissionFormProps, formSchema } from "./submission.types"
import { useCreateSubmission } from "./submission.hooks"
import { useCategories } from "@/features/admin/categories/category.hooks"
import { SelectSkeleton } from "./Skeleton"
import { AlertError } from "@/components/ui/alert-error"
import { useRouter } from "next/navigation"
import { useResearchTypes } from "@/features/admin/research-types/research-type.hooks"

const CreateSubmissionForm = ({ onSuccess } : CreateSubmissionFormProps) => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: "",
      title: "",
      abstract: "",
      keywords: [] },
    })
      
    const createMutation = useCreateSubmission(() => {
      form.reset()
      router.push("/user/submissions")
      onSuccess?.()
    })

    const { data: researchTypes, isLoading: researchTypesLoading, error: researchTypesError } = useResearchTypes()

    const { data, isLoading, error } = useCategories()

    if (researchTypesError instanceof Error) return <AlertError message={researchTypesError.message}/>
    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Submit Research Paper</CardTitle>
        <CardDescription>Provide research details and upload your manuscript for review</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="create-submission" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
            <FieldGroup>
              <Controller
                name="researchTypeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Select Research Type</FieldLabel>
                     {researchTypesLoading ? <SelectSkeleton/> : 
                        <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Research Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {researchTypes?.map((researchType) => (
                            <SelectItem key={researchType._id} value={researchType._id}>
                              {researchType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                     }                  
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="create-submission-title-label">
                          Enter Research Title
                        </FieldLabel>
                        <Input
                            {...field}
                            id="create-submission-title-value"
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
                        <FieldLabel htmlFor="create-submission-abstract-title">
                          Enter Research Submission
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id="create-submission-abstract-value"
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
                          key={field.value ? "file-set" : "file-empty"}
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
                     {isLoading ? <SelectSkeleton/> : 
                        <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                     }                  
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                <Button type="submit" form="create-submission" disabled={createMutation.isPending} variant={'add'}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default CreateSubmissionForm