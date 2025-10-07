export interface DataFile {
    mediaType: "image" | "video"
    webViewLink: string
}


export interface Filters {
    search?: string;
    status?: string[] | string;
    category?: string[] | string
    [key: string]: unknown;
}

// export interface DataCard { 
//     title: string;
//     description: string;
//     value: number;
//     icon: LucideIcon;
//    label?: string;
//   }
  

export interface PaginatedData {
  
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
     hasMore: boolean;
    [key: string]: unknown;
}


  
  export interface ProductResponse {
    status: boolean;
    message: string;
    data: ProductsSchema[];
    meta: Meta;
  }


export interface Meta {
    filters : Filters
    pagination : PaginatedData
}

export interface ApiResponse {
  status: boolean;
 
  message: string;
  meta?: Meta;
  data?: ProductsSchema[];
 
}


export type paramsProps = {
   params: { 
    page?: number; 
    perPage?: number; 
    search?: string; 
    status?: string | string[] 
    category?: string | string[] 
    free_shipping? : boolean
  } 
}
