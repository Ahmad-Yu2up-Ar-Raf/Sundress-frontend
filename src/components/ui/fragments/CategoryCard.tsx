
import React from 'react'
import MediaItem from './MediaItem'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'

import { OptionItem } from '@/config/enum/CategoryProductsStatus'
import Link from 'next/link'

type CatagotyProps = {
  CategoryData : OptionItem
  className?: string
  overlay? : boolean
}

function CategoryCard({ CategoryData , className , overlay}: CatagotyProps) {
  const props = CategoryData
  return (
    <Card className={cn('group   cursor-pointer   rounded-lg overflow-hidden bg-background  p-0 min-h-[4em] shadow-none border-0  w-full  relative ' ,

       className
    )}>
<Link href={`/products/${CategoryData.value}`}>
{overlay ? (

<div
      className={cn('absolute inset-0 z-30  bg-black/70', className)}
      
    />
) : (

<div className='pointer-events-none z-30 absolute inset-x-0 bottom-0 h-4/6 bg-gradient-to-t from-black/90 dark:from-black'></div>
)}
<CardContent className=' p-0  z-20 w-full h-full absolute shadow-none' >


        <MediaItem
           webViewLink={props?.image!}
          className="    group-hover:scale-110  transition-all duration-300 ease-out      object-center  object-cover w-full h-full"
     
          />
  
</CardContent>

   
<CardHeader className="w-full px-3  text-white bottom-1.5 absolute z-40    line-clamp-2  ">
 
<CardTitle className="text-lg  lg:text-xl ">{props.label}</CardTitle>
      </CardHeader>
  
</Link>

    </Card>
  )
}

export default CategoryCard