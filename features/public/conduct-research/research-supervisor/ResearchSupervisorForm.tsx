"use client"
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategories } from "@/features/admin/categories/category.hooks"
import { AlertError } from "@/components/ui/alert-error"
import { useCreateResearchSupervisor } from "./supervisor.hooks"
import { formSchema, ResearchSupervisorFormProps, typeofContributions } from "./types"
import { SelectSkeleton } from "@/features/user/submissions/Skeleton"


const ResearchSupervisorForm = ({ onSuccess } : ResearchSupervisorFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      mobile: "",
      whatsapp: "",
      email: "",
      linkedin: "https://linkedin.com/in/username",
      orcid: "https://orcid.org/yourid",
      researchgate: "https://researchgate.net/profile/yourprofile",
      scholar: "https://scholar.google.com/citations?user=yourid",
      designation: "",
      affiliation: "",
      degree: "",
      categoryId: "",
      minorResearchIdea: "",
      noOfStudents: "",
      howCanYouContribute: ""
    },
  })

  const createMutation = useCreateResearchSupervisor(() => {
    form.reset()
    onSuccess?.()
  })
   

    const { data, isLoading, error } = useCategories()

    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Supervisor</CardTitle>
        <CardDescription>Find research supervisors for your projects</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="research-supervisor-submission" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
            <FieldGroup>
              {/* Personal Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-title">
                      Title
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Title" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='Mr' value='Mr' className="text-xs xl:text-sm">
                              Mr
                            </SelectItem>
                             <SelectItem key='Miss' value='Miss' className="text-xs xl:text-sm">
                              Miss
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="designation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-designation">
                      Designation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-designation"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your designation"
                      autoComplete="organization-title"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                name="affiliation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-affiliation">
                      Affiliation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-affiliation"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your institution/organization"
                      autoComplete="organization"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
                
              />

                <Controller
                name="degree"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-degree">
                      Degree
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Degree" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key='Bachelor' value='Bachelor' className="text-xs xl:text-sm">
                              Bachelor
                            </SelectItem>
                             <SelectItem key='Master' value='Master' className="text-xs xl:text-sm">
                              Master
                            </SelectItem>
                             <SelectItem key='MPhil' value='MPhil' className="text-xs xl:text-sm">
                              MPhil
                            </SelectItem>
                             <SelectItem key='PhD' value='PhD' className="text-xs xl:text-sm">
                              PhD
                            </SelectItem>
                               <SelectItem key='PostDoc' value='PostDoc' className="text-xs xl:text-sm">
                              PostDoc
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                </div>
              

              

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Contact Details */}
              <Controller
                name="mobile"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-mobile">
                      Mobile Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-mobile"
                      aria-invalid={fieldState.invalid}
                      placeholder="07XXXXXXXX"
                      autoComplete="tel"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="whatsapp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-whatsapp">
                      WhatsApp Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-whatsapp"
                      aria-invalid={fieldState.invalid}
                      placeholder="07XXXXXXXX"
                      autoComplete="tel"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-email">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="linkedin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-linkedin"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://linkedin.com/in/yourprofile"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="orcid"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-orcid">
                      ORCID Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-orcid"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://orcid.org/yourid"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="researchgate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-researchgate">
                      ResearchGate Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-researchgate"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://researchgate.net/profile/yourprofile"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="scholar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-scholar">
                      Google Scholar Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-scholar"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://scholar.google.com/citations?user=yourid"
                      autoComplete="url"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                </div>

                <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Research Details */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-category">
                      Major Research Area
                    </FieldLabel>
                    {isLoading ? (
                      <SelectSkeleton />
                    ) : (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.map((category) => (
                            <SelectItem key={category._id} value={category._id} className="text-xs xl:text-sm">
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="minorResearchIdea"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-minor">
                      Minor Research Area
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-supervisor-minor"
                      aria-invalid={fieldState.invalid}
                      placeholder="Specify your minor research area"
                      autoComplete="off"
                      className="text-xs xl:text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
                </div>

            

              <Controller
                name="noOfStudents"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-supervisor-noOfStudents">
                      No of Students
                    </FieldLabel>
                    <Input
                      type="number"
                      {...field}
                      id="research-supervisor-noOfStudents"
                      aria-invalid={fieldState.invalid}
                      placeholder="50"
                      autoComplete="off"
                      className="text-xs xl:text-sm "
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
  name="howCanYouContribute"
  control={form.control}
  render={({ field, fieldState }) => {
    const isOther = field.value === "I can contribute in another way";
    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor="research-supervisor-howCanYouContribute">
          How can you contribute?
        </FieldLabel>
        <Select
          onValueChange={field.onChange}
          value={isOther ? "I can contribute in another way" : field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select contribution type" />
          </SelectTrigger>
          <SelectContent>
            {typeofContributions?.map((type) => (
              <SelectItem key={type.id} value={type.value}>
                {type.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isOther && (
          <Input
            id="research-supervisor-contribution-other"
            placeholder="Please specify how you can contribute..."
            onChange={(e) => field.onChange(e.target.value)} // ← Use onChange directly
            onBlur={field.onBlur}
            ref={field.ref}
            value={isOther ? "" : field.value} // ← Don't bind the "other" string here
            className="text-xs xl:text-sm mt-2"
          />
        )}

        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    );
  }}
/>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
            <Field orientation={'responsive'}>
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="research-supervisor-submission" variant={'add'} disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default ResearchSupervisorForm