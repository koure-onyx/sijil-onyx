import { ApiErrorResponse } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ApiErrorResponse = {
      message: "An unexpected network error occurred.",
      status: response.status,
    }
    try {
      errorData = await response.json()
    } catch (_) {
      // Fallback if response is not valid JSON
    }
    throw errorData
  }
  return response.json() as Promise<T>
}

export const apiClient = {
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    })
    return handleResponse<T>(response)
  },

  async post<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    })
    return handleResponse<T>(response)
  }
}
