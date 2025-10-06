




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

  {children}
        </>
    )
}