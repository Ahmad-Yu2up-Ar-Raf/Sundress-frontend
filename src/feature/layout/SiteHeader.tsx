"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/fragments/avatar"
import React, { useState } from "react";
import { Bell, Book, Compass, House, LucideIcon, Menu, Search, ShoppingCart, Sunset, Trees, User, WandSparkles, Zap } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/fragments/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/fragments/navigation-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/fragments/drawer";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { ClaudeAI } from "./logo";

import { useMotionValueEvent, useScroll , motion} from "framer-motion";
import { useAuthStore } from "@/hooks/use-auth-store";
import DropdownMenuUserMenuDemo from "./useProfile";

import { useModal } from "../provider/ContextProvider";

const TopMenu = [


  { name: "Trends", href: "/trend" },
  { name: "Explore", href: "/products" },
  { name: "Blog", href: "/blog" },
];


type Tp = {
  Name : string,
  Link : string,
  icon: LucideIcon
}

const navItems: Tp[] = [
  {
    Name: "Home",
    Link: "/",
    icon: House
  },


  {
    Name: "Explore",
    Link: "/products",
   icon: Compass
  },
  {
    Name: "Bag",
    Link: "/bag",
   icon: ShoppingCart
  },
    {
    Name: "Profile",
    Link: "/profile/settings",
    icon: User
  },
    
];



export const Logo = ({  title = "Sundress"}: { title?: string}) => {
  return (
    <Link href="/" className="flex space-x-5 py-3 items-center">
      <h1 className="text-lg font-bold flex items-center gap-3">
        <ClaudeAI className="size-7  tracking-tighter text-primary" />
        {title}
      </h1>
    </Link>
  );
};

export   function SiteHeader({ paths , isMobile }: { paths: string , isMobile: boolean }) {


    const { open } = useModal();
  const onClick = () => open({ redirectTo: "/" });
  const user = useAuthStore()
     const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [delay, setDelay] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
    setDelay(false);
 if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
   
      
    }
  });

   return (
  <>


    <motion.nav 
    
    
       
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: delay ?  0. : 0.2,
          delay: delay ? 3 : 0,
        }}
    className={cn("w-full  px-5  hidden md:block lg:px-0 py-2    md:backdrop-blur-none border-b-2 border-border/40 bg-background/95 backdrop-blur-md sticky top-0 z-50  ", 

   

    )}>
        <main className=" max-w-5xl m-auto  justify-between md:flex ">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </div>
              <div className="flex items-center text-xs ">
              <NavigationMenu className="relative text-xs z-[100]">
                <NavigationMenuList>
                  {TopMenu.map((menu, idx) => 
                     <NavigationMenuItem key={idx} className=" ">
                        <Link
                          className={navigationMenuTriggerStyle()}
                          href={menu.href}
                        >
                          {menu.name}
                        </Link>
                      </NavigationMenuItem>
                    
                 
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          <div className="items-center flex gap-5">
            <div className=" flex items-center gap-6 border-r-2 border-accent-foreground/30 pr-6">
   <Search className="size-5 text-accent-foreground/70 hover:text-primary cursor-pointer transition-all duration-300 ease-out " />
         <ShoppingCart className="size-5 text-accent-foreground/70 hover:text-primary cursor-pointer transition-all duration-300 ease-out" />
         <Bell className="size-5 text-accent-foreground/70 hover:text-primary cursor-pointer transition-all duration-300 ease-out" />
      
            </div>
           
            {user.user   ? ( 

            <DropdownMenuUserMenuDemo profile={user.user} />
            ) : (

             
   
             <Avatar onClick={onClick} className="  cursor-pointer">
  <AvatarImage src="/assets/images/default-avaatarjpg.jpg" />
  <AvatarFallback>US</AvatarFallback>
</Avatar>

               
            
            )}
          </div>
        </main>
 

        {/* Mobile Menu */}
      
      
    </motion.nav>
    <nav className="w-full  md:hidden   px-4  md:px-0 py-2 md:py-0 md:bg-background/0  md:backdrop-blur-none border-b-2 border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 md:border-0 ">

     <div className="block md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <Drawer>
              <div className="flex gap-3 items-center">
                {/* <Suspense>
                  <ModeToggle />
                </Suspense> */}
                <DrawerTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Menu className="size-4" />
                  </Button>
                </DrawerTrigger>
              </div>
              <DrawerContent
               
                className="pb-5  px-4"
              >
                   <DrawerHeader className="   sm:px-7 space-y-1 bg-background     p-4 border-b   pb-3 justify-center items-center mb-6 ">
           <DrawerTitle>
                    <Logo />
                  </DrawerTitle>

        
              <DrawerDescription className=" sr-only hidden text-sm">
                             Fill in the details below to create a new task
                       </DrawerDescription>
          
        </DrawerHeader>
                <div className="flex flex-col overflow-y-auto">
                  {TopMenu.map((menu, idx) =>
                      <Link
                        key={idx}
                        href={menu.href}
                        className="py-3 px-1 font-medium text-base border-b border-border/40 flex items-center"
                      >
                        {menu.name}
                      </Link>
                   
                  )}
                </div>
                <DrawerFooter className="border-t  px-0 pt-3 mt-6">
                    {user.user ? ( 

              <Link href={user.isBuyer() ? '/dashboard' : '/my-shop'} className={buttonVariants({ variant: "default" })}>
                Dasboard
                </Link>
            ) : (

             <div className="mt-2 flex flex-col gap-2">
                    
            
                  <Button 
                  onClick={onClick}
                  >
                    Login
                  </Button>
             
                    <Link
                      href="/register"
                      className={buttonVariants({ variant: "outline"})}
                    >
                      Get Started
                    </Link>
                  </div>
            )}
                  
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div> 
    </nav>
  </>




  );


 
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

