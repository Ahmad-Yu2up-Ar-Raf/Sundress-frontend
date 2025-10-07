import { Meta, paramsProps, ProductResponse } from '@/types';
import axios from '@/lib/axios';


export const useProducts = () => {
  const getProducts = async ({ params } : paramsProps): Promise<ProductResponse> => {
    try {
      
      const { page = 1, perPage = 12, search, status  , category , free_shipping} = params;
      const res = await axios.get<ProductResponse>('/api/products', {
        params: {
          page,
          perPage,
            
          search: search ?? undefined,
          status: Array.isArray(status) ? status.join(',') : status ?? undefined,
          category: Array.isArray(category) ? category.join(',') : category ?? undefined,
          free_shipping: free_shipping ?? false,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  };

  return { getProducts };
};