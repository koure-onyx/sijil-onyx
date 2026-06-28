# 08-dependency-map.md

# Feature Dependency Graph

This document maps all dependencies between features, modules, and systems.
Dependencies are directional: A → B means "A depends on B".

---

## Legend

- `→` : Depends on / Requires
- `⇄` : Bidirectional dependency
- `[CORE]` : Core infrastructure dependency
- `[DATA]` : Data layer dependency
- `[API]` : API layer dependency
- `[UI]` : UI component dependency

---

## 1. Core Infrastructure Dependencies

```
Frontend Application
├── → Next.js 14+ (App Router) [CORE]
├── → TypeScript 5.x [CORE]
├── → Tailwind CSS 3.x [CORE]
├── → shadcn/ui Components [UI]
└── → React Query / SWR [STATE]
```

---

## 2. Feature Module Dependencies

### 2.1 Document Display System

```
Document Display
├── → Document Retrieval API [API]
├── → Content Rendering Engine [CORE]
├── → SEO Metadata Generator [CORE]
├── → Navigation Components [UI]
├── → Search Integration [FEATURE: Search]
└── → Collection Context [FEATURE: Collections]
```

**Dependencies:**
- F01 → F09 (Search)
- F01 → F06 (Collections)
- F01 → F14 (SEO)

---

### 2.2 Topic/Subject System

```
Topic System
├── → Topic Hierarchy API [API]
├── → Document Listing by Topic [API]
├── → Breadcrumb Navigation [UI]
├── → Tree View Component [UI]
└── → URL Slug Resolver [CORE]
```

**Dependencies:**
- F02 → F01 (Document Display)
- F02 → F09 (Search within topic)

---

### 2.3 Formula Search System

```
Formula Search
├── → Formula Index API [API]
├── → Pattern Matching Engine [CORE]
├── → Result Highlighting [UI]
├── → Document Linking [FEATURE: Document Display]
└── → Pagination Component [UI]
```

**Dependencies:**
- F03 → F01 (Link to documents)
- F03 → F09 (Combined search)

---

### 2.4 Export System

```
Export System
├── → Export Request API [API]
├── → Status Polling [STATE]
├── → Download Handler [CORE]
├── → Progress Indicator [UI]
└── → Error Toast Notifications [UI]
```

**Dependencies:**
- F04 → F01 (Source documents)
- F04 → F06 (Collection context)

---

### 2.5 Quran Browser System

```
Quran Browser
├── → Surah/Ayah API [API]
├── → Arabic Text Renderer [UI]
├── → Translation Toggle [STATE]
├── → Audio Player (optional) [UI]
└── → Cross-reference Links [FEATURE: References]
```

**Dependencies:**
- F05 → F11 (References to ayahs)
- F05 → F01 (Document cross-refs)

---

### 2.6 Collection Management

```
Collection Management
├── → Collection List API [API]
├── → Document-Collection Mapping [API]
├── → Filter State Management [STATE]
├── → Collection Switcher [UI]
└── → URL State Sync [CORE]
```

**Dependencies:**
- F06 → F01 (Documents in collection)
- F06 → F02 (Topics in collection)
- F06 → F09 (Search within collection)

---

### 2.7 Reference/Cross-link System

```
Reference System
├── → Reference Resolution API [API]
├── → Link Preview Component [UI]
├── → Tooltip Handler [UI]
├── → Internal Router [CORE]
└── → External Link Handler [CORE]
```

**Dependencies:**
- F07 → F01 (Target documents)
- F07 → F02 (Target topics)
- F07 → F05 (Target ayahs)
- F07 → F10 (External sources)

---

### 2.8 Version History System

```
Version History
├── → Version List API [API]
├── → Diff Viewer [UI]
├── → Restore Action [API]
├── → Timestamp Formatter [UI]
└── → User Attribution [UI]
```

**Dependencies:**
- F08 → F01 (Document versions)
- F08 → Admin Auth [FEATURE: Admin]

---

### 2.9 Search & Filter System

```
Search System
├── → Search API (multi-endpoint) [API]
├── → Query Parser [CORE]
├── → Faceted Filter UI [UI]
├── → Search State Management [STATE]
├── → URL Query Sync [CORE]
└── → Debounced Input Handler [CORE]
```

**Dependencies:**
- F09 → F01 (Search results → documents)
- F09 → F02 (Filter by topic)
- F09 → F06 (Filter by collection)
- F09 → F03 (Formula results)

---

### 2.10 External Source Integration

```
External Sources
├── → External Source API [API]
├── → Iframe/Safe Embed [UI]
├── → Citation Formatter [UI]
├── → Link Out Handler [CORE]
└── → Source Attribution [UI]
```

**Dependencies:**
- F10 → F07 (Referenced in documents)
- F10 → F14 (SEO for external links)

---

### 2.11 Analytics Dashboard

```
Analytics
├── → Analytics API [API]
├── → Chart Components [UI]
├── → Date Range Picker [UI]
├── → Data Aggregation [CORE]
└── → Export Report [FEATURE: Export]
```

**Dependencies:**
- F11 → F04 (Export analytics)
- F11 → Admin Auth [FEATURE: Admin]

---

### 2.12 Admin Interface

```
Admin Interface
├── → Admin Auth [AUTH]
├── → Ingestion API [API]
├── → Batch Import API [API]
├── → Status Monitoring [STATE]
├── → Admin Layout [UI]
└── → Role-based Access [AUTH]
```

**Dependencies:**
- F12 → F01 (Manage documents)
- F12 → F08 (View versions)
- F12 → F11 (View analytics)
- F12 → F13 (JSON validation)

---

### 2.13 JSON Validation System

```
JSON Validation
├── → Validation API [API]
├── → Schema Validator [CORE]
├── → Error Reporter [UI]
├── → Fix Suggestions [UI]
└── → Pre-flight Checks [CORE]
```

**Dependencies:**
- F13 → F12 (Admin ingestion flow)
- F13 → F01 (Document schema)

---

### 2.14 SEO & Metadata System

```
SEO System
├── → Metadata API [API]
├── → OpenGraph Generator [CORE]
├── → Sitemap Generator [CORE]
├── → Structured Data (JSON-LD) [CORE]
├── → Canonical URL Handler [CORE]
└── → robots.txt Handler [CORE]
```

**Dependencies:**
- F14 → F01 (Document pages)
- F14 → F02 (Topic pages)
- F14 → F06 (Collection pages)
- F14 → All public-facing features

---

## 3. Data Flow Dependencies

### 3.1 Read Path

```
User Action
    ↓
Component Event Handler
    ↓
State Management (React Query/SWR)
    ↓
API Client
    ↓
Backend Endpoint
    ↓
Database
```

### 3.2 Write Path (Admin Only)

```
Admin Action
    ↓
Form Validation
    ↓
JSON Validation (F13)
    ↓
API Client (with auth)
    ↓
Backend Endpoint
    ↓
Database
    ↓
Cache Invalidation
    ↓
UI State Update
```

---

## 4. Authentication Dependencies

```
Public Routes
└── → No auth required

Admin Routes
└── → JWT/PAT Auth
    └── → Role Verification
        └── → Permission Check
            └── → Route Guard
```

**Features requiring auth:**
- F08 (Version restore actions)
- F11 (Analytics dashboard)
- F12 (All admin operations)
- F13 (Validation in admin context)

---

## 5. State Management Dependencies

### Global State Requirements

| Feature | Local State | Global State | Server State |
|---------|-------------|--------------|--------------|
| F01 Document Display | Loading, Error | Collection Context | Document Data |
| F02 Topics | Expanded Nodes | Current Topic Path | Topic Tree |
| F03 Formula Search | Query, Results | Search Filters | Formula Index |
| F04 Export | Progress | Active Exports | Export Status |
| F05 Quran | Surah, Ayah | Reading Position | Quran Data |
| F06 Collections | Filter State | Active Collection | Collection List |
| F07 References | Preview Open | Reference Cache | Reference Data |
| F08 Versions | Selected Version | Version List | Version History |
| F09 Search | Query, Facets | Search Context | Search Results |
| F10 External | Embed State | Source Registry | External Data |
| F11 Analytics | Date Range | Dashboard Config | Analytics Data |
| F12 Admin | Form State | Ingestion Queue | Admin Data |
| F13 Validation | Errors | Validation Rules | Schema Data |
| F14 SEO | - | Metadata Context | Metadata API |

---

## 6. Circular Dependency Warnings

⚠️ **Potential Circular Dependencies Identified:**

1. **F01 ↔ F09**: Document display shows search, search returns documents
   - Resolution: Unidirectional data flow via API, no direct import cycle

2. **F06 ↔ F09**: Collections filter search, search filters by collection
   - Resolution: Shared state context, not code dependency

3. **F07 ↔ F01/F02/F05**: References link to all content types
   - Resolution: Reference system is consumer-only, targets don't depend on it

---

## 7. Build Order Implications

Based on dependencies, recommended implementation order:

**Phase 1 (Foundation):**
1. Core Infrastructure (Next.js, TS, Tailwind, shadcn)
2. F14 SEO System (needed for all pages)
3. F09 Search System (core navigation pattern)

**Phase 2 (Core Content):**
4. F01 Document Display
5. F02 Topic System
6. F06 Collection Management

**Phase 3 (Advanced Features):**
7. F03 Formula Search
8. F05 Quran Browser
9. F07 Reference System
10. F10 External Sources

**Phase 4 (User Actions):**
11. F04 Export System
12. F08 Version History

**Phase 5 (Admin):**
13. F13 JSON Validation
14. F12 Admin Interface
15. F11 Analytics Dashboard

---

## 8. API Dependency Matrix

| Feature | Required Endpoints | Optional Endpoints |
|---------|-------------------|-------------------|
| F01 | GET /documents/:id | GET /documents/:id/related |
| F02 | GET /topics, GET /topics/:slug | GET /topics/:slug/hierarchy |
| F03 | GET /formulas/search | - |
| F04 | POST /export, GET /export/:id/status | GET /export/:id/download |
| F05 | GET /quran/:surah/:ayah | GET /quran/surahs |
| F06 | GET /collections, GET /collections/:id/docs | GET /collections/:id/stats |
| F07 | GET /references/resolve | - |
| F08 | GET /documents/:id/versions | POST /documents/:id/restore |
| F09 | GET /search | GET /search/suggest |
| F10 | GET /external-sources | - |
| F11 | GET /analytics/* | GET /analytics/export |
| F12 | POST /ingest, POST /import/batch | GET /import/status |
| F13 | POST /validate/json | - |
| F14 | GET /seo/metadata | GET /sitemap.xml |

---

## 9. Third-Party Dependencies

| Package | Used By Features | Purpose |
|---------|-----------------|---------|
| next | ALL | Framework |
| react | ALL | UI Library |
| typescript | ALL | Type Safety |
| tailwindcss | ALL | Styling |
| @radix-ui/* | ALL UI | Primitives |
| class-variance-authority | ALL UI | Variant System |
| clsx | ALL UI | Class Merging |
| tailwind-merge | ALL UI | Class Merging |
| lucide-react | ALL UI | Icons |
| next-themes | F05, F12 | Dark Mode |
| react-query / swr | F01-F14 | Data Fetching |
| zod | F12, F13 | Validation |

---

## 10. Deployment Dependencies

```
Production Build
├── → Environment Variables
│   ├── NEXT_PUBLIC_API_URL
│   ├── NEXT_PUBLIC_SITE_URL
│   └── (admin secrets server-side only)
├── → Build-time Generation
│   ├── Sitemap (F14)
│   ├── robots.txt (F14)
│   └── Static Pages (ISR for F01, F02, F06)
└── → Runtime Requirements
    ├── API Availability
    ├── CDN for Assets
    └── Database Connection (backend)
```

---

*Traceability: Extracted from architecture_V2.md, docs/frontend-blueprint/*, docs/frontend-discovery/*, docs/project-management/**
