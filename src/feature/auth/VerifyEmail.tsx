"use client"

import React, { useState } from 'react'
import { AuthLayout } from './components/layout-auth'

import { useAuth } from '@/hooks/actions/useAuth';
import { Button } from '@/components/ui/fragments/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';






function VerifyEmail() {

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })
  const [loading, setLoading] = React.useState(false); 
    const [status, setStatus] = useState<string | null>(null)
     const [errors, setErrors] = useState<string[]>([])

async function onSubmit() {
    try {
      setLoading(true)
      toast.loading("Verifying...", { id: "verify" })
      
      const result = await resendEmailVerification()

      if (result.success) {
        toast.success(result.message || "Welcome back!", { id: "verify" })
        setStatus('verification-link-sent')
      } else {
        toast.error(result.message || "verify failed", { id: "verify" })
      }
    } catch (error) {
      console.error("Verify", error)
      toast.error("Network error. Please check your connection.", { id: "verify" })
    } finally {
      setLoading(false)
    }
  }
async function onSubmitLogOut() {
    try {
      setLoading(true)
      toast.loading("Logout...", { id: "logout" })
      
await logout().then(() => setStatus(null)).finally(() => 
{
  setLoading(false)
 toast.success("Logout successful", { id: "logout" })
}
)


     
    } catch (error) {
      console.error("Log Out error", error)
      toast.error("Network error. Please check your connection.", { id: "logout" })
    } finally {
      setLoading(false)
    }
  }


const desckripcion = `Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another.`


                const verifyMassage = `Magic link has send to your email, pls check your email to verify your account`
  return (
    <AuthLayout   description={status != null ? verifyMassage : desckripcion} title={status != null ? `Pls check email ` : `Verify-Email`}  className=' lg:max-w-none h-dvh ' >
  {status == null && (

     <div className=" w-full space-y-5">
        
      <Button
       
       onClick={() => onSubmit()}
          disabled={loading}
          type="submit"
          className="w-full  transition-colors"
        >
      {status != null ? 'Check your email' : 'Resend Verification Email'}  
 {( loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
        <Button
           disabled={loading}
        variant={"link"}
                    type="button"
                     className='rounded-lg  w-full'
                    onClick={onSubmitLogOut}>
                       {( loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
                    Logout
                </Button>
     </div>
  )}

    </AuthLayout>
  )
}

export default VerifyEmail
