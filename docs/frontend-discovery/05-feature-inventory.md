# Sijil — Frontend Discovery: Feature Inventory

**Generated:** 2026-06-27  
**Source Files:** `src/controllers/`, `src/services/`, `src/routes/`

---

## Overview

This document catalogs all features implemented in the Sijil backend from a frontend perspective. Each feature includes the files involved, endpoints, and frontend implications.

---

## Feature 1: Document Browsing & Listing

### Description
Allows users to browse, filter, and view educational documents (textbooks, courses, SOPs, etc.) with pagination and faceted search.

### Files Involved
- `src/routes/document.routes.js`
- `src/controllers/document.controller.js`
- `src/services/document.service.js`
- `src/models/document.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/documents` | List with filters |
| GET | `/api/documents/:documentId` | Get single document |
| GET | `/api/documents/:documentId/topics` | Get topics in document |
| GET | `/api/documents/:id/aggregates` | Get counts |
| GET | `/api/subjects` | List subjects |
| GET | `/api/grades` | List grades |
| GET | `/api/subjects/:subject/grades` | Get grades for subject |

### Frontend Implications
- **Document List Page:** Needs pagination UI, filter sidebar (subject, grade, type)
- **Document Detail Page:** Shows metadata, chapter structure, topic list
- **Aggregates Display:** Show counts (topics, formulas, MCQs) as badges
- **Navigation:** Subject/grade drill-down for curriculum browsing

---

## Feature 2: Topic Content Viewing

### Description
Core content consumption feature. Displays topic content including text, formulas, figures, tables, MCQs, and interactive elements.

### Files Involved
- `src/routes/topic.routes.js`
- `src/controllers/topic.controller.js`
- `src/services/topic.service.js`
- `src/models/topic*.model.js` (4 collections)
- `src/middleware/analyticsTracker.middleware.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/topics/:topicId` | Get topic metadata |
| GET | `/api/topics/slug/*slug` | Get by global slug |
| GET | `/api/topics/:topicId/content` | Get content blocks |
| GET | `/api/topics/:topicId/assets` | Get figures/tables |
| GET | `/api/topics/:topicId/assessments` | Get MCQs/questions |
| GET | `/api/topics/:topicId/page` | Get full page data |

### Frontend Implications
- **Topic Page:** Main content rendering component
- **Block Renderer:** Polymorphic renderer for 17 block types
- **LaTeX Support:** MathJax/KaTeX integration required
- **Image Handling:** Multiple render strategies (image, SVG, animation)
- **Analytics:** Automatic view tracking on page load
- **SEO:** Meta tags from `seo` object, JSON-LD from separate endpoint
- **Navigation:** Breadcrumb from `slug_global`, next/prev topic links

---

## Feature 3: Search & Discovery

### Description
Full-text search across topics and formulas with autocomplete suggestions and trending queries.

### Files Involved
- `src/routes/search.routes.js`
- `src/controllers/search.controller.js`
- `src/services/search.service.js`
- `src/models/popularSearch.model.js`
- `src/models/failedSearch.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/search` | Search topics |
| GET | `/api/search/formulas` | Search formulas |
| GET | `/api/search/suggest` | Autocomplete |
| GET | `/api/search/trending` | Trending searches |

### Frontend Implications
- **Search Bar:** Global header component with debounce
- **Search Results Page:** Faceted results with filters (subject, grade, difficulty)
- **Autocomplete Dropdown:** Suggestions as user types
- **Trending Widget:** "Popular searches" sidebar or homepage section
- **No Results State:** Show suggestions or related topics
- **Formula Search:** Specialized results with LaTeX preview

---

## Feature 4: Export System

### Description
Allows users to generate downloadable packs (formulas, MCQs, revision notes) in various formats.

### Files Involved
- `src/routes/export.routes.js`
- `src/controllers/export.controller.js`
- `src/services/export.service.js`
- `src/models/exportJob.model.js`
- `src/models/exportPolicy.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/exports` | Create export job |
| GET | `/api/exports/:exportJobId` | Check status |
| GET | `/api/policies` | Get policies |
| GET | `/api/policies/:document_type` | Get policy |
| GET | `/api/export/download` | Direct download |
| GET | `/api/export/:exportJobId/stale` | Check staleness |

### Frontend Implications
- **Export Button:** Per-topic action button
- **Format Selector:** Dropdown with allowed formats per policy
- **Progress Modal:** Polling for job completion
- **Download Manager:** Track completed exports
- **Policy Enforcement:** Disable unavailable formats based on document type
- **Staleness Warning:** Alert if content changed since export

---

## Feature 5: Admin Ingestion

### Description
Admin-only interface for submitting JSON documents for AI processing and ingestion.

### Files Involved
- `src/routes/ingest.routes.js`
- `src/controllers/ingest.controller.js`
- `src/services/ingestion/ingestDocument.service.js`
- `src/models/ingestQueue.model.js`
- `src/middleware/auth.middleware.js` (`requireAdmin`)

### Endpoints
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/ingest/json` | Submit JSON | Yes |
| GET | `/api/ingest/:trackingId` | Get status | Yes |
| POST | `/api/ingest/:id/cancel` | Cancel job | Yes |
| POST | `/api/ingest/:id/retry` | Retry failed | Yes |

### Frontend Implications
- **Admin Dashboard:** Protected route requiring authentication
- **JSON Editor:** Code editor with syntax highlighting
- **Schema Validation:** Client-side Zod validation before submit
- **Status Tracker:** Real-time polling or WebSocket for job progress
- **Error Display:** Show validation errors with field paths
- **Action Buttons:** Cancel/retry per job

---

## Feature 6: Batch Import (GitHub)

### Description
Import multiple documents from GitHub repositories containing pre-processed JSON files.

### Files Involved
- `src/routes/admin.routes.js`
- `src/services/import/` (batch import services)
- `src/models/importBatch.model.js`
- `src/models/auditLog.model.js`

### Endpoints
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| POST | `/api/admin/import/preview` | Preview repo | Yes |
| POST | `/api/admin/import/start` | Start import | Yes |
| GET | `/api/admin/import/:batchId` | Get status | Yes |
| POST | `/api/admin/import/:batchId/retry` | Retry | Yes |
| POST | `/api/admin/import/:batchId/cancel` | Cancel | Yes |
| GET | `/api/admin/import/:batchId/report` | Download report | Yes |

### Frontend Implications
- **Import Form:** GitHub URL input field
- **Preview Screen:** Show found documents/topics before import
- **Progress Dashboard:** Multi-stage progress (scanning, validating, importing, indexing)
- **Error Reporting:** Failed files list with retry option
- **Audit Log:** Action history for compliance
- **Report Download:** CSV/PDF summary of import results

---

## Feature 7: SEO/AEO/GEO Optimization

### Description
Generates structured data (JSON-LD), sitemaps, and answer engine optimization data for search engines.

### Files Involved
- `src/routes/seo.routes.js`
- `src/controllers/seo.controller.js`
- `src/services/seo/` (jsonld, sitemap, aeo services)
- `src/models/topic.model.js` (seo, geo fields)

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/seo/topic/:topicId/jsonld` | Topic JSON-LD |
| GET | `/api/seo/document/:documentId/jsonld` | Document JSON-LD |
| GET | `/api/seo/sitemap-index.xml` | Sitemap index |
| GET | `/api/seo/sitemap-:page.xml` | Paginated sitemap |
| GET | `/api/seo/topic/:topicId/aeo` | Answer hub |
| GET | `/api/seo/topic/:topicId/aeo/score` | AEO score |

### Frontend Implications
- **Meta Tags:** Dynamic `<title>`, `<meta description>` from API
- **JSON-LD Injection:** Insert script tag with API response
- **Sitemap:** Auto-generated, no frontend work needed
- **Canonical URLs:** From `seo.canonical_url`
- **Breadcrumbs:** From `seo.breadcrumb` array
- **AEO Content:** Featured snippet blocks for voice search

---

## Feature 8: Analytics Tracking

### Description
Tracks topic views, search queries, and popular content for analytics and recommendations.

### Files Involved
- `src/middleware/analyticsTracker.middleware.js`
- `src/routes/utility.routes.js`
- `src/controllers/utility.controller.js`
- `src/models/popularTopic.model.js`
- `src/models/popularSearch.model.js`
- `src/models/failedSearch.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/utility/popular-topics` | Get popular topics |
| GET | `/api/utility/failed-searches` | Get failed searches |
| GET | `/api/utility/analytics/search` | Search analytics |
| GET | `/api/utility/analytics/topics` | Topic analytics |

### Frontend Implications
- **Automatic Tracking:** Middleware fires on topic page load (no frontend code)
- **Popular Widget:** Display trending topics on homepage
- **Search Improvement:** Use failed searches to identify content gaps
- **Dashboard:** Admin view of analytics data

---

## Feature 9: Slug Management & Redirects

### Description
Handles URL routing via slugs, maintains redirect history when slugs change.

### Files Involved
- `src/routes/utility.routes.js`
- `src/controllers/utility.controller.js`
- `src/models/slugRegistry.model.js`
- `src/models/slugRedirect.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/utility/slug/resolve` | Resolve redirect |
| GET | `/api/utility/slug/redirects/stats` | Redirect stats |
| POST | `/api/utility/resolve-slugs` | Trigger resolver |

### Frontend Implications
- **Client-Side Routing:** Use `slug_global` for human-readable URLs
- **404 Handling:** On 404, call resolve endpoint to check for redirects
- **301 Redirects:** Update browser history when redirect found
- **SEO:** Prevent broken links when content moves

---

## Feature 10: Platform Statistics

### Description
Provides global statistics about the platform (total documents, topics, formulas, recent arrivals).

### Files Involved
- `src/routes/utility.routes.js`
- `src/controllers/utility.controller.js`
- `src/models/platformStats.model.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/utility/platform-stats` | Get stats |
| GET | `/api/utility/recent-arrivals` | Recent additions |
| POST | `/api/utility/platform-stats/recompute` | Recompute |

### Frontend Implications
- **Homepage Stats:** Display totals as hero numbers
- **Recent Arrivals:** "New this week" carousel
- **Admin Dashboard:** Stats overview for monitoring

---

## Feature 11: Quran Integration

### Description
Provides access to Quran text (Urdu/English translations) with position-based mapping (no Arabic glyphs stored).

### Files Involved
- `src/routes/quran.routes.js`
- `src/controllers/quran.controller.js`
- `src/models/quranSurah.model.js`
- `src/models/quranAyah.model.js`
- `src/models/topicContent.model.js` (quran_data field)

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/quran/surah/:surahNumber` | Get surah |
| GET | `/api/quran/ayah/:surah/:ayah` | Get ayah |
| GET | `/api/quran/range/:surah/:start/:end` | Get range |

### Frontend Implications
- **Quran Viewer:** Separate page/component for Quran browsing
- **Reference Blocks:** Render Quran references in topics
- **External Font:** Need Arabic font for rendering (if displaying Arabic from external API)
- **Position Mapping:** UI shows verse positions, not stored text

---

## Feature 12: Version Control

### Description
Tracks document and topic versions, enables rollback and diff viewing.

### Files Involved
- `src/models/version.model.js`
- `src/models/document.model.js` (version_control field)
- `src/models/topic.model.js` (is_latest, is_archived fields)

### Frontend Implications
- **Version Selector:** Dropdown to view historical versions
- **Diff Viewer:** Highlight changes between versions
- **Archive Badge:** Show archived status on old versions
- **Rollback Action:** Admin-only restore functionality

---

## Feature 13: Asset Management

### Description
Tracks local file system assets (figures, tables, covers) with SHA256 deduplication.

### Files Involved
- `src/models/assetRegistry.model.js`
- `src/models/topicAsset.model.js`

### Frontend Implications
- **Image CDN:** Serve images from `local_path` via static route
- **Lazy Loading:** Optimize figure loading with placeholders
- **SVG Rendering:** Inline SVG from `svg_code` field
- **Alt Text:** Accessibility from `alt` field

---

## Feature 14: Health Monitoring

### Description
System health checks for MongoDB and Redis connectivity.

### Files Involved
- `src/routes/health.routes.js`
- `src/services/health.service.js`

### Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check |

### Frontend Implications
- **Status Page:** Public system status dashboard
- **Monitoring:** Uptime monitoring service integration
- **Error Page:** Show degraded status if health check fails

---

## Summary Table

| Feature | Public | Admin | Key Endpoints |
|---------|--------|-------|---------------|
| Document Browsing | ✅ | - | GET /api/documents |
| Topic Viewing | ✅ | - | GET /api/topics/:id |
| Search | ✅ | - | GET /api/search |
| Export | ✅ | - | POST /api/exports |
| Ingestion | - | ✅ | POST /api/ingest/json |
| Batch Import | - | ✅ | POST /api/admin/import/* |
| SEO | ✅ | - | GET /api/seo/* |
| Analytics | ✅ | ✅ | GET /api/utility/analytics/* |
| Slug Redirects | ✅ | - | GET /api/utility/slug/resolve |
| Platform Stats | ✅ | ✅ | GET /api/utility/platform-stats |
| Quran | ✅ | - | GET /api/quran/* |
| Version Control | ✅ | ✅ | (integrated in topic/doc APIs) |
| Asset Management | ✅ | - | (integrated in topic APIs) |
| Health Check | ✅ | - | GET /api/health |

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [02-api-inventory.md](./02-api-inventory.md) — Complete API list
- [06-screen-inventory.md](./06-screen-inventory.md) — Screen requirements
