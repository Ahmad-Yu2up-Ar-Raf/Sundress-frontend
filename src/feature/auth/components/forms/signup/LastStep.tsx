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

import { RadioGroup, RadioGroupItem } from '@/components/ui/fragments/radio-group';
import { RoleUser } from '@/config/enum/Roles';
import { Label } from '@/components/ui/fragments/label';
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
      
      
  [&_input]:text-sm [&_input]:w-full [&_input]:py-2 [&_input]:px-3 [&_input]:border [&_input]:rounded-lg [&_input]:focus:outline-none [&_input]:focus:ring-1 [&_input]:bg-background [&_input]:text-black [&_input]:focus:ring-orange-500
      ">
      

        <FormField
              disabled={isPending}
               control={form.control}
         name={"role" as FieldPath<T>}
               render={({ field }) => (
                 <FormItem 
                 
                 >
                   <FormLabel className=' sr-only'>Role </FormLabel>
                   <FormControl>
                        <RadioGroup  
                           disabled={isPending}
                            onValueChange={field.onChange}
                        className="gap-2 " defaultValue="user">
      {RoleUser.map((item, i ) => (

      <FormItem 
      
      key={i}
      className="relative cursor-pointer flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-primary  has-[[data-state=checked]]:border-2">
        <FormControl>

        <RadioGroupItem
        disabled={isPending}
          value={item.value}
          id={`${i}-1`}
          aria-describedby={`${i}-1-description`}
          className="order-1 after:absolute after:inset-0"
        />
        </FormControl>
        <FormLabel className="flex grow items-center gap-3">
       { item.icon && (
<item.icon/>
       )} 
          <div className="grid grow gap-2 cursor-pointer">
            <Label htmlFor={`${i}-1`}>
              {item.label} {" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
             {"("}   {item.subLabel}{")"}
              </span>
            </Label>
            <p id={`${i}-1-description`} className="text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        </FormLabel>
      </FormItem>
      ))}
     
    </RadioGroup>
                   </FormControl>
                   <FormDescription  className=' sr-only '>Enter your password.</FormDescription>
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


