"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { formSchema } from "./waitlist.types"
import { useRouter } from "next/navigation"
import { useCreateWaitlist } from "./waitlist,hooks"
import ButtonLoader from "@/components/ui/button-loader"


const MembershipForm = () => {
   
  const { user, isLoaded } = useUser()
  if (!isLoaded) return null
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  })

  useEffect(() => {
    if (isLoaded && user) {
      form.setValue("userId", user.id)
      form.setValue("firstName", user.firstName || "")
      form.setValue("lastName", user.lastName || "")
      form.setValue("email",user.primaryEmailAddress?.emailAddress || ""
      )
    }
  }, [isLoaded, user, form])

 

  const createMutation = useCreateWaitlist()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm xl:text-base">
          Membership Form
        </CardTitle>
        <CardDescription className="text-xs xl:text-sm">
          Apply for membership access to the research platform.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="create-membership" className="flex flex-col gap-6" onSubmit={form.handleSubmit((v) => createMutation.mutate(v))}>
          <FieldGroup className="flex flex-row gap-4">
            <Field>
              <FieldLabel className="text-xs xl:text-sm">
                First Name
              </FieldLabel>
              <Controller
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} readOnly className="text-xs xl:text-sm" />
                )}
              />
            </Field>
            <Field>
              <FieldLabel className="text-xs xl:text-sm">
                Last Name
              </FieldLabel>
              <Controller
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} readOnly className="text-xs xl:text-sm" />
                )}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel className="text-xs xl:text-sm">
                Email
              </FieldLabel>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} readOnly className="text-xs xl:text-sm" />
                )}
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs xl:text-sm">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="0771234567"
                    autoComplete="off"
                    className="text-xs xl:text-sm"
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
          <Button type="button" variant={'outline'} onClick={() => form.reset()} disabled={createMutation.isPending} >
            Cancel
          </Button>
          <Button type="submit" form="create-membership" variant={'add'}>
                    {createMutation.isPending ? <ButtonLoader text="Submitting"/> : 'Submit Application'}          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default MembershipForm
