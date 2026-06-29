# Phase 02: App Shell - Implementation Prompt

## Objective

Build the persistent application shell that wraps all pages including root layout, responsive header with navigation, mobile menu with animations, footer, and theme configuration.

---

## Read First

Read these files in exact order before writing any code:

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md` - Permanent coding rules (MANDATORY)
2. `docs/frontend-pm/CURRENT_PHASE.md` - Current phase status
3. `docs/frontend-phases/02-app-shell/README.md` - Phase overview
4. `docs/frontend-phases/02-app-shell/implementation.md` - Detailed implementation spec
5. `docs/frontend-execution/04-component-registry.md` - Existing UI components

Do NOT read architecture documents, discovery docs, or blueprint docs.

---

## Files To Create

### Layout Components
- `src/components/layout/header.tsx` - Responsive header with navigation
- `src/components/layout/mobile-menu.tsx` - Mobile hamburger menu with slide animation
- `src/components/layout/footer.tsx` - Sticky footer with links
- `src/components/layout/main-layout.tsx` - Main layout wrapper (if not created in Phase 01)

### App Router
- `src/app/layout.tsx` - Root layout (update if needed from Phase 01)
- `src/app/providers.tsx` - Theme provider and React Query provider

### Theme & Configuration
- `src/lib/theme-provider.tsx` - Light/dark mode toggle
- `src/config/navigation.ts` - Navigation links and structure
- `src/types/navigation.ts` - Navigation type definitions

### Utilities
- `src/hooks/use-mobile-menu.ts` - Mobile menu state management
- `src/hooks/use-theme.ts` - Theme toggle hook

---

## Files That May Change

- `src/app/globals.css` - Add theme CSS variables
- `src/components/ui/button.tsx` - May need variant updates
- `package.json` - If new dependencies required

---

## Backend APIs

No backend APIs required for Phase 02.

All navigation is static at this phase. API integration comes in later phases.

---

## Components

Create only these components:

**Layout Components:**
- Header (sticky, with logo and nav links)
- MobileMenu (slide-in animation, hamburger trigger)
- Footer (sticky, copyright and links)
- MainLayout (wrapper combining header + children + footer)

**Theme Components:**
- ThemeProvider (context provider for theme state)
- ThemeToggle (button to switch light/dark mode)

**Navigation:**
- NavigationMenu (desktop nav links)
- NavItem (individual nav link component)

Do NOT create business components - those belong to later phases.

---

## Rules

Follow ALL rules from `docs/frontend-pm/IMPLEMENTATION_RULES.md`:

**Critical Rules Summary:**

1. **Server Components by default** - Only use `"use client"` when interactivity requires it (mobile menu, theme toggle)
2. **Strict TypeScript** - No `any` types allowed
3. **Mobile-first responsive design** - Base styles target mobile
4. **Reuse UI components** - Use shadcn Button, Sheet components
5. **No duplicated logic** - Extract shared navigation logic

**Additional Phase 02 Constraints:**

- Do NOT implement authentication checks (Phase 05+)
- Do NOT add dynamic navigation items from API
- Keep navigation static (Documents, Subjects, Search placeholders)
- Mobile menu must use animation (framer-motion or CSS transitions)

---

## Stop Conditions

STOP implementation when ALL of these are complete:

✓ Header displays correctly on desktop and mobile
✓ Mobile menu opens/closes smoothly with animation
✓ Footer shows on all pages
✓ Navigation links route correctly (even if pages don't exist yet)
✓ Theme system functional (light/dark toggle works)
✓ Loading skeleton appears during navigation (if applicable)
✓ All TypeScript checks pass
✓ ESLint passes with no errors
✓ Build completes successfully

**DO NOT continue to:**
- Homepage content (Phase 03)
- Topic listing (Phase 04)
- Any business features

When all stop conditions are met, end the session immediately.

---

## Self Review

Before finishing, verify each item:

**Code Quality:**
- [ ] No `any` types used
- [ ] All components have proper TypeScript interfaces
- [ ] Server Components used by default
- [ ] Client Components only where interactivity required
- [ ] No inline fetch calls

**Functionality:**
- [ ] Header sticky to top with blur effect
- [ ] Desktop navigation hidden on mobile
- [ ] Mobile menu trigger visible only on small screens
- [ ] Mobile menu slides in smoothly
- [ ] Mobile menu closes on outside click and Escape key
- [ ] Footer displays on all routes
- [ ] Theme toggle persists preference in localStorage
- [ ] No flash of unstyled theme on page load

**Responsive Design:**
- [ ] Header works on mobile (320px minimum)
- [ ] Mobile menu accessible on all screen sizes
- [ ] Touch targets at least 44px
- [ ] Footer stacks appropriately on mobile

**Accessibility:**
- [ ] Keyboard navigation works (Tab through nav items)
- [ ] Mobile menu trap focus when open
- [ ] ARIA labels on interactive elements
- [ ] Screen reader announces menu open/close

**Performance:**
- [ ] No unnecessary Client Components
- [ ] CSS animations GPU-accelerated
- [ ] No console errors or warnings

---

## Deliverables

List these items in your session summary:

**Files Created:**
- [ ] Header component
- [ ] MobileMenu component
- [ ] Footer component
- [ ] ThemeProvider component
- [ ] ThemeToggle component
- [ ] Navigation configuration files
- [ ] Custom hooks (use-mobile-menu, use-theme)

**Files Modified:**
- [ ] Root layout (if updates needed)
- [ ] Global CSS (theme variables)
- [ ] Providers file

**Tests Run:**
- [ ] `npm run build` - Build completed successfully
- [ ] `npm run type-check` - TypeScript validation passed
- [ ] `npm run lint` - ESLint passed with no errors
- [ ] Manual test: Header on desktop
- [ ] Manual test: Header on mobile
- [ ] Manual test: Mobile menu open/close
- [ ] Manual test: Theme toggle
- [ ] Manual test: Keyboard navigation
- [ ] Manual test: Footer visibility

**Acceptance Completed:**
- [ ] All Phase 02 exit criteria from CURRENT_PHASE.md checked off
- [ ] No console errors in browser
- [ ] Animation smooth at 60fps

---

## Session Notes

After completing this phase:

1. Update `docs/frontend-pm/CURRENT_PHASE.md` with completion status
2. Add completed work to `docs/CHANGELOG.md`
3. Do NOT mark Phase 03 as started
4. End session and wait for next instruction

**Estimated Effort:** 1-2 days

**Complexity:** Medium
