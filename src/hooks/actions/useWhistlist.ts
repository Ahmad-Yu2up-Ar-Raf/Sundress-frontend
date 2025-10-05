// hooks/useWhistlist.ts
import axios from '@/lib/axios';
import { WhistlistSchema,  } from '@/lib/validations/index.t';
import { Meta } from "@/types";

interface ApiResponse {
  status: boolean;
  message: string;
  meta?: Meta;
  data?: WhistlistSchema[];
}
interface ApiResponseAddWhistlist {
  
  message: string;
 
}

export const useWhistlist = () => {
  const getWhistlist = async (): Promise<ApiResponse | null> => {
    try {

      const response = await axios.get<ApiResponse>('/api/whistlist');

    
      console.log('full axios response:', response);
      console.log('response.data:', response.data);

      const payload = (response).data ?? (response);

      return payload as ApiResponse;
    } catch (error) {
      console.error('getWhistlist error:', error ?? error);
      return null;
    }
  };


 const addWhistlist = async (props: WhistlistSchema)  => {
    try {

      
      const response = await axios.post('/api/whistlist', props)

      
  
      
      // Redirect based on role

    return { success: true, message: 'Added successful!' , response }
    } catch (error) {
       return {
        success: false,
        message: error || 'Failed add whistlist',
        errors: error || {}
      }
    }
  }
  return { getWhistlist , addWhistlist };
};
