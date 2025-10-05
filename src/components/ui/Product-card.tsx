'use client'
import { Button } from "@/components/ui/fragments/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/card"

import { Heart, ShoppingCart,  Star } from "lucide-react"
import Image from "next/image"
import { Badge } from "./fragments/badge"
import Link from "next/link"
import { DataFile } from "@/types"
import MediaItem from "./fragments/MediaItem"
import {
  Tooltip,
   TooltipPanel,
  TooltipTrigger,
} from "@/components/animate-ui/components/base/tooltip"
import { ProductsSchema } from "@/lib/validations/index.t"
import { formatIDR } from "@/hooks/use-money-format"
import { useModal } from "@/feature/provider/ContextProvider"
import React from "react"
import { useAuthStore } from "@/hooks/use-auth-store"
import { toast } from "sonner"
import { useWhistlist } from "@/hooks/actions/useWhistlist"
import { Spinner } from "./fragments/spinner"
import { cn } from "@/lib/utils"


type ProductProps  = {
  Product : ProductsSchema
}

export function ProductCard({  Product }: ProductProps) {
  const [loading, setLoading] = React.useState(false);  
const Price = formatIDR(Product.price)
       const { open } = useModal();
     const onClick = () => open({ redirectTo: "/" });
     const user = useAuthStore()
   const {addWhistlist }= useWhistlist()
     const [isPending, startTransition] = React.useTransition();
   
   
   
     function onSubmit() {


    if(user.user){
      setLoading(true)
      startTransition(async () => { 
      try {
    
    
     
     
       const EndPoint : string = Product.is_whislisted ? '/api/unwhistlist' : '/api/whistlist'
      
      
     toast.loading("Adding to wishlist...", { id: "adding" })
    
    
    
    
    
    
      const result = await  addWhistlist({
          data: {
             product_id : Product.id
          },
          EndPoint:   EndPoint
        })
    
    
    
    
    
             if (result.success) {
                         toast.success( "New Product in whistlist", { id: "adding" })
                       } else {
                         toast.error( "Failed added product", { id: "adding" })
                       }
    
    
                       
       } catch (error) {
         console.error("Form submission error", error);
         toast.error("Network error. Please check your connection.",  { id: "adding" });
       } finally {
         setLoading(false);
       }
         })

    }else{

      onClick()
    }


  }

  return (
  
    <Card className="w-full  gap-4 max-w-sm shadow-none border-0 p-0 bg-background">
        <CardContent className=" group rounded-2xl overflow-hidden bg-background relative px-0 md:min-h-[45svh]  min-h-[35svh]">
          <Badge  className="absolute z-30 rounded-2xl top-2 left-2">
            New
          </Badge>
      <CardAction className=" absolute pt-1.5 md:pt-0  h-full justify-between bottom-0 right-0 flex flex-col">
    <Tooltip>

      <TooltipTrigger   onClick={onSubmit}   render={  
        <Button  size={"sm"} variant={"ghost"} className={cn("  hover:bg-primary    z-40    text-accent   md:py-5   rounded-full" ,


           Product.is_whislisted ? 'hover:text-primary  transition-all duration-300   ease-out   [&_svg]:fill-primary hover:[&_svg]:fill-none  hover:[&_svg]:text-accent' : ''
        )}>
{loading || isPending ? (
  <Spinner  className="     size-4.5 text-white dark:text-black"/>
) : (
  <Heart  className={cn("     " ,

    Product.is_whislisted ? ' size-5 text-primary ' : 'size-4.5 text-white dark:text-black'
  )}/>

)}
    </Button>} />
      <TooltipPanel
       
      >
        
        <p>{ Product.is_whislisted ? 'Remove from Whistlist' :  'Add to whishlist'}</p>
      </TooltipPanel>

    </Tooltip>
          <Tooltip>

      <TooltipTrigger render={
          <Button  className="      relative z-40 size-10.5 rounded-full ">
  <ShoppingCart className=" size-5 "/>
</Button>} />
      <TooltipPanel
       
      >
        
        <p>Add to cart</p>
      </TooltipPanel>
   
    
         
       
           </Tooltip>
        </CardAction>
             <div className="absolute z-30 bottom-0 right-0 size-15">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 62" className=" relative z-20">
    <path d="M 36 10 L 52 10 C 57.523 10 62 5.523 62 0 L 62 62 L 0 62 C 5.523 62 10 57.523 10 52 L 10 36 C 10 21.641 21.641 10 36 10 Z" fill="var(--background)"/>
</svg>
          </div>
 
             <Link 
           href={`/products/${Product.id}`}
           className=" absolute h-full w-full"
             >
               <MediaItem 
        webViewLink={`${Product.main_image}`}
       
          className="  opacity-100 transition-all duration-300 ease-out group-hover:opacity-0    object-center  object-cover w-full h-full "
        
          />

         
             </Link>
             <Link 
      href={`/products/${Product.id}`}
           className="  absolute h-full w-full"
             >
        <MediaItem 
           webViewLink={`${Product.thumbnail_image}`}
          className="    transition-all duration-300 ease-out opacity-0    group-hover:opacity-100  object-center  object-cover w-full h-full"
     
          />
         
         
             </Link>
      
      </CardContent>
          <Link 
          className=" space-y-4"
    href={`/products/${Product.id}`}
      >

      <CardHeader className=" px-0 bg-background pr-1">
        <Badge variant={"outline"} className=" border-0 p-0">
        <Star className=" fill-primary text-primary"/>  4.9
<span className=" text-muted-foreground">(665)</span>
        </Badge>
        <CardTitle className=" text-sm line-clamp-2">{Product.name} </CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      
      </CardHeader>
    
      <CardFooter className=" text-left bg-background  px-0">
        <div className=" flex flex-col">

       <h1 className=" text-left   font-bold">{Price}</h1>
       <p className=" text-xs text-muted-foreground line-clamp-1">{Product.country} , {Product.city}</p>
        </div>
        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
      </Link>
    </Card>
    
  )
}
