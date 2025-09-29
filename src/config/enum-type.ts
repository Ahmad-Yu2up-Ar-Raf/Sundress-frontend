import { LucideIcon, ShoppingBag, Store } from "lucide-react";

export interface OptionItem {
    value: string;
    label: string;
    country?: string;
    icon?: LucideIcon
    subLabel?: string;
    desckription?: string;  
    [key: string]: string | undefined | LucideIcon;
  }
  
  export interface GroupedOptions {
    [key: string]: OptionItem[];
  }
  

  export const RoleUser: OptionItem[] = [
    { value: 'seller', label: 'Seller' , icon: Store , subLabel : 'Selling' , desckription : 'You can create, update, delete products'  },
    { value: 'customer', label: 'Customer' , icon : ShoppingBag  , subLabel : 'Buying'  , desckription : 'You can buy products'  },

    
  ];


  export const RoleUserValue: string[] = RoleUser.map(function(item) {
    return item['value'];
  });