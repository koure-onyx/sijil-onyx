import { AxiosResponse } from "axios";

export function unwrap<T>(
  response: AxiosResponse<T>
) {
  return response.data;
}
