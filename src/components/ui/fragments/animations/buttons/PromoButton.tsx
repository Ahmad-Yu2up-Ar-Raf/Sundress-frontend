import React from 'react'
import { Button } from '../../button'

function PromoButton({ onClick } : { onClick?: () => void }) {
  return (
    <>
    <Button 
            onClick={onClick }
              className=' outline outline-red-400  text-lg py-[4svh] tracking-tight lg:w-fit bg-primary/90 font-extrabold w-full hover:bg-primary/100   border-4 border-red-400  rounded-full justify-center overflow-hidden transition group inline-flex relative duration-300 ease-out  '
            >
                   <div className='inline-flex  h-12 translate-x-0 items-center justify-center transition group-hover:-translate-x-[150%] lg:py-7 lg:px-8'>         Bergabung Sekarang       </div>
             <div className='absolute lg:py-7 lg:px-8 inline-flex h-12 w-full translate-x-[100%] items-center justify-center bg-yellow-300 px-6 text-red-600 transition duration-300 group-hover:translate-x-0'>         Bergabung Sekarang       </div> 
            </Button>

    </>
  )
}

export default PromoButton



"const ButtonHoverLeftFlip = () => { return (   <>       </> );\n};\n\nexport default ButtonHoverLeftFlip;"