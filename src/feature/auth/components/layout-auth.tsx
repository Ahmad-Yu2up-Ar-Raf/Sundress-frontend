"use client";
 

import { useState } from "react";
import { ClaudeAI } from "../../layout/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

 
type AuthLayoutProps = { 
    children?: React.ReactNode;
    title?: string;
    description?: string;
    quote?: string;
    disabled?: boolean;
    className?: string
    numberOfIterations?: number
    formType?: "login" | "register";
}
 
export const AuthLayout = ({  formType , numberOfIterations, className  , disabled = false  , title = `Welcome to sundress`  ,  quote = `Design and dev partner for startups and founders.`  ,description = `Welcome to Sundress — Let's get started`  , ...props } : AuthLayoutProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
 
  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
 
  const validatePassword = (value: string) => {
    return value.length >= 8;
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
 
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
 
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }
 
    setSubmitted(true);
 
    if (valid) {
      // Submission logic goes here
      console.log("Form submitted!");
      console.log("Email:", email);
      alert("Form submitted!");
      setEmail("");
      setPassword("");
      setSubmitted(false);
    }
  };
 
  const formTypeReverse = formType == 'register' ? 'login' : 'register'
  return (
    <div className="  h-full flex items-center justify-center overflow-hidden ">
      <div className={cn("  w-full relative max-w-lg lg:max-w-6xl overflow-hidden flex flex-col h-full lg:flex-row shadow-xl" , className)}>
        <div className="w-full h-full z-2 absolute bg-linear-to-t from-transparent to-black"></div>
        <div className="flex absolute z-2  h-full overflow-hidden backdrop-blur-2xl ">
          <div className="h-full z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30 overflow-hidden"></div>
            {Array.from({ length: numberOfIterations || 5 }, (_, index) => ( 

          <div key={index} className="h-full z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
            ))}
      
        </div>
        <div className="w-[15rem] h-[15rem] bg-orange-500 absolute z-1 rounded-full bottom-0 animate-pulse"></div>
        <div className="w-[8rem] h-[5rem] bg-background absolute z-1 rounded-full bottom-0 animate-pulse"></div>
        <div className="w-[8rem] h-[5rem] bg-background absolute z-1 rounded-full bottom-0 animate-pulse"></div>
 
        <div className="bg-black text-white p-8 lg:p-12 lg:w-1/2 relative rounded-bl-3xl  overflow-hidden">
          <h1 className="text-2xl lg:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            {quote}
          </h1>
        </div>
 
        <main className={cn("p-8 lg:w-1/2 justify-center items-center   h-full content-center relative  bg-secondary z-99 text-secondary-foreground " )}>
            <div className="justify-center max-w-sm flex m-auto flex-col h-full">
              
          <div className="flex flex-col items-left mb-8">
            <div className="text-orange-500 mb-4">
              <ClaudeAI className="h-10 w-10" />
            </div>
            <h2 className="text-3xl  font-medium mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-left  opacity-80">
              {description}
            </p>
          </div>
 
    {props.children}
    {formType && (

            <div className="text-center mt-4  text-gray-600 text-sm">
      {     formType == 'register' ?   `Already have account? ` : 'dont have an account yet?  '}
              <Link  aria-disabled={disabled}  tabIndex={!disabled ? -1 : undefined}  href={`/${formTypeReverse}`} className={cn("text-secondary-foreground capitalize font-medium underline" , 
                    disabled ? 'pointer-events-none cursor-none text-foreground/50' : ''
               )}
              
              
              >
                   {formTypeReverse}
              </Link>
            </div>
    )}
            </div>
        </main>
      </div>
    </div>
  );
};
 