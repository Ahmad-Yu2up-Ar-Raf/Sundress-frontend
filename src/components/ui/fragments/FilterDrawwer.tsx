import React from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/fragments/drawer";
import { Button, buttonVariants } from './button';
import { ListFilter } from 'lucide-react';
import { Logo } from '@/feature/layout/SiteHeader';
import { cn } from '@/lib/utils';
function FilterDrawwer() {
  return (
    <Drawer>
              <div className="flex gap-3 items-center">
                {/* <Suspense>
                  <ModeToggle />
                </Suspense> */}
                <DrawerTrigger asChild>
                  <Button variant={"ghost"} size={"lg"} className=' '>
                    <ListFilter className="size-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
              </div>
              <DrawerContent
               
                className="pb-5  px-4"
              >
                   <DrawerHeader className="   sm:px-7 space-y-1 bg-background     p-4 border-b   pb-3 justify-center items-center mb-6 ">
           <DrawerTitle>
                    <Logo title='Fillters' />
                  </DrawerTitle>

        
              <DrawerDescription className=" sr-only hidden text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>
                {/* <div className="flex flex-col overflow-y-auto">
                  {TopMenu.map((menu, idx) =>
                      <Link
                        key={idx}
                        href={menu.href}
                        className="py-3 px-1 font-medium text-base border-b border-border/40 flex items-center"
                      >
                        {menu.name}
                      </Link>
                   
                  )}
                </div> */}
                <DrawerFooter className="border-t  px-0 pt-3 mt-6">
           
             <div className="mt-2 flex flex-col gap-2">
                    
            
                  <Button 
       
                  >
                    Submit
                  </Button>
             
                    <DrawerClose
                     className={cn( buttonVariants({ variant: "secondary"}))}
                    >
                     
     
       Cancel
    
              
                    </DrawerClose>
                  </div>
 
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
  )
}

export default FilterDrawwer