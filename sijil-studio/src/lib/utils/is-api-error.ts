import { ApiException } from "@/lib/api";

export function isApiError(
  error: unknown
): error is ApiException {
  return error instanceof ApiException;
}
