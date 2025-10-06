"use client"

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';



import React from 'react'
import LogoCloudDemoPage from '@/components/ui/fragments/animations/marquee-brands';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/fragments/button';
import { cn } from '@/lib/utils';
import {  BouncingDots } from '@/components/molecule-ui/bouncing-dots';
import { Spinner } from '@/components/ui/fragments/spinner';


interface MarqueeProps {
  icon?: React.ReactNode;
  text: string;

}

const Marquee : MarqueeProps[] = [
  {
    text: "Short supply chain",
  },
   {
   text: "Sustainable materials",
   },
   {
    text: "Ethical production",
   }
]

interface SectionData {
  text: string;
  img: string;
}

interface AnimatedSectionsProps {
  sections?: SectionData[];
  className?: string;
  headerTitle?: string;
}

const defaultSections: SectionData[] = [
  {
    text: "ORGANIC COMES KNOCKING",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img1.jpeg"
  },
  {
    text: "Ethereal Moments",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img3.jpeg"
  },
  {
    text: "Silent Beauty",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img5.jpeg"
  }
];


const  Hero: React.FC<AnimatedSectionsProps> = ({
  sections = defaultSections,
  className = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<any>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const splitHeadingsRef = useRef<SplitText[]>([]);
    const currentIndexRef = useRef<number>(-1);
    const animatingRef = useRef<boolean>(false);
    const sectionsRefs = useRef<HTMLElement[]>([]);
    const imagesRefs = useRef<HTMLDivElement[]>([]);
    const outerRefs = useRef<HTMLDivElement[]>([]);
    const innerRefs = useRef<HTMLDivElement[]>([]);
    const headingRefs = useRef<HTMLHeadingElement[]>([]);
    const desckripcionRefs = useRef<HTMLParagraphElement[]>([]);
    const counterCurrentRef = useRef<HTMLSpanElement | null>(null);
    const counterNextRef = useRef<HTMLSpanElement | null>(null);
    const counterCurrentSplitRef = useRef<SplitText | null>(null);
    const counterNextSplitRef = useRef<SplitText | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    let loaded = 0;
    sections.forEach((section) => {
      const img = new Image();
      img.src = section.img;
      img.onload = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [sections]);
  
    const gotoSection = useCallback((index: number, direction: number) => {
      if (!containerRef.current || animatingRef.current) return;
  
      const sectionsElements = sectionsRefs.current as Element[];
      const images = imagesRefs.current as Element[];
      const outerWrappers = outerRefs.current as Element[];
      const innerWrappers = innerRefs.current as Element[];
  
      const wrap = gsap.utils.wrap(0, sectionsElements.length);
      index = wrap(index);
      animatingRef.current = true;
  
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
  
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animatingRef.current = false;
        }
      });
  
      timelineRef.current = tl;
  
      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
        tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor })
          .set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 });
      }
  
      gsap.set(sectionsElements[index], { autoAlpha: 1, zIndex: 1 });
  
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          xPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor)
        },
        { xPercent: 0 },
        0
      )
        .fromTo(
          images[index],
          { xPercent: 15 * dFactor },
          { xPercent: 0 },
          0
        );
  
      if (splitHeadingsRef.current[index] && splitHeadingsRef.current[index].lines) {
        const lines = splitHeadingsRef.current[index].lines;
  
        gsap.set(lines, {
          opacity: 0,
          yPercent: 100
        });
  
        tl.to(
          lines,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: {
              each: 0.1,
              from: 'start'
            }
          },
          0.4
        );
      }
  
      if (counterCurrentRef.current && counterNextRef.current) {
        if (!counterCurrentSplitRef.current) {
          counterCurrentSplitRef.current = new SplitText(counterCurrentRef.current, {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines'
          });
        }
  
        counterNextRef.current.textContent = String(index + 1);
        gsap.set(counterNextRef.current, { opacity: 1 });
  
        if (counterNextSplitRef.current) {
          counterNextSplitRef.current.revert();
          counterNextSplitRef.current = null;
        }
        counterNextSplitRef.current = new SplitText(counterNextRef.current, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines'
        });
  
        const currentLines = counterCurrentSplitRef.current?.lines || [];
        const nextLines = counterNextSplitRef.current?.lines || [];
  
        gsap.set(currentLines, { opacity: 1, yPercent: 0 });
        gsap.set(nextLines, { opacity: 1, yPercent: 100 * dFactor });
  
        tl.to(
          currentLines,
          {
            yPercent: -100 * dFactor,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'start' }
          },
          0.4
        );
        tl.to(
          nextLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'start' }
          },
          0.4
        ).add(() => {
          if (counterCurrentSplitRef.current) {
            counterCurrentSplitRef.current.revert();
            counterCurrentSplitRef.current = null;
          }
          if (counterNextSplitRef.current) {
            counterNextSplitRef.current.revert();
            counterNextSplitRef.current = null;
          }
          if (counterCurrentRef.current && counterNextRef.current) {
            counterCurrentRef.current.textContent = counterNextRef.current.textContent;
          }
          gsap.set(counterNextRef.current, { opacity: 0, clearProps: 'all' });
        });
      }
  
      currentIndexRef.current = index;
      setCurrentIndex(index);
    }, []);
  
    useGSAP(() => {
    if (!containerRef.current || !imagesLoaded) return;
  
      gsap.registerPlugin(Observer, SplitText);
  
      const headings = headingRefs.current as HTMLElement[];
      // const descripcion = desckripcionRefs.current as HTMLElement[];
      const outerWrappers = outerRefs.current as Element[];
      const innerWrappers = innerRefs.current as Element[];
  
      splitHeadingsRef.current = headings.map(
        (heading) =>
          new SplitText(heading, {
            type: 'lines',
            linesClass: 'line',
            mask: 'lines'
          })
      );
      // splitHeadingsRef.current = descripcion.map(
      //   (heading) =>
      //     new SplitText(heading, {
      //       type: 'lines',
      //       linesClass: 'line',
      //       mask: 'lines'
      //     })
      // );
  
      gsap.set(outerWrappers, { xPercent: 100 });
      gsap.set(innerWrappers, { xPercent: -100 });
  
      // observerRef.current = Observer.create({
      //   type: 'wheel,touch,pointer',
      //   wheelSpeed: -1,
      //   onDown: () => {
      //     if (!animatingRef.current) {
      //       gotoSection(currentIndexRef.current - 1, -1);
      //     }
      //   },
      //   onUp: () => {
      //     if (!animatingRef.current) {
      //       gotoSection(currentIndexRef.current + 1, 1);
      //     }
      //   },
      //   tolerance: 10,
      //   preventDefault: true
      // });
  
      gotoSection(0, 1);
  
      return () => {
        if (observerRef.current) {
          observerRef.current.kill();
          observerRef.current = null;
        }
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        splitHeadingsRef.current.forEach((split) => {
          if (split && typeof split.revert === 'function') {
            split.revert();
          }
        });
        splitHeadingsRef.current = [];
        if (counterCurrentSplitRef.current && typeof counterCurrentSplitRef.current.revert === 'function') {
          counterCurrentSplitRef.current.revert();
          counterCurrentSplitRef.current = null;
        }
        if (counterNextSplitRef.current && typeof counterNextSplitRef.current.revert === 'function') {
          counterNextSplitRef.current.revert();
          counterNextSplitRef.current = null;
        }
      };
    }, { scope: containerRef, dependencies: [sections.length, imagesLoaded] });
  
  return (
  <section  className=" w-full  px-4 lg:min-h-dvh flex flex-col  content-start   relative items-center   rounded-lg ">

<div className=" rounded-t-2xl   relative w-full flex  content-center items-end  bg-secondary  overflow-hidden">

<div className=" rounded-b-2xl  relative w-full  h-[40svh] md:h-[85lvh] flex  content-center items-end  bg-secondary  overflow-hidden ">
  <div className="absolute  right-1/2 left-1/2  transform -translate-1/2 top-1/2 bottom-1/2 ">

   <Spinner className=' size-12 text-primary'/>
  </div>
    <div 
      ref={containerRef}
      className={`h-full    w-full overflow-hidden  text-white  ${className}`}
    >
      {/* Section preview thumbnails */}
      <div className=" sr-only absolute bottom-4  sm:left-1/4 md:left-1/5 left-1/3 lg:right-6 z-30 flex flex-col md:flex-row items-center gap-4">
  
        <div className="flex gap-2">
          {sections.map((section, i) => (
            <div
              key={`thumb-${i}`}
              className="w-12 h-8 rounded overflow-hidden relative cursor-pointer transition-transform duration-300"
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const direction = i > currentIndex ? 1 : -1;
                  gotoSection(i, direction);
                }
              }}
            >
              <img
                src={section.img}
                alt={`Section ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div 
                 className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
                   currentIndex !== i ? 'opacity-50' : 'opacity-0'
                 }`} 
               />
            </div>
          ))}
        </div>
        
        {/* Counter */}
        <div className="text-xs md:text-sm tracking-wider flex items-center gap-1">
          <div className="relative overflow-hidden h-[1em] leading-[1em] min-w-[0.8em]">
            <span ref={counterCurrentRef} className="block">1</span>
            <span ref={counterNextRef} className="block absolute left-0 top-0 opacity-0">2</span>
          </div>
          <span className="opacity-70">/ {sections.length}</span>
        </div>
      </div>

      {sections.map((section, i) => (
        <section 
          key={`section-${i}`} 
          className=" absolute top-0 right-0 h-full w-full invisible"
          ref={(el) => { if (el) sectionsRefs.current[i] = el; }}
        >
          <div className="outer w-full h-full overflow-hidden" ref={(el) => { if (el) outerRefs.current[i] = el; }}>
            <div className="inner w-full h-full overflow-hidden" ref={(el) => { if (el) innerRefs.current[i] = el; }}>
              <div
                className="bg flex items-center   px-10 md:px-10 lg:px-20  absolute top-0 h-full w-full bg-cover bg-center"
                ref={(el) => { if (el) imagesRefs.current[i] = el; }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%), url("${section.img}")`
                }}
              >
              
 <header className=' max-w-xs w-full m-auto  md:max-w-xl text-center flex flex-col  gap-y-1.5 md:gap-y-5  '>

                <h2 className="section-heading md:text-6xl line-clamp-2  uppercase text-white   font-extrabold  text-[3svh] leading-none z-10" ref={(el) => { if (el) headingRefs.current[i] = el; }}>
                  {section.text}
                </h2>
                <p 
                 ref={(el) => { if (el) desckripcionRefs.current[i] = el; }}
                
                className='    text-accent/70 line-clamp-2   text-[1.5svh] md:text-base '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima iusto asperiores aperiam? Repudiandae suscipit, reprehenderit veritatis eum at officia culpa.</p>
               <div className="  mt-3 md:mt-6  w-fit m-auto gap-4 flex items-center ">

                <Link href={'/products'}  className={cn(buttonVariants({ variant: "default" }) , '  font-bold  uppercase m-auto  text-xs md:text-sm   w-fit  md:py-6  md:px-8'  )}>
                Order Now
                </Link>
                <Link href={'/products'} className={cn(buttonVariants({ variant: "secondary" }) , '  font-bold uppercase m-auto text-xs md:text-sm   w-fit md:py-6  md:px-8'  )}>
                Make Shop
                </Link>
               </div>
 </header>


           
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
</div>
</div>
     <div className="  flex justify-center gap-5 py-2  md:py-7  bg-secondary rounded-b-2xl w-full ">
<div className=" overflow-x-hidden max-w-6xl  m-auto w-full">

<LogoCloudDemoPage/>
</div>
     </div>
  </section>

  )
}

export default Hero
