# Phase 02: App Shell - Acceptance Criteria

## Definition of Done

All criteria must be met before this phase is considered complete.

---

## Structural Requirements

### Layout Architecture
- [ ] Root layout component wraps all pages in the application
- [ ] Header component renders at top of every page
- [ ] Footer component renders at bottom of every page
- [ ] Main content area properly positioned between header and footer
- [ ] Layout components use semantic HTML (`<header>`, `<main>`, `<footer>`)

### Component Files Created
- [ ] `components/layout/header.tsx` exists and exports default component
- [ ] `components/layout/mobile-menu.tsx` exists and exports default component
- [ ] `components/layout/footer.tsx` exists and exports default component
- [ ] `components/theme/theme-toggle.tsx` exists and exports default component
- [ ] `components/ui/logo.tsx` exists and exports default component
- [ ] `app/layout.tsx` updated with full layout structure

---

## Visual Requirements

### Header Appearance
- [ ] Header has fixed height of 64px (h-16)
- [ ] Header background uses `bg-background/95` for translucency
- [ ] Header has bottom border (`border-b`)
- [ ] Header has backdrop blur effect (`backdrop-blur`)
- [ ] Header stays fixed at top during scroll (`sticky top-0`)
- [ ] Header z-index is 50 (`z-50`)
- [ ] Logo displays to left of "Sijil" text
- [ ] Desktop navigation shows minimum 3 links

### Mobile Menu Appearance
- [ ] Hamburger icon visible only on mobile (< 768px)
- [ ] Menu panel width is 75% of viewport (max 20rem)
- [ ] Backdrop is semi-transparent black (`bg-black/50`)
- [ ] Menu slides from left edge of screen
- [ ] Close button (X icon) visible in menu header
- [ ] Navigation links stacked vertically in menu
- [ ] Theme toggle visible at bottom of menu

### Footer Appearance
- [ ] Footer has top border (`border-t`)
- [ ] Footer has 8 spacing units padding top/bottom (`py-8`)
- [ ] Footer grid is 4 columns on desktop
- [ ] Footer grid is 1 column on mobile
- [ ] Brand section includes logo and tagline
- [ ] Quick Links section has minimum 3 links
- [ ] Subjects section lists 4 subjects
- [ ] Legal section has Privacy and Terms links
- [ ] Copyright line centered with current year
- [ ] Footer pushes to bottom on short pages (sticky footer)

---

## Functional Requirements

### Navigation
- [ ] Logo click navigates to homepage (`/`)
- [ ] All desktop nav links navigate to correct routes
- [ ] All mobile nav links navigate to correct routes
- [ ] Mobile menu closes automatically after link click
- [ ] Active route can be visually distinguished (future enhancement)

### Mobile Menu Behavior
- [ ] Hamburger click opens menu
- [ ] Backdrop click closes menu
- [ ] Close button click closes menu
- [ ] Escape key press closes menu
- [ ] Menu animation duration ≤ 300ms
- [ ] Menu state synchronized with button aria-expanded

### Theme Toggle
- [ ] Click toggles between light and dark themes
- [ ] Theme persists in localStorage
- [ ] Theme restores on page reload
- [ ] No flash of incorrect theme on load
- [ ] Icon reflects current theme state

---

## Accessibility Requirements

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Focus order follows visual layout (left→right, top→bottom)
- [ ] Visible focus indicator on all interactive elements
- [ ] Skip-to-content link present and functional
- [ ] Skip link visible on focus, hidden otherwise

### ARIA Attributes
- [ ] Mobile menu button has `aria-label="Toggle menu"`
- [ ] Mobile menu button has `aria-expanded={isOpen}`
- [ ] Mobile menu button has `aria-controls="mobile-menu"`
- [ ] Mobile menu panel has `id="mobile-menu"`
- [ ] Theme toggle has `aria-label` describing action
- [ ] Navigation landmarks use `<nav>` element

### Screen Reader Support
- [ ] Focus trapped inside mobile menu when open
- [ ] Focus returns to trigger button on menu close
- [ ] All icons have `aria-hidden="true"` or descriptive labels
- [ ] Link text is descriptive (not "click here")
- [ ] Heading hierarchy maintained (h4 for footer sections)

### Motion Preferences
- [ ] Respects `prefers-reduced-motion` media query
- [ ] Animations disabled when reduced motion preferred
- [ ] Menu still functional without animations

---

## Responsive Requirements

### Breakpoint: Mobile (< 768px)
- [ ] Desktop navigation completely hidden
- [ ] Hamburger menu button visible
- [ ] Footer columns stack vertically
- [ ] No horizontal scrolling at any content length
- [ ] Touch targets minimum 44x44 pixels

### Breakpoint: Desktop (≥ 768px)
- [ ] Desktop navigation fully visible
- [ ] Hamburger menu button completely hidden
- [ ] Footer columns display side-by-side
- [ ] Adequate spacing between nav items (gap-6)

### Transition Points
- [ ] Clean switch at exactly 768px
- [ ] No overlapping elements during resize
- [ ] No content clipping at any viewport width
- [ ] Layout stable during orientation change

---

## Code Quality Requirements

### TypeScript
- [ ] All files have `.tsx` extension
- [ ] No `any` types used
- [ ] All props interfaces defined
- [ ] Strict mode passes with no errors
- [ ] Event handlers properly typed

### Component Structure
- [ ] Client Components marked with `'use client'`
- [ ] Server Components do not use hooks
- [ ] No unnecessary Client Components
- [ ] Components are pure and deterministic
- [ ] No side effects in render functions

### Styling
- [ ] Tailwind classes used consistently
- [ ] No inline styles
- [ ] Design tokens used for colors and spacing
- [ ] No hardcoded magic numbers
- [ ] CSS variables defined in globals.css

### File Organization
- [ ] Components in correct directories
- [ ] File names kebab-case
- [ ] Export statements consistent (default vs named)
- [ ] Import paths use aliases (`@/`)

---

## Performance Requirements

### Bundle Size
- [ ] Total shell bundle < 100KB (gzipped)
- [ ] No unused dependencies
- [ ] Icons tree-shaken correctly
- [ ] Framer-motion imported efficiently

### Rendering
- [ ] No layout shift on initial load (CLS < 0.1)
- [ ] No layout shift on theme toggle
- [ ] No layout shift on menu open/close
- [ ] First paint < 1.0s on fast connection
- [ ] Time to interactive < 3.0s

### Optimization
- [ ] Fonts preloaded in head
- [ ] Theme script inline and synchronous
- [ ] No console warnings or errors
- [ ] Images (logo) optimized if used

---

## Testing Requirements

### Manual Tests Passed
- [ ] Test 1: Desktop Header Display
- [ ] Test 2: Mobile Header Display
- [ ] Test 3: Mobile Menu Opening
- [ ] Test 4: Mobile Menu Closing
- [ ] Test 5: Footer Display (Desktop)
- [ ] Test 6: Footer Display (Mobile)
- [ ] Test 7: Theme Toggle
- [ ] Test 8: Keyboard Navigation
- [ ] Test 9: Mobile Menu Accessibility
- [ ] Test 10: Responsive Breakpoints
- [ ] Test 11: Z-Index Layering
- [ ] Test 12: Performance Check

### Edge Cases Handled
- [ ] Very long page content
- [ ] Very short page content
- [ ] Rapid menu toggling
- [ ] Theme toggle during navigation
- [ ] Browser back button behavior
- [ ] Orientation change
- [ ] Font loading fallback
- [ ] Reduced motion preference

### Browser Compatibility
- [ ] Chrome Latest
- [ ] Firefox Latest
- [ ] Safari Latest
- [ ] Edge Latest
- [ ] Chrome Mobile Latest
- [ ] Safari iOS Latest

---

## Documentation Requirements

### Code Documentation
- [ ] Component files have JSDoc comments
- [ ] Complex logic has inline comments
- [ ] Props interfaces documented
- [ ] TODO comments for future enhancements

### Git Commit
- [ ] Commit message follows conventional commits
- [ ] Changes described in detail
- [ ] Phase reference included
- [ ] No unrelated changes in commit

---

## Integration Requirements

### Phase 01 Dependencies
- [ ] Uses API client from Phase 01 (if needed)
- [ ] Uses ErrorBoundary from Phase 01
- [ ] Uses QueryClientProvider from Phase 01
- [ ] Follows architecture rules from Phase 01
- [ ] Uses design tokens from Phase 01

### Future Phase Readiness
- [ ] Header has slot for search trigger (Phase 07)
- [ ] Layout supports breadcrumbs (Phase 05)
- [ ] Footer structure allows dynamic links
- [ ] Theme system ready for user preferences
- [ ] Mobile menu can add new links easily

---

## Sign-Off Checklist

### Developer Self-Review
- [ ] All acceptance criteria verified
- [ ] All manual tests executed
- [ ] Code reviewed for quality
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Build passes successfully
- [ ] Lint passes successfully

### Handoff Preparation
- [ ] CURRENT_PHASE.md updated with completion status
- [ ] CHANGELOG.md entry created
- [ ] Git commit pushed to repository
- [ ] Branch ready for merge/review
- [ ] Next phase unblocked

---

## Final Approval

**Phase 02 is complete when:**
1. ✓ Every checkbox above is marked complete
2. ✓ Another team member verifies critical criteria
3. ✓ Application deployed to staging environment
4. ✓ No regressions in Phase 01 functionality
5. ✓ Product owner approves visual design

**Do not proceed to Phase 03 until this phase is signed off.**
