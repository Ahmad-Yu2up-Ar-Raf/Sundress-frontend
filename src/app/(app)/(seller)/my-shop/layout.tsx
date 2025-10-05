import DashboardProviders from "@/feature/provider/MyShopProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <DashboardProviders>
        {children}
    </DashboardProviders>
  );
}
