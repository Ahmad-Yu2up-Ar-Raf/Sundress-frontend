import { Meta, ProductResponse } from '@/types';
import axios from '@/lib/axios';
import { ProductsSchema } from '@/lib/validations/index.t';
export interface ApiResponse {
  status: boolean;
 
  message: string;
  meta?: Meta;
  data?: ProductsSchema[];
  nextPage?: number;
  hasMore?: boolean;
}

export const useProducts = () => {
  const getProducts = async (params: { 
    page?: number; 
    perPage?: number; 
    search?: string; 
    status?: string | string[] 
  } = {}): Promise<ProductResponse> => {
    try {
      const { page = 1, perPage = 12, search, status } = params;
      const res = await axios.get<ProductResponse>('/api/products', {
        params: {
          page,
          perPage,
          search: search ?? undefined,
          status: Array.isArray(status) ? status.join(',') : status ?? undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  };

  return { getProducts };
};