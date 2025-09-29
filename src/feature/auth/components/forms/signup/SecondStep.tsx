import React from 'react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/fragments/form"
import {
    FieldPath,
    FieldValues,
  UseFormReturn
} from "react-hook-form"
import Link from 'next/link';
import { PasswordInput } from '@/components/ui/fragments/password-input';
import { Checkbox } from '@/components/ui/fragments/checkbox';
import { Input } from '@/components/ui/fragments/input';
interface TaskFormProps<T extends FieldValues, >
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  
}

function SignUpForm<T extends FieldValues, >({
    form,
    isPending,
...props
}: TaskFormProps<T>) {
  return (
   <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className=" space-y-6 *:
      
      
  [&_input]:text-sm [&_input]:w-full [&_input]:py-2 [&_input]:px-3 [&_input]:border [&_input]:rounded-lg [&_input]:focus:outline-none [&_input]:focus:ring-1 [&_input]:bg-white [&_input]:text-black [&_input]:focus:ring-orange-500
      ">
      

     
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormDescription  className=' sr-only '>Enter your password.</FormDescription>
              <FormMessage  className=' '/>
            </FormItem>
          )}
        />
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password_confirmation" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirmation" {...field} />
              </FormControl>
              <FormDescription  className='sr-only '>Enter your password.</FormDescription>
              <FormMessage  className=' '/>
            </FormItem> 
          )}
        />

        {props.children}
        </form>
    </Form>
  )
}

export default SignUpForm


