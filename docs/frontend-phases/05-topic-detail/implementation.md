# Phase 05: Topic Detail - Implementation Specification

## Self-Contained Implementation Guide

This document contains everything required to implement the Topic Detail phase. No external references needed.

---

## 1. Pages & Routes

### Route Structure

```
/topics/[slug]
```

Dynamic route for individual topic pages.

### File Locations

```
app/
  topics/
    [slug]/
      page.tsx          # Topic detail page (Server Component)
      loading.tsx       # Loading state
      error.tsx         # Error boundary
```

---

## 2. Layout Requirements

### Page Layout

The topic detail page uses the main app shell layout from Phase 02.

**Structure:**
```
┌─────────────────────────────────────┐
│            Header                   │
├─────────────────────────────────────┤
│                                     │
│  Breadcrumb Navigation              │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Topic Title                  │  │
│  │  Topic Description            │  │
│  │  Metadata (level, doc count)  │  │
│  └───────────────────────────────┘  │
│                                     │
│  Child Topics Section               │
│  ┌─────┐ ┌─────┐ ┌─────┐           │
│  │Topic│ │Topic│ │Topic│ ...       │
│  └─────┘ └─────┘ └─────┘           │
│                                     │
│  Documents Section                  │
│  ┌───────────────────────────────┐  │
│  │ Document List (paginated)     │  │
│  └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│            Footer                   │
└─────────────────────────────────────┘
```

---

## 3. Components Required

### New Components (Create in this phase)

#### Breadcrumb

**File:** `components/navigation/Breadcrumb.tsx`

**Purpose:** Display hierarchical navigation path

**Props:**
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}
```

**Type:** Client Component (uses Link)

**Dependencies:** next/link, shadcn/ui separator

---

#### TopicHeader

**File:** `components/topic/TopicHeader.tsx`

**Purpose:** Display topic title, description, and metadata

**Props:**
```typescript
interface TopicHeaderProps {
  title: string;
  description?: string | null;
  level: number;
  documentCount: number;
  childCount: number;
  className?: string;
}
```

**Type:** Server Component

**Dependencies:** None (pure display)

---

#### ChildTopicGrid

**File:** `components/topic/ChildTopicGrid.tsx`

**Purpose:** Display grid of child topics for navigation

**Props:**
```typescript
interface ChildTopic {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  documentCount: number;
}

interface ChildTopicGridProps {
  topics: ChildTopic[];
  title?: string;
  className?: string;
}
```

**Type:** Server Component

**Dependencies:** next/link, shadcn/ui card

---

#### TopicDocumentList

**File:** `components/topic/TopicDocumentList.tsx`

**Purpose:** Display paginated list of documents for this topic

**Props:**
```typescript
interface TopicDocumentListProps {
  topicSlug: string;
  initialPage?: number;
  pageSize?: number;
  className?: string;
}
```

**Type:** Client Component (manages pagination state)

**Dependencies:** 
- API client
- React Query
- Pagination component (Phase 04)
- Document card component (Phase 04)

---

### Reused Components (From Previous Phases)

- `components/layout/Header` (Phase 02)
- `components/layout/Footer` (Phase 02)
- `components/ui/Card` (Phase 01/02)
- `components/ui/Button` (Phase 01)
- `components/ui/Skeleton` (Phase 01)
- `components/topic/TopicCard` (Phase 04)
- `components/document/DocumentCard` (Phase 04)
- `components/navigation/Pagination` (Phase 04)
- `components/shared/EmptyState` (Phase 01)
- `components/shared/ErrorBoundary` (Phase 01)

---

## 4. API Integration

### Endpoints Used

#### GET /api/v1/topics/:slug

**Purpose:** Fetch topic details

**Request:**
```typescript
{
  slug: string  // URL parameter
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    level: number;
    parentId?: string | null;
    parent?: {
      id: string;
      slug: string;
      title: string;
    } | null;
    documentCount: number;
    childCount: number;
    createdAt: string;
    updatedAt: string;
  };
}
```

**Usage:** Fetch initial topic data in page.tsx

**Caching:** 
- ISR with revalidate: 3600 (1 hour)
- Stale-while-revalidate strategy

---

#### GET /api/v1/topics/:slug/children

**Purpose:** Fetch child topics

**Request:**
```typescript
{
  slug: string;  // URL parameter
  page?: number;
  pageSize?: number;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    topics: Array<{
      id: string;
      slug: string;
      title: string;
      description?: string | null;
      documentCount: number;
    }>;
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
}
```

**Usage:** Fetch child topics in ChildTopicGrid component

**Caching:** React Query cache (5 minutes)

---

#### GET /api/v1/topics/:slug/documents

**Purpose:** Fetch documents for this topic

**Request:**
```typescript
{
  slug: string;  // URL parameter
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    documents: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt?: string | null;
      type: 'quranic' | 'hadith' | 'classical' | 'modern';
      sourceId?: string | null;
      topicIds: string[];
      createdAt: string;
      updatedAt: string;
    }>;
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  };
}
```

**Usage:** Fetch documents in TopicDocumentList component

**Caching:** React Query cache (2 minutes)

---

### API Client Usage

```typescript
// lib/api/topics.ts

export async function getTopicBySlug(slug: string) {
  return apiClient.get<TopicDetailResponse>(`/topics/${slug}`);
}

export async function getTopicChildren(slug: string, page = 1, pageSize = 20) {
  return apiClient.get<TopicChildrenResponse>(`/topics/${slug}/children`, {
    params: { page, pageSize },
  });
}

export async function getTopicDocuments(
  slug: string,
  page = 1,
  pageSize = 20,
  sortBy?: string,
  sortOrder?: string
) {
  return apiClient.get<TopicDocumentsResponse>(`/topics/${slug}/documents`, {
    params: { page, pageSize, sortBy, sortOrder },
  });
}
```

---

## 5. State Management

### Server-Side Data

- Topic details: fetched in page.tsx server component
- Initial child topics: fetched in page.tsx or ChildTopicGrid

### Client-Side State

**React Query Keys:**

```typescript
const queryKeys = {
  topic: (slug: string) => ['topic', slug],
  topicChildren: (slug: string, page: number) => ['topic-children', slug, page],
  topicDocuments: (slug: string, page: number, filters: DocumentFilters) => 
    ['topic-documents', slug, page, filters],
};
```

**Query Configuration:**

```typescript
// Child topics query
useQuery({
  queryKey: queryKeys.topicChildren(slug, page),
  queryFn: () => getTopicChildren(slug, page),
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000,   // 10 minutes
});

// Documents query
useQuery({
  queryKey: queryKeys.topicDocuments(slug, page, filters),
  queryFn: () => getTopicDocuments(slug, page, filters.page, filters.pageSize),
  staleTime: 2 * 60 * 1000, // 2 minutes
});
```

---

## 6. Data Models

### TypeScript Interfaces

```typescript
// types/topic.ts

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  level: number;
  parentId?: string | null;
  documentCount: number;
  childCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopicDetail extends Topic {
  parent?: {
    id: string;
    slug: string;
    title: string;
  } | null;
}

export interface TopicChildrenResponse {
  success: boolean;
  data: {
    topics: Array<{
      id: string;
      slug: string;
      title: string;
      description?: string | null;
      documentCount: number;
    }>;
    pagination: PaginationInfo;
  };
}

export interface TopicDocumentsResponse {
  success: boolean;
  data: {
    documents: DocumentSummary[];
    pagination: PaginationInfo;
  };
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface DocumentSummary {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  type: 'quranic' | 'hadith' | 'classical' | 'modern';
  sourceId?: string | null;
  topicIds: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## 7. Loading States

### Skeleton Layout

```tsx
// app/topics/[slug]/loading.tsx

export default function TopicDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 flex items-center space-x-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-2" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Topic header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Child topics skeleton */}
      <div className="mb-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>

      {/* Documents skeleton */}
      <div>
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Error States

### Error Boundary

```tsx
// app/topics/[slug]/error.tsx

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TopicDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Topic detail error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Failed to load topic</h2>
      <p className="text-muted-foreground mb-6">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### HTTP Error Handling

**404 Not Found:**
- Display "Topic not found" message
- Show link to browse all topics
- Return 404 status code for SEO

**500 Server Error:**
- Display generic error message
- Provide retry option
- Log error for debugging

---

## 9. SEO Configuration

### Metadata

```typescript
// app/topics/[slug]/page.tsx

import { Metadata } from 'next';
import { getTopicBySlug } from '@/lib/api/topics';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = await getTopicBySlug(params.slug);
  
  return {
    title: `${topic.data.title} | Sijil`,
    description: topic.data.description || `Explore documents related to ${topic.data.title}`,
    openGraph: {
      title: `${topic.data.title} | Sijil`,
      description: topic.data.description || `Explore documents related to ${topic.data.title}`,
      type: 'website',
    },
  };
}
```

### Structured Data (JSON-LD)

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: topic.data.title,
      description: topic.data.description,
      url: `https://sijil.app/topics/${topic.data.slug}`,
    }),
  }}
/>
```

### Canonical URL

```typescript
<link rel="canonical" href={`https://sijil.app/topics/${topic.data.slug}`} />
```

---

## 10. Accessibility Requirements

### ARIA Labels

- Breadcrumb: `aria-label="Breadcrumb"`
- Topic header: `role="heading" aria-level="1"`
- Child topics section: `aria-label="Child topics"`
- Documents section: `aria-label="Documents in this topic"`
- Pagination: `aria-label="Document pagination"`

### Keyboard Navigation

- All links focusable with Tab
- Clear focus indicators
- Skip to content link
- Breadcrumb items navigable with arrow keys

### Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for any images/icons
- Announce loading states

---

## 11. Responsive Behavior

### Breakpoints

```css
/* Mobile first approach */
mobile: < 640px    (default)
sm: ≥ 640px
md: ≥ 768px
lg: ≥ 1024px
xl: ≥ 1280px
```

### Layout Adjustments

**Mobile (< 768px):**
- Single column layout
- Breadcrumb stacked vertically if needed
- Child topics: 1 column grid
- Documents: full width cards
- Reduced padding

**Tablet (768px - 1023px):**
- Child topics: 2 column grid
- Documents: standard cards
- Standard padding

**Desktop (≥ 1024px):**
- Child topics: 3 column grid
- Documents: wider cards with more info
- Maximum content width container

---

## 12. Folder Structure Changes

### New Folders

```
components/
  topic/
    TopicHeader.tsx
    ChildTopicGrid.tsx
    TopicDocumentList.tsx
  navigation/
    Breadcrumb.tsx
```

### Modified Files

```
lib/
  api/
    topics.ts          # Add new API functions
types/
  topic.ts             # Add topic interfaces
```

---

## 13. Implementation Order

1. **Setup** (0.5 day)
   - Create folder structure
   - Add TypeScript interfaces
   - Create API client functions

2. **Core Components** (1 day)
   - Breadcrumb component
   - TopicHeader component
   - ChildTopicGrid component
   - TopicDocumentList component

3. **Page Implementation** (0.5 day)
   - Create dynamic route
   - Implement server component
   - Add loading.tsx
   - Add error.tsx

4. **SEO & Metadata** (0.5 day)
   - Add metadata generation
   - Implement structured data
   - Configure canonical URLs

5. **Testing & Polish** (0.5 day)
   - Manual testing
   - Accessibility audit
   - Responsive testing
   - Bug fixes

---

## 14. Backend Integration Checklist

- [ ] GET /api/v1/topics/:slug connected
- [ ] GET /api/v1/topics/:slug/children connected
- [ ] GET /api/v1/topics/:slug/documents connected
- [ ] Error handling for 404 responses
- [ ] Error handling for 500 responses
- [ ] Loading states during API calls
- [ ] Caching strategy implemented
- [ ] React Query integration complete

---

## 15. Code Examples

### Page Component (Server Component)

```tsx
// app/topics/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicBySlug } from '@/lib/api/topics';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { TopicHeader } from '@/components/topic/TopicHeader';
import { ChildTopicGrid } from '@/components/topic/ChildTopicGrid';
import { TopicDocumentList } from '@/components/topic/TopicDocumentList';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await getTopicBySlug(params.slug);
    const topic = response.data;
    
    return {
      title: `${topic.title} | Sijil`,
      description: topic.description || `Explore documents related to ${topic.title}`,
    };
  } catch {
    return {
      title: 'Topic Not Found | Sijil',
    };
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  let topic;
  
  try {
    const response = await getTopicBySlug(params.slug);
    topic = response.data;
  } catch (error) {
    notFound();
  }

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Topics', href: '/topics' },
    ...(topic.parent ? [{ label: topic.parent.title, href: `/topics/${topic.parent.slug}` }] : []),
    { label: topic.title, href: undefined },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      
      <TopicHeader
        title={topic.title}
        description={topic.description}
        level={topic.level}
        documentCount={topic.documentCount}
        childCount={topic.childCount}
        className="mb-8"
      />

      {topic.childCount > 0 && (
        <section className="mb-8" aria-label="Child topics">
          <ChildTopicGrid topicSlug={params.slug} />
        </section>
      )}

      {topic.documentCount > 0 && (
        <section aria-label="Documents in this topic">
          <TopicDocumentList topicSlug={params.slug} />
        </section>
      )}
    </main>
  );
}
```

### Breadcrumb Component

```tsx
// components/navigation/Breadcrumb.tsx

'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
              </>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

## 16. Environment Variables

No new environment variables required for this phase.

Uses existing:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`

---

## 17. Performance Considerations

### Optimization Strategies

1. **ISR for topic data:** Revalidate every hour
2. **React Query caching:** 5 minutes for children, 2 minutes for documents
3. **Lazy loading:** Child topics and documents loaded on demand
4. **Image optimization:** Use Next.js Image component if images added
5. **Code splitting:** Automatic with Next.js App Router

### Bundle Size

- Keep components modular
- Tree-shake unused icons from lucide-react
- Avoid large dependencies

---

## 18. Common Mistakes to Avoid

❌ **Don't** fetch data in client components when server component can do it
❌ **Don't** duplicate breadcrumb logic from other pages
❌ **Don't** forget to handle empty states (no child topics, no documents)
❌ **Don't** skip error boundaries
❌ **Don't** hardcode URLs - use next/link
❌ **Don't** ignore mobile responsiveness
❌ **Don't** forget SEO metadata
❌ **Don't** mix Server and Client Component logic incorrectly

✅ **Do** use Server Components by default
✅ **Do** reuse components from Phase 04
✅ **Do** implement proper loading states
✅ **Do** test with real backend data
✅ **Do** follow accessibility guidelines
✅ **Do** maintain consistent design system

---

## 19. Acceptance Checklist Reference

Complete checklist available in `acceptance.md`. Key items:

- [ ] Topic detail page renders correctly
- [ ] Breadcrumb navigation functional
- [ ] Child topics displayed and clickable
- [ ] Documents listed with pagination
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] SEO metadata configured
- [ ] Mobile responsive
- [ ] Accessibility requirements met
- [ ] All APIs connected
- [ ] No mocked data
- [ ] TypeScript strict mode passes
- [ ] Lint passes
- [ ] Build passes

---

## 20. Next Steps After Completion

After completing this phase:

1. Run all manual tests from `tests.md`
2. Verify acceptance criteria from `acceptance.md`
3. Update `CURRENT_PHASE.md` status
4. Update `CHANGELOG.md`
5. Commit changes with descriptive message
6. Stop - do not proceed to next phase automatically

Next phase: **06-document-viewer** (separate specification document)
