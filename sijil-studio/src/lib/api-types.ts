/**
 * SIJIL API Type Definitions
 * Based on docs/frontend-discovery/03-api-models.md
 */

// Certificate Types
export interface Certificate {
  id: string;
  issuerId: string;
  recipientId: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'revoked' | 'expired' | 'pending';
  metadata: Record<string, unknown>;
  certificateHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateFilters {
  status?: Certificate['status'];
  issuerId?: string;
  recipientId?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// Issuer Types
export interface Issuer {
  id: string;
  name: string;
  organization: string;
  verified: boolean;
  email: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
}

// Recipient Types
export interface Recipient {
  id: string;
  name: string;
  email: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
}

// Generic API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  success: boolean;
  message?: string;
  timestamp: string;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'issuer' | 'recipient' | 'viewer';
  verified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'issuer' | 'recipient';
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  status: number;
}
