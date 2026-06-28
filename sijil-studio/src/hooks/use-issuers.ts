'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import api from '@/lib/api/client';
import type { Issuer } from '@/lib/api-types';

/**
 * Hook to fetch all issuers
 */
export function useIssuers() {
  return useQuery({
    queryKey: queryKeys.issuers.list(),
    queryFn: async () => {
      const response = await api.getPaginated<Issuer>('/issuers');
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

/**
 * Hook to fetch a single issuer by ID
 */
export function useIssuer(id: string) {
  return useQuery({
    queryKey: queryKeys.issuers.details(id),
    queryFn: async () => {
      const response = await api.get<Issuer>(`/issuers/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to verify an issuer
 */
export function useVerifyIssuer(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch<Issuer>(`/issuers/${id}/verify`, { verified: true });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.issuers.details(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.issuers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.issuers.verified() });
    },
  });
}
