import { queryOptions } from "@tanstack/react-query"
import { ApiResponse } from "@/hooks/actions/useProducts"

export default function createUsersQueryOptions(getProducts: () => Promise<ApiResponse>) {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data.data,
  })
}
