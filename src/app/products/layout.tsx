import ProductsHeader from "@/components/ui/fragments/ProductsHeader";





export default async function DashboardLayout({
    children,
  
  }: Readonly<{

    children: React.ReactNode;
  }>) {








       
    return(
     <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className="  min-h-svh  items-center space-y-5 xl:space-y-8  max-w-5xl m-auto">
<ProductsHeader/>
  {children}
  </div>
        </section>
    )
}