# Sijil — Frontend Blueprint: System Architecture

**Version:** 1.0  
**Generated:** 2026-06-27  
**Assumptions:** Next.js 16, TypeScript, Tailwind 4, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, next-seo, KaTeX, App Router

---

## Overview

This document defines the high-level system architecture for the Sijil frontend, establishing clear application boundaries, domain separations, and interaction patterns.

---

## Application Boundaries

### 1. Public Domain

**Purpose:** Content consumption for anonymous and authenticated users

**Scope:**
- Document browsing and viewing
- Topic content rendering
- Search and discovery
- Quran browsing
- Export generation and download
- SEO/AEO/GEO optimized pages

**Entry Points:**
- `/` — Homepage
- `/documents` — Document listing
- `/topics/slug/*` — Topic pages
- `/search` — Search results
- `/quran/*` — Quran browser
- `/subjects/*` — Subject browse

**Authentication:** None required (public access)

**Key Characteristics:**
- SSR/SSG for SEO optimization
- Cached API responses via TanStack Query
- Static generation where possible
- JSON-LD injection for search engines

---

### 2. Admin Domain

**Purpose:** Content management, ingestion, and system monitoring

**Scope:**
- JSON document ingestion
- Batch import from GitHub
- Import job monitoring
- Analytics dashboard
- Version management
- System health monitoring
- Search analytics

**Entry Points:**
- `/admin` — Dashboard
- `/admin/ingest` — JSON submission
- `/admin/import` — Batch import
- `/admin/analytics` — Analytics viewer
- `/admin/versions/*` — Version history

**Authentication:** Required via `X-Admin-ID` header or bootstrap admin

**Key Characteristics:**
- Client-side rendered (no SEO requirements)
- Protected routes with middleware
- Real-time polling for job status
- Form-heavy interfaces with validation

---

### 3. Search Domain

**Purpose:** Content discovery across all indexed data

**Scope:**
- Global topic search
- Formula-specific search
- Autocomplete suggestions
- Trending searches
- Failed search tracking
- Search filters and facets

**Entry Points:**
- `/search` — Main search results
- `/search/formulas` — Formula search
- Header search bar (all pages)

**Integration Points:**
- MongoDB Atlas Search
- Popular searches collection
- Failed searches collection

**Key Characteristics:**
- Debounced input handling
- URL state synchronization
- Faceted filtering
- Highlight snippets in results

---

### 4. Quran Domain

**Purpose:** Quran text browsing and reference integration

**Scope:**
- Surah browsing
- Ayah navigation
- Translation display (Urdu/English)
- Quran references in topics
- Position-based mapping

**Entry Points:**
- `/quran` — Default to Surah 1
- `/quran/:surahNumber` — Specific surah
- `/quran/ayah/:surah/:ayah` — Single ayah

**Integration Points:**
- `quran_surahs` collection
- `quran_ayahs` collection
- `topicContent.quran_data` references

**Key Characteristics:**
- External Arabic font required
- Translation toggle
- Navigation by juz/hizb/ruku
- Reference blocks in topic content

---

### 5. Export Domain

**Purpose:** Generate downloadable content packs

**Scope:**
- Export job creation
- Progress tracking
- Download management
- Policy enforcement
- Staleness checking

**Entry Points:**
- Export buttons on topic pages
- `/exports/:exportJobId` — Status page

**Supported Formats:**
- `formula_pack` — LaTeX formulas
- `mcq_pack` — Multiple choice questions
- `revision_pack` — Summary notes
- `offline_html` — Offline viewing
- `flashcard_pack` — Study flashcards
- `topic_pack` — Complete topic

**Integration Points:**
- BullMQ export queue
- Export policies collection
- File system storage

**Key Characteristics:**
- Async job processing
- Polling for completion
- Format availability per document type
- Staleness warnings

---

### 6. Analytics Domain

**Purpose:** Track usage and provide insights

**Scope:**
- Topic view tracking (automatic)
- Search query tracking
- Popular topics aggregation
- Failed search logging
- Platform statistics

**Entry Points:**
- Automatic via middleware (topic views)
- `/admin/analytics` — Dashboard
- Homepage widgets

**Integration Points:**
- `popular_topics` collection
- `popular_searches` collection
- `failed_searches` collection
- `platform_stats` collection

**Key Characteristics:**
- Fire-and-forget tracking (no user impact)
- Aggregated statistics
- Time-range filtering
- Content gap identification

---

## Domain Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         PUBLIC DOMAIN                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │  Documents   │  │    Topics    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           │                                     │
│                    ┌──────▼───────┐                            │
│                    │ Search Domain│◄──────┐                    │
│                    └──────┬───────┘       │                    │
│                           │                │                    │
│         ┌─────────────────┼────────────────┘                    │
│         │                 │                                     │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────────────┐          │
│  │    Quran     │  │    Export    │  │  Analytics   │          │
│  │    Domain    │  │    Domain    │  │  (Tracking)  │          │
│  └──────────────┘  └──────┬───────┘  └──────┬───────┘          │
│                           │                 │                   │
└───────────────────────────┼─────────────────┼───────────────────┘
                            │                 │
                            ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                          ADMIN DOMAIN                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Dashboard   │  │   Ingestion  │  │   Analytics  │          │
│  └──────────────┘  └──────────────┘  │   Dashboard  │          │
│                                       └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │ Batch Import │  │   Versions   │                             │
│  └──────────────┘  └──────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                            ▲
                            │
                    ┌───────┴───────┐
                    │   Backend     │
                    │   API Layer   │
                    └───────────────┘
```

---

## Data Flow Patterns

### 1. Public Content Flow

```
User Request
    │
    ▼
Next.js Route Handler
    │
    ├─► SSR (Server-Side Rendering)
    │       │
    │       ▼
    │   Fetch from API
    │       │
    │       ▼
    │   Render HTML + Inject JSON-LD
    │       │
    │       ▼
    │   Send to Client
    │
    └─► Client Hydration
            │
            ▼
        TanStack Query Cache
            │
            ▼
        Interactive UI
```

### 2. Admin Action Flow

```
User Action (Form Submit)
    │
    ▼
Zod Validation
    │
    ▼
API Call (with X-Admin-ID)
    │
    ▼
BullMQ Queue
    │
    ▼
Background Worker
    │
    ▼
MongoDB Update
    │
    ▼
Polling Updates UI
```

### 3. Search Flow

```
User Types Query
    │
    ▼
Debounce (300ms)
    │
    ▼
Update URL State
    │
    ├─► Fetch Suggestions
    │       │
    │       ▼
    │   Display Dropdown
    │
    └─► Fetch Results
            │
            ▼
        Atlas Search
            │
            ▼
        Display Facets + Results
            │
            ▼
        Track Search (Success/Fail)
```

### 4. Export Flow

```
User Selects Format
    │
    ▼
POST /api/exports
    │
    ▼
Receive Job ID
    │
    ▼
Poll Status Endpoint
    │
    ├─► Pending → Continue Polling
    │
    ├─► Processing → Show Progress
    │
    └─► Complete → Download File
```

---

## Technology Boundaries

### Server-Side (Next.js)

**Responsibilities:**
- Initial HTML rendering (SSR/SSG)
- Meta tag injection
- JSON-LD script injection
- API route proxies (optional)
- Sitemap generation
- Robots.txt serving

**Libraries:**
- `next` (App Router)
- `next-seo` or `next/metadata`
- Server Components for data fetching

---

### Client-Side (React)

**Responsibilities:**
- Interactive UI components
- Form handling and validation
- Client-side routing
- State management
- Optimistic updates
- Infinite scrolling

**Libraries:**
- `react` + `react-dom`
- `@tanstack/react-query`
- `zustand`
- `react-hook-form`
- `zod`

---

### Styling (Tailwind 4)

**Responsibilities:**
- Utility-first CSS
- Responsive breakpoints
- Dark mode support
- Component variants

**UI Library:**
- `shadcn/ui` (copy-paste components)
- Radix UI primitives
- Lucide icons

---

### Math Rendering (KaTeX)

**Responsibilities:**
- LaTeX formula rendering
- Display mode and inline mode
- Macro support
- Fast rendering performance

**Integration:**
- Custom `<LatexRenderer />` component
- Auto-detection in content blocks
- Toggle for users

---

## Security Boundaries

### Public Access

- No authentication required
- Rate limiting handled by backend
- CORS configured for frontend domain
- Input sanitization on client

### Admin Access

- `X-Admin-ID` header required
- Middleware protection on `/admin/*` routes
- Environment variable for admin ID
- No sensitive data in client bundle

### API Communication

- HTTPS only in production
- Error messages sanitized
- Request/response validation with Zod
- Retry logic with exponential backoff

---

## Scalability Considerations

### Caching Strategy

1. **TanStack Query Cache:**
   - Stale time: 5 minutes
   - Cache time: 30 minutes
   - Refetch on window focus (optional)

2. **Next.js ISR (Incremental Static Regeneration):**
   - Homepage: Revalidate every 60 seconds
   - Document lists: Revalidate every 300 seconds
   - Topic pages: On-demand revalidation after update

3. **Browser Cache:**
   - Static assets: 1 year
   - API responses: Based on Cache-Control headers

### Code Splitting

- Per-route component loading
- Lazy load heavy components (KaTeX, Monaco Editor)
- Dynamic imports for admin-only features

### Performance Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle size < 500KB (gzipped)

---

## Related Documents

- [02-route-architecture.md](./02-route-architecture.md) — Route structure
- [03-layout-architecture.md](./03-layout-architecture.md) — Layout components
- [04-feature-modules.md](./04-feature-modules.md) — Feature organization
- [07-api-layer.md](./07-api-layer.md) — API client design
