import SignUp from './_component/form'

export const metadata = {
  title: 'Sign Up'
}

const Page = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <SignUp />
    </div>
  )
}

export default Page
