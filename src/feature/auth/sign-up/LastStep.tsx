"use client"

import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/LastStep'
import { Button, buttonVariants } from '../../../components/ui/fragments/button'
import { registerCreateSchema} from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { useAuth } from '@/hooks/actions/useAuth'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { usePathname } from 'next/navigation';
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
  const setData = useOnboardingStore((state) => state.setData);
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

const [status, setStatus] = useState<string | null>(null)



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
    setLoading(true)
    toast.loading("Signup in...", { id: "register" })
    const result = await  register({
     name: name!,
     email: email!,
     password: password!,
     password_confirmation: password_confirmation!,
     role: data.role as 'seller' | 'buyer',
      
          
      })

        if (result.success) {
              toast.success(result.message || "Welcome back!", { id: "register" })
            } else {
              toast.error(result.message || "register failed", { id: "register" })
            }

  
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }



  React.useEffect(() => {
      if (!loading && status) {
        form.reset()
      }
    }, [loading, status,  form , router]);
  // Loading state while hydrating
  if (!isClient || !hasHydrated) {
    return (
      <AuthLayout title='Select Role' description='Select your role to get started' className=' lg:max-w-none h-dvh '>
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin size-6" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout  title='Select Role' description='Select your role to get started' className=' lg:max-w-none h-dvh '>
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
          ): <ChevronRight className=''/>}
        </Button>
     <Button
             disabled={loading}
          variant={"link"}
                      type="button"
                       className='rounded-lg flex justify-center items-center  w-full'
             >
                       
                <Link
                   
                            href={'/register/password'}
                             className={cn(buttonVariants({ variant: "link"}))}
                            >
                               {( loading) ? (
                    <Loader className='animate-spin ml-2'/>
                  ) : <ChevronLeft className=''/>}
                            Back
                        </Link>
                  </Button>
        
          </div>
      </SignUpForm>
    </AuthLayout>
  )
}

export default LastStep