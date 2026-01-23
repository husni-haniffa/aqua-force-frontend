
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

import ButtonLoader from '@/components/ui/button-loader'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useFetchUsers, useUpdateRoleToAdmin, useRemoveRoleFromAdmin} from './user.hooks'
import { UserTableSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'
const UserTable = ({ search }: { search: string }) => {

        
    
    const { data, isLoading, error } = useFetchUsers()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [removingId, setRemovingId] = useState<string | null>(null)
    const updateMutation = useUpdateRoleToAdmin(setEditingId)
    const removeMutation = useRemoveRoleFromAdmin(setRemovingId)
    
    if (isLoading) return <UserTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p>No users, create one</p>

     const filtered = data?.filter((users) =>
        users.emailAddress.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <div>No categories found</div>
        
  return (
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filtered?.map((user) => (
                <TableRow key={user.userId}>
                    <TableCell>{user.firstName}</TableCell>
                   <TableCell>{user.lastName}</TableCell>
                   <TableCell>{user.emailAddress}</TableCell>
                   <TableCell>{user.phoneNumber}</TableCell>
                   <TableCell>{user.role}</TableCell>
                   <TableCell className='flex items-center gap-3'>
                        <ConfirmDialog
                            onConfirm={() => updateMutation.mutate(user.userId)}
                            text='This action will provide full access to all administrator privileges.'
                            disabled={editingId === user.userId}
                            triggerText={
                                editingId === user.userId ? <ButtonLoader text='Updating'/> : "Make Admin"
                            }
                            triggerVariant='destructive'
                        />
                          <ConfirmDialog
                            onConfirm={() => removeMutation.mutate(user.userId)}
                            text='This action will remove full access to all administrator privileges.'
                            disabled={removingId === user.userId}
                            triggerText={
                                editingId === user.userId ? <ButtonLoader text='Updating'/> : "Remove Admin"
                            }
                            triggerVariant='destructive'
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default UserTable