import { LucideIcon, ShoppingCart, Store , } from "lucide-react";

export interface OptionItem {
 value: string;
  label: string;
  icon?: LucideIcon;
  subLabel?: string;
  description?: string;
  [key: string]: string | undefined | LucideIcon;
  }
  
  export interface GroupedOptions {
    [key: string]: OptionItem[];
  }
  

  export const RoleUser: OptionItem[] = [
    { value: 'seller', label: 'Seller' , icon: Store , subLabel : 'Selling' , desckription : 'You can create, update, delete products'  },
    { value: 'buyer', label: 'Buyer' , icon : ShoppingCart  , subLabel : 'Buying'  , desckription : 'You can buy products'  },

    
  ];









  export const RoleUserValue: string[] = RoleUser.map(function(item) {
    return item['value'];
  });