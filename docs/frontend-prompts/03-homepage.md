# Phase 03: Homepage - Implementation Prompt

## Objective

Build the public homepage that serves as the entry point for all users, showcasing the platform's value proposition, displaying collection highlights, statistics from the backend, and providing quick access to key features.

---

## Read First

Read these files in exact order before writing any code:

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md` - Permanent coding rules (MANDATORY)
2. `docs/frontend-pm/CURRENT_PHASE.md` - Current phase status
3. `docs/frontend-phases/03-homepage/README.md` - Phase overview
4. `docs/frontend-phases/03-homepage/implementation.md` - Detailed implementation spec
5. `docs/frontend-execution/02-api-registry.md` - API endpoints for stats and subjects

Do NOT read architecture documents, discovery docs, or blueprint docs.

---

## Files To Create

### Page Components
- `src/app/page.tsx` - Homepage (update from Phase 01)

### Homepage Sections
- `src/components/home/hero-section.tsx` - Hero with value proposition
- `src/components/home/stats-section.tsx` - Platform statistics display
- `src/components/home/collections-grid.tsx` - Subject collections showcase
- `src/components/home/featured-content.tsx` - Recent/featured documents
- `src/components/home/cta-section.tsx` - Call-to-action section

### Data Fetching
- `src/hooks/use-platform-stats.ts` - Statistics data hook
- `src/hooks/use-subjects.ts` - Subjects list hook
- `src/hooks/use-recent-documents.ts` - Recent documents hook

### SEO
- Update metadata in `src/app/page.tsx` - Homepage SEO metadata
- Add structured data for homepage

---

## Files That May Change

- `src/app/layout.tsx` - If metadata updates needed
- `src/components/layout/header.tsx` - If navigation updates needed
- `src/config/navigation.ts` - May add new links

---

## Backend APIs

Only these APIs are required for Phase 03:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/platform/stats` | GET | Homepage statistics (documents, topics, assessments count) |
| `/api/v1/subjects` | GET | List of all subjects/collections |
| `/api/v1/documents/recent` | GET | Recently added documents |

All other APIs will be integrated in later phases.

---

## Components

Create only these components:

**Section Components:**
- HeroSection (value proposition, primary CTAs)
- StatsSection (platform statistics from API)
- CollectionsGrid (subject cards with badges)
- FeaturedContent (recent documents preview)
- CTASection (call-to-action for signup/explore)

**Shared Components (reuse from Phase 01/02):**
- StatCard (for stats display)
- CollectionBadge (for subject badges)
- Button (for CTAs)
- Card (for content containers)

Do NOT create document detail or topic detail components - those belong to later phases.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Never use mocked data** - All statistics must come from real backend APIs
2. **Server Components by default** - Homepage is a Server Component with async data fetching
3. **Strict TypeScript** - No `any` types allowed
4. **Mobile-first responsive design** - Base styles target mobile
5. **No inline fetch calls** - Use React Query hooks or server-side fetching

**Additional Phase 03 Constraints:**

- Do NOT implement authentication gates
- Do NOT create individual document pages (Phase 06)
- Do NOT implement search functionality (Phase 07)
- Keep featured content simple (no complex filtering)
- Parallelize API calls at top level to minimize waterfall

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ Hero section displays compelling value proposition
✓ Collections grid shows all subjects from backend
✓ Stats fetch and display real numbers from backend API
✓ Responsive layout works on all devices (mobile to desktop)
✓ SEO metadata complete (title, description, Open Graph)
✓ Structured data implemented (JSON-LD)
✓ All TypeScript checks pass
✓ ESLint passes with no errors
✓ Build completes successfully
✓ Core Web Vitals baseline passing (LCP, CLS, INP)

**DO NOT continue to:**
- Topic listing pages (Phase 04)
- Document detail pages (Phase 06)
- Search functionality (Phase 07)

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used
- [ ] All components have proper TypeScript interfaces
- [ ] Server Component used for homepage
- [ ] Data fetched in parallel at top level
- [ ] No inline fetch calls

**Functionality:**
- [ ] Hero section displays with clear value proposition
- [ ] Stats show real data from backend (not hardcoded)
- [ ] Collections grid displays all subjects
- [ ] Featured content shows recent documents
- [ ] CTAs link to correct routes
- [ ] Loading states show during data fetching
- [ ] Error states display gracefully

**Responsive Design:**
- [ ] Hero section works on mobile (320px minimum)
- [ ] Stats grid stacks on mobile, horizontal on desktop
- [ ] Collections grid responsive (1 col mobile → 3-4 cols desktop)
- [ ] Touch targets at least 44px

**SEO:**
- [ ] Title tag includes primary keywords
- [ ] Meta description present (150-160 characters)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags present
- [ ] Structured data (JSON-LD) valid
- [ ] Canonical URL set

**Performance:**
- [ ] Images optimized (if any images added)
- [ ] No unnecessary Client Components
- [ ] LCP under 2.5s
- [ ] CLS under 0.1
- [ ] No console errors or warnings

---

## Deliverables

List these items in your session summary:

**Files Created:**
- [ ] Homepage page component
- [ ] HeroSection component
- [ ] StatsSection component
- [ ] CollectionsGrid component
- [ ] FeaturedContent component
- [ ] CTASection component
- [ ] Data fetching hooks

**Files Modified:**
- [ ] Root layout (if metadata updates)
- [ ] Navigation config (if new links added)

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Homepage loads with real data
- [ ] Manual test: Stats update dynamically
- [ ] Manual test: Mobile responsive verified
- [ ] Manual test: SEO metadata in page source
- [ ] Manual test: Lighthouse score checked

**Acceptance Completed:**
- [ ] All Phase 03 exit criteria from CURRENT_PHASE.md checked off
- [ ] Backend APIs responding with data
- [ ] No console errors in browser
- [ ] Core Web Vitals baseline passing

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 04 as started
4. End session and wait for next instruction

**Estimated Effort:** 1-2 days

**Complexity:** Medium
