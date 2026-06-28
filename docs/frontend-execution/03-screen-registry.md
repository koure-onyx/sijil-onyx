# 03-Screen-Registry.md

**Source:** docs/frontend-discovery/06-screen-inventory.md, docs/frontend-discovery/10-page-data-requirements.md  
**Generated:** Frontend Execution Knowledge Base

---

## Public Screens (10 Total)

### 1. Homepage
| Property | Value |
|----------|-------|
| **Route** | `/` |
| **Purpose** | Landing page with platform overview, stats, and navigation entry points |
| **Layout** | MainLayout (default variant) |
| **Complexity** | Medium |

**APIs Used:**
- `GET /api/utility/platform-stats` — Display totals
- `GET /api/utility/recent-arrivals` — Show new content
- `GET /api/utility/popular-topics` — Trending topics widget
- `GET /api/subjects` — Subject browsing

**Data Needed:**
- Platform statistics (documents, topics, formulas count)
- Recent arrivals list (last 10)
- Popular topics (top 10)
- Subject list

**SEO:**
- Meta title: "SIJIL - Document Intelligence & Headless Publishing Engine"
- Meta description: Platform overview
- JSON-LD: Organization schema

**Components:**
- Hero section with stats
- Search bar (from Header)
- Recent arrivals carousel
- Popular topics grid
- Subject cards

**Loading State:**
- Skeleton cards for stats
- Skeleton carousel for recent arrivals
- Skeleton grid for popular topics

**Empty State:**
- "No content available yet" message
- Admin contact link

**Error State:**
- Retry button
- Partial content display (degraded mode)

---

### 2. Document List Page
| Property | Value |
|----------|-------|
| **Route** | `/documents` |
| **Purpose** | Browse and filter documents by subject, grade, type |
| **Layout** | MainLayout |
| **Complexity** | Medium |

**APIs Used:**
- `GET /api/documents` — Main list with filters
- `GET /api/subjects` — Filter dropdown
- `GET /api/grades` — Filter dropdown

**Query Params:**
- `subject`, `grade`, `type`, `status`, `sort`, `page`, `limit`

**SEO:**
- Meta title: "Browse Documents - SIJIL"
- Meta description: Explore educational documents by subject and grade
- Canonical URL: `/documents`

**Components:**
- DocumentFilters component
- DocumentCard list
- Pagination controls
- Sort dropdown
- Search within results

**Loading State:**
- Document card skeletons
- Filter dropdown skeletons

**Empty State:**
- "No documents found" message
- Clear filters button
- Suggested searches

**Error State:**
- Error alert with retry
- Fallback to cached data

---

### 3. Document Detail Page
| Property | Value |
|----------|-------|
| **Route** | `/documents/:documentId` |
| **Purpose** | View document metadata, chapter structure, and topic list |
| **Layout** | MainLayout |
| **Complexity** | Medium |

**APIs Used:**
- `GET /api/documents/:documentId` — Document details
- `GET /api/documents/:documentId/topics` — Topic list
- `GET /api/documents/:id/aggregates` — Counts

**Data Needed:**
- Document metadata (title, subject, grade, authors, etc.)
- Container/chapter info
- Topic references with slugs
- Aggregated counts

**SEO:**
- Dynamic meta title from document title
- JSON-LD: LearningResource schema
- Breadcrumb schema

**Components:**
- Document header (title, metadata badges)
- ChapterOutline component
- TopicListGrouped component
- DocumentStats sidebar
- ExportButton

**Loading State:**
- Header skeleton
- Chapter outline skeleton
- Stats skeleton

**Empty State:**
- N/A (document should exist if route matched)

**Error State:**
- 404 page with redirect suggestion
- Related documents list

---

### 4. Topic Page
| Property | Value |
|----------|-------|
| **Route** | `/topics/slug/[...slug]` or `/topics/:topicId` |
| **Purpose** | Main content consumption screen displaying topic content |
| **Layout** | TopicLayout (with sidebar) |
| **Complexity** | High |

**APIs Used:**
- `GET /api/topics/slug/*slug` OR `GET /api/topics/:topicId` — Metadata
- `GET /api/topics/:topicId/content` — Content blocks
- `GET /api/topics/:topicId/assets` — Figures/tables
- `GET /api/seo/topic/:topicId/jsonld` — Structured data
- (Optional) `GET /api/topics/:topicId/page` — Combined data

**Data Needed:**
- Topic metadata (title, seo, breadcrumbs)
- Content blocks array (polymorphic, 17 types)
- Figures and tables
- Assessment counts
- JSON-LD for SEO

**SEO:**
- Dynamic meta title from topic title
- JSON-LD: LearningResource, FAQPage (if FAQs exist)
- Breadcrumb schema
- OpenGraph tags
- Twitter Card tags

**Components:**
- Breadcrumb navigation
- Topic header (title, difficulty badge)
- BlockRenderer (17 block types)
- Figure gallery
- TableOfContents
- NextPrevNavigation
- ExportDropdown
- Sidebar (TOC, related topics)
- AssessmentPreview

**Loading State:**
- Topic header skeleton
- Content block skeletons (text, formula placeholders)
- Sidebar skeleton

**Empty State:**
- "Topic has no content" message
- Navigate to parent document

**Error State:**
- 404 with slug resolution attempt
- Related topics suggestions

---

### 5. Search Results Page
| Property | Value |
|----------|-------|
| **Route** | `/search` |
| **Purpose** | Display search results with filters and facets |
| **Layout** | MainLayout |
| **Complexity** | Medium |

**APIs Used:**
- `GET /api/search` — Main search
- `GET /api/search/suggest` — Autocomplete (header)
- `GET /api/subjects` — Filter options
- `GET /api/grades` — Filter options

**Query Params:**
- `q` (required), `subject`, `grade`, `difficulty`, `topicType`, `limit`, `page`

**SEO:**
- Meta title: "Search Results for '{query}' - SIJIL"
- Noindex for search result pages (dynamic content)
- Canonical with query params

**Components:**
- SearchBar with autocomplete
- FilterPanel (sidebar)
- SearchResultCard list
- ResultBadges
- Pagination
- NoResultsState with suggestions
- TrendingSearches widget

**Loading State:**
- Search result card skeletons
- Filter panel skeleton

**Empty State:**
- "No results found for '{query}'"
- Spelling suggestions
- Browse subjects link

**Error State:**
- Search unavailable message
- Fallback to basic filter

---

### 6. Formula Search Results Page
| Property | Value |
|----------|-------|
| **Route** | `/search/formulas` |
| **Purpose** | Specialized search for mathematical formulas |
| **Layout** | MainLayout |
| **Complexity** | Low |

**APIs Used:**
- `GET /api/search/formulas` — Formula search

**Query Params:**
- `q` (required), `subject`, `grade`, `limit`

**SEO:**
- Meta title: "Formula Search - SIJIL"
- Noindex for dynamic results

**Components:**
- FormulaCard (LaTeX render, name, variables)
- SourceTopicLink
- CopyButton (LaTeX)
- ExportButton (formula pack)

**Loading State:**
- Formula card skeletons with KaTeX placeholder

**Empty State:**
- "No formulas found"
- Browse by subject link

**Error State:**
- LaTeX rendering error fallback
- Plain text alternative

---

### 7. Export Status Page
| Property | Value |
|----------|-------|
| **Route** | `/exports/:exportJobId` |
| **Purpose** | Track export job progress and download completed exports |
| **Layout** | MainLayout (minimal) |
| **Complexity** | Low |

**APIs Used:**
- `GET /api/exports/:exportJobId` — Job status
- `GET /api/export/:exportJobId/stale` — Staleness check

**Data Needed:**
- Job status (pending, processing, complete, error)
- Download URL when complete
- Error messages if failed

**SEO:**
- Noindex (utility page)
- No follow

**Components:**
- ProgressIndicator
- StatusMessage
- DownloadButton (when ready)
- ErrorDisplay (if failed)
- RetryButton
- StalenessWarning

**Loading State:**
- Status polling indicator

**Empty State:**
- N/A (job should exist)

**Error State:**
- "Export job not found"
- Create new export link

---

### 8. Quran Browser Page
| Property | Value |
|----------|-------|
| **Route** | `/quran/[surahNumber]` |
| **Purpose** | Browse Quran by surah and ayah |
| **Layout** | QuranLayout (specialized) |
| **Complexity** | Medium |

**APIs Used:**
- `GET /api/quran/surah/:surahNumber` — Surah list
- `GET /api/quran/ayah/:surah/:ayah` — Single ayah
- `GET /api/quran/range/:surah/:start/:end` — Ayah range

**Data Needed:**
- Surah metadata (name, revelation type, ayah count)
- Ayah text (Urdu/English translations)
- Navigation structure (juz, hizb, ruku)

**SEO:**
- Meta title: "Surah {Name} - Quran - SIJIL"
- JSON-LD: ReligiousText schema
- Language alternates (ur, en)

**Components:**
- SurahSelector dropdown
- AyahNavigator
- TranslationToggle
- QuranText (Arabic with external font)
- TranslationPanel (Urdu/English)
- JuzMarker, HizbMarker, RukuMarker

**Loading State:**
- Ayah card skeletons
- Arabic text loading state

**Empty State:**
- N/A (Quran is complete)

**Error State:**
- "Surah not found"
- Surah list fallback

---

### 9. Subject Browse Page
| Property | Value |
|----------|-------|
| **Route** | `/subjects/[subject]/grade/[grade]` |
| **Purpose** | Explore content by subject area |
| **Layout** | MainLayout |
| **Complexity** | Low |

**APIs Used:**
- `GET /api/subjects` — All subjects
- `GET /api/subjects/:subject/grades` — Grades for subject
- `GET /api/documents?subject=` — Documents in subject

**Data Needed:**
- Subject list
- Grade levels per subject
- Document count per subject/grade

**SEO:**
- Meta title: "{Subject} - SIJIL"
- Breadcrumb schema

**Components:**
- SubjectGrid/cards
- GradeLevelSelector
- DocumentPreview
- Cascading filters

**Loading State:**
- Subject card skeletons

**Empty State:**
- "No subjects available"

**Error State:**
- Subject not found
- Return to homepage

---

### 10. 404 Page with Redirect Resolution
| Property | Value |
|----------|-------|
| **Route** | `*` (catch-all) |
| **Purpose** | Handle missing pages and resolve slug redirects |
| **Layout** | MainLayout (minimal) |
| **Complexity** | Low |

**APIs Used:**
- `GET /api/utility/slug/resolve?slug=` — Check for redirect

**Data Needed:**
- Original requested slug
- Resolved URL (if redirect exists)

**SEO:**
- 404 status code
- Noindex

**Components:**
- "Page not found" message
- Redirect notice
- SearchBar
- HomeLink

**Loading State:**
- Slug resolution spinner

**Empty State:**
- Standard 404 message

**Error State:**
- N/A (already in error state)

---

## Admin Screens (6 Total)

### 11. Admin Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/admin` |
| **Purpose** | Admin overview with system stats and quick actions |
| **Layout** | AdminLayout |
| **Complexity** | Medium |
| **Auth Required:** Yes |

**APIs Used:**
- `GET /api/utility/platform-stats` — System stats
- `GET /api/admin/import/` — Recent imports
- `GET /api/ingest/` — Recent ingests

**Data Needed:**
- Platform statistics
- Recent import jobs
- Recent ingest jobs
- System health status

**SEO:**
- Noindex (admin area)
- No follow

**Components:**
- StatsCard grid
- RecentJobsTable
- QuickActionButton group
- HealthIndicator
- AdminSidebar
- AdminHeader

**Loading State:**
- Stats card skeletons
- Table skeleton

**Empty State:**
- "No recent activity" message

**Error State:**
- Health check failure alert
- Retry mechanism

---

### 12. JSON Ingestion Page
| Property | Value |
|----------|-------|
| **Route** | `/admin/ingest` |
| **Purpose** | Submit JSON documents for AI processing |
| **Layout** | AdminLayout |
| **Complexity** | High |
| **Auth Required:** Yes |

**APIs Used:**
- `POST /api/ingest/json` — Submit
- `GET /api/ingest/:trackingId` — Check status

**Data Needed:**
- JSON editor content
- Validation errors (if any)
- Job tracking ID

**SEO:**
- Noindex

**Components:**
- JsonEditor (syntax highlighting)
- SchemaValidator
- SubmitButton
- StatusTracker
- ErrorDisplay
- JobHistoryTable

**Loading State:**
- Editor loading state
- Validation spinner

**Empty State:**
- Empty JSON editor with template button

**Error State:**
- Validation error display
- Submit failure message

---

### 13. Batch Import Page
| Property | Value |
|----------|-------|
| **Route** | `/admin/import` |
| **Purpose** | Import multiple documents from GitHub repository |
| **Layout** | AdminLayout |
| **Complexity** | High |
| **Auth Required:** Yes |

**APIs Used:**
- `POST /api/admin/import/preview` — Preview
- `POST /api/admin/import/start` — Start import
- `GET /api/admin/import/:batchId` — Status

**Data Needed:**
- GitHub repo URL
- Preview results (documents/topics found)
- Import progress by stage

**SEO:**
- Noindex

**Components:**
- RepoURLInput
- PreviewResultsTable
- MultiStageProgress bars
- ActionButtons (start, cancel, retry)
- ErrorLogDisplay
- ReportDownloadButton

**Loading State:**
- Preview loading skeleton
- Progress bar placeholders

**Empty State:**
- Empty repo URL form

**Error State:**
- GitHub access error
- Validation failures

---

### 14. Import Status Page
| Property | Value |
|----------|-------|
| **Route** | `/admin/import/:batchId` |
| **Purpose** | Detailed view of batch import progress |
| **Layout** | AdminLayout |
| **Complexity** | Medium |
| **Auth Required:** Yes |

**APIs Used:**
- `GET /api/admin/import/:batchId` — Full status

**Data Needed:**
- Batch metadata
- Progress per stage (scanning, validating, importing, indexing)
- Success/failure counts
- Failed files list with errors

**SEO:**
- Noindex

**Components:**
- ProgressDashboard (4 stages)
- CountsSummary
- FailedFilesTable
- ErrorDetailsAccordion
- ActionButtons

**Loading State:**
- Progress polling indicator

**Empty State:**
- "Import not found"

**Error State:**
- Import failure summary

---

### 15. Analytics Dashboard
| Property | Value |
|----------|-------|
| **Route** | `/admin/analytics` |
| **Purpose** | View search and topic analytics |
| **Layout** | AdminLayout |
| **Complexity** | Medium |
| **Auth Required:** Yes |

**APIs Used:**
- `GET /api/utility/analytics/search` — Search analytics
- `GET /api/utility/analytics/topics` — Topic analytics
- `GET /api/utility/failed-searches` — Failed searches
- `GET /api/utility/popular-topics` — Popular topics

**Data Needed:**
- Search query stats
- Popular topics list
- Failed search queries
- View counts

**SEO:**
- Noindex

**Components:**
- SearchAnalyticsChart
- PopularTopicsTable
- FailedSearchesList
- DateRangePicker
- ExportAnalyticsButton

**Loading State:**
- Chart skeleton
- Table skeletons

**Empty State:**
- "No analytics data available"

**Error State:**
- Analytics service unavailable

---

### 16. Version History Page (Admin)
| Property | Value |
|----------|-------|
| **Route** | `/admin/versions/:entityType/:entityId` |
| **Purpose** | View and manage document/topic versions |
| **Layout** | AdminLayout |
| **Complexity** | Medium |
| **Auth Required:** Yes |

**APIs Used:**
- Integrated in document/topic APIs with version params

**Data Needed:**
- Version history list
- Version diffs
- Archive status

**SEO:**
- Noindex

**Components:**
- VersionTimeline
- DiffViewer
- RestoreButton
- ArchiveToggle

**Loading State:**
- Timeline skeleton

**Empty State:**
- "No version history"

**Error State:**
- Version load failure

---

## Summary Matrix

| # | Screen | Route | Public | API Count | Complexity | Layout |
|---|--------|-------|--------|-----------|------------|--------|
| 1 | Homepage | `/` | ✅ | 4 | Medium | MainLayout |
| 2 | Document List | `/documents` | ✅ | 3 | Medium | MainLayout |
| 3 | Document Detail | `/documents/:id` | ✅ | 3 | Medium | MainLayout |
| 4 | Topic Page | `/topics/slug/[...slug]` | ✅ | 4 | High | TopicLayout |
| 5 | Search Results | `/search` | ✅ | 3 | Medium | MainLayout |
| 6 | Formula Search | `/search/formulas` | ✅ | 1 | Low | MainLayout |
| 7 | Export Status | `/exports/:id` | ✅ | 2 | Low | MainLayout |
| 8 | Quran Browser | `/quran/:surah` | ✅ | 3 | Medium | QuranLayout |
| 9 | Subject Browse | `/subjects/:subject/grade/:grade` | ✅ | 3 | Low | MainLayout |
| 10 | 404 Page | `*` | ✅ | 1 | Low | MainLayout |
| 11 | Admin Dashboard | `/admin` | 🔒 | 3 | Medium | AdminLayout |
| 12 | JSON Ingestion | `/admin/ingest` | 🔒 | 2 | High | AdminLayout |
| 13 | Batch Import | `/admin/import` | 🔒 | 3 | High | AdminLayout |
| 14 | Import Status | `/admin/import/:id` | 🔒 | 1 | Medium | AdminLayout |
| 15 | Analytics | `/admin/analytics` | 🔒 | 4 | Medium | AdminLayout |
| 16 | Version History | `/admin/versions/:type/:id` | 🔒 | (integrated) | Medium | AdminLayout |

**Total:** 16 screens (10 public + 6 admin)

---

## Layout Assignments

| Layout | Screens Using It |
|--------|------------------|
| MainLayout | Homepage, Document List, Document Detail, Search, Formula Search, Export Status, Subject Browse, 404 |
| TopicLayout | Topic Page |
| QuranLayout | Quran Browser |
| AdminLayout | All admin screens (6) |

---

**This registry is complete. All 16 screens documented.**
