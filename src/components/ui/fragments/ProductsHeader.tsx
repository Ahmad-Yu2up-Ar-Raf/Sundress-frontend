import React from 'react'
// import FilterDrawwer from "@/components/ui/fragments/FilterDrawwer";
// import CategorySelect from "@/components/ui/fragments/CategorySelect";
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


function ProductsHeader() {
  return (
   <div className="space-y-5 xl:space-y-8">

       <header className=' flex flex-col lg:gap-5  gap-2 px-4 xl:px-0  '>
        <p className=" text-xs  font-medium  ">
         Sundress Best 
        </p>
        <div className="  ">

      <h1 className=' text-2xl lg   tracking-tighter font-bold'>
        Sundress Collection
      </h1>
      <p className=" text-xs font-medium ">
           data Products
      </p>
        </div>
    </header>


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
  i > 0 && 'pl-1' 

                )}
              >
                       <CategoryCard CategoryData={item} />
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
 
      <div className="  sr-only md:not-sr-only  sm:px-4 xl:px-0 grid  sm:grid-cols-5 gap-2">
          {CategoryProductsOptions.map((item,i) => {

return (
  <CategoryCard CategoryData={item}  key={i}/>
          ) })}
      </div>
        </div>

  )
}

export default ProductsHeader
