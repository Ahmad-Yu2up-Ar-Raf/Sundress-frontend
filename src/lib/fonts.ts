import {
    Geist,
    Geist_Mono,
    Instrument_Sans,
    Inter,
    Outfit,
    Mulish,
    Nunito,
    Source_Serif_4,
   Delius_Swash_Caps,
    Noto_Sans_Mono,
    Bangers
  } from 'next/font/google';
  import localFont from "next/font/local";
  import { cn } from '@/lib/utils';
  
  const fontSans = Source_Serif_4({
    subsets: ['latin'],
    variable: '--font-sans'
  });
  const fontOutfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit'
  });
  const fontDelius = Delius_Swash_Caps({
    subsets: ['latin'],
    variable: '--font-delius',
    weight: '400'
  });
  
  const fontBanger = Bangers({
    subsets: ['latin'],
    variable: '--font-banger',
    weight: ['400', ]
  });
  
  const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono'
  });
  
  const fontNunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito'
  });
  
  const fontInstrument = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument'
  });
  
  const fontNotoMono = Noto_Sans_Mono({
    subsets: ['latin'],
    variable: '--font-noto-mono'
  });
  
  const fontMullish = Mulish({
    subsets: ['latin'],
    variable: '--font-mullish'
  });
  
  const fontInter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
  });
  
export const fontplayBill = localFont({
    src: "../../public/assets/fonts/playbill.ttf",
    variable: "--font-playbill",
    display: "swap",
});


  export const fontVariables = cn(
    fontSans.variable,
    fontBanger.variable,
    fontMono.variable,
    fontInstrument.variable,
    fontNotoMono.variable,
    fontMullish.variable,
    fontInter.variable,
    fontNunito.variable,
    fontDelius.variable,
    fontOutfit.variable,
    fontplayBill.variable
  );