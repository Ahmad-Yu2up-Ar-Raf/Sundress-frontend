'use client';

import { Toaster } from '@/components/ui/fragments/sonner';
import { ProgressProvider } from '@bprogress/next/app';
import { AnimatePresence } from 'framer-motion';
import SiteFooter from '../layout/SiteFooter';
import SiteHeader from '../layout/SiteHeader';
import ReactLenis from 'lenis/react'


import ReactQueryProvider from '@/lib/ReactQueryProvider';


const Providers = ({ children }: { children: React.ReactNode }) => {
 

    return (
        <ReactQueryProvider>

        <ReactLenis root>
            <ProgressProvider 
                height="2px"
                color="var(--primary)"
                options={{ 
                    showSpinner: false,
                    minimum: 0.3,
                    easing: 'ease',
                    speed: 200,
                }}
                shallowRouting
            >


                <AnimatePresence mode='wait'>
                    <div 
                        key="main-content" 
                        className="relative min-h-svh p-5 w-full content-center"
                    >
                        <div className="mx-auto relative  max-w-5xl w-full">
                            {children}
                        </div>
                    </div>
                </AnimatePresence>
    
                
                <SiteFooter/>
                <SiteHeader/>
                <Toaster/>
            </ProgressProvider>
        </ReactLenis>
        </ReactQueryProvider>
    );
};

export default Providers;