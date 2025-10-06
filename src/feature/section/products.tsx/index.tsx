"use client";
import React, { useEffect } from "react";
import InfiniteScroll from "@/components/ui/fragments/infinite-scroll";

import { ProductsSchema } from "@/lib/validations/index.t";
import { ProductCard } from "@/components/ui/Product-card";
import { BouncingDots } from "@/components/molecule-ui/bouncing-dots";
import { cn } from "@/lib/utils";
import {useProducts } from "@/hooks/actions/useProducts";




import { useIsMobile } from "@/hooks/use-mobile";

import { useState } from "react";
import { SkeletonCard } from "@/components/ui/fragments/CardSkeletons";

export interface Meta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  
}

type componentsProps = {
   params?: { 
    page?: number; 
    perPage?: number; 
    search?: string; 
    status?: string | string[] 
    category?: string | string[] 
  } 
}
const InfiniteScrollDemo = ({  params }: componentsProps) => {
 const [products, setProducts] = useState<ProductsSchema[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [areMoreProducts, setAreMoreProducts] = useState(true);

  const getProducts = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
       
    const limit = 8;
     const { getProducts} = useProducts()
    const { data: newProducts  , meta  } = await getProducts({      params : {

...params,

 perPage: limit , page: page
    } });
   setTotal(meta.pagination.total)
    if (newProducts.length < limit) {
      setAreMoreProducts(false);
    }

    if (page === 1) {
      setProducts(newProducts);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (areMoreProducts) {
      getProducts();
    }
  }, [page, areMoreProducts ]);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 100;
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = pageHeight - currentPosition;

      if (distanceFromBottom <= buffer && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading ]);



  return (
  <>
    <main className=" px-4  xl:px-0  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-y-6 gap-x-1  sm:gap-y-10 xl:gap-x-2.5  ">
        {products.map((product ,i) => 
    

          <ProductCard Product={product} key={i}/>

        )}
        </main>
          {(loading && products.length > 0) && <BouncingDots  className={cn(" bg-primary my-10 ")}/>}
          {(loading && products.length === 0) && (
             <div className=" px-4  xl:px-0  grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-y-9 gap-x-3  sm:gap-y-10 xl:gap-x-2.5 ">
            
                   <SkeletonCard/>
                   <SkeletonCard/>
                   <SkeletonCard/>
                   <SkeletonCard/>
                 
                  </div>   
          )}
  </>
     

      
    
  );
};

export default InfiniteScrollDemo;
