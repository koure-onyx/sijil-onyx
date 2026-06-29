import { ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorPayload: ApiError = {
      message: `HTTP error! status: ${res.status}`,
      status: res.status,
    };
    try {
      errorPayload = await res.json();
    } catch (_) {
      // Fallback if response is not standard JSON
    }
    throw errorPayload;
  }
  return res.json() as Promise<T>;
}

export const apiClient = {
  async get<T>(endpoint: string, config?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...config,
    });
    return parseResponse<T>(res);
  },
  
  async post<T>(endpoint: string, body: unknown, config?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
    return parseResponse<T>(res);
  }
};
