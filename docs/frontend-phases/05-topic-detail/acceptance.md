# Phase 05: Topic Detail - Acceptance Criteria

## Definition of Done

This document defines the complete, measurable acceptance criteria for Phase 05. All items must pass before this phase is considered complete.

---

## Functional Requirements

### FR-1: Page Rendering

**ID:** FR-1  
**Requirement:** Topic detail page renders correctly for all valid topic slugs  
**Test Method:** Manual Test 1, Manual Test 3  
**Pass Criteria:**
- [ ] Page loads without errors for existing topics
- [ ] Topic title displays as h1 heading
- [ ] Topic description displays (or shows empty state if null)
- [ ] Metadata (level, document count, child count) visible
- [ ] Layout matches design specifications
- [ ] No console errors during rendering

---

### FR-2: Breadcrumb Navigation

**ID:** FR-2  
**Requirement:** Breadcrumb shows hierarchical path and enables navigation  
**Test Method:** Manual Test 2  
**Pass Criteria:**
- [ ] Breadcrumb displays full hierarchy from Home to current topic
- [ ] Each ancestor topic is clickable and navigates correctly
- [ ] Current topic shown as plain text (not clickable)
- [ ] "Home" link navigates to homepage
- [ ] "Topics" link navigates to topic list
- [ ] Chevron separators between items
- [ ] ARIA label "Breadcrumb" present

---

### FR-3: Child Topics Display

**ID:** FR-3  
**Requirement:** Child topics displayed in responsive grid  
**Test Method:** Manual Test 4  
**Pass Criteria:**
- [ ] Child topics section appears when childCount > 0
- [ ] Each child topic card shows title, description, document count
- [ ] Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- [ ] Clicking child topic navigates to its detail page
- [ ] Empty state shown when no child topics exist
- [ ] Section has aria-label "Child topics"

---

### FR-4: Document List with Pagination

**ID:** FR-4  
**Requirement:** Documents listed with functional pagination  
**Test Method:** Manual Test 5  
**Pass Criteria:**
- [ ] Documents section appears when documentCount > 0
- [ ] 20 documents displayed per page (default)
- [ ] Pagination controls show current page number
- [ ] Page numbers clickable for navigation
- [ ] Previous button disabled on page 1
- [ ] Next button disabled on last page
- [ ] Navigation updates document list correctly
- [ ] Empty state shown when no documents exist
- [ ] Section has aria-label "Documents in this topic"

---

### FR-5: Loading States

**ID:** FR-5  
**Requirement:** Skeleton loading states displayed during data fetch  
**Test Method:** Manual Test 6  
**Pass Criteria:**
- [ ] Skeleton appears immediately on navigation
- [ ] Breadcrumb skeleton shows 3 segments
- [ ] Header skeleton shows title and description lines
- [ ] Child topics skeleton shows 6 card placeholders
- [ ] Documents skeleton shows 5 row placeholders
- [ ] Skeleton animation smooth and subtle
- [ ] Content replaces skeleton when loaded
- [ ] No layout shift after loading completes

---

### FR-6: Error Handling - 404

**ID:** FR-6  
**Requirement:** Custom 404 page for non-existent topics  
**Test Method:** Manual Test 7  
**Pass Criteria:**
- [ ] Navigating to invalid slug shows 404 page
- [ ] Message "Topic not found" displayed
- [ ] Link to browse all topics provided
- [ ] HTTP status code is 404 (verified in Network tab)
- [ ] No JavaScript errors in console
- [ ] 404 page uses consistent design system

---

### FR-7: Error Handling - Server Errors

**ID:** FR-7  
**Requirement:** Error boundary catches and handles server errors  
**Test Method:** Manual Test 8  
**Pass Criteria:**
- [ ] Simulated 500 error triggers error boundary
- [ ] User-friendly error message displayed
- [ ] "Try again" button present and functional
- [ ] Clicking retry re-fetches data
- [ ] Error logged to console for debugging
- [ ] No white screen or crash

---

### FR-8: Empty States

**ID:** FR-8  
**Requirement:** Graceful handling of topics with no content  
**Test Method:** Manual Test 9  
**Pass Criteria:**
- [ ] Topic with no children shows appropriate message
- [ ] Topic with no documents shows appropriate message
- [ ] Topic with neither shows combined message
- [ ] Empty state components styled consistently
- [ ] Suggestions to browse other topics provided
- [ ] No broken layouts or missing sections

---

## SEO Requirements

### SEO-1: Meta Tags

**ID:** SEO-1  
**Requirement:** Proper meta tags for search engines  
**Test Method:** Manual Test 10  
**Pass Criteria:**
- [ ] `<title>` tag contains topic title + " | Sijil"
- [ ] `<meta name="description">` contains topic description or default
- [ ] Title length 50-60 characters (optimal for SERP)
- [ ] Description length 150-160 characters (optimal for SERP)
- [ ] No duplicate meta tags
- [ ] Meta tags unique per topic

---

### SEO-2: Open Graph Tags

**ID:** SEO-2  
**Requirement:** Open Graph tags for social sharing  
**Test Method:** Manual Test 10  
**Pass Criteria:**
- [ ] `og:title` set to topic title
- [ ] `og:description` set to topic description
- [ ] `og:type` set to "website"
- [ ] `og:url` set to canonical URL
- [ ] `og:site_name` set to "Sijil"
- [ ] Tags validate using Facebook Sharing Debugger

---

### SEO-3: Structured Data

**ID:** SEO-3  
**Requirement:** JSON-LD structured data for rich snippets  
**Test Method:** Manual Test 10  
**Pass Criteria:**
- [ ] JSON-LD script present in page head
- [ ] Schema type is "Thing" or "Article"
- [ ] Name property set to topic title
- [ ] Description property set to topic description
- [ ] URL property set to canonical URL
- [ ] Validates in Google Rich Results Test

---

### SEO-4: Canonical URL

**ID:** SEO-4  
**Requirement:** Canonical URL prevents duplicate content  
**Test Method:** Manual Test 10  
**Pass Criteria:**
- [ ] `<link rel="canonical">` present
- [ ] href attribute set to absolute URL
- [ ] URL matches current topic slug
- [ ] No conflicting canonical tags

---

## Responsive Design Requirements

### RD-1: Mobile Layout (< 768px)

**ID:** RD-1  
**Requirement:** Single column layout on mobile devices  
**Test Method:** Manual Test 11  
**Pass Criteria:**
- [ ] Content width 100% minus padding
- [ ] Breadcrumb wraps if too long
- [ ] Child topics grid collapses to 1 column
- [ ] Document cards full width
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scrolling
- [ ] Text readable at 16px base size

---

### RD-2: Tablet Layout (768px - 1023px)

**ID:** RD-2  
**Requirement:** Two column layout on tablets  
**Test Method:** Manual Test 11  
**Pass Criteria:**
- [ ] Child topics grid shows 2 columns
- [ ] Document cards use standard width
- [ ] Adequate whitespace maintained
- [ ] Images scale appropriately
- [ ] Footer remains accessible

---

### RD-3: Desktop Layout (≥ 1024px)

**ID:** RD-3  
**Requirement:** Three column layout on desktop  
**Test Method:** Manual Test 11  
**Pass Criteria:**
- [ ] Child topics grid shows 3 columns
- [ ] Document cards wider with more info
- [ ] Maximum content width container applied
- [ ] Optimal line length for readability (50-75 chars)
- [ ] Footer spans full width

---

## Accessibility Requirements

### A11Y-1: Keyboard Navigation

**ID:** A11Y-1  
**Requirement:** Full keyboard accessibility  
**Test Method:** Manual Test 12  
**Pass Criteria:**
- [ ] All interactive elements focusable with Tab
- [ ] Focus order logical (top to bottom, left to right)
- [ ] Focus indicators clearly visible (2px outline minimum)
- [ ] Enter key activates focused links
- [ ] Space key activates buttons
- [ ] Arrow keys navigate breadcrumb (if implemented)
- [ ] Skip to content link functional
- [ ] No keyboard traps (can exit all components)

---

### A11Y-2: Screen Reader Support

**ID:** A11Y-2  
**Requirement:** Compatible with screen readers  
**Test Method:** Manual Test 13  
**Pass Criteria:**
- [ ] Page title announced correctly
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Breadcrumb labeled with aria-label
- [ ] Sections have descriptive labels
- [ ] Links announce meaningful destinations
- [ ] Loading states announced
- [ ] Icons hidden from screen reader (aria-hidden) or have alt text
- [ ] Tested with NVDA, JAWS, or VoiceOver

---

### A11Y-3: Semantic HTML

**ID:** A11Y-3  
**Requirement:** Proper semantic HTML structure  
**Test Method:** Code review, axe DevTools  
**Pass Criteria:**
- [ ] `<nav>` element for breadcrumb
- [ ] `<main>` element for primary content
- [ ] `<section>` elements for content areas
- [ ] `<article>` or `<li>` for topic/document cards
- [ ] Proper heading levels (h1, h2, h3)
- [ ] Lists use `<ul>`/`<ol>` and `<li>`
- [ ] No div soup (semantic elements used appropriately)

---

### A11Y-4: Color Contrast

**ID:** A11Y-4  
**Requirement:** Sufficient color contrast ratios  
**Test Method:** axe DevTools, WebAIM Contrast Checker  
**Pass Criteria:**
- [ ] Normal text contrast ratio ≥ 4.5:1
- [ ] Large text contrast ratio ≥ 3:1
- [ ] UI components contrast ratio ≥ 3:1
- [ ] Focus indicators contrast ratio ≥ 3:1
- [ ] No color-only information conveyance

---

## Performance Requirements

### PERF-1: Core Web Vitals

**ID:** PERF-1  
**Requirement:** Meet Core Web Vitals thresholds  
**Test Method:** Manual Test 16, Lighthouse  
**Pass Criteria:**
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] Performance score ≥ 90

---

### PERF-2: API Efficiency

**ID:** PERF-2  
**Requirement:** Efficient API usage and caching  
**Test Method:** Manual Test 14, Network tab analysis  
**Pass Criteria:**
- [ ] Topic details fetched once per page load
- [ ] Child topics cached for 5 minutes
- [ ] Documents cached for 2 minutes
- [ ] No duplicate API calls
- [ ] React Query cache working correctly
- [ ] ISR revalidation configured (1 hour)

---

### PERF-3: Bundle Size

**ID:** PERF-3  
**Requirement:** Reasonable bundle size impact  
**Test Method:** Next.js build analyzer  
**Pass Criteria:**
- [ ] New components add < 50KB to bundle
- [ ] Icons tree-shaken from lucide-react
- [ ] No unnecessary dependencies added
- [ ] Code splitting working (route-based)
- [ ] No large assets blocking render

---

## Browser Compatibility Requirements

### BC-1: Modern Browsers

**ID:** BC-1  
**Requirement:** Support latest versions of major browsers  
**Test Method:** Manual Test 15  
**Pass Criteria:**
- [ ] Chrome (latest) - all features work
- [ ] Firefox (latest) - all features work
- [ ] Safari (latest) - all features work
- [ ] Edge (latest) - all features work
- [ ] Visual consistency across browsers
- [ ] No browser-specific bugs

---

### BC-2: Previous Browser Versions

**ID:** BC-2  
**Requirement:** Support previous 2 versions  
**Test Method:** Browser testing tools  
**Pass Criteria:**
- [ ] Chrome (-2 versions) - all features work
- [ ] Firefox (-2 versions) - all features work
- [ ] Safari (-2 versions) - all features work
- [ ] Graceful degradation for unsupported features

---

### BC-3: Mobile Browsers

**ID:** BC-3  
**Requirement:** Support mobile browsers  
**Test Method:** Device testing  
**Pass Criteria:**
- [ ] iOS Safari (latest) - all features work
- [ ] Android Chrome (latest) - all features work
- [ ] Touch interactions optimized
- [ ] Mobile viewport handled correctly

---

## Code Quality Requirements

### CQ-1: TypeScript Strict Mode

**ID:** CQ-1  
**Requirement:** Zero TypeScript errors in strict mode  
**Test Method:** `npm run type-check`  
**Pass Criteria:**
- [ ] No TypeScript compilation errors
- [ ] No `any` types used
- [ ] All interfaces properly defined
- [ ] Props typed correctly
- [ ] API responses typed correctly
- [ ] Event handlers typed correctly

---

### CQ-2: ESLint Compliance

**ID:** CQ-2  
**Requirement:** Pass all linting rules  
**Test Method:** `npm run lint`  
**Pass Criteria:**
- [ ] Zero ESLint errors
- [ ] Zero ESLint warnings
- [ ] No disabled rules without justification
- [ ] Consistent code style throughout

---

### CQ-3: Build Success

**ID:** CQ-3  
**Requirement:** Production build completes successfully  
**Test Method:** `npm run build`  
**Pass Criteria:**
- [ ] Build completes without errors
- [ ] Build completes without warnings
- [ ] All routes generated
- [ ] Static assets optimized
- [ ] No unused exports warnings

---

### CQ-4: Component Reusability

**ID:** CQ-4  
**Requirement:** Components follow DRY principle  
**Test Method:** Code review  
**Pass Criteria:**
- [ ] No duplicate component logic
- [ ] Shared components reused from previous phases
- [ ] New components designed for reusability
- [ ] Props interface follows conventions
- [ ] No hardcoded values (use constants/theme)

---

### CQ-5: Server/Client Component Boundaries

**ID:** CQ-5  
**Requirement:** Correct use of Server and Client Components  
**Test Method:** Code review  
**Pass Criteria:**
- [ ] Data fetching done in Server Components
- [ ] Client Components only where interactivity needed
- [ ] 'use client' directive used correctly
- [ ] No fetch calls in Client Components
- [ ] Props passed correctly between component types

---

## Documentation Requirements

### DOC-1: Code Comments

**ID:** DOC-1  
**Requirement:** Complex logic documented  
**Test Method:** Code review  
**Pass Criteria:**
- [ ] Complex functions have JSDoc comments
- [ ] Non-obvious logic explained
- [ ] TODO comments for future improvements
- [ ] No commented-out code committed

---

### DOC-2: Component Documentation

**ID:** DOC-2  
**Requirement:** Components self-documenting  
**Test Method:** Code review  
**Pass Criteria:**
- [ ] Component names descriptive
- [ ] Props interface clearly named
- [ ] File structure consistent
- [ ] Exports organized

---

## Deployment Requirements

### DEPLOY-1: Environment Variables

**ID:** DEPLOY-1  
**Requirement:** No hardcoded configuration  
**Test Method:** Code review, environment check  
**Pass Criteria:**
- [ ] API base URL from environment variable
- [ ] Site URL from environment variable
- [ ] No secrets in code
- [ ] `.env.example` updated if new vars added

---

### DEPLOY-2: SSR/ISR Configuration

**ID:** DEPLOY-2  
**Requirement:** Server-side rendering configured  
**Test Method:** Deploy to staging, verify  
**Pass Criteria:**
- [ ] Page renders on server initially
- [ ] ISR revalidation working
- [ ] Fallback pages configured if needed
- [ ] Cache headers correct

---

## Integration Requirements

### INT-1: API Contract Compliance

**ID:** INT-1  
**Requirement:** Backend API contracts honored  
**Test Method:** API verification checklist  
**Pass Criteria:**
- [ ] GET /api/v1/topics/:slug integrated
- [ ] GET /api/v1/topics/:slug/children integrated
- [ ] GET /api/v1/topics/:slug/documents integrated
- [ ] Request parameters match API spec
- [ ] Response handling matches API spec
- [ ] Error responses handled correctly
- [ ] Pagination parameters correct

---

### INT-2: Navigation Integration

**ID:** INT-2  
**Requirement:** Integrates with existing navigation  
**Test Method:** Manual Test 1, Manual Test 18  
**Pass Criteria:**
- [ ] Accessible from topic list page
- [ ] Accessible from homepage (if linked)
- [ ] Browser history works correctly
- [ ] Deep linking works
- [ ] Social sharing links work

---

## Sign-Off Checklist

Before marking Phase 05 complete, verify ALL items:

### Functional
- [ ] FR-1: Page Rendering
- [ ] FR-2: Breadcrumb Navigation
- [ ] FR-3: Child Topics Display
- [ ] FR-4: Document List with Pagination
- [ ] FR-5: Loading States
- [ ] FR-6: Error Handling - 404
- [ ] FR-7: Error Handling - Server Errors
- [ ] FR-8: Empty States

### SEO
- [ ] SEO-1: Meta Tags
- [ ] SEO-2: Open Graph Tags
- [ ] SEO-3: Structured Data
- [ ] SEO-4: Canonical URL

### Responsive
- [ ] RD-1: Mobile Layout
- [ ] RD-2: Tablet Layout
- [ ] RD-3: Desktop Layout

### Accessibility
- [ ] A11Y-1: Keyboard Navigation
- [ ] A11Y-2: Screen Reader Support
- [ ] A11Y-3: Semantic HTML
- [ ] A11Y-4: Color Contrast

### Performance
- [ ] PERF-1: Core Web Vitals
- [ ] PERF-2: API Efficiency
- [ ] PERF-3: Bundle Size

### Browser Compatibility
- [ ] BC-1: Modern Browsers
- [ ] BC-2: Previous Browser Versions
- [ ] BC-3: Mobile Browsers

### Code Quality
- [ ] CQ-1: TypeScript Strict Mode
- [ ] CQ-2: ESLint Compliance
- [ ] CQ-3: Build Success
- [ ] CQ-4: Component Reusability
- [ ] CQ-5: Server/Client Component Boundaries

### Documentation
- [ ] DOC-1: Code Comments
- [ ] DOC-2: Component Documentation

### Deployment
- [ ] DEPLOY-1: Environment Variables
- [ ] DEPLOY-2: SSR/ISR Configuration

### Integration
- [ ] INT-1: API Contract Compliance
- [ ] INT-2: Navigation Integration

---

## Completion Certification

**Phase:** 05 - Topic Detail  
**Date Completed:** _______________  
**Developer:** _______________  
**Reviewer:** _______________  

**All acceptance criteria passed:** ☐ Yes ☐ No  

**Notes/Exceptions:**  
_________________________________  
_________________________________  
_________________________________  

**Sign-off Approved:** ☐ Yes ☐ No  

---

## Failure Protocol

If any acceptance criterion fails:

1. Document the failure in bug tracking system
2. Assign severity (Critical/High/Medium/Low)
3. Fix critical and high severity issues before proceeding
4. Re-test after fix
5. Do not mark phase complete until all criteria pass
6. Medium/Low issues may be deferred with explicit approval

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-06-28 | AI Architect | Initial creation |
