# SIJIL - COMPLETE PROJECT BLUEPRINT (MASTER REFERENCE)

## ⚠️ CRITICAL: WHAT THIS PROJECT IS (AND IS NOT)

**SIJIL IS:** A Document Intelligence & Headless Publishing Engine for educational content
- Ingests textbooks, courses, SOPs using AI (Qwen 3.5 with 1M context)
- Converts to validated JSON with 17 content block types
- Serves via REST API with SEO/AEO/GEO optimization
- Supports Quran browsing, search, exports (PDF/EPUB)

**SIJIL IS NOT:** A certificate system, authentication platform, or user management system
- NO certificates, issuers, recipients
- NO public login/logout (only admin area has auth)
- NO user dashboards or profiles

---

## 📁 DOCS FOLDER STRUCTURE (44 FILES TOTAL)

### /docs/frontend-discovery/ (13 files) - WHAT TO BUILD
Defines business requirements extracted from backend code.

| File | Purpose | Key Content |
|------|---------|-------------|
| README.md | Master index | Quick start guide, system summary, architecture highlights |
| 01-project-overview.md | Business context | 10 document types, 9 major systems, 4 user roles, tech stack |
| 02-api-inventory.md | API reference | 50+ endpoints with request/response examples |
| 03-model-dictionary.md | Data schemas | 22 MongoDB collections with field definitions |
| 04-form-dictionary.md | Validation rules | Zod schemas for admin forms |
| 05-feature-inventory.md | Feature list | All features with frontend implications |
| 06-screen-inventory.md | UI requirements | 16 screens/pages to build |
| 07-user-flows.md | User journeys | Anonymous browsing, admin ingestion flows |
| 08-navigation-map.md | Site structure | URL routing tree |
| 09-component-inventory.md | Component catalog | 94 reusable components |
| 10-page-data-requirements.md | Data per page | Which APIs each page calls |
| 11-seo-requirements.md | SEO specs | JSON-LD, sitemaps, meta tags |
| 12-missing-information.md | Unknowns | Gaps requiring clarification |

### /docs/frontend-blueprint/ (15 files) - HOW TO BUILD
Architecture plans and implementation order.

| File | Purpose | Key Content |
|------|---------|-------------|
| 01-system-architecture.md | Tech architecture | Next.js 16, TanStack Query 5, Zustand 5, shadcn/ui |
| 02-route-architecture.md | Routing plan | App router structure, dynamic routes |
| 03-layout-architecture.md | Layout hierarchy | Root, feature, and page layouts |
| 04-feature-modules.md | Module breakdown | Documents, Topics, Search, Quran, Exports, Admin |
| 05-component-architecture.md | Component layers | UI, navigation, feedback, display, providers |
| 06-state-architecture.md | State strategy | Query cache vs Zustand stores |
| 07-api-layer.md | API client design | Base client, error handling, retry logic |
| 08-rendering-engine.md | Content renderer | 17 block types registry |
| 09-search-architecture.md | Search system | Filters, suggestions, trending |
| 10-admin-architecture.md | Admin panel | Ingestion, batch import, analytics |
| 11-seo-architecture.md | SEO implementation | Metadata, structured data, sitemaps |
| 12-build-order.md | Build sequence | 15 phases in dependency order |
| 13-folder-structure.md | File organization | Exact production folder tree |
| 14-implementation-phases.md | Phase gates | Deliverables per phase |
| 15-coverage-matrix.md | Traceability | Maps requirements to implementation |

### /docs/frontend-implementation/ (3 files) - CODING RULES
Standards and best practices.

| File | Purpose | Key Content |
|------|---------|-------------|
| README.md | Implementation index | Links to 12 detailed guides |
| 01-architecture-laws.md | Architectural rules | Layer separation, domain boundaries |
| 07-testing-guide.md | Testing strategy | Unit, integration, E2E patterns |

### /docs/project-management/ (10 files) - PROJECT TRACKING
Roadmaps and progress tracking.

| File | Purpose |
|------|---------|
| 00-technology-baseline.md | Approved tech versions |
| 01-master-roadmap.md | High-level timeline |
| 02-phase-registry.md | Phase definitions |
| 03-feature-registry.md | Feature backlog |
| 04-dependency-graph.md | Task dependencies |
| 05-progress-tracker.md | Current status |
| 06-review-checklist.md | QA checklist |
| 07-bug-triage.md | Bug prioritization |
| 08-session-handoff.md | Context transfer |
| 09-task-backlog.md | Pending tasks |

### /docs/task-packages/ (1 file) - CURRENT TASK
| File | Purpose |
|------|---------|
| FOUND-001.md | Foundation phase specification |

### /docs/validation/ (2 files) - QUALITY CHECKS
| File | Purpose |
|------|---------|
| dependency-audit.md | Package verification |
| found-001-tech-validation.md | Phase 1 tech validation |

---

## 🔑 CORE DATA MODELS (FROM 03-model-dictionary.md)

### Primary Entities
1. **Document** (`documents` collection)
   - ID prefix: `doc_`
   - Fields: title, subject, grade, document_type, language, chapter container
   - Example: Physics textbook for Grade 9

2. **Topic** (`topics` collection)
   - ID prefix: `top_`
   - Fields: slug_global, url_path, topic_type, difficulty, seo metadata
   - Example: "Vernier Callipers" chapter from Physics book

3. **Topic Content** (`topic_content` collection)
   - Contains: content_blocks (17 types), formulas, key_terms, FAQs
   - Polymorphic blocks: heading, paragraph, formula, figure, table, MCQ, etc.

4. **Topic Assets** (`topic_assets` collection)
   - Figures, tables, images with alt text and captions

5. **Topic Assessments** (`topic_assessments` collection)
   - MCQs, short questions, problems, activities, flashcards

### Supporting Entities
- **Formula Index** - Cross-document formula search
- **Export Jobs** - Background export processing
- **Ingest Queue** - Document ingestion tracking
- **Slug Registry** - URL redirect management
- **Popular Searches** - Search analytics
- **Quran Surahs/Ayahs** - Quran content

---

## 🏗️ BUILD ORDER (FROM 12-build-order.md)

### Phase 1: Foundation (CURRENT)
- Next.js 16 setup, TypeScript, Tailwind 4, shadcn/ui
- Core infrastructure: API client, Query client, Providers
- Primitive components: Button, Input, LatexRenderer

### Phase 2: API Layer
- API clients for all 9 systems (documents, topics, search, exports, Quran, etc.)
- Error handling, retry logic

### Phase 3: State Management
- Zustand stores (admin auth, export jobs, translation prefs)
- Custom hooks (useDebounce, useLocalStorage, usePaginationURL)

### Phase 4: Rendering Engine (CRITICAL)
- BlockRenderer.tsx - Registry for 17 block types
- All 17 block renderers: Heading, Paragraph, Formula, Figure, Table, Callout, MCQ, Example, List, Definition, LearningOutcomes, ComparisonView, QuranVerse, QuranReference, Activity, Equation, Numerical

### Phase 5: Shared Components
- Navigation: Header, Footer, Breadcrumb, Pagination
- Feedback: Spinner, ProgressBar, Alert, Modal, EmptyState, ErrorBoundary, Skeletons
- Display: DataTable, Badge, CodeBlock

### Phase 6-13: Feature Modules
- Documents module (browse by subject/grade)
- Topics module (content rendering with sidebar)
- Search module (filters, suggestions)
- Quran module (Surah/Ayah browser)
- Exports module (PDF/EPUB generation)
- SEO integration (JSON-LD, sitemaps)
- Admin module (ingestion, batch import, analytics)
- Homepage (widgets, popular topics)

### Phase 14-15: Testing & Deployment
- Unit/integration tests
- CI/CD pipeline

---

## 📂 CORRECT FOLDER STRUCTURE (FROM 13-folder-structure.md)

```
src/
├── app/
│   ├── layout.tsx, page.tsx
│   ├── documents/ [documentId]/ topics/ [topicId]/
│   ├── topics/ slug/ [...slug]/
│   ├── search/, subjects/, quran/, exports/
│   └── admin/ ingest/, import/, analytics/
│
├── components/
│   ├── ui/ (shadcn: button, card, input, etc.)
│   ├── navigation/ (Header, Footer, Breadcrumb)
│   ├── feedback/ (Spinner, Alert, Skeleton)
│   ├── display/ (DataTable, LatexRenderer)
│   └── providers/
│
└── features/
    ├── documents/ (components/, hooks/, types/)
    ├── topics/ (components/blocks/*, hooks/, types/)
    ├── search/ (components/, hooks/, types/)
    ├── quran/ (components/, hooks/, store/, types/)
    ├── exports/ (components/, hooks/)
    └── admin/ (components/, hooks/, store/)
```

---

## ❌ WRONG IMPLEMENTATIONS TO REMOVE

The following were incorrectly created (certificate system doesn't exist):
- `src/lib/api-types.ts` (has Certificate interfaces)
- `src/hooks/use-certificates.ts`
- `src/hooks/use-issuers.ts`
- `src/hooks/use-recipients.ts`
- `src/stores/auth-store.ts` (public frontend has no auth)
- `src/lib/validations/certificate.ts`
- `src/lib/validations/auth.ts`

## ✅ CORRECT IMPLEMENTATIONS NEEDED

Based on docs, these are the actual entities:
- `src/lib/types/topic.ts` - Topic interface
- `src/lib/types/document.ts` - Document interface
- `src/lib/types/block.ts` - 17 block type definitions
- `src/lib/types/formula.ts` - Formula interface
- `src/hooks/use-topic-tree.ts` - Topic navigation
- `src/hooks/use-document-loader.ts` - Document fetching
- `src/components/renderers/block-renderer.tsx` - 17 block types
- `src/features/search/hooks/use-search.ts` - Search functionality

---

## 🔧 TECHNOLOGY STACK (FROM 00-technology-baseline.md)

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

## 🎯 NEXT STEPS

1. **Delete wrong files** (certificate/auth system)
2. **Implement correct types** (Topic, Document, Block)
3. **Build rendering engine** (17 block types)
4. **Create search module** (Atlas Search integration)
5. **Build Quran browser** (Surah/Ayah navigation)
6. **Implement admin area** (ingestion forms)

---

## 📖 DOCUMENT RELATIONSHIPS

```
frontend-discovery/01-project-overview.md (Foundation)
    ↓
frontend-discovery/02-api-inventory.md + 03-model-dictionary.md (Technical specs)
    ↓
frontend-blueprint/12-build-order.md (Implementation sequence)
    ↓
frontend-blueprint/13-folder-structure.md (File organization)
    ↓
frontend-implementation/01-architecture-laws.md (Coding standards)
    ↓
project-management/01-master-roadmap.md (Timeline)
```

---

**This document serves as the single source of truth for building SIJIL frontend.**
**Always refer to /docs/ folder before implementing any feature.**
