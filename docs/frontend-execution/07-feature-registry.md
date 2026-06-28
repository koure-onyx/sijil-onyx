# Sijil — Frontend Execution: Feature Registry

**Generated:** 2026-06-27
**Source:** `docs/project-management/03-feature-registry.md`, `docs/frontend-discovery/05-feature-inventory.md`

---

## Overview

This registry documents all 14 backend features mapped to frontend implementation details. Each feature is grouped by module with complete traceability.

---

## Module: Documents (F01, F02)

### F01: Document Management

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 1 |
| **Domain** | Documents |
| **Priority** | Must Have |
| **Phase** | Phase 2 |

#### Frontend Mapping

- **Routes:** `/documents`, `/documents/[slug]`
- **Pages:** `DocumentsListPage`, `DocumentDetailPage`
- **Layout:** `MainLayout`
- **Feature Module:** `features/documents/`
- **Components:** `DocumentCard`, `DocumentList`, `DocumentMeta`, `RelatedDocuments`
- **State Owner:** TanStack Query (`useDocuments`, `useDocument`)
- **API Layer:** `lib/api/documents.api.ts`
- **Forms:** None (read-only in public area)

#### Acceptance Criteria

- [ ] Document list displays all documents with pagination
- [ ] Document detail shows full content with metadata
- [ ] Related documents section functional
- [ ] Breadcrumbs navigate correctly
- [ ] SEO metadata present on all pages

#### Blueprint References

- `docs/frontend-blueprint/02-route-architecture.md` - Routes
- `docs/frontend-blueprint/03-layout-architecture.md` - MainLayout
- `docs/frontend-blueprint/04-feature-modules.md` - Documents module
- `docs/frontend-blueprint/07-api-layer.md` - documents.api.ts

---

### F02: Topic Hierarchy

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 2 |
| **Domain** | Topics |
| **Priority** | Must Have |
| **Phase** | Phase 2 |

#### Frontend Mapping

- **Routes:** `/topics`, `/topics/[slug]`, `/topics/[slug]/[childSlug]`
- **Pages:** `TopicsListPage`, `TopicDetailPage`
- **Layout:** `MainLayout`
- **Feature Module:** `features/topics/`
- **Components:** `TopicTree`, `TopicNavigation`, `TopicBreadcrumb`, `ChildTopics`
- **State Owner:** TanStack Query (`useTopics`, `useTopic`)
- **API Layer:** `lib/api/topics.api.ts`
- **Forms:** None (read-only in public area)

#### Acceptance Criteria

- [ ] Topic hierarchy displayed as tree or nested list
- [ ] Parent-child relationships clear in navigation
- [ ] Breadcrumbs reflect hierarchy accurately
- [ ] Child topics accessible from parent page
- [ ] Deep linking to nested topics works

---

## Module: Topics (F03)

### F03: Content Block Rendering

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 3 |
| **Domain** | Topics |
| **Priority** | Must Have |
| **Phase** | Phase 2 |

#### Frontend Mapping

- **Routes:** All topic detail routes
- **Pages:** `TopicDetailPage` (integrated)
- **Layout:** `MainLayout`
- **Feature Module:** `features/topics/`
- **Components:** `BlockRenderer`, 17 block type components
- **State Owner:** Props-driven (no additional state)
- **API Layer:** Included in topics.api.ts response
- **Forms:** N/A

#### Block Types (17 total)

1. Paragraph
2. Heading (H1-H6)
3. Formula (KaTeX)
4. Figure/Image
5. Table
6. Example
7. Callout/Note
8. Warning
9. Definition
10. Theorem
11. Proof
12. Code Block
13. List (Ordered/Unordered)
14. Quote
15. MCQ (Multiple Choice Question)
16. Quran Reference
17. Cross-reference

#### Acceptance Criteria

- [ ] BlockRenderer dispatches correct component for each block type
- [ ] All 17 block types render correctly
- [ ] KaTeX formulas render without errors
- [ ] Tables are responsive
- [ ] MCQs interactive with selection feedback
- [ ] Quran references link correctly
- [ ] Performance acceptable with 50+ blocks

---

## Module: Search (F04, F05, F06)

### F04: Search (Basic)

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 4 |
| **Domain** | Search |
| **Priority** | Must Have |
| **Phase** | Phase 2 |

#### Frontend Mapping

- **Routes:** `/search`
- **Pages:** `SearchPage`
- **Layout:** `SearchLayout`
- **Feature Module:** `features/search/`
- **Components:** `SearchInput`, `SearchResults`, `SearchResultCard`, `NoResults`
- **State Owner:** TanStack Query (`useSearch`), URL state for query params
- **API Layer:** `lib/api/search.api.ts`
- **Forms:** Search form (controlled input)

#### Acceptance Criteria

- [ ] Search input accepts queries
- [ ] Results display within 500ms
- [ ] Query persisted in URL (?q=...)
- [ ] Empty state shown for no results
- [ ] Loading state visible during fetch
- [ ] Basic relevance sorting applied

---

### F05: Search (Advanced)

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 5 |
| **Domain** | Search |
| **Priority** | Must Have |
| **Phase** | Phase 3 |

#### Frontend Mapping

- **Routes:** `/search` (enhanced)
- **Pages:** `SearchPage` (with filters)
- **Layout:** `SearchLayout`
- **Feature Module:** `features/search/`
- **Components:** `SearchFilters`, `FilterPanel`, `SortDropdown`, `ResultsPerPage`
- **State Owner:** TanStack Query, URL state for all filters
- **API Layer:** `lib/api/search.api.ts` (extended)
- **Forms:** Filter forms (multi-select, range inputs)

#### Filters

- Content type (documents, topics, formulas)
- Date range
- Topic category
- Difficulty level
- Has formulas (boolean)

#### Acceptance Criteria

- [ ] All filter types functional
- [ ] Multiple filters combinable
- [ ] Filter state persists in URL
- [ ] Results update on filter change
- [ ] Sort options working (relevance, date, popularity)
- [ ] Results per page configurable

---

### F06: Formula Search

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 6 |
| **Domain** | Search |
| **Priority** | Should Have |
| **Phase** | Phase 3 |

#### Frontend Mapping

- **Routes:** `/search/formulas`
- **Pages:** `FormulaSearchPage`
- **Layout:** `SearchLayout`
- **Feature Module:** `features/search/`
- **Components:** `FormulaInput`, `FormulaPreview`, `FormulaResults`, `LaTeXValidator`
- **State Owner:** TanStack Query, local state for input
- **API Layer:** `lib/api/search.api.ts` (formula endpoint)
- **Forms:** Formula input with validation

#### Acceptance Criteria

- [ ] LaTeX input accepted
- [ ] Real-time preview of formula
- [ ] Invalid LaTeX shows clear error
- [ ] Search matches similar formulas
- [ ] Results display rendered formulas
- [ ] Click result to view context

---

## Module: Quran (F07)

### F07: Quran References

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 7 |
| **Domain** | Quran |
| **Priority** | Must Have |
| **Phase** | Phase 2 |

#### Frontend Mapping

- **Routes:** `/quran`, `/quran/[surah]`, `/quran/[surah]/[ayah]`
- **Pages:** `QuranIndexPage`, `QuranVersePage`
- **Layout:** `QuranLayout`
- **Feature Module:** `features/quran/`
- **Components:** `QuranReference`, `SurahList`, `AyahDisplay`, `QuranNavigator`
- **State Owner:** TanStack Query (`useQuran`, `useSurah`, `useAyah`)
- **API Layer:** `lib/api/quran.api.ts`
- **Forms:** None (navigation-driven)

#### Acceptance Criteria

- [ ] All 114 surahs listed
- [ ] Ayah-by-ayah navigation works
- [ ] Quran references in topics link correctly
- [ ] Arabic text renders properly (RTL support)
- [ ] Translations available if backend provides

---

## Module: Exports (F08)

### F08: Export (PDF/LaTeX/Markdown)

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 8 |
| **Domain** | Exports |
| **Priority** | Should Have |
| **Phase** | Phase 3 |

#### Frontend Mapping

- **Routes:** N/A (modal-based)
- **Pages:** Integrated in document/topic pages
- **Layout:** Inherits from parent page
- **Feature Module:** `features/exports/`
- **Components:** `ExportTrigger`, `ExportModal`, `ExportFormatSelector`, `ExportStatusIndicator`
- **State Owner:** Zustand (export job state), TanStack Query (status polling)
- **API Layer:** `lib/api/exports.api.ts`
- **Forms:** Export options form (format, quality, etc.)

#### Export Formats

- PDF (via backend service)
- LaTeX source
- Markdown

#### Acceptance Criteria

- [ ] Export trigger accessible from document/topic pages
- [ ] Format selection modal functional
- [ ] Export job initiated successfully
- [ ] Progress indicator shows status
- [ ] Download starts on completion
- [ ] Error handling for failed exports
- [ ] Multiple exports can run concurrently

---

## Module: Analytics (F09)

### F09: Analytics Tracking

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 9 |
| **Domain** | Analytics |
| **Priority** | Should Have |
| **Phase** | Phase 3 |

#### Frontend Mapping

- **Routes:** N/A (cross-cutting concern)
- **Pages:** N/A
- **Layout:** All layouts include tracker
- **Feature Module:** `lib/analytics/`
- **Components:** `AnalyticsProvider`, `PageViewTracker`, `EventTracker`
- **State Owner:** Custom hook with internal state
- **API Layer:** `lib/api/analytics.api.ts`
- **Forms:** N/A

#### Tracked Events

- Page views
- Search queries
- Document views
- Topic navigation
- Export actions
- Failed searches

#### Acceptance Criteria

- [ ] Page views tracked on all routes
- [ ] Custom events fire on user actions
- [ ] Analytics failures silent (no UX impact)
- [ ] Consent mechanism in place (if required)
- [ ] Admin dashboard receives data
- [ ] GDPR-compliant (no PII sent)

---

## Module: Admin (F10, F11, F12, F13)

### F10: Admin Dashboard

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 10 |
| **Domain** | Admin |
| **Priority** | Must Have |
| **Phase** | Phase 4 |

#### Frontend Mapping

- **Routes:** `/admin`, `/admin/dashboard`
- **Pages:** `AdminDashboardPage`
- **Layout:** `AdminLayout`
- **Feature Module:** `features/admin/`
- **Components:** `MetricsCards`, `RecentActivity`, `SystemHealth`, `QuickActions`
- **State Owner:** TanStack Query (real-time metrics)
- **API Layer:** `lib/api/admin.api.ts`
- **Forms:** Quick action forms

#### Metrics Displayed

- Total documents
- Total topics
- Recent searches
- Failed searches count
- System health status
- Recent activity log

#### Acceptance Criteria

- [ ] Dashboard loads within 2 seconds
- [ ] All metrics display accurate data
- [ ] Real-time updates via refetch intervals
- [ ] Unauthorized users redirected
- [ ] Responsive on all devices
- [ ] Quick actions functional

---

### F11: Content Ingestion

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 11 |
| **Domain** | Admin |
| **Priority** | Must Have |
| **Phase** | Phase 4 |

#### Frontend Mapping

- **Routes:** `/admin/ingest`
- **Pages:** `ContentIngestionPage`
- **Layout:** `AdminLayout`
- **Feature Module:** `features/admin/`
- **Components:** `IngestionForm`, `FileUploader`, `ValidationPreview`, `SubmitConfirmation`
- **State Owner:** React Hook Form + Zod, TanStack Query (submission)
- **API Layer:** `lib/api/admin.api.ts` (ingest endpoint)
- **Forms:** Complex multi-step ingestion form

#### Acceptance Criteria

- [ ] Multi-step form navigable
- [ ] File upload with progress indicator
- [ ] Validation preview before submit
- [ ] Clear error messages for invalid content
- [ ] Success confirmation with next steps
- [ ] Draft saving capability

---

### F12: Batch Import

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 12 |
| **Domain** | Admin |
| **Priority** | Should Have |
| **Phase** | Phase 4 |

#### Frontend Mapping

- **Routes:** `/admin/batch-import`
- **Pages:** `BatchImportPage`
- **Layout:** `AdminLayout`
- **Feature Module:** `features/admin/`
- **Components:** `BatchUpload`, `ImportPreview`, `ConflictResolution`, `ProgressTracker`
- **State Owner:** Zustand (import job state), TanStack Query (progress)
- **API Layer:** `lib/api/admin.api.ts` (batch endpoint)
- **Forms:** Batch configuration form

#### Acceptance Criteria

- [ ] Large file upload supported (>100MB)
- [ ] Preview shows import summary
- [ ] Conflict resolution UI functional
- [ ] Progress tracker updates in real-time
- [ ] Partial failure handling clear
- [ ] Import report downloadable

---

### F13: Health Monitoring

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 13 |
| **Domain** | Admin |
| **Priority** | Should Have |
| **Phase** | Phase 4 |

#### Frontend Mapping

- **Routes:** `/admin/health`, `/admin/search-monitoring`, `/admin/jobs`
- **Pages:** `HealthMonitorPage`, `SearchMonitoringPage`, `JobTrackingPage`
- **Layout:** `AdminLayout`
- **Feature Module:** `features/admin/`
- **Components:** `HealthStatus`, `ServiceGrid`, `FailedQueriesTable`, `JobList`
- **State Owner:** TanStack Query (auto-refresh)
- **API Layer:** `lib/api/admin.api.ts` (health endpoints)
- **Forms:** N/A

#### Monitored Items

- API service health
- Database connection status
- Search service status
- Failed search queries
- Background job status
- System resource usage

#### Acceptance Criteria

- [ ] All services display current status
- [ ] Auto-refresh every 30 seconds
- [ ] Failed queries table sortable/filterable
- [ ] Job status updates in real-time
- [ ] Alerts for critical failures
- [ ] Historical data accessible

---

## Module: SEO (F14)

### F14: SEO & Metadata

| Attribute | Value |
|-----------|-------|
| **Backend Source** | `05-feature-inventory.md` - Feature 14 |
| **Domain** | SEO |
| **Priority** | Must Have |
| **Phase** | Phase 3 |

#### Frontend Mapping

- **Routes:** All public routes
- **Pages:** All public pages
- **Layout:** All public layouts
- **Feature Module:** `lib/seo/`, `features/seo/`
- **Components:** `MetadataGenerator`, `JSONLDInjector`, `BreadcrumbSchema`
- **State Owner:** SSR-generated (no client state)
- **API Layer:** N/A (build-time/runtime generation)
- **Forms:** N/A

#### SEO Elements

- Title tags
- Meta descriptions
- Open Graph tags
- Twitter cards
- JSON-LD structured data
- Canonical URLs
- Sitemap.xml
- Robots.txt

#### Acceptance Criteria

- [ ] Every public page has unique title/description
- [ ] Open Graph tags valid for social sharing
- [ ] JSON-LD passes Google Rich Results Test
- [ ] Canonical URLs set correctly
- [ ] Sitemap includes all public routes
- [ ] Breadcrumbs marked up with schema.org
- [ ] AEO/GEO optimization applied

---

## Coverage Verification

**Total Backend Features:** 14
**Features Mapped:** 14
**Unmapped Features:** 0 ✅

All features from `05-feature-inventory.md` have been mapped to:
- Routes
- Pages
- Layouts
- Feature modules
- Components
- State owners
- API layers
- Tests
- Acceptance criteria

---

## Priority Legend

- **Must Have:** Critical for MVP, Phase 2-3
- **Should Have:** Important but can be delayed to Phase 3-4
- **Could Have:** Nice to have, Phase 4-5
- **Won't Have:** Out of scope for current implementation

---

## Traceability

All features traced to:
- **Source:** `docs/project-management/03-feature-registry.md`
- **Backend Discovery:** `docs/frontend-discovery/05-feature-inventory.md`
- **Blueprint:** `docs/frontend-blueprint/04-feature-modules.md`

No features invented; all derived from backend capabilities.
