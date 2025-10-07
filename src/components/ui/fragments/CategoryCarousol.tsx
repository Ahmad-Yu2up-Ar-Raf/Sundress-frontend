import React from 'react'
import { CategoryProductsOptions } from "@/config/enum/CategoryProductsStatus";
import {
    Carousel,
  
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/fragments/carousel";
import CategoryCard from "@/components/ui/fragments/CategoryCard";
import { cn } from '@/lib/utils';

type componentsProps = {
  className? : string
}
function CategoryCarousol({ className }: componentsProps) {
  return (
    <Carousel
    className=" md:sr-only"
   opts={{
     align: "start",
     breakpoints: {
       "(max-width: 768px)": {
         dragFree: true,
       },
     },
   }}
 >
   <CarouselContent className="mx-4 relative cursor-grab  2xl:mr-[max(0rem,calc(50vw-700px))]">
    {CategoryProductsOptions.map((item,i) => {

return (
<CarouselItem
     key={i}
          className={cn("max-w-[195px] p-0      md:max-w-[300px]" , 
i > 0 && 'pl-1'  , 
className,
          )}
        >
                 <CategoryCard overlay CategoryData={item } />
        </CarouselItem>
    ) })}



    
     {/* {DataProducts?.data!.map((item , i) => (
       <CarouselItem
         key={i}
         className={cn("max-w-[230px]  relative z-40  sm:max-w-[300px]" , 

i > 0 ? 'pl-3' : 'pl-0'

         )}
       >
          <ProductCard Product={item}/>
       </CarouselItem>
     ))} */}
   
   </CarouselContent>
     <CarouselPrevious  className=''/>
<CarouselNext/>
 </Carousel>
  )
}

export default CategoryCarousol