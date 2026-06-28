# Phase 02: App Shell - Implementation Specification

This document is self-contained. An implementation AI can build Phase 02 using only this file.

---

## 1. Pages and Layouts

### Root Layout

**File:** `app/layout.tsx`

**Type:** Server Component

**Purpose:** Wraps entire application, provides HTML structure, metadata, and global providers.

**Structure:**
```
<html lang="en">
  <head>
    - Metadata (title template, description, viewport)
    - Fonts (Inter, Merriweather)
    - Theme script (prevents flash)
  </head>
  <body>
    - ThemeProvider
    - QueryClientProvider
    - Header
    - main (children)
    - Footer
    - Toaster
  </body>
</html>
```

**Metadata:**
- `title`: {children} | Sijil
- `description`: Digital textbook platform for Pakistani curriculum
- `viewport`: width=device-width, initial-scale=1

---

### Header Component

**File:** `components/layout/header.tsx`

**Type:** Client Component (uses state for mobile menu)

**Props:** None

**Structure:**
```
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <div className="container flex h-16 items-center justify-between">
    <!-- Left: Logo -->
    <Link href="/" className="flex items-center space-x-2">
      <Logo />
      <span>Sijil</span>
    </Link>

    <!-- Center: Desktop Navigation -->
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/documents">Documents</Link>
      <Link href="/subjects">Subjects</Link>
      <Link href="/search">Search</Link>
    </nav>

    <!-- Right: Actions -->
    <div className="flex items-center gap-4">
      <!-- Search trigger (desktop) -->
      <Button variant="ghost" size="icon">
        <SearchIcon />
      </Button>

      <!-- Theme toggle -->
      <ThemeToggle />

      <!-- Mobile menu trigger -->
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
        <MenuIcon />
      </Button>
    </div>
  </div>
</header>
```

**Behavior:**
- Sticky to top with blur effect
- Desktop nav hidden on mobile
- Mobile menu trigger visible only on small screens
- Search icon triggers search modal (Phase 07)

---

### Mobile Menu Component

**File:** `components/layout/mobile-menu.tsx`

**Type:** Client Component

**Props:**
- `open`: boolean
- `onOpenChange`: (open: boolean) => void

**Structure:**
```
<AnimatePresence>
  {open && (
    <>
      <!-- Backdrop -->
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />

      <!-- Slide-in panel -->
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed left-0 top-0 bottom-0 w-3/4 max-w-sm bg-background z-50 p-6"
      >
        <!-- Close button -->
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
          <XIcon />
        </Button>

        <!-- Navigation links -->
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/documents" onClick={close}>Documents</Link>
          <Link href="/subjects" onClick={close}>Subjects</Link>
          <Link href="/search" onClick={close}>Search</Link>
        </nav>

        <!-- Footer actions -->
        <div className="absolute bottom-6 left-6 right-6">
          <ThemeToggle />
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Dependencies:**
- `framer-motion` for animations
- `lucide-react` for icons

---

### Footer Component

**File:** `components/layout/footer.tsx`

**Type:** Server Component

**Props:** None

**Structure:**
```
<footer className="border-t py-8 mt-auto">
  <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
    <!-- Column 1: Brand -->
    <div>
      <Logo />
      <p>Digital textbooks for Pakistani curriculum</p>
    </div>

    <!-- Column 2: Quick Links -->
    <div>
      <h4>Quick Links</h4>
      <ul>
        <li><Link href="/documents">Documents</Link></li>
        <li><Link href="/subjects">Subjects</Link></li>
        <li><Link href="/search">Search</Link></li>
      </ul>
    </div>

    <!-- Column 3: Subjects -->
    <div>
      <h4>Subjects</h4>
      <ul>
        <li>Physics</li>
        <li>Chemistry</li>
        <li>Biology</li>
        <li>Mathematics</li>
      </ul>
    </div>

    <!-- Column 4: Legal -->
    <div>
      <h4>Legal</h4>
      <ul>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms of Service</Link></li>
      </ul>
    </div>
  </div>

  <div className="container mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
    © {new Date().getFullYear()} Sijil. All rights reserved.
  </div>
</footer>
```

---

## 2. Routes

No new routes in this phase. Only layout structure.

Existing routes from Phase 01:
- `/` - Homepage (uses root layout)
- `*` - 404 page (uses root layout)

---

## 3. APIs

No API calls in this phase. Pure UI components.

---

## 4. Components Created

| Component | File | Type | Reusable |
|-----------|------|------|----------|
| Header | `components/layout/header.tsx` | Client | Yes |
| MobileMenu | `components/layout/mobile-menu.tsx` | Client | Yes |
| Footer | `components/layout/footer.tsx` | Server | Yes |
| ThemeToggle | `components/theme/theme-toggle.tsx` | Client | Yes |
| Logo | `components/ui/logo.tsx` | Server | Yes |

---

## 5. State Management

### Mobile Menu State

**Location:** `components/layout/header.tsx`

**Type:** Local React state (`useState`)

```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
```

**No global state needed.**

---

## 6. Models

No data models in this phase.

---

## 7. Folders and Files

### Create These Directories:

```
components/
  layout/
    header.tsx
    mobile-menu.tsx
    footer.tsx
  theme/
    theme-toggle.tsx
    theme-provider.tsx
  ui/
    logo.tsx
```

### Update These Files:

```
app/
  layout.tsx (update from Phase 01)
```

---

## 8. SEO

Root layout metadata (set once, inherited by all pages):

```typescript
export const metadata: Metadata = {
  title: {
    template: '%s | Sijil',
    default: 'Sijil - Digital Textbook Platform',
  },
  description: 'Comprehensive digital textbooks for Pakistani curriculum (PCTB). Access documents, topics, assessments, and more.',
  keywords: ['textbooks', 'education', 'Pakistan', 'PCTB', 'learning'],
  authors: [{ name: 'Sijil Team' }],
  creator: 'Sijil',
  publisher: 'Sijil',
  robots: {
    index: true,
    follow: true,
  },
}
```

---

## 9. Loading States

### Global Loading Skeleton

**File:** `components/layout/loading-skeleton.tsx`

**Type:** Client Component

**Purpose:** Shown during route transitions (optional enhancement).

```typescript
export function LoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

---

## 10. Error Handling

No API errors in this phase. Use ErrorBoundary from Phase 01 for unexpected rendering errors.

---

## 11. Accessibility

### Requirements:

✓ All navigation links have descriptive text
✓ Mobile menu has `aria-expanded` and `aria-controls`
✓ Theme toggle has `aria-label`
✓ Skip-to-content link for keyboard users
✓ Focus management in mobile menu (trap focus when open)
✓ Proper heading hierarchy (h1 in pages, h4 in footer sections)

### Implementation Notes:

```typescript
// Mobile menu button
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle menu"
/>

// Skip link (add to layout)
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

---

## 12. Responsive Behavior

### Breakpoints:

- **Mobile:** < 768px (md)
  - Hamburger menu visible
  - Desktop nav hidden
  - Single column footer

- **Desktop:** ≥ 768px (md)
  - Desktop nav visible
  - Hamburger menu hidden
  - Multi-column footer (4 columns)

### CSS Classes:

```tsx
// Header nav
<nav className="hidden md:flex">...</nav>

// Mobile trigger
<Button className="md:hidden">...</Button>

// Footer grid
<div className="grid grid-cols-1 md:grid-cols-4">...</div>
```

---

## 13. Backend Integration

None in this phase.

---

## 14. Acceptance Checklist

### Structure
- [ ] Root layout wraps all pages
- [ ] Header is sticky with blur effect
- [ ] Footer appears on all pages
- [ ] Main content area has proper spacing

### Navigation
- [ ] Logo links to homepage
- [ ] Desktop nav shows 3+ links
- [ ] Mobile menu trigger visible on small screens
- [ ] Mobile menu slides in smoothly
- [ ] Mobile menu closes on backdrop click
- [ ] Mobile menu closes on link click

### Theme
- [ ] Theme toggle switches between light/dark
- [ ] Theme persists across reloads (localStorage)
- [ ] No flash of unstyled content

### Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Focus visible on tab navigation
- [ ] ARIA attributes on mobile menu
- [ ] Skip-to-content link works

### Responsive
- [ ] Header collapses correctly on mobile
- [ ] Footer stacks vertically on mobile
- [ ] No horizontal scroll at any breakpoint

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] No console errors
- [ ] Components are properly typed
- [ ] No hardcoded values (use tokens)

---

## 15. Common Mistakes to Avoid

❌ **Making Header a Server Component** - It needs state for mobile menu
✅ **Solution:** Use Client Component with 'use client'

❌ **Not trapping focus in mobile menu** - Keyboard users can tab outside
✅ **Solution:** Use focus-trap library or manual focus management

❌ **Hardcoding navigation links** - Makes updates difficult
✅ **Solution:** Create `config/navigation.ts` with link arrays

❌ **Forgetting z-index layers** - Modal overlaps header
✅ **Solution:** Define z-index scale in globals.css

❌ **Not handling theme flash** - FOUC on page load
✅ **Solution:** Inline script in `<head>` before React hydrates

---

## 16. Git Commit Message

```
feat(layout): implement app shell with header, mobile menu, and footer

- Add responsive header with sticky positioning and blur effect
- Implement mobile hamburger menu with framer-motion animations
- Create multi-column footer with navigation links
- Set up theme toggle with localStorage persistence
- Configure root layout with metadata and providers
- Add accessibility features (ARIA, focus management, skip link)
- Establish design tokens for spacing and typography

Part of Phase 02: App Shell
```
