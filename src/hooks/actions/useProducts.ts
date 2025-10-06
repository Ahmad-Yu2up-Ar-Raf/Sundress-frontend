import { Meta, ProductResponse } from '@/types';
import axios from '@/lib/axios';
import { ProductsSchema } from '@/lib/validations/index.t';
export interface ApiResponse {
  status: boolean;
 
  message: string;
  meta?: Meta;
  data?: ProductsSchema[];
 
}


type componentsProps = {
   params: { 
    page?: number; 
    perPage?: number; 
    search?: string; 
    status?: string | string[] 
    category?: string | string[] 
  } 
}

export const useProducts = () => {
  const getProducts = async ({ params } : componentsProps): Promise<ProductResponse> => {
    try {
      
      const { page = 1, perPage = 12, search, status  , category} = params;
      const res = await axios.get<ProductResponse>('/api/products', {
        params: {
          page,
          perPage,
          
          search: search ?? undefined,
          status: Array.isArray(status) ? status.join(',') : status ?? undefined,
          category: Array.isArray(category) ? category.join(',') : category ?? undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  };

  return { getProducts };
};