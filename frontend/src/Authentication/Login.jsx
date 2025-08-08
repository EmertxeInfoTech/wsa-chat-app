import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import {dark} from '@clerk/themes';

const Login = () => {
  return (
    <div className='flex flex-grow items-center justify-center h-screen'>
        <SignIn 
            signUpUrl='/register' 
            forceRedirectUrl={"/main"} 
            appearance={{baseTheme: dark}}/>
        {/* signUpUrl --> sign up url is "/register"   
        forcedRedirectUrl -->if the user is not logged in then it goes to the respective url, here, "/main" */}
    </div>
  )
}

export default Login;