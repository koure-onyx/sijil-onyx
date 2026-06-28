# Sijil — Frontend Blueprint: State Architecture

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the state management strategy for Sijil, including TanStack Query ownership, Zustand ownership, URL state, form state, caching, invalidation, SSR, and hydration strategies.

---

## State Ownership Matrix

| State Type | Technology | Owner | Lifetime | Persistence |
|------------|------------|-------|----------|-------------|
| Server Data | TanStack Query | Features | Session | Cache (5-30 min) |
| UI State | Zustand | Features | Session | Optional localStorage |
| URL State | Next.js Router | Pages | Navigation | URL params |
| Form State | React Hook Form | Forms | Form session | None |
| Auth State | Zustand + Cookies | Admin | Session | Cookie + Store |

---

## TanStack Query Ownership

### Query Keys Structure

```typescript
// lib/query-keys.ts
export const queryKeys = {
  // Documents
  documents: {
    all: ['documents'] as const,
    list: (filters: DocumentFilters) => ['documents', 'list', filters] as const,
    detail: (id: string) => ['documents', 'detail', id] as const,
    topics: (id: string) => ['documents', 'topics', id] as const,
    aggregates: (id: string) => ['documents', 'aggregates', id] as const,
  },
  
  // Topics
  topics: {
    all: ['topics'] as const,
    bySlug: (slug: string[]) => ['topics', 'slug', slug] as const,
    byId: (id: string) => ['topics', 'id', id] as const,
    content: (id: string) => ['topics', 'content', id] as const,
    assets: (id: string) => ['topics', 'assets', id] as const,
    assessments: (id: string) => ['topics', 'assessments', id] as const,
    page: (id: string) => ['topics', 'page', id] as const,
  },
  
  // Search
  search: {
    all: ['search'] as const,
    topics: (params: SearchParams) => ['search', 'topics', params] as const,
    formulas: (params: FormulaParams) => ['search', 'formulas', params] as const,
    suggestions: (prefix: string) => ['search', 'suggestions', prefix] as const,
    trending: () => ['search', 'trending'] as const,
  },
  
  // Quran
  quran: {
    all: ['quran'] as const,
    surah: (number: number) => ['quran', 'surah', number] as const,
    ayah: (surah: number, ayah: number) => ['quran', 'ayah', surah, ayah] as const,
    range: (surah: number, start: number, end: number) => 
      ['quran', 'range', surah, start, end] as const,
  },
  
  // Exports
  exports: {
    all: ['exports'] as const,
    status: (id: string) => ['exports', 'status', id] as const,
    policies: () => ['exports', 'policies'] as const,
    staleness: (id: string) => ['exports', 'staleness', id] as const,
  },
  
  // Analytics
  analytics: {
    all: ['analytics'] as const,
    platformStats: () => ['analytics', 'platform-stats'] as const,
    popularTopics: () => ['analytics', 'popular-topics'] as const,
    failedSearches: () => ['analytics', 'failed-searches'] as const,
    searchAnalytics: (range: DateRange) => ['analytics', 'search', range] as const,
    topicAnalytics: (range: DateRange) => ['analytics', 'topics', range] as const,
  },
  
  // Admin
  admin: {
    all: ['admin'] as const,
    ingestStatus: (trackingId: string) => ['admin', 'ingest', trackingId] as const,
    importStatus: (batchId: string) => ['admin', 'import', batchId] as const,
    importPreview: (repoUrl: string) => ['admin', 'import', 'preview', repoUrl] as const,
  },
  
  // SEO
  seo: {
    jsonld: (type: 'topic' | 'document', id: string) => ['seo', 'jsonld', type, id] as const,
    aeo: (topicId: string) => ['seo', 'aeo', topicId] as const,
    aeoScore: (topicId: string) => ['seo', 'aeo-score', topicId] as const,
  },
};
```

---

## Default Query Options

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

---

## Per-Feature Query Configuration

### Documents Module

```typescript
// features/documents/hooks/useDocuments.ts
export function useDocuments(filters: DocumentFilters) {
  return useQuery({
    queryKey: queryKeys.documents.list(filters),
    queryFn: () => documentsApi.getList(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for lists
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: queryKeys.documents.detail(id),
    queryFn: () => documentsApi.getById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes for details
  });
}
```

### Topics Module

```typescript
// features/topics/hooks/useTopicContent.ts
export function useTopicContent(topicId: string) {
  return useQuery({
    queryKey: queryKeys.topics.content(topicId),
    queryFn: () => topicsApi.getContent(topicId),
    staleTime: 15 * 60 * 1000, // 15 minutes for content
    initialData: () => {
      // SSR hydration optimization
      return getQueryCache().getQueryData(queryKeys.topics.content(topicId));
    },
  });
}
```

### Search Module

```typescript
// features/search/hooks/useSearch.ts
export function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: queryKeys.search.topics(params),
    queryFn: () => searchApi.searchTopics(params),
    staleTime: 1 * 60 * 1000, // 1 minute for search results
    enabled: !!params.q, // Don't fetch without query
  });
}

export function useSearchSuggestions(prefix: string) {
  return useQuery({
    queryKey: queryKeys.search.suggestions(prefix),
    queryFn: () => searchApi.getSuggestions(prefix),
    staleTime: 5 * 60 * 1000,
    enabled: prefix.length >= 2, // Minimum 2 chars
  });
}
```

### Exports Module (with Polling)

```typescript
// features/exports/hooks/useExportStatus.ts
export function useExportStatus(jobId: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.exports.status(jobId),
    queryFn: () => exportsApi.getStatus(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      if (status === 'complete' || status === 'error') {
        return false; // Stop polling
      }
      return 2000; // Poll every 2 seconds
    },
    enabled,
  });
}
```

---

## Cache Invalidation Strategy

### Mutation-based Invalidation

```typescript
// features/admin/hooks/useSubmitIngest.ts
export function useSubmitIngest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ingestApi.submit,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.documents.all,
      });
    },
  });
}
```

### Targeted Invalidation

```typescript
// After document update
queryClient.invalidateQueries({
  queryKey: queryKeys.documents.detail(documentId),
  exact: true,
});

// Invalidate all document lists
queryClient.invalidateQueries({
  predicate: (query) => 
    query.queryKey[0] === 'documents' && 
    query.queryKey[1] === 'list',
});
```

---

## URL State Ownership

### Search Filters

```typescript
// features/search/hooks/useSearchURL.ts
export function useSearchURL() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const setFilters = (filters: SearchFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/search?${params.toString()}`, { scroll: false });
  };
  
  const clearFilters = () => {
    router.push('/search');
  };
  
  return {
    filters: parseFilters(searchParams),
    setFilters,
    clearFilters,
  };
}
```

### Pagination

```typescript
// features/shared/hooks/usePaginationURL.ts
export function usePaginationURL() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  
  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };
  
  return { page, setPage };
}
```

---

## Form State Ownership

### JSON Ingestion Form

```typescript
// features/admin/components/IngestionForm.tsx
export function IngestionForm() {
  const form = useForm<IngestPayload>({
    resolver: zodResolver(ingestSchema),
    defaultValues: {
      schema_version: '2.0.0',
      schema_type: 'textbook',
      // ... other defaults
    },
  });
  
  const submitMutation = useSubmitIngest();
  
  const onSubmit = form.handleSubmit(async (data) => {
    await submitMutation.mutateAsync(data);
  });
  
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <JsonEditor 
          value={form.watch('document_metadata')}
          onChange={(value) => form.setValue('document_metadata', value)}
        />
        <Button type="submit" disabled={submitMutation.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
```

### Search Form

```typescript
// features/search/components/SearchBar.tsx
export function SearchBar() {
  const form = useForm<{ q: string }>({
    defaultValues: { q: '' },
  });
  
  const debouncedQuery = useDebounce(form.watch('q'), 300);
  const { setFilters } = useSearchURL();
  
  useEffect(() => {
    if (debouncedQuery) {
      setFilters({ q: debouncedQuery });
    }
  }, [debouncedQuery]);
  
  return (
    <Form {...form}>
      <Input 
        {...form.register('q')}
        placeholder="Search topics..."
      />
    </Form>
  );
}
```

---

## Zustand Store Design

### Admin Auth Store

```typescript
// features/admin/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthState {
  isAuthenticated: boolean;
  adminId: string | null;
  login: (adminId: string) => void;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminId: null,
      login: (adminId) => set({ isAuthenticated: true, adminId }),
      logout: () => set({ isAuthenticated: false, adminId: null }),
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ adminId: state.adminId }),
    }
  )
);
```

### Export Jobs Store

```typescript
// features/exports/store/exportStore.ts
interface ExportJob {
  id: string;
  topicId: string;
  format: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  createdAt: Date;
}

interface ExportState {
  activeJobs: ExportJob[];
  completedJobs: ExportJob[];
  addJob: (job: ExportJob) => void;
  updateJob: (id: string, status: ExportJob['status']) => void;
  removeJob: (id: string) => void;
  clearCompleted: () => void;
}

export const useExportStore = create<ExportState>((set) => ({
  activeJobs: [],
  completedJobs: [],
  addJob: (job) => 
    set((state) => ({ activeJobs: [...state.activeJobs, job] })),
  updateJob: (id, status) =>
    set((state) => {
      const activeIndex = state.activeJobs.findIndex(j => j.id === id);
      if (activeIndex !== -1) {
        const updated = { ...state.activeJobs[activeIndex], status };
        if (status === 'complete' || status === 'error') {
          return {
            activeJobs: state.activeJobs.filter(j => j.id !== id),
            completedJobs: [...state.completedJobs, updated],
          };
        }
        const active = [...state.activeJobs];
        active[activeIndex] = updated;
        return { activeJobs: active };
      }
      return state;
    }),
  removeJob: (id) =>
    set((state) => ({ 
      activeJobs: state.activeJobs.filter(j => j.id !== id) 
    })),
  clearCompleted: () => set({ completedJobs: [] }),
}));
```

### Translation Preferences Store

```typescript
// features/quran/store/translationStore.ts
interface TranslationState {
  urduEnabled: boolean;
  englishEnabled: boolean;
  toggleUrdu: () => void;
  toggleEnglish: () => void;
}

export const useTranslationStore = create<TranslationState>()(
  persist(
    (set) => ({
      urduEnabled: true,
      englishEnabled: true,
      toggleUrdu: () => set((state) => ({ urduEnabled: !state.urduEnabled })),
      toggleEnglish: () => set((state) => ({ englishEnabled: !state.englishEnabled })),
    }),
    { name: 'quran-translations' }
  )
);
```

---

## SSR Strategy

### Server-Side Data Fetching

```typescript
// app/topics/slug/[...slug]/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { getTopicBySlug, getTopicContent } from '@/lib/api/topics';

export default async function TopicPage({ params }) {
  // Prefetch data on server
  const topic = await getTopicBySlug(params.slug);
  
  await queryClient.prefetchQuery({
    queryKey: queryKeys.topics.content(topic._id),
    queryFn: () => getTopicContent(topic._id),
  });
  
  await queryClient.prefetchQuery({
    queryKey: queryKeys.seo.jsonld('topic', topic._id),
    queryFn: () => seoApi.getJsonLd('topic', topic._id),
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TopicPageClient topic={topic} />
    </HydrationBoundary>
  );
}
```

### Streaming with Suspense

```typescript
// app/search/page.tsx
import { Suspense } from 'react';
import { SearchResultsSkeleton } from '@/components/search/SearchSkeleton';

export default function SearchPage({ searchParams }) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchResultsContent({ searchParams }) {
  const results = await searchApi.searchTopics(searchParams);
  
  return (
    // Render results
  );
}
```

---

## Hydration Strategy

### Client-Side Hydration

```typescript
// components/providers/Providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### Avoiding Hydration Mismatches

```typescript
// Use suppressHydrationWarning for dynamic content
<html lang="en" suppressHydrationWarning>

// Defer client-only rendering until after mount
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  return children;
}
```

---

## Related Documents

- [04-feature-modules.md](./04-feature-modules.md) — Feature organization
- [07-api-layer.md](./07-api-layer.md) — API clients
- [08-rendering-engine.md](./08-rendering-engine.md) — Content rendering
