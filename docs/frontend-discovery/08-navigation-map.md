# Sijil — Frontend Discovery: Navigation Map

**Generated:** 2026-06-27  
**Source Files:** Derived from routes, controllers, and user flows

---

## Overview

This document provides the complete navigation tree for the Sijil frontend application.

---

## Navigation Tree

```
/ (Homepage)
├── /documents (Document List)
│   └── /documents/:documentId (Document Detail)
│       └── /topics/slug/*slug (Topic Page)
│           ├── /topics/:topicId/content (Content View)
│           ├── /topics/:topicId/assets (Assets View)
│           └── /topics/:topicId/assessments (Assessment View)
│
├── /subjects (Subject Browse)
│   ├── /subjects/:subject (Subject Detail)
│   │   └── /subjects/:subject/grade/:grade (Grade Filter)
│   │       └── /documents?subject=&grade= (Filtered Documents)
│   └── /api/subjects/:subject/grades (Grades API)
│
├── /search (Search Results)
│   ├── /search?q= (Text Search)
│   ├── /search/formulas?q= (Formula Search)
│   └── /search/suggest?prefix= (Autocomplete - Header)
│
├── /quran (Quran Browser)
│   ├── /quran/:surahNumber (Surah View)
│   ├── /quran/ayah/:surah/:ayah (Single Ayah)
│   └── /quran/range/:surah/:start/:end (Ayah Range Modal)
│
├── /exports/:exportJobId (Export Status)
│   └── /api/export/download (Direct Download)
│
├── /admin (Admin Dashboard) [Protected]
│   ├── /admin/ingest (JSON Ingestion)
│   │   └── /api/ingest/:trackingId (Job Status)
│   ├── /admin/import (Batch Import)
│   │   ├── /api/admin/import/preview
│   │   ├── /api/admin/import/start
│   │   └── /admin/import/:batchId (Import Status)
│   ├── /admin/analytics (Analytics Dashboard)
│   │   ├── /api/utility/analytics/search
│   │   ├── /api/utility/failed-searches
│   │   └── /api/utility/popular-topics
│   └── /admin/versions/:entity (Version History)
│
├── /404 (Not Found Handler)
│   └── /api/utility/slug/resolve (Redirect Resolution)
│
└── Global Components (All Pages)
    ├── Header
    │   ├── Logo → /
    │   ├── Search Bar → /search?q=
    │   ├── Browse Dropdown
    │   │   ├── Subjects → /subjects
    │   │   ├── Documents → /documents
    │   │   └── Formulas → /search/formulas
    │   ├── Quran Link → /quran/1
    │   └── Admin Link → /admin (if authenticated)
    │
    └── Footer
        ├── About
        ├── Contact
        ├── Privacy Policy
        └── Terms of Service
```

---

## Route Definitions

### Public Routes

| Route Pattern | Component | Description |
|--------------|-----------|-------------|
| `/` | `HomePage` | Landing page with stats and widgets |
| `/documents` | `DocumentListPage` | Browse all documents with filters |
| `/documents/:documentId` | `DocumentDetailPage` | Document metadata and topic list |
| `/topics/slug/*slug` | `TopicPage` | Main content consumption (wildcard for multi-segment slugs) |
| `/topics/:topicId` | `TopicPage` | Alternative by ID redirect |
| `/search` | `SearchResultsPage` | Search results with facets |
| `/search/formulas` | `FormulaSearchPage` | Formula-specific search |
| `/subjects` | `SubjectBrowsePage` | Subject grid |
| `/subjects/:subject` | `SubjectDetailPage` | Subject detail with grades |
| `/quran` | `QuranBrowserPage` | Default to Surah 1 |
| `/quran/:surahNumber` | `QuranSurahPage` | Specific surah view |
| `/exports/:exportJobId` | `ExportStatusPage` | Export job tracking |
| `/404` | `NotFoundPage` | 404 handler with redirect resolution |

### Admin Routes (Protected)

| Route Pattern | Component | Description |
|--------------|-----------|-------------|
| `/admin` | `AdminDashboard` | Admin overview |
| `/admin/ingest` | `IngestionPage` | JSON submission form |
| `/admin/ingest/:trackingId` | `IngestionStatusPage` | Job status tracker |
| `/admin/import` | `BatchImportPage` | GitHub import form |
| `/admin/import/:batchId` | `ImportStatusPage` | Import progress dashboard |
| `/admin/analytics` | `AnalyticsDashboard` | Analytics viewer |
| `/admin/versions/:entityType/:entityId` | `VersionHistoryPage` | Version management |

---

## URL Patterns

### Document URLs
```
/documents                          # List all
/documents/:documentId              # Single document
/documents/:documentId/topics       # Topics in document
/documents/:id/aggregates           # Counts
```

### Topic URLs
```
/topics/slug/*slug                  # By global slug (primary)
/topics/:topicId                    # By ID (redirect to slug)
/topics/:topicId/content            # Content blocks only
/topics/:topicId/assets             # Assets only
/topics/:topicId/assessments        # Assessments only
/topics/:topicId/page               # Full page data
```

### Search URLs
```
/search?q=:query&subject=&grade=&difficulty=&limit=&page=
/search/formulas?q=:query&subject=&grade=&limit=
/search/suggest?prefix=:prefix&limit=
/search/trending?limit=
```

### Quran URLs
```
/quran                              # Redirect to /quran/1
/quran/:surahNumber                 # Full surah
/quran/ayah/:surah/:ayah            # Single ayah
/quran/range/:surah/:start/:end     # Ayah range
```

### Export URLs
```
/exports                            # POST to create
/exports/:exportJobId               # Status check
/api/export/download?topic_id=&format=  # Direct download
/api/export/:exportJobId/stale      # Staleness check
```

### Admin URLs
```
/admin/import/preview               # POST preview
/admin/import/start                 # POST start
/admin/import/:batchId              # GET status
/admin/import/:batchId/retry        # POST retry
/admin/import/:batchId/cancel       # POST cancel
/admin/import/:batchId/report       # GET report

/admin/ingest/json                  # POST submit
/admin/ingest/:trackingId           # GET status
/admin/ingest/:id/cancel            # POST cancel
/admin/ingest/:id/retry             # POST retry
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

## Navigation Components

### Header Navigation

**Location:** All pages (sticky/fixed)

**Elements:**
1. **Logo** → Navigate to `/`
2. **Search Bar** → Debounced autocomplete, navigate to `/search?q=`
3. **Browse Dropdown:**
   - Subjects → `/subjects`
   - Documents → `/documents`
   - Formulas → `/search/formulas`
4. **Quran Link** → `/quran/1`
5. **Admin Link** → `/admin` (conditional on auth)

### Sidebar Navigation (Topic Page)

**Location:** Right sidebar on topic pages

**Elements:**
1. **Table of Contents** → Anchor links within page
2. **Related Topics** → Links to related topic slugs
3. **Export Button** → Opens export modal
4. **Share Button** → Social sharing

### Breadcrumb Navigation

**Location:** Top of content pages

**Structure:**
```
Home > Documents > Physics Grade 9 > Chapter 1 > Vernier Callipers
  /      /documents  pk-pctb-phys-9   ch1         vernier-callipers
```

**Source:** `seo.breadcrumb` array from topic metadata

### Footer Navigation

**Location:** Bottom of all pages

**Elements:**
- About Us
- Contact
- Privacy Policy
- Terms of Service
- Social Media Links

---

## Redirects & Rewrites

### Automatic Redirects

| From | To | Type |
|------|-----|------|
| `/topics/:topicId` | `/topics/slug/:slug_global` | 301 |
| `/quran` | `/quran/1` | 302 |
| Old slug paths | Resolved via `/api/utility/slug/resolve` | 301 |

### Client-Side Routing

- Use React Router / Next.js routing for SPA behavior
- Wildcard route for multi-segment slugs: `/topics/slug/*slug`
- 404 catch-all triggers slug resolution API call

---

## Authentication Gates

### Protected Routes

| Route | Required Role | Middleware |
|-------|--------------|------------|
| `/admin/*` | Admin | `requireAdmin` |
| `/admin/ingest` | Admin | X-Admin-ID header |
| `/admin/import` | Admin | X-Admin-ID header |

### Public Routes

All other routes are publicly accessible without authentication.

---

## Mobile Navigation

### Responsive Behavior

- **Desktop (>1024px):** Full horizontal nav + sidebar
- **Tablet (768-1024px):** Collapsed sidebar, hamburger menu
- **Mobile (<768px):** Bottom tab bar + hamburger menu

### Tab Bar Items (Mobile)
1. Home → `/`
2. Browse → `/documents`
3. Search → `/search`
4. Quran → `/quran/1`
5. Menu → Drawer with additional links

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [06-screen-inventory.md](./06-screen-inventory.md) — Screen list
- [07-user-flows.md](./07-user-flows.md) — User journey documentation
