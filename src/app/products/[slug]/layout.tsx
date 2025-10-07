import ProductsHeader from "@/components/ui/fragments/ProductsHeader";





export default async function DashboardLayout({
    children,
    params,
  }: Readonly<{
    params: Promise<{ slug:   string  }>
    children: React.ReactNode;
  }>) {

   const { slug } = await params
    






       
    return(
        <>
 <section  className=' w-full min-h-dvh   content-start items-start   relative   '> 
    <div className="  min-h-svh  items-center space-y-5 xl:space-y-8  max-w-6xl m-auto">
<ProductsHeader title={slug}/>
{children}
  </div>
        </section>

        </>
    )
}