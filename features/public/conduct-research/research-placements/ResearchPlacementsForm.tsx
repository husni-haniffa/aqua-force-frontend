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
import { Textarea } from "@/components/ui/textarea"
import { useCategories } from "@/features/admin/categories/category.hooks"
import { AlertError } from "@/components/ui/alert-error"
import { useCreateResearchPlacements } from "./placements.hooks"
import { formSchema, ResearchPlacementsFormProps, typeofContributions } from "./types"
import { SelectSkeleton } from "@/features/user/submissions/Skeleton"


const ResearchPlacementsForm = ({ onSuccess } : ResearchPlacementsFormProps) => {

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
      categoryId: "",
      minorResearchIdea: "",
      howCanYouContribute: ""
    },
  })

  const createMutation = useCreateResearchPlacements(() => {
    form.reset()
    onSuccess?.()
  })
   

    const { data, isLoading, error } = useCategories()

    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Placements</CardTitle>
        <CardDescription>Find research placement opportunities</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="research-placements-submission" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
            <FieldGroup>
              {/* Personal Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-placements-title">
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
                    <FieldLabel htmlFor="research-idea-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-name"
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
                    <FieldLabel htmlFor="research-placements-designation">
                      Designation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-designation"
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
              
              
             
                 <Controller
                name="affiliation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-placements-affiliation">
                      Affiliation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-affiliation"
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
         
              

             

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Contact Details */}
              <Controller
                name="mobile"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-placements-mobile">
                      Mobile Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-mobile"
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
                    <FieldLabel htmlFor="research-placements-whatsapp">
                      WhatsApp Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-whatsapp"
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
                    <FieldLabel htmlFor="research-placements-email">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-email"
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
                    <FieldLabel htmlFor="research-placements-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-linkedin"
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
                    <FieldLabel htmlFor="research-placements-orcid">
                      ORCID Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-orcid"
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
                    <FieldLabel htmlFor="research-placements-researchgate">
                      ResearchGate Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-researchgate"
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
                    <FieldLabel htmlFor="research-placements-scholar">
                      Google Scholar Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-scholar"
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
                    <FieldLabel htmlFor="research-placements-category">
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
                    <FieldLabel htmlFor="research-placements-minor">
                      Minor Research Idea
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-placements-minor"
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
  name="howCanYouContribute"
  control={form.control}
  render={({ field, fieldState }) => {
    const isOther = field.value === "I can contribute in another way";
    return (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor="research-helps-contribution">
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
            id="research-placements-contribution-other"
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
                <Button type="submit" form="research-placements-submission" variant={'add'} disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default ResearchPlacementsForm
