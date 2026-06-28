# Sijil — Frontend Blueprint: API Layer

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the API client layer for Sijil, including endpoint ownership, request/response typing, error handling, and retry strategies.

---

## API Client Structure

```
lib/api/
├── client.ts                 # Base HTTP client
├── documents.api.ts          # Document endpoints
├── topics.api.ts             # Topic endpoints
├── search.api.ts             # Search endpoints
├── exports.api.ts            # Export endpoints
├── quran.api.ts              # Quran endpoints
├── analytics.api.ts          # Analytics endpoints
├── admin.api.ts              # Admin endpoints
├── seo.api.ts                # SEO endpoints
└── types.ts                  # Shared types
```

---

## Base HTTP Client

```typescript
// lib/api/client.ts
import { env } from '@/lib/env';

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

export type ApiError = {
  success: false;
  error: string;
  errors?: Array<{ path: string; message: string }>;
};

export type ApiResponse<T> = {
  success: true;
  data: T;
} | ApiError;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: unknown;
  adminId?: string;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, body, adminId } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(adminId ? { 'X-Admin-ID': adminId } : {}),
    },
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(url, config);
    const json = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: json.error || `HTTP ${response.status}`,
        errors: json.errors,
      };
    }
    
    return json;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),
  
  put: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'PUT', body }),
  
  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
```

---

## Documents API

```typescript
// lib/api/documents.api.ts
import { apiClient, ApiResponse } from './client';

export interface Document {
  _id: string;
  document_metadata: {
    title: string;
    subject: string;
    grade: number;
    type: string;
    authors?: string[];
  };
  container: {
    chapters: Array<{
      chapter_number: number;
      chapter_title: string;
      topics: string[];
    }>;
  };
  topic_refs: Array<{
    _id: string;
    title: string;
    slug_global: string;
  }>;
}

export interface DocumentFilters {
  subject?: string;
  grade?: string;
  type?: string;
  status?: string;
  sort?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DocumentListResponse {
  data: Document[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const documentsApi = {
  getList: async (filters: DocumentFilters): Promise<ApiResponse<DocumentListResponse>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.set(key, String(value));
    });
    return apiClient.get(`/api/documents?${params.toString()}`);
  },
  
  getById: async (documentId: string): Promise<ApiResponse<Document>> => {
    return apiClient.get(`/api/documents/${documentId}`);
  },
  
  getTopics: async (documentId: string): Promise<ApiResponse<{ data: any[] }>> => {
    return apiClient.get(`/api/documents/${documentId}/topics`);
  },
  
  getAggregates: async (documentId: string): Promise<ApiResponse<{
    data: {
      document_id: string;
      topics: number;
      content_blocks: number;
      formulas: number;
      assessments: number;
      assets: number;
    };
  }>> => {
    return apiClient.get(`/api/documents/${documentId}/aggregates`);
  },
};
```

---

## Topics API

```typescript
// lib/api/topics.api.ts
import { apiClient, ApiResponse } from './client';

export interface Topic {
  _id: string;
  title: string;
  slug: string;
  slug_global: string;
  document_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  seo: {
    meta_title: string;
    meta_description: string;
    canonical_url: string;
    breadcrumb: Array<{ name: string; url: string }>;
  };
  geo: {
    llm_summary: string;
    entity_name: string;
    entity_type: string;
  };
}

export interface ContentBlock {
  type: string;
  id: string;
  [key: string]: unknown;
}

export interface TopicContent {
  content_blocks: ContentBlock[];
  formulas: Array<{
    _id: string;
    name: string;
    latex: string;
    variables: string[];
  }>;
  key_terms: string[];
  examples: Array<{
    example_number: number;
    title: string;
    problem_text: string;
    solution_steps: string[];
  }>;
  faq: Array<{ question: string; answer: string }>;
}

export interface TopicAssets {
  figures: Array<{
    figure_number: number;
    caption: string;
    alt: string;
    image_url: string;
  }>;
  tables: Array<{
    table_number: number;
    caption: string;
    headers: string[];
    rows: string[][];
  }>;
}

export const topicsApi = {
  getBySlug: async (slug: string[]): Promise<ApiResponse<Topic>> => {
    const slugPath = slug.join('/');
    return apiClient.get(`/api/topics/slug/${slugPath}`);
  },
  
  getById: async (topicId: string): Promise<ApiResponse<Topic>> => {
    return apiClient.get(`/api/topics/${topicId}`);
  },
  
  getContent: async (topicId: string): Promise<ApiResponse<TopicContent>> => {
    return apiClient.get(`/api/topics/${topicId}/content`);
  },
  
  getAssets: async (topicId: string): Promise<ApiResponse<TopicAssets>> => {
    return apiClient.get(`/api/topics/${topicId}/assets`);
  },
  
  getAssessments: async (topicId: string): Promise<ApiResponse<{
    data: {
      book_mcqs: any[];
      book_short_questions: any[];
      activities: any[];
    };
  }>> => {
    return apiClient.get(`/api/topics/${topicId}/assessments`);
  },
  
  getPage: async (topicId: string): Promise<ApiResponse<{
    topic: Topic;
    content: TopicContent;
    assets: TopicAssets;
  }>> => {
    return apiClient.get(`/api/topics/${topicId}/page`);
  },
};
```

---

## Search API

```typescript
// lib/api/search.api.ts
import { apiClient, ApiResponse } from './client';

export interface SearchParams {
  q: string;
  subject?: string;
  grade?: string;
  difficulty?: string;
  topicType?: string;
  limit?: number;
  page?: number;
}

export interface SearchResult {
  _id: string;
  title: string;
  slug_global: string;
  snippet: string;
  highlights: string[];
  subject: string;
  grade: number;
  difficulty: string;
}

export interface FormulaResult {
  _id: string;
  name: string;
  latex: string;
  variables: string[];
  source_topic: {
    _id: string;
    title: string;
    slug_global: string;
  };
}

export const searchApi = {
  searchTopics: async (params: SearchParams): Promise<ApiResponse<{
    query: string;
    count: number;
    results: SearchResult[];
  }>> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.set(key, String(value));
    });
    return apiClient.get(`/api/search?${queryParams.toString()}`);
  },
  
  searchFormulas: async (params: Omit<SearchParams, 'difficulty' | 'topicType'>): Promise<ApiResponse<{
    query: string;
    count: number;
    results: FormulaResult[];
  }>> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.set(key, String(value));
    });
    return apiClient.get(`/api/search/formulas?${queryParams.toString()}`);
  },
  
  getSuggestions: async (prefix: string, limit = 10): Promise<ApiResponse<{
    prefix: string;
    suggestions: string[];
  }>> => {
    return apiClient.get(`/api/search/suggest?prefix=${encodeURIComponent(prefix)}&limit=${limit}`);
  },
  
  getTrending: async (limit = 10): Promise<ApiResponse<{
    trending: string[];
  }>> => {
    return apiClient.get(`/api/search/trending?limit=${limit}`);
  },
};
```

---

## Exports API

```typescript
// lib/api/exports.api.ts
import { apiClient, ApiResponse } from './client';

export type ExportFormat = 
  | 'formula_pack'
  | 'mcq_pack'
  | 'revision_pack'
  | 'offline_html'
  | 'flashcard_pack'
  | 'topic_pack';

export type ExportStatus = 'pending' | 'processing' | 'complete' | 'error';

export interface ExportJob {
  _id: string;
  topic_id: string;
  format: ExportFormat;
  status: ExportStatus;
  package_url?: string;
  created_at: string;
  updated_at: string;
}

export const exportsApi = {
  create: async (topicId: string, format: ExportFormat): Promise<ApiResponse<{
    export_job_id: string;
    status: ExportStatus;
  }>> => {
    return apiClient.post('/api/exports', { topic_id: topicId, format });
  },
  
  getStatus: async (jobId: string): Promise<ApiResponse<ExportJob>> => {
    return apiClient.get(`/api/exports/${jobId}`);
  },
  
  getPolicies: async (): Promise<ApiResponse<Array<{
    _id: string;
    document_type: string;
    allowed_export_types: ExportFormat[];
    max_topics_per_export: number;
  }>>> => {
    return apiClient.get('/api/policies');
  },
  
  getStaleness: async (jobId: string): Promise<ApiResponse<{
    is_stale: boolean;
    content_hash_match: boolean;
  }>> => {
    return apiClient.get(`/api/export/${jobId}/stale`);
  },
};
```

---

## Quran API

```typescript
// lib/api/quran.api.ts
import { apiClient, ApiResponse } from './client';

export interface Surah {
  surah_number: number;
  surah_name_arabic: string;
  surah_name_english: string;
  revelation_place: 'meccan' | 'medinan';
  ayah_count: number;
  ayahs: Array<{
    number: number;
    arabic_text: string;
    urdu_translation: string;
    english_translation: string;
  }>;
}

export const quranApi = {
  getSurah: async (surahNumber: number): Promise<ApiResponse<Surah>> => {
    return apiClient.get(`/api/quran/surah/${surahNumber}`);
  },
  
  getAyah: async (surah: number, ayah: number): Promise<ApiResponse<{
    surah: number;
    ayah: number;
    arabic_text: string;
    urdu_translation: string;
    english_translation: string;
  }>> => {
    return apiClient.get(`/api/quran/ayah/${surah}/${ayah}`);
  },
  
  getRange: async (surah: number, start: number, end: number): Promise<ApiResponse<{
    surah: number;
    start: number;
    end: number;
    ayahs: any[];
  }>> => {
    return apiClient.get(`/api/quran/range/${surah}/${start}/${end}`);
  },
};
```

---

## Analytics API

```typescript
// lib/api/analytics.api.ts
import { apiClient, ApiResponse } from './client';

export const analyticsApi = {
  getPlatformStats: async (): Promise<ApiResponse<{
    total_documents: number;
    total_topics: number;
    total_formulas: number;
    total_assessments: number;
  }>> => {
    return apiClient.get('/api/utility/platform-stats');
  },
  
  getRecentArrivals: async (limit = 10): Promise<ApiResponse<{
    arrivals: Array<{
      topic_id: string;
      title: string;
      added_date: string;
      subject: string;
      grade: number;
    }>;
  }>> => {
    return apiClient.get(`/api/utility/recent-arrivals?limit=${limit}`);
  },
  
  getPopularTopics: async (limit = 10): Promise<ApiResponse<{
    popular: Array<{
      topic_id: string;
      title: string;
      view_count: number;
      subject: string;
    }>;
  }>> => {
    return apiClient.get(`/api/utility/popular-topics?limit=${limit}`);
  },
  
  getFailedSearches: async (): Promise<ApiResponse<{
    failed_queries: Array<{
      query: string;
      count: number;
      last_searched: string;
    }>;
  }>> => {
    return apiClient.get('/api/utility/failed-searches');
  },
  
  getSearchAnalytics: async (startDate: string, endDate: string): Promise<ApiResponse<{
    total_searches: number;
    unique_queries: number;
    searches_by_day: Array<{ date: string; count: number }>;
  }>> => {
    return apiClient.get(`/api/utility/analytics/search?start=${startDate}&end=${endDate}`);
  },
};
```

---

## Admin API

```typescript
// lib/api/admin.api.ts
import { apiClient, ApiResponse } from './client';

export interface IngestSubmission {
  schema_version: string;
  schema_type: string;
  ingest_metadata: Record<string, unknown>;
  document_metadata: Record<string, unknown>;
  container: Record<string, unknown>;
  topics: any[];
}

export const adminApi = {
  submitIngest: async (payload: IngestSubmission, adminId: string): Promise<ApiResponse<{
    tracking_id: string;
    status: 'pending' | 'processing' | 'complete' | 'error';
  }>> => {
    return apiClient.post('/api/ingest/json', payload, { adminId });
  },
  
  getIngestStatus: async (trackingId: string, adminId: string): Promise<ApiResponse<{
    _id: string;
    status: string;
    source_file_name: string;
    created_at: string;
    updated_at: string;
  }>> => {
    return apiClient.get(`/api/ingest/${trackingId}`, { adminId });
  },
  
  cancelIngest: async (id: string, adminId: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post(`/api/ingest/${id}/cancel`, null, { adminId });
  },
  
  retryIngest: async (id: string, adminId: string): Promise<ApiResponse<{ job_id: string }>> => {
    return apiClient.post(`/api/ingest/${id}/retry`, null, { adminId });
  },
  
  previewImport: async (repoUrl: string, adminId: string): Promise<ApiResponse<{
    batch_id: string;
    documents_found: number;
    topics_found: number;
  }>> => {
    return apiClient.post('/api/admin/import/preview', { repo_url: repoUrl }, { adminId });
  },
  
  startImport: async (batchId: string, adminId: string): Promise<ApiResponse<{
    batch_id: string;
    status: 'PENDING' | 'SCANNING' | 'VALIDATING' | 'IMPORTING' | 'INDEXING' | 'COMPLETE' | 'ERROR';
  }>> => {
    return apiClient.post('/api/admin/import/start', { batch_id: batchId }, { adminId });
  },
  
  getImportStatus: async (batchId: string, adminId: string): Promise<ApiResponse<{
    batch_id: string;
    status: string;
    progress: {
      scanning: number;
      validating: number;
      importing: number;
      indexing: number;
    };
    success_count: number;
    failure_count: number;
    failed_files: Array<{ file: string; error: string }>;
  }>> => {
    return apiClient.get(`/api/admin/import/${batchId}`, { adminId });
  },
};
```

---

## SEO API

```typescript
// lib/api/seo.api.ts
import { apiClient, ApiResponse } from './client';

export const seoApi = {
  getJsonLd: async (type: 'topic' | 'document', id: string): Promise<ApiResponse<{
    '@context': string;
    '@type': string;
    [key: string]: unknown;
  }>> => {
    return apiClient.get(`/api/seo/${type}/${id}/jsonld`);
  },
  
  getAEO: async (topicId: string): Promise<ApiResponse<{
    primary_question: string;
    featured_snippet_block: string;
    faq: Array<{ question: string; answer: string }>;
    ai_answer_hub: Array<{
      question_intent: string;
      answer_markdown: string;
      answer_plain: string;
      answer_type: string;
    }>;
  }>> => {
    return apiClient.get(`/api/seo/topic/${topicId}/aeo`);
  },
  
  getAEOScore: async (topicId: string): Promise<ApiResponse<{
    score: number;
    max_score: number;
    missing_fields: string[];
    recommendations: string[];
  }>> => {
    return apiClient.get(`/api/seo/topic/${topicId}/aeo/score`);
  },
};
```

---

## Error Handling Strategy

### Global Error Handler

```typescript
// lib/api/error-handler.ts
import { toast } from '@/components/ui/use-toast';

export function handleApiError(error: ApiError, context?: string) {
  console.error(`[API Error${context ? ` - ${context}` : ''}]`, error);
  
  // Show user-friendly toast
  toast({
    variant: 'destructive',
    title: context || 'Error',
    description: error.error,
  });
  
  // Log to analytics (fire-and-forget)
  if (typeof window !== 'undefined') {
    fetch('/api/log-error', {
      method: 'POST',
      body: JSON.stringify({ error, context }),
    }).catch(() => {});
  }
}
```

### Retry Logic

```typescript
// lib/api/retry.ts
export async function withRetry<T>(
  fn: () => Promise<ApiResponse<T>>,
  maxRetries = 2,
  delayMs = 1000
): Promise<ApiResponse<T>> {
  let lastError: ApiError | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await fn();
    
    if (result.success) {
      return result;
    }
    
    lastError = result;
    
    // Don't retry on client errors (4xx)
    if (attempt < maxRetries && !isClientError(result)) {
      await sleep(delayMs * Math.pow(2, attempt)); // Exponential backoff
    }
  }
  
  return lastError!;
}

function isClientError(error: ApiError): boolean {
  return error.error.includes('4');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Related Documents

- [04-feature-modules.md](./04-feature-modules.md) — Feature organization
- [06-state-architecture.md](./06-state-architecture.md) — State management
- [08-rendering-engine.md](./08-rendering-engine.md) — Content rendering
