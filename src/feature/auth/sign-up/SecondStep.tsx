"use client"

import React, { useEffect } from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/SecondStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema, RegisterSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod'
import { useOnboardingStore } from '@/hooks/use-store-signup'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Loader } from 'lucide-react'
import Link from 'next/link'



const FormSecondStep = registerCreateSchema.pick({
   password: true,
   password_confirmation: true,
 })
type FormSecondStepSchema = z.infer<typeof FormSecondStep>;
function SecondStep() {

 const router = useRouter();


  const useName = useOnboardingStore((state) => state.name);
  const userEmail = useOnboardingStore((state) => state.email);


 const setData = useOnboardingStore((state) => state.setData);
  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<FormSecondStepSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       password: "",
       password_confirmation: "",
      },
    resolver: zodResolver(FormSecondStep),
  })


 
  function onSubmit(input: FormSecondStepSchema ) {
    try {
                setLoading(true)
        startTransition(async () => { 
         setData(input);
    router.push("/sign_up/role");
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!useName || !userEmail) {
      router.push("/sign_up");
    }
  }, [useOnboardingStore.persist.hasHydrated, useName, userEmail, router]);

  return (
    <AuthLayout title='Created password'  description='Make a strong password - to protect your account'>
           <SignUpForm form={form} isPending={isPending || loading} onSubmit={onSubmit}>
   <Button
     disabled={isPending || loading}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
             Next 
             {isPending || loading && (
              <Loader className=' animate-spin '/>
             )}
            </Button>
          
      </SignUpForm>
    </AuthLayout>
  )
}

export default SecondStep
