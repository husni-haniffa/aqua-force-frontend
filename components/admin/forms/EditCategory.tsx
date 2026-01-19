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
import { fetchCategoryById, updateCategory } from "@/api/category"
import ButtonLoader from "@/components/ui/button-loader"
import { CategoryResponse, EditCategoryFormProps, formSchema } from "@/types/category"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"

export function EditCategoryForm({ categoryId, onSuccess }: EditCategoryFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  })

  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const updateMutation = useMutation({
  mutationFn: async (values: {
    id: string
    data: z.infer<typeof formSchema>
  }) => {
    const token = await getToken()
    if (!token) throw new Error("Not authenticated")

    return updateCategory({
      id: values.id,
      data: values.data,
      token,
    })
  },

  onSuccess: () => {
    toast.success("Category updated")
    queryClient.invalidateQueries({ queryKey: ["categories"] })
    queryClient.invalidateQueries({
      queryKey: ["categories", categoryId],
    })
    onSuccess?.()
  },

  onError: (err: any) => {
    toast.error(err.message ?? "Update failed")
  },
})

 const { data, isLoading, error } = useQuery({
  queryKey: ["categories", categoryId],
  enabled: !!categoryId,
  queryFn: async () => {
    const token = await getToken()
    if (!token) throw new Error("Not authenticated")

    return fetchCategoryById(categoryId, token)
  },
})

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
      })
    }
  }, [data, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutation.mutate({
      id: categoryId,
      data: values,
    })
  }

  if (isLoading) return <p>Loading...</p>

  if (error instanceof Error) return <p>{error.message}</p>
 
  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader>
        <CardTitle>Edit Category</CardTitle>
      </CardHeader>
        <CardContent>
          <form id="rhf-category-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="rhf-category-edit-name-label">
                          Category Name
                        </FieldLabel>
                        <Input
                            {...field}
                            id="rhf-category-edit-name-value"
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
                <Button
                  type="submit"
                  form="rhf-category-edit-form"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? <ButtonLoader text="Saving" /> : "Update"}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}