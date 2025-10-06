'use client';

import { Toaster } from '@/components/ui/fragments/sonner';
import { ProgressProvider } from '@bprogress/next/app';
import { AnimatePresence } from 'framer-motion';
import SiteFooter from '../layout/SiteFooter';
import { SiteHeader} from '../layout/SiteHeader';
import ReactLenis from 'lenis/react'


import ReactQueryProvider from '@/lib/ReactQueryProvider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import { TooltipProvider } from '@/components/animate-ui/primitives/base/tooltip';
import SignInModal from '../auth/components/SignInModal';
import { ModalProvider } from './ContextProvider';



const Providers = ({ children }: { children: React.ReactNode }) => {
 const isMobile = useIsMobile()
const disable = ["/",   '/products']
  const paths = usePathname()

    return (
        <ReactQueryProvider>

        <ReactLenis root>
            <ModalProvider>

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
                 <TooltipProvider>

      <SignInModal/>
                {  disable.includes(paths) && (

                       <SiteHeader 
                       isMobile={isMobile}
                        key="nav-content-header" 
                       paths={paths}/>
                )}
                    <div 
                        key="main-content" 
                        className={cn("relative  min-h-dvh w-full overflow-x-hidden  content-center" ,

                            disable.includes(paths) && '  py-5 '
                        )}
                    >
                        <div className={cn("mx-auto flex flex-col gap-10     h-full w-full", 



                        ) }>
                            {children}
                        </div>
                    </div>
                    
                           </TooltipProvider>
                </AnimatePresence>
    
                
                <SiteFooter/>
             
                <Toaster position="top-center"/>
            </ProgressProvider>
            </ModalProvider>
        </ReactLenis>
        </ReactQueryProvider>
    );
};

export default Providers;