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
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const setData = useOnboardingStore((state) => state.setData);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
  
  const form = useForm<FormFirstStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      email: "",
      name: "",
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
      <AuthLayout formType="register" title='Get Started'>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout formType="register" title='Get Started'>
      <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
        <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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