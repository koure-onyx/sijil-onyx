export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
