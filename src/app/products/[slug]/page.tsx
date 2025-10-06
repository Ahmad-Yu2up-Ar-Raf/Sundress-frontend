import React from 'react'
import InfiniteScrollDemo from "@/feature/section/products.tsx";
import { Meta } from '@/types';

interface PageProps {
 params: Promise<{ slug:   string  }>;

}
type componentsProps = {
  
    page?: number; 
    perPage?: number; 
    search?: string; 
    status?: string | string[] 
    category?: string | string[] 

}
export default async function Page( props  : PageProps) {
  const { slug } = await props.params
  const params : componentsProps = {
    category: slug
  }
  return (
 

// import { Suspense } from "react";









 
    <InfiniteScrollDemo params={params}/>

  )
}

