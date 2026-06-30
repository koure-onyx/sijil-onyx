import { AxiosError } from "axios";
import { api } from "./client";
import { ApiException } from "./errors";

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    const status = error.response?.status ?? 500;

    throw new ApiException(
      status,
      error.response?.data?.message ??
        error.message ??
        "Unknown Error"
    );
  }
);
