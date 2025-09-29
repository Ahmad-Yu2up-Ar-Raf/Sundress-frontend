"use client"

import React from 'react'
import { AuthLayout } from '../components/layout-auth'
import SignUpForm from '../components/forms/signup/FirstStep'
import { Button } from '../../../components/ui/fragments/button'
import { registerCreateSchema, RegisterSchema } from '@/lib/validations/auth';
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

 const setData = useOnboardingStore((state) => state.setData);


  const [isPending, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);  
 const form = useForm<FormFirstStepSchema> ({
        mode: "onSubmit", 
    defaultValues: {
       email: "",
       name: "",
      },
    resolver: zodResolver(FormFirstStep),
  })

  function onSubmit(input: FormFirstStepSchema ) {
    try {
                setLoading(true)
        startTransition(async () => { 
         setData(input);
    router.push("/sign_up/password");
        })
 
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }



  return (
    <AuthLayout formType="sign_up" title='Get Started' >
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
