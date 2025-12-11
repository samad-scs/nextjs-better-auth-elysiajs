'use client'

import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import { client } from '@libs/auth-client'
import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const Header = () => {
  const { data: session, isPending, isRefetching } = client.useSession()

  const isLoading = isRefetching || isPending

  return (
    <div className='fixed top-4 left-1/2 z-50 w-full max-w-4xl translate-x-[-50%] rounded-full border border-white/20 bg-black/30 px-8 py-4 backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <p className='text-xl font-bold text-white'>Better Auth</p>
        </Link>
        <Suspense fallback={<Skeleton className='h-9 w-[110px] rounded-full' />}>
          <div>
            {isLoading || !session?.user ? (
              <Link href='/sign-in'>
                <Button variant='default' className='w-[110px] rounded-full px-6'>
                  <LogIn className='mr-2 h-4 w-4' />
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button
                variant='default'
                onClick={() => client.signOut()}
                className='w-[110px] rounded-full px-6'
                disabled={isLoading}
              >
                <LogOut className='mr-2 h-4 w-4' />
                Log out
              </Button>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Header
