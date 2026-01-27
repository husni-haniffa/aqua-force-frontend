import { SignIn } from '@clerk/nextjs'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <SignIn 
          fallbackRedirectUrl={"/"}
          signUpUrl='/sign-up'
        />
    </div>
  )
}

export default page