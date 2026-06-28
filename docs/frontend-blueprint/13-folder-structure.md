# Sijil — Frontend Blueprint: Folder Structure

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the exact production folder structure for Sijil. No placeholders, no pseudo examples—this is the final structure for implementation.

---

## Complete Folder Tree

```
sijil-frontend/
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── components.json
├── package.json
├── pnpm-lock.yaml
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   │
│   │   ├── documents/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [documentId]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── topics/
│   │   │           └── [topicId]/
│   │   │               └── page.tsx
│   │   │
│   │   ├── topics/
│   │   │   ├── layout.tsx
│   │   │   └── slug/
│   │   │       └── [...slug]/
│   │   │           ├── page.tsx
│   │   │           └── loading.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── formulas/
│   │   │       └── page.tsx
│   │   │
│   │   ├── subjects/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── [subject]/
│   │   │       ├── page.tsx
│   │   │       └── grade/
│   │   │           └── [grade]/
│   │   │               └── page.tsx
│   │   │
│   │   ├── quran/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── [surahNumber]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── ayah/
│   │   │   │       └── [ayahNumber]/
│   │   │   │           └── page.tsx
│   │   │   └── range/
│   │   │       └── [surahNumber]/
│   │   │           └── [start]/
│   │   │               └── [end]/
│   │   │                   └── page.tsx
│   │   │
│   │   ├── exports/
│   │   │   └── [exportJobId]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── ingest/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [trackingId]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── import/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [batchId]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── report/
│   │   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── page.tsx
│   │   │   │   └── search/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── versions/
│   │   │       └── [entityType]/
│   │   │           └── [entityId]/
│   │   │               └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── health/
│   │       │   └── route.ts
│   │       └── revalidate/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── select.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── navigation/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── BottomTabBar.tsx
│   │   │
│   │   ├── feedback/
│   │   │   ├── Spinner.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── MultiStageProgress.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Skeleton/
│   │   │       ├── TextSkeleton.tsx
│   │   │       ├── CardSkeleton.tsx
│   │   │       └── TableSkeleton.tsx
│   │   │
│   │   ├── display/
│   │   │   ├── DataTable.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── LatexRenderer.tsx
│   │   │   ├── ImageWithFallback.tsx
│   │   │   └── ResponsiveImage.tsx
│   │   │
│   │   └── providers/
│   │       └── Providers.tsx
│   │
│   ├── features/
│   │   ├── documents/
│   │   │   ├── components/
│   │   │   │   ├── DocumentCard.tsx
│   │   │   │   ├── DocumentMetadata.tsx
│   │   │   │   ├── TopicCountBadge.tsx
│   │   │   │   ├── DocumentFilters.tsx
│   │   │   │   ├── SubjectFilter.tsx
│   │   │   │   ├── GradeFilter.tsx
│   │   │   │   ├── TypeFilter.tsx
│   │   │   │   ├── ChapterOutline.tsx
│   │   │   │   ├── ChapterNode.tsx
│   │   │   │   ├── TopicListGrouped.tsx
│   │   │   │   └── DocumentStats.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDocuments.ts
│   │   │   │   ├── useDocument.ts
│   │   │   │   ├── useDocumentTopics.ts
│   │   │   │   ├── useDocumentAggregates.ts
│   │   │   │   ├── useSubjects.ts
│   │   │   │   └── useGrades.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── topics/
│   │   │   ├── components/
│   │   │   │   ├── BlockRenderer.tsx
│   │   │   │   ├── TableOfContents.tsx
│   │   │   │   ├── TOCItem.tsx
│   │   │   │   ├── NextPrevNavigation.tsx
│   │   │   │   ├── NavButton.tsx
│   │   │   │   ├── TopicSidebar.tsx
│   │   │   │   ├── ExportButton.tsx
│   │   │   │   ├── ShareButton.tsx
│   │   │   │   ├── RelatedTopicsList.tsx
│   │   │   │   ├── AssessmentPreview.tsx
│   │   │   │   └── blocks/
│   │   │   │       ├── HeadingBlock.tsx
│   │   │   │       ├── ParagraphBlock.tsx
│   │   │   │       ├── FormulaBlock.tsx
│   │   │   │       ├── FigureBlock.tsx
│   │   │   │       ├── TableBlock.tsx
│   │   │   │       ├── CalloutBlock.tsx
│   │   │   │       ├── MCQBlock.tsx
│   │   │   │       ├── ExampleBlock.tsx
│   │   │   │       ├── ListBlock.tsx
│   │   │   │       ├── DefinitionBlock.tsx
│   │   │   │       ├── LearningOutcomesBlock.tsx
│   │   │   │       ├── ComparisonViewBlock.tsx
│   │   │   │       ├── QuranVerseBlock.tsx
│   │   │   │       ├── QuranReferenceBlock.tsx
│   │   │   │       ├── ActivityBlock.tsx
│   │   │   │       ├── EquationBlock.tsx
│   │   │   │       └── NumericalBlock.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useTopic.ts
│   │   │   │   ├── useTopicContent.ts
│   │   │   │   ├── useTopicAssets.ts
│   │   │   │   ├── useTopicAssessments.ts
│   │   │   │   ├── useTopicPage.ts
│   │   │   │   ├── useTopicViews.ts
│   │   │   │   └── useTableOfContents.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── SearchInput.tsx
│   │   │   │   ├── SearchSuggestions.tsx
│   │   │   │   ├── ClearButton.tsx
│   │   │   │   ├── FilterPanel.tsx
│   │   │   │   ├── ActiveFilters.tsx
│   │   │   │   ├── FilterGroup.tsx
│   │   │   │   ├── SearchResultCard.tsx
│   │   │   │   ├── ResultSnippet.tsx
│   │   │   │   ├── ResultBadges.tsx
│   │   │   │   ├── FormulaCard.tsx
│   │   │   │   ├── CopyButton.tsx
│   │   │   │   ├── TrendingSearches.tsx
│   │   │   │   └── FailedSearchMessage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSearch.ts
│   │   │   │   ├── useSearchSuggestions.ts
│   │   │   │   ├── useFormulaSearch.ts
│   │   │   │   ├── useTrendingSearches.ts
│   │   │   │   ├── useSearchFilters.ts
│   │   │   │   ├── useSearchURL.ts
│   │   │   │   └── useDebouncedValue.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── quran/
│   │   │   ├── components/
│   │   │   │   ├── SurahSelector.tsx
│   │   │   │   ├── AyahNavigator.tsx
│   │   │   │   ├── TranslationToggle.tsx
│   │   │   │   ├── QuranText.tsx
│   │   │   │   ├── TranslationPanel.tsx
│   │   │   │   ├── JuzMarker.tsx
│   │   │   │   ├── HizbMarker.tsx
│   │   │   │   ├── RukuMarker.tsx
│   │   │   │   ├── AyahCard.tsx
│   │   │   │   └── SurahInfo.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSurah.ts
│   │   │   │   ├── useAyah.ts
│   │   │   │   ├── useQuranRange.ts
│   │   │   │   ├── useTranslationPreference.ts
│   │   │   │   └── useQuranNavigation.ts
│   │   │   ├── store/
│   │   │   │   └── translationStore.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── exports/
│   │   │   ├── components/
│   │   │   │   ├── ExportButton.tsx
│   │   │   │   ├── ExportModal.tsx
│   │   │   │   ├── FormatSelector.tsx
│   │   │   │   ├── PolicyNotice.tsx
│   │   │   │   ├── ExportProgress.tsx
│   │   │   │   ├── ExportStatus.tsx
│   │   │   │   ├── DownloadManager.tsx
│   │   │   │   ├── StalenessWarning.tsx
│   │   │   │   └── PolicyEnforcer.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCreateExport.ts
│   │   │   │   ├── useExportStatus.ts
│   │   │   │   ├── useExportPolicies.ts
│   │   │   │   ├── useExportStaleness.ts
│   │   │   │   └── useDownloadTracker.ts
│   │   │   ├── store/
│   │   │   │   └── exportStore.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── components/
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── PopularTopicsList.tsx
│   │   │   │   ├── FailedSearchesList.tsx
│   │   │   │   ├── SearchAnalyticsChart.tsx
│   │   │   │   ├── TopicAnalyticsTable.tsx
│   │   │   │   ├── DateRangePicker.tsx
│   │   │   │   └── ExportAnalyticsButton.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── usePlatformStats.ts
│   │   │   │   ├── usePopularTopics.ts
│   │   │   │   ├── useFailedSearches.ts
│   │   │   │   ├── useSearchAnalytics.ts
│   │   │   │   ├── useTopicAnalytics.ts
│   │   │   │   └── useRecentArrivals.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   ├── HealthIndicator.tsx
│   │   │   │   ├── RecentJobsTable.tsx
│   │   │   │   ├── JsonEditor.tsx
│   │   │   │   ├── IngestionForm.tsx
│   │   │   │   ├── JobStatusTracker.tsx
│   │   │   │   ├── ImportPreviewTable.tsx
│   │   │   │   ├── MultiStageProgress.tsx
│   │   │   │   ├── ImportErrorLog.tsx
│   │   │   │   ├── AuditLogTable.tsx
│   │   │   │   └── AdminActionButtons.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSubmitIngest.ts
│   │   │   │   ├── useIngestStatus.ts
│   │   │   │   ├── useCancelJob.ts
│   │   │   │   ├── useRetryJob.ts
│   │   │   │   ├── usePreviewImport.ts
│   │   │   │   ├── useStartImport.ts
│   │   │   │   ├── useImportStatus.ts
│   │   │   │   ├── useDownloadReport.ts
│   │   │   │   └── useAdminAuth.ts
│   │   │   ├── store/
│   │   │   │   └── authStore.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   ├── seo/
│   │   │   ├── components/
│   │   │   │   ├── MetaTags.tsx
│   │   │   │   ├── JsonLdScript.tsx
│   │   │   │   ├── OpenGraphTags.tsx
│   │   │   │   ├── TwitterCardTags.tsx
│   │   │   │   ├── BreadcrumbSchema.tsx
│   │   │   │   ├── FAQSchema.tsx
│   │   │   │   └── GeoMetadata.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useJSONLD.ts
│   │   │   │   ├── useAEOData.ts
│   │   │   │   ├── useAEOScore.ts
│   │   │   │   └── useMetadata.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   │
│   │   └── shared/
│   │       ├── hooks/
│   │       │   ├── useDebounce.ts
│   │       │   ├── useLocalStorage.ts
│   │       │   ├── useMediaQuery.ts
│   │       │   ├── useOnClickOutside.ts
│   │       │   └── useKeyboardShortcut.ts
│   │       ├── utils/
│   │       │   ├── formatters.ts
│   │       │   ├── validators.ts
│   │       │   └── constants.ts
│   │       └── types/
│   │           └── index.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   ├── documents.api.ts
│   │   │   ├── topics.api.ts
│   │   │   ├── search.api.ts
│   │   │   ├── exports.api.ts
│   │   │   ├── quran.api.ts
│   │   │   ├── analytics.api.ts
│   │   │   ├── admin.api.ts
│   │   │   ├── seo.api.ts
│   │   │   ├── error-handler.ts
│   │   │   └── retry.ts
│   │   ├── query-client.ts
│   │   ├── query-keys.ts
│   │   ├── block-registry.ts
│   │   ├── env.ts
│   │   └── auth.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── middleware.ts
│   │
│   └── types/
│       └── global.d.ts
│
├── public/
│   ├── favicon.ico
│   ├── icon.png
│   └── images/
│       └── placeholder.svg
│
├── docs/
│   ├── frontend-discovery/
│   │   ├── 01-project-overview.md
│   │   ├── 02-api-inventory.md
│   │   ├── 03-model-dictionary.md
│   │   ├── 04-form-dictionary.md
│   │   ├── 05-feature-inventory.md
│   │   ├── 06-screen-inventory.md
│   │   ├── 07-user-flows.md
│   │   ├── 08-navigation-map.md
│   │   ├── 09-component-inventory.md
│   │   ├── 10-page-data-requirements.md
│   │   ├── 11-seo-requirements.md
│   │   └── 12-missing-information.md
│   │
│   └── frontend-blueprint/
│       ├── 01-system-architecture.md
│       ├── 02-route-architecture.md
│       ├── 03-layout-architecture.md
│       ├── 04-feature-modules.md
│       ├── 05-component-architecture.md
│       ├── 06-state-architecture.md
│       ├── 07-api-layer.md
│       ├── 08-rendering-engine.md
│       ├── 09-search-architecture.md
│       ├── 10-admin-architecture.md
│       ├── 11-seo-architecture.md
│       ├── 12-build-order.md
│       ├── 13-folder-structure.md
│       ├── 14-implementation-phases.md
│       └── 15-coverage-matrix.md
│
└── .github/
    └── workflows/
        ├── ci.yml
        ├── preview-deploy.yml
        └── production-deploy.yml
```

---

## Key Directories

### `/src/app`
Next.js App Router pages and layouts. Each route group has its own layout.

### `/src/components`
Shared components used across multiple features. Organized by purpose (ui, navigation, feedback, display).

### `/src/features`
Feature modules containing domain-specific components, hooks, stores, and types. Each feature is self-contained.

### `/src/lib`
Core utilities including API clients, query configuration, and shared logic.

### `/src/styles`
Global CSS and Tailwind configuration.

### `/docs`
Documentation split into discovery (backend-derived) and blueprint (frontend architecture).

---

## File Naming Conventions

- **Components:** PascalCase (e.g., `DocumentCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useDocuments.ts`)
- **API clients:** kebab-case with `.api.ts` suffix (e.g., `documents.api.ts`)
- **Stores:** camelCase with `Store` suffix (e.g., `authStore.ts`)
- **Types:** `index.ts` barrel exports per feature
- **Pages:** `page.tsx` (Next.js convention)
- **Layouts:** `layout.tsx` (Next.js convention)
- **Loading:** `loading.tsx` (Next.js convention)

---

## Related Documents

- [12-build-order.md](./12-build-order.md) — Build sequence
- [14-implementation-phases.md](./14-implementation-phases.md) — Execution phases
