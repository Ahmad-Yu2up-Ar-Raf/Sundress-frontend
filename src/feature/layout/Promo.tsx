"use client"
import { Button } from "@/components/ui/fragments/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/fragments/dialog"
import MediaItem from '../../components/ui/fragments/MediaItem';
import { DataFile } from '@/types';
import { Badge } from '../../components/ui/fragments/badge';
import { usePromoBanner } from "@/hooks/usePromoBanner";
import { XIcon } from "lucide-react";

import confetti from "canvas-confetti"
import PromoButton from "../../components/ui/fragments/animations/buttons/PromoButton";
import Link from "next/link";
export function Promo() {

const handleClick = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#f2b628", "#ed8a21", "#cf1c13", "#f8deb1"]
    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()
  }
  
  const src = "https://i.pinimg.com/736x/4a/36/3d/4a363d44fb3065a4b18bf627c0817daf.jpg";
  const number : string = "628111187868"
const massage : string = "Halo, Saya tertarik untuk bergabung menjadi mitra Chicago Fried Chicken dan ingin mengetahui lebih lanjut mengenai promo yang sedang berlangsung. Mohon informasi detailnya, terima kasih"
const link : string = `https://api.whatsapp.com/send?phone=${number}&text=${massage}&type=phone_number&app_absent=0`
  const { isShowPromo, isLoading, closePromoBanner } = usePromoBanner(
    'kemitraan-chicago-2024', // ID unik untuk promo ini
    true // Default show banner
  );


  if (isLoading) {
    return null;
  }

  // Jika tidak show promo, jangan render
  if (!isShowPromo) {
    console.log('🚫 Promo banner tidak ditampilkan karena isShowPromo = false');
    return null;
  }

  console.log('✅ Rendering promo banner');

  const handleClose = () => {
    console.log('👆 User clicked close button');
    setTimeout(() => { 
      closePromoBanner();

    }, 300); // Delay untuk animasi jika perlu
  };

  const itemFile: DataFile = {
    webViewLink: src,
    mediaType: "image"
  }


handleClick(); // Jalankan confetti saat komponen dimount

  return (
    <Dialog  defaultOpen >
      <DialogContent 
        
        
        className="max-h-[100ddvh w-full lg:max-h-[44rem] justify-between border-0 h-fit max-w-[90dvw]  lg:max-w-[1180px] overflow-hidden  flex flex-col lg:gap-4  gap-5 items-center lg:items-end  lg:pt-0  lg:pb-5 px-0 shadow-none rounded-none bg-[223] ease-out duration-300  "
      >
        <div className=" p-6 lg:p-0 overflow-hidden rounded-2xl bg-background gap-6 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full lg:order-2  h-full">

        <MediaItem 
          webViewLink={src} 
          className=' lg:max-h-none lg:border-r-8 border-primary lg:rounded-none max-h-[60em] rounded-lg min-h-[70svh] h-full' 
        />
        
        <div className='w-full content-center lg:px-24 justify-center lg:gap-y-8 flex flex-col lg:h-full h-fit gap-y-6.5  lg:gap-15'>
          <article className="space-y-1.5 lg:space-y-6">
            <DialogHeader className='gap-1.5 lg:gap-4'>
              <Badge variant={"outline"} className='font-extrabold lg:text-[0.9em] text-primary'>
                Shop Now
              </Badge>
              <DialogTitle style={{}} className="text-left text-[4.5ddvh leading-10 lg:text-[3.7rem] lg:leading-13 font-extrabold  tracking-tighter lg:tracking-tight lg:uppercase  "> 
                 <span className="  lg:bg-gradient-to-t
from-orange-600
via-orange-400
to-orange-200
lg:bg-clip-text
lg:text-transparent
 lg:drop-shadow-[-4px_4px_0px_rgba(0,0,0,8)]"  > 12.12  </span>
                 <span className="   lg:bg-gradient-to-t
from-amber-700

to-amber-400
lg:bg-clip-text
lg:text-transparent lg:block l lg:drop-shadow-[-4px_4px_0px_rgba(0,0,0,8)]">Flash Sale </span>
              </DialogTitle>
            </DialogHeader>
            <p className=' lg:font-medium racking-tight lg:text-lg text-[2.3sdvh '>
              Gratis biaya pengiriman,
              Gratis bahan baku awal,
              Gratis biaya survey.  <Link href={'/'} className="  underline   text-primary underline-offset-5">Syarat dan ketentuan</Link> berlaku.
            </p>
          </article>
          
          <DialogFooter className="gap-4 bg-transparent flex justify-center lg:justify-normal w-full">
         <PromoButton onClick={() => window.open(link, '_blank')} />
          </DialogFooter>
        </div>
        </div>
        
                  <DialogClose
                   onClick={handleClose}
                    data-slot="dialog-close"
                    className="w-fit   lg:order-1  rounded-lg   cursor-pointer  transition-all duration-200 opacity-70 text-accent hover:opacity-100 dark:bg-neutral-800/90 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100 group lg:gap-3 flex items-center justify-center"
                  >
                    <span className="  lg:text-base  font-medium  underline-offset-2  group-hover:underline">tutup</span>
                    <XIcon className="size-5 hidden lg:inline " />
                  </DialogClose>
              
      </DialogContent>
    </Dialog>
  )
}