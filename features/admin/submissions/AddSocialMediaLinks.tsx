import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/button-loader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { formSchema } from "./submission.types"
import { useAddSocialMediaLinks } from "./submission.hooks"

interface AddSocialMediaLinksProps {
    submissionId: string
    onSuccess?: () => void
}

const AddSocialMediaLinks = ({ submissionId, onSuccess }: AddSocialMediaLinksProps) => {
    const createMutation = useAddSocialMediaLinks()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            youtube: "",
            facebook: "",
            instagram: "",
            linkedin: ""
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        createMutation.mutate({ submissionId, socialMediaLinks: data }, {
            onSuccess: () => {
                onSuccess?.()
            }
        })
    }

  return (
    <Card className="w-full border-0 shadow-none">
        <CardHeader>
            <CardTitle>Add Social Media Links</CardTitle>
            <CardDescription>Add social media links to allow users to view from other areas</CardDescription>
        </CardHeader>
        <CardContent>
            <form id="add-social-media-links" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="youtube"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="youtube-label">
                                    YouTube URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="youtube-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://youtube.com/..."
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    
                    <Controller
                        name="facebook"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="facebook-label">
                                    Facebook URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="facebook-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://facebook.com/..."
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    
                    <Controller
                        name="instagram"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="instagram-label">
                                    Instagram URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="instagram-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://instagram.com/..."
                                    autoComplete="off"
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
                                <FieldLabel htmlFor="linkedin-label">
                                    LinkedIn URL
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="linkedin-value"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="https://linkedin.com/..."
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
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={createMutation.isPending}>
                    Cancel
                </Button>
                <Button type="submit" form="add-social-media-links" disabled={createMutation.isPending} variant={'add'}>
                    {createMutation.isPending ? <ButtonLoader text="Adding"/> : 'Add Social Media Links'}
                </Button>
            </Field>
        </CardFooter>
    </Card>
  )
}

export default AddSocialMediaLinks