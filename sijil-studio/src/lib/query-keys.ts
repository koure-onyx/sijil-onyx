/**
 * TanStack Query Keys Factory
 * Structured query keys for caching and invalidation
 * Following TanStack Query v5 best practices
 */

export const queryKeys = {
  // Certificate queries
  certificates: {
    all: ['certificates'] as const,
    list: (filters?: { status?: string; issuerId?: string; recipientId?: string }) =>
      [...queryKeys.certificates.all, 'list', filters] as const,
    details: (id: string) => [...queryKeys.certificates.all, 'details', id] as const,
    byIssuer: (issuerId: string) => [...queryKeys.certificates.all, 'byIssuer', issuerId] as const,
    byRecipient: (recipientId: string) =>
      [...queryKeys.certificates.all, 'byRecipient', recipientId] as const,
  },

  // Issuer queries
  issuers: {
    all: ['issuers'] as const,
    list: () => [...queryKeys.issuers.all, 'list'] as const,
    details: (id: string) => [...queryKeys.issuers.all, 'details', id] as const,
    verified: () => [...queryKeys.issuers.all, 'verified'] as const,
  },

  // Recipient queries
  recipients: {
    all: ['recipients'] as const,
    list: () => [...queryKeys.recipients.all, 'list'] as const,
    details: (id: string) => [...queryKeys.recipients.all, 'details', id] as const,
  },

  // Auth queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
};

export type QueryKey = ReturnType<(typeof queryKeys.certificates | typeof queryKeys.issuers | typeof queryKeys.recipients | typeof queryKeys.auth)['all']>;
