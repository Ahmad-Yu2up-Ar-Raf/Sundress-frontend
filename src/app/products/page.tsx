

// import { Suspense } from "react";

import ProductsHeader from "@/components/ui/fragments/ProductsHeader";
import InfiniteScrollDemo from "@/feature/section/products.tsx";




export default function Pages() {




  return (
   <>

    <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className="  min-h-svh  items-center space-y-5 xl:space-y-8  max-w-6xl m-auto">
<ProductsHeader/>
<InfiniteScrollDemo/>
  </div>
        </section>
   </>
  );
}
