# Phase 07: Search Functionality - Implementation Prompt

## Objective

Implement comprehensive search capabilities including global search across all content types, formula pattern matching, faceted filtering, and result highlighting.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/07-search/README.md`
4. `docs/frontend-phases/07-search/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Search APIs

---

## Files To Create

### Pages
- `src/app/search/page.tsx` - Global search results page
- `src/app/search/formulas/page.tsx` - Formula search page

### Components
- `src/components/search/search-bar.tsx` - Header search input with autocomplete
- `src/components/search/search-results.tsx` - Main results container
- `src/components/search/search-result-card.tsx` - Individual result item
- `src/components/search/search-filters.tsx` - Faceted filter sidebar
- `src/components/search/search-highlights.tsx` - Text highlighting
- `src/components/search/formula-search-input.tsx` - Specialized formula input
- `src/components/search/search-suggestions.tsx` - Autocomplete dropdown
- `src/components/search/recent-searches.tsx` - Search history
- `src/components/search/no-results-found.tsx` - Empty state
- `src/components/search/search-stats.tsx` - Result count and timing

### Hooks
- `src/hooks/use-search.ts` - Search data fetching
- `src/hooks/use-search-suggestions.ts` - Autocomplete suggestions
- `src/hooks/use-search-filters.ts` - Filter management
- `src/hooks/use-recent-searches.ts` - Search history

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/search` | GET | Global text search |
| `/api/v1/search/formulas` | GET | Formula pattern search |
| `/api/v1/search/suggestions` | GET | Autocomplete suggestions |
| `/api/v1/search/filters` | GET | Available filter facets |
| `/api/v1/analytics/search` | POST | Track search events |

---

## Rules

**Critical:**
- Real-time search suggestions (debounced)
- Query parameter-based state management
- Filter persistence in URL
- Keyboard navigation (Arrow keys, Enter, Escape)
- Response time < 300ms for typical queries

---

## Stop Conditions

✓ Global search works across all content types
✓ Formula pattern search functional
✓ Faceted filtering by subject, grade, document type
✓ Result highlighting with context snippets
✓ Search history and suggestions working
✓ Fast response times (< 300ms)

**DO NOT continue to:** Assessments (Phase 08), Exports (Phase 09)

---

## Deliverables

**Files Created:** Search pages, components, hooks
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 07 exit criteria met

**Estimated Effort:** 4-5 days

**Complexity:** Medium-Large
