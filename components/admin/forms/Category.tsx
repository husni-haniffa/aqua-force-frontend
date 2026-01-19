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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory } from "@/api/category"
import ButtonLoader from "@/components/ui/button-loader"
import { CategoryFormProps, formSchema } from "@/types/category"
import { useAuth } from "@clerk/nextjs"

export function CategoryForm({ onSuccess }: CategoryFormProps) {
 
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
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

    return createCategory(data, token)
  },

  onSuccess: () => {
    toast.success("Category created")
    queryClient.invalidateQueries({ queryKey: ["categories"] })
    onSuccess?.()
  },

  onError: (err: any) => {
    toast.error(err.message ?? "Something went wrong")
  },
})
  function onSubmit(data: z.infer<typeof formSchema>) {
    createMutation.mutate(data)
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
        <CardContent>
          <form id="rhf-category-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-category-name-label">
                          Category Name
                        </FieldLabel>
                        <Input
                            {...field}
                            id="rhf-category-name-value"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter a category name"
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
                <Button type="submit" form="rhf-category-form" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <ButtonLoader text="Creating"/> : 'Create'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}