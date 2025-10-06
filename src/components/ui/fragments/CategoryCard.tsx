
import React from 'react'
import MediaItem from './MediaItem'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'

import { OptionItem } from '@/config/enum/CategoryProductsStatus'

type CatagotyProps = {
  CategoryData : OptionItem
}

function CategoryCard({ CategoryData}: CatagotyProps) {
  const props = CategoryData
  return (
    <Card className={cn('group   cursor-pointer   rounded-lg overflow-hidden bg-background  p-0 min-h-[7.7svh] shadow-none border-0  w-full  relative ' ,

        props.className
    )}>

<CardContent className=' p-0  z-40 w-full h-full absolute shadow-none' >


        <MediaItem
           webViewLink={props?.image!}
          className="  brightness-40  group-hover:scale-110  transition-all duration-300 ease-out      object-center  object-cover w-full h-full"
     
          />
  
</CardContent>

   
<CardHeader className="text-lg w-full px-3  text-white bottom-2.5 absolute z-50   line-clamp-2  ">
 
<CardTitle className=" ">{props.label}</CardTitle>
      </CardHeader>

    </Card>
  )
}

export default CategoryCard