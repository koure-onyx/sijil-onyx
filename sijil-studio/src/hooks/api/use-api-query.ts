import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export function useApiQuery<T>(
  options: UseQueryOptions<T>
) {
  return useQuery(options);
}
