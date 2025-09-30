"use client"

import React, { useState } from 'react'
import { AuthLayout } from './components/layout-auth'

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/fragments/button';
import { Loader } from 'lucide-react';






function VerifyEmail() {

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState<string | null>(null)



const desckripcion = `Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another.`


                const verifyMassage = `Magic link has send to your email, pls check your email to verify your account`
  return (
    <AuthLayout    description={status != null ? verifyMassage : desckripcion} title={status != null ? `Pls check email ` : `Verify-Email`} >
  {status == null && (

     <div className=" w-full space-y-5">
        
      <Button
       onClick={() => resendEmailVerification({ setStatus })}
          disabled={status != null}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
      {status != null ? 'Check your email' : 'Resend Verification Email'}  
          {/* {(status != null) && (
            <Loader className='animate-spin ml-2'/>
          )} */}
        </Button>
        <Button
           disabled={status != null}
        variant={"secondary"}
                    type="button"
                     className='rounded-lg  w-full'
                    onClick={logout}>
                    Logout
                </Button>
     </div>
  )}

    </AuthLayout>
  )
}

export default VerifyEmail
