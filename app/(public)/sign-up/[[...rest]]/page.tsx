import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <SignUp 
          fallbackRedirectUrl={"/"}
          signInUrl='/sign-in'
        />
    </div>
  )
}

export default page