import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, LucideIcon, Store, ShoppingCart } from 'lucide-react'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

  DropdownMenuTrigger
} from '@/components/ui/fragments/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/fragments/avatar"
import { useInitials } from '@/hooks/use-initial'
import { User } from '@/hooks/use-auth-store'
import { useAuth } from '@/hooks/actions/useAuth'
import React from 'react'
import { toast } from 'sonner'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface DropdownMenuUserMenuDemoProps {
  label: string
  icon: LucideIcon
  href?: string
  onSelect?: () => void
}


interface groupItems {
   name: string
   dataGroup?: DropdownMenuUserMenuDemoProps[]
}

const DropdownMenuUserMenuDemo = ({ profile }: { profile : User}) => {


  const baseURL = profile.role === 'seller' ? '/my-shop' : '${baseURL}'
const listItems : groupItems[] = [
  {
    name: "Profile",
    dataGroup: [
      { label: 'Profile', icon: UserIcon, href: `${baseURL}/profile` },
      { label: 'Settings', icon: SettingsIcon, href: `${baseURL}/settings` },
    ]
  },
  {
    name: "buyer",
    dataGroup: [
      { label: 'Cart', icon: ShoppingCart, href: `${baseURL}/cart` },
      { label: 'Notifications', icon: BellIcon, href: `${baseURL}/notifications` },
    ]
  },
  {
    name: "seller",
    dataGroup: [
      { label: 'My-Shop', icon: Store, href: `${baseURL}` },
      { label: 'Notifications', icon: BellIcon, href: `${baseURL}/notifications` },
    ]
  },
]

      const { logout} = useAuth()
    const useInitial = useInitials()
  
      const [loading, setLoading] = React.useState(false); 
        const [status, setStatus] = React.useState<string | null>(null)
    async function onSubmitLogOut() {
    try {
      setLoading(true)
      toast.loading("Logout...", { id: "logout" })
      
await logout().then(() => setStatus(null)).finally(() => 
{
  setLoading(false)
 toast.success("Logout successful", { id: "logout" })
}
)


     
    } catch (error) {
      console.error("Log Out error", error)
      toast.error("Network error. Please check your connection.", { id: "logout" })
    } finally {
      setLoading(false)
    }
  }




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='  cursor-pointer'>
      <Avatar>
  <AvatarImage src={profile.avatar}  alt={`${profile.email}`} />
  <AvatarFallback>{useInitial(profile.name)}</AvatarFallback>
</Avatar>
      </DropdownMenuTrigger>
  <DropdownMenuContent      className="w-[--radix-dropdown-menu-trigger-width]    "
  
  
     side={"bottom"}
            align="end"
            sideOffset={4}>
        <DropdownMenuLabel className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={`${profile.avatar}`} alt={`${profile.email}`} />
            <AvatarFallback className='text-xs'>{useInitial(profile.name)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-col'>
            <span className='text-popover-foreground'>{profile.name}</span>
            <span className='text-muted-foreground text-xs'>{profile.email}</span>
          </div>
        </DropdownMenuLabel>
        {listItems.map((group, index) => {
          
   if(group.name !== profile.role && group.name !== "Profile") 
    return null 
   
   
   return(
<div key={index}>
        <DropdownMenuSeparator   key={index}/> 

<>
        <DropdownMenuGroup key={index} >
  {  group.dataGroup?.map((item, i) => {
    return(
  
          <DropdownMenuItem key={i} >
          <Link href={item.href || '#'} className=' flex items-center gap-3  w-full h-full'>  
            <item.icon className={cn(" h-4 w-4")} />
            {item.label}
            </Link>
            </DropdownMenuItem>
       
      )
    })}  
    </DropdownMenuGroup>
</>
      
     
</div>
        )})}
       <DropdownMenuSeparator /> 
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            {profile.role === 'seller' ? (
                    <DropdownMenuItem>
                  <Link href={`/my-shop`} className=' w-full h-full'>  
                 My Shop
                 </Link>
                 </DropdownMenuItem>
            ) : (

              <DropdownMenuItem>
                  <Link href="${baseURL}/cart" className=' w-full h-full'>  
                 Cart
                 </Link>
                 </DropdownMenuItem>
            ) }
          </DropdownMenuSub>
               </DropdownMenuGroup>
                       <DropdownMenuSeparator /> */}
          <DropdownMenuItem 
          className=' cursor-pointer space-x-1.5'
          onSelect={() => onSubmitLogOut()}
          >
            
             <LogOutIcon className={cn("mr-1.5 h-4 w-4")} />
            Log out</DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem> */}
   
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuUserMenuDemo
