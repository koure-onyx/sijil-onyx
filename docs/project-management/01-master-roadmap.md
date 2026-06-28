# SIJIL Master Roadmap

## Overview

This document provides the strategic roadmap for implementing the SIJIL frontend based on the frozen architecture defined in `docs/frontend-blueprint/` and governed by `CLAUDE.md`.

## Phase Summary

| Phase | Name | Duration | Tasks | Status |
|-------|------|----------|-------|--------|
| 1 | Foundation | 2-3 days | 23 | Not Started |
| 2 | Core | 5-7 days | 45 | Not Started |
| 3 | Advanced | 4-5 days | 31 | Not Started |
| 4 | Admin | 2-3 days | 18 | Not Started |
| 5 | Polish | 1-2 days | 10 | Not Started |

**Total: 127 tasks across 5 phases**

---

## Phase 1: Foundation (Days 1-3)

### Objective
Establish the technical foundation, tooling, and core infrastructure required for all subsequent development.

### Key Deliverables
- [ ] Next.js 16 project initialization with TypeScript strict mode
- [ ] Tailwind 4 and shadcn/ui configuration
- [ ] ESLint, Prettier, and Husky setup per CLAUDE.md
- [ ] Folder structure per `01-folder-structure.md`
- [ ] Base utility functions and types
- [ ] API client foundation
- [ ] TanStack Query and Zustand setup
- [ ] Error boundary and loading skeleton components

### Entry Criteria
- Repository cloned with PAT access
- Node.js 20+ installed
- All blueprint documents reviewed

### Exit Criteria
- All foundation tasks marked complete in `05-progress-tracker.md`
- CI/CD pipeline passing
- Architecture tests passing
- Zero ESLint errors

### Critical Path
1. Project initialization → Tooling config → Folder structure
2. Base types → API client → State management setup
3. Core components → Error boundaries → Ready for Phase 2

### Risks
- **R1**: Tooling version conflicts → Mitigation: Pin exact versions in package.json
- **R2**: Folder structure drift → Mitigation: Architecture tests in CI
- **R3**: State management misconfiguration → Mitigation: Follow `06-state-architecture.md` exactly

---

## Phase 2: Core (Days 4-10)

### Objective
Implement the core application structure including layouts, navigation, API layer completion, and foundational feature modules.

### Key Deliverables
- [ ] PublicLayout, AdminLayout, TopicLayout implementation
- [ ] Navigation components (header, sidebar, breadcrumbs)
- [ ] Complete API layer for all domains
- [ ] Documents module (list, detail, related)
- [ ] Topics module with BlockRenderer
- [ ] Search module (basic implementation)
- [ ] Quran module (references, display)
- [ ] Form components with React Hook Form + Zod
- [ ] Authentication flow (if required)

### Entry Criteria
- Phase 1 complete and verified
- All layout specs from `03-layout-architecture.md` reviewed
- API contracts from `02-api-inventory.md` available

### Exit Criteria
- All core routes functional
- API layer test coverage >90%
- Layout rendering verified across devices
- BlockRenderer supporting all block types from `08-rendering-engine.md`

### Critical Path
1. Layouts → Navigation → Route structure
2. API layer → Feature modules → Page integration
3. BlockRenderer → Topic pages → Content validation

### Risks
- **R4**: Layout composition complexity → Mitigation: Follow `03-layout-architecture.md` regions exactly
- **R5**: API error handling gaps → Mitigation: Implement retry logic per `07-api-layer.md`
- **R6**: BlockRenderer performance → Mitigation: Memoization strategy from `06-state-architecture.md`

---

## Phase 3: Advanced (Days 11-15)

### Objective
Implement advanced features including search enhancements, exports, analytics, and complex interactions.

### Key Deliverables
- [ ] Advanced search with filters, suggestions, formula search
- [ ] Export functionality (PDF, LaTeX, Markdown)
- [ ] Analytics integration and dashboards
- [ ] KaTeX integration for formula rendering
- [ ] next-seo implementation for all public pages
- [ ] Sitemap generation
- [ ] JSON-LD structured data
- [ ] Performance optimizations (lazy loading, code splitting)

### Entry Criteria
- Phase 2 complete and verified
- Search requirements from `09-search-architecture.md` reviewed
- SEO requirements from `11-seo-requirements.md` available

### Exit Criteria
- Search latency <200ms for 95th percentile
- All public pages have valid SEO metadata
- Export functionality tested with real content
- Lighthouse scores >90 for performance, accessibility, SEO

### Critical Path
1. Search backend integration → Frontend UI → URL sync
2. Export service integration → UI triggers → Download handling
3. SEO metadata → JSON-LD → Sitemap → Validation

### Risks
- **R7**: Search performance degradation → Mitigation: Debouncing, caching per `09-search-architecture.md`
- **R8**: Export service timeouts → Mitigation: Background job pattern with status polling
- **R9**: SEO metadata inconsistencies → Mitigation: Centralized metadata generator per `11-seo-architecture.md`

---

## Phase 4: Admin (Days 16-18)

### Objective
Implement the admin domain including dashboard, content ingestion, batch operations, and monitoring.

### Key Deliverables
- [ ] Admin dashboard with key metrics
- [ ] Content ingestion UI
- [ ] Batch import functionality
- [ ] Version management interface
- [ ] Health monitoring dashboard
- [ ] Search monitoring and failed query tracking
- [ ] Job tracking and status display
- [ ] Admin-specific forms and validations

### Entry Criteria
- Phase 3 complete and verified
- Admin requirements from `10-admin-architecture.md` reviewed
- Backend admin APIs documented in `02-api-inventory.md`

### Exit Criteria
- Admin dashboard displaying real-time metrics
- Content ingestion flow tested end-to-end
- All admin forms validated and secured
- Monitoring dashboards showing accurate data

### Critical Path
1. Admin layout → Dashboard → Metrics integration
2. Ingestion UI → API integration → Validation
3. Monitoring components → Real-time updates → Alerts

### Risks
- **R10**: Admin security gaps → Mitigation: Role-based access control per governance rules
- **R11**: Large batch operation failures → Mitigation: Chunking and progress tracking
- **R12**: Real-time data synchronization → Mitigation: TanStack Query refetch intervals

---

## Phase 5: Polish (Days 19-20)

### Objective
Final optimization, accessibility audit, performance tuning, and production readiness verification.

### Key Deliverables
- [ ] Accessibility audit and fixes (WCAG 2.1 AA)
- [ ] Performance optimization pass
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verification
- [ ] Error message refinement
- [ ] Loading state polish
- [ ] Documentation finalization
- [ ] Production deployment configuration

### Entry Criteria
- Phases 1-4 complete and verified
- All features implemented per `03-feature-registry.md`
- Test coverage targets met

### Exit Criteria
- Zero critical accessibility issues
- Lighthouse scores >95 across all categories
- All E2E tests passing
- Production deployment successful
- Handoff documentation complete

### Critical Path
1. Accessibility audit → Fixes → Re-test
2. Performance profiling → Optimizations → Benchmark
3. Documentation → Review → Finalize

### Risks
- **R13**: Last-minute accessibility issues → Mitigation: Early and continuous a11y testing
- **R14**: Performance regressions → Mitigation: Performance budgets in CI
- **R15**: Browser compatibility issues → Mitigation: Cross-browser testing matrix

---

## Milestone Definitions

### M1: Foundation Complete
- All Phase 1 tasks done
- CI/CD operational
- Team can start feature development

### M2: Core Functional
- All main user flows working
- Public site browsable
- Search functional (basic)

### M3: Feature Complete
- All 14 backend features mapped and implemented
- Admin area operational
- Export and analytics working

### M4: Production Ready
- All quality gates passed
- Performance targets met
- Accessibility compliant
- Deployed to production

---

## Timeline Visualization

```
Week 1: [====Foundation====]
Week 2: [======Core=======][==Core==]
Week 3: [===Core===][====Advanced====]
Week 4: [==Advanced==][=Admin=][Polish]
```

---

## Change Management

Any changes to this roadmap must:
1. Be documented in `08-session-handoff.md` decision log
2. Reference affected blueprint documents
3. Include impact analysis on dependent tasks
4. Be approved via PR review process

---

## References

- Blueprint: `docs/frontend-blueprint/`
- Governance: `CLAUDE.md`, `docs/frontend-implementation/`
- Task Backlog: `docs/project-management/09-task-backlog.md`
- Progress Tracking: `docs/project-management/05-progress-tracker.md`
