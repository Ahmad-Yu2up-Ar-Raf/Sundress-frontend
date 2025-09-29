"use client"

import React from 'react'
import { AuthLayout } from './components/layout-auth'
import SignInForm from './components/forms/SignInForm'
import { Button } from '../../components/ui/fragments/button';

import { loginSchema, LoginSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
function SignIn() {

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<LoginSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       password: "",
       remember: false
      },
    resolver: zodResolver(loginSchema),
  })


  function onSubmit(input: LoginSchema ) {
    try {
                setLoading(true)
        startTransition(async () => { 
          console.log("Form submitted with data:", input);
    //  router.post(route('login'),  input, { 
    //      preserveScroll: true,
    //      preserveState: true,
    //      forceFormData: true, // Penting untuk file upload
    //      onSuccess: () => {
    //        form.reset();
         
    //        toast.success("Login Succes");
    //        setLoading(false);
    //      },
    //      onError: (error) => {
    //        console.error("Submit error:", error);
    //        toast.error(`Error: ${Object.values(error).join(', ')}`);
    //        setLoading(false);
    //           form.reset();
    //      }
    //    });
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }


  return (
    <AuthLayout   formType="sign_in" >
      <SignInForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
   <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create a new account
            </Button>
      </SignInForm>
    </AuthLayout>
  )
}

export default SignIn
