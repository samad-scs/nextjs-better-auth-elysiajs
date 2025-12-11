'use client'

// ** Next.js and Internationalization Imports
import { useRouter } from 'next/navigation'

// ** UI Library Imports
import { LayoutDashboard, LogOut } from 'lucide-react'

// ** Custom Component Imports
import { Button } from '@/components/ui/button'
import { LinkedAccounts } from './_comp/linked-accounts'
import { SecurityCard } from './_comp/security-card'
import { SessionManagement } from './_comp/session-management'
import { UserProfile } from './_comp/user-profile'

// ** Application Service, Constants, and Type Imports
import { client } from '@libs/auth-client'

const DashboardPage = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await client.signOut()
    router.push('/sign-in') // Adjust route as needed
  }

  return (
    <div className='mt-24! min-h-screen space-y-8 bg-zinc-50/50 p-6 md:p-8 dark:bg-zinc-950/50'>
      {/* Header Section */}
      <div className='mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h1 className='flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
            <LayoutDashboard className='h-6 w-6 text-zinc-500' />
            Dashboard
          </h1>
          <p className='mt-1 text-sm text-zinc-500'>Manage your account settings and preferences.</p>
        </div>
        <Button variant='destructive' onClick={handleLogout} className='w-full gap-2 shadow-sm md:w-auto'>
          <LogOut className='h-4 w-4' />
          Log out
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className='mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-12'>
        {/* Left Column: Profile & Socials */}
        <div className='space-y-6 md:col-span-4'>
          <UserProfile />
          <LinkedAccounts />
        </div>

        {/* Right Column: Security */}
        <div className='md:col-span-8'>
          <SecurityCard />
        </div>

        {/* Bottom Row: Sessions */}
        <SessionManagement />
      </div>
    </div>
  )
}

export default DashboardPage
