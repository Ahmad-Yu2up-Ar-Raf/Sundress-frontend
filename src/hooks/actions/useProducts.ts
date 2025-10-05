// hooks/useProducts.ts
import axios from '@/lib/axios';
import { ProductsSchema } from "@/lib/validations/index.t";
import { Meta } from "@/types";

export interface ApiResponse {
  status: boolean;
  user_idssd: number,
  message: string;
  meta?: Meta;
  data?: ProductsSchema[];
}

export const useProducts = () => {
  const getProducts = async (): Promise<ApiResponse | null> => {
    try {
      const { data } = await axios.get<ApiResponse>('/api/products');
      return data;
    } catch (error: any) {
      console.error('getProducts error:', error?.response?.data || error);
      return null;
    }
  };

  return { getProducts };
};
