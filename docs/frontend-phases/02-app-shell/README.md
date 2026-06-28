# Phase 02: App Shell

## Overview

This phase builds the persistent application shell that wraps all pages. It establishes the root layout structure, global navigation header, mobile menu, footer, and the visual foundation that users will see on every page.

## Goals

- Implement root layout with Server Components
- Create responsive header with navigation
- Build mobile hamburger menu with animations
- Implement sticky footer with links
- Establish theme configuration (light/dark mode ready)
- Set up global typography and spacing tokens
- Create loading skeleton for initial page load

## Deliverables

- Root layout component (`app/layout.tsx`)
- Header component with logo and nav links
- Mobile menu with slide-in animation
- Footer component
- Navigation constants and types
- Theme provider setup
- Global CSS variables for design tokens

## Dependencies

- **Requires:** Phase 01 (Foundation) - project setup, packages, API client
- **Unlocks:** All subsequent phases (every page needs the shell)

## Exit Criteria

✓ Header displays correctly on desktop and mobile
✓ Mobile menu opens/closes smoothly
✓ Footer shows on all pages
✓ Navigation links route correctly
✓ Theme system functional
✓ Loading skeleton appears during navigation
✓ All acceptance tests pass

## Estimated Effort

**Complexity:** M (Medium)
**Time:** 1-2 days
