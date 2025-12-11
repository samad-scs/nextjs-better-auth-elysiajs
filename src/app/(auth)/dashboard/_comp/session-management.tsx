// ** React State and Effect Imports
import { useEffect, useState } from 'react'

// ** UI Library Imports
import { motion } from 'framer-motion'
import { Globe, Laptop, Smartphone, Trash2 } from 'lucide-react'

// ** Custom Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// ** Application Service, Constants, and Type Imports
import { client } from '@libs/auth-client'

// ** Third-Party Library Imports
import { format } from 'date-fns'
import { toast } from 'sonner'

// Type definition for Session if not exported
interface Session {
  id: string
  createdAt: Date | string
  updatedAt: Date | string
  userAgent?: string
  ipAddress?: string
  token?: string
  isCurrent?: boolean // detailed response might have this
}

export function SessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: currentSessionData } = client.useSession()

  const fetchSessions = async () => {
    try {
      setIsLoading(true)
      const res = await client.listSessions()
      if (res?.data) {
        setSessions(res.data)
      }
    } catch (error) {
      // toast.error('Failed to load active sessions')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleRevoke = async (token: string) => {
    try {
      await client.revokeSession({ token })
      setSessions(prev => prev.filter(s => s.token !== token))
      toast.success('Session revoked')
    } catch (error) {
      toast.error('Failed to revoke session')
    }
  }

  const getDeviceIcon = (ua: string = '') => {
    if (ua.toLowerCase().includes('mobile')) return <Smartphone className='h-5 w-5' />
    return <Laptop className='h-5 w-5' />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className='col-span-full' // Span full width in grid
    >
      <Card className='border-zinc-200 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800'>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices where you're currently logged in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {isLoading ? (
              <div className='py-4 text-center text-zinc-500'>Loading sessions...</div>
            ) : sessions.length === 0 ? (
              <div className='py-4 text-center text-zinc-500'>
                No active sessions found (User agent might be hidden)
              </div>
            ) : (
              sessions.map(session => {
                const isCurrent = currentSessionData?.session?.token === session.token // simplistic match
                // If token is not exposed in listSessions, we might need ID matching if available
                // Usually listSessions returns objects with ID. currentSessionData.session has ID.
                const isCurrentSession = currentSessionData?.session?.id === session.id

                return (
                  <div
                    key={session.id}
                    className='flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='rounded-lg bg-white p-2 text-zinc-600 shadow-sm dark:bg-zinc-800 dark:text-zinc-400'>
                        {getDeviceIcon(session.userAgent)}
                      </div>
                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
                            {session.userAgent
                              ? session.userAgent.length > 30
                                ? session.userAgent.substring(0, 30) + '...'
                                : session.userAgent
                              : 'Unknown Device'}
                          </p>
                          {isCurrentSession && (
                            <span className='rounded-full border border-green-200 bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700'>
                              Current
                            </span>
                          )}
                        </div>
                        <div className='mt-1 flex items-center gap-3 text-xs text-zinc-500'>
                          <span className='flex items-center gap-1'>
                            <Globe className='h-3 w-3' /> {session.ipAddress || 'Unknown IP'}
                          </span>
                          <span>•</span>
                          <span>
                            Last active:{' '}
                            {session.updatedAt ? format(new Date(session.updatedAt), 'MMM d, h:mm a') : 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!isCurrentSession && (
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20'
                        onClick={() => session.token && handleRevoke(session.token)}
                        title='Revoke Session'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
