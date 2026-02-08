import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const MembershipForm = () => {
    const formSchema = z.object({
        name: z
            .string()
            .trim()
            .min(5, "Name must be at least 5 characters")
            .max(25, "Name must not exceed 25 characters")
            .regex(/^[A-Za-z ]+$/, "Name must contain only alphabets"),
    });
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: { name: "" },
        })
  return (
    <div>
          <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button className="bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      Become a Member
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Membership form</AlertDialogTitle>
      <AlertDialogDescription>
        <form id="create-category">
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="create-category-name-label">
                                    Enter Your Phone Number
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="create-category-name-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Computer Science"
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
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  
    
  )
}

export default MembershipForm