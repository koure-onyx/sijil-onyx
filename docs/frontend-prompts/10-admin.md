# Phase 10: Admin Dashboard - Implementation Prompt

## Objective

Build the admin dashboard for content ingestion, batch imports from GitHub, analytics overview, and import status tracking. Focus on content operations only - NO user management features.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/10-admin/README.md`
4. `docs/frontend-phases/10-admin/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Admin APIs

**Critical:** There are NO user management APIs in the backend. Do NOT implement user CRUD, user lists, or any user management features.

---

## Files To Create

### Pages
- `src/app/admin/page.tsx` - Admin dashboard home
- `src/app/admin/ingest/page.tsx` - JSON ingestion
- `src/app/admin/import/page.tsx` - Batch import
- `src/app/admin/import/[batchId]/page.tsx` - Import status
- `src/app/admin/analytics/page.tsx` - Analytics overview
- `src/app/admin/versions/[type]/[id]/page.tsx` - Version history

### Layouts
- `src/app/admin/layout.tsx` - Admin-specific layout with sidebar

### Components
- `src/components/admin/admin-layout.tsx` - Admin layout wrapper
- `src/components/admin/admin-sidebar.tsx` - Navigation menu
- `src/components/admin/ingestion-form.tsx` - JSON ingestion form
- `src/components/admin/import-preview.tsx` - Batch import preview table
- `src/components/admin/import-progress.tsx` - Import progress indicator
- `src/components/admin/analytics-dashboard.tsx` - Key metrics visualization
- `src/components/admin/status-badge.tsx` - Job status indicators
- `src/components/admin/version-history-table.tsx` - Version history display
- `src/components/admin/filter-panel.tsx` - Advanced filtering
- `src/components/admin/pagination-controls.tsx` - Table pagination

### Hooks
- `src/hooks/use-ingestion.ts` - Ingestion management
- `src/hooks/use-batch-import.ts` - Batch import management
- `src/hooks/use-admin-analytics.ts` - Analytics data fetching

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ingest/json` | POST | Submit JSON for ingestion |
| `/api/ingest/:trackingId` | GET | Get ingestion status |
| `/api/import/batch` | POST | Create batch import job |
| `/api/import/batch/:batchId` | GET | Get batch status |
| `/api/import/batch/:batchId/preview` | GET | Preview import data |
| `/api/import/batch/:batchId/retry` | POST | Retry failed import |
| `/api/import/batch/:batchId/cancel` | POST | Cancel import |
| `/api/analytics/overview` | GET | System analytics |
| `/api/versions/:type/:id` | GET | Version history |

**NO User Management APIs** - Do not create user CRUD features.

---

## Rules

**Critical:**
- JSON ingestion for single document uploads
- Batch import from GitHub repositories
- Import status tracking with retry/cancel
- Real-time analytics charts
- Version history viewing
- NO user management features

---

## Stop Conditions

✓ Admin dashboard accessible
✓ JSON ingestion works
✓ Batch import from GitHub functional
✓ Import status tracking works
✓ Analytics overview displays
✓ Version history viewable

**DO NOT continue to:** SEO (Phase 11), Performance (Phase 12)

---

## Deliverables

**Files Created:** Admin pages, components, hooks
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 10 exit criteria met

**Estimated Effort:** 4-5 days

**Complexity:** Medium-Large
