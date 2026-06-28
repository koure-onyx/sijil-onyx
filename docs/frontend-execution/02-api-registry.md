# 02-API-Registry.md

**Source:** docs/frontend-discovery/02-api-inventory.md  
**Generated:** Frontend Execution Knowledge Base

---

## API Base Configuration

- **Base Path:** `/api` (all routes mounted under this prefix)
- **Health Check:** `GET /api/health`

---

## Health Routes

### GET /api/health
- **Auth:** No
- **Description:** System health check (MongoDB + Redis)
- **Response Success (200):**
```json
{
  "status": "ok",
  "mongo": "connected",
  "redis": "connected",
  "uptime_seconds": 12345
}
```
- **Response Error (503):**
```json
{
  "status": "degraded",
  "mongo": "disconnected",
  "redis": "connected"
}
```

---

## Document Routes

**Source File:** `src/routes/document.routes.js`  
**Controller:** `src/controllers/document.controller.js`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/documents` | No | List documents with filters |
| GET | `/api/documents/:documentId` | No | Get single document |
| GET | `/api/documents/:documentId/topics` | No | Get topics in document |
| GET | `/api/documents/:id/aggregates` | No | Get document counts |
| GET | `/api/subjects` | No | List all subjects |
| GET | `/api/grades` | No | List all grades |
| GET | `/api/subjects/:subject/grades` | No | Get grades for subject |

### GET /api/documents
- **Query Params:** `subject`, `grade`, `status`, `type`, `sort`, `search`, `page`, `limit`
- **Response:** Paginated document list with pagination metadata
- **Frontend Usage:** Document list page with filtering

### GET /api/documents/:documentId
- **URL Params:** `documentId` (e.g., `pk-pctb-phys-9`)
- **Response:** Document metadata, container info, topic refs
- **Error (404):** "Target Document entry not found."
- **Frontend Usage:** Document detail page

### GET /api/documents/:documentId/topics
- **URL Params:** `documentId`
- **Response:** Array of topics in document
- **Frontend Usage:** Topic list within document

### GET /api/documents/:id/aggregates
- **URL Params:** `id` (Document ID)
- **Response:**
```json
{
  "document_id": "doc_xxx",
  "topics": 12,
  "content_blocks": 45,
  "formulas": 34,
  "assessments": 20,
  "assets": 47
}
```
- **Frontend Usage:** Stats display on document page

### GET /api/subjects
- **Response:** `["Physics", "Chemistry", "Biology", ...]`
- **Frontend Usage:** Subject filter dropdowns

### GET /api/grades
- **Response:** `[9, 10, 11, 12]`
- **Frontend Usage:** Grade filter dropdowns

### GET /api/subjects/:subject/grades
- **URL Params:** `subject`
- **Response:** Available grades for subject
- **Frontend Usage:** Cascading grade filter

---

## Topic Routes

**Source File:** `src/routes/topic.routes.js`  
**Controller:** `src/controllers/topic.controller.js`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/topics/:topicId` | No | Get topic by ID |
| GET | `/api/topics/slug/*slug` | No | Get topic by global slug path |
| GET | `/api/topics/:topicId/content` | No | Get topic content blocks |
| GET | `/api/topics/:topicId/assets` | No | Get topic figures/tables |
| GET | `/api/topics/:topicId/assessments` | No | Get topic MCQs/questions |
| GET | `/api/topics/:topicId/page` | No | Get full topic page data |

### GET /api/topics/:topicId
- **URL Params:** `topicId` (e.g., `top_9x82j1k`)
- **Response:** Topic metadata with SEO and GEO fields
- **Note:** Fires analytics tracking (fire-and-forget)
- **Frontend Usage:** Topic metadata fetch

### GET /api/topics/slug/*slug
- **URL Params:** `slug` (wildcard, multi-segment)
- **Example:** `/api/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers`
- **Response:** Same as `getTopicById`
- **Error (404):** "Topic matching slug paths not found."
- **Frontend Usage:** Slug-based topic resolution

### GET /api/topics/:topicId/content
- **URL Params:** `topicId`
- **Response:**
```json
{
  "content_blocks": [...],
  "formulas": [...],
  "key_terms": [...],
  "examples": [...],
  "callouts": [...],
  "ai_answer_hub": [...],
  "faq": [...],
  "entity_extraction": {...}
}
```
- **Frontend Usage:** Content rendering (BlockRenderer)

### GET /api/topics/:topicId/assets
- **URL Params:** `topicId`
- **Response:**
```json
{
  "figures": [...],
  "tables": [...]
}
```
- **Frontend Usage:** Figure/table gallery

### GET /api/topics/:topicId/assessments
- **URL Params:** `topicId`
- **Response:**
```json
{
  "book_mcqs": [...],
  "book_short_questions": [...],
  "book_problems": [...],
  "activities": [...],
  "flashcards": [...]
}
```
- **Frontend Usage:** Assessment preview

### GET /api/topics/:topicId/page
- **URL Params:** `topicId`
- **Response:** Combined topic metadata + content + assets + assessments
- **Error (404):** "Topic not found."
- **Frontend Usage:** Single-fetch topic page loading

---

## Ingest Routes (Admin Only)

**Source File:** `src/routes/ingest.routes.js`  
**Controller:** `src/controllers/ingest.controller.js`  
**Middleware:** `requireAdmin`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/ingest/json` | Yes | Submit JSON for ingestion |
| GET | `/api/ingest/:trackingId` | Yes | Get ingestion status |
| POST | `/api/ingest/:id/cancel` | Yes | Cancel pending job |
| POST | `/api/ingest/:id/retry` | Yes | Retry failed job |

### POST /api/ingest/json
- **Auth:** Required (`X-Admin-ID` header or bootstrap admin)
- **Request Body:** Full JSON payload with schema_version, schema_type, ingest_metadata, document_metadata, container, topics, type_specific_data
- **Response Success (201):**
```json
{
  "success": true,
  "data": {
    "tracking_id": "ing_xxx",
    "status": "pending"
  }
}
```
- **Error (400):** "Empty request payload content body."
- **Error (422):** Validation failed with errors array
- **Frontend Usage:** Admin JSON ingestion form

### GET /api/ingest/:trackingId
- **URL Params:** `trackingId` (Ingest tracking ID)
- **Response:** Job status with source file name, created_at
- **Error (404):** "Ingestion tracking sequence identifier not resolved."
- **Frontend Usage:** Job status tracking

### POST /api/ingest/:id/cancel
- **URL Params:** `id` (Job ID)
- **Response Success (200):** "Job cancelled"
- **Error (404):** Job not found
- **Error (400):** Cannot cancel job in current state
- **Frontend Usage:** Cancel button in admin

### POST /api/ingest/:id/retry
- **URL Params:** `id` (Job ID)
- **Response Success (200):** New job_id
- **Error (400):** Only failed jobs can be retried
- **Frontend Usage:** Retry failed ingestion

---

## Export Routes

**Source File:** `src/routes/export.routes.js`  
**Controller:** `src/controllers/export.controller.js`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/exports` | No | Create export job |
| GET | `/api/exports/:exportJobId` | No | Get export status |
| GET | `/api/policies` | No | Get all export policies |
| GET | `/api/policies/:document_type` | No | Get policy for type |
| GET | `/api/export/download` | No | Direct download |
| GET | `/api/export/:exportJobId/stale` | No | Check staleness |

### POST /api/exports
- **Request Body:**
```json
{
  "topic_id": "top_xxx",
  "format": "formula_pack"
}
```
- **Valid Formats:** `formula_pack`, `mcq_pack`, `revision_pack`, `offline_html`, `flashcard_pack`, `topic_pack`
- **Response Success (202):**
```json
{
  "success": true,
  "data": {
    "export_job_id": "exp_xxx",
    "status": "pending"
  }
}
```
- **Error (400):** Missing mandatory parameters
- **Frontend Usage:** Export button action

### GET /api/exports/:exportJobId
- **URL Params:** `exportJobId`
- **Response:**
```json
{
  "status": "complete",
  "package_url": "/downloads/xxx.zip"
}
```
- **Error (404):** Export reference context not found
- **Frontend Usage:** Export status polling

### GET /api/policies
- **Response:** Array of policy objects with allowed_export_types, max_topics_per_export
- **Frontend Usage:** Export policy validation UI

### GET /api/policies/:document_type
- **URL Params:** `document_type`
- **Response:** Single policy object
- **Error (404):** Policy not found
- **Frontend Usage:** Context-aware export options

### GET /api/export/download
- **Query Params:** `topic_id` (required), `format` (required), `document_type` (optional)
- **Response:** Binary ZIP file
- **Headers:** `Content-Type: application/zip`, `Content-Disposition: attachment`
- **Error (400):** Missing parameters
- **Error (403):** Export not permitted by policy
- **Error (404):** Topic not found
- **Frontend Usage:** Download trigger

### GET /api/export/:exportJobId/stale
- **URL Params:** `exportJobId`
- **Response:**
```json
{
  "is_stale": false,
  "content_hash_match": true
}
```
- **Frontend Usage:** Staleness warning display

---

## Search Routes

**Source File:** `src/routes/search.routes.js`  
**Controller:** `src/controllers/search.controller.js`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/search` | No | Search topics |
| GET | `/api/search/formulas` | No | Search formulas |
| GET | `/api/search/suggest` | No | Get suggestions |
| GET | `/api/search/trending` | No | Get trending searches |

### GET /api/search
- **Query Params:** `q` (required), `subject`, `grade`, `difficulty`, `topicType`, `limit` (default: 20)
- **Response:**
```json
{
  "query": "physics",
  "count": 15,
  "results": [...]
}
```
- **Error (400):** Missing `q` parameter
- **Error (503):** Search service unavailable
- **Frontend Usage:** Search results page

### GET /api/search/formulas
- **Query Params:** `q` (required), `subject`, `grade`, `limit` (default: 20)
- **Response:** Formula results with LaTeX
- **Frontend Usage:** Formula search page

### GET /api/search/suggest
- **Query Params:** `prefix` (required), `limit` (default: 10)
- **Response:**
```json
{
  "prefix": "phy",
  "suggestions": ["physics", "physical quantities", ...]
}
```
- **Frontend Usage:** Autocomplete in search bar

### GET /api/search/trending
- **Query Params:** `limit` (default: 10)
- **Response:** Trending searches array
- **Frontend Usage:** Trending searches widget

---

## SEO Routes

**Source File:** `src/routes/seo.routes.js`  
**Controller:** `src/controllers/seo.controller.js`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/seo/topic/:topicId/jsonld` | No | Get topic JSON-LD |
| GET | `/api/seo/document/:documentId/jsonld` | No | Get document JSON-LD |
| GET | `/api/seo/sitemap-static.xml` | No | Static sitemap |
| GET | `/api/seo/sitemap-index.xml` | No | Sitemap index |
| GET | `/api/seo/sitemap-:page.xml` | No | Paginated sitemap |
| GET | `/api/seo/sitemap/stats` | No | Sitemap stats |
| GET | `/api/seo/topic/:topicId/aeo` | No | Topic AEO data |
| GET | `/api/seo/document/:documentId/aeo` | No | Document AEO data |
| GET | `/api/seo/topic/:topicId/aeo/score` | No | AEO readiness score |

### GET /api/seo/topic/:topicId/jsonld
- **Response:** JSON-LD structured data with @context, @type: LearningResource
- **Frontend Usage:** Inject into page head for SEO

### GET /api/seo/sitemap-index.xml
- **Response:** XML content
- **Content-Type:** `application/xml`
- **Frontend Usage:** Sitemap for search engines

### GET /api/seo/sitemap-:page.xml
- **URL Params:** `page` (number)
- **Response:** XML content
- **Frontend Usage:** Paginated sitemap

### GET /api/seo/topic/:topicId/aeo
- **Response:**
```json
{
  "primary_question": "...",
  "featured_snippet_block": "...",
  "faq": [...]
}
```
- **Frontend Usage:** AEO data display

### GET /api/seo/topic/:topicId/aeo/score
- **Response:**
```json
{
  "score": 0.85,
  "missing_fields": [...]
}
```
- **Frontend Usage:** AEO readiness indicator (admin)

---

## Admin Routes (Import/Batch)

**Source File:** `src/routes/admin.routes.js`  
**Middleware:** `requireAdmin`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin/import/preview` | Yes | Preview GitHub import |
| POST | `/api/admin/import/start` | Yes | Start batch import |
| GET | `/api/admin/import/:batchId` | Yes | Get import status |
| POST | `/api/admin/import/:batchId/retry` | Yes | Retry failed files |
| POST | `/api/admin/import/:batchId/cancel` | Yes | Cancel import |
| GET | `/api/admin/import/:batchId/report` | Yes | Download report |

### POST /api/admin/import/preview
- **Request Body:**
```json
{
  "repo_url": "https://github.com/starly101/sijil"
}
```
- **Response Success (200):**
```json
{
  "batch_id": "batch_xxx",
  "documents_found": 10,
  "topics_found": 120
}
```
- **Frontend Usage:** Import preview step

### POST /api/admin/import/start
- **Request Body:** `{ "batch_id": "batch_xxx" }`
- **Response Success (200):** Batch started with status
- **Frontend Usage:** Start import action

### GET /api/admin/import/:batchId
- **URL Params:** `batchId`
- **Response:** Full import status with progress per stage
- **Frontend Usage:** Progress monitoring

### POST /api/admin/import/:batchId/retry
- **URL Params:** `batchId`
- **Response:** Retry initiated
- **Frontend Usage:** Retry failed files

### POST /api/admin/import/:batchId/cancel
- **URL Params:** `batchId`
- **Response:** Cancel confirmed
- **Frontend Usage:** Cancel import

### GET /api/admin/import/:batchId/report
- **URL Params:** `batchId`
- **Response:** Report file download
- **Frontend Usage:** Download import report

---

## Utility Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/utility/platform-stats` | No | Global platform statistics |
| GET | `/api/utility/popular-topics` | No | Popular topics list |
| GET | `/api/utility/recent-arrivals` | No | Recently added content |
| GET | `/api/utility/slug/resolve` | No | Resolve slug redirects |

### GET /api/utility/platform-stats
- **Response:** Total documents, topics, formulas, etc.
- **Frontend Usage:** Homepage stats widgets

### GET /api/utility/popular-topics
- **Response:** Array of popular topics with view counts
- **Frontend Usage:** Popular topics widget

### GET /api/utility/recent-arrivals
- **Response:** Recently added documents/topics
- **Frontend Usage:** Recent arrivals carousel

### GET /api/utility/slug/resolve
- **Query Params:** `slug`
- **Response:** Resolved URL or null
- **Frontend Usage:** 404 page redirect handling

---

## Quran Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/quran/surah/:surahNumber` | No | Get surah metadata and ayahs |
| GET | `/api/quran/ayah/:surahNumber/:ayahNumber` | No | Get single ayah |
| GET | `/api/quran/range/:surahNumber/:start/:end` | No | Get ayah range |

### GET /api/quran/surah/:surahNumber
- **URL Params:** `surahNumber`
- **Response:** Surah metadata (name, revelation type, ayah count) + ayah list
- **Frontend Usage:** Surah browser

### GET /api/quran/ayah/:surahNumber/:ayahNumber
- **URL Params:** `surahNumber`, `ayahNumber`
- **Response:** Single ayah with translations
- **Frontend Usage:** Ayah detail view

### GET /api/quran/range/:surahNumber/:start/:end
- **URL Params:** `surahNumber`, `start`, `end`
- **Response:** Range of ayahs
- **Frontend Usage:** Juz/hizb browsing

---

## Authentication Summary

| Route Category | Auth Required | Header |
|----------------|---------------|--------|
| Public Content | No | - |
| Search | No | - |
| Exports | No | - |
| SEO | No | - |
| Quran | No | - |
| Utility | No | - |
| Ingest | Yes | `X-Admin-ID` |
| Admin Import | Yes | `X-Admin-ID` |

---

## Error Response Format

All errors follow consistent format:
```json
{
  "success": false,
  "error": "Error message",
  "errors": [...] // Optional validation errors array
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `202` - Accepted (job queued)
- `400` - Bad Request
- `403` - Forbidden (policy violation)
- `404` - Not Found
- `422` - Validation Failed
- `503` - Service Unavailable

---

## Pagination Support

Endpoints supporting pagination return:
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

---

## Caching Hints

| Endpoint Type | Cache Strategy |
|---------------|----------------|
| Topics/Content | SWR (stale-while-revalidate) |
| Documents | SWR |
| Search | Short TTL (1-5 min) |
| Analytics | Time-based (hourly) |
| Quran | Permanent (immutable) |
| Subjects/Grades | Permanent (immutable) |

---

**This registry is complete. All 50+ endpoints documented.**
