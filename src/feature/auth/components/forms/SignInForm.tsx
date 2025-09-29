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

function SignInForm<T extends FieldValues, >({
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
           name={"email" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                placeholder="email"
                 className=''
                type="email"
                {...field} />
              </FormControl>
              <FormDescription className=' sr-only'>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
         disabled={isPending}
          control={form.control}
    name={"password" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' flex w-full justify-between'><span>Password</span> 
              <Link
              className=' underline text-muted-foreground hover:text-accent-foreground'
              href={'/forgot-password'}
              >Forgot Password?</Link></FormLabel>
              <FormControl>
                <PasswordInput placeholder="Placeholder"  {...field} />
              </FormControl>
              <FormDescription className=' sr-only'>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
      name={"remember" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex cursor-pointer flex-row items-start space-x-2 space-y-0 rounded-md ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                   className='  cursor-pointer  border-accent-foreground/40'
                />
              </FormControl>
              <div className="space-y-1  cursor-pointer  leading-none">
                <FormLabel className='  cursor-pointer'>Remember me</FormLabel>
                <FormDescription className=' sr-only'>You can manage your mobile notifications in the mobile settings page.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />


        {props.children}
        </form>
    </Form>
  )
}

export default SignInForm


