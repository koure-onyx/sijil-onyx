# SIJIL Phase Registry

## Overview

This registry provides detailed specifications for each implementation phase, including entry/exit criteria, deliverables, and verification steps.

---

## Phase 1: Foundation

**ID:** PHASE-001  
**Duration:** 2-3 days  
**Tasks:** 23  
**Status:** Not Started

### Objectives

1. Initialize Next.js 16 project with strict TypeScript configuration
2. Configure Tailwind 4 and shadcn/ui component library
3. Establish linting, formatting, and git hooks per CLAUDE.md
4. Create folder structure matching `docs/frontend-blueprint/13-folder-structure.md`
5. Set up base utilities, types, and API client foundation
6. Configure TanStack Query and Zustand stores
7. Implement error boundaries and loading skeletons

### Entry Criteria

- [ ] Repository cloned with PAT access verified
- [ ] Node.js 20+ installed and verified (`node --version`)
- [ ] All blueprint documents reviewed (01-15 in `docs/frontend-blueprint/`)
- [ ] CLAUDE.md governance rules acknowledged
- [ ] GitHub PAT configured for push access

### Exit Criteria

- [ ] All 23 foundation tasks completed and marked in `05-progress-tracker.md`
- [ ] CI/CD pipeline executing successfully on GitHub Actions
- [ ] Architecture tests passing (no domain boundary violations)
- [ ] Zero ESLint errors and warnings
- [ ] Prettier formatting consistent across all files
- [ ] Husky pre-commit hooks operational
- [ ] Base test suite running with >80% coverage on utilities

### Deliverables

| ID | Name | Type | Location |
|----|------|------|----------|
| F001 | Next.js project initialized | Code | Root |
| F002 | TypeScript config (strict) | Config | `tsconfig.json` |
| F003 | Tailwind 4 config | Config | `tailwind.config.ts` |
| F004 | shadcn/ui components | Components | `components/ui/` |
| F005 | ESLint config | Config | `.eslintrc.json` |
| F006 | Prettier config | Config | `.prettierrc` |
| F007 | Husky hooks | Scripts | `.husky/` |
| F008 | Folder structure | Structure | `app/`, `features/`, `lib/` |
| F009 | Base types | Code | `types/` |
| F010 | Utility functions | Code | `lib/utils/` |
| F011 | API client base | Code | `lib/api/client.ts` |
| F012 | TanStack Query setup | Code | `lib/query/` |
| F013 | Zustand stores | Code | `lib/state/` |
| F014 | Error boundary | Component | `components/error-boundary.tsx` |
| F015 | Loading skeleton | Component | `components/skeleton.tsx` |
| F016 | CI/CD pipeline | Config | `.github/workflows/` |
| F017 | Architecture tests | Tests | `tests/architecture/` |
| F018 | Jest/Vitest config | Config | `vitest.config.ts` |
| F019 | Testing Library setup | Config | `tests/setup.ts` |
| F020 | MSW mocks | Code | `tests/mocks/` |
| F021 | Environment templates | Config | `.env.example` |
| F022 | README updated | Docs | `README.md` |
| F023 | Phase 1 verification | Report | `docs/project-management/phase-1-report.md` |

### Verification Steps

1. Run `npm run lint` → Must pass with zero errors
2. Run `npm run format:check` → Must pass
3. Run `npm run test` → Must pass with >80% coverage on utilities
4. Run `npm run build` → Must complete without errors
5. Verify folder structure matches `13-folder-structure.md`
6. Check architecture tests for domain violations
7. Confirm CI/CD pipeline runs on push

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| R1: Tooling version conflicts | High | Medium | Pin exact versions in package.json |
| R2: Folder structure drift | High | Medium | Architecture tests in CI pipeline |
| R3: State management misconfiguration | High | Low | Follow `06-state-architecture.md` exactly |
| R4: shadcn/ui import issues | Medium | Low | Use official installation CLI |

### Rollback Plan

If Phase 1 fails verification:
1. Identify failing component via test output
2. Revert to last known good commit
3. Fix identified issue in isolation
4. Re-run full verification suite
5. Document failure mode in `08-session-handoff.md`

---

## Phase 2: Core

**ID:** PHASE-002  
**Duration:** 5-7 days  
**Tasks:** 45  
**Status:** Not Started

### Objectives

1. Implement all layout components per `03-layout-architecture.md`
2. Build navigation system (header, sidebar, breadcrumbs)
3. Complete API layer for all 6 domains
4. Implement Documents feature module
5. Implement Topics module with BlockRenderer
6. Build basic Search functionality
7. Implement Quran references module
8. Create form components with React Hook Form + Zod validation

### Entry Criteria

- [ ] Phase 1 complete and verified
- [ ] Phase 1 report reviewed and approved
- [ ] Layout specifications from `03-layout-architecture.md` reviewed
- [ ] API contracts from `02-api-inventory.md` available
- [ ] Component architecture from `05-component-architecture.md` reviewed

### Exit Criteria

- [ ] All 45 core tasks completed
- [ ] All core routes functional and tested
- [ ] API layer test coverage >90%
- [ ] Layouts rendering correctly on desktop, tablet, mobile
- [ ] BlockRenderer supporting all 17 block types from `08-rendering-engine.md`
- [ ] Navigation working across all layouts
- [ ] Forms validating correctly with Zod schemas

### Deliverables

| ID | Name | Type | Location |
|----|------|------|----------|
| C001 | PublicLayout | Component | `app/(public)/layout.tsx` |
| C002 | AdminLayout | Component | `app/(admin)/layout.tsx` |
| C003 | TopicLayout | Component | `app/(public)/topics/[slug]/layout.tsx` |
| C004 | DocumentLayout | Component | `app/(public)/documents/[slug]/layout.tsx` |
| C005 | SearchLayout | Component | `app/(public)/search/layout.tsx` |
| C006 | Header component | Component | `components/navigation/header.tsx` |
| C007 | Sidebar component | Component | `components/navigation/sidebar.tsx` |
| C008 | Breadcrumbs component | Component | `components/navigation/breadcrumbs.tsx` |
| C009 | documents.api.ts | API Client | `lib/api/documents.api.ts` |
| C010 | topics.api.ts | API Client | `lib/api/topics.api.ts` |
| C011 | search.api.ts | API Client | `lib/api/search.api.ts` |
| C012 | quran.api.ts | API Client | `lib/api/quran.api.ts` |
| C013 | exports.api.ts | API Client | `lib/api/exports.api.ts` |
| C014 | analytics.api.ts | API Client | `lib/api/analytics.api.ts` |
| C015 | admin.api.ts | API Client | `lib/api/admin.api.ts` |
| C016 | Documents list page | Page | `app/(public)/documents/page.tsx` |
| C017 | Document detail page | Page | `app/(public)/documents/[slug]/page.tsx` |
| C018 | Topics list page | Page | `app/(public)/topics/page.tsx` |
| C019 | Topic detail page | Page | `app/(public)/topics/[slug]/page.tsx` |
| C020 | BlockRenderer | Component | `features/topics/components/block-renderer.tsx` |
| C021-037 | Block renderers (17 types) | Components | `features/topics/components/blocks/` |
| C038 | Search page | Page | `app/(public)/search/page.tsx` |
| C039 | Search input component | Component | `features/search/components/search-input.tsx` |
| C040 | Search results component | Component | `features/search/components/search-results.tsx` |
| C041 | Quran reference component | Component | `features/quran/components/quran-reference.tsx` |
| C042 | Form input component | Component | `components/forms/form-input.tsx` |
| C043 | Form textarea component | Component | `components/forms/form-textarea.tsx` |
| C044 | Form select component | Component | `components/forms/form-select.tsx` |
| C045 | Form validation utilities | Utils | `lib/forms/validation.ts` |

### Verification Steps

1. Navigate to all public routes → Verify rendering
2. Test navigation between pages → Verify breadcrumbs update
3. Mock API responses → Verify data fetching with TanStack Query
4. Submit forms with invalid data → Verify Zod validation errors
5. Render topic with all block types → Verify BlockRenderer output
6. Test responsive layouts → Verify on 3 viewport sizes
7. Check API layer test coverage → Must be >90%

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| R4: Layout composition complexity | High | Medium | Follow `03-layout-architecture.md` regions exactly |
| R5: API error handling gaps | High | Medium | Implement retry logic per `07-api-layer.md` |
| R6: BlockRenderer performance | Medium | Medium | Memoization strategy from `06-state-architecture.md` |
| R7: Form validation edge cases | Medium | Low | Comprehensive Zod schema testing |

### Rollback Plan

If Phase 2 fails verification:
1. Isolate failing module (layout, API, forms, or renderer)
2. Revert module-specific changes
3. Fix issues with targeted tests
4. Re-integrate module
5. Run full integration test suite
6. Document lessons learned in `08-session-handoff.md`

---

## Phase 3: Advanced

**ID:** PHASE-003  
**Duration:** 4-5 days  
**Tasks:** 31  
**Status:** Not Started

### Objectives

1. Implement advanced search with filters, suggestions, formula search
2. Build export functionality (PDF, LaTeX, Markdown)
3. Integrate analytics tracking and dashboards
4. Implement KaTeX for mathematical formula rendering
5. Configure next-seo for all public pages
6. Generate sitemap dynamically
7. Add JSON-LD structured data
8. Optimize performance (lazy loading, code splitting)

### Entry Criteria

- [ ] Phase 2 complete and verified
- [ ] Phase 2 report reviewed and approved
- [ ] Search requirements from `09-search-architecture.md` reviewed
- [ ] SEO requirements from `11-seo-requirements.md` available
- [ ] Performance budgets defined

### Exit Criteria

- [ ] All 31 advanced tasks completed
- [ ] Search latency <200ms for 95th percentile (tested with MSW)
- [ ] All public pages have valid SEO metadata (verified with next-seo)
- [ ] Export functionality tested with real content samples
- [ ] Lighthouse scores >90 for performance, accessibility, SEO
- [ ] JSON-LD validated with Google Rich Results Test
- [ ] Sitemap accessible at `/sitemap.xml`

### Deliverables

| ID | Name | Type | Location |
|----|------|------|----------|
| A001 | Advanced search filters | Component | `features/search/components/filters.tsx` |
| A002 | Search suggestions | Component | `features/search/components/suggestions.tsx` |
| A003 | Formula search | Feature | `features/search/formula-search.tsx` |
| A004 | Search URL sync | Hook | `features/search/hooks/use-search-url-sync.ts` |
| A005 | Export service integration | Service | `lib/services/export-service.ts` |
| A006 | Export trigger component | Component | `features/exports/components/export-trigger.tsx` |
| A007 | Export status modal | Component | `features/exports/components/export-status-modal.tsx` |
| A008 | Analytics tracker | Hook | `lib/analytics/use-analytics-tracker.ts` |
| A009 | Analytics dashboard | Page | `app/(admin)/analytics/page.tsx` |
| A010 | KaTeX configuration | Config | `lib/katex/config.ts` |
| A011 | Formula block renderer | Component | `features/topics/components/blocks/formula-block.tsx` |
| A012 | next-seo configuration | Config | `next-seo.config.ts` |
| A013 | Metadata generator | Utility | `lib/seo/metadata-generator.ts` |
| A014 | JSON-LD generator | Utility | `lib/seo/json-ld-generator.ts` |
| A015 | Breadcrumb schema | Component | `features/seo/components/breadcrumb-schema.tsx` |
| A016 | Sitemap generation | Script | `scripts/generate-sitemap.ts` |
| A017 | Dynamic sitemap route | Route | `app/sitemap.xml/route.ts` |
| A018 | Lazy loading HOC | Utility | `lib/performance/lazy-loading.tsx` |
| A019 | Code splitting config | Config | `next.config.js` |
| A020 | Performance monitoring | Hook | `lib/performance/use-performance-monitor.ts` |
| A021-A031 | Additional optimizations | Various | Multiple locations |

### Verification Steps

1. Perform search with filters → Verify URL synchronization
2. Test formula search → Verify KaTeX rendering
3. Trigger document export → Verify download completes
4. Check all pages for SEO metadata → Use next-seo debugger
5. Validate JSON-LD → Google Rich Results Test
6. Access sitemap.xml → Verify all routes included
7. Run Lighthouse audit → Verify scores >90
8. Profile search performance → Verify p95 <200ms

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| R7: Search performance degradation | High | Medium | Debouncing, caching per `09-search-architecture.md` |
| R8: Export service timeouts | High | Low | Background job pattern with status polling |
| R9: SEO metadata inconsistencies | Medium | Medium | Centralized metadata generator per `11-seo-architecture.md` |
| R10: KaTeX CSS conflicts | Low | Low | Scoped styles and careful imports |

### Rollback Plan

If Phase 3 fails verification:
1. Disable advanced features via feature flags
2. Revert to basic search functionality
3. Fix performance bottlenecks incrementally
4. Re-enable features one by one with testing
5. Document performance baselines in `05-progress-tracker.md`

---

## Phase 4: Admin

**ID:** PHASE-004  
**Duration:** 2-3 days  
**Tasks:** 18  
**Status:** Not Started

### Objectives

1. Build admin dashboard with key metrics
2. Implement content ingestion UI
3. Create batch import functionality
4. Build version management interface
5. Implement health monitoring dashboard
6. Add search monitoring and failed query tracking
7. Create job tracking and status display
8. Build admin-specific forms with enhanced validations

### Entry Criteria

- [ ] Phase 3 complete and verified
- [ ] Phase 3 report reviewed and approved
- [ ] Admin requirements from `10-admin-architecture.md` reviewed
- [ ] Backend admin APIs documented in `02-api-inventory.md`
- [ ] Authentication/authorization flow confirmed

### Exit Criteria

- [ ] All 18 admin tasks completed
- [ ] Admin dashboard displaying real-time metrics
- [ ] Content ingestion flow tested end-to-end
- [ ] All admin forms validated and secured
- [ ] Monitoring dashboards showing accurate data
- [ ] Role-based access control functioning
- [ ] Batch operations handling large datasets

### Deliverables

| ID | Name | Type | Location |
|----|------|------|----------|
| D001 | Admin dashboard page | Page | `app/(admin)/dashboard/page.tsx` |
| D002 | Metrics cards component | Component | `features/admin/components/metrics-cards.tsx` |
| D003 | Ingestion form | Component | `features/admin/components/ingestion-form.tsx` |
| D004 | Batch import UI | Component | `features/admin/components/batch-import.tsx` |
| D005 | Version history table | Component | `features/admin/components/version-history.tsx` |
| D006 | Health monitor dashboard | Page | `app/(admin)/health/page.tsx` |
| D007 | Search monitoring page | Page | `app/(admin)/search-monitoring/page.tsx` |
| D008 | Failed queries table | Component | `features/admin/components/failed-queries-table.tsx` |
| D009 | Job tracking page | Page | `app/(admin)/jobs/page.tsx` |
| D010 | Job status component | Component | `features/admin/components/job-status.tsx` |
| D011 | Admin navigation | Component | `features/admin/components/admin-nav.tsx` |
| D012 | RBAC hook | Hook | `features/admin/hooks/use-rbac.ts` |
| D013 | Admin form validation | Utils | `features/admin/utils/validation.ts` |
| D014-D018 | Additional admin components | Components | `features/admin/components/` |

### Verification Steps

1. Access admin dashboard → Verify metrics display
2. Submit content ingestion form → Verify backend integration
3. Upload batch import file → Verify processing
4. Check version history → Verify data accuracy
5. View health monitoring → Verify real-time updates
6. Review failed queries → Verify logging integration
7. Track job status → Verify WebSocket/polling updates
8. Test RBAC → Verify unauthorized access blocked

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| R10: Admin security gaps | Critical | Low | Role-based access control per governance rules |
| R11: Large batch operation failures | High | Medium | Chunking and progress tracking |
| R12: Real-time data synchronization | Medium | Medium | TanStack Query refetch intervals |
| R13: Admin UI complexity | Medium | Low | Follow shadcn/ui patterns strictly |

### Rollback Plan

If Phase 4 fails verification:
1. Disable admin features behind feature flag
2. Revert to read-only admin views
3. Fix data integration issues
4. Re-test security controls
5. Gradually re-enable write operations

---

## Phase 5: Polish

**ID:** PHASE-005  
**Duration:** 1-2 days  
**Tasks:** 10  
**Status:** Not Started

### Objectives

1. Conduct accessibility audit (WCAG 2.1 AA)
2. Perform final performance optimization pass
3. Execute cross-browser testing
4. Verify mobile responsiveness
5. Refine error messages
6. Polish loading states
7. Finalize documentation
8. Configure production deployment

### Entry Criteria

- [ ] Phases 1-4 complete and verified
- [ ] All features implemented per `03-feature-registry.md`
- [ ] Test coverage targets met (>80% overall, >90% critical paths)
- [ ] No critical or high-priority bugs open

### Exit Criteria

- [ ] All 10 polish tasks completed
- [ ] Zero critical accessibility issues (WCAG 2.1 AA compliant)
- [ ] Lighthouse scores >95 across all categories
- [ ] All E2E tests passing
- [ ] Production deployment successful
- [ ] Handoff documentation complete
- [ ] All known issues documented with workarounds

### Deliverables

| ID | Name | Type | Location |
|----|------|------|----------|
| P001 | Accessibility audit report | Report | `docs/qa/accessibility-audit.md` |
| P002 | A11y fixes | Code | Multiple locations |
| P003 | Performance profile report | Report | `docs/qa/performance-profile.md` |
| P004 | Performance optimizations | Code | Multiple locations |
| P005 | Cross-browser test results | Report | `docs/qa/browser-compatibility.md` |
| P006 | Mobile responsiveness report | Report | `docs/qa/mobile-testing.md` |
| P007 | Error message catalog | Docs | `docs/content/error-messages.md` |
| P008 | Loading state guidelines | Docs | `docs/content/loading-states.md` |
| P009 | Deployment guide | Docs | `docs/deployment/production-setup.md` |
| P010 | Final handoff document | Docs | `docs/handoff/final-report.md` |

### Verification Steps

1. Run axe DevTools → Zero critical violations
2. Run Lighthouse → All scores >95
3. Test on Chrome, Firefox, Safari, Edge → No visual regressions
4. Test on iOS, Android devices → Responsive layouts correct
5. Trigger all error states → Messages are clear and actionable
6. Navigate with slow connection → Loading states appropriate
7. Deploy to staging → Smoke test passes
8. Deploy to production → Health checks pass

### Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| R13: Last-minute accessibility issues | High | Medium | Early and continuous a11y testing throughout phases |
| R14: Performance regressions | High | Low | Performance budgets in CI pipeline |
| R15: Browser compatibility issues | Medium | Medium | Cross-browser testing matrix executed early |
| R16: Deployment configuration errors | Critical | Low | Staging environment mirrors production |

### Rollback Plan

If Phase 5 fails verification:
1. Do not deploy to production
2. Address critical issues immediately
3. Re-run full test suite
4. Schedule additional polish iteration if needed
5. Update `01-master-roadmap.md` with revised timeline

---

## Phase Completion Checklist Template

```markdown
## Phase [X] Completion Checklist

### Documentation
- [ ] Phase report created in `docs/project-management/`
- [ ] Progress tracker updated in `05-progress-tracker.md`
- [ ] Session handoff notes in `08-session-handoff.md`
- [ ] Decision log updated with any architectural decisions

### Code Quality
- [ ] All tasks marked complete in `09-task-backlog.md`
- [ ] Zero ESLint errors
- [ ] Prettier formatting consistent
- [ ] Test coverage targets met
- [ ] Architecture tests passing

### Verification
- [ ] All entry criteria were met before starting
- [ ] All exit criteria verified and documented
- [ ] Manual testing completed per verification steps
- [ ] No critical or high-priority bugs open

### Approval
- [ ] Self-review completed
- [ ] Peer review completed (if applicable)
- [ ] Phase sign-off in `05-progress-tracker.md`
```

---

## References

- Master Roadmap: `01-master-roadmap.md`
- Task Backlog: `09-task-backlog.md`
- Progress Tracker: `05-progress-tracker.md`
- Blueprint: `docs/frontend-blueprint/`
- Governance: `CLAUDE.md`
