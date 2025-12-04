import SignIn from './_component/form'

export const metadata = {
  title: 'Sign In'
}

const Page = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <SignIn />
    </div>
  )
}

export default Page
