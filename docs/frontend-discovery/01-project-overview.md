# Sijil — Frontend Discovery: Project Overview

**Generated:** 2026-06-27  
**Source Files:** `package.json`, `architecture_V2.md`, `docs/SOURCE_OF_TRUTH.md`, `app.js`, `server.js`

---

## Purpose

Sijil is a **Document Intelligence & Headless Publishing Engine** that ingests educational documents (textbooks, courses, SOPs, legal documents, research papers, manuals) and converts them into deeply structured, semantically rich, validated JSON content. The platform then publishes this content as SEO/AEO/GEO-optimized web content and serves it headlessly to any frontend, LMS, mobile app, or API consumer.

**Key Value Proposition:**
- Ingests PDFs/documents using Qwen 3.5 AI with 1M context window
- Converts to validated JSON using Zod schemas
- Splits content into performance-optimized MongoDB collections
- Provides RESTful APIs for frontend consumption
- Generates exports (PDF, EPUB, flashcards, formula packs)
- Full SEO/AEO/GEO optimization out of the box

---

## Business Domain

**Primary Domain:** Educational Technology / Document Intelligence

**Target Content Types:**
| Type Key | Human Label | Examples |
|----------|-------------|----------|
| `textbook` | School/University Textbook | PCTB, NCERT, OpenStax |
| `course` | Online Course / Training | Udemy scripts, corporate training |
| `sop` | Standard Operating Procedure | Factory, hospital, IT runbooks |
| `legal` | Contract / Policy / Agreement | NDAs, ToS, employment contracts |
| `kyc_onboarding` | KYC / Onboarding Forms | Bank forms, HR onboarding |
| `research_paper` | Academic Paper | Journals, theses, white papers |
| `manual` | Technical / User Manual | Product manuals, API docs |
| `finance` | Financial Report / Audit | Annual reports, balance sheets |
| `curriculum` | Curriculum / Syllabus | Board syllabi, course outlines |
| `reference` | Encyclopedia / Glossary | Reference works, term databases |

**Geographic Focus:** Pakistan (PCTB curriculum), with support for international curricula

**Language Support:** Primary: English, Secondary: Urdu (with vernacular support)

---

## Major Systems

### 1. Document Ingestion System
- **Entry Point:** `POST /api/ingest/json` (admin-only)
- **Process:** JSON payload → Zod validation → BullMQ queue → MongoDB storage
- **Collections:** `documents`, `ingest_queue`, `versions`
- **Source:** `src/controllers/ingest.controller.js`, `src/services/ingestion/ingestDocument.service.js`

### 2. Batch Import System (GitHub)
- **Entry Point:** `POST /api/admin/import/preview`, `POST /api/admin/import/start`
- **Process:** GitHub repo scan → JSON validation → Parallel ingestion → Progress tracking
- **Collections:** `import_batch`, `audit_log`
- **Source:** `src/routes/admin.routes.js`, `src/services/import/`

### 3. Content Query System
- **Documents:** `GET /api/documents`, `GET /api/documents/:documentId`
- **Topics:** `GET /api/topics/:topicId`, `GET /api/topics/slug/*`
- **Content Blocks:** `GET /api/topics/:topicId/content`
- **Assets:** `GET /api/topics/:topicId/assets`
- **Assessments:** `GET /api/topics/:topicId/assessments`

### 4. Search System (Atlas Search)
- **Topic Search:** `GET /api/search?q=`
- **Formula Search:** `GET /api/search/formulas?q=`
- **Suggestions:** `GET /api/search/suggest?prefix=`
- **Trending:** `GET /api/search/trending`
- **Collections:** `popular_searches`, `failed_searches`

### 5. Export System
- **Job Creation:** `POST /api/exports`
- **Status Check:** `GET /api/exports/:exportJobId`
- **Direct Download:** `GET /api/export/download?topic_id=&format=`
- **Policies:** `GET /api/policies`, `GET /api/policies/:document_type`
- **Collections:** `export_jobs`, `export_policies`

### 6. Analytics System
- **Topic Views:** Tracked via middleware (`analyticsTracker.middleware.js`)
- **Search Tracking:** Successful/failed searches logged
- **Popular Topics:** `GET /api/utility/popular-topics`
- **Platform Stats:** `GET /api/utility/platform-stats`
- **Collections:** `popular_topics`, `platform_stats`

### 7. SEO/AEO/GEO System
- **JSON-LD:** `GET /api/seo/topic/:topicId/jsonld`, `GET /api/seo/document/:documentId/jsonld`
- **Sitemaps:** `GET /api/seo/sitemap-index.xml`, `GET /api/seo/sitemap-:page.xml`
- **Answer Hubs:** `GET /api/seo/topic/:topicId/aeo`
- **Collections:** Integrated into `topics`, `documents`

### 8. Quran Integration System
- **Surah:** `GET /api/quran/surah/:surahNumber`
- **Ayah:** `GET /api/quran/ayah/:surahNumber/:ayahNumber`
- **Range:** `GET /api/quran/range/:surahNumber/:start/:end`
- **Collections:** `quran_surahs`, `quran_ayahs`

### 9. Slug Management System
- **Registry:** Auto-generated during ingestion
- **Redirects:** `GET /api/utility/slug/resolve?slug=`
- **Collections:** `slug_registry`, `slug_redirects`

---

## User Roles

### 1. Anonymous Users (Public)
- View published topics and documents
- Search content
- Download permitted exports
- Access sitemaps and JSON-LD
- **No authentication required**

### 2. Free Users (Registered)
- All anonymous capabilities
- Higher export limits
- View analytics (if implemented)

### 3. Premium Subscribers
- All free user capabilities
- Access premium content (based on `access_control.is_premium`)
- Full document access (no paywall triggers)

### 4. Admin Users (Bootstrap Admin)
- Submit JSON ingestion jobs (`POST /api/ingest/json`)
- Preview batch imports (`POST /api/admin/import/preview`)
- Start/cancel/retry imports (`POST /api/admin/import/*`)
- View ingest status (`GET /api/ingest/:trackingId`)
- Recompute platform stats (`POST /api/utility/platform-stats/recompute`)
- Trigger slug resolution (`POST /api/utility/resolve-slugs`)
- **Authentication:** Via `requireAdmin` middleware using `X-Admin-ID` header or bootstrap admin

---

## Architecture Summary

### Technology Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js (ES Modules) | Server runtime |
| Framework | Express v5 | HTTP server, routing |
| Database | MongoDB (Mongoose v9) | Primary data store |
| Queue | BullMQ v5 + Redis (ioredis) | Background job processing |
| Validation | Zod v4 | Schema validation |
| HTTP Client | Axios, undici, node-fetch | External API calls |
| Security | Helmet, CORS | Security headers, CORS |
| Archiving | Archiver | ZIP export generation |

### Directory Structure
```
/workspace/sijil/
├── src/
│   ├── config/          # Environment, DB, Redis configuration
│   ├── controllers/     # Request handlers (7 controllers)
│   ├── middleware/      # Auth, analytics, redirects
│   ├── models/          # Mongoose schemas (22 models)
│   ├── queues/          # BullMQ queue definitions
│   ├── routes/          # Express routers (9 route files)
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic layer
│   ├── utils/           # Helper utilities
│   └── workers/         # Background worker processes
├── docs/
│   ├── SOURCE_OF_TRUTH.md
│   └── frontend-discovery/  # This documentation
├── app.js               # Express app factory
├── server.js            # Entry point
└── package.json
```

### Data Flow
1. **Ingestion:** JSON payload → Zod validation → BullMQ queue → Worker → MongoDB
2. **Query:** API request → Controller → Service → MongoDB → Response
3. **Export:** API request → Export job → BullMQ → Worker → File system → Download
4. **Search:** API request → Atlas Search → MongoDB fallback → Analytics tracking
5. **SEO:** API request → Service → JSON-LD/Sitemap generation → XML/JSON response

### Collection Split Strategy (Performance Optimization)
The architecture splits topic data into 4 focused collections for query performance:
- `topics` — Metadata, routing, SEO fields
- `topic_content` — Content blocks, formulas, key terms, FAQs
- `topic_assets` — Figures, tables, images
- `topic_assessments` — MCQs, short questions, problems, activities, flashcards

Plus flat indexes:
- `formula_index` — Cross-document formula search
- `slug_registry` — Canonical slug lookups
- `slug_redirects` — Historical URL redirects

---

## Key Design Principles

1. **Immutable IDs:** All entities use nanoid prefixes (`doc_`, `top_`, `ch_`, etc.) that never change
2. **Slug Redirects:** Slug changes create redirect entries, preventing 404s
3. **Version Control:** Re-ingestion creates new versions with `content_hash` diffing
4. **Zod Validation:** No malformed AI output reaches the database
5. **AEO-Native:** Every topic generates featured-snippet-ready answer blocks
6. **GEO-Native:** Entity extraction with source citations for AI crawlers
7. **Write Once, Publish Everywhere:** One pipeline → web, PDF, EPUB, LMS, API

---

## Related Documents

- [02-api-inventory.md](./02-api-inventory.md) — Complete API endpoint catalog
- [03-model-dictionary.md](./03-model-dictionary.md) — MongoDB collection schemas
- [04-form-dictionary.md](./04-form-dictionary.md) — Zod validation schemas
- [05-feature-inventory.md](./05-feature-inventory.md) — Feature breakdown
- [06-screen-inventory.md](./06-screen-inventory.md) — Frontend screen requirements
- [07-user-flows.md](./07-user-flows.md) — User journey documentation
- [08-navigation-map.md](./08-navigation-map.md) — Site navigation structure
- [09-component-inventory.md](./09-component-inventory.md) — Reusable components
- [10-page-data-requirements.md](./10-page-data-requirements.md) — Page-level API needs
- [11-seo-requirements.md](./11-seo-requirements.md) — SEO implementation guide
- [12-missing-information.md](./12-missing-information.md) — Unknowns and gaps
