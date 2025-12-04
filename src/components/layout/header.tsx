import { Button } from '@components/ui/button'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='fixed top-4 left-1/2 z-50 w-full max-w-4xl translate-x-[-50%] rounded-full border border-white/20 bg-black/30 px-8 py-4 backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <p className='text-xl font-bold text-white'>Better Auth</p>
        </Link>
        <div>
          <Link href='/sign-in'>
            <Button variant='default' className='rounded-full px-6'>
              <LogIn className='mr-2 h-4 w-4' />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
