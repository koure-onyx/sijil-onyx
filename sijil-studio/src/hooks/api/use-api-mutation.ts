import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

export function useApiMutation<
  TData,
  TVariables
>(
  options: UseMutationOptions<
    TData,
    Error,
    TVariables
  >
) {
  return useMutation(options);
}
