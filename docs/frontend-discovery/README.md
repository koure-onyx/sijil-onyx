# Sijil — Frontend Source of Truth

**Generated:** 2026-06-27  
**Audit Type:** Full Backend Reverse Engineering  
**Status:** Complete

---

## Purpose

This documentation set serves as the **complete Frontend Source of Truth** for the Sijil platform. A frontend developer can build the entire frontend application using only these documents without opening any backend code.

---

## Document Index

### Core Documentation

| # | Document | Purpose | Audience |
|---|----------|---------|----------|
| [01](./01-project-overview.md) | [Project Overview](./01-project-overview.md) | Business context, architecture summary, user roles | All team members |
| [02](./02-api-inventory.md) | [API Inventory](./02-api-inventory.md) | Complete endpoint catalog with request/response examples | Frontend developers |
| [03](./03-model-dictionary.md) | [Model Dictionary](./03-model-dictionary.md) | MongoDB collection schemas, field types, indexes | Data architects |
| [04](./04-form-dictionary.md) | [Form Dictionary](./04-form-dictionary.md) | Zod validation schemas for ingestion forms | Admin UI developers |

### Feature & Screen Documentation

| # | Document | Purpose | Audience |
|---|----------|---------|----------|
| [05](./05-feature-inventory.md) | [Feature Inventory](./05-feature-inventory.md) | Feature breakdown with frontend implications | Product managers |
| [06](./06-screen-inventory.md) | [Screen Inventory](./06-screen-inventory.md) | All required screens/pages with data needs | UX designers |
| [07](./07-user-flows.md) | [User Flows](./07-user-flows.md) | Complete user journey documentation | UX designers |
| [08](./08-navigation-map.md) | [Navigation Map](./08-navigation-map.md) | Site navigation tree and routing structure | Frontend developers |

### Implementation Documentation

| # | Document | Purpose | Audience |
|---|----------|---------|----------|
| [09](./09-component-inventory.md) | [Component Inventory](./09-component-inventory.md) | Reusable component catalog (94 components) | Frontend developers |
| [10](./10-page-data-requirements.md) | [Page Data Requirements](./10-page-data-requirements.md) | Per-page API calls, caching strategies | Frontend developers |
| [11](./11-seo-requirements.md) | [SEO Requirements](./11-seo-requirements.md) | SEO/AEO/GEO implementation guide | SEO specialists |
| [12](./12-missing-information.md) | [Missing Information](./12-missing-information.md) | Unknowns requiring clarification | Project leads |

---

## Quick Start Guide

### For Frontend Developers

1. **Start Here:** Read [01-project-overview.md](./01-project-overview.md) for context
2. **API Reference:** Use [02-api-inventory.md](./02-api-inventory.md) for endpoint details
3. **Screens to Build:** See [06-screen-inventory.md](./06-screen-inventory.md) for page list
4. **Components:** Reference [09-component-inventory.md](./09-component-inventory.md) for reusable UI
5. **Data Needs:** Check [10-page-data-requirements.md](./10-page-data-requirements.md) for each page's APIs
6. **Unknowns:** Review [12-missing-information.md](./12-missing-information.md) for clarification needs

### For Designers

1. **User Flows:** Study [07-user-flows.md](./07-user-flows.md) for interaction patterns
2. **Navigation:** Use [08-navigation-map.md](./08-navigation-map.md) for site structure
3. **Screens:** Reference [06-screen-inventory.md](./06-screen-inventory.md) for screen list

### For Project Managers

1. **Features:** Review [05-feature-inventory.md](./05-feature-inventory.md) for scope
2. **Gaps:** Monitor [12-missing-information.md](./12-missing-information.md) for blockers
3. **SEO:** Share [11-seo-requirements.md](./11-seo-requirements.md) with SEO team

---

## System Summary

### What is Sijil?

Sijil is a **Document Intelligence & Headless Publishing Engine** that:
- Ingests educational documents (textbooks, courses, SOPs) using AI
- Converts them to validated JSON with rich semantic structure
- Splits content into performance-optimized MongoDB collections
- Provides RESTful APIs for frontend consumption
- Generates exports (PDF, EPUB, flashcards, formula packs)
- Includes full SEO/AEO/GEO optimization

### Key Statistics

| Metric | Value |
|--------|-------|
| Total API Endpoints | 50+ |
| MongoDB Collections | 22 |
| Content Block Types | 17 |
| Frontend Screens | 16 |
| Reusable Components | 94 |
| User Roles | 4 (anonymous, free, premium, admin) |

### Technology Stack

| Layer | Technology |
|-------|------------|
| Backend Runtime | Node.js (ES Modules) |
| Web Framework | Express v5 |
| Database | MongoDB (Mongoose v9) |
| Queue | BullMQ v5 + Redis |
| Validation | Zod v4 |
| Search | MongoDB Atlas Search |

---

## Architecture Highlights

### Collection Split Strategy

Topic data is split across 4 collections for query performance:
- `topics` — Metadata, routing, SEO fields
- `topic_content` — Content blocks, formulas, FAQs
- `topic_assets` — Figures, tables, images
- `topic_assessments` — MCQs, questions, activities

### ID Prefix Conventions

All entities use nanoid prefixes for easy identification:
- `doc_` — Documents
- `top_` — Topics
- `ing_` — Ingest jobs
- `exp_` — Export jobs
- `blk_` — Content blocks
- `frm_` — Formulas
- `fig_` — Figures
- `mcq_` — Multiple choice questions

### Slug Management

- Slugs are auto-generated during ingestion
- Slug changes create redirect entries (no 404s)
- Global slug format: `{country}-{curriculum}-{subject}-{grade}-ch{chapter}-{topic}`
- Example: `pk-pctb-phys-9-ch1-vernier-callipers`

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

## Security Notes

### Authentication
- Public endpoints require no authentication
- Admin endpoints use `requireAdmin` middleware
- Authentication via `X-Admin-ID` header or bootstrap admin

### Protected Routes
- `/api/ingest/*` — Document ingestion
- `/api/admin/import/*` — Batch import operations

### Public Routes
- All content viewing, search, export, and SEO endpoints

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

## Known Gaps

See [12-missing-information.md](./12-missing-information.md) for complete list.

**Critical Items:**
1. Admin authentication flow details
2. Image serving configuration
3. Frontend framework decision
4. Multi-language requirements
5. Accessibility compliance level

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-27 | Initial complete audit |

---

## Contact & Support

For questions about this documentation:
- Review the source backend code in `/workspace/sijil/src/`
- Check individual document "Related Documents" sections
- Consult missing information list for known gaps

---

## Document Relationships

```
01-project-overview.md (Foundation)
    ↓
02-api-inventory.md + 03-model-dictionary.md (Technical specs)
    ↓
04-form-dictionary.md (Validation rules)
    ↓
05-feature-inventory.md (Feature breakdown)
    ↓
06-screen-inventory.md (UI requirements)
    ↓
07-user-flows.md + 08-navigation-map.md (UX design)
    ↓
09-component-inventory.md (Implementation)
    ↓
10-page-data-requirements.md (Data flow)
    ↓
11-seo-requirements.md (Optimization)
    ↓
12-missing-information.md (Gap analysis)
```

---

**End of Frontend Source of Truth Documentation**
