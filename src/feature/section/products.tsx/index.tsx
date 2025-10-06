"use client";
import React, { useEffect } from "react";
import InfiniteScroll from "@/components/ui/fragments/infinite-scroll";

import { ProductsSchema } from "@/lib/validations/index.t";
import { ProductCard } from "@/components/ui/Product-card";
import { BouncingDots } from "@/components/molecule-ui/bouncing-dots";
import { cn } from "@/lib/utils";
import {useProducts } from "@/hooks/actions/useProducts";



import {
    Carousel,
  
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/fragments/carousel";
import CategoryCard from "@/components/ui/fragments/CategoryCard";
// import FilterDrawwer from "@/components/ui/fragments/FilterDrawwer";
// import CategorySelect from "@/components/ui/fragments/CategorySelect";
import { CategoryProductsOptions } from "@/config/enum/CategoryProductsStatus";
import { useIsMobile } from "@/hooks/use-mobile";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { useInView } from 'react-intersection-observer';
export interface Meta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}


interface ProductResponse {
  data: ProductsSchema[];
  meta: {
    current_page: number;
    last_page: number;
  }
}

const InfiniteScrollDemo = () => {
  const { getProducts } = useProducts();
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery<
    ProductResponse,  
    Error,         
    InfiniteData<ProductResponse>, 
    [string],        
    number           
  >({
    queryKey: ['products'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProducts({ page: pageParam  ,  perPage: 5}),
    getNextPageParam: (lastPage): number | undefined => 
      lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1 
        : undefined
  });

console.log(data)
  
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

const isMobile = useIsMobile()

  return (
    <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className="  min-h-svh  items-center space-y-5 xl:space-y-8  max-w-6xl m-auto">
        <div className="space-y-5 xl:space-y-8">

       <header className=' flex flex-col  gap-2 px-4 xl:px-0  '>
        <p className=" text-xs  font-medium  ">
         Sundress Best 
        </p>
        <div className=" ">

      <h1 className=' text-2xl   tracking-tighter font-bold'>
        Sundress Specials
      </h1>
      <p className=" text-xs font-medium ">
           { 0} Products
      </p>
        </div>
    </header>
    {isMobile ? (

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
    ) : (
      <div className="   sm:px-4 xl:px-0 grid  sm:grid-cols-5 gap-2">
          {CategoryProductsOptions.map((item,i) => {

return (
  <CategoryCard CategoryData={item}  key={i}/>
          ) })}
      </div>
    )}
        </div>

    <main className=" px-4  xl:px-0  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-y-9 gap-x-3  sm:gap-y-15 xl:gap-x-2.5  ">
        {data?.pages.map((product ,i) => 
        product.data.map((item ,i) => (

          <ProductCard Product={item} key={i}/>
        ))
        )}
        </main>
        <div ref={ref} className="w-full py-4 text-center">
          {hasNextPage && <BouncingDots />}
        </div>
        {/* <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore &&   }
        </InfiniteScroll> */}
      </div>
    </section>
  );
};

export default InfiniteScrollDemo;
