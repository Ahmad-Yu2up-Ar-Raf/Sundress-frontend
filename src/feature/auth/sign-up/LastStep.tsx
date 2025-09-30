"use client"

import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/LastStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema} from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const FormLastStep = registerCreateSchema.pick({
  role: true,
})
type FormLastStepSchema = z.infer<typeof FormLastStep>;

function LastStep() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  const name = useOnboardingStore((state) => state.name);
  const email = useOnboardingStore((state) => state.email);
  const password = useOnboardingStore((state) => state.password);
  const password_confirmation = useOnboardingStore((state) => state.password_confirmation);
  const hasHydrated = useOnboardingStore((state) => state._hasHydrated);

  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
  
  const form = useForm<FormLastStepSchema>({
    mode: "onSubmit", 
    defaultValues: {
      role: "user"
    },
    resolver: zodResolver(FormLastStep),
  })

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

 

  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
})

  useEffect(() => {
    if (!isClient || !hasHydrated) return;

    if (!name || !email || !password || !password_confirmation) {
      router.push("/register");
    }
  }, [isClient, hasHydrated, name, email, password, password_confirmation, router]);



  
  const [errors, setErrors]  = useState<string[]>([])





  async function onSubmit(data: FormLastStepSchema) {
    const postBody = {
      ...data,
      name,
      email,
      password,
      password_confirmation,
    }
  
    console.log('Sending data:', postBody); 
  
    setLoading(true)
    
    try {
    
      register({
           role: data.role,
            name,
            email,
            password,
            password_confirmation,
            setErrors,
      })
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // Loading state while hydrating
  if (!isClient || !hasHydrated) {
    return (
      <AuthLayout title='Select Role' description='Select your role to get started'>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title='Select Role' description='Select your role to get started'>
      <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
        <Button
          disabled={isPending || loading}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Create Account
          {(isPending || loading) && (
            <Loader className='animate-spin ml-2'/>
          )}
        </Button>
      </SignUpForm>
    </AuthLayout>
  )
}

export default LastStep