"use client"

import React, { useEffect, useState } from 'react'
import { AuthLayout } from './layout-auth'
import SignInForm from './forms/SignInForm'
import { Button } from '@/components/ui/fragments/button'

import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Loader } from 'lucide-react';
import { useAuth } from '@/hooks/actions/useAuth';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/dialog"
import { useModal } from '@/feature/provider/ContextProvider'


function SignInModal({ className  , children}: { className?: string , children : React.ReactNode}) {

  const { isOpen, close, payload } = useModal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

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


  async function onSubmit(input: LoginSchema) {
    try {
      setLoading(true)
      toast.loading("Signing in...", { id: "login" })
      
      const result = await login({
        ...input,

  
      })

      if (result.success) {
        toast.success(result.message || "Welcome back!", { id: "login" })
      } else {
        toast.error(result.message || "Login failed", { id: "login" })
      }
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Network error. Please check your connection.", { id: "login" })
    } finally {
      close()
      setLoading(false)
    }
  }



 React.useEffect(() => {
    if (!loading && status) {
      form.reset()
    }
  }, [loading, status, form]);


  return (
        <Dialog   onOpenChange={close}  open={isOpen}  >
           <DialogTrigger asChild className=' cursor-pointer'>
            {children
              
            }
       
        </DialogTrigger>
      <DialogContent 

        className="max-h-[100ddvh  w-full p-0  lg:max-h-[44rem] justify-between border-0 max-w-[90dvw]  lg:max-w-5xl "
      >
         <DialogHeader className=' sr-only'>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        <AuthLayout   formType="login" >
      <SignInForm form={form} isPending={loading} onSubmit={onSubmit}>
      <Button
          disabled={ loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Sign In
          {( loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignInForm>
    </AuthLayout>
              
      </DialogContent>
    </Dialog>

  )
}

export default SignInModal
