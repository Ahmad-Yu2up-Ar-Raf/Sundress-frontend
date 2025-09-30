import DashboardProviders from "@/feature/provider/DashboardProvider";



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
