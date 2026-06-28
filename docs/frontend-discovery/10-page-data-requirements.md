# Sijil — Frontend Discovery: Page Data Requirements

**Generated:** 2026-06-27  
**Source Files:** Derived from API inventory and screen requirements

---

## Overview

This document specifies the exact data requirements for each page/screen, including API calls, models needed, loading dependencies, and caching opportunities.

---

## Homepage (`/`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/utility/platform-stats` | GET | Display totals | Yes |
| `/api/utility/recent-arrivals` | GET | Show new content | No |
| `/api/utility/popular-topics` | GET | Trending widget | No |
| `/api/subjects` | GET | Subject browsing | Yes |

### Models Required
- `platform_stats` — Singleton stats document
- `popular_topics` — Top viewed topics
- `documents` — For recent arrivals projection

### Loading Dependencies
- **Initial Load:** Platform stats (blocking)
- **Lazy Load:** Recent arrivals, popular topics (non-blocking)
- **Prefetch:** Subjects list on hover

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Platform Stats | SWR (stale-while-revalidate) | 5 min | On new ingestion |
| Recent Arrivals | Time-based | 1 hour | On new document |
| Popular Topics | Time-based | 15 min | Periodic recomputation |
| Subjects List | Permanent | Never | Rarely changes |

### Data Transformations Needed
- Format stats numbers (k, M suffixes)
- Sort recent arrivals by date
- Limit popular topics to top 10

---

## Document List Page (`/documents`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/documents` | GET | Main list | Yes |
| `/api/subjects` | GET | Filter options | Yes |
| `/api/grades` | GET | Filter options | Yes |

### Models Required
- `documents` — Main collection
- `topics` — For topic count projection

### Loading Dependencies
- **Initial Load:** Documents list with default filters
- **Lazy Load:** None
- **Prefetch:** First page of results

### Query Parameters
- `subject` (optional)
- `grade` (optional)
- `type` (optional)
- `status` (optional, default: published)
- `sort` (optional, default: title)
- `page` (default: 1)
- `limit` (default: 20)

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Subjects List | Permanent | Never | - |
| Grades List | Permanent | Never | - |
| Document List (per filter combo) | SWR | 2 min | On document update |

### Data Transformations Needed
- Aggregate topic counts per document
- Format publication dates
- Generate filter facet counts

---

## Document Detail Page (`/documents/:documentId`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/documents/:documentId` | GET | Document metadata | Yes |
| `/api/documents/:documentId/topics` | GET | Topic list | Yes |
| `/api/documents/:id/aggregates` | GET | Counts | No |

### Models Required
- `documents` — Full document with container
- `topics` — Topic references
- `topic_content` — For formula/MCQ counts

### Loading Dependencies
- **Initial Load:** Document metadata (blocking)
- **Parallel Load:** Topics list, aggregates
- **Prefetch:** First topic's content

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Document Metadata | SWR | 1 hour | On document update |
| Topic List | SWR | 30 min | On topic add/remove |
| Aggregates | Time-based | 10 min | Periodic |

### Data Transformations Needed
- Group topics by chapter/container
- Calculate reading time estimates
- Build chapter outline tree

---

## Topic Page (`/topics/slug/*slug`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/topics/slug/*slug` | GET | Topic metadata | Yes |
| `/api/topics/:topicId/content` | GET | Content blocks | Yes |
| `/api/topics/:topicId/assets` | GET | Figures/tables | Yes |
| `/api/seo/topic/:topicId/jsonld` | GET | Structured data | No (SEO) |

### Models Required
- `topics` — Metadata, SEO, GEO
- `topic_content` — Blocks, formulas, FAQs
- `topic_assets` — Figures, tables
- `topic_assessments` — MCQs, questions (for counts)
- `formula_index` — For formula count

### Loading Dependencies
- **Critical Path:**
  1. Topic metadata (blocking)
  2. Content blocks (blocking for render)
  3. Assets (parallel with content)
- **Lazy Load:** Assessments detail, JSON-LD
- **Prefetch:** Next/prev topic metadata

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Topic Metadata | SWR | 1 hour | On topic update |
| Content Blocks | SWR | 30 min | On content change |
| Assets | SWR | 1 hour | On asset update |
| JSON-LD | Permanent | Until topic change | SEO regeneration |

### Data Transformations Needed
- Build table of contents from heading blocks
- Extract key terms for sidebar
- Calculate estimated read time
- Generate canonical URL

---

## Search Results Page (`/search`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/search` | GET | Main search | Yes |
| `/api/search/suggest` | GET | Autocomplete | No (UX enhancement) |
| `/api/subjects` | GET | Filter options | Yes |
| `/api/grades` | GET | Filter options | Yes |

### Models Required
- `topics` — Search target
- `topic_content` — For snippet extraction
- `popular_searches` — For suggestions
- `failed_searches` — Track no-results

### Loading Dependencies
- **Initial Load:** Search results (blocking)
- **Debounced:** Autocomplete suggestions
- **Lazy Load:** Additional pages

### Query Parameters
- `q` (required) — Search query
- `subject` (optional)
- `grade` (optional)
- `difficulty` (optional)
- `topicType` (optional)
- `limit` (default: 20)
- `page` (default: 1)

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Search Results (per query) | Short-term | 1 min | Real-time content |
| Suggestions (per prefix) | Time-based | 5 min | Periodic |
| Filter Options | Permanent | Never | - |

### Data Transformations Needed
- Highlight matched terms in snippets
- Aggregate facet counts
- Rank by relevance score

---

## Formula Search Page (`/search/formulas`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/search/formulas` | GET | Formula search | Yes |

### Models Required
- `formula_index` — Flat formula collection
- `topics` — For source context

### Loading Dependencies
- **Initial Load:** Formula results
- **Lazy Load:** Source topic preview on hover

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Formula Results | Short-term | 2 min | On formula add |

---

## Export Status Page (`/exports/:exportJobId`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/exports/:exportJobId` | GET | Job status | Yes |
| `/api/export/:exportJobId/stale` | GET | Staleness check | No |

### Models Required
- `export_jobs` — Job tracking
- `topics` — For content hash comparison

### Loading Dependencies
- **Polling:** Status check every 3-5 seconds
- **On Complete:** Trigger download

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Job Status | No cache (polling) | - | Real-time |

---

## Quran Browser Page (`/quran/:surahNumber`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/quran/surah/:surahNumber` | GET | Surah data | Yes |

### Models Required
- `quran_surahs` — Surah metadata
- `quran_ayahs` — Ayah text

### Loading Dependencies
- **Initial Load:** Surah metadata + all ayahs
- **Lazy Load:** Individual ayah detail modal

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Surah Data | Permanent | Never | Static content |
| Ayah Text | Permanent | Never | Static content |

---

## Admin Dashboard (`/admin`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/utility/platform-stats` | GET | System stats | Yes |
| `/api/admin/import/` | GET | Recent imports | No |
| `/api/ingest/` | GET | Recent ingests | No |

### Models Required
- `platform_stats`
- `import_batch`
- `ingest_queue`

### Loading Dependencies
- **Initial Load:** Platform stats
- **Lazy Load:** Recent job lists

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Platform Stats | SWR | 1 min | Real-time monitoring |
| Recent Jobs | Short-term | 30 sec | Polling |

---

## JSON Ingestion Page (`/admin/ingest`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/ingest/json` | POST | Submit | Yes |
| `/api/ingest/:trackingId` | GET | Status | Yes (after submit) |

### Models Required
- `ingest_queue` — Job tracking
- `documents` — For duplicate detection

### Loading Dependencies
- **On Submit:** Wait for response
- **After Submit:** Poll status endpoint

### Caching Opportunities
- No caching (write operation)

---

## Batch Import Page (`/admin/import`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/admin/import/preview` | POST | Preview | Yes |
| `/api/admin/import/start` | POST | Start | Yes |
| `/api/admin/import/:batchId` | GET | Status | Yes (after start) |

### Models Required
- `import_batch` — Batch tracking
- `audit_log` — Action logging

### Loading Dependencies
- **Preview Phase:** Wait for scan complete
- **Import Phase:** Poll status every 10 seconds

### Caching Opportunities
- No caching (real-time progress)

---

## Analytics Dashboard (`/admin/analytics`)

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/utility/analytics/search` | GET | Search stats | Yes |
| `/api/utility/failed-searches` | GET | Failed queries | Yes |
| `/api/utility/popular-topics` | GET | Popular content | Yes |

### Models Required
- `popular_searches`
- `failed_searches`
- `popular_topics`

### Loading Dependencies
- **Initial Load:** All analytics data
- **On Filter:** Refetch with date range

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Analytics Data | Short-term | 5 min | Periodic refresh |

---

## 404 Page with Redirect Resolution

### APIs Required
| API | Method | Purpose | Critical |
|-----|--------|---------|----------|
| `/api/utility/slug/resolve` | GET | Check redirect | Yes |

### Models Required
- `slug_redirects` — Redirect mappings
- `slug_registry` — Current slugs

### Loading Dependencies
- **Blocking:** Resolve check before showing 404

### Caching Opportunities
| Data | Cache Strategy | TTL | Invalidation |
|------|---------------|-----|--------------|
| Redirect Resolution | Permanent | Until slug change | On slug update |

---

## Global Caching Strategy

### Service Worker Configuration
```javascript
// Cache-first for static assets
// Network-first for API calls
// Stale-while-revalidate for content
```

### React Query / SWR Configuration
```javascript
{
  staleTime: 1000 * 60 * 5,  // 5 minutes
  gcTime: 1000 * 60 * 30,    // 30 minutes
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
}
```

### Invalidation Triggers
| Event | Invalidate |
|-------|------------|
| New document ingested | Homepage stats, document list |
| Topic updated | Topic page, search results |
| Export completed | Export status page |
| Import completed | Admin dashboard, import list |

---

## Related Documents

- [02-api-inventory.md](./02-api-inventory.md) — API reference
- [06-screen-inventory.md](./06-screen-inventory.md) — Screen definitions
- [08-navigation-map.md](./08-navigation-map.md) — Routing structure
