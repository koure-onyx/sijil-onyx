# Sijil — Frontend Discovery: API Inventory

**Generated:** 2026-06-27  
**Source Files:** All files in `src/routes/`, `src/controllers/`

---

## API Base Path
All routes are mounted under `/api` prefix (defined in `app.js`)

---

## Health Routes
**File:** `src/routes/health.routes.js`

| Method | Path | Controller | Auth | Description |
|--------|------|------------|------|-------------|
| GET | `/api/health` | `checkHealth` (service) | No | System health check (MongoDB + Redis) |

### GET /api/health
**Response Success (200):**
```json
{
  "status": "ok",
  "mongo": "connected",
  "redis": "connected",
  "uptime_seconds": 12345
}
```
**Response Error (503):**
```json
{
  "status": "degraded",
  "mongo": "disconnected",
  "redis": "connected"
}
```

---

## Document Routes
**File:** `src/routes/document.routes.js`  
**Controller:** `src/controllers/document.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/documents` | `listDocuments` | No | List documents with filters |
| GET | `/api/documents/:documentId` | `getDocumentById` | No | Get single document |
| GET | `/api/documents/:documentId/topics` | `getDocumentTopics` | No | Get topics in document |
| GET | `/api/documents/:id/aggregates` | `getDocumentAggregates` | No | Get document counts |
| GET | `/api/subjects` | `getSubjects` | No | List all subjects |
| GET | `/api/grades` | `getGrades` | No | List all grades |
| GET | `/api/subjects/:subject/grades` | `getSubjectGrades` | No | Get grades for subject |

### GET /api/documents
**Query Params:**
- `subject` (string, optional) — Filter by subject
- `grade` (string, optional) — Filter by grade
- `status` (string, optional) — Filter by publishing status
- `type` (string, optional) — Filter by document type
- `sort` (string, optional) — Sort field
- `search` (string, optional) — Search query
- `page` (number, optional) — Page number
- `limit` (number, optional) — Items per page

**Response Success (200):**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### GET /api/documents/:documentId
**URL Params:**
- `documentId` (string) — Document ID (e.g., `pk-pctb-phys-9`)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "doc_xxx",
    "document_metadata": {...},
    "container": {...},
    "topic_refs": [...]
  }
}
```
**Response Error (404):**
```json
{
  "success": false,
  "error": "Target Document entry not found."
}
```

### GET /api/documents/:documentId/topics
**URL Params:**
- `documentId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": [...]
}
```

### GET /api/documents/:id/aggregates
**URL Params:**
- `id` (string) — Document ID

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "document_id": "doc_xxx",
    "topics": 12,
    "content_blocks": 45,
    "formulas": 34,
    "assessments": 20,
    "assets": 47
  }
}
```

### GET /api/subjects
**Response Success (200):**
```json
{
  "success": true,
  "data": ["Physics", "Chemistry", "Biology", ...]
}
```

### GET /api/grades
**Response Success (200):**
```json
{
  "success": true,
  "data": [9, 10, 11, 12]
}
```

### GET /api/subjects/:subject/grades
**URL Params:**
- `subject` (string) — Subject name

**Response Success (200):**
```json
{
  "success": true,
  "data": [9, 10]
}
```

---

## Topic Routes
**File:** `src/routes/topic.routes.js`  
**Controller:** `src/controllers/topic.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/topics/:topicId` | `getTopicById` | No | Get topic by ID |
| GET | `/api/topics/slug/*slug` | `getTopicBySlugGlobal` | No | Get topic by global slug path |
| GET | `/api/topics/:topicId/content` | `getTopicContent` | No | Get topic content blocks |
| GET | `/api/topics/:topicId/assets` | `getTopicAssets` | No | Get topic figures/tables |
| GET | `/api/topics/:topicId/assessments` | `getTopicAssessments` | No | Get topic MCQs/questions |
| GET | `/api/topics/:topicId/page` | `getTopicPage` | No | Get full topic page data |

### GET /api/topics/:topicId
**URL Params:**
- `topicId` (string) — Topic ID (e.g., `top_9x82j1k`)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "top_xxx",
    "title": "Vernier Callipers",
    "slug": "vernier-callipers",
    "slug_global": "pk-pctb-phys-9-ch1-vernier-callipers",
    "document_id": "doc_xxx",
    "seo": {...},
    "geo": {...}
  }
}
```
**Note:** Fires analytics tracking (fire-and-forget)

### GET /api/topics/slug/*slug
**URL Params:**
- `slug` (string, wildcard) — Full global slug path (multi-segment)

**Example:** `/api/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers`

**Response Success (200):** Same as `getTopicById`  
**Response Error (404):**
```json
{
  "success": false,
  "error": "Topic matching slug paths (\"pk/pctb/phys/9/ch1/vernier-callipers\") not found."
}
```

### GET /api/topics/:topicId/content
**URL Params:**
- `topicId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "content_blocks": [...],
    "formulas": [...],
    "key_terms": [...],
    "examples": [...],
    "callouts": [...],
    "ai_answer_hub": [...],
    "faq": [...],
    "entity_extraction": {...}
  }
}
```

### GET /api/topics/:topicId/assets
**URL Params:**
- `topicId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "figures": [...],
    "tables": [...]
  }
}
```

### GET /api/topics/:topicId/assessments
**URL Params:**
- `topicId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "book_mcqs": [...],
    "book_short_questions": [...],
    "book_problems": [...],
    "activities": [...],
    "flashcards": [...]
  }
}
```

### GET /api/topics/:topicId/page
**URL Params:**
- `topicId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    // Combined topic metadata + content + assets + assessments
  }
}
```
**Response Error (404):**
```json
{
  "success": false,
  "error": "Topic not found."
}
```

---

## Ingest Routes (Admin Only)
**File:** `src/routes/ingest.routes.js`  
**Controller:** `src/controllers/ingest.controller.js`  
**Middleware:** `requireAdmin`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| POST | `/api/ingest/json` | `submitJsonIngest` | Yes | Submit JSON for ingestion |
| GET | `/api/ingest/:trackingId` | `getIngestStatus` | Yes | Get ingestion status |
| POST | `/api/ingest/:id/cancel` | `cancelIngestJob` | Yes | Cancel pending job |
| POST | `/api/ingest/:id/retry` | `retryIngestJob` | Yes | Retry failed job |

### POST /api/ingest/json
**Auth:** Required (`X-Admin-ID` header or bootstrap admin)

**Request Body:**
```json
{
  "schema_version": "2.0.0",
  "schema_type": "textbook",
  "ingest_metadata": {...},
  "document_metadata": {...},
  "container": {...},
  "topics": [...],
  "type_specific_data": {}
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "tracking_id": "ing_xxx",
    "status": "pending"
  }
}
```
**Response Error (400):**
```json
{
  "success": false,
  "error": "Empty request payload content body."
}
```
**Response Error (422):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [...]
}
```

### GET /api/ingest/:trackingId
**URL Params:**
- `trackingId` (string) — Ingest tracking ID

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "ing_xxx",
    "status": "processing",
    "source_file_name": "physics.pdf",
    "created_at": "2026-06-21T10:00:00Z"
  }
}
```
**Response Error (404):**
```json
{
  "success": false,
  "error": "Ingestion tracking sequence identifier not resolved."
}
```

### POST /api/ingest/:id/cancel
**URL Params:**
- `id` (string) — Job ID

**Response Success (200):**
```json
{
  "success": true,
  "message": "Job cancelled"
}
```
**Response Error (404):** `Job not found`  
**Response Error (400):** `Cannot cancel job in current state`

### POST /api/ingest/:id/retry
**URL Params:**
- `id` (string) — Job ID

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "job_id": "xxx"
  }
}
```
**Response Error (400):** `Only failed jobs can be retried`

---

## Export Routes
**File:** `src/routes/export.routes.js`  
**Controller:** `src/controllers/export.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| POST | `/api/exports` | `createExportJob` | No | Create export job |
| GET | `/api/exports/:exportJobId` | `getExportJobStatus` | No | Get export status |
| GET | `/api/policies` | `getPolicies` | No | Get all export policies |
| GET | `/api/policies/:document_type` | `getPolicyByType` | No | Get policy for type |
| GET | `/api/export/download` | `downloadExportDirect` | No | Direct download |
| GET | `/api/export/:exportJobId/stale` | `getExportStaleness` | No | Check staleness |

### POST /api/exports
**Request Body:**
```json
{
  "topic_id": "top_xxx",
  "format": "formula_pack"
}
```
**Valid Formats:** `formula_pack`, `mcq_pack`, `revision_pack`, `offline_html`, `flashcard_pack`, `topic_pack`

**Response Success (202):**
```json
{
  "success": true,
  "data": {
    "export_job_id": "exp_xxx",
    "status": "pending"
  }
}
```
**Response Error (400):**
```json
{
  "success": false,
  "error": "Missing mandatory parameters: topic_id and format are required."
}
```

### GET /api/exports/:exportJobId
**URL Params:**
- `exportJobId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "status": "complete",
    "package_url": "/downloads/xxx.zip"
  }
}
```
**Response Error (404):** `Target Export reference context not found.`

### GET /api/policies
**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "textbook",
      "document_type": "textbook",
      "allowed_export_types": ["formula_pack", "mcq_pack"],
      "max_topics_per_export": 5
    }
  ]
}
```

### GET /api/policies/:document_type
**URL Params:**
- `document_type` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {...}
}
```
**Response Error (404):** Policy not found

### GET /api/export/download
**Query Params:**
- `topic_id` (string, required)
- `format` (string, required)
- `document_type` (string, optional, default: `textbook`)

**Response Success (200):** Binary ZIP file download  
**Headers:**
- `Content-Type: application/zip`
- `Content-Disposition: attachment; filename="..."`

**Response Error (400):** Missing parameters  
**Response Error (403):** Export not permitted by policy  
**Response Error (404):** Topic not found

### GET /api/export/:exportJobId/stale
**URL Params:**
- `exportJobId` (string)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "is_stale": false,
    "content_hash_match": true
  }
}
```

---

## Search Routes
**File:** `src/routes/search.routes.js`  
**Controller:** `src/controllers/search.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/search` | `searchTopicsHandler` | No | Search topics |
| GET | `/api/search/formulas` | `searchFormulasHandler` | No | Search formulas |
| GET | `/api/search/suggest` | `getSuggestionsHandler` | No | Get suggestions |
| GET | `/api/search/trending` | `getTrendingHandler` | No | Get trending searches |

### GET /api/search
**Query Params:**
- `q` (string, required) — Search query
- `subject` (string, optional)
- `grade` (string, optional)
- `difficulty` (string, optional)
- `topicType` (string, optional)
- `limit` (number, optional, default: 20)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "query": "physics",
    "count": 15,
    "results": [...]
  }
}
```
**Response Error (400):** Missing `q` parameter  
**Response Error (503):** Search service unavailable

### GET /api/search/formulas
**Query Params:**
- `q` (string, required) — Formula search query
- `subject` (string, optional)
- `grade` (string, optional)
- `limit` (number, optional, default: 20)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "query": "F=ma",
    "count": 5,
    "results": [...]
  }
}
```

### GET /api/search/suggest
**Query Params:**
- `prefix` (string, required) — Autocomplete prefix
- `limit` (number, optional, default: 10)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "prefix": "phy",
    "suggestions": ["physics", "physical quantities", ...]
  }
}
```

### GET /api/search/trending
**Query Params:**
- `limit` (number, optional, default: 10)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "trending": [...]
  }
}
```

---

## SEO Routes
**File:** `src/routes/seo.routes.js`  
**Controller:** `src/controllers/seo.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/seo/topic/:topicId/jsonld` | `getTopicJsonLd` | No | Get topic JSON-LD |
| GET | `/api/seo/document/:documentId/jsonld` | `getDocumentJsonLd` | No | Get document JSON-LD |
| GET | `/api/seo/sitemap-static.xml` | `getStaticSitemap` | No | Static sitemap |
| GET | `/api/seo/sitemap-index.xml` | `getSitemapIndex` | No | Sitemap index |
| GET | `/api/seo/sitemap-:page.xml` | `getSitemapPage` | No | Paginated sitemap |
| GET | `/api/seo/sitemap/stats` | `getSitemapStatsController` | No | Sitemap stats |
| GET | `/api/seo/topic/:topicId/aeo` | `getTopicAnswerHub` | No | Topic AEO data |
| GET | `/api/seo/document/:documentId/aeo` | `getDocumentAnswerHub` | No | Document AEO data |
| GET | `/api/seo/topic/:topicId/aeo/score` | `getTopicAeoScore` | No | AEO readiness score |

### GET /api/seo/topic/:topicId/jsonld
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    ...
  }
}
```

### GET /api/seo/sitemap-index.xml
**Response:** XML content  
**Content-Type:** `application/xml`

### GET /api/seo/sitemap-:page.xml
**URL Params:**
- `page` (number) — Page number

**Response:** XML content

### GET /api/seo/topic/:topicId/aeo
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "primary_question": "...",
    "featured_snippet_block": "...",
    "faq": [...]
  }
}
```

### GET /api/seo/topic/:topicId/aeo/score
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "score": 0.85,
    "missing_fields": [...]
  }
}
```

---

## Admin Routes (Import/Batch)
**File:** `src/routes/admin.routes.js`  
**Middleware:** `requireAdmin`

| Method | Path | Handler | Auth | Description |
|--------|------|---------|------|-------------|
| POST | `/api/admin/import/preview` | Inline | Yes | Preview GitHub import |
| POST | `/api/admin/import/start` | Inline | Yes | Start batch import |
| GET | `/api/admin/import/:batchId` | Inline | Yes | Get import status |
| POST | `/api/admin/import/:batchId/retry` | Inline | Yes | Retry failed files |
| POST | `/api/admin/import/:batchId/cancel` | Inline | Yes | Cancel import |
| GET | `/api/admin/import/:batchId/report` | Inline | Yes | Download report |

### POST /api/admin/import/preview
**Request Body:**
```json
{
  "repo_url": "https://github.com/starly101/sijil"
}
```
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "batch_id": "batch_xxx",
    "documents_found": 10,
    "topics_found": 120
  }
}
```

### POST /api/admin/import/start
**Request Body:**
```json
{
  "batch_id": "batch_xxx"
}
```
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "batch_id": "batch_xxx",
    "status": "PENDING",
    "message": "Import started in background"
  }
}
```

### GET /api/admin/import/:batchId
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "batch_id": "batch_xxx",
    "status": "IMPORTING",
    "progress": {...},
    "counts": {...}
  }
}
```

---

## Utility Routes
**File:** `src/routes/utility.routes.js`  
**Controller:** `src/controllers/utility.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/utility/popular-topics` | `getPopularTopics` | No | Get popular topics |
| GET | `/api/utility/failed-searches` | `getFailedSearches` | No | Get failed searches |
| GET | `/api/utility/sitemap-seed` | `getSitemapSeed` | No | Get sitemap seed |
| GET | `/api/utility/analytics/search` | `getSearchAnalytics` | No | Search analytics |
| GET | `/api/utility/analytics/topics` | `getTopicAnalytics` | No | Topic analytics |
| GET | `/api/utility/slug/resolve` | `resolveRedirect` | No | Resolve slug redirect |
| GET | `/api/utility/slug/redirects/stats` | `getRedirectStats` | No | Redirect stats |
| GET | `/api/utility/platform-stats` | `getPlatformStats` | No | Platform statistics |
| GET | `/api/utility/recent-arrivals` | `getRecentArrivalsController` | No | Recent arrivals |
| POST | `/api/utility/platform-stats/recompute` | `recomputePlatformStats` | No | Recompute stats |
| POST | `/api/utility/resolve-slugs` | `triggerSlugResolver` | No | Trigger slug resolution |

### GET /api/utility/platform-stats
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "total_documents": 50,
    "total_topics": 600,
    "total_formulas": 1200,
    "recent_arrivals": [...]
  }
}
```

### GET /api/utility/slug/resolve
**Query Params:**
- `slug` (string, required)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "resolved_url": "/topics/top_xxx",
    "redirect_type": "301"
  }
}
```

---

## Quran Routes
**File:** `src/routes/quran.routes.js`  
**Controller:** `src/controllers/quran.controller.js`

| Method | Path | Controller Function | Auth | Description |
|--------|------|---------------------|------|-------------|
| GET | `/api/quran/surah/:surahNumber` | `getSurah` | No | Get complete surah |
| GET | `/api/quran/ayah/:surahNumber/:ayahNumber` | `getAyah` | No | Get single ayah |
| GET | `/api/quran/range/:surahNumber/:start/:end` | `getRange` | No | Get ayah range |

### GET /api/quran/surah/:surahNumber
**URL Params:**
- `surahNumber` (number, 1-114)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "surah": {
      "surah_number": 1,
      "name_arabic": "...",
      "name_english": "Al-Fatiha",
      "total_ayahs": 7
    },
    "ayahs": [...]
  }
}
```

### GET /api/quran/ayah/:surahNumber/:ayahNumber
**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "surah": 1,
    "ayah": 1,
    "text_uthmani": "...",
    "translation_ur": "...",
    "translation_en": "..."
  }
}
```

### GET /api/quran/range/:surahNumber/:start/:end
**URL Params:**
- `surahNumber` (number)
- `start` (number)
- `end` (number, must be >= start, max range: 50)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "surah_number": 1,
    "range": { "start": 1, "end": 5 },
    "count": 5,
    "ayahs": [...]
  }
}
```

---

## Authentication Summary

| Route Group | Auth Required | Middleware |
|-------------|---------------|------------|
| Health | No | - |
| Documents | No | - |
| Topics | No | - |
| Ingest | **Yes** | `requireAdmin` |
| Export | No | - |
| Search | No | - |
| SEO | No | - |
| Admin (Import) | **Yes** | `requireAdmin` |
| Utility | No | - |
| Quran | No | - |

**Admin Authentication:** Uses `requireAdmin` middleware which checks for `X-Admin-ID` header or falls back to `bootstrap_admin`

---

## Error Response Format

All errors follow this pattern:
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

HTTP Status Codes:
- `200` — Success
- `201` — Created (ingest)
- `202` — Accepted (export job)
- `400` — Bad Request (validation)
- `403` — Forbidden (policy violation)
- `404` — Not Found
- `422` — Unprocessable Entity (validation)
- `503` — Service Unavailable

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [03-model-dictionary.md](./03-model-dictionary.md) — MongoDB schemas
- [06-screen-inventory.md](./06-screen-inventory.md) — Screen requirements
