'use client';


import { RequireRole } from "./require-role";






const DashboardProviders = ({ children }: { children: React.ReactNode }) => {



    return (
<>
    <RequireRole role="buyer">

{children}
    </RequireRole>
</>
                       
    );
};

export default DashboardProviders;