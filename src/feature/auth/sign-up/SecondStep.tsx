"use client"

import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/SecondStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import Link from 'next/link'

const FormSecondStep = registerCreateSchema.pick({
  password: true,
  password_confirmation: true,
})
type FormSecondStepSchema = z.infer<typeof FormSecondStep>;

function SecondStep() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const password = useOnboardingStore((state) => state.password);
  const password_confirmation = useOnboardingStore((state) => state.password_confirmation);
  const useName = useOnboardingStore((state) => state.name);
  const userEmail = useOnboardingStore((state) => state.email);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);
  const setData = useOnboardingStore((state) => state.setData);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
  
  const form = useForm<FormSecondStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      password: password || '',
      password_confirmation: password_confirmation || '',
    },
    resolver: zodResolver(FormSecondStep),
  })

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !hasHydrated) return;

    if (!useName || !userEmail) {
      router.push("/register");
    }
  }, [isClient, hasHydrated, useName, userEmail, router]);

  function onSubmit(input: FormSecondStepSchema) {
    try {
      setLoading(true)
      startTransition(async () => { 
        setData(input);
        router.push("/register/role");
      })
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isClient || !hasHydrated) {
    return (
      <AuthLayout title='Create password' description='Make a strong password - to protect your account' className=' lg:max-w-none h-dvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title='Create password' description='Make a strong password - to protect your account' className=' lg:max-w-none h-dvh '>
      <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
          <div className=" w-full space-y-5">

        <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Next 
          {(isPending || loading) ? (
            <Loader className='animate-spin ml-2'/>
          ) :   <ChevronRight className=' ml-2'/>}
        </Button>
     <Button
             disabled={loading}
          variant={"link"}
                      type="button"
                       className='rounded-lg flex justify-center items-center  w-full'
             >
                       
                <Link
                
                            href={'/register'}
                             className='rounded-lg justify-center gap-2 flex items-center  w-full'
                            >
                               {( loading) ? (
                    <Loader className='animate-spin ml-2'/>
                  ) : <ChevronLeft className=' '/>}
                            Back
                        </Link>
                  </Button>
        
          </div>
      </SignUpForm>
    </AuthLayout>
  )
}

export default SecondStep