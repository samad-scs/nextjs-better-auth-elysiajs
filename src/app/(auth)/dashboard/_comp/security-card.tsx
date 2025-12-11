// ** React State and Effect Imports
import React, { useState } from 'react'

// ** UI Library Imports
import { Shield, Key, Lock, History } from 'lucide-react'
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
import { format } from 'date-fns'

export function SecurityCard() {
  const { data: session } = client.useSession()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await client.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true // Optional security feature
      })
      toast.success('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }

  // Safe date formatting
  const lastLoginDate = session?.session?.createdAt ? format(new Date(session.session.createdAt), 'PPpp') : 'Unknown'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className='h-full border-zinc-200 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Shield className='h-5 w-5 text-zinc-500' />
            <CardTitle>Security & Login</CardTitle>
          </div>
          <CardDescription>Manage your password and account security</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-start gap-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900/50'>
            <History className='mt-0.5 h-5 w-5 text-zinc-500' />
            <div>
              <p className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>Last Login</p>
              <p className='mt-1 text-xs text-zinc-500'>{lastLoginDate}</p>
              <p className='mt-1 text-xs text-zinc-400'>Logged in on this device</p>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300'>
              <Key className='h-4 w-4' /> Change Password
            </h4>

            <div className='space-y-2'>
              <Label htmlFor='current_password'>Current Password</Label>
              <div className='relative'>
                <Lock className='absolute top-2.5 left-2.5 h-4 w-4 text-zinc-400' />
                <Input
                  id='current_password'
                  type='password'
                  className='pl-9'
                  placeholder='••••••••'
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='new_password'>New Password</Label>
              <div className='relative'>
                <Lock className='absolute top-2.5 left-2.5 h-4 w-4 text-zinc-400' />
                <Input
                  id='new_password'
                  type='password'
                  className='pl-9'
                  placeholder='••••••••'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirm_password'>Confirm New Password</Label>
              <div className='relative'>
                <Lock className='absolute top-2.5 left-2.5 h-4 w-4 text-zinc-400' />
                <Input
                  id='confirm_password'
                  type='password'
                  className='pl-9'
                  placeholder='••••••••'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              className='w-full'
              onClick={handleChangePassword}
              disabled={isLoading || !currentPassword || !newPassword}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
