# Sijil — Frontend Blueprint: Build Order

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the engineering dependency order for building Sijil. Foundation components are built first, followed by rendering engine, API layer, state management, feature modules, admin area, and finally optimizations.

---

## Phase 1: Foundation (Week 1)

### 1.1 Project Setup
- [ ] Initialize Next.js 16 project
- [ ] Configure TypeScript
- [ ] Set up Tailwind 4
- [ ] Install shadcn/ui
- [ ] Configure ESLint + Prettier
- [ ] Set up environment variables

### 1.2 Core Infrastructure
- [ ] Create `lib/api/client.ts` — Base HTTP client
- [ ] Create `lib/query-client.ts` — TanStack Query setup
- [ ] Create `lib/query-keys.ts` — Query key definitions
- [ ] Create `components/providers/Providers.tsx` — Context providers
- [ ] Create `app/layout.tsx` — Root layout with fonts

### 1.3 Primitive Components
- [ ] Install all shadcn/ui components
- [ ] Create `components/ui/*` — Button, Input, Select, etc.
- [ ] Create `components/display/LatexRenderer.tsx` — KaTeX wrapper
- [ ] Create `components/display/ResponsiveImage.tsx` — Image component

**Deliverable:** Empty app with working infrastructure

---

## Phase 2: API Layer (Week 2)

### 2.1 API Clients
- [ ] Create `lib/api/types.ts` — Shared types
- [ ] Create `lib/api/documents.api.ts` — Document endpoints
- [ ] Create `lib/api/topics.api.ts` — Topic endpoints
- [ ] Create `lib/api/search.api.ts` — Search endpoints
- [ ] Create `lib/api/exports.api.ts` — Export endpoints
- [ ] Create `lib/api/quran.api.ts` — Quran endpoints
- [ ] Create `lib/api/analytics.api.ts` — Analytics endpoints
- [ ] Create `lib/api/admin.api.ts` — Admin endpoints
- [ ] Create `lib/api/seo.api.ts` — SEO endpoints

### 2.2 Error Handling
- [ ] Create `lib/api/error-handler.ts` — Global error handler
- [ ] Create `lib/api/retry.ts` — Retry logic

**Deliverable:** Complete API client layer with typing

---

## Phase 3: State Management (Week 2)

### 3.1 Zustand Stores
- [ ] Create `features/admin/store/authStore.ts` — Admin auth
- [ ] Create `features/exports/store/exportStore.ts` — Export jobs
- [ ] Create `features/quran/store/translationStore.ts` — Translation prefs

### 3.2 Custom Hooks
- [ ] Create `features/shared/hooks/useDebounce.ts`
- [ ] Create `features/shared/hooks/useLocalStorage.ts`
- [ ] Create `features/shared/hooks/useMediaQuery.ts`
- [ ] Create `features/shared/hooks/usePaginationURL.ts`

**Deliverable:** State management foundation

---

## Phase 4: Rendering Engine (Week 3)

### 4.1 Block Renderer Core
- [ ] Create `features/topics/components/BlockRenderer.tsx` — Registry
- [ ] Create `lib/block-registry.ts` — Extension registry

### 4.2 Block Renderers (All 17)
- [ ] Create `features/topics/components/blocks/HeadingBlock.tsx`
- [ ] Create `features/topics/components/blocks/ParagraphBlock.tsx`
- [ ] Create `features/topics/components/blocks/FormulaBlock.tsx`
- [ ] Create `features/topics/components/blocks/FigureBlock.tsx`
- [ ] Create `features/topics/components/blocks/TableBlock.tsx`
- [ ] Create `features/topics/components/blocks/CalloutBlock.tsx`
- [ ] Create `features/topics/components/blocks/MCQBlock.tsx`
- [ ] Create `features/topics/components/blocks/ExampleBlock.tsx`
- [ ] Create `features/topics/components/blocks/ListBlock.tsx`
- [ ] Create `features/topics/components/blocks/DefinitionBlock.tsx`
- [ ] Create `features/topics/components/blocks/LearningOutcomesBlock.tsx`
- [ ] Create `features/topics/components/blocks/ComparisonViewBlock.tsx`
- [ ] Create `features/topics/components/blocks/QuranVerseBlock.tsx`
- [ ] Create `features/topics/components/blocks/QuranReferenceBlock.tsx`
- [ ] Create `features/topics/components/blocks/ActivityBlock.tsx`
- [ ] Create `features/topics/components/blocks/EquationBlock.tsx`
- [ ] Create `features/topics/components/blocks/NumericalBlock.tsx`

**Deliverable:** Complete content rendering system

---

## Phase 5: Shared Components (Week 3)

### 5.1 Navigation
- [ ] Create `components/navigation/Header.tsx`
- [ ] Create `components/navigation/Footer.tsx`
- [ ] Create `components/navigation/Breadcrumb.tsx`
- [ ] Create `components/navigation/Pagination.tsx`

### 5.2 Feedback
- [ ] Create `components/feedback/Spinner.tsx`
- [ ] Create `components/feedback/ProgressBar.tsx`
- [ ] Create `components/feedback/Alert.tsx`
- [ ] Create `components/feedback/Modal.tsx`
- [ ] Create `components/feedback/EmptyState.tsx`
- [ ] Create `components/feedback/ErrorBoundary.tsx`
- [ ] Create `components/feedback/Skeleton/*`

### 5.3 Display
- [ ] Create `components/display/DataTable.tsx`
- [ ] Create `components/display/Badge.tsx`
- [ ] Create `components/display/CodeBlock.tsx`

**Deliverable:** Reusable component library

---

## Phase 6: Documents Module (Week 4)

### 6.1 Components
- [ ] Create `features/documents/components/DocumentCard.tsx`
- [ ] Create `features/documents/components/DocumentFilters.tsx`
- [ ] Create `features/documents/components/ChapterOutline.tsx`
- [ ] Create `features/documents/components/TopicListGrouped.tsx`
- [ ] Create `features/documents/components/DocumentStats.tsx`

### 6.2 Hooks
- [ ] Create `features/documents/hooks/useDocuments.ts`
- [ ] Create `features/documents/hooks/useDocument.ts`
- [ ] Create `features/documents/hooks/useSubjects.ts`
- [ ] Create `features/documents/hooks/useGrades.ts`

### 6.3 Pages
- [ ] Create `app/documents/page.tsx`
- [ ] Create `app/documents/[documentId]/page.tsx`
- [ ] Create `app/documents/layout.tsx`

**Deliverable:** Working document browsing

---

## Phase 7: Topics Module (Week 4-5)

### 7.1 Components
- [ ] Create `features/topics/components/TableOfContents.tsx`
- [ ] Create `features/topics/components/NextPrevNavigation.tsx`
- [ ] Create `features/topics/components/TopicSidebar.tsx`

### 7.2 Hooks
- [ ] Create `features/topics/hooks/useTopic.ts`
- [ ] Create `features/topics/hooks/useTopicContent.ts`
- [ ] Create `features/topics/hooks/useTopicAssets.ts`
- [ ] Create `features/topics/hooks/useTableOfContents.ts`

### 7.3 Pages
- [ ] Create `app/topics/slug/layout.tsx`
- [ ] Create `app/topics/slug/[...slug]/page.tsx`
- [ ] Create `app/topics/slug/[...slug]/loading.tsx`

**Deliverable:** Working topic pages with full content rendering

---

## Phase 8: Search Module (Week 5)

### 8.1 Components
- [ ] Create `features/search/components/SearchBar.tsx`
- [ ] Create `features/search/components/FilterPanel.tsx`
- [ ] Create `features/search/components/SearchResultCard.tsx`
- [ ] Create `features/search/components/FormulaCard.tsx`
- [ ] Create `features/search/components/TrendingSearches.tsx`

### 8.2 Hooks
- [ ] Create `features/search/hooks/useSearch.ts`
- [ ] Create `features/search/hooks/useSearchSuggestions.ts`
- [ ] Create `features/search/hooks/useSearchFilters.ts`
- [ ] Create `features/search/hooks/useSearchURL.ts`

### 8.3 Pages
- [ ] Create `app/search/layout.tsx`
- [ ] Create `app/search/page.tsx`
- [ ] Create `app/search/formulas/page.tsx`

**Deliverable:** Working search with filters

---

## Phase 9: Quran Module (Week 5)

### 9.1 Components
- [ ] Create `features/quran/components/SurahSelector.tsx`
- [ ] Create `features/quran/components/AyahNavigator.tsx`
- [ ] Create `features/quran/components/TranslationToggle.tsx`
- [ ] Create `features/quran/components/QuranText.tsx`

### 9.2 Hooks
- [ ] Create `features/quran/hooks/useSurah.ts`
- [ ] Create `features/quran/hooks/useTranslationPreference.ts`

### 9.3 Pages
- [ ] Create `app/quran/layout.tsx`
- [ ] Create `app/quran/page.tsx`
- [ ] Create `app/quran/[surahNumber]/page.tsx`

**Deliverable:** Working Quran browser

---

## Phase 10: Exports Module (Week 6)

### 10.1 Components
- [ ] Create `features/exports/components/ExportButton.tsx`
- [ ] Create `features/exports/components/ExportModal.tsx`
- [ ] Create `features/exports/components/ExportProgress.tsx`

### 10.2 Hooks
- [ ] Create `features/exports/hooks/useCreateExport.ts`
- [ ] Create `features/exports/hooks/useExportStatus.ts`

### 10.3 Pages
- [ ] Create `app/exports/[exportJobId]/page.tsx`

**Deliverable:** Working export system

---

## Phase 11: SEO Integration (Week 6)

### 11.1 Components
- [ ] Create `features/seo/components/JsonLdScript.tsx`
- [ ] Create `features/seo/components/BreadcrumbSchema.tsx`

### 11.2 Metadata
- [ ] Implement `generateMetadata` in all public pages
- [ ] Create `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Create dynamic OG images

**Deliverable:** SEO-optimized pages

---

## Phase 12: Admin Module (Week 7)

### 12.1 Layout & Auth
- [ ] Create `app/admin/layout.tsx`
- [ ] Create `features/admin/components/AdminSidebar.tsx`
- [ ] Create `features/admin/components/AdminHeader.tsx`
- [ ] Implement middleware authentication

### 12.2 Dashboard
- [ ] Create `features/admin/components/AdminDashboard.tsx`
- [ ] Create `features/admin/components/HealthIndicator.tsx`
- [ ] Create `features/admin/components/StatCard.tsx`

### 12.3 Ingestion
- [ ] Create `features/admin/components/JsonEditor.tsx`
- [ ] Create `features/admin/components/IngestionForm.tsx`
- [ ] Create `features/admin/components/JobStatusTracker.tsx`
- [ ] Create `app/admin/ingest/page.tsx`
- [ ] Create `app/admin/ingest/[trackingId]/page.tsx`

### 12.4 Batch Import
- [ ] Create `features/admin/components/BatchImportForm.tsx`
- [ ] Create `features/admin/components/MultiStageProgress.tsx`
- [ ] Create `features/admin/components/ImportErrorLog.tsx`
- [ ] Create `app/admin/import/page.tsx`
- [ ] Create `app/admin/import/[batchId]/page.tsx`

### 12.5 Analytics
- [ ] Create `features/admin/components/FailedSearchesList.tsx`
- [ ] Create `features/admin/components/DateRangePicker.tsx`
- [ ] Create `app/admin/analytics/page.tsx`

**Deliverable:** Complete admin system

---

## Phase 13: Homepage (Week 7)

### 13.1 Widgets
- [ ] Create homepage stat widgets
- [ ] Create recent arrivals carousel
- [ ] Create popular topics list
- [ ] Create subject browse grid

### 13.2 Page
- [ ] Create `app/page.tsx` — Homepage

**Deliverable:** Complete landing page

---

## Phase 14: Testing & QA (Week 8)

### 14.1 Unit Tests
- [ ] Test all hooks
- [ ] Test all components
- [ ] Test API clients

### 14.2 Integration Tests
- [ ] Test complete user flows
- [ ] Test search functionality
- [ ] Test export workflow

### 14.3 Performance
- [ ] Lighthouse audit
- [ ] Bundle size optimization
- [ ] Image optimization

**Deliverable:** Production-ready application

---

## Phase 15: Deployment (Week 8)

### 15.1 CI/CD
- [ ] Set up GitHub Actions
- [ ] Configure preview deployments
- [ ] Set up production deployment

### 15.2 Monitoring
- [ ] Set up error tracking
- [ ] Set up analytics
- [ ] Configure logging

**Deliverable:** Live production system

---

## Related Documents

- [14-implementation-phases.md](./14-implementation-phases.md) — Execution phases
- [13-folder-structure.md](./13-folder-structure.md) — File organization
