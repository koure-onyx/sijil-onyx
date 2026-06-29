# Phase 01: Foundation - Implementation Prompt

## Objective

Set up the complete technical foundation for the Sijil frontend application including project initialization, core infrastructure, design system, and basic navigation structure.

---

## Read First

Read these files in exact order before writing any code:

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md` - Permanent coding rules (MANDATORY)
2. `docs/frontend-pm/CURRENT_PHASE.md` - Current phase status
3. `docs/frontend-phases/01-foundation.md` - Full phase specification
4. `docs/frontend-execution/02-api-registry.md` - API endpoints reference
5. `docs/frontend-execution/05-data-models.md` - TypeScript interfaces

Do NOT read architecture documents, discovery docs, or blueprint docs.

---

## Files To Create

### Configuration Files
- `.env.example` - Environment variable template
- `.env.local` - Local environment configuration
- `components.json` - shadcn/ui configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration

### App Router Files
- `src/app/globals.css` - Global styles with Tailwind base
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Homepage component
- `src/app/not-found.tsx` - 404 error page
- `src/app/providers.tsx` - Client-side providers wrapper

### API Layer
- `src/lib/api/client.ts` - HTTP client wrapper with error handling
- `src/lib/api/endpoints.ts` - Endpoint URL definitions
- `src/lib/api/types.ts` - API response type definitions

### Components
- `src/components/ui/button.tsx` - Button component (shadcn)
- `src/components/ui/card.tsx` - Card component (shadcn)
- `src/components/ui/skeleton.tsx` - Loading skeleton (shadcn)
- `src/components/ui/badge.tsx` - Badge component (shadcn)
- `src/components/layout/header.tsx` - Global header
- `src/components/layout/footer.tsx` - Global footer
- `src/components/layout/main-layout.tsx` - Main layout wrapper
- `src/components/shared/error-boundary.tsx` - Error boundary component
- `src/components/shared/loading-skeleton.tsx` - Generic loading state
- `src/components/shared/stat-card.tsx` - Statistics display card
- `src/components/icons/lucide-icons.ts` - Icon re-exports

### Library & Utilities
- `src/lib/utils.ts` - Utility functions (cn, formatDate, etc.)
- `src/lib/constants.ts` - Application constants

### Hooks
- `src/hooks/use-api.ts` - Generic API hook with React Query
- `src/hooks/use-platform-stats.ts` - Platform statistics hook

### Types
- `src/types/api.ts` - API-related types
- `src/types/models.ts` - Data model interfaces
- `src/types/common.ts` - Common/shared types

### Config
- `src/config/site.ts` - Site metadata configuration
- `src/config/navigation.ts` - Navigation menu configuration

---

## Files That May Change

- `package.json` - Add dependencies
- `pnpm-lock.yaml` - Lock file updates
- `README.md` - Project documentation

---

## Backend APIs

Only these APIs are required for Phase 01:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Backend connectivity verification |
| `/api/platform/stats` | GET | Homepage statistics (documents, topics count) |

All other APIs will be integrated in later phases.

---

## Components

Create only these components:

**Layout Components:**
- Header (logo, basic nav links)
- Footer (copyright, basic links)
- MainLayout wrapper

**Shared Components:**
- ErrorBoundary (catch errors gracefully)
- LoadingSkeleton (generic loading state)
- StatCard (display platform statistics)

**UI Components (shadcn):**
- Button (all variants)
- Card (with CardHeader, CardContent, CardFooter)
- Skeleton (loading placeholders)
- Badge (status indicators)

Do NOT create business components (documents, topics, search) - those belong to Phase 02+.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Never use mocked data** - All data must come from real backend APIs
2. **Server Components by default** - Only use `"use client"` when interactivity requires it
3. **Strict TypeScript** - No `any` types allowed without explicit justification
4. **Mobile-first responsive design** - Base styles target mobile, enhance for larger screens
5. **No inline fetch calls** - All API calls through shared client and React Query hooks
6. **Reuse UI components** - Check registry before creating new components
7. **No duplicated logic** - Extract shared logic into utilities or hooks immediately

**Additional Phase 01 Constraints:**

- Do NOT implement authentication (Phase 05+)
- Do NOT implement document/topic features (Phase 02)
- Do NOT implement search functionality (Phase 07)
- Do NOT implement admin features (Phase 10)
- Keep homepage simple - only stats and basic CTAs

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ Project builds successfully (`npm run build` exits with code 0)
✓ All TypeScript checks pass (`npm run type-check`)
✓ ESLint passes with no errors (`npm run lint`)
✓ Homepage renders with live platform statistics from backend
✓ Health check integration verifies backend connectivity
✓ Navigation between homepage and 404 page works correctly
✓ Header and footer display on all pages
✓ Mobile-responsive layout works on all screen sizes
✓ Error boundary catches and displays errors gracefully
✓ Loading skeletons appear during data fetching

**DO NOT continue to:**
- Document listing pages (Phase 02)
- Topic pages (Phase 02)
- Search functionality (Phase 07)
- Any Phase 02+ features

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used without explicit eslint-disable comment
- [ ] All components have proper TypeScript interfaces
- [ ] Server Components used by default, Client Components only where needed
- [ ] No inline fetch/axios calls in components
- [ ] All API calls use the shared client and React Query hooks

**Functionality:**
- [ ] Homepage displays real data from backend (not mocked)
- [ ] Health check endpoint returns successful response
- [ ] Navigation links work correctly
- [ ] 404 page displays for unknown routes
- [ ] Error boundary catches rendering errors
- [ ] Loading states show during data fetching

**Responsive Design:**
- [ ] Layout works on mobile (320px minimum)
- [ ] Layout works on tablet (768px)
- [ ] Layout works on desktop (1024px+)
- [ ] Touch targets are at least 44px on mobile
- [ ] Typography scales appropriately across breakpoints

**Performance:**
- [ ] No unnecessary Client Components
- [ ] Code splitting working (check bundle analyzer if available)
- [ ] Images optimized (if any images added)
- [ ] No console errors or warnings

**Documentation:**
- [ ] README.md updated with setup instructions
- [ ] .env.example includes all required variables
- [ ] Component props documented with JSDoc where helpful

---

## Deliverables

List these items in your session summary:

**Files Created:**
- [ ] All configuration files (.env.example, next.config.ts, etc.)
- [ ] All App Router files (layout.tsx, page.tsx, not-found.tsx)
- [ ] All API layer files (client.ts, endpoints.ts, types.ts)
- [ ] All UI components (button, card, skeleton, badge)
- [ ] All layout components (header, footer, main-layout)
- [ ] All shared components (error-boundary, loading-skeleton, stat-card)
- [ ] All hooks (use-api.ts, use-platform-stats.ts)
- [ ] All type definitions (api.ts, models.ts, common.ts)
- [ ] Config files (site.ts, navigation.ts)

**Files Modified:**
- [ ] package.json (dependencies added)
- [ ] pnpm-lock.yaml (lock file updated)
- [ ] README.md (setup instructions)

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Homepage loads with real data
- [ ] Manual test: Navigation works
- [ ] Manual test: 404 page displays correctly
- [ ] Manual test: Mobile responsive layout verified

**Acceptance Completed:**
- [ ] All Phase 01 exit criteria from CURRENT_PHASE.md checked off
- [ ] Backend health endpoint responding
- [ ] Platform stats displaying real numbers
- [ ] No console errors in browser
- [ ] Core Web Vitals baseline passing

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 02 as started
4. End session and wait for next instruction

**Estimated Effort:** 2-3 days for complete implementation

**Complexity:** Medium-High (foundation sets up everything)
