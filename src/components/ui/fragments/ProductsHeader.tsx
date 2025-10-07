"use client"
import React from 'react'
// import FilterDrawwer from "@/components/ui/fragments/FilterDrawwer";
// import CategorySelect from "@/components/ui/fragments/CategorySelect";
import { CategoryProductsOptions } from "@/config/enum/CategoryProductsStatus";

import CategoryCard from "@/components/ui/fragments/CategoryCard";

import  CategoryCarousol from '@/components/ui/fragments/CategoryCarousol';
import { usePathname } from 'next/navigation';


type componentsProps = {
  title?: string
}
function ProductsHeader({   title = "Sundress"} : componentsProps) {
  const paths = usePathname()
  return (
   <div className="space-y-5 xl:space-y-8">

       <header className=' flex flex-col lg:gap-5  gap-2 px-4 xl:px-0  '>
        <p className=" text-xs  font-medium  ">
         Sundress Best 
        </p>
        <div className="  ">

      <h1 className=' text-2xl lg   tracking-tighter font-bold'>
        {title} Collection
      </h1>
      <p className=" text-xs font-medium ">
           data Products
      </p>
        </div>
    </header>
{paths == '/products' && (
<>
<CategoryCarousol/>

 <div className=" px-4 xl:px-0 ">
  
      <div className="    sr-only md:not-sr-only   grid  grid-cols-5 md:gap-2 gap-1.5">
          {CategoryProductsOptions.map((item,i) => {

return (
  <CategoryCard overlay CategoryData={item}  key={i}/> 
          ) })}
      </div>
 </div>
</>
)

}
        </div>

  )
}

export default ProductsHeader
