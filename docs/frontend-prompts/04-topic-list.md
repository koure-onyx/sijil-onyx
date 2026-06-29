# Phase 04: Topic List - Implementation Prompt

## Objective

Implement the Topic List screen that allows users to browse all available topics in the Sijil system with hierarchical navigation, filtering by collection type, and search-within-topics capability.

---

## Read First

Read these files in exact order before writing any code:

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md` - Permanent coding rules (MANDATORY)
2. `docs/frontend-pm/CURRENT_PHASE.md` - Current phase status
3. `docs/frontend-phases/04-topic-list/README.md` - Phase overview
4. `docs/frontend-phases/04-topic-list/implementation.md` - Detailed implementation spec
5. `docs/frontend-execution/02-api-registry.md` - Topics API endpoints
6. `docs/frontend-execution/05-data-models.md` - Topic data models

Do NOT read architecture documents, discovery docs, or blueprint docs.

---

## Files To Create

### Pages
- `src/app/topics/page.tsx` - Main topic list page with filtering
- `src/app/topics/[slug]/page.tsx` - Child topics within parent topic

### Components
- `src/components/topics/topic-card.tsx` - Individual topic display
- `src/components/topics/topic-grid.tsx` - Grid layout for topics
- `src/components/topics/breadcrumb-nav.tsx` - Hierarchical breadcrumb
- `src/components/topics/filter-bar.tsx` - Collection filter dropdown
- `src/components/topics/search-input.tsx` - Search within topics
- `src/components/topics/pagination-controls.tsx` - Pagination component
- `src/components/topics/empty-state.tsx` - No results state

### Hooks
- `src/hooks/use-topics.ts` - Topics data fetching hook
- `src/hooks/use-topic-filters.ts` - Filter state management
- `src/hooks/use-topic-search.ts` - Search functionality

### Types
- `src/types/topic.ts` - Topic interfaces and types

---

## Files That May Change

- `src/config/navigation.ts` - May add topics link
- `src/components/layout/header.tsx` - If nav updates needed

---

## Backend APIs

Only these APIs are required for Phase 04:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/topics` | GET | List all root-level topics |
| `/api/v1/topics/:slug` | GET | Get topic by slug |
| `/api/v1/topics/:slug/children` | GET | Get child topics |
| `/api/v1/subjects` | GET | Get collection types for filtering |

---

## Components

Create only these components:

**Topic Display:**
- TopicCard (title, document count, collection badge)
- TopicGrid (responsive grid layout)
- BreadcrumbNav (hierarchical navigation)

**Filtering & Search:**
- FilterBar (collection type dropdown)
- SearchInput (topic search with debounce)
- PaginationControls (page navigation)

**States:**
- EmptyState (no results found)
- LoadingSkeleton (matching Phase 01 patterns)

Do NOT create document viewer or assessment components - those belong to later phases.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Never use mocked data** - All topics from real backend APIs
2. **Server Components by default** - Topic list is Server Component
3. **Strict TypeScript** - No `any` types allowed
4. **Mobile-first responsive design** - Base styles target mobile
5. **No inline fetch calls** - Use React Query hooks

**Additional Phase 04 Constraints:**

- Support query params: `?collection=quran&search=prayer&page=1`
- Initial page size: 20 topics
- Maintain consistent navigation patterns from Phase 02
- Ensure WCAG 2.1 AA accessibility compliance

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ All topics load correctly from backend
✓ Hierarchical navigation works seamlessly
✓ Filtering by collection type functions properly
✓ Mobile and desktop layouts fully responsive
✓ Accessibility standards met (WCAG 2.1 AA)
✓ Performance metrics achieved (< 2s load time)
✓ All TypeScript checks pass
✓ ESLint passes with no errors
✓ Build completes successfully

**DO NOT continue to:**
- Topic detail content (Phase 05)
- Document viewer (Phase 06)
- Assessments (Phase 08)

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used
- [ ] All components have proper TypeScript interfaces
- [ ] Server Components used by default
- [ ] Query params managed correctly
- [ ] No inline fetch calls

**Functionality:**
- [ ] Root topics display correctly
- [ ] Child topics navigate properly
- [ ] Breadcrumb shows correct hierarchy
- [ ] Filter dropdown works
- [ ] Search filters topics
- [ ] Pagination functions
- [ ] Loading states show
- [ ] Error states display gracefully

**Responsive Design:**
- [ ] Topic grid responsive (1 col mobile → 3-4 cols desktop)
- [ ] Filter bar accessible on mobile
- [ ] Touch targets at least 44px

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] ARIA labels on interactive elements
- [ ] Screen reader friendly

---

## Deliverables

**Files Created:**
- [ ] Topic list page
- [ ] Topic detail/slug page
- [ ] TopicCard component
- [ ] TopicGrid component
- [ ] BreadcrumbNav component
- [ ] FilterBar component
- [ ] SearchInput component
- [ ] PaginationControls component
- [ ] Data fetching hooks

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Topic browsing works
- [ ] Manual test: Filtering works
- [ ] Manual test: Search works
- [ ] Manual test: Pagination works
- [ ] Manual test: Mobile responsive verified

**Acceptance Completed:**
- [ ] All Phase 04 exit criteria from CURRENT_PHASE.md checked off
- [ ] Backend APIs responding
- [ ] No console errors

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 05 as started
4. End session and wait for next instruction

**Estimated Effort:** 2-3 days

**Complexity:** Medium
