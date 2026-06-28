# Sijil — Frontend Discovery: Model Dictionary

**Generated:** 2026-06-27  
**Source Files:** All files in `src/models/`

---

## Collection Overview

| Collection Name | Model File | Purpose | ID Type |
|-----------------|------------|---------|---------|
| `documents` | `document.model.js` | Source textbooks, curriculum frameworks | String (nanoid) |
| `topics` | `topic.model.js` | Topic metadata, routing, SEO | String (nanoid) |
| `topic_content` | `topicContent.model.js` | Content blocks, formulas, FAQs | String (nanoid) |
| `topic_assets` | `topicAsset.model.js` | Figures, tables, images | String (nanoid) |
| `topic_assessments` | `topicAssessment.model.js` | MCQs, questions, activities | String (nanoid) |
| `formula_index` | `formulaIndex.model.js` | Cross-document formula search | String (nanoid) |
| `export_jobs` | `exportJob.model.js` | Export job tracking | String (nanoid) |
| `export_policies` | `exportPolicy.model.js` | Export rules per document type | String |
| `ingest_queue` | `ingestQueue.model.js` | Ingestion job tracking | String (nanoid) |
| `import_batch` | `importBatch.model.js` | Batch import tracking | String |
| `audit_log` | `auditLog.model.js` | Admin action audit trail | ObjectId |
| `popular_topics` | `popularTopic.model.js` | Topic view analytics | String (nanoid) |
| `popular_searches` | `popularSearch.model.js` | Successful search queries | String (nanoid) |
| `failed_searches` | `failedSearch.model.js` | Failed search queries | String (nanoid) |
| `platform_stats` | `platformStats.model.js` | Global platform statistics | String (`global_stats`) |
| `slug_registry` | `slugRegistry.model.js` | Canonical slug mappings | String (nanoid) |
| `slug_redirects` | `slugRedirect.model.js` | Historical URL redirects | None (compound) |
| `unresolved_links` | `unresolvedLink.model.js` | Broken cross-references | ObjectId |
| `versions` | `version.model.js` | Version history snapshots | ObjectId |
| `asset_registry` | `assetRegistry.model.js` | Local file system references | String (nanoid) |
| `quran_surahs` | `quranSurah.model.js` | Quran surah metadata | ObjectId |
| `quran_ayahs` | `quranAyah.model.js` | Quran ayah text | ObjectId |

---

## documents

**File:** `src/models/document.model.js`  
**Collection:** `documents`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix: `doc_` |
| `title` | String | No | - | - | Document title |
| `slug` | String | No | - | - | URL-friendly identifier |
| `schema_version` | String | No | `"2.0.0"` | - | Schema version |
| `schema_type` | String | Yes | - | - | Type of document schema |
| `ingest_metadata` | Subdocument | No | - | - | Ingestion tracking |
| `ingest_metadata.ingest_id` | String | Yes | - | - | Unique ingestion ID |
| `ingest_metadata.source_file_sha256` | String | No | - | Yes | File hash |
| `ingest_metadata.status` | String | No | `"pending"` | - | Enum: pending, processing, complete, error |
| `ingest_metadata.zod_validation_passed` | Boolean | No | `false` | - | Validation status |
| `document_metadata` | Subdocument | No | - | - | Document metadata |
| `document_metadata._id` | String | Yes | - | - | Document ID |
| `document_metadata.document_id` | String | Yes | - | Yes | Indexed reference |
| `document_metadata.title` | String | Yes | - | - | Title |
| `document_metadata.subject` | String | No | - | Yes | Subject area |
| `document_metadata.subject_slug` | String | No | - | Yes | Subject slug |
| `document_metadata.grade_numeric` | Number | No | - | Yes | Numeric grade |
| `document_metadata.document_type` | String | No | - | - | Document type |
| `document_metadata.language` | String | No | `"english"` | - | Language code |
| `document_metadata.script_direction` | String | No | `"ltr"` | - | Enum: ltr, rtl |
| `document_metadata.access_control.is_premium` | Boolean | No | `false` | - | Premium flag |
| `document_metadata.access_control.allowed_roles` | [String] | No | `["anonymous"]` | - | Allowed roles |
| `container` | Subdocument | No | - | - | Chapter info |
| `container._id` | String | Yes | - | - | Container ID |
| `container.container_type` | String | No | `"chapter"` | - | Container type |
| `container.number` | Number | Yes | - | - | Chapter number |
| `container.title` | String | Yes | - | - | Chapter title |
| `container.slug` | String | Yes | - | - | Chapter slug |
| `topic_refs` | [Subdocument] | No | - | - | Topic references |
| `topic_refs.slug_global` | String | Yes | - | Yes | Global slug |
| `document_aggregates` | Subdocument | No | - | - | Aggregated counts |
| `seo_master` | Subdocument | No | - | - | SEO metadata |
| `publishing.status` | String | No | `"draft"` | Yes | Enum: draft, processing, published |
| `version_control.is_latest` | Boolean | No | `true` | - | Latest version flag |
| `type_specific_data` | Mixed | No | `{}` | - | Type-specific data |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `document_metadata.subject` + `document_metadata.grade_numeric` (compound)
- `ingest_metadata.source_file_sha256`
- `document_metadata.document_id`
- `topic_refs.slug_global`
- `publishing.status`

---

## topics

**File:** `src/models/topic.model.js`  
**Collection:** `topics`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix: `top_` |
| `document_id` | String | Yes | - | Yes | Parent document ID |
| `chapter_id` | String | Yes | - | - | Parent chapter ID |
| `parent_topic_id` | String | No | `null` | - | Parent topic for nesting |
| `title` | String | Yes | - | - | Topic title |
| `title_vernacular` | String | No | `""` | - | Vernacular title |
| `slug` | String | Yes | - | - | Local slug |
| `slug_global` | String | Yes | - | Yes, Unique | Global unique slug |
| `url_path` | String | Yes | - | - | Full URL path |
| `section_number` | String | No | - | - | Section number |
| `display_order` | Number | No | `0` | - | Display order |
| `topic_type` | String | No | `"content"` | Yes | Enum: content, exercise, intro, summary, quran |
| `difficulty` | String | No | `"medium"` | - | Enum: easy, medium, hard |
| `difficulty_score` | Number | No | - | Yes | Min: 0, Max: 1 |
| `estimated_read_time_minutes` | Number | No | - | - | Read time estimate |
| `bloom_level` | String | No | - | - | Bloom taxonomy level |
| `subject` | String | No | - | Yes | Subject area |
| `grade_numeric` | Number | No | - | Yes | Numeric grade |
| `language` | String | No | `"english"` | - | Language code |
| `locale` | String | No | `"en"` | Yes | Locale code |
| `publishing_status` | String | No | `"draft"` | Yes | Enum: draft, processing, published |
| `keywords` | [String] | No | - | - | SEO keywords |
| `key_terms_preview` | [String] | No | - | - | Key terms preview |
| `formula_count` | Number | No | `0` | - | Formula count |
| `figure_count` | Number | No | `0` | - | Figure count |
| `mcq_count` | Number | No | `0` | - | MCQ count |
| `has_interactive` | Boolean | No | `false` | - | Has interactive elements |
| `source_page_start` | Number | No | - | - | Source page start |
| `source_page_end` | Number | No | - | - | Source page end |
| `seo` | Subdocument | No | - | - | SEO metadata |
| `geo` | Subdocument | No | - | - | GEO metadata |
| `design_meta.layout_template` | String | No | `"standard"` | - | Enum: standard, two-col, formula-heavy, image-heavy, comparison |
| `is_latest` | Boolean | No | `true` | Yes | Latest version |
| `is_archived` | Boolean | No | `false` | Yes | Archived flag |
| `archived_at` | Date | No | `null` | - | Archive timestamp |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `slug_global` (unique)
- `document_id` + `is_latest` (compound)
- `document_id` + `is_archived` (compound)
- `subject` + `grade_numeric` (compound)
- `difficulty_score`
- `topic_type`
- `publishing_status`
- `locale`
- `is_latest`
- `is_archived`

---

## topic_content

**File:** `src/models/topicContent.model.js`  
**Collection:** `topic_content`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `document_id` | String | Yes | - | Yes | Document reference |
| `raw_text` | String | No | - | - | Raw extracted text |
| `clean_html` | String | No | - | - | Clean HTML content |
| `content_blocks` | [Mixed] | No | `[]` | - | Polymorphic content blocks |
| `formulas` | [Subdocument] | No | - | - | Formula array |
| `formulas.formula_id` | String | Yes | - | - | Formula ID |
| `formulas.latex` | String | No | - | - | LaTeX representation |
| `key_terms` | [Subdocument] | No | - | - | Key terms array |
| `examples` | [Subdocument] | No | - | - | Example array |
| `callouts` | [Subdocument] | No | - | - | Callout boxes |
| `ai_answer_hub` | [Subdocument] | No | - | - | AEO answer blocks |
| `faq` | [Subdocument] | No | - | - | FAQ entries |
| `entity_extraction` | Subdocument | No | - | - | Extracted entities |
| `downloadable_outputs` | Subdocument | No | - | - | Export outputs |
| `source_citations` | [Subdocument] | No | - | - | Source citations |
| `quran_data` | Mixed | No | `null` | - | Quran data (Urdu only, no Arabic glyphs) |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `topic_id`
- `document_id`

### Pre-validate Hook
Prevents Arabic glyphs in `quran_data` field (Urdu translation only)

---

## topic_assets

**File:** `src/models/topicAsset.model.js`  
**Collection:** `topic_assets`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `document_id` | String | Yes | - | Yes | Document reference |
| `figures` | [Subdocument] | No | - | - | Figure array |
| `figures.figure_number` | String | No | - | - | Figure number |
| `figures.caption` | String | No | - | - | Figure caption |
| `figures.alt` | String | No | - | - | Alt text |
| `figures.image_url` | String | No | `""` | - | Image URL |
| `figures.render_strategy` | String | No | `"image"` | - | Enum: image, svg, animation, 3d |
| `figures.svg_code` | String | No | `""` | - | SVG markup |
| `tables` | [Subdocument] | No | - | - | Table array |
| `tables.table_number` | String | No | - | - | Table number |
| `tables.caption` | String | No | - | - | Table caption |
| `tables.headers` | [String] | No | - | - | Table headers |
| `tables.rows` | [[String]] | No | - | - | Table rows |
| `tables.render_as` | String | No | `"styled-table"` | - | Enum: styled-table, chart, infographic |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `topic_id`
- `document_id`

---

## topic_assessments

**File:** `src/models/topicAssessment.model.js`  
**Collection:** `topic_assessments`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `document_id` | String | Yes | - | Yes | Document reference |
| `book_mcqs` | [Subdocument] | No | - | - | MCQ array |
| `book_mcqs.correct_answer` | String | No | - | - | Enum: a, b, c, d |
| `book_mcqs.difficulty` | String | No | - | - | Enum: easy, medium, hard |
| `book_short_questions` | [Subdocument] | No | - | - | Short questions |
| `book_problems` | [Subdocument] | No | - | - | Numerical problems |
| `activities` | [Subdocument] | No | - | - | Lab activities |
| `flashcards` | [Subdocument] | No | - | - | Flashcard deck |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `topic_id`
- `document_id`

---

## formula_index

**File:** `src/models/formulaIndex.model.js`  
**Collection:** `formula_index`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `name` | String | No | - | - | Formula name |
| `latex` | String | No | - | - | LaTeX representation |
| `text` | String | No | - | - | Text representation |
| `latex_normalized` | String | No | - | - | Normalized for fuzzy matching |
| `variables` | [String] | No | - | - | Extracted variables |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `document_id` | String | No | - | Yes | Document reference |
| `subject` | String | No | - | Yes | Subject area |
| `grade` | Number | No | - | - | Grade level |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |

### Indexes
- `topic_id`
- `document_id`
- `subject`

---

## export_jobs

**File:** `src/models/exportJob.model.js`  
**Collection:** `export_jobs`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix: `exp_` |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `format` | String | Yes | - | - | Enum: formula_pack, mcq_pack, revision_pack, offline_html, flashcard_pack, topic_pack |
| `status` | String | No | `"pending"` | Yes | Enum: pending, processing, complete, error |
| `output_url` | String | No | `""` | - | Output file URL |
| `document_type` | String | No | `""` | - | Document type |
| `package_url` | String | No | `""` | - | Package download URL |
| `source_content_hash` | String | No | `""` | - | For staleness check |
| `is_stale` | Boolean | No | `false` | - | Staleness flag |
| `attempts` | Number | No | `0` | - | Retry attempts |
| `error_log` | [Mixed] | No | `[]` | - | Error log |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |
| `completed_at` | Date | No | `null` | - | Completion timestamp |
| `updated_at` | Date | No | `Date.now` | - | Update timestamp |

### Indexes
- `topic_id`
- `status`

---

## export_policies

**File:** `src/models/exportPolicy.model.js`  
**Collection:** `export_policies`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | Document type key |
| `document_type` | String | Yes | - | Yes, Unique | Enum: textbook, course, sop, legal, kyc_onboarding, research_paper, manual, finance, curriculum, reference |
| `allowed_export_types` | [String] | No | `[]` | - | Enum values from format field |
| `disallow_full_book` | Boolean | No | `true` | Immutable | Prevent full book export |
| `max_topics_per_export` | Number | No | `5` | - | Max topics limit |
| `notes` | String | No | `""` | - | Policy notes |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |
| `updated_at` | Date | No | `Date.now` | - | Update timestamp |

### Indexes
- `document_type` (unique)

---

## ingest_queue

**File:** `src/models/ingestQueue.model.js`  
**Collection:** `ingest_queue`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix: `ing_` |
| `source_file_name` | String | Yes | - | - | Original filename |
| `source_file_sha256` | String | Yes | - | Yes, Unique | File hash |
| `document_id` | String | No | - | Yes | Document reference |
| `bullmq_job_id` | String | No | - | - | BullMQ job ID |
| `status` | String | No | `"pending"` | Yes | Enum: pending, processing, complete, error, duplicate |
| `attempts` | Number | No | `0` | - | Retry attempts |
| `source` | String | No | - | - | Ingestion source |
| `processing_summary` | Mixed | No | - | - | Processing summary |
| `error_log` | [Mixed] | No | `[]` | - | Error log |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |
| `updated_at` | Date | No | `Date.now` | - | Update timestamp |
| `completed_at` | Date | No | `null` | - | Completion timestamp |
| `processing_time_seconds` | Number | No | - | - | Processing duration |

### Indexes
- `source_file_sha256` (unique)
- `document_id`
- `status`

---

## import_batch

**File:** `src/models/importBatch.model.js`  
**Collection:** `import_batch`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `batch_id` | String | Yes | - | Yes, Unique | Batch identifier |
| `repo_url` | String | Yes | - | - | GitHub repo URL |
| `repo_owner` | String | Yes | - | - | Repo owner |
| `repo_name` | String | Yes | - | - | Repo name |
| `commit_sha` | String | Yes | - | Yes | Commit SHA |
| `source_type` | String | No | `"book"` | - | Enum: book, textbook, sop, manual, research_paper |
| `status` | String | No | `"PENDING"` | Yes | Enum: PENDING, SCANNING, VALIDATING, READY, IMPORTING, COMPLETED, FAILED, PARTIAL_SUCCESS |
| `total_documents` | Number | No | `0` | - | Total documents |
| `imported_documents` | Number | No | `0` | - | Imported count |
| `failed_documents` | Number | No | `0` | - | Failed count |
| `successful_files` | [Subdocument] | No | - | - | Successful file list |
| `failed_files` | [Subdocument] | No | - | - | Failed file list |
| `warnings` | [Subdocument] | No | - | - | Warning list |
| `errors` | [Subdocument] | No | - | - | Error list |
| `report` | Mixed | No | `null` | - | Final report |
| `progress` | Subdocument | No | - | - | Progress tracking per stage |
| `started_at` | Date | No | `null` | - | Start timestamp |
| `completed_at` | Date | No | `null` | - | Completion timestamp |
| `createdAt` | Date | Auto | - | - | Created timestamp |
| `updatedAt` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `batch_id` (unique)
- `repo_owner` + `repo_name` (compound)
- `status` + `createdAt` (compound)
- `commit_sha`

---

## audit_log

**File:** `src/models/auditLog.model.js`  
**Collection:** `auditlogs`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | ObjectId | Auto | - | Yes (primary) | MongoDB ObjectId |
| `action` | String | Yes | - | Yes | Enum: IMPORT_PREVIEW, IMPORT_START, IMPORT_CANCEL, IMPORT_RETRY, INGEST_JSON, INGEST_CANCEL, INGEST_RETRY |
| `admin_id` | String | No | `"bootstrap_admin"` | - | Actor ID |
| `admin_email` | String | No | `null` | - | Actor email |
| `batch_id` | String | No | `null` | Yes | Batch reference |
| `ingest_id` | String | No | `null` | - | Ingest reference |
| `document_id` | String | No | `null` | - | Document reference |
| `ip_address` | String | No | `null` | - | Request IP |
| `user_agent` | String | No | `null` | - | User agent |
| `input_data` | Mixed | No | `null` | - | Request payload |
| `result` | String | Yes | - | - | Enum: success, failure, partial |
| `error_message` | String | No | `null` | - | Error details |
| `metadata` | Mixed | No | `null` | - | Additional context |
| `createdAt` | Date | Auto | - | - | Created timestamp |
| `updatedAt` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `action`
- `batch_id`
- `action` + `createdAt` (compound)
- `batch_id` + `createdAt` (compound)
- `admin_id` + `createdAt` (compound)

---

## popular_topics

**File:** `src/models/popularTopic.model.js`  
**Collection:** `popular_topics`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `topic_id` | String | Yes | - | Yes | Topic reference |
| `view_count` | Number | No | `0` | - | Total views |
| `search_hit_count` | Number | No | `0` | - | Search hits |
| `last_30_days_views` | Number | No | `0` | - | Recent views |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `topic_id`

---

## popular_searches

**File:** `src/models/popularSearch.model.js`  
**Collection:** `popular_searches`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `query` | String | Yes | - | - | Search query |
| `count` | Number | No | `0` | - | Search count |
| `last_searched` | Date | No | `Date.now` | - | Last search time |
| `top_result_id` | String | No | `null` | - | Top result ID |

---

## failed_searches

**File:** `src/models/failedSearch.model.js`  
**Collection:** `failed_searches`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `query` | String | Yes | - | - | Failed query |
| `count` | Number | No | `0` | - | Failure count |
| `last_searched` | Date | No | `Date.now` | - | Last search time |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |

---

## platform_stats

**File:** `src/models/platformStats.model.js`  
**Collection:** `platform_stats`

### Singleton Document
Always has exactly ONE document with `_id: 'global_stats'`

### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `_id` | String | No | `"global_stats"` | Fixed ID |
| `counts_by_type` | Mixed | No | `{}` | Per document_type counts |
| `total_documents` | Number | No | `0` | Total count |
| `total_topics` | Number | No | `0` | Total count |
| `total_formulas` | Number | No | `0` | Total count |
| `total_mcqs` | Number | No | `0` | Total count |
| `total_assets` | Number | No | `0` | Total count |
| `recent_arrivals` | [Subdocument] | No | - | Last 10 arrivals |
| `last_updated` | Date | No | `Date.now` | Last update |
| `last_ingested_at` | Date | No | `null` | Last ingestion |

---

## slug_registry

**File:** `src/models/slugRegistry.model.js`  
**Collection:** `slug_registry`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `slug` | String | Yes | - | Yes, Unique | Local slug |
| `slug_global` | String | No | - | Yes | Global slug |
| `document_id` | String | No | - | Yes | Document reference |
| `topic_id` | String | No | `null` | - | Topic reference |
| `entity_type` | String | Yes | - | - | Enum: document, chapter, topic |
| `url_path` | String | Yes | - | - | Full URL path |
| `title_normalized` | String | Yes | - | Yes | Normalized title |
| `created_at` | Date | Auto | - | - | Created timestamp |
| `updated_at` | Date | Auto | - | - | Updated timestamp |

### Indexes
- `slug` (unique)
- `slug_global`
- `document_id`
- `title_normalized`

---

## slug_redirects

**File:** `src/models/slugRedirect.model.js`  
**Collection:** `slug_redirects`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `entity_id` | String | Yes | - | Yes | Entity reference |
| `old_slug` | String | Yes | - | - | Old slug |
| `new_slug` | String | Yes | - | - | New slug |
| `old_url_path` | String | Yes | - | - | Old URL |
| `new_url_path` | String | Yes | - | - | New URL |
| `redirect_type` | String | No | `"301"` | - | Redirect type |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |

### Indexes
- `entity_id`

---

## unresolved_links

**File:** `src/models/unresolvedLink.model.js`  
**Collection:** `unresolved_links`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `slug_ref` | String | Yes | - | - | Slug reference |
| `source_topic_id` | String | Yes | - | Yes | Source topic |
| `reviewed` | Boolean | No | `false` | Yes | Review status |
| `reviewed_at` | Date | No | `null` | - | Review timestamp |
| `notes` | String | No | `""` | - | Review notes |
| `created_at` | Date | No | `Date.now` | - | Creation timestamp |

### Indexes
- `source_topic_id`
- `reviewed`

---

## versions

**File:** `src/models/version.model.js`  
**Collection:** `versions`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `scope` | String | Yes | - | - | Enum: document, topic |
| `entity_id` | String | Yes | - | Yes | Entity reference |
| `document_id` | String | Yes | - | Yes | Document reference |
| `version` | String | Yes | - | - | Version string |
| `parent_version_id` | String | No | `null` | - | Parent version |
| `diff_summary` | String | No | `""` | - | Change summary |
| `snapshot_ref` | String | No | `""` | - | Snapshot reference |
| `timestamp` | Date | No | `Date.now` | - | Version timestamp |

### Indexes
- `entity_id`
- `document_id`

---

## asset_registry

**File:** `src/models/assetRegistry.model.js`  
**Collection:** `asset_registry`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `_id` | String | Yes | - | Yes (primary) | nanoid prefix |
| `type` | String | Yes | - | - | Enum: figure, table_export, document_cover, thumbnail, export_output, other |
| `topic_id` | String | No | `null` | Yes | Topic reference |
| `document_id` | String | No | - | Yes | Document reference |
| `local_path` | String | Yes | - | Yes, Unique | File system path |
| `render_strategy` | String | No | `"image"` | - | Render strategy |
| `sha256` | String | No | - | Yes | File hash |
| `file_size_bytes` | Number | No | - | - | File size |
| `uploaded_at` | Date | No | `Date.now` | - | Upload timestamp |

### Indexes
- `topic_id`
- `document_id`
- `local_path` (unique)
- `sha256`

---

## quran_surahs

**File:** `src/models/quranSurah.model.js`  
**Collection:** `quran_surahs`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `surah_number` | Number | Yes | - | Yes | Min: 1, Max: 114 |
| `name_arabic` | String | Yes | - | - | Arabic name |
| `name_english` | String | Yes | - | - | English name |
| `name_urdu` | String | No | `""` | - | Urdu name |
| `name_transliteration` | String | No | `""` | - | Transliteration |
| `total_ayahs` | Number | Yes | - | - | Total ayahs |
| `revelation_type` | String | No | - | - | Enum: Meccan, Medinan |
| `juz_start` | Number | No | - | - | Juz start |
| `_seeded_at` | Date | No | `Date.now` | - | Seeding timestamp |
| `_source` | String | No | `"quran.com/api/v4"` | - | Data source |

### Indexes
- `surah_number`

---

## quran_ayahs

**File:** `src/models/quranAyah.model.js`  
**Collection:** `quran_ayahs`

### Fields

| Field | Type | Required | Default | Indexed | Notes |
|-------|------|----------|---------|---------|-------|
| `surah` | Number | Yes | - | Yes | Min: 1, Max: 114 |
| `ayah` | Number | Yes | - | Yes | Min: 1 |
| `text_uthmani` | String | Yes | - | - | Uthmani text |
| `translation_ur` | String | No | `""` | - | Urdu translation |
| `translation_en` | String | No | `""` | - | English translation |
| `juz` | Number | No | - | - | Juz number |
| `page` | Number | No | - | - | Page number |
| `hizb` | Number | No | - | - | Hizb number |
| `ruku` | Number | No | - | - | Ruku number |
| `_seeded_at` | Date | No | `Date.now` | - | Seeding timestamp |
| `_source` | String | No | `"quran.com/api/v4"` | - | Data source |

### Indexes
- `surah` + `ayah` (compound, unique)

---

## ID Prefix Conventions

All nanoid-based IDs follow these prefixes:

| Prefix | Entity Type | Collection |
|--------|-------------|------------|
| `doc_` | Document | `documents` |
| `top_` | Topic | `topics` |
| `ch_` | Chapter/Container | Embedded in documents |
| `ing_` | Ingest Job | `ingest_queue` |
| `exp_` | Export Job | `export_jobs` |
| `blk_` | Content Block | Embedded in topic_content |
| `frm_` | Formula | `formula_index`, embedded |
| `fig_` | Figure | `topic_assets`, embedded |
| `tbl_` | Table | `topic_assets`, embedded |
| `mcq_` | MCQ | `topic_assessments`, embedded |
| `ex_` | Example | Embedded |
| `cb_` | Callout | Embedded |
| `faq_` | FAQ | Embedded |
| `sq_` | Short Question | Embedded |
| `num_` | Numerical Problem | Embedded |
| `act_` | Activity | Embedded |
| `fc_` | Flashcard | Embedded |

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [02-api-inventory.md](./02-api-inventory.md) — API endpoints
- [04-form-dictionary.md](./04-form-dictionary.md) — Zod validation schemas
