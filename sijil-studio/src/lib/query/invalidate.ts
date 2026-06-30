import { queryClient } from "./client";

export async function invalidate(
  key: readonly unknown[]
) {
  await queryClient.invalidateQueries({
    queryKey: key,
  });
}
