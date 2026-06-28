# Sijil — Frontend Blueprint: Implementation Phases

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document breaks the Sijil frontend into execution phases. Each phase is independently testable and produces working software that can be deployed and validated before proceeding to the next phase.

---

## Phase 1: Foundation & Infrastructure

**Duration:** Week 1  
**Goal:** Working project with all infrastructure in place

### Deliverables
- [ ] Next.js 16 project initialized
- [ ] TypeScript configured
- [ ] Tailwind 4 + shadcn/ui installed
- [ ] ESLint + Prettier configured
- [ ] Environment variables set up
- [ ] Root layout with providers
- [ ] Base HTTP client (`lib/api/client.ts`)
- [ ] TanStack Query setup
- [ ] All shadcn/ui components installed

### Testable Outcomes
- `pnpm dev` runs without errors
- Homepage renders with basic layout
- API client can make test requests
- TanStack Query DevTools accessible

### Deployment Ready
✅ Yes — Empty shell ready for feature development

---

## Phase 2: API Layer & State Management

**Duration:** Week 2  
**Goal:** Complete API client layer with typing

### Deliverables
- [ ] All API client files created (`*.api.ts`)
- [ ] Shared types defined (`lib/api/types.ts`)
- [ ] Error handling implemented
- [ ] Retry logic implemented
- [ ] Query keys defined (`lib/query-keys.ts`)
- [ ] Zustand stores created (admin, exports, quran)
- [ ] Custom hooks for shared utilities

### Testable Outcomes
- Can fetch documents from API
- Can fetch topics by slug
- Can search topics
- Error handling works correctly
- Zustand stores persist data

### Deployment Ready
✅ Yes — API integration verified, no UI yet

---

## Phase 3: Rendering Engine

**Duration:** Week 3  
**Goal:** Complete BlockRenderer with all 17 block types

### Deliverables
- [ ] BlockRenderer registry created
- [ ] All 17 block renderers implemented
- [ ] KaTeX integration working
- [ ] Image/SVG rendering working
- [ ] Table rendering working
- [ ] MCQ interactive component working

### Testable Outcomes
- Can render sample topic content
- LaTeX formulas display correctly
- Images load with fallbacks
- Tables render properly
- MCQs are interactive

### Deployment Ready
✅ Yes — Content rendering verified with mock data

---

## Phase 4: Documents Module

**Duration:** Week 4  
**Goal:** Working document browsing experience

### Deliverables
- [ ] Document list page with filters
- [ ] Document detail page
- [ ] Subject browse pages
- [ ] Grade filter pages
- [ ] DocumentCard component
- [ ] DocumentFilters component
- [ ] ChapterOutline component

### Testable Outcomes
- Can browse documents
- Can filter by subject/grade/type
- Can view document details
- Pagination works
- Navigation between pages works

### Deployment Ready
✅ Yes — Users can browse documents

---

## Phase 5: Topics Module

**Duration:** Week 4-5  
**Goal:** Complete topic viewing experience

### Deliverables
- [ ] Topic page with full content
- [ ] TableOfContents component
- [ ] NextPrevNavigation component
- [ ] TopicSidebar component
- [ ] Breadcrumb component
- [ ] Loading skeletons
- [ ] TopicLayout implementation

### Testable Outcomes
- Can view topic by slug
- Content renders correctly
- TOC links work
- Next/Prev navigation works
- Breadcrumb displays hierarchy

### Deployment Ready
✅ Yes — Core content consumption working

---

## Phase 6: Search Module

**Duration:** Week 5  
**Goal:** Working search with filters

### Deliverables
- [ ] Search results page
- [ ] Formula search page
- [ ] SearchBar with autocomplete
- [ ] FilterPanel component
- [ ] SearchResultCard component
- [ ] URL state synchronization
- [ ] SearchLayout implementation

### Testable Outcomes
- Can search topics
- Autocomplete suggestions work
- Filters update results
- URL reflects filter state
- Formula search works

### Deployment Ready
✅ Yes — Search functionality complete

---

## Phase 7: Quran Module

**Duration:** Week 5  
**Goal:** Working Quran browser

### Deliverables
- [ ] Surah pages
- [ ] Ayah pages
- [ ] SurahSelector component
- [ ] AyahNavigator component
- [ ] TranslationToggle component
- [ ] Arabic font loading
- [ ] QuranLayout implementation

### Testable Outcomes
- Can browse surahs
- Can navigate between ayahs
- Translations toggle correctly
- Arabic text renders properly

### Deployment Ready
✅ Yes — Quran browsing complete

---

## Phase 8: Exports Module

**Duration:** Week 6  
**Goal:** Working export system

### Deliverables
- [ ] ExportButton component
- [ ] ExportModal with format selection
- [ ] ExportStatus page
- [ ] Polling for job status
- [ ] Download management

### Testable Outcomes
- Can create export jobs
- Status updates in real-time
- Downloads work when complete
- Policy enforcement works

### Deployment Ready
✅ Yes — Export functionality complete

---

## Phase 9: SEO Integration

**Duration:** Week 6  
**Goal:** Fully SEO-optimized public pages

### Deliverables
- [ ] generateMetadata on all public pages
- [ ] JSON-LD injection
- [ ] Breadcrumb schema
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Dynamic OG images

### Testable Outcomes
- Meta tags present in HTML
- JSON-LD validates in Rich Results Test
- Sitemap accessible at /sitemap.xml
- OG images generate correctly

### Deployment Ready
✅ Yes — SEO-ready for search engines

---

## Phase 10: Admin Module

**Duration:** Week 7  
**Goal:** Complete admin dashboard

### Deliverables
- [ ] AdminDashboard page
- [ ] Ingestion form with JSON editor
- [ ] Batch import form
- [ ] Job status tracking
- [ ] Analytics dashboard
- [ ] Health monitoring
- [ ] AdminLayout with auth

### Testable Outcomes
- Admin authentication works
- Can submit ingestion jobs
- Can start batch imports
- Job status updates in real-time
- Analytics display correctly

### Deployment Ready
✅ Yes — Admin system operational

---

## Phase 11: Homepage & Polish

**Duration:** Week 7  
**Goal:** Complete landing page experience

### Deliverables
- [ ] Homepage with stats widgets
- [ ] Recent arrivals carousel
- [ ] Popular topics list
- [ ] Subject browse grid
- [ ] Footer links
- [ ] Mobile responsive testing

### Testable Outcomes
- Homepage loads quickly
- All widgets display data
- Navigation works on mobile
- No console errors

### Deployment Ready
✅ Yes — Production-ready homepage

---

## Phase 12: Testing & QA

**Duration:** Week 8  
**Goal:** Verified production readiness

### Deliverables
- [ ] Unit tests for hooks
- [ ] Component tests
- [ ] Integration tests for key flows
- [ ] Lighthouse audit (>90 scores)
- [ ] Bundle size optimization
- [ ] Cross-browser testing

### Testable Outcomes
- All tests pass
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle < 500KB gzipped

### Deployment Ready
✅ Yes — Quality verified

---

## Phase 13: Deployment

**Duration:** Week 8  
**Goal:** Live production system

### Deliverables
- [ ] CI/CD pipeline configured
- [ ] Preview deployments working
- [ ] Production deployment configured
- [ ] Error tracking set up
- [ ] Analytics tracking enabled
- [ ] Monitoring dashboards

### Testable Outcomes
- Deploy preview on PR
- Auto-deploy to production on main
- Errors logged to tracking service
- Analytics events firing

### Deployment Ready
✅ Yes — Live in production

---

## Phase Dependencies

```
Phase 1 (Foundation)
       ↓
Phase 2 (API Layer)
       ↓
Phase 3 (Rendering Engine)
       ↓
    ┌──┴──┐
    ↓     ↓
Phase 4  Phase 5 (Topics)
(Documents)
    ↓     ↓
    └──┬──┘
       ↓
Phase 6 (Search)
       ↓
    ┌──┴──┐
    ↓     ↓
Phase 7  Phase 8 (Exports)
(Quran)
    ↓     ↓
    └──┬──┘
       ↓
Phase 9 (SEO)
       ↓
Phase 10 (Admin)
       ↓
Phase 11 (Homepage)
       ↓
Phase 12 (Testing)
       ↓
Phase 13 (Deployment)
```

---

## Related Documents

- [12-build-order.md](./12-build-order.md) — Engineering dependency order
- [13-folder-structure.md](./13-folder-structure.md) — File organization
