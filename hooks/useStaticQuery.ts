import { useQuery, QueryKey, UseQueryOptions } from "@tanstack/react-query";


export function useStaticQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  key: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey: key,
    queryFn,
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 72, // 72h retention
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    ...options,
  });
}
