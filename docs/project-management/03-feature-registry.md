# SIJIL Feature Registry

## Overview

This registry maps all 14 backend features from `docs/frontend-discovery/05-feature-inventory.md` to frontend implementation details, ensuring complete coverage with no unmapped features.

---

## Feature Mapping Summary

| # | Feature Name | Domain | Priority | Phase | Status |
|---|--------------|--------|----------|-------|--------|
| F01 | Document Management | Documents | Must Have | Phase 2 | Not Started |
| F02 | Topic Hierarchy | Topics | Must Have | Phase 2 | Not Started |
| F03 | Content Block Rendering | Topics | Must Have | Phase 2 | Not Started |
| F04 | Search (Basic) | Search | Must Have | Phase 2 | Not Started |
| F05 | Search (Advanced) | Search | Must Have | Phase 3 | Not Started |
| F06 | Formula Search | Search | Should Have | Phase 3 | Not Started |
| F07 | Quran References | Quran | Must Have | Phase 2 | Not Started |
| F08 | Export (PDF/LaTeX/MD) | Exports | Should Have | Phase 3 | Not Started |
| F09 | Analytics Tracking | Analytics | Should Have | Phase 3 | Not Started |
| F10 | Admin Dashboard | Admin | Must Have | Phase 4 | Not Started |
| F11 | Content Ingestion | Admin | Must Have | Phase 4 | Not Started |
| F12 | Batch Import | Admin | Should Have | Phase 4 | Not Started |
| F13 | Health Monitoring | Admin | Should Have | Phase 4 | Not Started |
| F14 | SEO & Metadata | SEO | Must Have | Phase 3 | Not Started |

---

## Detailed Feature Specifications

### F01: Document Management

**Backend Source:** `05-feature-inventory.md` - Feature 1  
**Domain:** Documents  
**Priority:** Must Have  
**Implementation Phase:** Phase 2  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/documents`, `/documents/[slug]` |
| **Pages** | `DocumentsListPage`, `DocumentDetailPage` |
| **Layout** | `DocumentLayout` |
| **Feature Module** | `features/documents/` |
| **Components** | `DocumentCard`, `DocumentList`, `DocumentMeta`, `RelatedDocuments` |
| **State Owner** | TanStack Query (`useDocuments`, `useDocument`) |
| **API Layer** | `lib/api/documents.api.ts` |
| **Forms** | None (read-only in public area) |
| **Tests** | Unit: document utilities, Integration: list + detail pages, E2E: navigation flow |

#### Blueprint References

- `docs/frontend-blueprint/02-route-architecture.md` - Routes
- `docs/frontend-blueprint/03-layout-architecture.md` - DocumentLayout
- `docs/frontend-blueprint/04-feature-modules.md` - Documents module
- `docs/frontend-blueprint/07-api-layer.md` - documents.api.ts

#### CLAUDE.md Rules

- Section 3.2: Folder structure for feature modules
- Section 5.1: TanStack Query for server state
- Section 6.3: API error handling

#### Acceptance Criteria

- [ ] Document list displays all documents with pagination
- [ ] Document detail shows full content with metadata
- [ ] Related documents section functional
- [ ] Breadcrumbs navigate correctly
- [ ] SEO metadata present on all pages

---

### F02: Topic Hierarchy

**Backend Source:** `05-feature-inventory.md` - Feature 2  
**Domain:** Topics  
**Priority:** Must Have  
**Implementation Phase:** Phase 2  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/topics`, `/topics/[slug]`, `/topics/[slug]/[childSlug]` |
| **Pages** | `TopicsListPage`, `TopicDetailPage` |
| **Layout** | `TopicLayout` |
| **Feature Module** | `features/topics/` |
| **Components** | `TopicTree`, `TopicNavigation`, `TopicBreadcrumb`, `ChildTopics` |
| **State Owner** | TanStack Query (`useTopics`, `useTopic`) |
| **API Layer** | `lib/api/topics.api.ts` |
| **Forms** | None (read-only in public area) |
| **Tests** | Unit: topic utilities, Integration: tree rendering, E2E: hierarchical navigation |

#### Blueprint References

- `docs/frontend-blueprint/02-route-architecture.md` - Nested routes
- `docs/frontend-blueprint/03-layout-architecture.md` - TopicLayout
- `docs/frontend-blueprint/04-feature-modules.md` - Topics module
- `docs/frontend-blueprint/08-rendering-engine.md` - Topic content rendering

#### CLAUDE.md Rules

- Section 3.2: Feature module structure
- Section 4.3: Component composition patterns
- Section 5.1: Server state management

#### Acceptance Criteria

- [ ] Topic hierarchy displayed as tree or nested list
- [ ] Parent-child relationships clear in navigation
- [ ] Breadcrumbs reflect hierarchy accurately
- [ ] Child topics accessible from parent page
- [ ] Deep linking to nested topics works

---

### F03: Content Block Rendering

**Backend Source:** `05-feature-inventory.md` - Feature 3  
**Domain:** Topics  
**Priority:** Must Have  
**Implementation Phase:** Phase 2  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | All topic detail routes |
| **Pages** | `TopicDetailPage` (integrated) |
| **Layout** | `TopicLayout` |
| **Feature Module** | `features/topics/` |
| **Components** | `BlockRenderer`, 17 block type components |
| **State Owner** | Props-driven (no additional state) |
| **API Layer** | Included in topics.api.ts response |
| **Forms** | N/A |
| **Tests** | Unit: each block renderer, Integration: BlockRenderer with mock data, Visual: snapshot tests |

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

#### Blueprint References

- `docs/frontend-blueprint/08-rendering-engine.md` - Complete renderer spec
- `docs/frontend-blueprint/05-component-architecture.md` - Component ownership
- `docs/frontend-blueprint/04-feature-modules.md` - Topics module

#### CLAUDE.md Rules

- Section 4.1: Component classification
- Section 4.2: Component anatomy
- Section 4.5: Composition patterns

#### Acceptance Criteria

- [ ] BlockRenderer dispatches correct component for each block type
- [ ] All 17 block types render correctly
- [ ] KaTeX formulas render without errors
- [ ] Tables are responsive
- [ ] MCQs interactive with selection feedback
- [ ] Quran references link correctly
- [ ] Performance acceptable with 50+ blocks

---

### F04: Search (Basic)

**Backend Source:** `05-feature-inventory.md` - Feature 4  
**Domain:** Search  
**Priority:** Must Have  
**Implementation Phase:** Phase 2  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/search` |
| **Pages** | `SearchPage` |
| **Layout** | `SearchLayout` |
| **Feature Module** | `features/search/` |
| **Components** | `SearchInput`, `SearchResults`, `SearchResultCard`, `NoResults` |
| **State Owner** | TanStack Query (`useSearch`), URL state for query params |
| **API Layer** | `lib/api/search.api.ts` |
| **Forms** | Search form (controlled input) |
| **Tests** | Unit: search utilities, Integration: search flow, E2E: query → results |

#### Blueprint References

- `docs/frontend-blueprint/09-search-architecture.md` - Search spec
- `docs/frontend-blueprint/02-route-architecture.md` - Search route
- `docs/frontend-blueprint/06-state-architecture.md` - URL state strategy

#### CLAUDE.md Rules

- Section 5.3: URL state synchronization
- Section 5.4: Form state management
- Section 6.2: Debouncing and retry logic

#### Acceptance Criteria

- [ ] Search input accepts queries
- [ ] Results display within 500ms
- [ ] Query persisted in URL (?q=...)
- [ ] Empty state shown for no results
- [ ] Loading state visible during fetch
- [ ] Basic relevance sorting applied

---

### F05: Search (Advanced)

**Backend Source:** `05-feature-inventory.md` - Feature 5  
**Domain:** Search  
**Priority:** Must Have  
**Implementation Phase:** Phase 3  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/search` (enhanced) |
| **Pages** | `SearchPage` (with filters) |
| **Layout** | `SearchLayout` |
| **Feature Module** | `features/search/` |
| **Components** | `SearchFilters`, `FilterPanel`, `SortDropdown`, `ResultsPerPage` |
| **State Owner** | TanStack Query, URL state for all filters |
| **API Layer** | `lib/api/search.api.ts` (extended) |
| **Forms** | Filter forms (multi-select, range inputs) |
| **Tests** | Unit: filter utilities, Integration: filtered search, E2E: complex queries |

#### Filters

- Content type (documents, topics, formulas)
- Date range
- Topic category
- Difficulty level
- Has formulas (boolean)

#### Blueprint References

- `docs/frontend-blueprint/09-search-architecture.md` - Advanced search spec
- `docs/frontend-blueprint/06-state-architecture.md` - Complex URL state

#### CLAUDE.md Rules

- Section 5.3: URL state for complex filters
- Section 6.3: API request optimization

#### Acceptance Criteria

- [ ] All filter types functional
- [ ] Multiple filters combinable
- [ ] Filter state persists in URL
- [ ] Results update on filter change
- [ ] Sort options working (relevance, date, popularity)
- [ ] Results per page configurable

---

### F06: Formula Search

**Backend Source:** `05-feature-inventory.md` - Feature 6  
**Domain:** Search  
**Priority:** Should Have  
**Implementation Phase:** Phase 3  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/search/formulas` |
| **Pages** | `FormulaSearchPage` |
| **Layout** | `SearchLayout` |
| **Feature Module** | `features/search/` |
| **Components** | `FormulaInput`, `FormulaPreview`, `FormulaResults`, `LaTeXValidator` |
| **State Owner** | TanStack Query, local state for input |
| **API Layer** | `lib/api/search.api.ts` (formula endpoint) |
| **Forms** | Formula input with validation |
| **Tests** | Unit: LaTeX validation, Integration: formula matching, E2E: formula search flow |

#### Blueprint References

- `docs/frontend-blueprint/09-search-architecture.md` - Formula search section
- `docs/frontend-blueprint/08-rendering-engine.md` - KaTeX integration

#### CLAUDE.md Rules

- Section 4.4: Accessibility for complex inputs
- Section 6.2: Error handling for invalid LaTeX

#### Acceptance Criteria

- [ ] LaTeX input accepted
- [ ] Real-time preview of formula
- [ ] Invalid LaTeX shows clear error
- [ ] Search matches similar formulas
- [ ] Results display rendered formulas
- [ ] Click result to view context

---

### F07: Quran References

**Backend Source:** `05-feature-inventory.md` - Feature 7  
**Domain:** Quran  
**Priority:** Must Have  
**Implementation Phase:** Phase 2  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/quran`, `/quran/[surah]`, `/quran/[surah]/[ayah]` |
| **Pages** | `QuranIndexPage`, `QuranVersePage` |
| **Layout** | `QuranLayout` |
| **Feature Module** | `features/quran/` |
| **Components** | `QuranReference`, `SurahList`, `AyahDisplay`, `QuranNavigator` |
| **State Owner** | TanStack Query (`useQuran`, `useSurah`, `useAyah`) |
| **API Layer** | `lib/api/quran.api.ts` |
| **Forms** | None (navigation-driven) |
| **Tests** | Unit: reference parsing, Integration: verse display, E2E: navigation flow |

#### Blueprint References

- `docs/frontend-blueprint/04-feature-modules.md` - Quran module
- `docs/frontend-blueprint/08-rendering-engine.md` - Quran reference block
- `docs/frontend-blueprint/11-seo-architecture.md` - Religious content SEO

#### CLAUDE.md Rules

- Section 3.3: Domain folder organization
- Section 5.1: Query key structure

#### Acceptance Criteria

- [ ] All 114 surahs listed
- [ ] Ayah-by-ayah navigation works
- [ ] Quran references in topics link correctly
- [ ] Arabic text renders properly (RTL support)
- [ ] Translations available if backend provides

---

### F08: Export (PDF/LaTeX/Markdown)

**Backend Source:** `05-feature-inventory.md` - Feature 8  
**Domain:** Exports  
**Priority:** Should Have  
**Implementation Phase:** Phase 3  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | N/A (modal-based) |
| **Pages** | Integrated in document/topic pages |
| **Layout** | Inherits from parent page |
| **Feature Module** | `features/exports/` |
| **Components** | `ExportTrigger`, `ExportModal`, `ExportFormatSelector`, `ExportStatusIndicator` |
| **State Owner** | Zustand (export job state), TanStack Query (status polling) |
| **API Layer** | `lib/api/exports.api.ts` |
| **Forms** | Export options form (format, quality, etc.) |
| **Tests** | Unit: format utilities, Integration: export flow, E2E: download completion |

#### Export Formats

- PDF (via backend service)
- LaTeX source
- Markdown

#### Blueprint References

- `docs/frontend-blueprint/04-feature-modules.md` - Exports module
- `docs/frontend-blueprint/07-api-layer.md` - exports.api.ts
- `docs/frontend-blueprint/06-state-architecture.md` - Job state management

#### CLAUDE.md Rules

- Section 5.2: Zustand for client-side job tracking
- Section 6.4: Polling strategy for long-running jobs

#### Acceptance Criteria

- [ ] Export trigger accessible from document/topic pages
- [ ] Format selection modal functional
- [ ] Export job initiated successfully
- [ ] Progress indicator shows status
- [ ] Download starts on completion
- [ ] Error handling for failed exports
- [ ] Multiple exports can run concurrently

---

### F09: Analytics Tracking

**Backend Source:** `05-feature-inventory.md` - Feature 9  
**Domain:** Analytics  
**Priority:** Should Have  
**Implementation Phase:** Phase 3  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | N/A (cross-cutting concern) |
| **Pages** | N/A |
| **Layout** | All layouts include tracker |
| **Feature Module** | `lib/analytics/` |
| **Components** | `AnalyticsProvider`, `PageViewTracker`, `EventTracker` |
| **State Owner** | Custom hook with internal state |
| **API Layer** | `lib/api/analytics.api.ts` |
| **Forms** | N/A |
| **Tests** | Unit: event formatting, Integration: page view tracking, Privacy: consent flow |

#### Tracked Events

- Page views
- Search queries
- Document views
- Topic navigation
- Export actions
- Failed searches

#### Blueprint References

- `docs/frontend-blueprint/04-feature-modules.md` - Analytics module
- `docs/frontend-blueprint/07-api-layer.md` - analytics.api.ts

#### CLAUDE.md Rules

- Section 2.5: Error handling for analytics failures (must not break UX)
- Section 6.1: Retry logic with exponential backoff

#### Acceptance Criteria

- [ ] Page views tracked on all routes
- [ ] Custom events fire on user actions
- [ ] Analytics failures silent (no UX impact)
- [ ] Consent mechanism in place (if required)
- [ ] Admin dashboard receives data
- [ ] GDPR-compliant (no PII sent)

---

### F10: Admin Dashboard

**Backend Source:** `05-feature-inventory.md` - Feature 10  
**Domain:** Admin  
**Priority:** Must Have  
**Implementation Phase:** Phase 4  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/admin`, `/admin/dashboard` |
| **Pages** | `AdminDashboardPage` |
| **Layout** | `AdminLayout` |
| **Feature Module** | `features/admin/` |
| **Components** | `MetricsCards`, `RecentActivity`, `SystemHealth`, `QuickActions` |
| **State Owner** | TanStack Query (real-time metrics) |
| **API Layer** | `lib/api/admin.api.ts` |
| **Forms** | Quick action forms |
| **Tests** | Unit: metric calculations, Integration: dashboard data, E2E: admin access control |

#### Metrics Displayed

- Total documents
- Total topics
- Recent searches
- Failed searches count
- System health status
- Recent activity log

#### Blueprint References

- `docs/frontend-blueprint/10-admin-architecture.md` - Admin dashboard spec
- `docs/frontend-blueprint/03-layout-architecture.md` - AdminLayout

#### CLAUDE.md Rules

- Section 3.4: Admin domain isolation
- Section 7.2: Role-based access control

#### Acceptance Criteria

- [ ] Dashboard loads within 2 seconds
- [ ] All metrics display accurate data
- [ ] Real-time updates via refetch intervals
- [ ] Unauthorized users redirected
- [ ] Responsive on all devices
- [ ] Quick actions functional

---

### F11: Content Ingestion

**Backend Source:** `05-feature-inventory.md` - Feature 11  
**Domain:** Admin  
**Priority:** Must Have  
**Implementation Phase:** Phase 4  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/admin/ingest` |
| **Pages** | `ContentIngestionPage` |
| **Layout** | `AdminLayout` |
| **Feature Module** | `features/admin/` |
| **Components** | `IngestionForm`, `FileUploader`, `ValidationPreview`, `SubmitConfirmation` |
| **State Owner** | React Hook Form + Zod, TanStack Query (submission) |
| **API Layer** | `lib/api/admin.api.ts` (ingest endpoint) |
| **Forms** | Complex multi-step ingestion form |
| **Tests** | Unit: form validation, Integration: file upload, E2E: complete ingestion flow |

#### Blueprint References

- `docs/frontend-blueprint/10-admin-architecture.md` - Ingestion spec
- `docs/frontend-blueprint/06-state-architecture.md` - Form state strategy

#### CLAUDE.md Rules

- Section 5.4: Complex form management
- Section 6.3: File upload error handling

#### Acceptance Criteria

- [ ] Multi-step form navigable
- [ ] File upload with progress indicator
- [ ] Validation preview before submit
- [ ] Clear error messages for invalid content
- [ ] Success confirmation with next steps
- [ ] Draft saving capability

---

### F12: Batch Import

**Backend Source:** `05-feature-inventory.md` - Feature 12  
**Domain:** Admin  
**Priority:** Should Have  
**Implementation Phase:** Phase 4  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/admin/batch-import` |
| **Pages** | `BatchImportPage` |
| **Layout** | `AdminLayout` |
| **Feature Module** | `features/admin/` |
| **Components** | `BatchUpload`, `ImportPreview`, `ConflictResolution`, `ProgressTracker` |
| **State Owner** | Zustand (import job state), TanStack Query (progress) |
| **API Layer** | `lib/api/admin.api.ts` (batch endpoint) |
| **Forms** | Batch configuration form |
| **Tests** | Unit: batch utilities, Integration: large file handling, E2E: complete import |

#### Blueprint References

- `docs/frontend-blueprint/10-admin-architecture.md` - Batch import spec
- `docs/frontend-blueprint/06-state-architecture.md` - Long-running job state

#### CLAUDE.md Rules

- Section 6.4: Background job polling
- Section 4.4: Progress indication

#### Acceptance Criteria

- [ ] Large file upload supported (>100MB)
- [ ] Preview shows import summary
- [ ] Conflict resolution UI functional
- [ ] Progress tracker updates in real-time
- [ ] Partial failure handling clear
- [ ] Import report downloadable

---

### F13: Health Monitoring

**Backend Source:** `05-feature-inventory.md` - Feature 13  
**Domain:** Admin  
**Priority:** Should Have  
**Implementation Phase:** Phase 4  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | `/admin/health`, `/admin/search-monitoring`, `/admin/jobs` |
| **Pages** | `HealthMonitorPage`, `SearchMonitoringPage`, `JobTrackingPage` |
| **Layout** | `AdminLayout` |
| **Feature Module** | `features/admin/` |
| **Components** | `HealthStatus`, `ServiceGrid`, `FailedQueriesTable`, `JobList` |
| **State Owner** | TanStack Query (auto-refresh) |
| **API Layer** | `lib/api/admin.api.ts` (health endpoints) |
| **Forms** | N/A |
| **Tests** | Unit: status calculations, Integration: real-time updates, E2E: monitoring workflow |

#### Monitored Items

- API service health
- Database connection status
- Search service status
- Failed search queries
- Background job status
- System resource usage

#### Blueprint References

- `docs/frontend-blueprint/10-admin-architecture.md` - Monitoring spec
- `docs/frontend-blueprint/06-state-architecture.md` - Auto-refresh strategy

#### CLAUDE.md Rules

- Section 5.1: Query refetch intervals
- Section 6.3: Error boundaries for monitoring

#### Acceptance Criteria

- [ ] All services display current status
- [ ] Auto-refresh every 30 seconds
- [ ] Failed queries table sortable/filterable
- [ ] Job status updates in real-time
- [ ] Alerts for critical failures
- [ ] Historical data accessible

---

### F14: SEO & Metadata

**Backend Source:** `05-feature-inventory.md` - Feature 14  
**Domain:** SEO  
**Priority:** Must Have  
**Implementation Phase:** Phase 3  
**Status:** Not Started

#### Frontend Mapping

| Aspect | Details |
|--------|---------|
| **Routes** | All public routes |
| **Pages** | All public pages |
| **Layout** | All public layouts |
| **Feature Module** | `lib/seo/`, `features/seo/` |
| **Components** | `MetadataGenerator`, `JSONLDInjector`, `BreadcrumbSchema` |
| **State Owner** | SSR-generated (no client state) |
| **API Layer** | N/A (build-time/runtime generation) |
| **Forms** | N/A |
| **Tests** | Unit: metadata generation, Integration: next-seo config, Validation: Google tools |

#### SEO Elements

- Title tags
- Meta descriptions
- Open Graph tags
- Twitter cards
- JSON-LD structured data
- Canonical URLs
- Sitemap.xml
- Robots.txt

#### Blueprint References

- `docs/frontend-blueprint/11-seo-architecture.md` - Complete SEO spec
- `docs/frontend-blueprint/02-route-architecture.md` - Route-level metadata

#### CLAUDE.md Rules

- Section 2.3: SSR requirements for SEO
- Section 7.1: Metadata consistency

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

## References

- Backend Discovery: `docs/frontend-discovery/05-feature-inventory.md`
- Blueprint: `docs/frontend-blueprint/`
- Governance: `CLAUDE.md`
- Task Backlog: `docs/project-management/09-task-backlog.md`
