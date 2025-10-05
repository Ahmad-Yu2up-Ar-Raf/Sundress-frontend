"use client"

import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/FirstStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

const FormFirstStep = registerCreateSchema.pick({
  name: true,
  email: true,
})
type FormFirstStepSchema = z.infer<typeof FormFirstStep>;


function FirstStep() {
    const name = useOnboardingStore((state) => state.name);
  const email = useOnboardingStore((state) => state.email);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const setData = useOnboardingStore((state) => state.setData);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
  
  const form = useForm<FormFirstStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      email: email  || "",
      name: name || "",
    },
    resolver: zodResolver(FormFirstStep),
  })

  useEffect(() => {
    setIsClient(true);
  }, []);

  function onSubmit(input: FormFirstStepSchema) {
    try {
      setLoading(true)
      startTransition(async () => { 
        setData(input);
        router.push("/register/password");
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
      <AuthLayout disabled={loading} formType="register" title='Get Started' className=' lg:max-w-none h-dvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout disabled={loading} formType="register" title='Get Started' className=' lg:max-w-none h-dvh '>
      <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
        <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full  transition-colors"
        >
          Next Step
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignUpForm>
    </AuthLayout>
  )
}

export default FirstStep