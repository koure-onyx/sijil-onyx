# Sijil — Frontend Blueprint: Coverage Matrix

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document maps every backend feature from `05-feature-inventory.md` to its corresponding frontend implementation including route, page, layout, module, component, state owner, and API layer.

**Status:** ✅ All features mapped

---

## Feature Mapping

### Feature 1: Document Browsing & Listing

| Aspect | Mapping |
|--------|---------|
| **Feature** | Document Browsing & Listing |
| **Routes** | `/documents`, `/documents/[documentId]`, `/subjects`, `/subjects/[subject]/grade/[grade]` |
| **Pages** | `DocumentListPage`, `DocumentDetailPage`, `SubjectBrowsePage`, `GradeFilterPage` |
| **Layouts** | `PublicLayout` |
| **Module** | `features/documents/` |
| **Components** | `DocumentCard`, `DocumentFilters`, `ChapterOutline`, `TopicListGrouped`, `DocumentStats` |
| **State Owner** | TanStack Query (`useDocuments`, `useDocument`) |
| **API Layer** | `lib/api/documents.api.ts`, `lib/api/subjects.api.ts` |

---

### Feature 2: Topic Content Viewing

| Aspect | Mapping |
|--------|---------|
| **Feature** | Topic Content Viewing |
| **Routes** | `/topics/slug/[...slug]` |
| **Pages** | `TopicPage` |
| **Layouts** | `TopicLayout` |
| **Module** | `features/topics/` |
| **Components** | `BlockRenderer`, `TableOfContents`, `NextPrevNavigation`, `TopicSidebar`, all 17 block renderers |
| **State Owner** | TanStack Query (`useTopic`, `useTopicContent`, `useTopicAssets`) |
| **API Layer** | `lib/api/topics.api.ts`, `lib/api/content.api.ts` |

---

### Feature 3: Search & Discovery

| Aspect | Mapping |
|--------|---------|
| **Feature** | Search & Discovery |
| **Routes** | `/search`, `/search/formulas` |
| **Pages** | `SearchResultsPage`, `FormulaSearchPage` |
| **Layouts** | `SearchLayout` |
| **Module** | `features/search/` |
| **Components** | `SearchBar`, `FilterPanel`, `SearchResultCard`, `FormulaCard`, `TrendingSearches` |
| **State Owner** | TanStack Query + URL State (`useSearch`, `useSearchURL`) |
| **API Layer** | `lib/api/search.api.ts`, `lib/api/suggestions.api.ts` |

---

### Feature 4: Export System

| Aspect | Mapping |
|--------|---------|
| **Feature** | Export System |
| **Routes** | `/exports/[exportJobId]` |
| **Pages** | `ExportStatusPage` |
| **Layouts** | `PublicLayout` |
| **Module** | `features/exports/` |
| **Components** | `ExportButton`, `ExportModal`, `ExportProgress`, `ExportStatus`, `DownloadManager` |
| **State Owner** | Zustand (`useExportStore`) + TanStack Query |
| **API Layer** | `lib/api/exports.api.ts`, `lib/api/policies.api.ts` |

---

### Feature 5: Admin Ingestion

| Aspect | Mapping |
|--------|---------|
| **Feature** | Admin Ingestion |
| **Routes** | `/admin/ingest`, `/admin/ingest/[trackingId]` |
| **Pages** | `IngestionPage`, `IngestionStatusPage` |
| **Layouts** | `AdminLayout` |
| **Module** | `features/admin/` |
| **Components** | `JsonEditor`, `IngestionForm`, `JobStatusTracker` |
| **State Owner** | Zustand (`useAdminAuthStore`) + TanStack Query |
| **API Layer** | `lib/api/admin.api.ts`, `lib/api/ingest.api.ts` |

---

### Feature 6: Batch Import (GitHub)

| Aspect | Mapping |
|--------|---------|
| **Feature** | Batch Import (GitHub) |
| **Routes** | `/admin/import`, `/admin/import/[batchId]`, `/admin/import/[batchId]/report` |
| **Pages** | `BatchImportPage`, `ImportStatusPage`, `ImportReportPage` |
| **Layouts** | `AdminLayout` |
| **Module** | `features/admin/` |
| **Components** | `BatchImportForm`, `ImportPreviewTable`, `MultiStageProgress`, `ImportErrorLog` |
| **State Owner** | Zustand + TanStack Query (`useImportStatus`) |
| **API Layer** | `lib/api/admin.api.ts`, `lib/api/import.api.ts` |

---

### Feature 7: SEO/AEO/GEO Optimization

| Aspect | Mapping |
|--------|---------|
| **Feature** | SEO/AEO/GEO Optimization |
| **Routes** | All public routes |
| **Pages** | All public pages via `generateMetadata` |
| **Layouts** | N/A (metadata injection) |
| **Module** | `features/seo/` |
| **Components** | `JsonLdScript`, `BreadcrumbSchema`, `MetaTags`, `OpenGraphTags` |
| **State Owner** | Server-side (no client state) |
| **API Layer** | `lib/api/seo.api.ts` |

---

### Feature 8: Analytics Tracking

| Aspect | Mapping |
|--------|---------|
| **Feature** | Analytics Tracking |
| **Routes** | `/admin/analytics`, `/admin/analytics/search` |
| **Pages** | `AnalyticsDashboard`, `SearchAnalyticsPage` |
| **Layouts** | `AdminLayout` |
| **Module** | `features/analytics/` |
| **Components** | `StatCard`, `PopularTopicsList`, `FailedSearchesList`, `SearchAnalyticsChart` |
| **State Owner** | TanStack Query (`usePlatformStats`, `useFailedSearches`) |
| **API Layer** | `lib/api/analytics.api.ts`, `lib/api/stats.api.ts` |

---

### Feature 9: Slug Management & Redirects

| Aspect | Mapping |
|--------|---------|
| **Feature** | Slug Management & Redirects |
| **Routes** | Handled in `not-found.tsx` globally |
| **Pages** | `NotFoundPage` (with redirect logic) |
| **Layouts** | `RootLayout` |
| **Module** | `features/shared/` |
| **Components** | `SlugResolver` (utility) |
| **State Owner** | None (server-side redirect) |
| **API Layer** | `lib/api/utility.api.ts` (internal) |

---

### Feature 10: Platform Statistics

| Aspect | Mapping |
|--------|---------|
| **Feature** | Platform Statistics |
| **Routes** | Homepage `/`, Admin `/admin` |
| **Pages** | `HomePage`, `AdminDashboard` |
| **Layouts** | `RootLayout`, `AdminLayout` |
| **Module** | `features/analytics/` |
| **Components** | `StatCard`, homepage widgets |
| **State Owner** | TanStack Query (`usePlatformStats`) |
| **API Layer** | `lib/api/analytics.api.ts`, `lib/api/stats.api.ts` |

---

### Feature 11: Quran Integration

| Aspect | Mapping |
|--------|---------|
| **Feature** | Quran Integration |
| **Routes** | `/quran`, `/quran/[surahNumber]`, `/quran/[surahNumber]/ayah/[ayahNumber]`, `/quran/range/[surahNumber]/[start]/[end]` |
| **Pages** | `QuranRedirectPage`, `SurahPage`, `AyahPage`, `RangePage` |
| **Layouts** | `QuranLayout` |
| **Module** | `features/quran/` |
| **Components** | `SurahSelector`, `AyahNavigator`, `TranslationToggle`, `QuranText`, `TranslationPanel` |
| **State Owner** | Zustand (`useTranslationStore`) + TanStack Query |
| **API Layer** | `lib/api/quran.api.ts` |

---

### Feature 12: Version Control

| Aspect | Mapping |
|--------|---------|
| **Feature** | Version Control |
| **Routes** | `/admin/versions/[entityType]/[entityId]` |
| **Pages** | `VersionHistoryPage` |
| **Layouts** | `AdminLayout` |
| **Module** | `features/admin/` |
| **Components** | `VersionSelector`, `DiffViewer` (integrated in topic/document APIs) |
| **State Owner** | TanStack Query (via topic/document queries) |
| **API Layer** | Integrated in `lib/api/topics.api.ts`, `lib/api/documents.api.ts` |

---

### Feature 13: Asset Management

| Aspect | Mapping |
|--------|---------|
| **Feature** | Asset Management |
| **Routes** | N/A (integrated in topic content) |
| **Pages** | N/A |
| **Layouts** | N/A |
| **Module** | `features/topics/` |
| **Components** | `FigureBlock`, `ResponsiveImage`, `ImageWithFallback` |
| **State Owner** | TanStack Query (`useTopicAssets`) |
| **API Layer** | Integrated in `lib/api/topics.api.ts` |

---

### Feature 14: Health Monitoring

| Aspect | Mapping |
|--------|---------|
| **Feature** | Health Monitoring |
| **Routes** | `/api/health` (internal), displayed on `/admin` |
| **Pages** | `AdminDashboard` |
| **Layouts** | `AdminLayout` |
| **Module** | `features/admin/` |
| **Components** | `HealthIndicator` |
| **State Owner** | TanStack Query (polled every 30s) |
| **API Layer** | Internal fetch in component |

---

## Summary Matrix

| # | Feature | Route | Page | Layout | Module | Component | State | API |
|---|---------|-------|------|--------|--------|-----------|-------|-----|
| 1 | Document Browsing | `/documents` | `DocumentListPage` | PublicLayout | documents | DocumentCard | TanStack Query | documents.api.ts |
| 2 | Topic Viewing | `/topics/slug/*` | `TopicPage` | TopicLayout | topics | BlockRenderer | TanStack Query | topics.api.ts |
| 3 | Search | `/search` | `SearchResultsPage` | SearchLayout | search | SearchBar | URL State | search.api.ts |
| 4 | Export | `/exports/*` | `ExportStatusPage` | PublicLayout | exports | ExportButton | Zustand + Query | exports.api.ts |
| 5 | Ingestion | `/admin/ingest` | `IngestionPage` | AdminLayout | admin | JsonEditor | Zustand + Query | ingest.api.ts |
| 6 | Batch Import | `/admin/import` | `BatchImportPage` | AdminLayout | admin | MultiStageProgress | Zustand + Query | import.api.ts |
| 7 | SEO | All public | generateMetadata | N/A | seo | JsonLdScript | Server-side | seo.api.ts |
| 8 | Analytics | `/admin/analytics` | `AnalyticsDashboard` | AdminLayout | analytics | StatCard | TanStack Query | analytics.api.ts |
| 9 | Slug Redirects | not-found | NotFoundPage | RootLayout | shared | SlugResolver | None | utility.api.ts |
| 10 | Platform Stats | `/`, `/admin` | HomePage | RootLayout | analytics | StatCard | TanStack Query | stats.api.ts |
| 11 | Quran | `/quran/*` | SurahPage | QuranLayout | quran | SurahSelector | Zustand + Query | quran.api.ts |
| 12 | Version Control | `/admin/versions/*` | VersionHistoryPage | AdminLayout | admin | VersionSelector | TanStack Query | topics.api.ts |
| 13 | Asset Management | (integrated) | (integrated) | (integrated) | topics | FigureBlock | TanStack Query | topics.api.ts |
| 14 | Health Monitoring | `/admin` | AdminDashboard | AdminLayout | admin | HealthIndicator | TanStack Query | internal |

---

## Unmapped Features

**None.** All 14 backend features have been mapped to frontend implementations.

---

## Related Documents

- [05-feature-inventory.md](../frontend-discovery/05-feature-inventory.md) — Backend feature reference
- [02-route-architecture.md](./02-route-architecture.md) — Route definitions
- [04-feature-modules.md](./04-feature-modules.md) — Module organization
- [13-folder-structure.md](./13-folder-structure.md) — File structure
