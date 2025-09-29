"use client"

import React, { useEffect } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/LastStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema, RegisterSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Loader, MoveLeft } from 'lucide-react'




const FormLastStep = registerCreateSchema.pick({
 role: true,
 })
type FormLastStepSchema = z.infer<typeof FormLastStep>;
function LastStep() {

 const router = useRouter();


  const useName = useOnboardingStore((state) => state.name);
  const userEmail = useOnboardingStore((state) => state.email);
  const password = useOnboardingStore((state) => state.password);
  const repeatPassword = useOnboardingStore((state) => state.password_confirmation);


 
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<FormLastStepSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       role: "user"
      },
    resolver: zodResolver(FormLastStep),
  })


 
  function onSubmit(data: RegisterSchema) {
    try {
          console.log({
      ...data,
      useName,
      userEmail,
      password,
      repeatPassword,
    });
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

   useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!useName || !userEmail || !password || !repeatPassword) {
      router.push("/sign_up");
    }
  }, [
    useOnboardingStore.persist.hasHydrated,
    useName,
    userEmail,
    password,
    repeatPassword,
    router,
  ]);

  return (
    <AuthLayout title='Sellect Role'  description='Select your role to get started'>
           <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
   <Button
   
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
             Create Account
             {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
            </Button>
             {/* <Link 
                      className='w-fit flex items-center gap-3 group hover:underline text-sm m-auto'
                     href={'/sign_up/password'}
                       
                   
                      type="button"
                    >
                      <ChevronLeft className=' group-hover:-translate-x-1 transition-all duration-300 ease-out size-5'/> Back
                    </Link> */}
      </SignUpForm>
    </AuthLayout>
  )
}

export default LastStep
