
"use client";


import * as React from "react"
import Image from "next/image";

import { DoorOpen } from "lucide-react"
import { cn } from "@/lib/utils";





interface WrapperProps {
children?: React.ReactNode
img?: string
alt?: string
quote?: string
className?: string
}


export default function WrapperView({ 
  className,
    quote = `Design and dev partner for startups and founders.`,
    children,
    img = "https://images.unsplash.com/photo-1732472126838-8b8bff829d4b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt="Auth-Image"
 }: WrapperProps) 

 { 




    return(
        <div className="grid min-h-dvh lg:grid-cols-2 " >
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
        <div className="w-[8rem] h-[5rem] bg-background absolute z-1 rounded-full bottom-0"></div>
        <div className="w-[8rem] h-[5rem] bg-background absolute z-1 rounded-full bottom-0"></div>
 
        <div className="bg-black text-white p-8 lg:p-12 lg:w-1/2 relative rounded-bl-3xl  overflow-hidden">
          <h1 className="text-2xl lg:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            {quote}
          </h1>
        </div>
   <div className={cn("bg-background   p-6 md:p-10" )}>
<div className={cn("flex-col h-full flex relative   gap-4 ")}>
  
      <div className="flex justify-center gap-2 md:justify-start">
        
          <div  className="flex   cursor-none items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <DoorOpen className="size-4" />
            </div>
            <span className="  ">Sundress.</span>
          </div>
          
        </div>
  
  {children}
</div>

        </div>
      

      </div>
    )
}