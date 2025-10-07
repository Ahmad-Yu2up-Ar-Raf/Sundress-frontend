// import { Promo } from "@/feature/layout/Promo";
import CategoryCarousel from "@/feature/section/main/Category";
import Hero from "@/feature/section/main/Hero";
import Products from "@/feature/section/main/Products";
import ProductsFreeShipping from "@/feature/section/main/ProductsFreeShipping";

// import { Suspense } from "react";




export default function Pages() {




  return (
   <>
      {/* <Suspense>
   
                       <Promo/>
                       </Suspense> */}
<Hero/>
<Products />
<ProductsFreeShipping/>
<CategoryCarousel/>
   </>
  );
}
