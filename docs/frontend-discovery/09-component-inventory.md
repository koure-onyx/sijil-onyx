# Sijil — Frontend Discovery: Component Inventory

**Generated:** 2026-06-27  
**Source Files:** Derived from schemas, models, and API responses

---

## Overview

This document lists all reusable frontend components implied by the backend data structures and APIs.

---

## Layout Components

### 1. MainLayout
**Purpose:** Root layout wrapper for all pages  
**Children:** Header, Footer, Page Content  
**Props:** `children`, `variant` (default, admin)

### 2. AdminLayout
**Purpose:** Layout for admin pages with sidebar navigation  
**Children:** AdminSidebar, Header, Content  
**Props:** `children`

### 3. Container
**Purpose:** Max-width content container  
**Props:** `size` (sm, md, lg, xl, full), `centered` (boolean)

### 4. Grid
**Purpose:** Responsive grid system  
**Props:** `columns` (number), `gap` (spacing value)

### 5. Stack
**Purpose:** Vertical/horizontal flex stack  
**Props:** `orientation` (vertical, horizontal), `gap`, `align`, `justify`

---

## Navigation Components

### 6. Header
**Purpose:** Global header with logo, search, navigation  
**APIs:** `/api/search/suggest` (autocomplete)  
**Props:** `user` (optional), `onSearch`

### 7. Footer
**Purpose:** Global footer with links  
**Props:** `links` (array)

### 8. Breadcrumb
**Purpose:** Hierarchical navigation trail  
**Data Source:** `seo.breadcrumb` array  
**Props:** `items` (array of {label, href})

### 9. Sidebar
**Purpose:** Topic page sidebar with TOC and related topics  
**Props:** `tocItems`, `relatedTopics`, `exportAction`

### 10. TabNavigation
**Purpose:** Tabbed navigation within pages  
**Props:** `tabs` (array), `activeTab`, `onChange`

### 11. Pagination
**Purpose:** Paginated list navigation  
**Props:** `currentPage`, `totalPages`, `totalItems`, `onPageChange`

### 12. MobileMenu
**Purpose:** Hamburger menu for mobile  
**Props:** `isOpen`, `onClose`, `navItems`

### 13. BottomTabBar
**Purpose:** Mobile bottom navigation  
**Props:** `activeTab`, `onTabChange`, `tabs`

---

## Content Display Components

### 14. BlockRenderer
**Purpose:** Polymorphic renderer for 17 content block types  
**Data Source:** `content_blocks` array from `/api/topics/:id/content`  
**Props:** `blocks` (array), `options` (showLatex, etc.)

**Block Types Supported:**
- HeadingBlock
- ParagraphBlock
- FormulaBlock
- FigureBlock
- TableBlock
- CalloutBlock
- MCQBlock
- ExampleBlock
- ListBlock
- DefinitionBlock
- LearningOutcomesBlock
- ComparisonViewBlock
- QuranVerseBlock
- QuranReferenceBlock
- ActivityBlock
- EquationBlock
- NumericalBlock

### 15. HeadingBlock
**Props:** `level` (1-6), `text`, `slugAnchor`

### 16. ParagraphBlock
**Props:** `html`, `containsFormula`, `keyTerms`

### 17. FormulaBlock
**Purpose:** Render LaTeX formula with variables  
**Dependencies:** MathJax or KaTeX  
**Props:** `formulaId`, `name`, `latex`, `text`, `variables`, `formulaType`

### 18. FigureBlock
**Purpose:** Display figure with multiple render strategies  
**Props:** `figureNumber`, `caption`, `alt`, `imageUrl`, `renderStrategy`, `svgCode`, `hasLabels`

### 19. TableBlock
**Purpose:** Render data table or chart  
**Props:** `tableNumber`, `caption`, `headers`, `rows`, `renderAs` (styled-table, chart, infographic)

### 20. CalloutBlock
**Purpose:** Highlight boxes (note, warning, tip, etc.)  
**Props:** `variant`, `title`, `text`, `icon`

### 21. MCQBlock
**Purpose:** Interactive multiple choice question  
**Props:** `mcqId`, `questionText`, `options`, `correctAnswer`, `explanation`, `difficulty`

### 22. ExampleBlock
**Props:** `exampleNumber`, `title`, `problemText`, `solutionSteps`, `finalAnswer`

### 23. ListBlock
**Props:** `listType` (ordered, unordered), `items`

### 24. DefinitionBlock
**Props:** `term`, `definitionText`

### 25. LearningOutcomesBlock
**Props:** `outcomes` (array)

### 26. ComparisonViewBlock
**Props:** `headers`, `rows`, `designHint`

### 27. QuranVerseBlock
**Props:** `surah`, `ayah`, `urduTranslation`, `wordAlignments`

### 28. QuranReferenceBlock
**Props:** `surah`, `ayahStart`, `ayahEnd`, `curriculumId`

### 29. ActivityBlock
**Props:** `title`, `activityType`, `apparatus`, `procedureSteps`, `precautions`

### 30. EquationBlock
**Props:** `latex`, `text`

### 31. NumericalBlock
**Props:** `problemText`, `given`, `required`, `solutionSteps`, `finalAnswer`

---

## Card Components

### 32. DocumentCard
**Purpose:** Display document summary in lists  
**Data Source:** `/api/documents` response  
**Props:** `document` (id, title, subject, grade, type, topicCount)

### 33. TopicCard
**Purpose:** Display topic preview  
**Props:** `topic` (id, title, slug, difficulty, formulaCount, mcqCount)

### 34. SearchResultCard
**Purpose:** Display search result with snippets  
**Data Source:** `/api/search` response  
**Props:** `result` (title, snippet, badges, url)

### 35. FormulaCard
**Purpose:** Display formula with LaTeX preview  
**Data Source:** `/api/search/formulas` response  
**Props:** `formula` (name, latex, variables, sourceTopic)
**Actions:** Copy LaTeX, Navigate to source

### 36. SubjectCard
**Purpose:** Display subject area  
**Props:** `subject` (name, documentCount, icon)

### 37. StatCard
**Purpose:** Display statistics on dashboard  
**Props:** `label`, `value`, `trend`, `icon`

### 38. RecentArrivalCard
**Props:** `topic` (title, addedDate, subject, grade)

---

## Form Components

### 39. SearchBar
**Purpose:** Global search input with autocomplete  
**APIs:** `/api/search/suggest`  
**Props:** `placeholder`, `onSearch`, `debounceMs`, `showSuggestions`

### 40. FilterPanel
**Purpose:** Faceted search filters  
**Props:** `filters` (subject, grade, difficulty, type), `onFilterChange`, `values`

### 41. JsonEditor
**Purpose:** Code editor for JSON ingestion  
**Dependencies:** Monaco Editor or CodeMirror  
**Props:** `value`, `onChange`, `readOnly`, `schema`

### 42. Select
**Purpose:** Dropdown selection  
**Props:** `options`, `value`, `onChange`, `placeholder`, `multiple`

### 43. Input
**Purpose:** Text input field  
**Props:** `type`, `value`, `onChange`, `placeholder`, `error`

### 44. TextArea
**Props:** `value`, `onChange`, `rows`, `placeholder`

### 45. Checkbox
**Props:** `checked`, `onChange`, `label`

### 46. RadioGroup
**Props:** `options`, `value`, `onChange`

### 47. DatePicker
**Props:** `value`, `onChange`, `range`

### 48. FileUpload
**Props:** `accept`, `onUpload`, `multiple`

---

## Feedback Components

### 49. Spinner
**Purpose:** Loading indicator  
**Props:** `size`, `color`

### 50. ProgressBar
**Purpose:** Progress indication  
**Props:** `value`, `max`, `label`, `showStripes`

### 51. MultiStageProgress
**Purpose:** Multi-stage progress dashboard (import)  
**Stages:** SCANNING, VALIDATING, IMPORTING, INDEXING  
**Props:** `stages` (array of {name, status, progress})

### 52. Alert
**Purpose:** Status messages  
**Props:** `variant` (info, success, warning, error), `title`, `message`, `dismissible`

### 53. Toast
**Purpose:** Temporary notifications  
**Props:** `message`, `variant`, `duration`, `onDismiss`

### 54. Modal
**Purpose:** Overlay dialog  
**Props:** `isOpen`, `onClose`, `title`, `children`, `size`

### 55. EmptyState
**Purpose:** No results/content placeholder  
**Props:** `icon`, `title`, `message`, `action`

### 56. ErrorBoundary
**Purpose:** Catch and display errors  
**Props:** `fallback`, `onError`

---

## Interactive Components

### 57. ExportButton
**Purpose:** Trigger export job  
**APIs:** `POST /api/exports`, `GET /api/exports/:id`  
**Props:** `topicId`, `availableFormats`, `onComplete`

### 58. ExportModal
**Purpose:** Export format selection and progress  
**Props:** `isOpen`, `topicId`, `onClose`

### 59. ShareButton
**Purpose:** Social sharing  
**Props:** `url`, `title`, `platforms`

### 60. CopyButton
**Purpose:** Copy to clipboard  
**Props:** `text`, `onCopy`, `tooltip`

### 61. LikeButton
**Props:** `liked`, `count`, `onToggle`

### 62. Accordion
**Purpose:** Expandable sections  
**Props:** `items` (array of {title, content}), `allowMultiple`

### 63. Tabs
**Props:** `tabs`, `activeTab`, `onChange`, `children`

### 64. Tooltip
**Props:** `content`, `position`, `children`

### 65. Popover
**Props:** `content`, `trigger`, `children`

### 66. Dropdown
**Props:** `trigger`, `menuItems`, `onSelect`

### 67. Drawer
**Props:** `isOpen`, `onClose`, `side`, `children`, `size`

---

## Data Display Components

### 68. DataTable
**Purpose:** Tabular data display  
**Props:** `columns`, `data`, `sortable`, `pagination`

### 69. Badge
**Purpose:** Status/category indicator  
**Props:** `variant`, `children`, `size`

### 70. Tag
**Purpose:** Clickable tag/chip  
**Props:** `label`, `onClick`, `removable`

### 71. Avatar
**Props:** `src`, `alt`, `size`, `fallback`

### 72. Skeleton
**Purpose:** Loading placeholder  
**Props:** `variant` (text, circle, rect), `width`, `height`

### 73. CodeBlock
**Purpose:** Syntax-highlighted code  
**Props:** `code`, `language`, `showLineNumbers`

### 74. MarkdownRenderer
**Purpose:** Render markdown content  
**Props:** `markdown`, `components` (custom overrides)

### 75. LatexRenderer
**Purpose:** Render LaTeX math  
**Dependencies:** MathJax or KaTeX  
**Props:** `latex`, `displayMode`

### 76. ImageWithFallback
**Props:** `src`, `alt`, `fallbackSrc`, `loading`

### 77. ResponsiveImage
**Props:** `src`, `alt`, `sizes`, `srcSet`

---

## Admin-Specific Components

### 78. AdminDashboard
**Purpose:** Admin overview dashboard  
**APIs:** `/api/utility/platform-stats`, recent jobs  
**Props:** `stats`, `recentImports`, `recentIngists`

### 79. IngestionForm
**Purpose:** JSON submission form  
**APIs:** `POST /api/ingest/json`  
**Props:** `onSubmit`, `onValidate`

### 80. JobStatusTracker
**Purpose:** Track job progress  
**APIs:** Polling on status endpoint  
**Props:** `trackingId`, `type` (ingest, import, export)

### 81. ImportPreviewTable
**Purpose:** Show files to be imported  
**Props:** `files`, `documentsFound`, `topicsFound`

### 82. ImportErrorLog
**Props:** `errors` (array of {file, error, line})

### 83. AnalyticsChart
**Purpose:** Display analytics data  
**APIs:** `/api/utility/analytics/*`  
**Props:** `data`, `type` (line, bar, pie), `timeRange`

### 84. VersionDiffViewer
**Purpose:** Show differences between versions  
**Props:** `versionA`, `versionB`, `diff`

### 85. AuditLogTable
**Props:** `logs` (array of audit entries)

---

## SEO Components

### 86. MetaTags
**Purpose:** Inject meta tags for SEO  
**Data Source:** `seo.meta_title`, `seo.meta_description`  
**Props:** `title`, `description`, `keywords`, `canonical`

### 87. JsonLdScript
**Purpose:** Inject JSON-LD structured data  
**APIs:** `/api/seo/topic/:id/jsonld`  
**Props:** `data` (JSON-LD object)

### 88. OpenGraphTags
**Props:** `title`, `description`, `image`, `url`, `type`

### 89. TwitterCardTags
**Props:** `card`, `title`, `description`, `image`

---

## Utility Components

### 90. ConditionalWrapper
**Purpose:** Conditionally wrap children  
**Props:** `condition`, `wrapper`, `children`

### 91. DeferRender
**Purpose:** Lazy render after mount  
**Props:** `children`, `delay`

### 92. Portal
**Purpose:** Render outside DOM hierarchy  
**Props:** `children`, `container`

### 93. ResizeObserver
**Purpose:** Detect element resize  
**Props:** `onResize`, `children`

### 94. IntersectionObserver
**Purpose:** Detect visibility  
**Props:** `onIntersect`, `threshold`, `children`

### 95. ErrorHandler
**Purpose:** Centralized error handling  
**Props:** `onError`, `children`

---

## Summary by Category

| Category | Component Count |
|----------|-----------------|
| Layout | 5 |
| Navigation | 8 |
| Content Display | 18 |
| Cards | 7 |
| Forms | 10 |
| Feedback | 8 |
| Interactive | 11 |
| Data Display | 9 |
| Admin | 8 |
| SEO | 4 |
| Utility | 6 |
| **Total** | **94** |

---

## Related Documents

- [03-model-dictionary.md](./03-model-dictionary.md) — Data structures
- [04-form-dictionary.md](./04-form-dictionary.md) — Validation schemas
- [06-screen-inventory.md](./06-screen-inventory.md) — Screens using components
