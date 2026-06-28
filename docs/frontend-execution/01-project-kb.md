# 01-Project-KB.md

**Generated:** Frontend Execution Knowledge Base  
**Source Documents:** SIJIL_MASTER_BLUEPRINT.md, docs/frontend-discovery/*, docs/frontend-blueprint/*, docs/project-management/*

---

## Project Identity

### What SIJIL IS

A **Document Intelligence & Headless Publishing Engine** for educational content that:

- Ingests textbooks, courses, SOPs using AI (Qwen 3.5 with 1M context)
- Converts to validated JSON with 17 content block types
- Serves via REST API with SEO/AEO/GEO optimization
- Supports Quran browsing, search, exports (PDF/EPUB)

### What SIJIL IS NOT

- NOT a certificate system
- NOT an authentication platform (except admin area)
- NOT a user management system
- NO public login/logout
- NO user dashboards or profiles
- NO certificates, issuers, recipients

---

## Target Content Types

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

---

## Geographic & Language Focus

- **Geographic Focus:** Pakistan (PCTB curriculum), with support for international curricula
- **Primary Language:** English
- **Secondary Language:** Urdu (with vernacular support)
- **Script Direction:** LTR (with RTL support for Arabic/Urdu)

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

## Technology Stack (Frontend)

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x (App Router) |
| Language | TypeScript | 5.7+ |
| Styling | Tailwind CSS | 4.x |
| UI Library | shadcn/ui | Latest |
| State | Zustand | 5.x |
| Data Fetching | TanStack Query | 5.x |
| Forms | React Hook Form + Zod | Latest |
| Math Rendering | KaTeX | Latest |
| Icons | Lucide React | Latest |

---

## Technology Stack (Backend)

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js (ES Modules) | Server runtime |
| Framework | Express v5 | HTTP server, routing |
| Database | MongoDB (Mongoose v9) | Primary data store |
| Queue | BullMQ v5 + Redis (ioredis) | Background job processing |
| Validation | Zod v4 | Schema validation |
| Search | MongoDB Atlas Search | Full-text search |
| Security | Helmet, CORS | Security headers, CORS |
| Archiving | Archiver | ZIP export generation |

---

## Major Systems (9 Total)

### 1. Document Ingestion System
- **Entry Point:** `POST /api/ingest/json` (admin-only)
- **Process:** JSON payload → Zod validation → BullMQ queue → MongoDB storage
- **Collections:** `documents`, `ingest_queue`, `versions`

### 2. Batch Import System (GitHub)
- **Entry Point:** `POST /api/admin/import/preview`, `POST /api/admin/import/start`
- **Process:** GitHub repo scan → JSON validation → Parallel ingestion → Progress tracking
- **Collections:** `import_batch`, `audit_log`

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
- **Topic Views:** Tracked via middleware
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

## Core Data Models

### Primary Entities

#### 1. Document (`documents` collection)
- **ID Prefix:** `doc_`
- **Fields:** title, subject, grade, document_type, language, chapter container
- **Example:** Physics textbook for Grade 9

#### 2. Topic (`topics` collection)
- **ID Prefix:** `top_`
- **Fields:** slug_global, url_path, topic_type, difficulty, seo metadata
- **Example:** "Vernier Callipers" chapter from Physics book

#### 3. Topic Content (`topic_content` collection)
- **Contains:** content_blocks (17 types), formulas, key_terms, FAQs
- **Polymorphic blocks:** heading, paragraph, formula, figure, table, MCQ, etc.

#### 4. Topic Assets (`topic_assets` collection)
- Figures, tables, images with alt text and captions

#### 5. Topic Assessments (`topic_assessments` collection)
- MCQs, short questions, problems, activities, flashcards

### Supporting Entities
- **Formula Index** - Cross-document formula search
- **Export Jobs** - Background export processing
- **Ingest Queue** - Document ingestion tracking
- **Slug Registry** - URL redirect management
- **Popular Searches** - Search analytics
- **Quran Surahs/Ayahs** - Quran content

---

## Collection Split Strategy (Performance Optimization)

Topic data is split across 4 collections for query performance:

| Collection | Purpose |
|------------|---------|
| `topics` | Metadata, routing, SEO fields |
| `topic_content` | Content blocks, formulas, key terms, FAQs |
| `topic_assets` | Figures, tables, images |
| `topic_assessments` | MCQs, short questions, problems, activities, flashcards |

Plus flat indexes:
- `formula_index` — Cross-document formula search
- `slug_registry` — Canonical slug lookups
- `slug_redirects` — Historical URL redirects

---

## ID Prefix Conventions

All entities use nanoid prefixes for easy identification:

| Prefix | Entity |
|--------|--------|
| `doc_` | Documents |
| `top_` | Topics |
| `ing_` | Ingest jobs |
| `exp_` | Export jobs |
| `blk_` | Content blocks |
| `frm_` | Formulas |
| `fig_` | Figures |
| `mcq_` | Multiple choice questions |
| `ch_` | Chapters |
| `batch_` | Import batches |

---

## Key Design Principles

1. **Immutable IDs:** All entities use nanoid prefixes that never change
2. **Slug Redirects:** Slug changes create redirect entries, preventing 404s
3. **Version Control:** Re-ingestion creates new versions with `content_hash` diffing
4. **Zod Validation:** No malformed AI output reaches the database
5. **AEO-Native:** Every topic generates featured-snippet-ready answer blocks
6. **GEO-Native:** Entity extraction with source citations for AI crawlers
7. **Write Once, Publish Everywhere:** One pipeline → web, PDF, EPUB, LMS, API

---

## Critical Workflows

### Content Publishing Flow
```
JSON Payload → Zod Validation → BullMQ Queue → Worker Processing
→ MongoDB Storage → Index Building → Published API Available
```

### User Content Consumption Flow
```
Homepage → Search/Browse → Topic Page → Content Rendering
→ (Optional) Export → Download
```

### Admin Batch Import Flow
```
GitHub URL → Preview → Validate → Parallel Ingestion
→ Progress Tracking → Error Handling → Report Generation
```

---

## Performance Considerations

### Caching Strategy
- SWR (stale-while-revalidate) for most content
- Time-based caching for analytics data
- Permanent caching for static content (Quran, subjects)

### Loading Patterns
- Critical path: Blocking for initial render
- Parallel loading: Independent data fetches
- Lazy loading: Non-critical content below fold
- Prefetching: Next likely navigation targets

### Core Web Vitals Targets
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## SEO Capabilities

### Built-in Features
- Auto-generated JSON-LD structured data
- Dynamic meta tags per topic
- Breadcrumb schema markup
- FAQ schema for question sections
- XML sitemaps (auto-generated)
- AEO (Answer Engine Optimization) data
- GEO (Generative Engine Optimization) entity data

### Frontend Responsibilities
- Inject JSON-LD scripts on page load
- Render meta tags from API data
- Maintain semantic HTML structure
- Optimize images with alt text
- Implement proper heading hierarchy

---

## Global Slug Format

```
{country}-{curriculum}-{subject}-{grade}-ch{chapter}-{topic}
```

**Example:** `pk-pctb-phys-9-ch1-vernier-callipers`

---

## Statistics Summary

| Metric | Value |
|--------|-------|
| Total API Endpoints | 50+ |
| MongoDB Collections | 22 |
| Content Block Types | 17 |
| Frontend Screens | 16 |
| Reusable Components | 94 |
| User Roles | 4 (anonymous, free, premium, admin) |

---

## Related Execution Files

- [02-api-registry.md](./02-api-registry.md) — Complete API endpoint catalog
- [03-screen-registry.md](./03-screen-registry.md) — All screens/pages
- [04-component-registry.md](./04-component-registry.md) — Reusable components
- [05-data-models.md](./05-data-models.md) — Frontend TypeScript interfaces
- [06-navigation.md](./06-navigation.md) — Navigation flows
- [07-feature-registry.md](./07-feature-registry.md) — Features by module
- [08-dependency-map.md](./08-dependency-map.md) — Feature dependencies
- [09-open-questions.md](./09-open-questions.md) — Ambiguities and gaps
- [10-phase-planning-notes.md](./10-phase-planning-notes.md) — Raw planning notes

---

**This document serves as the entry point for all frontend execution work.**
**Always verify against source documents in docs/frontend-discovery/ and docs/frontend-blueprint/**
