import React from 'react'
import { SkeletonCard } from './CardSkeletons'

function SkeletonProducts() {
  return (
    <div className="  ml-4 grid grid-cols-2 tracking-tight md:grid-cols-3 gap-4 lg:grid-cols-4">
            
    <SkeletonCard/>
    <SkeletonCard/>
    <SkeletonCard/>
    <SkeletonCard/>
  
   </div> 
  )
}

export default SkeletonProducts