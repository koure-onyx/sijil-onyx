# Sijil — Frontend Blueprint: Route Architecture

**Version:** 1.0  
**Generated:** 2026-06-27  
**Assumptions:** Next.js 16 App Router, TypeScript, Tailwind 4

---

## Overview

This document defines the complete App Router structure for Sijil. Every discovered screen maps to a route, every route maps to a layout, and every route documents its API dependencies.

---

## Complete Folder Tree

```
src/
├── app/
│   ├── layout.tsx                          # RootLayout (providers, fonts)
│   ├── page.tsx                            # HomePage
│   ├── not-found.tsx                       # Global 404 page
│   │
│   ├── documents/
│   │   ├── layout.tsx                      # PublicLayout
│   │   ├── page.tsx                        # DocumentListPage
│   │   └── [documentId]/
│   │       ├── page.tsx                    # DocumentDetailPage
│   │       └── topics/
│   │           └── [topicId]/
│   │               └── page.tsx            # TopicRedirectPage (redirect to slug)
│   │
│   ├── topics/
│   │   ├── layout.tsx                      # TopicLayout
│   │   └── slug/
│   │       └── [...slug]/                  # Catch-all for multi-segment slugs
│   │           ├── page.tsx                # TopicPage
│   │           └── loading.tsx             # Topic loading skeleton
│   │
│   ├── search/
│   │   ├── layout.tsx                      # SearchLayout
│   │   ├── page.tsx                        # SearchResultsPage
│   │   └── formulas/
│   │       └── page.tsx                    # FormulaSearchPage
│   │
│   ├── subjects/
│   │   ├── layout.tsx                      # PublicLayout
│   │   ├── page.tsx                        # SubjectBrowsePage
│   │   └── [subject]/
│   │       ├── page.tsx                    # SubjectDetailPage
│   │       └── grade/
│   │           └── [grade]/
│   │               └── page.tsx            # GradeFilterPage
│   │
│   ├── quran/
│   │   ├── layout.tsx                      # QuranLayout
│   │   ├── page.tsx                        # QuranRedirectPage (→ /quran/1)
│   │   ├── [surahNumber]/
│   │   │   ├── page.tsx                    # SurahPage
│   │   │   └── ayah/
│   │   │       └── [ayahNumber]/
│   │   │           └── page.tsx            # AyahPage
│   │   └── range/
│   │       └── [surahNumber]/
│   │           └── [start]/
│   │               └── [end]/
│   │                   └── page.tsx        # RangePage (modal or full)
│   │
│   ├── exports/
│   │   ├── layout.tsx                      # PublicLayout
│   │   └── [exportJobId]/
│   │       ├── page.tsx                    # ExportStatusPage
│   │       └── loading.tsx                 # Export status skeleton
│   │
│   ├── admin/
│   │   ├── layout.tsx                      # AdminLayout (protected)
│   │   ├── page.tsx                        # AdminDashboard
│   │   │
│   │   ├── ingest/
│   │   │   ├── page.tsx                    # IngestionPage
│   │   │   └── [trackingId]/
│   │   │       └── page.tsx                # IngestionStatusPage
│   │   │
│   │   ├── import/
│   │   │   ├── page.tsx                    # BatchImportPage
│   │   │   └── [batchId]/
│   │   │       ├── page.tsx                # ImportStatusPage
│   │   │       └── report/
│   │   │           └── page.tsx            # ImportReportPage
│   │   │
│   │   ├── analytics/
│   │   │   ├── page.tsx                    # AnalyticsDashboard
│   │   │   └── search/
│   │   │       └── page.tsx                # SearchAnalyticsPage
│   │   │
│   │   └── versions/
│   │       └── [entityType]/
│   │           └── [entityId]/
│   │               └── page.tsx            # VersionHistoryPage
│   │
│   └── api/                                # Optional API routes (proxies)
│       ├── health/
│       │   └── route.ts
│       └── revalidate/
│           └── route.ts                    # On-demand ISR revalidation
│
├── components/                             # Shared components
├── features/                               # Feature modules
├── lib/                                    # Utilities, API clients
└── styles/                                 # Global styles
```

---

## Route Definitions

### Root Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/` | `RootLayout` | `HomePage` | `/api/utility/platform-stats`, `/api/utility/recent-arrivals`, `/api/utility/popular-topics`, `/api/subjects` | Landing page with stats and widgets |
| `/not-found` | `RootLayout` | `NotFoundPage` | `/api/utility/slug/resolve` | Global 404 handler |

---

### Document Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/documents` | `PublicLayout` | `DocumentListPage` | `/api/documents`, `/api/subjects`, `/api/grades` | Browse all documents with filters |
| `/documents/[documentId]` | `PublicLayout` | `DocumentDetailPage` | `/api/documents/:id`, `/api/documents/:id/topics`, `/api/documents/:id/aggregates` | Document metadata and topic list |
| `/documents/[documentId]/topics/[topicId]` | `PublicLayout` | `TopicRedirectPage` | `/api/topics/:id` | Redirect to canonical slug URL |

**Query Params for `/documents`:**
- `subject` (string) — Filter by subject
- `grade` (string) — Filter by grade
- `type` (string) — Filter by document type
- `status` (string) — Filter by publishing status
- `sort` (string) — Sort field
- `search` (string) — Search query
- `page` (number) — Page number
- `limit` (number) — Items per page

---

### Topic Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/topics/slug/[...slug]` | `TopicLayout` | `TopicPage` | `/api/topics/slug/*`, `/api/topics/:id/content`, `/api/topics/:id/assets`, `/api/seo/topic/:id/jsonld` | Main content consumption page |
| `/topics/slug/[...slug]/loading` | `TopicLayout` | `TopicSkeleton` | None | Loading state for topic page |

**Slug Format:** `[country]/[curriculum]/[subject]/[grade]/ch[chapter]/[topic-slug]`

**Example:** `/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers`

**Data Requirements:**
- Topic metadata (title, seo, breadcrumbs)
- Content blocks array
- Figures and tables
- Assessment counts
- JSON-LD for SEO
- Related topics

---

### Search Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/search` | `SearchLayout` | `SearchResultsPage` | `/api/search`, `/api/search/suggest`, `/api/subjects`, `/api/grades` | Main search results with facets |
| `/search/formulas` | `SearchLayout` | `FormulaSearchPage` | `/api/search/formulas` | Formula-specific search results |

**Query Params for `/search`:**
- `q` (string, required) — Search query
- `subject` (string) — Filter by subject
- `grade` (string) — Filter by grade
- `difficulty` (string) — Filter by difficulty
- `topicType` (string) — Filter by topic type
- `limit` (number) — Results per page
- `page` (number) — Page number

**Query Params for `/search/formulas`:**
- `q` (string, required) — Formula search query
- `subject` (string) — Filter by subject
- `grade` (string) — Filter by grade
- `limit` (number) — Results per page

---

### Subject Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/subjects` | `PublicLayout` | `SubjectBrowsePage` | `/api/subjects` | Subject grid overview |
| `/subjects/[subject]` | `PublicLayout` | `SubjectDetailPage` | `/api/subjects/:subject/grades`, `/api/documents?subject=` | Subject detail with grades |
| `/subjects/[subject]/grade/[grade]` | `PublicLayout` | `GradeFilterPage` | `/api/documents?subject=&grade=` | Documents filtered by subject and grade |

---

### Quran Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/quran` | `QuranLayout` | `QuranRedirectPage` | None | Redirect to `/quran/1` |
| `/quran/[surahNumber]` | `QuranLayout` | `SurahPage` | `/api/quran/surah/:surahNumber` | Full surah view |
| `/quran/[surahNumber]/ayah/[ayahNumber]` | `QuranLayout` | `AyahPage` | `/api/quran/ayah/:surah/:ayah` | Single ayah view |
| `/quran/range/[surahNumber]/[start]/[end]` | `QuranLayout` | `RangePage` | `/api/quran/range/:surah/:start/:end` | Ayah range view (modal or full page) |

---

### Export Routes

| Route | Layout | Page Component | APIs Used | Description |
|-------|--------|----------------|-----------|-------------|
| `/exports/[exportJobId]` | `PublicLayout` | `ExportStatusPage` | `/api/exports/:id`, `/api/export/:id/stale` | Export job status and download |
| `/exports/[exportJobId]/loading` | `PublicLayout` | `ExportStatusSkeleton` | None | Loading state for export status |

---

### Admin Routes (Protected)

All admin routes use `AdminLayout` which includes authentication middleware.

| Route | Page Component | APIs Used | Description |
|-------|----------------|-----------|-------------|
| `/admin` | `AdminDashboard` | `/api/utility/platform-stats`, recent imports, recent ingests | Admin overview dashboard |
| `/admin/ingest` | `IngestionPage` | `POST /api/ingest/json` | JSON submission form |
| `/admin/ingest/[trackingId]` | `IngestionStatusPage` | `GET /api/ingest/:trackingId`, `POST /api/ingest/:id/cancel`, `POST /api/ingest/:id/retry` | Job status tracker |
| `/admin/import` | `BatchImportPage` | `POST /api/admin/import/preview`, `POST /api/admin/import/start` | GitHub batch import form |
| `/admin/import/[batchId]` | `ImportStatusPage` | `GET /api/admin/import/:batchId`, retry/cancel endpoints | Import progress dashboard |
| `/admin/import/[batchId]/report` | `ImportReportPage` | `GET /api/admin/import/:batchId/report` | Download import report |
| `/admin/analytics` | `AnalyticsDashboard` | `/api/utility/analytics/search`, `/api/utility/analytics/topics`, `/api/utility/failed-searches`, `/api/utility/popular-topics` | Analytics viewer |
| `/admin/analytics/search` | `SearchAnalyticsPage` | `/api/utility/analytics/search` | Detailed search analytics |
| `/admin/versions/[entityType]/[entityId]` | `VersionHistoryPage` | Integrated in topic/document APIs | Version management |

---

## Layout Hierarchy

```
RootLayout (app/layout.tsx)
├── Providers (TanStack Query, Zustand, Theme)
├── Fonts (Inter, Arabic font for Quran)
└── ── PublicLayout (documents, subjects, exports)
│       ├── Header (with search bar)
│       ├── Footer
│       └── Page Content
│
├── ── TopicLayout (topics/slug/*)
│       ├── Header
│       ├── Breadcrumb
│       ├── Main Content (BlockRenderer)
│       ├── Sidebar (TOC, related topics, export)
│       └── Footer
│
├── ── SearchLayout (search/*)
│       ├── Header
│       ├── Search Bar (prominent)
│       ├── Filter Sidebar
│       ├── Results Area
│       └── Footer
│
├── ── QuranLayout (quran/*)
│       ├── Header
│       ├── Surah Selector
│       ├── Ayah Navigator
│       ├── Translation Toggle
│       └── Footer
│
└── ── AdminLayout (admin/*) [Protected]
        ├── Admin Sidebar Navigation
        ├── Admin Header
        └── Page Content
```

---

## Route Middleware

### Authentication Middleware

**File:** `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    const adminId = request.headers.get('x-admin-id') || 
                    process.env.ADMIN_ID;
    
    if (!adminId) {
      // Redirect to login or show unauthorized
      return NextResponse.redirect(new URL('/401', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### Slug Resolution Middleware

**File:** `src/middleware/slugResolver.ts`

Handles 404 scenarios by checking slug redirects before showing 404 page.

---

## Loading States

Each route group includes `loading.tsx` files for suspense boundaries:

| Route | Loading Component |
|-------|-------------------|
| `/topics/slug/[...slug]` | `TopicSkeleton` (breadcrumb, title, content blocks placeholders) |
| `/exports/[exportJobId]` | `ExportStatusSkeleton` (progress indicator placeholder) |
| `/documents/[documentId]` | `DocumentSkeleton` (metadata and topic list placeholders) |

---

## Error Boundaries

**File:** `src/app/error.tsx` (global error boundary)

**Per-route error handling:**
- Topic pages: Show "Content not found" with related topics
- Search pages: Show "Search failed" with suggestions
- Admin pages: Show "Access denied" or "System error"

---

## Redirects Configuration

**File:** `next.config.ts`

```typescript
const nextConfig = {
  redirects: async () => [
    // Quran root redirect
    {
      source: '/quran',
      destination: '/quran/1',
      permanent: false,
    },
    // Old topic ID routes to slug routes
    {
      source: '/topics/:topicId',
      destination: '/topics/slug/:slug',
      permanent: true,
    },
    // Admin shortcut
    {
      source: '/dashboard',
      destination: '/admin',
      permanent: true,
    },
  ],
};
```

---

## API Mapping Summary

### Homepage APIs
- `GET /api/utility/platform-stats` → Stats display
- `GET /api/utility/recent-arrivals` → Recent content carousel
- `GET /api/utility/popular-topics` → Trending topics widget
- `GET /api/subjects` → Subject browse cards

### Document List APIs
- `GET /api/documents` → Main list
- `GET /api/subjects` → Filter dropdown
- `GET /api/grades` → Filter dropdown

### Topic Page APIs
- `GET /api/topics/slug/*` → Metadata
- `GET /api/topics/:id/content` → Content blocks
- `GET /api/topics/:id/assets` → Figures/tables
- `GET /api/seo/topic/:id/jsonld` → Structured data

### Search APIs
- `GET /api/search` → Results
- `GET /api/search/suggest` → Autocomplete
- `GET /api/search/formulas` → Formula results

### Admin APIs
- All ingestion endpoints
- All import endpoints
- Analytics endpoints

---

## Related Documents

- [01-system-architecture.md](./01-system-architecture.md) — System boundaries
- [03-layout-architecture.md](./03-layout-architecture.md) — Layout components
- [08-navigation-map.md](../frontend-discovery/08-navigation-map.md) — Navigation reference
- [13-folder-structure.md](./13-folder-structure.md) — Complete file structure
