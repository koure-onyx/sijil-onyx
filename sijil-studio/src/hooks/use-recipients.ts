'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import api from '@/lib/api/client';
import type { Recipient } from '@/lib/api-types';

/**
 * Hook to fetch all recipients
 */
export function useRecipients() {
  return useQuery({
    queryKey: queryKeys.recipients.list(),
    queryFn: async () => {
      const response = await api.getPaginated<Recipient>('/recipients');
      return response;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

/**
 * Hook to fetch a single recipient by ID
 */
export function useRecipient(id: string) {
  return useQuery({
    queryKey: queryKeys.recipients.details(id),
    queryFn: async () => {
      const response = await api.get<Recipient>(`/recipients/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
