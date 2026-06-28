# Sijil — Frontend Blueprint: Component Architecture

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the complete component tree for Sijil, organized by domain, showing ownership, reuse strategy, and composition hierarchy.

---

## Component Categories

### Level 1: Primitive Components (shadcn/ui)
### Level 2: Base Components (shared)
### Level 3: Domain Components (feature-specific)
### Level 4: Composite Components (page-level)

---

## Primitive Components (Level 1)

These are copy-pasted from shadcn/ui with minimal customization.

```
components/ui/
├── button.tsx
├── input.tsx
├── select.tsx
├── checkbox.tsx
├── radio-group.tsx
├── dialog.tsx
├── dropdown-menu.tsx
├── popover.tsx
├── tooltip.tsx
├── accordion.tsx
├── tabs.tsx
├── badge.tsx
├── card.tsx
├── progress.tsx
├── skeleton.tsx
├── alert.tsx
├── table.tsx
├── pagination.tsx
└── toast.tsx
```

**Ownership:** Shared module  
**Reuse:** Universal across all domains  
**Customization:** Tailwind variants only

---

## Base Components (Level 2)

### Navigation Components

```
components/navigation/
├── Header.tsx                    # Global header
│   ├── Logo.tsx                  # Brand mark
│   ├── SearchBar.tsx             # Global search
│   ├── BrowseDropdown.tsx        # Navigation menu
│   └── AdminLink.tsx             # Conditional admin link
│
├── Footer.tsx                    # Global footer
│   ├── FooterLinks.tsx           # Link groups
│   └── SocialIcons.tsx           # Social media
│
├── Breadcrumb.tsx                # Hierarchical trail
│   └── BreadcrumbItem.tsx        # Individual item
│
├── Pagination.tsx                # Page navigation
│   ├── PageButton.tsx            # Individual page
│   └── Ellipsis.tsx              # Page range
│
├── MobileMenu.tsx                # Hamburger menu
└── BottomTabBar.tsx              # Mobile navigation
```

**Ownership:** Shared module  
**Reuse:** Used by PublicLayout, TopicLayout, SearchLayout, QuranLayout

---

### Feedback Components

```
components/feedback/
├── Spinner.tsx                   # Loading indicator
├── ProgressBar.tsx               # Progress display
├── MultiStageProgress.tsx        # Multi-stage progress
├── Alert.tsx                     # Status messages
├── Toast.tsx                     # Notifications
├── Modal.tsx                     # Dialog overlay
├── EmptyState.tsx                # No content placeholder
├── ErrorBoundary.tsx             # Error handling
└── Skeleton/
    ├── TextSkeleton.tsx          # Text placeholder
    ├── CardSkeleton.tsx          # Card placeholder
    └── TableSkeleton.tsx         # Table placeholder
```

**Ownership:** Shared module  
**Reuse:** Universal

---

### Data Display Components

```
components/display/
├── DataTable.tsx                 # Generic table
├── Badge.tsx                     # Status indicators
├── Tag.tsx                       # Clickable tags
├── Avatar.tsx                    # User images
├── CodeBlock.tsx                 # Syntax highlighting
├── LatexRenderer.tsx             # KaTeX integration
├── ImageWithFallback.tsx         # Image with fallback
└── ResponsiveImage.tsx           # Responsive images
```

**Ownership:** Shared module  
**Reuse:** Used across all content-displaying components

---

## Domain Components (Level 3)

### Documents Domain

```
features/documents/components/
├── DocumentCard.tsx              # Document summary
│   ├── DocumentMetadata.tsx      # Subject/grade badges
│   └── TopicCountBadge.tsx       # Topic count
│
├── DocumentFilters.tsx           # Filter sidebar
│   ├── SubjectFilter.tsx         # Subject checkboxes
│   ├── GradeFilter.tsx           # Grade checkboxes
│   └── TypeFilter.tsx            # Type radio
│
├── ChapterOutline.tsx            # Chapter hierarchy
│   └── ChapterNode.tsx           # Recursive chapter
│
├── TopicListGrouped.tsx          # Topics by chapter
└── DocumentStats.tsx             # Aggregated counts
```

**Composition Hierarchy:**
```
DocumentListPage
└── DocumentFilters
    └── DocumentCard (×N)
        ├── DocumentMetadata
        └── TopicCountBadge

DocumentDetailPage
├── DocumentStats
├── ChapterOutline
│   └── ChapterNode (recursive)
└── TopicListGrouped
```

---

### Topics Domain

```
features/topics/components/
├── BlockRenderer.tsx             # Polymorphic renderer
│   ├── HeadingBlock.tsx
│   ├── ParagraphBlock.tsx
│   ├── FormulaBlock.tsx
│   ├── FigureBlock.tsx
│   ├── TableBlock.tsx
│   ├── CalloutBlock.tsx
│   ├── MCQBlock.tsx
│   ├── ExampleBlock.tsx
│   ├── ListBlock.tsx
│   ├── DefinitionBlock.tsx
│   ├── LearningOutcomesBlock.tsx
│   ├── ComparisonViewBlock.tsx
│   ├── QuranVerseBlock.tsx
│   ├── QuranReferenceBlock.tsx
│   ├── ActivityBlock.tsx
│   ├── EquationBlock.tsx
│   └── NumericalBlock.tsx
│
├── TableOfContents.tsx           # Auto-generated TOC
│   └── TOCItem.tsx               # Individual item
│
├── NextPrevNavigation.tsx        # Sequential nav
│   └── NavButton.tsx             # Prev/Next button
│
├── TopicSidebar.tsx              # Actions sidebar
│   ├── ExportButton.tsx          # Export trigger
│   ├── ShareButton.tsx           # Social sharing
│   └── RelatedTopicsList.tsx     # Related topics
│
└── AssessmentPreview.tsx         # Assessment teaser
```

**Composition Hierarchy:**
```
TopicPage
├── Breadcrumb
├── TableOfContents
│   └── TOCItem (×N)
├── BlockRenderer
│   └── [Block Type Components]
│       ├── FormulaBlock
│       │   └── LatexRenderer
│       ├── FigureBlock
│       │   └── ResponsiveImage
│       └── MCQBlock
│           └── RadioGroup (ui)
├── TopicSidebar
│   ├── ExportButton
│   │   └── ExportModal
│   ├── ShareButton
│   └── RelatedTopicsList
│       └── TopicCard
└── NextPrevNavigation
    └── NavButton (×2)
```

---

### Search Domain

```
features/search/components/
├── SearchBar.tsx                 # Enhanced search
│   ├── SearchInput.tsx           # Input field
│   ├── SearchSuggestions.tsx     # Autocomplete
│   └── ClearButton.tsx           # Clear query
│
├── FilterPanel.tsx               # Faceted filters
│   ├── ActiveFilters.tsx         # Selected filters
│   └── FilterGroup.tsx           # Filter section
│
├── SearchResultCard.tsx          # Result display
│   ├── ResultSnippet.tsx         # Matched text
│   └── ResultBadges.tsx          # Metadata badges
│
├── FormulaCard.tsx               # Formula preview
│   └── CopyButton.tsx            # Copy LaTeX
│
├── TrendingSearches.tsx          # Popular searches
└── FailedSearchMessage.tsx       # No results
```

**Composition Hierarchy:**
```
SearchResultsPage
├── SearchBar
│   └── SearchSuggestions
├── FilterPanel
│   ├── ActiveFilters
│   └── FilterGroup (×N)
└── SearchResultCard (×N)
    ├── ResultSnippet
    └── ResultBadges
```

---

### Quran Domain

```
features/quran/components/
├── SurahSelector.tsx             # Surah dropdown
├── AyahNavigator.tsx             # Verse navigation
├── TranslationToggle.tsx         # Language toggle
├── QuranText.tsx                 # Arabic display
├── TranslationPanel.tsx          # Translation view
├── JuzMarker.tsx                 # Juz indicator
├── HizbMarker.tsx                # Hizb indicator
├── RukuMarker.tsx                # Ruku indicator
├── AyahCard.tsx                  # Single ayah
└── SurahInfo.tsx                 # Surah metadata
```

**Composition Hierarchy:**
```
SurahPage
├── SurahSelector
├── TranslationToggle
├── AyahNavigator
└── AyahCard (×N)
    ├── QuranText
    └── TranslationPanel
```

---

### Exports Domain

```
features/exports/components/
├── ExportButton.tsx              # Trigger export
├── ExportModal.tsx               # Format selection
│   ├── FormatSelector.tsx        # Available formats
│   └── PolicyNotice.tsx          # Policy info
│
├── ExportProgress.tsx            # Progress display
├── ExportStatus.tsx              # Status indicator
├── DownloadManager.tsx           # Download tracking
├── StalenessWarning.tsx          # Content changed
└── PolicyEnforcer.tsx            # Disable formats
```

**Composition Hierarchy:**
```
TopicSidebar
└── ExportButton
    └── ExportModal (on click)
        ├── FormatSelector
        └── PolicyEnforcer

ExportStatusPage
├── ExportProgress
├── ExportStatus
├── StalenessWarning
└── DownloadManager
```

---

### Admin Domain

```
features/admin/components/
├── AdminDashboard.tsx            # Admin overview
│   ├── StatCard.tsx              # Statistics
│   ├── RecentJobsTable.tsx       # Recent activity
│   └── HealthIndicator.tsx       # System health
│
├── JsonEditor.tsx                # Code editor
├── IngestionForm.tsx             # Submit JSON
├── JobStatusTracker.tsx          # Real-time status
├── ImportPreviewTable.tsx        # Files preview
├── MultiStageProgress.tsx        # 4-stage progress
├── ImportErrorLog.tsx            # Failed files
├── AuditLogTable.tsx             # Action history
└── AdminActionButtons.tsx        # Cancel/retry
```

**Composition Hierarchy:**
```
AdminDashboard
├── StatCard (×N)
├── RecentJobsTable
└── HealthIndicator

IngestionPage
├── JsonEditor
├── IngestionForm
└── JobStatusTracker

BatchImportPage
├── ImportPreviewTable
├── MultiStageProgress
├── ImportErrorLog
└── AdminActionButtons
```

---

## Composite Components (Level 4)

These are page-level compositions that combine multiple domain components.

```
components/pages/
├── HomePageComposition.tsx       # Homepage layout
├── DocumentListComposition.tsx   # Document list page
├── DocumentDetailComposition.tsx # Document detail
├── TopicPageComposition.tsx      # Topic page
├── SearchResultsComposition.tsx  # Search results
├── QuranBrowserComposition.tsx   # Quran browser
└── AdminDashboardComposition.tsx # Admin dashboard
```

---

## Reuse Strategy

### Horizontal Reuse (Across Domains)

| Component | Used By | Strategy |
|-----------|---------|----------|
| `SearchBar` | Header, SearchResults | Same component, different props |
| `TopicCard` | Documents, Search, Related | Consistent display |
| `Badge` | All domains | Primitive from ui/ |
| `LatexRenderer` | Topics, Search (formulas) | Single implementation |
| `ExportButton` | TopicPage, DocumentDetail | Context-aware |

### Vertical Reuse (Within Domain)

| Pattern | Example | Benefit |
|---------|---------|---------|
| Block Renderer | 17 block types | Polymorphic rendering |
| Filter Components | Subject, Grade, Type | Consistent API |
| Card Components | Document, Topic, Result | Reusable layout |
| Progress Indicators | Export, Import, Ingest | Unified feedback |

---

## Component Ownership Matrix

| Component | Owner Module | Consumers |
|-----------|--------------|-----------|
| `Header` | shared | public, topic, search, quran |
| `Breadcrumb` | shared | topic, document |
| `BlockRenderer` | topics | topic pages only |
| `SearchBar` | search | header, search page |
| `ExportButton` | exports | topics, documents |
| `JsonEditor` | admin | ingestion only |
| `SurahSelector` | quran | quran pages only |

---

## Composition Rules

1. **Primitives never import domain components**
2. **Domain components can import primitives and base**
3. **Composite components only import domain components**
4. **Pages import composite components or compose directly**
5. **Avoid circular dependencies via feature modules**

---

## Related Documents

- [03-layout-architecture.md](./03-layout-architecture.md) — Layout components
- [04-feature-modules.md](./04-feature-modules.md) — Feature organization
- [09-component-inventory.md](../frontend-discovery/09-component-inventory.md) — Component reference
- [13-folder-structure.md](./13-folder-structure.md) — File structure
