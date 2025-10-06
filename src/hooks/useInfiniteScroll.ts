// createUsersInfiniteQueryOptions.ts
import { infiniteQueryOptions } from "@tanstack/react-query"
import { ApiResponse } from "@/hooks/actions/useProducts"

export default function createUsersInfiniteQueryOptions(getProducts: (params: { page: number }) => Promise<ApiResponse>) {
  return infiniteQueryOptions({
    queryKey: ["products"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getProducts({ page: pageParam })
      return res
    },
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta?.pagination
      if (!meta) return undefined
      return meta.currentPage < meta.lastPage ? meta.currentPage + 1 : undefined
    },
  })
}
