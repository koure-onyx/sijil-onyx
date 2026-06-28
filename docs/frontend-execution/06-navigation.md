# Sijil — Frontend Execution: Navigation

**Generated:** 2026-06-27
**Source:** `docs/frontend-discovery/08-navigation-map.md`, `docs/frontend-discovery/07-user-flows.md`

---

## Overview

This document defines all navigation flows, routes, and URL patterns for the Sijil frontend. Each route is traceable to its source in the discovery documents.

---

## Route Taxonomy

### Public Routes (12 total)

| Route | Page Component | Layout | Purpose |
|-------|---------------|--------|---------|
| `/` | `HomePage` | `MainLayout` | Landing page with stats and widgets |
| `/documents` | `DocumentListPage` | `MainLayout` | Browse all documents with filters |
| `/documents/:documentId` | `DocumentDetailPage` | `MainLayout` | Document metadata and topic list |
| `/topics/slug/*slug` | `TopicPage` | `MainLayout` | Main content consumption (wildcard for multi-segment slugs) |
| `/topics/:topicId` | `TopicPage` | `MainLayout` | Alternative by ID (redirects to slug) |
| `/search` | `SearchResultsPage` | `SearchLayout` | Search results with facets |
| `/search/formulas` | `FormulaSearchPage` | `SearchLayout` | Formula-specific search |
| `/subjects` | `SubjectBrowsePage` | `MainLayout` | Subject grid |
| `/subjects/:subject` | `SubjectDetailPage` | `MainLayout` | Subject detail with grades |
| `/quran` | `QuranBrowserPage` | `QuranLayout` | Default to Surah 1 |
| `/quran/:surahNumber` | `QuranSurahPage` | `QuranLayout` | Specific surah view |
| `/exports/:exportJobId` | `ExportStatusPage` | `MainLayout` | Export job tracking |
| `/404` | `NotFoundPage` | `MainLayout` | 404 handler with redirect resolution |

### Admin Routes (7 total, Protected)

| Route | Page Component | Layout | Auth Required |
|-------|---------------|--------|---------------|
| `/admin` | `AdminDashboardPage` | `AdminLayout` | Admin |
| `/admin/ingest` | `IngestionPage` | `AdminLayout` | Admin |
| `/admin/ingest/:trackingId` | `IngestionStatusPage` | `AdminLayout` | Admin |
| `/admin/import` | `BatchImportPage` | `AdminLayout` | Admin |
| `/admin/import/:batchId` | `ImportStatusPage` | `AdminLayout` | Admin |
| `/admin/analytics` | `AnalyticsDashboardPage` | `AdminLayout` | Admin |
| `/admin/versions/:entityType/:entityId` | `VersionHistoryPage` | `AdminLayout` | Admin |

---

## Navigation Tree

```
/ (Homepage)
├── /documents (Document List)
│   └── /documents/:documentId (Document Detail)
│       └── /topics/slug/*slug (Topic Page - via topic refs)
│
├── /subjects (Subject Browse)
│   ├── /subjects/:subject (Subject Detail)
│   │   └── /subjects/:subject/grade/:grade (Grade Filter)
│   │       └── Redirect to /documents?subject=&grade=
│   └── API: /api/subjects/:subject/grades
│
├── /search (Search Results)
│   ├── /search?q=:query (Text Search)
│   ├── /search/formulas?q=:query (Formula Search)
│   └── /search/suggest?prefix=:prefix (Autocomplete - Header component)
│
├── /quran (Quran Browser)
│   ├── /quran → Redirects to /quran/1
│   ├── /quran/:surahNumber (Surah View)
│   ├── /quran/ayah/:surah/:ayah (Single Ayah - modal or page)
│   └── /quran/range/:surah/:start/:end (Ayah Range Modal)
│
├── /exports/:exportJobId (Export Status)
│   └── Download: /api/export/download?topic_id=&format=
│
├── /admin (Admin Dashboard) [Protected]
│   ├── /admin/ingest (JSON Ingestion Form)
│   │   └── /api/ingest/:trackingId (Job Status)
│   ├── /admin/import (Batch Import Form)
│   │   ├── /api/admin/import/preview
│   │   ├── /api/admin/import/start
│   │   └── /admin/import/:batchId (Import Status)
│   ├── /admin/analytics (Analytics Dashboard)
│   │   ├── /api/utility/analytics/search
│   │   ├── /api/utility/failed-searches
│   │   └── /api/utility/popular-topics
│   └── /admin/versions/:entityType/:entityId (Version History)
│
└── /404 (Not Found Handler)
    └── /api/utility/slug/resolve?slug=:slug (Redirect Resolution)
```

---

## Detailed Route Specifications

### Homepage

**Route:** `/`
**Page:** `HomePage`
**Layout:** `MainLayout`

**Data Requirements:**
- Platform stats (`GET /api/utility/platform-stats`)
- Recent arrivals (`GET /api/utility/recent-arrivals`)
- Popular topics (`GET /api/utility/popular-topics`)
- Subject list (derived from documents)

**SEO:**
- Title: "Sijil - Educational Content Platform"
- Description: Meta description from config
- JSON-LD: Organization schema

**Components:**
- StatCard (4 instances)
- RecentArrivalCard carousel
- SubjectCard grid
- SearchBar (prominent)

---

### Document List

**Route:** `/documents`
**Page:** `DocumentListPage`
**Layout:** `MainLayout`

**Query Parameters:**
- `subject?: string`
- `grade?: number`
- `type?: string`
- `page?: number`
- `limit?: number` (default 20)

**Data Requirements:**
- `GET /api/documents` with filters

**SEO:**
- Title: "Browse Documents - Sijil"
- Canonical: `/documents`

**Components:**
- DocumentCard (list)
- FilterPanel
- Pagination
- Breadcrumb

---

### Document Detail

**Route:** `/documents/:documentId`
**Page:** `DocumentDetailPage`
**Layout:** `MainLayout`

**Data Requirements:**
- `GET /api/documents/:id`
- `GET /api/documents/:id/aggregates`
- `GET /api/documents/:id/topics` (topic refs)

**SEO:**
- Title: From `document_metadata.title`
- Description: From `seo_master.meta_description`
- JSON-LD: Book or CreativeWork schema

**Components:**
- Breadcrumb
- DocumentMeta
- TopicCard list
- ChapterOutline

---

### Topic Page (Primary)

**Route:** `/topics/slug/*slug`
**Page:** `TopicPage`
**Layout:** `MainLayout`

**URL Pattern:** Wildcard to support multi-segment slugs like `/topics/slug/physics/grade-9/chapter-1/vernier-callipers`

**Data Requirements:**
- `GET /api/topics/slug/:slug` or `GET /api/topics/:id/page`
- `GET /api/topics/:id/content`
- `GET /api/topics/:id/assets`
- `GET /api/topics/:id/assessments`

**SEO:**
- Title: From `seo.meta_title` or `title`
- Description: From `seo.meta_description`
- Canonical: From `seo.canonical_url`
- Breadcrumb: From `seo.breadcrumb`
- JSON-LD: LearningResource schema from `/api/seo/topic/:id/jsonld`

**Components:**
- Breadcrumb
- BlockRenderer
- TableOfContents (sidebar)
- Sidebar (related topics, export)
- NextPrevNavigation
- TabNavigation (optional variants)

**Loading States:**
- Skeleton for content blocks
- TOC skeleton

**Error States:**
- 404 if slug not found
- Fallback to `/api/utility/slug/resolve`

---

### Topic Page (ByID Redirect)

**Route:** `/topics/:topicId`
**Behavior:** 301 redirect to `/topics/slug/:slug_global`

**Implementation:**
```typescript
// In TopicPage loader
const topic = await fetch(`/api/topics/${topicId}`);
redirect(301, `/topics/slug/${topic.slug_global}`);
```

---

### Search Results

**Route:** `/search`
**Page:** `SearchResultsPage`
**Layout:** `SearchLayout`

**Query Parameters:**
- `q: string` (required)
- `subject?: string`
- `grade?: number`
- `difficulty?: "easy" | "medium" | "hard"`
- `type?: "topic" | "document" | "formula"`
- `page?: number`
- `limit?: number`

**Data Requirements:**
- `GET /api/search` with params
- `GET /api/search/suggest` (for autocomplete in SearchBar)

**SEO:**
- Noindex (dynamic search results)
- Canonical: `/search?q=:q`

**Components:**
- SearchBar (with autocomplete)
- FilterPanel
- SearchResultCard list
- Pagination
- EmptyState (no results)

**URL State:**
- All filters sync to URL query params
- Back/forward preserves state

---

### Formula Search

**Route:** `/search/formulas`
**Page:** `FormulaSearchPage`
**Layout:** `SearchLayout`

**Query Parameters:**
- `q: string` (LaTeX or text)
- `subject?: string`
- `grade?: number`

**Data Requirements:**
- `GET /api/search/formulas`

**Components:**
- SearchBar (formula-specific)
- FormulaCard list
- LatexRenderer preview

---

### Subject Browse

**Route:** `/subjects`
**Page:** `SubjectBrowsePage`
**Layout:** `MainLayout`

**Data Requirements:**
- Derived from `GET /api/documents` aggregation

**Components:**
- SubjectCard grid

---

### Subject Detail

**Route:** `/subjects/:subject`
**Page:** `SubjectDetailPage`
**Layout:** `MainLayout`

**Data Requirements:**
- `GET /api/documents?subject=:subject`
- Available grades (derived)

**Components:**
- Grade filter buttons
- DocumentCard list

---

### Quran Browser

**Route:** `/quran`
**Page:** `QuranBrowserPage`
**Layout:** `QuranLayout`

**Behavior:** Redirects to `/quran/1` (Surah Al-Fatiha)

---

### Quran Surah Page

**Route:** `/quran/:surahNumber`
**Page:** `QuranSurahPage`
**Layout:** `QuranLayout`

**Data Requirements:**
- `GET /api/quran/:surahNumber`

**Components:**
- SurahSelector
- AyahDisplay list
- TranslationToggle
- Navigation (prev/next surah)

**RTL Support:**
- Arabic text requires RTL layout
- Urdu translation may require specific fonts

---

### Export Status

**Route:** `/exports/:exportJobId`
**Page:** `ExportStatusPage`
**Layout:** `MainLayout`

**Data Requirements:**
- Poll `GET /api/exports/:id` until complete

**Components:**
- ProgressBar
- ExportModal (if re-triggering)
- Download button (when complete)

---

### Admin Dashboard

**Route:** `/admin`
**Page:** `AdminDashboardPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Data Requirements:**
- `GET /api/utility/platform-stats`
- Recent import batches
- Recent ingestion jobs

**Components:**
- StatCard (platform stats)
- RecentActivity table
- QuickActions

---

### Admin Ingestion

**Route:** `/admin/ingest`
**Page:** `IngestionPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Components:**
- JsonEditor
- IngestionForm
- SubmitConfirmation

**APIs:**
- `POST /api/ingest/json`

---

### Admin Import

**Route:** `/admin/import`
**Page:** `BatchImportPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Components:**
- FileUpload (or repo URL input)
- ImportPreviewTable
- StartImport button

**APIs:**
- `POST /api/admin/import/preview`
- `POST /api/admin/import/start`

---

### Admin Import Status

**Route:** `/admin/import/:batchId`
**Page:** `ImportStatusPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Data Requirements:**
- Poll `GET /api/admin/import/:batchId`

**Components:**
- MultiStageProgress
- ImportErrorLog
- ImportPreviewTable

---

### Admin Analytics

**Route:** `/admin/analytics`
**Page:** `AnalyticsDashboardPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Data Requirements:**
- `GET /api/utility/analytics/search`
- `GET /api/utility/failed-searches`
- `GET /api/utility/popular-topics`

**Components:**
- AnalyticsChart (multiple)
- DataTable (failed searches)

---

### Admin Version History

**Route:** `/admin/versions/:entityType/:entityId`
**Page:** `VersionHistoryPage`
**Layout:** `AdminLayout`
**Auth:** Admin required

**Data Requirements:**
- `GET /api/versions/:entityType/:entityId`

**Components:**
- VersionDiffViewer
- DataTable (version list)

---

### 404 Handler

**Route:** `/404`
**Page:** `NotFoundPage`
**Layout:** `MainLayout`

**Behavior:**
1. Catch-all route for unmatched paths
2. Call `GET /api/utility/slug/resolve?slug=:capturedSlug`
3. If resolved, 301 redirect to correct URL
4. If not resolved, show 404 page

**Components:**
- EmptyState (custom 404 variant)
- SearchBar (suggest finding content)

---

## URL Patterns Reference

### Document URLs

```
/documents                          # List all
/documents/:documentId              # Single document
/documents/:documentId/topics       # Topics in document
/documents/:id/aggregates           # Counts
```

### Topic URLs

```
/topics/slug/*slug                  # By global slug (primary, wildcard)
/topics/:topicId                    # By ID (redirects to slug)
/topics/:topicId/content            # Content blocks only
/topics/:topicId/assets             # Assets only
/topics/:topicId/assessments        # Assessments only
/topics/:topicId/page               # Full page data
```

### Search URLs

```
/search?q=:query&subject=&grade=&difficulty=&type=&limit=&page=
/search/formulas?q=:query&subject=&grade=&limit=
/search/suggest?prefix=:prefix&limit=
/search/trending?limit=
```

### Quran URLs

```
/quran                              # Redirects to /quran/1
/quran/:surahNumber                 # Full surah
/quran/ayah/:surah/:ayah            # Single ayah (optional)
/quran/range/:surah/:start/:end     # Ayah range (modal)
```

### Export URLs

```
/exports                            # POST to create
/exports/:exportJobId               # GET status check
/api/export/download?topic_id=&format=  # Direct download
/api/export/:exportJobId/stale      # Staleness check
```

### Admin URLs

```
/admin                              # Dashboard
/admin/ingest                       # JSON submission
/admin/ingest/:trackingId           # Job status
/admin/import                       # Batch import form
/admin/import/preview               # POST preview
/admin/import/start                 # POST start
/admin/import/:batchId              # GET status
/admin/import/:batchId/retry        # POST retry
/admin/import/:batchId/cancel       # POST cancel
/admin/import/:batchId/report       # GET report
/admin/analytics                    # Analytics dashboard
/admin/versions/:entityType/:entityId  # Version history
```

### Utility URLs

```
/api/utility/platform-stats
/api/utility/recent-arrivals
/api/utility/popular-topics
/api/utility/failed-searches
/api/utility/slug/resolve?slug=
/api/utility/analytics/search
/api/utility/analytics/topics
```

### SEO URLs

```
/api/seo/topic/:topicId/jsonld
/api/seo/document/:documentId/jsonld
/api/seo/sitemap-index.xml
/api/seo/sitemap-:page.xml
/api/seo/topic/:topicId/aeo
/api/seo/topic/:topicId/aeo/score
```

---

## Global Navigation Components

### Header

**Location:** Fixed/sticky top on all pages

**Elements:**
1. **Logo** → Navigate to `/`
2. **Search Bar** → Debounced autocomplete, navigate to `/search?q=`
3. **Browse Dropdown:**
   - Subjects → `/subjects`
   - Documents → `/documents`
   - Formulas → `/search/formulas`
4. **Quran Link** → `/quran/1`
5. **Admin Link** → `/admin` (conditional on admin auth)

**APIs:**
- `/api/search/suggest` (autocomplete)

---

### Footer

**Location:** Bottom of all pages

**Elements:**
- About Us
- Contact
- Privacy Policy
- Terms of Service
- Social Media Links

---

### Breadcrumb

**Location:** Top of content pages (below header)

**Structure Example:**
```
Home > Documents > Physics Grade 9 > Chapter 1 > Vernier Callipers
  /      /documents  pk-pctb-phys-9   ch1         vernier-callipers
```

**Data Source:** `seo.breadcrumb` array from topic/document API response

---

### Sidebar (Topic Pages)

**Location:** Right sidebar on topic pages

**Elements:**
1. **Table of Contents** → Anchor links within page content
2. **Related Topics** → Links to related topic slugs
3. **Export Button** → Opens export modal
4. **Share Button** → Social sharing

---

### Mobile Navigation

**Responsive Breakpoints:**
- Desktop (>1024px): Full horizontal nav + sidebar
- Tablet (768-1024px): Collapsed sidebar, hamburger menu
- Mobile (<768px): Bottom tab bar + hamburger menu

**Bottom Tab Bar Items (Mobile):**
1. Home → `/`
2. Browse → `/documents`
3. Search → `/search`
4. Quran → `/quran/1`
5. Menu → Drawer with additional links

---

## Redirects & Rewrites

### Automatic Redirects

| From | To | Type | Implementation |
|------|-----|------|----------------|
| `/topics/:topicId` | `/topics/slug/:slug_global` | 301 | Server-side redirect in loader |
| `/quran` | `/quran/1` | 302 | Router-level redirect |
| Old slug paths | Resolved via API | 301 | 404 catch-all → resolve API → redirect |
| `/subjects/:subject/grade/:grade` | `/documents?subject=:subject&grade=:grade` | 301 | Router-level redirect |

### Client-Side Routing

- Use Next.js App Router for SPA behavior
- Wildcard route for multi-segment slugs: `/topics/slug/[[...slug]]`
- 404 catch-all triggers slug resolution API call

---

## Authentication Gates

### Protected Routes

| Route Pattern | Required Role | Middleware |
|--------------|--------------|------------|
| `/admin/*` | Admin | `requireAdmin` hook + server check |
| `/admin/ingest` | Admin | X-Admin-ID header (server) |
| `/admin/import` | Admin | X-Admin-ID header (server) |

### Public Routes

All other routes are publicly accessible without authentication.

---

## User Flows

### Flow 1: Document Discovery

```
Homepage
  ↓ (click subject card)
Subject Detail
  ↓ (select grade)
Document List (filtered)
  ↓ (click document)
Document Detail
  ↓ (click topic)
Topic Page
```

### Flow 2: Search

```
Any Page
  ↓ (use header search)
Search Results
  ↓ (apply filters)
Filtered Results
  ↓ (click result)
Topic Page or Document Detail
```

### Flow 3: Quran Browsing

```
Header Quran Link
  ↓
Surah List (or default Surah 1)
  ↓ (select surah)
Surah Page
  ↓ (navigate ayah)
Ayah View (scroll or modal)
```

### Flow 4: Export

```
Topic Page
  ↓ (click Export button)
Export Modal
  ↓ (select format)
Export Job Created
  ↓ (polling)
Export Status Page
  ↓ (complete)
Download Starts
```

### Flow 5: Admin Import

```
Admin Dashboard
  ↓ (click Import)
Batch Import Form
  ↓ (submit repo URL)
Import Preview
  ↓ (review)
Start Import
  ↓ (polling)
Import Status Page
  ↓ (complete)
View Report
```

---

## Traceability

All routes and flows derived from:
- **Source:** `docs/frontend-discovery/08-navigation-map.md`
- **User Flows:** `docs/frontend-discovery/07-user-flows.md`
- **Blueprint:** `docs/frontend-blueprint/02-route-architecture.md`

No routes invented; all mapped from backend capabilities and discovery analysis.
