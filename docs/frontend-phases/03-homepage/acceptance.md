# Phase 03: Homepage - Acceptance Criteria

## Definition of Done

All criteria must be met before this phase is considered complete.

---

## Structural Requirements

### Page Route
- [ ] Homepage exists at root path (`/`)
- [ ] Uses root layout from Phase 02
- [ ] Server Component with async data fetching
- [ ] All sections render in correct order

### Component Files Created
- [ ] `components/home/hero-section.tsx` exists
- [ ] `components/home/stats-section.tsx` exists
- [ ] `components/home/collections-grid.tsx` exists
- [ ] `components/home/subject-card.tsx` exists
- [ ] `components/home/featured-content.tsx` exists
- [ ] `components/home/cta-section.tsx` exists
- [ ] `components/documents/document-card.tsx` exists
- [ ] `components/skeletons/stats-skeleton.tsx` exists

---

## Content Requirements

### Hero Section
- [ ] Badge displays "Pakistani Curriculum" text
- [ ] H1 headline present with highlighted portion
- [ ] Subtitle/description paragraph visible
- [ ] Two CTA buttons displayed
- [ ] "Browse Documents" button links to `/documents`
- [ ] "Search Content" button links to `/search`
- [ ] Gradient background applied

### Stats Section
- [ ] Fetches data from `/api/documents/aggregates`
- [ ] Displays 4 statistics (Documents, Topics, Subjects, Grades)
- [ ] Numbers formatted with commas (e.g., "1,234")
- [ ] Primary color used for stat values
- [ ] Labels descriptive and clear
- [ ] Loading skeleton shown during fetch
- [ ] Graceful fallback if API fails

### Collections Grid
- [ ] Fetches subjects from `/api/subjects`
- [ ] Section title "Browse by Subject" displayed
- [ ] All available subjects shown as cards
- [ ] Each card has subject-specific icon
- [ ] Each card shows "Grades 9-12 available"
- [ ] Each card has "Explore" button with arrow
- [ ] Cards link to `/subjects/[subject-slug]`
- [ ] Hover effects on desktop (shadow, lift)

### Featured Content Section
- [ ] Fetches recent documents from `/api/documents?limit=6&sort=-createdAt`
- [ ] Section title "Recently Added" displayed
- [ ] "View All →" link present
- [ ] Maximum 6 document cards shown
- [ ] Documents sorted newest first
- [ ] Each card shows subject badge
- [ ] Each card shows title (truncated if long)
- [ ] Each card shows grade and type
- [ ] Each card shows topic count with icon
- [ ] Each card shows date with icon
- [ ] "View Details" button on each card

### CTA Section
- [ ] Full-width background (primary color)
- [ ] White text on colored background
- [ ] Headline "Ready to Start Learning?"
- [ ] Descriptive paragraph present
- [ ] Two buttons with different variants
- [ ] Buttons link to appropriate pages
- [ ] Content centered horizontally

---

## Design Requirements

### Typography
- [ ] H1 uses responsive scale (text-4xl md:text-6xl)
- [ ] H2 uses text-3xl consistently
- [ ] Body text uses text-xl for hero, text-base elsewhere
- [ ] Font weights follow hierarchy (bold for headings)
- [ ] Line heights appropriate for readability

### Spacing
- [ ] Sections have py-20 or py-16 padding
- [ ] Container max-width respected
- [ ] Gap utilities used consistently (gap-4, gap-6, gap-8)
- [ ] Space-y utilities for vertical spacing
- [ ] No inconsistent margins

### Colors
- [ ] Primary color used for highlights and stats
- [ ] Muted foreground for secondary text
- [ ] Background colors differentiate sections
- [ ] Badge uses outline or secondary variant
- [ ] CTA section uses primary background with inverted text

### Interactive States
- [ ] All buttons have hover state
- [ ] Subject cards lift on hover (transform)
- [ ] Shadow increases on card hover
- [ ] Button background changes on hover
- [ ] Arrow icon animates on hover
- [ ] Transitions smooth (duration-300)

---

## Responsive Requirements

### Mobile (< 768px)
- [ ] Hero text centered
- [ ] Hero CTAs stacked vertically
- [ ] Stats grid is 2 columns
- [ ] Collections grid is 1 column
- [ ] Featured grid is 1 column
- [ ] CTA buttons stacked
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44px

### Tablet (768px - 1024px)
- [ ] Hero centered with max-width
- [ ] Stats grid is 4 columns
- [ ] Collections grid is 2 columns
- [ ] Featured grid is 2 columns
- [ ] Adequate whitespace

### Desktop (≥ 1024px)
- [ ] Hero full-width with centered content
- [ ] Stats grid is 4 columns
- [ ] Collections grid is 4 columns
- [ ] Featured grid is 3 columns
- [ ] CTA content max-w-4xl

### Breakpoint Transitions
- [ ] Clean switch at 768px
- [ ] Clean switch at 1024px
- [ ] No overlapping elements
- [ ] No content clipping

---

## SEO Requirements

### Meta Tags
- [ ] Title tag includes "Sijil" and primary keywords
- [ ] Title length < 60 characters
- [ ] Meta description present (150-160 characters)
- [ ] Meta keywords include curriculum subjects
- [ ] Canonical URL set
- [ ] Robots meta allows indexing

### Open Graph
- [ ] og:title present
- [ ] og:description present
- [ ] og:type set to "website"
- [ ] og:locale set to "en_PK"
- [ ] og:site_name present

### Twitter Card
- [ ] twitter:card set to "summary_large_image"
- [ ] twitter:title present
- [ ] twitter:description present

### Structured Data
- [ ] JSON-LD script present
- [ ] @type is EducationalOrganization
- [ ] Course schemas for each subject
- [ ] Valid schema.org markup
- [ ] Test passes in Google Rich Results Test

### Semantic HTML
- [ ] H1 used once for main heading
- [ ] H2 used for section headings
- [ ] Proper heading hierarchy maintained
- [ ] Semantic section elements used
- [ ] Landmark roles where appropriate

---

## Accessibility Requirements

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Focus order follows visual layout
- [ ] Visible focus ring on all elements
- [ ] Skip-to-content link functional
- [ ] No keyboard traps
- [ ] All buttons activatable with Enter/Space

### ARIA Attributes
- [ ] Stats section has aria-labelledby
- [ ] Subject cards have descriptive aria-labels
- [ ] Icons marked with aria-hidden or have labels
- [ ] Navigation landmarks use <nav> element
- [ ] Links have descriptive text (no "click here")

### Screen Reader Support
- [ ] Page title announced correctly
- [ ] Headings announced with level
- [ ] Images have alt text or decorative marking
- [ ] Stats announced as group
- [ ] Link destinations clear from context

### Color Contrast
- [ ] All text meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] Button text contrasts with background
- [ ] Link text contrasts with background
- [ ] Badge text contrasts
- [ ] No contrast violations in axe audit

### Motion Preferences
- [ ] Respects prefers-reduced-motion
- [ ] Animations disabled when preferred
- [ ] Content still accessible without animations

---

## Performance Requirements

### Loading
- [ ] Initial page load < 2 seconds
- [ ] Stats skeleton appears immediately
- [ ] Content replaces skeleton smoothly
- [ ] No layout shift on content load
- [ ] All sections load within 3 seconds

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] INP (Interaction to Next Paint) < 200ms
- [ ] FCP (First Contentful Paint) < 1.5s
- [ ] TTI (Time to Interactive) < 3.0s

### Bundle Optimization
- [ ] Total bundle size < 300KB (gzipped)
- [ ] No unused JavaScript
- [ ] Icons tree-shaken correctly
- [ ] Images optimized if used
- [ ] Fonts preloaded

### Caching
- [ ] ISR configured for subjects (revalidate=3600)
- [ ] ISR configured for documents (revalidate=600)
- [ ] API responses cached appropriately
- [ ] No unnecessary refetching

---

## API Integration Requirements

### GET /api/documents/aggregates
- [ ] Request sent on page load
- [ ] Response handled correctly
- [ ] Error handling implemented
- [ ] Fallback values provided
- [ ] Response time < 500ms

### GET /api/subjects
- [ ] Request sent on page load
- [ ] Array of subjects rendered
- [ ] Empty array handled gracefully
- [ ] Cached by Next.js ISR
- [ ] Subject names capitalized

### GET /api/documents
- [ ] Request includes limit=6 parameter
- [ ] Request includes sort=-createdAt parameter
- [ ] Results array rendered
- [ ] Pagination metadata ignored (not needed)
- [ ] Empty results show empty state

---

## Error Handling Requirements

### API Errors
- [ ] 500 errors handled gracefully
- [ ] Timeout errors handled
- [ ] Network errors handled
- [ ] User sees friendly message
- [ ] Console logs error for debugging

### Empty States
- [ ] Zero stats display "0" or hide section
- [ ] No subjects shows helpful message
- [ ] No documents shows empty state component
- [ ] Empty states have icons
- [ ] Empty states have actionable text

### Loading Errors
- [ ] Skeleton remains visible on slow load
- [ ] No infinite loading spinners
- [ ] Timeout after reasonable duration
- [ ] Retry mechanism optional

---

## Code Quality Requirements

### TypeScript
- [ ] All files have .tsx extension
- [ ] No `any` types used
- [ ] All props interfaces defined
- [ ] Strict mode passes with no errors
- [ ] Event handlers properly typed
- [ ] Return types explicit

### Component Structure
- [ ] Server Components used by default
- [ ] Client Components only when necessary
- [ ] 'use client' directive present where needed
- [ ] No hooks in Server Components
- [ ] Components are pure functions

### Styling
- [ ] Tailwind classes used consistently
- [ ] No inline styles
- [ ] Design tokens from globals.css
- [ ] No hardcoded hex colors (use theme colors)
- [ ] No magic numbers for spacing

### File Organization
- [ ] Components in correct directories
- [ ] File names kebab-case
- [ ] Default exports for components
- [ ] Import paths use @/ alias
- [ ] No circular dependencies

### Best Practices
- [ ] No console.log in production code
- [ ] No TODO comments without issues
- [ ] DRY principle followed
- [ ] Components small and focused
- [ ] Props destructured in function signature

---

## Testing Requirements

### Manual Tests Passed
- [ ] Test 1: Hero Section Display
- [ ] Test 2: Stats Section Data Loading
- [ ] Test 3: Collections Grid Display
- [ ] Test 4: Subject Card Hover Effects
- [ ] Test 5: Featured Content Section
- [ ] Test 6: Document Card Layout
- [ ] Test 7: CTA Section Display
- [ ] Test 8: Mobile Responsiveness
- [ ] Test 9: Tablet Responsiveness
- [ ] Test 10: Navigation Links
- [ ] Test 11: Loading State Behavior
- [ ] Test 12: Empty State Handling
- [ ] Test 13: SEO Metadata Verification
- [ ] Test 14: Accessibility - Keyboard Navigation
- [ ] Test 15: Accessibility - Screen Reader
- [ ] Test 16: Color Contrast
- [ ] Test 17: Performance Metrics
- [ ] Test 18: Cross-Browser Testing

### Edge Cases Handled
- [ ] Very long subject names
- [ ] Very long document titles
- [ ] Zero stats from API
- [ ] Slow API response
- [ ] API 500 error
- [ ] No recent documents
- [ ] Extremely wide viewport
- [ ] Browser zoom 150%+
- [ ] Theme toggle during load
- [ ] Multiple rapid refreshes

### Browser Compatibility
- [ ] Chrome Latest ✅
- [ ] Firefox Latest ✅
- [ ] Safari Latest ✅
- [ ] Edge Latest ✅
- [ ] Chrome Mobile Latest ✅
- [ ] Safari iOS Latest ✅

---

## Documentation Requirements

### Code Comments
- [ ] JSDoc on complex components
- [ ] Inline comments for non-obvious logic
- [ ] Props interfaces documented
- [ ] API usage commented

### Git Commit
- [ ] Conventional commit format
- [ ] Detailed change description
- [ ] Phase reference included
- [ ] No unrelated changes

---

## Integration Requirements

### Phase 01 Dependencies
- [ ] Uses API client from Phase 01
- [ ] Uses ErrorBoundary if needed
- [ ] Follows architecture rules
- [ ] Uses design tokens

### Phase 02 Dependencies
- [ ] Root layout wraps homepage
- [ ] Header displays correctly
- [ ] Footer displays correctly
- [ ] Theme system works
- [ ] Mobile menu accessible from homepage

### Future Phase Readiness
- [ ] Document cards reusable for Phase 04
- [ ] Subject links work for Phase 04
- [ ] Search CTA ready for Phase 07 integration
- [ ] Breadcrumb slot available (future)

---

## Sign-Off Checklist

### Developer Self-Review
- [ ] All acceptance criteria verified
- [ ] All 18 manual tests executed
- [ ] Code reviewed for quality
- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] Build passes successfully
- [ ] Lint passes successfully
- [ ] Lighthouse score > 90

### Handoff Preparation
- [ ] CURRENT_PHASE.md updated
- [ ] CHANGELOG.md entry created
- [ ] Git commit pushed
- [ ] Branch ready for review
- [ ] Phase 04 unblocked

---

## Final Approval

**Phase 03 is complete when:**
1. ✓ Every checkbox above is marked complete
2. ✓ Another team member verifies critical criteria (SEO, accessibility)
3. ✓ Application deployed to staging environment
4. ✓ No regressions in Phase 01-02 functionality
5. ✓ Product owner approves design implementation
6. ✓ Lighthouse performance score ≥ 90

**Do not proceed to Phase 04 until this phase is signed off.**
