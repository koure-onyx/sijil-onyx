# Sijil — Frontend Discovery: Form Dictionary

**Generated:** 2026-06-27  
**Source Files:** All files in `src/schemas/`

---

## Overview

Sijil uses **Zod v4** schemas for validation during document ingestion. These schemas define the exact structure, types, and constraints that incoming JSON payloads must satisfy before being stored in MongoDB.

**Key Schema Files:**
- `common.schema.js` — Shared utilities and base fields
- `documentIngest.schema.js` — Document-level ingestion schema
- `topicIngest.schema.js` — Topic-level ingestion schema (comprehensive)
- `blocks.schema.js` — Polymorphic content block schemas
- `formula.schema.js` — Formula validation
- `mcq.schema.js` — Multiple choice question validation

---

## Common Schemas

**File:** `src/schemas/common.schema.js`

### SlugSchema
```typescript
z.string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(80)
```
**Purpose:** Validates URL-friendly slugs  
**Format:** Lowercase alphanumeric with hyphens  
**Max Length:** 80 characters  
**Example:** `"vernier-callipers"`, `"chapter-1"`

---

### idSchema(prefix)
```typescript
z.string().regex(new RegExp(`^${prefix}_[a-z0-9]+$`))
```
**Purpose:** Higher-order function creating ID schemas with specific prefixes  
**Usage:**
- `idSchema('blk')` → Block IDs like `blk_x7k2m`
- `idSchema('frm')` → Formula IDs like `frm_a9b3c`
- `idSchema('mcq')` → MCQ IDs like `mcq_p4q8r`
- `idSchema('top')` → Topic IDs like `top_z1y2x`
- `idSchema('doc')` → Document IDs like `doc_m5n6o`
- `idSchema('ch')` → Chapter IDs like `ch_j3k4l`
- `idSchema('ing')` → Ingest IDs like `ing_w7v8u`
- `idSchema('fig')` → Figure IDs like `fig_t9s0r`
- `idSchema('tbl')` → Table IDs like `tbl_q1p2o`
- `idSchema('ex')` → Example IDs like `ex_n3m4l`
- `idSchema('cb')` → Callout IDs like `cb_k5j6i`
- `idSchema('faq')` → FAQ IDs like `faq_h7g8f`
- `idSchema('sq')` → Short question IDs like `sq_e9d0c`
- `idSchema('num')` → Numerical problem IDs like `num_b1a2z`
- `idSchema('act')` → Activity IDs like `act_y3x4w`
- `idSchema('fc')` → Flashcard IDs like `fc_v5u6t`

---

### PresentationProfileSchema
```typescript
z.object({
  visual_layer_type: z.string().default("standard_card"),
  theme_overrides: z.object({}).passthrough().default({}),
  animation_trigger: z.enum(["on-scroll", "on-load", "on-hover", "none"]).default("on-scroll"),
  tailwind_classes: z.string().default("")
})
```
**Purpose:** Validates design metadata for content blocks  
**Fields:**
| Field | Type | Default | Values |
|-------|------|---------|--------|
| `visual_layer_type` | String | `"standard_card"` | Any string |
| `theme_overrides` | Object | `{}` | Passthrough (any keys) |
| `animation_trigger` | Enum | `"on-scroll"` | on-scroll, on-load, on-hover, none |
| `tailwind_classes` | String | `""` | Tailwind CSS classes |

---

### BaseBlockFields
```typescript
{
  _id: idSchema('blk'),
  block_order: z.number().int().positive(),
  source_page: z.number().int().positive(),
  html: z.string().min(1),
  presentation_profile: PresentationProfileSchema
}
```
**Purpose:** Shared fields for all content block types  
**Usage:** Spread into each block schema via `{...BaseBlockFields}`

---

## Document Ingestion Schemas

**File:** `src/schemas/documentIngest.schema.js`

### CURRENT_SCHEMA_VERSION
```typescript
const CURRENT_SCHEMA_VERSION = "2.0.0"
```

---

### IngestMetadataSchema
```typescript
z.object({
  ingest_id: idSchema('ing'),
  engine: z.string().optional(),
  model_version: z.string().optional(),
  prompt_version: z.string().optional(),
  ingest_timestamp: z.string().optional(),
  processing_time_seconds: z.number().optional(),
  source_file_name: z.string().optional(),
  source_file_sha256: z.string().min(1),
  source_file_size_bytes: z.number().optional(),
  page_count: z.number().int().optional(),
  image_count: z.number().int().optional(),
  token_count_input: z.number().int().optional(),
  token_count_output: z.number().int().optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  warnings: z.array(z.string()).default([]),
  status: z.enum(["pending", "processing", "complete", "error"]).default("pending")
})
```

**Required Fields:**
- `ingest_id` — Must start with `ing_`
- `source_file_sha256` — Minimum 1 character

**Optional Fields with Defaults:**
- `warnings` → `[]`
- `status` → `"pending"`

**Constraints:**
- `confidence_score`: Min 0, Max 1

---

### AccessControlSchema
```typescript
z.object({
  is_premium: z.boolean().default(false),
  preview_percentage: z.number().min(0).max(100).default(100),
  paywall_trigger_elements: z.array(z.string()).default([]),
  allowed_roles: z.array(z.string()).default(["anonymous"])
})
```

**Fields:**
| Field | Type | Default | Constraints |
|-------|------|---------|-------------|
| `is_premium` | Boolean | `false` | - |
| `preview_percentage` | Number | `100` | Min: 0, Max: 100 |
| `paywall_trigger_elements` | [String] | `[]` | - |
| `allowed_roles` | [String] | `["anonymous"]` | - |

---

### DocumentMetaSchema
```typescript
z.object({
  _id: idSchema('doc'),
  document_id: z.string().min(1),
  title: z.string().min(1),
  title_vernacular: z.string().default(""),
  subtitle: z.string().default(""),
  document_type: z.string().optional(),
  subject: z.string().optional(),
  subject_slug: SlugSchema.optional(),
  grade_level: z.string().optional(),
  grade_numeric: z.number().optional(),
  language: z.string().default("english"),
  country: z.string().optional(),
  curriculum_standard: z.string().optional(),
  authors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  access_control: AccessControlSchema.default({})
})
```

**Required Fields:**
- `_id` — Must start with `doc_`
- `document_id` — Min 1 char
- `title` — Min 1 char

**Defaults:**
- `language` → `"english"`
- `title_vernacular`, `subtitle` → `""`
- `authors`, `tags` → `[]`

---

### ContainerSchema
```typescript
z.object({
  _id: idSchema('ch'),
  container_type: z.string().default("chapter"),
  number: z.number().int().positive(),
  display_label: z.string().optional(),
  title: z.string().min(1),
  slug: SlugSchema,
  page_range: z.object({ 
    start: z.number().int(), 
    end: z.number().int() 
  }).optional(),
  total_pages: z.number().int().optional()
})
```

**Required Fields:**
- `_id` — Must start with `ch_`
- `number` — Positive integer
- `title` — Min 1 char
- `slug` — Valid slug format

**Default:**
- `container_type` → `"chapter"`

---

### DocumentIngestSchema (Top-Level)
```typescript
z.object({
  schema_version: z.literal(CURRENT_SCHEMA_VERSION),
  schema_type: z.string().min(1),
  ingest_metadata: IngestMetadataSchema,
  document_metadata: DocumentMetaSchema,
  container: ContainerSchema,
  topics: z.array(TopicIngestSchema).min(1),
  type_specific_data: z.record(z.string(), z.any()).default({})
})
```

**Validation Rules:**
- `schema_version` — Must be exactly `"2.0.0"`
- `topics` — Must have at least 1 topic
- `type_specific_data` — Any key-value pairs, defaults to `{}`

---

## Topic Ingestion Schemas

**File:** `src/schemas/topicIngest.schema.js`

### LenientFormulaSchema
```typescript
FormulaSchema.partial({ latex: true, text: true })
```
**Purpose:** Allows partial formula data for secondary references

---

### KeyTermSchema
```typescript
z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  term_type: z.string().optional(),
  first_occurrence_page: z.number().int().optional(),
  related_terms: z.array(z.string()).default([])
})
```

---

### TopicContentExampleSchema
```typescript
z.object({
  _id: idSchema('ex').optional(),
  example_number: z.string(),
  title: z.string(),
  problem_text: z.string().min(1),
  solution_steps: z.array(z.string()).default([]),
  final_answer: z.string(),
  formula_used: z.string().optional(),
  source_page: z.number().int().optional()
})
```

---

### TopicContentCalloutSchema
```typescript
z.object({
  _id: idSchema('cb').optional(),
  variant: z.string(),
  title: z.string(),
  text: z.string().min(1),
  source_page: z.number().int().optional(),
  block_order_ref: z.number().int().optional()
})
```

---

### AIAnswerHubEntrySchema
```typescript
z.object({
  question_intent: z.string().min(1),
  answer_markdown: z.string().min(1),
  answer_plain: z.string().min(1),
  answer_type: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  citation: z.string().optional()
})
```

**Purpose:** AEO (Answer Engine Optimization) data for featured snippets

---

### FAQEntrySchema
```typescript
z.object({
  _id: idSchema('faq').optional(),
  question: z.string().min(1),
  answer: z.string().min(1),
  schema_type: z.string().default("FAQPage"),
  source_page: z.number().int().optional()
})
```

---

### CrossConceptLinkSchema
```typescript
z.object({
  target_entity: z.string().min(1),
  target_entity_id: z.string().nullable().default(null),
  slug_ref: z.string().min(1),
  fallback_anchor_text: z.string().optional(),
  relationship_type: z.string().optional(),
  resolved: z.boolean().default(false),
  resolved_url: z.string().nullable().default(null),
  context: z.string().optional()
})
```

---

### EntityExtractionSchema
```typescript
z.object({
  core_concepts: z.array(z.string()).default([]),
  scientific_laws: z.array(z.string()).default([]),
  historical_figures: z.array(z.string()).default([]),
  units_and_standards: z.array(z.string()).default([]),
  instruments_mentioned: z.array(z.string()).default([]),
  cross_concept_links: z.array(CrossConceptLinkSchema).default([])
})
```

---

### DownloadableOutputsSchema
```typescript
z.object({
  formula_pack: z.array(z.string()).default([]),
  cheat_sheet_summary: z.string().default(""),
  exam_hot_spots: z.array(z.string()).default([]),
  revision_notes_markdown: z.string().default("")
})
```

---

### SourceCitationSchema
```typescript
z.object({
  verbatim_quote: z.string().min(1),
  page_number: z.number().int(),
  context: z.string().optional()
})
```

---

### QuranDataSchema
```typescript
z.object({
  surah: z.number().int().min(1).max(114),
  ayah_start: z.number().int().positive(),
  ayah_end: z.number().int().positive(),
  surah_name_english: z.string(),
  juz: z.number().int().optional(),
  manzil: z.number().int().optional(),
  textbook_urdu_translation: z.string().min(1),
  word_alignments: z.array(z.object({
    position: z.number().int(),
    urdu_meaning: z.string(),
    grammar_note: z.string().nullable()
  })).default([]),
  tafsir_snippet: z.string().default("")
}).superRefine((data, ctx) => {
  const dataString = JSON.stringify(data);
  const arabicGlyphsRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  if (arabicGlyphsRegex.test(dataString)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "quran_data must not contain Arabic glyphs — Urdu only, position-based mapping required"
    });
  }
});
```

**Critical Constraint:** NO Arabic glyphs allowed — Urdu translation only

---

### TopicAssetFigureSchema
```typescript
z.object({
  _id: idSchema('fig'),
  figure_number: z.string(),
  caption: z.string().min(1),
  alt: z.string().min(1),
  source_page: z.number().int().optional(),
  image_path_local: z.string().min(1),
  render_strategy: z.enum(["image", "svg", "animation", "3d"]).default("image"),
  svg_code: z.string().default(""),
  animation_type: z.string().default(""),
  has_labels: z.boolean().default(false),
  label_descriptions: z.array(z.string()).default([]),
  unsplash_search_query: z.string().default(""),
  embedded_text_ocr: z.object({
    detected_languages: z.array(z.string()).default([]),
    extracted_strings: z.array(z.string()).default([])
  }).default({})
})
```

---

### TopicAssetTableSchema
```typescript
z.object({
  _id: idSchema('tbl'),
  table_number: z.string(),
  caption: z.string(),
  headers: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())),
  source_page: z.number().int().optional(),
  table_type: z.string().optional(),
  render_as: z.enum(["styled-table", "chart", "infographic"]).default("styled-table")
})
```

---

### BookMCQSchema
```typescript
MCQSchema.extend({
  mcq_id: idSchema('mcq')
})
```

---

### ShortQuestionSchema
```typescript
z.object({
  _id: idSchema('sq'),
  question_number: z.string(),
  question_text: z.string().min(1),
  model_answer: z.string().min(1),
  marks: z.number().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  source_page: z.number().int().optional()
})
```

---

### NumericalProblemSchema
```typescript
z.object({
  _id: idSchema('num'),
  problem_number: z.string(),
  problem_text: z.string().min(1),
  given: z.record(z.string(), z.string()).default({}),
  required: z.string().optional(),
  solution_steps: z.array(z.string()).default([]),
  final_answer: z.string().min(1),
  formula_used: z.string().optional(),
  diagram_required: z.boolean().default(false),
  marks: z.number().optional(),
  difficulty: z.string().optional(),
  source_page: z.number().int().optional()
})
```

---

### ActivitySchema
```typescript
z.object({
  _id: idSchema('act'),
  title: z.string().min(1),
  activity_type: z.string().optional(),
  apparatus: z.array(z.string()).default([]),
  procedure_steps: z.array(z.string()).default([]),
  precautions: z.array(z.string()).default([]),
  expected_result: z.string().default(""),
  source_page: z.number().int().optional()
})
```

---

### FlashcardSchema
```typescript
z.object({
  _id: idSchema('fc'),
  front: z.string().min(1),
  back: z.string().min(1),
  cloze: z.string().optional(),
  difficulty: z.string().optional()
})
```

---

### TopicIngestSchema (Comprehensive)
This is the main topic validation schema containing ALL topic-related fields.

**Core Identity:**
- `_id` — `idSchema('top')`
- `document_id`, `chapter_id` — Min 1 char
- `title` — Min 1 char
- `slug` — SlugSchema
- `slug_global` — Optional string

**Classification:**
- `topic_type` — Enum: `"content"`, `"exercise"`, `"intro"`, `"summary"`, `"quran"` (default: `"content"`)
- `difficulty` — Enum: `"easy"`, `"medium"`, `"hard"` (default: `"medium"`)
- `difficulty_score` — Number min:0, max:1

**SEO & GEO:**
- `seo` object with meta_title, meta_description, canonical_url, focus_keyword, keywords, breadcrumb, json_ld_types
- `geo` object with llm_summary, authoritative_source, citation_format, entity_name, entity_type, trustworthiness_signals, source_citations

**Design:**
```typescript
design_meta: z.object({
  primary_color_theme: z.string().optional().default(''),
  icon_suggestion: z.string().optional().default(''),
  layout_template: z.enum([
    "standard", "two-col", "formula-heavy", "image-heavy", "comparison"
  ]).default("standard"),
  animation_complexity: z.string().optional().default('')
})
```

**Content Arrays:**
- `content_blocks` — Array of ContentBlockSchema (min 1, NOT empty)
- `formulas` — Array of LenientFormulaSchema (default: [])
- `key_terms` — Array of KeyTermSchema (default: [])
- `examples` — Array of TopicContentExampleSchema (default: [])
- `callouts` — Array of TopicContentCalloutSchema (default: [])
- `ai_answer_hub` — Array of AIAnswerHubEntrySchema (default: [])
- `faq` — Array of FAQEntrySchema (default: [])
- `figures` — Array of TopicAssetFigureSchema (default: [])
- `tables` — Array of TopicAssetTableSchema (default: [])
- `book_mcqs` — Array of BookMCQSchema (default: [])
- `book_short_questions` — Array of ShortQuestionSchema (default: [])
- `book_problems` — Array of NumericalProblemSchema (default: [])
- `activities` — Array of ActivitySchema (default: [])
- `flashcards` — Array of FlashcardSchema (default: [])

**Special Fields:**
- `quran_data` — QuranDataSchema.nullable().default(null)
- `entity_extraction` — EntityExtractionSchema.default({})
- `downloadable_outputs` — DownloadableOutputsSchema.default({})

---

## Content Block Schemas

**File:** `src/schemas/blocks.schema.js`

All block schemas extend `BaseBlockFields` which includes:
- `_id: idSchema('blk')`
- `block_order: z.number().int().positive()`
- `source_page: z.number().int().positive()`
- `html: z.string().min(1)`
- `presentation_profile: PresentationProfileSchema`

### Block Types (Discriminated Union)

| Type | Schema | Key Fields |
|------|--------|------------|
| `heading` | HeadingBlockSchema | level (1-6), text, slug_anchor |
| `paragraph` | ParagraphBlockSchema | text, contains_formula, key_terms_in_text |
| `formula` | FormulaBlockSchema | formula_id, name, latex, text, formula_type, variables |
| `figure` | FigureBlockSchema | figure_id, figure_number, caption, alt, image_path_local, render_strategy |
| `table` | TableBlockSchema | table_id, headers, rows, render_as |
| `callout` | CalloutBlockSchema | callout_id, variant, title, text, icon |
| `mcq` | MCQBlockSchema | mcq_id, question_text, options, correct_answer |
| `example` | ExampleBlockSchema | example_id, problem_text, solution_steps, final_answer |
| `list` | ListBlockSchema | list_type (ordered/unordered), items |
| `definition` | DefinitionBlockSchema | term, definition_text |
| `learning_outcomes` | LearningOutcomesBlockSchema | outcomes (array) |
| `comparison_view` | ComparisonViewBlockSchema | headers, rows, design_hint |
| `quran_verse` | QuranVerseBlockSchema | surah, ayah, textbook_urdu_translation, word_alignments |
| `quran_reference` | QuranReferenceBlockSchema | surah, ayah_start, ayah_end, curriculum_id |
| `activity` | ActivityBlockSchema | title, apparatus, procedure_steps, precautions |
| `equation` | EquationBlockSchema | latex, text |
| `numerical` | NumericalBlockSchema | problem_text, given, required, solution_steps, final_answer |

### ContentBlockSchema (Discriminated Union)
```typescript
export const ContentBlockSchema = z.discriminatedUnion("type", [
  HeadingBlockSchema,
  ParagraphBlockSchema,
  FormulaBlockSchema,
  FigureBlockSchema,
  TableBlockSchema,
  CalloutBlockSchema,
  MCQBlockSchema,
  ExampleBlockSchema,
  ListBlockSchema,
  DefinitionBlockSchema,
  LearningOutcomesBlockSchema,
  ComparisonViewBlockSchema,
  QuranVerseBlockSchema,
  QuranReferenceBlockSchema,
  ActivityBlockSchema,
  EquationBlockSchema,
  NumericalBlockSchema
]);
```

---

## Formula Schema

**File:** `src/schemas/formula.schema.js`

### FormulaSchema
```typescript
z.object({
  formula_id: idSchema('frm').optional(),
  name: z.string().min(1),
  latex: z.string().min(1),
  text: z.string().min(1),
  formula_type: z.enum(["definition", "derivation", "law", "empirical"]),
  variables: z.array(z.object({
    symbol: z.string(),
    name: z.string(),
    unit: z.string().optional(),
    description: z.string().optional()
  })).default([]),
  source_page: z.number().int().positive().optional(),
  subject_area: z.string().optional(),
  block_order_ref: z.number().int().optional()
})
```

---

## MCQ Schema

**File:** `src/schemas/mcq.schema.js`

### MCQSchema
```typescript
z.object({
  mcq_id: idSchema('mcq').optional(),
  question_number: z.string().optional(),
  question_text: z.string().min(1),
  options: z.object({
    a: z.string(),
    b: z.string(),
    c: z.string(),
    d: z.string()
  }),
  correct_answer: z.enum(["a", "b", "c", "d"]),
  explanation: z.string().default(""),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  bloom_level: z.string().optional(),
  source_page: z.number().int().positive().optional(),
  past_paper_years: z.array(z.string()).default([])
})
```

---

## Validation Error Format

When Zod validation fails, errors are returned as:
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    {
      "code": "invalid_string",
      "message": "Invalid slug format",
      "path": ["topics", 0, "slug"]
    }
  ]
}
```

---

## Frontend Implications

### For Admin Import Forms
When building admin interfaces for batch imports or JSON ingestion:

1. **JSON Editor Validation:** Use Zod schemas client-side for pre-validation before submission
2. **Error Display:** Show field-specific errors using the `path` array from Zod errors
3. **Required Fields:** Highlight required fields based on `.required()` or absence of `.optional()`

### For Content Rendering
When rendering topic content on the frontend:

1. **Block Type Switching:** Use the `type` discriminator to render appropriate components
2. **LaTeX Rendering:** Integrate MathJax/KaTeX for `formula` and `equation` blocks
3. **Image Handling:** Support multiple `render_strategy` values (image, svg, animation)
4. **Interactive Elements:** Handle MCQs, activities, and flashcards as interactive components

### For SEO Implementation
The schemas include rich SEO/GEO/AEO fields:
- `seo.meta_title`, `seo.meta_description` → `<meta>` tags
- `seo.json_ld_types` → JSON-LD script generation
- `ai_answer_hub` → Featured snippet optimization
- `geo.entity_name` → Knowledge graph markup

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [02-api-inventory.md](./02-api-inventory.md) — API endpoints
- [03-model-dictionary.md](./03-model-dictionary.md) — MongoDB schemas
