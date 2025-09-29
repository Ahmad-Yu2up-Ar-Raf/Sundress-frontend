"use client";
 

import { useState } from "react";
import { ClaudeAI } from "../../layout/logo";
import Link from "next/link";

 
type AuthLayoutProps = { 
    children?: React.ReactNode;
    title?: string;
    description?: string;
    quote?: string;
    formType?: "sign_in" | "sign_up";
}
 
export const AuthLayout = ({  formType   , title = `Welcome to sundress`  ,  quote = `Design and dev partner for startups and founders.`  ,description = `Welcome to Sundress — Let's get started`  , ...props } : AuthLayoutProps) => {
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
 
  const formTypeReverse = formType == 'sign_up' ? 'sign_in' : 'sign_up'
  return (
    <div className=" h-full flex items-center justify-center overflow-hidden p-4l">
      <div className=" w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row shadow-xl">
        <div className="w-full h-full z-2 absolute bg-linear-to-t from-transparent to-black"></div>
        <div className="flex absolute z-2  overflow-hidden backdrop-blur-2xl ">
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          <div className="h-[40rem] z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
        </div>
        <div className="w-[15rem] h-[15rem] bg-orange-500 absolute z-1 rounded-full bottom-0"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0"></div>
        <div className="w-[8rem] h-[5rem] bg-white absolute z-1 rounded-full bottom-0"></div>
 
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 relative rounded-bl-3xl  overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            {quote}
          </h1>
        </div>
 
        <div className="p-8 md:p-12 md:w-1/2 relative flex flex-col bg-secondary z-99 text-secondary-foreground ">
          <div className="flex flex-col items-left mb-8">
            <div className="text-orange-500 mb-4">
              <ClaudeAI className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-medium mb-2 tracking-tight">
              {title}
            </h2>
            <p className="text-left opacity-80">
              {description}
            </p>
          </div>
 
    {props.children}
    {formType && (

            <div className="text-center mt-4  text-gray-600 text-sm">
              Already have account?{" "}
              <Link href={`/${formTypeReverse}`} className="text-secondary-foreground capitalize font-medium underline">
                   {formTypeReverse?.replace("_","-")}
              </Link>
            </div>
    )}
        </div>
      </div>
    </div>
  );
};
 