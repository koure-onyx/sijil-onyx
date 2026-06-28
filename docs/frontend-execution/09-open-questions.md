# 09-open-questions.md

# Open Questions, Conflicts, and Missing Information

This document captures all ambiguities, inconsistencies, and gaps discovered during the knowledge extraction process.

**Rule:** Never guess. Record conflicts. Mark unknowns.

---

## 1. Architecture Conflicts

### 1.1 Next.js Version Specification

**Conflict Found:**
- `architecture_V2.md` states: "Next.js 14+ with App Router"
- `docs/frontend-blueprint/03-rendering-strategy.md` mentions: "Next.js 15 compatible patterns"

**Question:** Which version is the target?
- Next.js 14.x (stable, proven)
- Next.js 15.x (newer, may have breaking changes)

**Impact:** Affects package.json, CI/CD, available features (partial prerendering in 15)

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** architecture_V2.md §3.1, docs/frontend-blueprint/03-rendering-strategy.md §2

---

### 1.2 State Management Approach

**Conflict Found:**
- `docs/frontend-discovery/02-state-patterns.md` recommends: "React Query for server state"
- `docs/frontend-blueprint/04-state-management.md` mentions: "SWR as alternative"

**Question:** Which library is the single source of truth?
- @tanstack/react-query
- swr (Vercel-native)
- Both supported with abstraction layer?

**Impact:** Affects all data fetching code, caching strategy, dev experience

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/frontend-discovery/02-state-patterns.md, docs/frontend-blueprint/04-state-management.md

---

### 1.3 Collection Split Strategy

**Ambiguity Found:**
- `architecture_V2.md` mentions: "Collection-based splitting for large datasets"
- No specific threshold defined for when to split

**Question:** What triggers collection splitting?
- Document count threshold? (e.g., >10,000 docs)
- File size threshold? (e.g., >100MB)
- Manual admin decision?

**Impact:** Affects routing, navigation, search indexing strategy

**Resolution Required By:** Before F06 Collections implementation

**Traceability:** architecture_V2.md §5.3

---

## 2. API Ambiguities

### 2.1 Pagination Standard

**Missing Information:**
- Multiple pagination patterns exist in backend docs
- No single canonical pagination response format documented

**Question:** What is the standard pagination envelope?
```typescript
// Option A: Offset-based
{ data: [], total: number, page: number, pageSize: number }

// Option B: Cursor-based
{ data: [], nextCursor: string | null, prevCursor: string | null }

// Option C: Relay-style
{ edges: [], pageInfo: { hasNextPage, endCursor } }
```

**Impact:** Affects all list components, infinite scroll implementations

**Resolution Required By:** Before any list/screen implementation

**Traceability:** docs/frontend-discovery/04-api-contracts.md (incomplete)

---

### 2.2 Error Response Format

**Missing Information:**
- Backend error responses not fully standardized in documentation
- Frontend needs consistent error handling pattern

**Question:** What is the canonical error shape?
```typescript
// Option A
{ error: { code: string, message: string, details?: any } }

// Option B
{ success: false, error: string }

// Option C
HTTP status + body: { message: string }
```

**Impact:** Affects global error handler, toast notifications, retry logic

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/frontend-discovery/04-api-contracts.md §3 (marked TBD)

---

### 2.3 Authentication Token Location

**Ambiguity Found:**
- Admin auth mentioned but mechanism not specified
- PAT mentioned in clone instructions but runtime auth unclear

**Question:** How are admin tokens transmitted?
- Authorization header: `Bearer <token>`
- Cookie-based session
- Query param (for downloads)?

**Question:** Where is token stored on frontend?
- HttpOnly cookie (recommended)
- localStorage (not recommended)
- In-memory only?

**Impact:** Affects auth middleware, API client setup, SSR compatibility

**Resolution Required By:** Before F12 Admin Interface implementation

**Traceability:** architecture_V2.md §7 (auth section minimal)

---

### 2.4 Formula Search API Endpoint

**Missing Information:**
- Formula search feature documented
- Exact endpoint path not confirmed

**Question:** What is the correct endpoint?
- `GET /api/formulas/search?q=pattern`
- `GET /api/search/formulas?q=pattern`
- `POST /api/formulas/search` (for complex queries)

**Impact:** Affects F03 Formula Search implementation

**Resolution Required By:** Before F03 implementation

**Traceability:** docs/frontend-discovery/06-search-spec.md §4

---

## 3. Screen/Route Ambiguities

### 3.1 Homepage Content Strategy

**Ambiguity Found:**
- Multiple content strategies mentioned for homepage
- Unclear which is primary

**Question:** What does the homepage show by default?
- Latest documents?
- Featured collections?
- Topic hierarchy entry point?
- Search-first interface?
- Combination (which sections, what order)?

**Impact:** Affects homepage layout, API calls on mount, SEO strategy

**Resolution Required By:** Before F01/F14 implementation

**Traceability:** docs/frontend-discovery/01-user-flows.md §2.1, docs/frontend-blueprint/05-layouts.md §3

---

### 3.2 404 Page Scope

**Missing Information:**
- 404 page listed in screen registry
- Custom 404 behavior for different content types not specified

**Question:** Should 404 pages be contextual?
- Document not found → suggest similar documents
- Topic not found → show topic tree
- Generic 404 → site-wide search + navigation

**Impact:** Affects not-found.tsx implementation, user recovery flows

**Resolution Required By:** Before Phase 2 implementation

**Traceability:** docs/frontend-discovery/07-seo-requirements.md (no 404 spec)

---

### 3.3 Admin Route Structure

**Ambiguity Found:**
- Admin screens documented
- URL structure not finalized

**Question:** What is the admin URL pattern?
- `/admin/*` (all admin under one prefix)
- `/dashboard`, `/ingest`, `/analytics` (flat structure)
- Subdomain approach `admin.sijil.example.com`?

**Impact:** Affects routing, middleware, layout separation

**Resolution Required By:** Before F12 Admin Interface implementation

**Traceability:** docs/frontend-blueprint/05-layouts.md §4

---

## 4. Component Ambiguities

### 4.1 shadcn/ui Customization Level

**Missing Information:**
- shadcn/ui specified as component foundation
- Extent of customization not defined

**Question:** What is the customization strategy?
- Use defaults with Tailwind overrides only
- Extend with custom variants via CVA
- Fork and modify shadcn components directly
- Build parallel component library?

**Impact:** Affects component architecture, design system consistency, upgrade path

**Resolution Required By:** Before Phase 1 component setup

**Traceability:** docs/frontend-blueprint/06-components.md §2

---

### 4.2 Icon Strategy

**Ambiguity Found:**
- lucide-react mentioned in dependencies
- Some designs reference custom SVG icons

**Question:** What is the icon source?
- lucide-react exclusively
- Mix of lucide + custom SVGs
- Icon component wrapper needed?

**Impact:** Affects bundle size, icon import patterns, design fidelity

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/frontend-discovery/08-component-inventory.md §5

---

### 4.3 DataTable Implementation

**Missing Information:**
- Admin screens require data tables
- Table library/approach not specified

**Question:** What table solution?
- TanStack Table (headless UI)
- shadcn DataTable pattern
- Custom implementation
- AG Grid / other enterprise solution?

**Impact:** Affects admin screen complexity, sorting/filtering capabilities

**Resolution Required By:** Before F12 Admin Interface implementation

**Traceability:** docs/frontend-discovery/08-component-inventory.md (table component TBD)

---

## 5. Data Model Ambiguities

### 5.1 Document Content Structure

**Missing Information:**
- Document model referenced frequently
- Exact content field structure varies across docs

**Question:** What is the canonical document shape?
```typescript
interface Document {
  id: string;
  title: string;
  content: string; // Markdown? HTML? Structured JSON?
  contentHtml?: string; // Pre-rendered?
  sections?: DocumentSection[]; // Structured?
  topics: string[]; // IDs or slugs?
  collectionId: string;
  // ...other fields
}
```

**Impact:** Affects rendering engine, search indexing, editor implementation

**Resolution Required By:** Before F01 Document Display implementation

**Traceability:** architecture_V2.md §5.1, docs/frontend-discovery/03-data-models.md §2

---

### 5.2 Topic Hierarchy Representation

**Ambiguity Found:**
- Topics have parent-child relationships
- Storage/retrieval method not specified

**Question:** How is hierarchy represented?
- Parent ID reference (`parentId: string | null`)
- Materialized path (`path: "parent/child/grandchild"`)
- Adjacency list via separate relationship table
- Nested set model?

**Impact:** Affects topic tree component, breadcrumb generation, URL structure

**Resolution Required By:** Before F02 Topic System implementation

**Traceability:** architecture_V2.md §5.2, docs/frontend-discovery/03-data-models.md §3

---

### 5.3 Quran Data Source

**Missing Information:**
- Quran Browser feature documented
- Data source not specified

**Question:** Where does Quran data come from?
- Backend API (pre-loaded)
- External API (Quran.com, Alquran.cloud, etc.)
- Static JSON bundled with frontend
- Hybrid (metadata from backend, text from external)?

**Impact:** Affects F05 implementation, offline capability, licensing

**Resolution Required By:** Before F05 Quran Browser implementation

**Traceability:** docs/frontend-discovery/05-quran-spec.md §2 (source TBD)

---

## 6. SEO Ambiguities

### 6.1 ISR Revalidation Strategy

**Missing Information:**
- ISR mentioned for performance
- Revalidation intervals not specified per content type

**Question:** What are revalidation times?
```typescript
// Documents
revalidate: number; // 3600? 86400? On-demand only?

// Topics
revalidate: number;

// Homepage
revalidate: number;
```

**Impact:** Affects content freshness, backend load, stale data handling

**Resolution Required By:** Before F14 SEO implementation

**Traceability:** docs/frontend-blueprint/03-rendering-strategy.md §4 (intervals TBD)

---

### 6.2 Sitemap Generation Scope

**Missing Information:**
- Sitemap required for SEO
- Inclusion criteria not defined

**Question:** What goes in sitemap.xml?
- All public documents?
- Only top-level documents?
- Topic pages?
- Collection pages?
- Paginated lists?

**Question:** Dynamic or static sitemap?
- Generated at build time
- Generated on-demand via route handler
- Hybrid (static base + dynamic index)?

**Impact:** Affects SEO coverage, build time, crawler behavior

**Resolution Required By:** Before F14 SEO implementation

**Traceability:** docs/frontend-discovery/07-seo-requirements.md §3

---

### 6.3 Structured Data Types

**Missing Information:**
- JSON-LD structured data mentioned
- Specific schemas not enumerated

**Question:** Which schema.org types are needed?
- Article / TechArticle
- WebPage
- BreadcrumbList
- SiteNavigationElement
- Organization
- SearchAction (for sitelinks searchbox)

**Impact:** Affects rich snippets, Google visibility

**Resolution Required By:** Before F14 SEO implementation

**Traceability:** docs/frontend-discovery/07-seo-requirements.md §4 (partial list)

---

## 7. Performance Ambiguities

### 7.1 Image Optimization Strategy

**Missing Information:**
- Images mentioned in content
- Optimization approach not specified

**Question:** How are images handled?
- Next.js Image component with remote patterns
- Self-hosted with sharp transformation
- CDN-based (Cloudinary, Imgix)?
- No images (text-only content)?

**Impact:** Affects content rendering, bundle size, LCP metrics

**Resolution Required By:** Before F01 Document Display implementation

**Traceability:** docs/frontend-blueprint/07-performance.md (image section missing)

---

### 7.2 Bundle Size Budgets

**Missing Information:**
- Performance requirements mentioned
- Specific budgets not defined

**Question:** What are the bundle constraints?
```
Initial JS: ? KB
Initial CSS: ? KB
Total bundle: ? KB
LCP target: ? ms
CLS target: ? 
FID/INP target: ? ms
```

**Impact:** Affects library choices, code splitting strategy, lazy loading

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/frontend-blueprint/07-performance.md §2 (budgets TBD)

---

### 7.3 Caching Strategy Details

**Ambiguity Found:**
- Multiple caching layers mentioned
- Cache invalidation rules not specified

**Question:** What is cached where?
| Layer | What | TTL | Invalidation |
|-------|------|-----|--------------|
| Browser HTTP | Static assets | 1 year | Hash change |
| Browser HTTP | API responses | ? | ? |
| React Query | Server state | ? | ? |
| Next.js Data Cache | Fetch results | ? | ? |
| Next.js Full Route Cache | Pages | ? | ? |

**Impact:** Affects data freshness, backend load, user experience

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/frontend-blueprint/03-rendering-strategy.md §5, docs/frontend-discovery/04-api-contracts.md §6

---

## 8. Admin Workflow Ambiguities

### 8.1 Ingestion Flow Steps

**Missing Information:**
- JSON ingestion documented
- Step-by-step flow not detailed

**Question:** What is the complete ingestion flow?
1. Upload/select JSON file
2. Validate (F13)
3. Preview changes
4. Confirm
5. Process (async)
6. Notify completion

Or different steps?

**Impact:** Affects F12 Admin Interface UX, error handling, progress tracking

**Resolution Required By:** Before F12 Admin Interface implementation

**Traceability:** docs/frontend-discovery/09-admin-workflows.md §2 (high-level only)

---

### 8.2 Batch Import Limits

**Missing Information:**
- Batch import feature exists
- Constraints not documented

**Question:** What are the batch limits?
- Max documents per batch?
- Max file size?
- Timeout duration?
- Concurrent batch restrictions?

**Impact:** Affects form validation, progress UI, error messages

**Resolution Required By:** Before F12 Admin Interface implementation

**Traceability:** docs/frontend-discovery/09-admin-workflows.md §3

---

### 8.3 Version Restore Permissions

**Ambiguity Found:**
- Version history allows restore
- Permission model not specified

**Question:** Who can restore versions?
- Any admin user
- Only document owner
- Only super admin
- Configurable per collection?

**Impact:** Affects F08 UI (show/hide restore button), backend authorization

**Resolution Required By:** Before F08 Version History implementation

**Traceability:** architecture_V2.md §7 (permissions incomplete)

---

## 9. Export System Ambiguities

### 9.1 Export Formats

**Missing Information:**
- Export feature documented
- Supported formats not enumerated

**Question:** What export formats are supported?
- PDF
- EPUB
- Markdown
- JSON
- HTML
- All of above?

**Impact:** Affects export request API, status polling, download handling

**Resolution Required By:** Before F04 Export System implementation

**Traceability:** docs/frontend-discovery/10-export-spec.md §2 (formats TBD)

---

### 9.2 Export Scope

**Ambiguity Found:**
- Export can be for documents
- Scope options not clear

**Question:** What can be exported?
- Single document
- Multiple selected documents
- Entire collection
- Topic subtree
- Search results?

**Impact:** Affects export UI, API parameters, processing time

**Resolution Required By:** Before F04 Export System implementation

**Traceability:** docs/frontend-discovery/10-export-spec.md §3

---

### 9.3 Export Delivery Mechanism

**Missing Information:**
- Exports are async
- Delivery method not specified

**Question:** How are completed exports delivered?
- Direct download from status page
- Email with download link
- Both
- Temporary signed URL?

**Question:** How long are exports retained?
- 1 hour
- 24 hours
- 7 days
- Indefinite?

**Impact:** Affects UX flow, storage requirements, cleanup jobs

**Resolution Required By:** Before F04 Export System implementation

**Traceability:** docs/frontend-discovery/10-export-spec.md §4

---

## 10. Integration Ambiguities

### 10.1 External Source Embed Safety

**Missing Information:**
- External sources can be embedded
- Security model not specified

**Question:** How are embeds sanitized?
- Iframe sandbox attributes
- Content Security Policy
- Proxy through backend
- Whitelist of allowed domains?

**Impact:** Affects F10 implementation, security posture, XSS prevention

**Resolution Required By:** Before F10 External Sources implementation

**Traceability:** docs/frontend-discovery/11-external-sources.md §3 (security TBD)

---

### 10.2 Reference Link Resolution

**Ambiguity Found:**
- References can point to multiple target types
- Resolution priority not defined

**Question:** If reference matches multiple targets, what happens?
- Show disambiguation UI
- Return first match
- Return all matches
- Prioritize by type (document > topic > ayah)?

**Impact:** Affects F07 Reference System UX, API behavior

**Resolution Required By:** Before F07 Reference System implementation

**Traceability:** docs/frontend-discovery/12-references-spec.md §4

---

## 11. Deployment Ambiguities

### 11.1 Environment Configuration

**Missing Information:**
- Multiple environments implied
- Required env vars not fully documented

**Question:** What environment variables are required?
```bash
# Public (NEXT_PUBLIC_*)
NEXT_PUBLIC_API_URL=?
NEXT_PUBLIC_SITE_URL=?
NEXT_PUBLIC_GA_ID=? # if analytics

# Server-only
API_SECRET_KEY=?
ADMIN_JWT_SECRET=?
DATABASE_URL=? # if direct access needed
```

**Impact:** Affects deployment setup, CI/CD, local development

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** architecture_V2.md §8 (env section minimal)

---

### 11.2 Hosting Platform

**Ambiguity Found:**
- Next.js deployment mentioned
- Target platform not specified

**Question:** Where will this be hosted?
- Vercel (recommended for Next.js)
- Netlify
- AWS (Amplify, EC2, ECS)
- Self-hosted VPS
- Docker container?

**Impact:** Affects build config, CI/CD pipeline, environment setup

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/01-roadmap.md (platform TBD)

---

### 11.3 CI/CD Requirements

**Missing Information:**
- Deployment workflow mentioned
- Pipeline stages not defined

**Question:** What does the CI/CD pipeline include?
- Lint
- Type check
- Test (unit, integration, e2e?)
- Build
- Deploy to staging
- Deploy to production (manual/auto)?

**Impact:** Affects GitHub Actions config, deployment velocity, quality gates

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/05-handoff-checklist.md §2

---

## 12. Testing Strategy Gaps

### 12.1 Test Coverage Requirements

**Missing Information:**
- Quality requirements mentioned
- Specific coverage targets not defined

**Question:** What are the testing expectations?
- Unit test coverage: ?%
- Integration tests: which flows?
- E2E tests: which critical paths?
- Visual regression: yes/no?

**Impact:** Affects test framework choice, CI time, confidence level

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/06-review-checklist.md (coverage TBD)

---

### 12.2 Test Framework Selection

**Ambiguity Found:**
- Testing mentioned as requirement
- Framework not specified

**Question:** What testing stack?
- Unit: Jest / Vitest
- Integration: React Testing Library
- E2E: Playwright / Cypress
- Visual: Chromatic / Percy

**Impact:** Affects dev dependencies, test writing patterns, CI setup

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/06-review-checklist.md §3

---

## 13. Accessibility Gaps

### 13.1 WCAG Compliance Level

**Missing Information:**
- Accessibility mentioned as principle
- Target compliance level not specified

**Question:** What WCAG level is required?
- WCAG 2.1 Level A (minimum)
- WCAG 2.1 Level AA (standard)
- WCAG 2.1 Level AAA (enhanced)

**Impact:** Affects component design, color contrast, keyboard nav, screen reader support

**Resolution Required By:** Before Phase 1 component setup

**Traceability:** architecture_V2.md §6.2 (level unspecified)

---

### 13.2 Accessibility Testing Method

**Missing Information:**
- A11y important but testing approach unclear

**Question:** How is accessibility verified?
- Automated: axe-core, eslint-plugin-jsx-a11y
- Manual: Screen reader testing (which readers?)
- Tool: WAVE, Lighthouse
- Audit: Third-party assessment?

**Impact:** Affects development workflow, CI checks, launch readiness

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/06-review-checklist.md §4 (tools TBD)

---

## 14. Internationalization (Future-Proofing)

### 14.1 i18n Strategy

**Missing Information:**
- Currently Arabic/Islamic content focus
- Future multi-language support unclear

**Question:** Should i18n be built in from start?
- next-i18next integration
- Hardcoded English/Arabic only
- Abstracted strings with future i18n in mind

**Impact:** Affects string management, RTL support, routing structure

**Note:** If i18n is planned for future, building it in later is expensive.

**Resolution Required By:** Before Phase 1 implementation start (decision needed even if deferring implementation)

**Traceability:** architecture_V2.md (i18n not mentioned)

---

## 15. Analytics & Monitoring Gaps

### 15.1 Frontend Analytics

**Missing Information:**
- Analytics dashboard for admins exists
- Frontend user analytics not specified

**Question:** What frontend analytics are tracked?
- Page views (Google Analytics, Plausible, Fathom)?
- Custom events (searches, exports, clicks)?
- Performance metrics (Web Vitals)?
- Error tracking (Sentry, LogRocket)?

**Impact:** Affects script loading, privacy compliance, insight availability

**Resolution Required By:** Before Phase 2 implementation

**Traceability:** docs/frontend-discovery/07-seo-requirements.md §6 (analytics mentioned but not detailed)

---

### 15.2 Error Monitoring

**Missing Information:**
- Error handling required
- Monitoring solution not specified

**Question:** How are frontend errors monitored?
- Sentry
- LogRocket
- Self-hosted ELK stack
- Console logs only (not recommended)?

**Impact:** Affects error boundary implementation, debugging capability, user support

**Resolution Required By:** Before Phase 1 implementation start

**Traceability:** docs/project-management/07-bug-workflow.md (detection unspecified)

---

## Summary: Critical Blockers

These questions **must** be resolved before implementation can begin:

| Priority | Question ID | Area | Impact |
|----------|-------------|------|--------|
| 🔴 P0 | 1.1 | Next.js Version | Foundation |
| 🔴 P0 | 1.2 | State Management | All data fetching |
| 🔴 P0 | 2.1 | Pagination Format | All list components |
| 🔴 P0 | 2.2 | Error Response Format | Error handling |
| 🔴 P0 | 2.3 | Auth Token Handling | Admin features |
| 🔴 P0 | 7.2 | Bundle Budgets | Architecture decisions |
| 🔴 P0 | 11.1 | Environment Variables | Setup & deployment |
| 🔴 P0 | 11.2 | Hosting Platform | CI/CD & config |
| 🟡 P1 | 3.1 | Homepage Content | First screen to build |
| 🟡 P1 | 5.1 | Document Content Structure | Core rendering |
| 🟡 P1 | 6.1 | ISR Revalidation | Performance & freshness |
| 🟡 P1 | 9.1 | Export Formats | F04 scope |
| 🟢 P2 | 4.1 | shadcn Customization | Component polish |
| 🟢 P2 | 13.1 | WCAG Level | Accessibility scope |
| 🟢 P2 | 14.1 | i18n Strategy | Future-proofing |

---

## Process for Resolving Questions

1. **Identify stakeholder** for each question (backend team, product, design)
2. **Schedule clarification session** for P0 items
3. **Document decisions** in this file with resolution date
4. **Update relevant execution docs** based on decisions
5. **Mark resolved questions** with ✅ and link to decision record

---

*Last Updated: During Pass 1 Knowledge Extraction*
*Status: Active - Questions pending resolution*

*Traceability: Compiled from inconsistencies found across CLAUDE.md, architecture_V2.md, docs/frontend-discovery/*, docs/frontend-blueprint/*, docs/project-management/**
