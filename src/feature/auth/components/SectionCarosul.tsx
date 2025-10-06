"use client"
import {ProductCard} from '@/components/ui/Product-card'

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


import { SkeletonCard } from '@/components/ui/fragments/CardSkeletons';
import { Badge } from '@/components/ui/fragments/badge';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/fragments/button';





type componentsProps = {
title?: string
label?: string
href?: string
linkLabel?: string
loading: boolean
data: ProductsSchema[]
}


function ProductsCarousel({ linkLabel = "Explore more" , title="Newest Products"  , ...props }: componentsProps) {

  

  return (
    <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className=" h-fit space-y-7 lg:space-y-8  max-w-5xl m-auto">
    <header className='  px-4 r   flex-row flex justify-between items-end'>
      <h1 className=' text-2xl md:text-3xl lg:items-center  flex-col gap-1 lg:gap-1 flex lg:flex-row  font-bold'>
        {title}
        {props.label && (

        <Badge className=' ml-3  font-bold    scale-110 -rotate-2 lg:-rotate-6 text-lg md:text-xl' >
         {props.label}
        </Badge>
        )}
      </h1>
      {props.href && (

      <Link
      className={cn( 
        buttonVariants({variant : "secondary"})
        , '  text-xs p-3' )}
      href={props.href}
      >
      {linkLabel}
      </Link>
      )}
    </header>
      {props.loading ? (
    <div className="  px-4  xl:px-0  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-y-9 gap-x-3  sm:gap-y-10 xl:gap-x-2.5 ">

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
            {props.data!.map((item : ProductsSchema , i : number) => (
              <CarouselItem
                key={i}
                className={cn("max-w-[230px]  relative z-40  md:max-w-[300px]" , 

  i > 0 ? 'pl-1.5' : 'pl-0',
                )}
              >
                 <ProductCard className=' ' Product={item}/>
              </CarouselItem>
            ))}
          
          </CarouselContent>
            <CarouselPrevious  />
      <CarouselNext/>
        </Carousel>
      )}

    </div>
    </section>
  )
}

export default ProductsCarousel




