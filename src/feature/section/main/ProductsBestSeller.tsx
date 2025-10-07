"use client"


import React from 'react'




import { useEffect, useState } from "react";
import {   useProducts } from "@/hooks/actions/useProducts";
import { ApiResponse } from '@/types';
import ProductsCarousel from '@/feature/auth/components/SectionCarosul';








function ProductsFreeShipping() {
  const [isWhistlist , setWistlist] = useState<boolean | null >(null)
  const { getProducts } = useProducts();
  const [DataProducts, setData] = useState<ApiResponse >();
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
    (async () => {
      const res = await getProducts({ params: {  
         free_shipping: true
      }});
      if (res) setData(res);
      setLoading(false);
    })();
  }, [isWhistlist]);

  
 
  return (
<ProductsCarousel tag='Best Seller' href='/'   isWhistlist={isWhistlist} label='Specials' setWhistlist={setWistlist} title='Products with ' loading={loading} data={DataProducts?.data!} />
  )
}

export default ProductsFreeShipping




