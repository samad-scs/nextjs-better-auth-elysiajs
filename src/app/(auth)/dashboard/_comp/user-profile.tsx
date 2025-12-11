// ** React State and Effect Imports
import React, { useState } from 'react'

// ** UI Library Imports
import { Camera, User as UserIcon } from 'lucide-react'
import { motion } from 'framer-motion'

// ** Custom Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// ** Application Service, Constants, and Type Imports
import { client } from '@libs/auth-client'

// ** Third-Party Library Imports
import { toast } from 'sonner'

export function UserProfile() {
  const { data: session } = client.useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(session?.user?.name || '')

  // Sync state with session if it loads later
  React.useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [session?.user?.name])

  const handleUpdateProfile = async () => {
    try {
      await client.updateUser({
        name: name
        // image updates typically require file upload logic, keeping it simple for now or just name
      })
      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className='h-full border-zinc-200 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800'>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your public profile details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex flex-col items-center gap-4'>
            <div className='group relative cursor-pointer'>
              <div className='flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800'>
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <UserIcon className='h-12 w-12 text-zinc-400' />
                )}
              </div>
              <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
                <Camera className='h-6 w-6 text-white' />
              </div>
            </div>
            <div className='text-center'>
              <h3 className='text-lg font-medium'>{session?.user?.name || 'Guest User'}</h3>
              <p className='text-sm text-zinc-500'>{session?.user?.email}</p>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={!isEditing}
                className='bg-zinc-50 dark:bg-zinc-900/50'
              />
            </div>

            <div className='flex justify-end gap-2'>
              {isEditing ? (
                <>
                  <Button variant='outline' onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                </>
              ) : (
                <Button variant='outline' onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
