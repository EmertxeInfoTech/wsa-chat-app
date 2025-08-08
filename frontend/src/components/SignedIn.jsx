import React from 'react'
import MainLayout from './MainLayout';
import AuthenticationHeader from '../Authentication/AuthenticationHeader';

const SignedIn = () => {
  return (
    <div>
        <div className='main-layout'>
            {/* AUTHENTICATION HEADER */}
            <AuthenticationHeader/>
            <main className='context-area'>
               <MainLayout/>
            </main>
        </div>
    </div>
  )
}

export default SignedIn;