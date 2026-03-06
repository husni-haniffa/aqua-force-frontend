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
import { useRouter } from "next/navigation"
import { formSchema, ResearchStudentsFormProps, typeofContributions } from "./types"
import { SelectSkeleton } from "@/features/user/submissions/Skeleton"


const ResearchStudentsForm = ({ onSuccess } : ResearchStudentsFormProps) => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
      mobile: "",
      whatsapp: "",
      email: "",
      linkedin: "",
      orcid: "",
      researchgate: "",
      scholar: "",
      designation: "",
      affiliation: "",
      categoryId: "",
      minorResearchIdea: "",
      researchIdea: "",
      howCanYouContribute: ""
    },
  })
   

    const { data, isLoading, error } = useCategories()

    if (error instanceof Error) return <AlertError message={error.message}/>

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Research Students</CardTitle>
        <CardDescription>Connect with students for research collaboration</CardDescription>
      </CardHeader>
        <CardContent>
          <form id="research-idea-submission">
            <FieldGroup>
              {/* Personal Information */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-idea-title">
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
                      id="research-idea-name"
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
                    <FieldLabel htmlFor="research-idea-designation">
                      Designation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-designation"
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
                    <FieldLabel htmlFor="research-idea-affiliation">
                      Affiliation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-affiliation"
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
                    <FieldLabel htmlFor="research-idea-mobile">
                      Mobile Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-mobile"
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
                    <FieldLabel htmlFor="research-idea-whatsapp">
                      WhatsApp Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-whatsapp"
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
                    <FieldLabel htmlFor="research-idea-email">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-email"
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
                    <FieldLabel htmlFor="research-idea-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-linkedin"
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
                    <FieldLabel htmlFor="research-idea-orcid">
                      ORCID Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-orcid"
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
                    <FieldLabel htmlFor="research-idea-researchgate">
                      ResearchGate Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-researchgate"
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
                    <FieldLabel htmlFor="research-idea-scholar">
                      Google Scholar Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-scholar"
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

                <div  className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Research Details */}
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-idea-category">
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
                    <FieldLabel htmlFor="research-idea-minor">
                      Minor Research Area
                    </FieldLabel>
                    <Input
                      {...field}
                      id="research-idea-minor"
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
                name="researchIdea"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-idea-description">
                      Research Idea
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="research-idea-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="Describe your research idea in detail..."
                      autoComplete="off"
                      className="text-xs xl:text-sm min-h-[120px]"
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
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="research-idea-contribution">
                      How can you contribute?
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contribution type" className="text-xs xl:text-sm" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeofContributions?.map((type) => (
                            <SelectItem key={type.id} value={type.value} className="text-xs xl:text-sm">
                              {type.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    {field.value === "I can contribute in another way" && (
                      <Input
                        {...field}
                        id="research-idea-contribution-other"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please specify how you can contribute..."
                        autoComplete="off"
                        className="text-xs xl:text-sm mt-2"
                      />
                    )}
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
            <Field orientation={'responsive'}>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Cancel
                </Button>
                <Button type="submit" form="research-idea-submission" variant={'add'}>
                    Submit
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default ResearchStudentsForm
