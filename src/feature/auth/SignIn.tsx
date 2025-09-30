"use client"

import React, { useState } from 'react'
import { AuthLayout } from './components/layout-auth'
import SignInForm from './components/forms/SignInForm'
import { Button } from '../../components/ui/fragments/button';

import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';




function SignIn() {

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
})

 const form = useForm<LoginSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember: false
      },
    resolver: zodResolver(loginSchema),
  })
  const [errors, setErrors] = useState<string[]>([])
  const [status, setStatus] = useState<string | null>(null)


  function onSubmit(input: LoginSchema ) {
    try {
                setLoading(true)
        startTransition(async () => { 
          login({
           ...input,
            setErrors,
            setStatus,
        })
        })
 
   } catch (error) {
        console.error("Form submission error", error);
        toast.error("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
  }


  return (
    <AuthLayout   formType="login" >
      <SignInForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
      <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Sign In
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignInForm>
    </AuthLayout>
  )
}

export default SignIn
