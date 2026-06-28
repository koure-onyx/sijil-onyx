# SIJIL Review Checklist

## Overview

This document provides comprehensive review checklists for code, architecture compliance, accessibility, SEO, and performance. Use these checklists during PR reviews and phase gate approvals.

---

## Code Review Checklist

### General Code Quality

- [ ] **TypeScript Strict Mode**
  - [ ] No `any` types used (except documented edge cases)
  - [ ] All function parameters and return types annotated
  - [ ] Proper use of generics where applicable
  - [ ] Union types preferred over enums for simple cases

- [ ] **Naming Conventions** (per CLAUDE.md Section 2.2)
  - [ ] Components: PascalCase (`DocumentCard`)
  - [ ] Functions/variables: camelCase (`useDocuments`)
  - [ ] Constants: UPPER_SNAKE_CASE (`MAX_RESULTS`)
  - [ ] Files: kebab-case for non-components, matching component names for components

- [ ] **Import Organization** (per CLAUDE.md Section 2.3)
  - [ ] Imports ordered: React → Third-party → Internal → Relative
  - [ ] Named imports preferred over default imports
  - [ ] No circular dependencies
  - [ ] Type imports use `import type`

- [ ] **Error Handling** (per CLAUDE.md Section 2.5)
  - [ ] All async operations wrapped in try-catch or error boundaries
  - [ ] User-facing errors are clear and actionable
  - [ ] Sensitive information not exposed in error messages
  - [ ] Errors logged appropriately for debugging

- [ ] **Code Comments**
  - [ ] JSDoc comments for public functions and complex logic
  - [ ] Comments explain "why" not "what"
  - [ ] No commented-out code
  - [ ] TODO comments include issue reference or date

---

### Component Review

- [ ] **Component Structure** (per CLAUDE.md Section 4.2)
  - [ ] Single responsibility principle followed
  - [ ] Props interface defined with TypeScript
  - [ ] Default props documented
  - [ ] Component exported as named export

- [ ] **Props Design**
  - [ ] Props are minimal and focused
  - [ ] Children prop used appropriately for composition
  - [ ] Event handlers prefixed with `on` (`onClick`, `onChange`)
  - [ ] Boolean props are clear (`isLoading`, `disabled`)

- [ ] **Accessibility** (per CLAUDE.md Section 4.4)
  - [ ] Semantic HTML elements used
  - [ ] ARIA attributes present where needed
  - [ ] Keyboard navigation works (Tab, Enter, Escape)
  - [ ] Focus management for modals/dialogs
  - [ ] Alt text on images
  - [ ] Labels on form inputs

- [ ] **Styling** (Tailwind/shadcn/ui)
  - [ ] Utility classes used consistently
  - [ ] Responsive design implemented (mobile-first)
  - [ ] Dark mode considered if applicable
  - [ ] No inline styles except dynamic values

- [ ] **Performance**
  - [ ] `React.memo` used for expensive re-renders
  - [ ] `useCallback` for event handlers passed to children
  - [ ] `useMemo` for expensive computations
  - [ ] Lazy loading for heavy components

---

### Hook Review

- [ ] **Custom Hook Structure** (per CLAUDE.md Section 4.6)
  - [ ] Hook name starts with `use`
  - [ ] Returns consistent shape
  - [ ] Dependencies array correct
  - [ ] Cleanup functions in `useEffect`

- [ ] **State Management**
  - [ ] TanStack Query for server state (not Zustand)
  - [ ] Zustand only for client-side global state
  - [ ] URL state for shareable/filter state
  - [ ] Form state with React Hook Form

- [ ] **Query Keys** (per CLAUDE.md Section 5.1)
  - [ ] Query keys follow array structure
  - [ ] Include all relevant variables
  - [ ] Consistent naming across codebase
  - [ ] Example: `['documents', { slug }]`

---

### API Layer Review

- [ ] **API Client Structure** (per CLAUDE.md Section 6)
  - [ ] Base client handles auth, errors, retries
  - [ ] Domain-specific clients (documents.api.ts, etc.)
  - [ ] Request/response types defined
  - [ ] No hardcoded URLs (use environment variables)

- [ ] **Error Handling**
  - [ ] HTTP errors transformed to user-friendly messages
  - [ ] Network errors handled gracefully
  - [ ] Retry logic with exponential backoff
  - [ ] 401/403 errors trigger appropriate flows

- [ ] **Response Typing**
  - [ ] All responses have TypeScript interfaces
  - [ ] Error responses typed
  - [ ] Optional fields marked with `?`
  - [ ] Union types for variant responses

---

## Architecture Compliance Checklist

### Domain Boundaries (per CLAUDE.md Section 1.1)

- [ ] **Public Domain**
  - [ ] Located in `app/(public)/`
  - [ ] Uses `PublicLayout`
  - [ ] No admin functionality accessible

- [ ] **Admin Domain**
  - [ ] Located in `app/(admin)/`
  - [ ] Uses `AdminLayout`
  - [ ] Authentication/authorization enforced
  - [ ] No public routes mixed in

- [ ] **Feature Modules**
  - [ ] Each feature in own directory (`features/documents/`, etc.)
  - [ ] No cross-feature imports (use lib/ for shared)
  - [ ] Module exports clearly defined

---

### Layer Separation (per CLAUDE.md Section 1.2)

- [ ] **Pages** (`app/`)
  - [ ] Only handle routing and layout composition
  - [ ] Delegate logic to feature modules
  - [ ] No business logic in pages

- [ ] **Features** (`features/`)
  - [ ] Contain domain-specific logic
  - [ ] Export components, hooks, pages
  - [ ] Import from lib/, not other features

- [ ] **Components** (`components/`)
  - [ ] UI-only, no business logic
  - [ ] Reusable across features
  - [ ] Props-driven behavior

- [ ] **Lib** (`lib/`)
  - [ ] Shared utilities, API clients, config
  - [ ] No React dependencies in utils
  - [ ] Pure functions where possible

---

### State Management (per CLAUDE.md Section 5)

- [ ] **TanStack Query**
  - [ ] Used for all server state
  - [ ] Proper query invalidation configured
  - [ ] Loading/error states handled
  - [ ] Stale time appropriate for data type

- [ ] **Zustand**
  - [ ] Only for client-side global state
  - [ ] Actions defined with types
  - [ ] Persist configuration if needed
  - [ ] Not used for server state

- [ ] **URL State**
  - [ ] Search params for filters/sorting
  - [ ] Synced with component state
  - [ ] Back/forward browser buttons work
  - [ ] Shareable URLs

- [ ] **Form State**
  - [ ] React Hook Form used
  - [ ] Zod schemas for validation
  - [ ] Error messages user-friendly
  - [ ] Submit handling with loading states

---

## Accessibility Checklist (WCAG 2.1 AA)

### Perceptible Content

- [ ] Text alternatives for non-text content
- [ ] Captions/transcripts for media
- [ ] Color is not the only means of conveying information
- [ ] Text can be resized up to 200% without loss
- [ ] Images of text avoided

### Operable Interface

- [ ] All functionality keyboard accessible
- [ ] No keyboard traps
- [ ] Skip links provided
- [ ] Focus order is logical
- [ ] Focus indicator visible
- [ ] Enough time to read/use content
- [ ] No content that flashes >3 times/second

### Understandable Information

- [ ] Page language declared
- [ ] Navigation consistent across pages
- [ ] Forms have labels and instructions
- [ ] Error messages identify the field and suggest fixes
- [ ] Input purpose can be programmatically determined

### Robust Implementation

- [ ] Valid HTML
- [ ] ARIA used correctly (roles, properties, states)
- [ ] Name, role, value for custom components
- [ ] Status messages announced by screen readers

---

## SEO Checklist

### On-Page SEO

- [ ] **Title Tags**
  - [ ] Unique per page
  - [ ] Under 60 characters
  - [ ] Primary keyword near beginning
  - [ ] Brand name included

- [ ] **Meta Descriptions**
  - [ ] Unique per page
  - [ ] Under 160 characters
  - [ ] Compelling and relevant
  - [ ] Call-to-action included

- [ ] **Headings**
  - [ ] Single H1 per page
  - [ ] Hierarchical H2-H6 structure
  - [ ] Keywords in headings naturally

- [ ] **Content**
  - [ ] Primary keyword in first 100 words
  - [ ] Related keywords throughout
  - [ ] Content length appropriate for topic
  - [ ] Internal links to related content

### Technical SEO

- [ ] **Structured Data**
  - [ ] JSON-LD implemented
  - [ ] Schema.org types appropriate
  - [ ] Validated with Google Rich Results Test
  - [ ] Breadcrumbs marked up

- [ ] **Canonical URLs**
  - [ ] Canonical tag on all pages
  - [ ] Self-referencing canonicals
  - [ ] No duplicate content issues

- [ ] **Sitemap**
  - [ ] sitemap.xml generated
  - [ ] All public routes included
  - [ ] Lastmod dates accurate
  - [ ] Submitted to search consoles

- [ ] **Robots.txt**
  - [ ] Configured correctly
  - [ ] Admin routes blocked
  - [ ] Sitemap location specified

- [ ] **Open Graph / Social**
  - [ ] OG title, description, image
  - [ ] Twitter cards configured
  - [ ] Social preview tested

### Performance (Core Web Vitals)

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Mobile-friendly design
- [ ] HTTPS enabled

---

## Performance Checklist

### Loading Performance

- [ ] **Initial Load**
  - [ ] Bundle size optimized (<100KB initial)
  - [ ] Code splitting implemented
  - [ ] Critical CSS inlined
  - [ ] Fonts optimized (font-display: swap)

- [ ] **Images**
  - [ ] Next.js Image component used
  - [ ] Appropriate formats (WebP, AVIF)
  - [ ] Lazy loading below fold
  - [ ] Size attributes specified

- [ ] **Third-Party Scripts**
  - [ ] Analytics loaded asynchronously
  - [ ] Non-critical scripts deferred
  - [ ] No render-blocking resources

### Runtime Performance

- [ ] **Rendering**
  - [ ] No unnecessary re-renders (React DevTools)
  - [ ] Virtual scrolling for long lists
  - [ ] Debounced input handlers
  - [ ] Memoized computations

- [ ] **Network**
  - [ ] API responses cached appropriately
  - [ ] Request deduplication
  - [ ] Optimistic updates where suitable
  - [ ] Pagination for large datasets

- [ ] **Memory**
  - [ ] No memory leaks (cleanup in useEffect)
  - [ ] Event listeners removed on unmount
  - [ ] Large objects garbage collected

### Measurement

- [ ] Lighthouse score >90 (all categories)
- [ ] Web Vitals monitored in production
- [ ] Performance budgets in CI
- [ ] Bundle analyzer reviewed

---

## Testing Checklist

### Unit Tests

- [ ] **Coverage**
  - [ ] Utilities: >95%
  - [ ] Hooks: >90%
  - [ ] Components: >80%
  - [ ] Overall: >80%

- [ ] **Test Quality**
  - [ ] Tests are independent
  - [ ] Mocks isolated per test
  - [ ] Edge cases covered
  - [ ] Error scenarios tested

### Integration Tests

- [ ] **Feature Flows**
  - [ ] Complete user journeys tested
  - [ ] API integration verified
  - [ ] State management tested
  - [ ] Error recovery tested

- [ ] **MSW Mocks**
  - [ ] Realistic mock data
  - [ ] Error responses mocked
  - [ ] Loading states tested
  - [ ] Multiple scenarios covered

### E2E Tests

- [ ] **Critical Paths**
  - [ ] Home → Document view
  - [ ] Search → Results → Detail
  - [ ] Topic navigation flow
  - [ ] Admin authentication
  - [ ] Export functionality

- [ ] **Cross-Browser**
  - [ ] Chrome tested
  - [ ] Firefox tested
  - [ ] Safari tested
  - [ ] Edge tested

---

## Security Checklist

### Authentication & Authorization

- [ ] Auth tokens stored securely (httpOnly cookies)
- [ ] Admin routes protected
- [ ] RBAC enforced server-side
- [ ] Session timeout implemented

### Input Validation

- [ ] All forms validated client-side (Zod)
- [ ] Server-side validation confirmed
- [ ] XSS prevention (sanitize HTML)
- [ ] CSRF protection enabled

### Data Protection

- [ ] No PII in analytics
- [ ] Sensitive data not in URLs
- [ ] API keys in environment variables
- [ ] HTTPS enforced

---

## Phase Gate Review Checklist

### Gate 0: Pre-Phase 1

- [ ] Repository cloned with PAT access
- [ ] Node.js 20+ installed
- [ ] All blueprint documents reviewed
- [ ] CLAUDE.md acknowledged
- [ ] Development environment ready

### Gate 1: Phase 1 → Phase 2

- [ ] All 23 foundation tasks complete
- [ ] CI/CD pipeline passing
- [ ] Architecture tests passing
- [ ] Zero ESLint errors
- [ ] Test coverage >80% on utilities
- [ ] Phase 1 report approved

### Gate 2: Phase 2 → Phase 3

- [ ] All 45 core tasks complete
- [ ] All routes functional
- [ ] API layer coverage >90%
- [ ] BlockRenderer supports all 17 block types
- [ ] Forms validate correctly
- [ ] Phase 2 report approved

### Gate 3: Phase 3 → Phase 4

- [ ] All 31 advanced tasks complete
- [ ] Search latency <200ms (p95)
- [ ] SEO metadata valid on all pages
- [ ] Export functionality working
- [ ] Lighthouse scores >90
- [ ] Phase 3 report approved

### Gate 4: Phase 4 → Phase 5

- [ ] All 18 admin tasks complete
- [ ] Admin dashboard functional
- [ ] Content ingestion tested end-to-end
- [ ] RBAC working correctly
- [ ] Monitoring dashboards accurate
- [ ] Phase 4 report approved

### Gate 5: Phase 5 → Production

- [ ] All 10 polish tasks complete
- [ ] Zero critical accessibility issues
- [ ] Lighthouse scores >95
- [ ] All E2E tests passing
- [ ] Production deployment successful
- [ ] Final handoff document complete
- [ ] Stakeholder approval received

---

## PR Review Template

```markdown
## PR Checklist

### Code Quality
- [ ] TypeScript strict mode compliant
- [ ] Naming conventions followed
- [ ] Imports organized correctly
- [ ] Error handling implemented
- [ ] No console.log in production code

### Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Test coverage targets met
- [ ] All tests passing

### Documentation
- [ ] JSDoc comments added
- [ ] README updated if needed
- [ ] Changelog entry added

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader tested (if applicable)
- [ ] Color contrast adequate
- [ ] ARIA attributes correct

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Bundle size impact acceptable

### Security
- [ ] Input validation implemented
- [ ] No sensitive data exposure
- [ ] Auth checks in place (if applicable)

## Reviewer Notes

[Add specific feedback here]

## Approval

- [ ] Approved
- [ ] Approved with minor comments
- [ ] Changes requested
```

---

## References

- CLAUDE.md - Governance rules
- docs/frontend-blueprint/ - Architecture specifications
- docs/project-management/02-phase-registry.md - Phase criteria
- docs/project-management/09-task-backlog.md - Task definitions
