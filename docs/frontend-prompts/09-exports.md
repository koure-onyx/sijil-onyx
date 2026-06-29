# Phase 09: Exports - Implementation Prompt

## Objective

Implement export functionality allowing users to download documents and topics in multiple formats (PDF, LaTeX, Markdown) with asynchronous job processing and progress tracking.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/09-exports/README.md`
4. `docs/frontend-phases/09-exports/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Export APIs

---

## Files To Create

### Pages
- `src/app/exports/[jobId]/page.tsx` - Export status page

### Components
- `src/components/export/export-trigger.tsx` - Button/dropdown to initiate export
- `src/components/export/export-modal.tsx` - Format selection and options
- `src/components/export/export-status-indicator.tsx` - Progress/status display
- `src/components/export/download-button.tsx` - Download completed exports

### Hooks
- `src/hooks/use-export.ts` - Export job management
- `src/hooks/use-export-progress.ts` - Progress polling

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/exports` | POST | Create export job |
| `/api/v1/exports/:jobId` | GET | Get job status |
| `/api/v1/exports/:jobId/download` | GET | Download file |
| `/api/v1/exports/:jobId` | DELETE | Cancel job |

---

## Rules

**Critical:**
- Format selection (PDF/LaTeX/Markdown)
- Progress polling for async jobs
- Auto-download on completion
- Error recovery
- No export history feature (not in backend)

---

## Stop Conditions

✓ Export flow works end-to-end
✓ Multiple formats supported
✓ Progress tracking functional
✓ Downloads complete successfully

**DO NOT continue to:** Admin (Phase 10), SEO (Phase 11)

---

## Deliverables

**Files Created:** Export components, hooks, status page
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 09 exit criteria met

**Estimated Effort:** 3-4 days

**Complexity:** Medium
