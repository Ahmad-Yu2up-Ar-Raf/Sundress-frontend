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

import { useEffect, useState } from "react";
import {  ApiResponse, useProducts } from "@/hooks/actions/useProducts";
import { SkeletonCard } from '@/components/ui/fragments/CardSkeletons';
import { Badge } from '@/components/ui/fragments/badge';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/fragments/button';
import ProductsCarousel from '@/feature/auth/components/SectionCarosul';








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

  

  return (
<ProductsCarousel loading={loading} data={DataProducts?.data!} />
  )
}

export default Products




