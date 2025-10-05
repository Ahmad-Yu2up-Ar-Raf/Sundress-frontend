import {
  LucideIcon,
  CheckCircle,
  XCircle,
  Clock,
  Package,
} from "lucide-react";

export interface OptionItem {
  value: string;
  label: string;
  icon?: LucideIcon;
  subLabel?: string;
  description?: string;
  [key: string]: string | undefined | LucideIcon;
}

export enum ProductStatus {
  Available = "available",
  Not_Available = "not_available",
  Coming_Soon = "coming_soon",
}

// 🎯 Structured list for UI use
export const ProductStatusOptions: OptionItem[] = [
  {
    value: ProductStatus.Available,
    label: "Available",
    icon: CheckCircle,
    subLabel: "In Stock",
    description: "Product is currently available and ready for purchase.",
  },
  {
    value: ProductStatus.Not_Available,
    label: "Not Available",
    icon: XCircle,
    subLabel: "Out of Stock",
    description: "Product is currently unavailable or sold out.",
  },
  {
    value: ProductStatus.Coming_Soon,
    label: "Coming Soon",
    icon: Clock,
    subLabel: "Upcoming Release",
    description: "Product will be available soon. Stay tuned!",
  },
];

// Optional: Simple list of values
export const ProductStatusValues: string[] = ProductStatusOptions.map(
  (item) => item.value
);
