/**
 * SIJIL API Client
 * Native fetch-based API client with error handling and retry logic
 */

import type { ApiResponse, ApiError, PaginatedResponse } from '../api-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestConfig extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

class ApiClientError extends Error {
  constructor(
    public code: string,
    public status: number,
    public details?: Record<string, string[]>,
    message?: string
  ) {
    super(message || code);
    this.name = 'ApiClientError';
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get authentication token from storage
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * Base fetch wrapper with error handling and retry logic
 */
async function fetchWithRetry<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    retries = 3,
    retryDelay = 1000,
    headers = {},
    ...restConfig
  } = config;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const token = getAuthToken();
      
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...restConfig,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        throw new ApiClientError(
          errorData.code || 'API_ERROR',
          response.status,
          errorData.details,
          errorData.message
        );
      }

      return data as ApiResponse<T>;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      // Don't retry on client errors (4xx) except 429 (rate limit)
      if (lastError instanceof ApiClientError && lastError.status >= 400 && lastError.status < 500 && lastError.status !== 429) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries - 1) {
        await sleep(retryDelay * Math.pow(2, attempt));
      }
    }
  }

  throw lastError || new ApiClientError('MAX_RETRIES_EXCEEDED', 500, undefined, 'Maximum retry attempts exceeded');
}

/**
 * GET request wrapper
 */
export async function get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return fetchWithRetry<T>(endpoint, { ...config, method: 'GET' });
}

/**
 * POST request wrapper
 */
export async function post<T>(
  endpoint: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return fetchWithRetry<T>(endpoint, {
    ...config,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * PUT request wrapper
 */
export async function put<T>(
  endpoint: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return fetchWithRetry<T>(endpoint, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * PATCH request wrapper
 */
export async function patch<T>(
  endpoint: string,
  body: unknown,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  return fetchWithRetry<T>(endpoint, {
    ...config,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request wrapper
 */
export async function del<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
  return fetchWithRetry<T>(endpoint, { ...config, method: 'DELETE' });
}

/**
 * Paginated GET request wrapper
 */
export async function getPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  config?: RequestConfig
): Promise<PaginatedResponse<T>> {
  const queryString = params
    ? `?${new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ).toString()}`
    : '';

  return fetchWithRetry<T[]>(`${endpoint}${queryString}`, { ...config, method: 'GET' }) as Promise<
    PaginatedResponse<T>
  >;
}

/**
 * Set authentication token
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

/**
 * Clear authentication token
 */
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export { ApiClientError };
export default {
  get,
  post,
  put,
  patch,
  delete: del,
  getPaginated,
  setAuthToken,
  clearAuthToken,
};
