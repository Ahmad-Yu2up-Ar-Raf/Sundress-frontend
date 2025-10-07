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

import { Badge } from "./fragments/badge"
import Link from "next/link"

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
  Product: ProductsSchema;
  className?: string;
  isWhistlist?: boolean | null;
  setWhistlist: React.Dispatch<React.SetStateAction<boolean | null>>;
  onWishlistChange?: (isWishlisted: boolean) => void;
  label?: string
}

export function ProductCard({  Product ,className  , label , onWishlistChange , setWhistlist , isWhistlist,...props }: ProductProps & React.HTMLAttributes<HTMLDivElement>) {
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
          const result = await addWhistlist({
            data: { product_id: Product.id },
            EndPoint: Product.is_whislisted ? '/api/unwhistlist' : '/api/whistlist'
          });

          if (result.success) {
            onWishlistChange?.(!Product.is_whislisted);
            if(isWhistlist === null) {
              setWhistlist(true);
            } else {
              setWhistlist(!isWhistlist);
            }
            toast.success(Product.is_whislisted ? 'Removed from wishlist' : 'Added to wishlist');
          }
        } catch (error) {
          toast.error("Network error");
        } finally {
          setLoading(false);
        }
      });

    }else{

      onClick()
    }


  }

  return (
  
    <Card className={cn("w-full  h-full  gap-4 max-w-sm shadow-none border-0 p-0 bg-background" )} {...props}>
        <CardContent className={cn(" group rounded-lg overflow-hidden bg-background relative px-0  min-h-[18em] md:min-h-[23em]  " , className )}>
      {label && (

          <Badge  className="absolute z-30 bg-primary/80 rounded-lg top-2.5 left-2">
           {label}
          </Badge>
      )}
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

    Product.is_whislisted ? ' size-6 text-primary ' : 'size-5 text-white dark:text-black'
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
          <Button  className="    lg:size-12    relative z-40 size-11 rounded-full ">
  <ShoppingCart className=" size-5.5 "/>
</Button>} />
      <TooltipPanel
       
      >
        
        <p>Buy Now</p>
      </TooltipPanel>
   
    
         
       
           </Tooltip>
        </CardAction>
             <div className="absolute z-30 bottom-0 right-0 size-14.5 lg:size-16">
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
          className=" space-y-2 lg:space-y-4"
    href={`/products/${Product.id}`}
      >

      <CardHeader className=" pl-0 py-0 pr-2.5 bg-background ">
        <Badge variant={"outline"} className=" lg:text-sm border-0 p-0">
        <Star className=" fill-primary text-primary"/>  <span className=" font-medium">{ Product.reviews_avg_star_rating != null ?  Math.round(Product.reviews_avg_star_rating! * 10) / 10 : 0.0 }</span>
<span className=" text-muted-foreground">({Product.reviews_count})</span>
        </Badge>
        <CardTitle className=" text-sm lg:text-lg line-clamp-2">{Product.name} </CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      
      </CardHeader>
    
      <CardFooter className=" text-left  bg-background  p-0">
        <div className=" flex flex-col">

       <h1 className=" text-left  text-sm   font-semibold  lg:text-lg ">{Price}</h1>
       <p className="  text-sm text-accent-foreground/90 line-clamp-1">Products {Product.orders_count} terjual </p>
        </div>
        {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
      </Link>
    </Card>
    
  )
}
