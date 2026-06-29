# Phase 05: Topic Detail - Implementation Prompt

## Objective

Implement the Topic Detail page allowing users to explore a specific topic's hierarchy, view associated documents, and navigate to child topics or document pages.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/05-topic-detail/README.md`
4. `docs/frontend-phases/05-topic-detail/implementation.md`
5. `docs/frontend-execution/02-api-registry.md`

---

## Files To Create

### Pages
- `src/app/topics/[slug]/page.tsx` - Update for full topic detail

### Components
- `src/components/topic-detail/topic-header.tsx` - Title, description, metadata
- `src/components/topic-detail/document-list.tsx` - Documents in this topic
- `src/components/topic-detail/child-topics.tsx` - Child topic grid
- `src/components/topic-detail/topic-actions.tsx` - Share, export actions

### Hooks
- `src/hooks/use-topic-detail.ts` - Topic detail data fetching

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/topics/:slug` | GET | Get full topic details |
| `/api/v1/topics/:slug/documents` | GET | Documents in topic |
| `/api/v1/topics/:slug/children` | GET | Child topics |

---

## Stop Conditions

✓ Topic detail renders correctly for all topic types
✓ Breadcrumb navigation works for nested topics
✓ Document list displays with pagination
✓ Child topics clickable and navigate correctly
✓ All loading/error states implemented
✓ SEO metadata configured

**DO NOT continue to:** Document viewer (Phase 06), Assessments (Phase 08)

---

## Deliverables

**Files Created:** Topic detail components, hooks
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 05 exit criteria met

**Estimated Effort:** 2-3 days
