# Sijil — Frontend Blueprint: Feature Modules

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document organizes the frontend into feature modules, each containing pages, components, hooks, API clients, and state management specific to that domain.

---

## Module Structure

Each feature module follows this structure:

```
features/
└── [feature-name]/
    ├── components/       # Feature-specific components
    ├── hooks/            # Custom hooks
    ├── api/              # API client functions
    ├── store/            # Zustand stores (if needed)
    ├── types/            # TypeScript types
    └── utils/            # Feature utilities
```

---

## Documents Module

**Path:** `features/documents/`

### Pages
- `DocumentListPage` — Browse and filter documents
- `DocumentDetailPage` — Document metadata and topics
- `TopicRedirectPage` — Redirect to canonical slug

### Components
- `DocumentCard` — Document summary display
- `DocumentFilters` — Subject/grade/type filters
- `ChapterOutline` — Chapter hierarchy display
- `TopicListGrouped` — Topics grouped by chapter
- `DocumentStats` — Aggregated counts display

### Hooks
- `useDocuments` — Fetch document list with filters
- `useDocument` — Fetch single document
- `useDocumentTopics` — Fetch topics in document
- `useDocumentAggregates` — Fetch counts
- `useSubjects` — Fetch subject list
- `useGrades` — Fetch grade list

### API Clients
- `documents.api.ts` — Document endpoints
- `subjects.api.ts` — Subject endpoints
- `grades.api.ts` — Grade endpoints

### State
- URL state for filters (subject, grade, type, page)
- TanStack Query cache for documents
- No persistent Zustand state needed

---

## Topics Module

**Path:** `features/topics/`

### Pages
- `TopicPage` — Main content consumption
- `TopicContentOnly` — Content blocks only view
- `TopicAssetsOnly` — Figures/tables only view

### Components
- `BlockRenderer` — Polymorphic block renderer
- `HeadingBlock` — Heading with anchor
- `ParagraphBlock` — Text with inline formulas
- `FormulaBlock` — LaTeX rendering
- `FigureBlock` — Image/SVG display
- `TableBlock` — Data table rendering
- `CalloutBlock` — Note/warning/tip boxes
- `MCQBlock` — Interactive multiple choice
- `ExampleBlock` — Worked examples
- `ListBlock` — Ordered/unordered lists
- `DefinitionBlock` — Term definitions
- `LearningOutcomesBlock` — Learning objectives
- `ComparisonViewBlock` — Comparison tables
- `QuranVerseBlock` — Quran text display
- `QuranReferenceBlock` — Quran references
- `ActivityBlock` — Lab activities
- `EquationBlock` — Inline equations
- `NumericalBlock` — Numerical problems
- `TableOfContents` — Auto-generated TOC
- `NextPrevNavigation` — Sequential navigation
- `TopicSidebar` — Actions and related topics

### Hooks
- `useTopic` — Fetch topic metadata
- `useTopicContent` — Fetch content blocks
- `useTopicAssets` — Fetch figures/tables
- `useTopicAssessments` — Fetch MCQs/questions
- `useTopicPage` — Fetch full page data
- `useTopicViews` — Track views (auto)
- `useTableOfContents` — Generate TOC from blocks
- `useLaTeX` — KaTeX rendering options

### API Clients
- `topics.api.ts` — Topic endpoints
- `content.api.ts` — Content blocks endpoint
- `assets.api.ts` — Assets endpoint
- `assessments.api.ts` — Assessments endpoint

### State
- TanStack Query cache for topic data
- Zustand store for reading progress (optional)
- URL state for current section anchor

---

## Search Module

**Path:** `features/search/`

### Pages
- `SearchResultsPage` — Main search results
- `FormulaSearchPage` — Formula-specific results

### Components
- `SearchBar` — Global search with autocomplete
- `FilterPanel` — Faceted search filters
- `SearchResultCard` — Result display with snippets
- `FormulaCard` — Formula preview with LaTeX
- `SearchSuggestions` — Autocomplete dropdown
- `TrendingSearches` — Popular searches widget
- `FailedSearchMessage` — No results with suggestions
- `ActiveFilters` — Display and clear filters
- `SearchPagination` — Pagination controls

### Hooks
- `useSearch` — Execute search with filters
- `useSearchSuggestions` — Fetch autocomplete
- `useFormulaSearch` — Search formulas
- `useTrendingSearches` — Fetch trending
- `useSearchFilters` — Manage filter state
- `useSearchURL` — Sync filters with URL
- `useDebouncedValue` — Debounce input

### API Clients
- `search.api.ts` — Search endpoints
- `suggestions.api.ts` — Suggestions endpoint
- `trending.api.ts` — Trending endpoint

### State
- URL state for query and filters
- Zustand store for recent searches (local)
- TanStack Query cache for results

---

## Quran Module

**Path:** `features/quran/`

### Pages
- `QuranBrowserPage` — Main Quran browser
- `SurahPage` — Single surah view
- `AyahPage` — Single ayah view
- `RangePage` — Ayah range view

### Components
- `SurahSelector` — Surah dropdown navigation
- `AyahNavigator` — Verse navigation controls
- `TranslationToggle` — Language toggle
- `QuranText` — Arabic text display
- `TranslationPanel` — Translation display
- `JuzMarker` — Juz position indicator
- `HizbMarker` — Hizb position indicator
- `RukuMarker` — Ruku position indicator
- `AyahCard` — Single ayah display
- `SurahInfo` — Surah metadata

### Hooks
- `useSurah` — Fetch surah data
- `useAyah` — Fetch single ayah
- `useQuranRange` — Fetch ayah range
- `useTranslationPreference` — Persist language choice
- `useQuranNavigation` — Navigate between ayahs

### API Clients
- `quran.api.ts` — Quran endpoints

### State
- Zustand store for translation preferences
- URL state for current surah/ayah
- TanStack Query cache for surah data

---

## Exports Module

**Path:** `features/exports/`

### Pages
- `ExportStatusPage` — Job status and download

### Components
- `ExportButton` — Trigger export from topic page
- `ExportModal` — Format selection modal
- `ExportProgress` — Progress indicator
- `ExportStatus` — Status display
- `DownloadManager` — Track completed exports
- `StalenessWarning` — Content changed warning
- `FormatSelector` — Available formats dropdown
- `PolicyEnforcer` — Disable unavailable formats

### Hooks
- `useCreateExport` — Create export job
- `useExportStatus` — Poll job status
- `useExportPolicies` — Fetch export policies
- `useExportStaleness` — Check staleness
- `useDownloadTracker` — Track downloads

### API Clients
- `exports.api.ts` — Export endpoints
- `policies.api.ts` — Policy endpoints

### State
- Zustand store for active export jobs
- Zustand store for download history
- Polling interval for status checks

---

## Analytics Module

**Path:** `features/analytics/`

### Pages
- `AnalyticsDashboard` — Admin analytics viewer
- `SearchAnalyticsPage` — Search-specific analytics

### Components
- `StatCard` — Statistics display
- `PopularTopicsList` — Trending topics table
- `FailedSearchesList` — Content gap identification
- `SearchAnalyticsChart` — Search volume over time
- `TopicAnalyticsTable` — View counts per topic
- `DateRangePicker` — Time range selector
- `ExportAnalyticsButton` — Download analytics data

### Hooks
- `usePlatformStats` — Fetch platform statistics
- `usePopularTopics` — Fetch popular topics
- `useFailedSearches` — Fetch failed searches
- `useSearchAnalytics` — Fetch search analytics
- `useTopicAnalytics` — Fetch topic analytics
- `useRecentArrivals` — Fetch recent additions

### API Clients
- `analytics.api.ts` — Analytics endpoints
- `stats.api.ts` — Statistics endpoints

### State
- TanStack Query cache for analytics data
- No persistent state (read-only)

---

## Admin Module

**Path:** `features/admin/`

### Pages
- `AdminDashboard` — Admin overview
- `IngestionPage` — JSON submission
- `IngestionStatusPage` — Job status tracker
- `BatchImportPage` — GitHub import form
- `ImportStatusPage` — Import progress
- `ImportReportPage` — Download report

### Components
- `AdminDashboard` — Stats and recent jobs
- `JsonEditor` — Code editor with validation
- `IngestionForm` — Submit JSON payload
- `JobStatusTracker` — Real-time status
- `ImportPreviewTable` — Files to import
- `MultiStageProgress` — 4-stage progress bars
- `ImportErrorLog` — Failed files display
- `AuditLogTable` — Action history
- `HealthIndicator` — System health status
- `AdminActionButtons` — Cancel/retry actions

### Hooks
- `useSubmitIngest` — Submit ingestion job
- `useIngestStatus` — Poll ingestion status
- `useCancelJob` — Cancel running job
- `useRetryJob` — Retry failed job
- `usePreviewImport` — Preview GitHub repo
- `useStartImport` — Start batch import
- `useImportStatus` — Poll import progress
- `useDownloadReport` — Download import report
- `useAdminAuth` — Check admin authentication

### API Clients
- `admin.api.ts` — Admin endpoints
- `ingest.api.ts` — Ingestion endpoints
- `import.api.ts` — Batch import endpoints

### State
- Zustand store for admin authentication
- Zustand store for active jobs
- Polling intervals for job status
- Form state for JSON editor

---

## SEO Module

**Path:** `features/seo/`

### Components
- `MetaTags` — Inject meta tags
- `JsonLdScript` — Inject structured data
- `OpenGraphTags` — Social media meta
- `TwitterCardTags` — Twitter card meta
- `BreadcrumbSchema` — Breadcrumb JSON-LD
- `FAQSchema` — FAQ JSON-LD
- `GeoMetadata` — GEO meta tags

### Hooks
- `useJSONLD` — Fetch and inject JSON-LD
- `useAEOData` — Fetch answer engine data
- `useAEOScore` — Fetch AEO readiness score
- `useMetadata` — Generate page metadata

### API Clients
- `seo.api.ts` — SEO endpoints

### State
- No persistent state
- Server-side metadata generation

---

## Shared Module

**Path:** `features/shared/`

### Components
- `Header` — Global header
- `Footer` — Global footer
- `Breadcrumb` — Navigation trail
- `Pagination` — Page navigation
- `Spinner` — Loading indicator
- `ProgressBar` — Progress display
- `Alert` — Status messages
- `Modal` — Dialog overlay
- `EmptyState` — No content placeholder
- `ErrorBoundary` — Error handling
- `Skeleton` — Loading placeholders
- `Badge` — Status indicators
- `DataTable` — Generic table
- `CodeBlock` — Syntax highlighting

### Hooks
- `useDebounce` — Debounce utility
- `useLocalStorage` — Persist data locally
- `useMediaQuery` — Responsive queries
- `useOnClickOutside` — Click detection
- `useKeyboardShortcut` — Key bindings

### Utils
- `formatters.ts` — Date, number formatting
- `validators.ts` — Client-side validation
- `constants.ts` — App-wide constants

---

## Module Dependencies

```
documents ─────────────┬─────────────► topics
                       │
search ────────────────┼─────────────► topics
                       │
quran ─────────────────┤
                       │
exports ───────────────┴─────────────► topics
                       │
analytics ─────────────┤
                       │
admin ─────┬───────────┴───────► documents
           │                    ► topics
           │                    ► imports
           │
seo ───────┴───────────────────► topics
```

---

## Related Documents

- [01-system-architecture.md](./01-system-architecture.md) — System boundaries
- [06-state-architecture.md](./06-state-architecture.md) — State management
- [07-api-layer.md](./07-api-layer.md) — API clients
- [13-folder-structure.md](./13-folder-structure.md) — File organization
