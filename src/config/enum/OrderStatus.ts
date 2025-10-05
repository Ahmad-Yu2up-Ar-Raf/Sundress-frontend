import { LucideIcon, ShoppingCart, Store ,  Clock,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
  RotateCcw, } from "lucide-react";

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
  





export enum OrderStatus {
  Pending = "pending",
  Paid = "paid",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
  Refunded = "refunded",
}

// 🧩 Structured List for UI use
export const OrderStatusOptions: OptionItem[] = [
  {
    value: OrderStatus.Pending,
    label: "Pending",
    icon: Clock,
    subLabel: "Awaiting Payment",
    description: "Order has been placed but not yet paid.",
  },
  {
    value: OrderStatus.Paid,
    label: "Paid",
    icon: CheckCircle,
    subLabel: "Payment Confirmed",
    description: "Order payment has been successfully received.",
  },
  {
    value: OrderStatus.Processing,
    label: "Processing",
    icon: Package,
    subLabel: "Preparing Order",
    description: "Seller is preparing your order for shipment.",
  },
  {
    value: OrderStatus.Shipped,
    label: "Shipped",
    icon: Truck,
    subLabel: "On The Way",
    description: "Order has been shipped and is on its way to you.",
  },
  {
    value: OrderStatus.Delivered,
    label: "Delivered",
    icon: Home,
    subLabel: "Order Complete",
    description: "Your order has been successfully delivered.",
  },
  {
    value: OrderStatus.Cancelled,
    label: "Cancelled",
    icon: XCircle,
    subLabel: "Order Stopped",
    description: "Order was cancelled by customer or seller.",
  },
  {
    value: OrderStatus.Refunded,
    label: "Refunded",
    icon: RotateCcw,
    subLabel: "Payment Returned",
    description: "Payment has been refunded to the buyer.",
  },
];

// Optional: Array of string values
export const OrderStatusValues: string[] = OrderStatusOptions.map((item) => item.value);