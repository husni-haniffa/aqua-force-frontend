
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import ButtonLoader from '@/components/ui/button-loader'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useFetchUsers, useUpdateRoleToAdmin, useRemoveRoleFromAdmin} from './user.hooks'
import { UserTableSkeleton } from './Skeleton'
import { AlertError } from '@/components/ui/alert-error'

const UserTable = ({ search }: { search: string }) => {

    const { data, isLoading, error } = useFetchUsers()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [isSearchingUsers, setIsSearchingUsers] = useState(false)
    const updateMutation = useUpdateRoleToAdmin(setEditingId)
    const removeMutation = useRemoveRoleFromAdmin(setRemovingId)

    useEffect(() => {
        if (!search) return
        setIsSearchingUsers(true)
        const timer = setTimeout(() => {
        setIsSearchingUsers(false)
        }, 300) 
        return () => clearTimeout(timer)
        }, [search])
    
    if (isLoading || isSearchingUsers) return <UserTableSkeleton/>
    if (error instanceof Error) return <AlertError message={error.message}/>
    if (!data || data.length === 0) return <p className='flex items-center justify-center font-semibold text-lg'>No users, create one</p>

    const filtered = data?.filter((users) =>
        users.emailAddress.toLowerCase().includes(search.toLowerCase())
    )

    if (!filtered?.length) return <p className='flex items-center justify-center text-base'>No user found</p>
        
  return (
    <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Grant Admin</TableHead>
                    <TableHead>Revoke Admin</TableHead>
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
                    <TableCell>
                            <ConfirmDialog
                                onConfirm={() => updateMutation.mutate(user.userId)}
                                text='This action will provide full access to all administrator privileges.'
                                disabled={editingId === user.userId || user.role=== 'admin' || removingId === user.userId}
                                triggerText={
                                    editingId === user.userId ? <ButtonLoader text='Updating'/> : "Grant"
                                }
                                triggerVariant='destructive'
                            />        
                        </TableCell>
                        <TableCell>
                            <ConfirmDialog
                                onConfirm={() => removeMutation.mutate(user.userId)}
                                text='This action will remove full access to all administrator privileges.'
                                disabled={removingId === user.userId || editingId === user.userId}
                                triggerText={
                                    editingId === user.userId ? <ButtonLoader text='Updating'/> : "Revoke"
                                }
                                triggerVariant='add'
                            />
                        </TableCell>        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    
  )
}

export default UserTable