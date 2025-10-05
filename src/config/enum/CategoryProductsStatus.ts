import {
  LucideIcon,
  Smartphone,
  Shirt,
  Utensils,
  BookOpen,
  Home,
  Sparkles,
  Dumbbell,
  ToyBrick,
} from "lucide-react";

export interface OptionItem {
  value: string;
  label: string;
  icon?: LucideIcon;
  subLabel?: string;
  description?: string;
  [key: string]: string | undefined | LucideIcon;
}

export enum CategoryProductsStatus {
  Electronics = "electronics",
  Fashion = "fashion",
  Food = "food",
  Books = "books",
  Home = "home",
  Beauty = "beauty",
  Sports = "sports",
  Toys = "toys",
}

export const CategoryProductsOptions: OptionItem[] = [
  {
    value: CategoryProductsStatus.Electronics,
    label: "Electronics",
    icon: Smartphone,
    subLabel: "Gadgets & Devices",
    description: "Smartphones, laptops, and other electronic devices.",
  },
  {
    value: CategoryProductsStatus.Fashion,
    label: "Fashion",
    icon: Shirt,
    subLabel: "Style & Apparel",
    description: "Clothing, shoes, and accessories for all genders.",
  },
  {
    value: CategoryProductsStatus.Food,
    label: "Food",
    icon: Utensils,
    subLabel: "Snacks & Beverages",
    description: "Delicious foods, drinks, and groceries.",
  },
  {
    value: CategoryProductsStatus.Books,
    label: "Books",
    icon: BookOpen,
    subLabel: "Reading & Learning",
    description: "Novels, education books, and inspirational reads.",
  },
  {
    value: CategoryProductsStatus.Home,
    label: "Home",
    icon: Home,
    subLabel: "Household & Furniture",
    description: "Home decor, furniture, and essential utilities.",
  },
  {
    value: CategoryProductsStatus.Beauty,
    label: "Beauty",
    icon: Sparkles,
    subLabel: "Skincare & Cosmetics",
    description: "Makeup, skincare, and beauty essentials.",
  },
  {
    value: CategoryProductsStatus.Sports,
    label: "Sports",
    icon: Dumbbell,
    subLabel: "Fitness & Outdoor",
    description: "Sportswear, equipment, and fitness tools.",
  },
  {
    value: CategoryProductsStatus.Toys,
    label: "Toys",
    icon: ToyBrick,
    subLabel: "Kids & Collectibles",
    description: "Toys, games, and fun collectibles for all ages.",
  },
];

// Optional: extract values only
export const CategoryProductsValues: string[] = CategoryProductsOptions.map(
  (item) => item.value
);
