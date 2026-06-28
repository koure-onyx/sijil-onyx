# Sijil — Frontend Discovery: Screen Inventory

**Generated:** 2026-06-27  
**Source Files:** Derived from routes, controllers, and services

---

## Overview

This document lists all frontend screens/pages required to build a complete frontend for Sijil, based on backend capabilities.

---

## Public Screens

### 1. Homepage

**Purpose:** Landing page with platform overview, stats, and navigation entry points

**APIs Used:**
- `GET /api/utility/platform-stats` — Display totals
- `GET /api/utility/recent-arrivals` — Show new content
- `GET /api/utility/popular-topics` — Trending topics widget
- `GET /api/subjects` — Subject browsing

**Data Needed:**
- Platform statistics (documents, topics, formulas count)
- Recent arrivals list (last 10)
- Popular topics (top 10)
- Subject list

**Actions Available:**
- Navigate to subject browse
- Search (global header)
- View recent arrivals detail
- Click popular topic

**Components:**
- Hero section with stats
- Search bar (header)
- Recent arrivals carousel
- Popular topics grid
- Subject cards

---

### 2. Document List Page

**Purpose:** Browse and filter documents by subject, grade, type

**APIs Used:**
- `GET /api/documents` — Main list with filters
- `GET /api/subjects` — Filter dropdown
- `GET /api/grades` — Filter dropdown

**Data Needed:**
- Paginated document list
- Filter options (subject, grade, type, status)
- Sort options

**Actions Available:**
- Apply filters
- Change sort order
- Pagination navigation
- Click document to view detail
- Search within results

**Query Params:**
- `subject`, `grade`, `type`, `status`, `sort`, `page`, `limit`

---

### 3. Document Detail Page

**Purpose:** View document metadata, chapter structure, and topic list

**APIs Used:**
- `GET /api/documents/:documentId` — Document details
- `GET /api/documents/:documentId/topics` — Topic list
- `GET /api/documents/:id/aggregates` — Counts

**Data Needed:**
- Document metadata (title, subject, grade, authors, etc.)
- Container/chapter info
- Topic references with slugs
- Aggregated counts

**Actions Available:**
- Navigate to chapter/topic
- Download/export document (if permitted)
- Share document
- View related documents

**Components:**
- Document header (title, metadata badges)
- Chapter outline
- Topic list (grouped by chapter)
- Stats sidebar (counts)
- Export button

---

### 4. Topic Page

**Purpose:** Main content consumption screen displaying topic content

**APIs Used:**
- `GET /api/topics/slug/*slug` OR `GET /api/topics/:topicId` — Metadata
- `GET /api/topics/:topicId/content` — Content blocks
- `GET /api/topics/:topicId/assets` — Figures/tables
- `GET /api/seo/topic/:topicId/jsonld` — Structured data

**Data Needed:**
- Topic metadata (title, seo, breadcrumbs)
- Content blocks array (polymorphic)
- Figures and tables
- Assessment counts
- JSON-LD for SEO

**Actions Available:**
- Navigate to next/prev topic
- Expand/collapse sections
- Toggle LaTeX rendering
- View figure fullscreen
- Export topic
- Share topic
- Report issue

**Components:**
- Breadcrumb navigation
- Topic header (title, difficulty badge)
- Block renderer (17 types)
- Figure gallery
- Assessment preview
- Next/prev navigation
- Export dropdown
- Sidebar (TOC, related topics)

---

### 5. Search Results Page

**Purpose:** Display search results with filters and facets

**APIs Used:**
- `GET /api/search` — Main search
- `GET /api/search/suggest` — Autocomplete (header)
- `GET /api/subjects` — Filter options
- `GET /api/grades` — Filter options

**Data Needed:**
- Search results array
- Result metadata (highlight snippets)
- Facet counts
- Query suggestions

**Actions Available:**
- Refine search (filters)
- Sort results
- Pagination
- Click result to view topic
- Save search
- Clear filters

**Query Params:**
- `q` (required), `subject`, `grade`, `difficulty`, `topicType`, `limit`, `page`

**Components:**
- Search bar (with autocomplete)
- Filter sidebar
- Results list
- Result card (title, snippet, badges)
- Pagination controls
- No results state with suggestions

---

### 6. Formula Search Results Page

**Purpose:** Specialized search for mathematical formulas

**APIs Used:**
- `GET /api/search/formulas` — Formula search

**Data Needed:**
- Formula results with LaTeX
- Topic context for each formula

**Actions Available:**
- View formula detail
- Navigate to source topic
- Copy LaTeX
- Export formula pack

**Components:**
- Formula card (LaTeX render, name, variables)
- Source topic link
- Copy button
- Export action

---

### 7. Export Status Page

**Purpose:** Track export job progress and download completed exports

**APIs Used:**
- `GET /api/exports/:exportJobId` — Job status
- `GET /api/export/:exportJobId/stale` — Staleness check

**Data Needed:**
- Job status (pending, processing, complete, error)
- Download URL when complete
- Error messages if failed

**Actions Available:**
- Refresh status
- Download when ready
- Retry failed export
- Close modal/page

**Components:**
- Progress indicator
- Status message
- Download button (when ready)
- Error display (if failed)
- Retry button

---

### 8. Quran Browser Page

**Purpose:** Browse Quran by surah and ayah

**APIs Used:**
- `GET /api/quran/surah/:surahNumber` — Surah list
- `GET /api/quran/ayah/:surah/:ayah` — Single ayah
- `GET /api/quran/range/:surah/:start/:end` — Ayah range

**Data Needed:**
- Surah metadata (name, revelation type, ayah count)
- Ayah text (Urdu/English translations)
- Navigation structure (juz, hizb, ruku)

**Actions Available:**
- Navigate surahs
- Navigate ayahs
- Switch translation language
- Copy ayah text
- Share ayah

**Components:**
- Surah selector dropdown
- Ayah navigator
- Translation toggle
- Arabic text display (external font)
- Urdu/English translation panels

---

### 9. Subject Browse Page

**Purpose:** Explore content by subject area

**APIs Used:**
- `GET /api/subjects` — All subjects
- `GET /api/subjects/:subject/grades` — Grades for subject
- `GET /api/documents?subject=` — Documents in subject

**Data Needed:**
- Subject list
- Grade levels per subject
- Document count per subject/grade

**Actions Available:**
- Select subject
- Select grade
- Navigate to subject-grade combination

**Components:**
- Subject grid/cards
- Grade level selector
- Document preview

---

### 10. 404 Page with Redirect Resolution

**Purpose:** Handle missing pages and resolve slug redirects

**APIs Used:**
- `GET /api/utility/slug/resolve?slug=` — Check for redirect

**Data Needed:**
- Original requested slug
- Resolved URL (if redirect exists)

**Actions Available:**
- Auto-redirect if found
- Manual navigation
- Return home

**Components:**
- "Page not found" message
- Redirect notice
- Search bar
- Home link

---

## Admin Screens

### 11. Admin Dashboard

**Purpose:** Admin overview with system stats and quick actions

**APIs Used:**
- `GET /api/utility/platform-stats` — System stats
- `GET /api/admin/import/` — Recent imports
- `GET /api/ingest/` — Recent ingests

**Data Needed:**
- Platform statistics
- Recent import jobs
- Recent ingest jobs
- System health status

**Actions Available:**
- Start new import
- Submit ingest job
- View analytics
- Access admin tools

**Components:**
- Stats cards
- Recent jobs table
- Quick action buttons
- Health status indicator

---

### 12. JSON Ingestion Page

**Purpose:** Submit JSON documents for AI processing

**APIs Used:**
- `POST /api/ingest/json` — Submit
- `GET /api/ingest/:trackingId` — Check status

**Data Needed:**
- JSON editor content
- Validation errors (if any)
- Job tracking ID

**Actions Available:**
- Paste/edit JSON
- Validate before submit
- Submit for ingestion
- Track job status
- Cancel job
- Retry failed job

**Components:**
- JSON code editor (syntax highlighting)
- Schema validator
- Submit button
- Status tracker
- Error display
- Job history table

---

### 13. Batch Import Page

**Purpose:** Import multiple documents from GitHub repository

**APIs Used:**
- `POST /api/admin/import/preview` — Preview
- `POST /api/admin/import/start` — Start import
- `GET /api/admin/import/:batchId` — Status

**Data Needed:**
- GitHub repo URL
- Preview results (documents/topics found)
- Import progress by stage

**Actions Available:**
- Enter repo URL
- Preview contents
- Start import
- Monitor progress
- Cancel import
- Retry failed files
- Download report

**Components:**
- Repo URL input
- Preview results table
- Multi-stage progress bars
- Action buttons (start, cancel, retry)
- Error log display
- Report download button

---

### 14. Import Status Page

**Purpose:** Detailed view of batch import progress

**APIs Used:**
- `GET /api/admin/import/:batchId` — Full status

**Data Needed:**
- Batch metadata
- Progress per stage (scanning, validating, importing, indexing)
- Success/failure counts
- Failed files list with errors

**Actions Available:**
- Refresh status
- Retry failed files
- Cancel import
- Download report

**Components:**
- Progress dashboard (4 stages)
- Counts summary
- Failed files table
- Error details accordion
- Action buttons

---

### 15. Analytics Dashboard

**Purpose:** View search and topic analytics

**APIs Used:**
- `GET /api/utility/analytics/search` — Search analytics
- `GET /api/utility/analytics/topics` — Topic analytics
- `GET /api/utility/failed-searches` — Failed searches
- `GET /api/utility/popular-topics` — Popular topics

**Data Needed:**
- Search query stats
- Popular topics list
- Failed search queries
- View counts

**Actions Available:**
- Filter by date range
- Export analytics data
- Identify content gaps

**Components:**
- Search analytics chart
- Popular topics table
- Failed searches list
- Date range picker
- Export button

---

### 16. Version History Page (Admin)

**Purpose:** View and manage document/topic versions

**APIs Used:**
- Integrated in document/topic APIs with version params

**Data Needed:**
- Version history list
- Version diffs
- Archive status

**Actions Available:**
- View historical version
- Compare versions
- Restore previous version
- Archive/unarchive

**Components:**
- Version timeline
- Diff viewer
- Restore button
- Archive toggle

---

## Summary Table

| Screen | Route Pattern | Public | API Count | Complexity |
|--------|--------------|--------|-----------|------------|
| Homepage | `/` | ✅ | 4 | Medium |
| Document List | `/documents` | ✅ | 3 | Medium |
| Document Detail | `/documents/:id` | ✅ | 3 | Medium |
| Topic Page | `/topics/:slug` | ✅ | 4 | High |
| Search Results | `/search` | ✅ | 3 | Medium |
| Formula Search | `/search/formulas` | ✅ | 1 | Low |
| Export Status | `/exports/:id` | ✅ | 2 | Low |
| Quran Browser | `/quran/:surah` | ✅ | 3 | Medium |
| Subject Browse | `/subjects/:subject` | ✅ | 3 | Low |
| 404 Page | `*` | ✅ | 1 | Low |
| Admin Dashboard | `/admin` | - | 3 | Medium |
| JSON Ingestion | `/admin/ingest` | - | 2 | High |
| Batch Import | `/admin/import` | - | 3 | High |
| Import Status | `/admin/import/:id` | - | 1 | Medium |
| Analytics Dashboard | `/admin/analytics` | - | 4 | Medium |
| Version History | `/admin/versions/:entity` | - | (integrated) | Medium |

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [02-api-inventory.md](./02-api-inventory.md) — API reference
- [08-navigation-map.md](./08-navigation-map.md) — Navigation structure
- [10-page-data-requirements.md](./10-page-data-requirements.md) — Detailed data needs
