import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'



function SiteHeader() {



   const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [delay, setDelay] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
    setDelay(false);

    if (scrollYProgress.get() < 0.05 ) {
      setVisible(true);
    } else {
      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
      
    }
  });
  return (
    <motion.nav 
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: delay ?  0.4 : 0.2,
          delay: delay ? 3 : 0,
        }}
    className='z-50  sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60   flex items-center   '
    >
      
    </motion.nav>
  )
}

export default SiteHeader
