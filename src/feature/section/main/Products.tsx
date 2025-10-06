"use client"
import {ProductCard} from '@/components/ui/Product-card'
import Link from 'next/link'
import React from 'react'



import {
  Carousel,

  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/fragments/carousel";
import { cn } from '@/lib/utils';
import { ProductsSchema } from '@/lib/validations/index.t';

import { useEffect, useState } from "react";
import {  ApiResponse, useProducts } from "@/hooks/actions/useProducts";
import { SkeletonCard } from '@/components/ui/fragments/CardSkeletons';








function Products() {
  const { getProducts } = useProducts();
  const [DataProducts, setData] = useState<ApiResponse >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getProducts();
      if (res) setData(res);
      setLoading(false);
    })();
  }, [DataProducts]);
  console.log(DataProducts)

  

  return (
    <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className=" h-fit space-y-5 lg:space-y-8  max-w-6xl m-auto">
    <header className='  px-4 items-center flex justify-between'>
      <h1 className=' text-2xl  font-bold'>
        Newest Products
      </h1>
      {/* <Link
      className={cn( 
        buttonVariants({variant : "ghost"})
        , ' ' )}
      href={'/products'}
      >
      Explore more
      </Link> */}
    </header>
      {loading ? (
    <div className="  ml-4 grid grid-cols-2 tracking-tight md:grid-cols-3 gap-4 lg:grid-cols-4">

       <SkeletonCard/>
       <SkeletonCard/>
       <SkeletonCard/>
       <SkeletonCard/>
     
      </div>   
      ) : (

      <Carousel
         
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
            {DataProducts?.data!.map((item : ProductsSchema , i : number) => (
              <CarouselItem
                key={i}
                className={cn("max-w-[195px]  relative z-40  md:max-w-[300px]" , 

  i > 0 ? 'pl-3.5' : 'pl-0',
                )}
              >
                 <ProductCard Product={item}/>
              </CarouselItem>
            ))}
          
          </CarouselContent>
            <CarouselPrevious  className=''/>
      <CarouselNext/>
        </Carousel>
      )}

    </div>
    </section>
  )
}

export default Products




