'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import api from '@/lib/api/client';
import type { Certificate, CertificateFilters, PaginatedResponse } from '@/lib/api-types';

/**
 * Hook to fetch a list of certificates with pagination and filters
 */
export function useCertificates(filters?: CertificateFilters) {
  return useQuery({
    queryKey: queryKeys.certificates.list(filters),
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (filters?.status) params.status = filters.status;
      if (filters?.issuerId) params.issuerId = filters.issuerId;
      if (filters?.recipientId) params.recipientId = filters.recipientId;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.search) params.search = filters.search;

      const response = await api.getPaginated<Certificate>('/certificates', params);
      return response;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to fetch a single certificate by ID
 */
export function useCertificate(id: string) {
  return useQuery({
    queryKey: queryKeys.certificates.details(id),
    queryFn: async () => {
      const response = await api.get<Certificate>(`/certificates/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to create a new certificate
 */
export function useCreateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>) => {
      const response = await api.post<Certificate>('/certificates', certificateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all });
    },
  });
}

/**
 * Hook to update an existing certificate
 */
export function useUpdateCertificate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certificateData: Partial<Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const response = await api.put<Certificate>(`/certificates/${id}`, certificateData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.details(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all });
    },
  });
}

/**
 * Hook to revoke a certificate
 */
export function useRevokeCertificate(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch<Certificate>(`/certificates/${id}/revoke`, { status: 'revoked' });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.details(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.certificates.all });
    },
  });
}
