export interface DataFile {
    mediaType: "image" | "video"
    webViewLink: string
}


export interface Filters {
    search?: string;
    status?: string[] | string;
    
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
    [key: string]: unknown;
}

export interface Meta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
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