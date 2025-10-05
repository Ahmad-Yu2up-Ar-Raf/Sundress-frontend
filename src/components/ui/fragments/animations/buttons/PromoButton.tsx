import React from 'react'
import { Button } from '../../button'

function PromoButton({ onClick } : { onClick?: () => void }) {
  return (
    <>
    <Button 
            onClick={onClick } size={"lg"}
              className=' o text-lg py-[4ssvh] tracking-tight lg:w-fit bg-primary/90 font-extrabold w-full lg:py-8 lg:px-9 hover:bg-primary/100  rounded-full justify-center overflow-hidden transition group inline-flex relative duration-300 ease-out  '
            >
                   Bergabung Sekarang      
            </Button>

    </>
  )
}

export default PromoButton



"const ButtonHoverLeftFlip = () => { return (   <>       </> );\n};\n\nexport default ButtonHoverLeftFlip;"