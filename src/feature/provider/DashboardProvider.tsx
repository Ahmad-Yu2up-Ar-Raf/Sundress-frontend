'use client';

import { useAuth } from "@/hooks/useAuth";

import { redirect } from "next/navigation";






const DashboardProviders = ({ children }: { children: React.ReactNode }) => {
 
  const { user } = useAuth({ middleware: 'auth'  })

  if (!user) {
    redirect("/sign-in");
  }

    return (
<>

{children}
</>
                       
    );
};

export default DashboardProviders;