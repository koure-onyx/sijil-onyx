# Frontend Implementation Rules

**PERMANENT RULES - ALL FUTURE IMPLEMENTATION SESSIONS MUST FOLLOW THESE RULES**

These rules are non-negotiable. Every implementation AI must adhere to them without exception.

---

## Core Principles

### Rule 001: Never Use Mocked Data

**All data must come from real backend APIs.**

❌ NEVER:
- Hardcode response data in components
- Create fake API responses
- Use placeholder content that doesn't match backend schema
- Mock fetch calls with static data

✅ ALWAYS:
- Call real backend endpoints
- Handle actual API responses
- Show loading states while fetching
- Display error states on failures

**Rationale:** Mocked data creates false confidence and delays integration issues.

---

### Rule 002: Server Components by Default

**All components are Server Components unless they require interactivity.**

❌ NEVER:
- Add `"use client"` without justification
- Make everything a Client Component "just in case"
- Use useState or useEffect in components that don't need them

✅ ALWAYS:
- Start as Server Component
- Add `"use client"` only when you need:
  - `useState`
  - `useEffect`
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (`window`, `localStorage`, etc.)
  - Third-party hooks that require client context

**Rationale:** Reduces JavaScript bundle, improves performance, better SEO.

---

### Rule 003: Strict TypeScript

**No `any` types allowed. Full type safety required.**

❌ NEVER:
- Use `any` type (without explicit eslint-disable and comment)
- Skip type definitions for props
- Leave return types implicit
- Use `as any` for type casting

✅ ALWAYS:
- Define interfaces for all props
- Type all function parameters and returns
- Use proper TypeScript interfaces matching backend schemas
- Let TypeScript infer when obvious, annotate when needed

**Rationale:** Catches errors at compile time, self-documenting code, safer refactoring.

---

### Rule 004: Mobile-First Responsive Design

**Design for mobile first, enhance for larger screens.**

❌ NEVER:
- Write desktop styles first then override for mobile
- Use `max-width` media queries for responsive breakpoints
- Test only on desktop during development

✅ ALWAYS:
- Base styles target mobile (smallest screen)
- Use Tailwind's breakpoint system: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on actual mobile devices or emulators
- Ensure touch targets are at least 44px

**Rationale:** Better performance, matches user behavior, cleaner CSS.

---

### Rule 005: No Inline Fetch Calls

**All API calls go through the shared API client and React Query hooks.**

❌ NEVER:
- Call `fetch()` directly in components
- Use `axios.get()` inline in components
- Make API calls inside `useEffect`
- Create ad-hoc API calling patterns

✅ ALWAYS:
- Use the shared API client (`src/lib/api.ts`)
- Wrap API calls in React Query hooks
- Export hooks from `src/hooks/` directory
- Consume hooks in components

```typescript
// ❌ WRONG - inline fetch
const Component = async () => {
  const res = await fetch('/api/documents');
  const data = await res.json();
};

// ✅ CORRECT - use hook
const Component = () => {
  const { data } = useDocuments();
};
```

**Rationale:** Consistent caching, error handling, deduplication, easier testing.

---

### Rule 006: Reuse UI Components

**Never create duplicate UI components. Always check the registry first.**

❌ NEVER:
- Create a new button component when one exists
- Build custom cards without checking existing patterns
- Reinvent form inputs, modals, or dropdowns
- Ignore the component registry (04-component-registry.md)

✅ ALWAYS:
- Check `src/components/ui/` for existing components
- Check `docs/frontend-execution/04-component-registry.md`
- Extend existing components if needed
- Document new components immediately after creation

**Rationale:** Consistency, maintainability, reduced bundle size.

---

### Rule 007: No Duplicated Logic

**Extract shared logic into utilities or hooks immediately.**

❌ NEVER:
- Copy-paste code between components
- Implement same calculation in multiple places
- Duplicate date formatting logic
- Repeat validation patterns

✅ ALWAYS:
- Extract to utility function in `src/lib/utils.ts`
- Create custom hooks for reusable logic
- Use composition over duplication
- Follow DRY principle strictly

**Rationale:** Single source of truth, easier maintenance, fewer bugs.

---

### Rule 008: Error Handling Required

**Every async operation must have proper error handling.**

❌ NEVER:
- Ignore Promise rejections
- Let errors bubble up without handling
- Show generic "something went wrong" without context
- Forget to log errors for debugging

✅ ALWAYS:
- Use React Query's built-in error handling
- Implement error boundaries at route level
- Show contextual error messages to users
- Log errors appropriately
- Provide retry mechanisms where applicable

**Rationale:** Graceful degradation, better UX, easier debugging.

---

### Rule 009: Loading States Required

**Every async operation must show loading state.**

❌ NEVER:
- Render empty UI while loading
- Forget skeleton loaders
- Show blank screens during fetch
- Ignore perceived performance

✅ ALWAYS:
- Use `isLoading` from React Query
- Implement skeleton loaders matching final layout
- Show loading spinners for actions
- Use Suspense boundaries where appropriate

**Rationale:** Better perceived performance, reduces user anxiety.

---

### Rule 010: Accessibility WCAG 2.1 AA

**All components must meet accessibility standards.**

❌ NEVER:
- Use `<div>` for buttons
- Forget alt text on images
- Ignore keyboard navigation
- Use color alone to convey information
- Skip heading hierarchy

✅ ALWAYS:
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Add ARIA labels where needed
- Ensure keyboard navigability
- Maintain proper focus order
- Test with screen readers
- Check color contrast ratios

**Rationale:** Inclusive design, legal compliance, better UX for all.

---

### Rule 011: No Hardcoded URLs

**All URLs and configuration come from environment variables or config files.**

❌ NEVER:
- Hardcode API base URL in components
- Put image paths directly in code
- Embed feature flags as literals
- Commit environment-specific values

✅ ALWAYS:
- Use `process.env.NEXT_PUBLIC_API_URL`
- Import from `src/config/site.ts`
- Use constants from `src/constants/`
- Keep environment-specific values in `.env` files

**Rationale:** Environment portability, security, easier deployment.

---

### Rule 012: Approved Folder Structure Only

**Never create files outside approved directories.**

❌ NEVER:
- Create folders at root level
- Put components in wrong directories
- Mix feature code with foundation code
- Ignore established conventions

✅ ALWAYS:
- Foundation code: `src/components/`, `src/lib/`, `src/hooks/`
- Feature code: `src/features/[feature-name]/`
- Types: `src/types/`
- Config: `src/config/`
- Follow structure in `01-foundation.md` Section 3

**Rationale:** Consistency, discoverability, team collaboration.

---

### Rule 013: Acceptance Checklist Before Continuing

**Every phase must pass acceptance checklist before starting next phase.**

❌ NEVER:
- Skip acceptance criteria
- Move to next phase with failing tests
- Ignore accessibility requirements
- Deploy without performance verification

✅ ALWAYS:
- Run full acceptance checklist
- Fix all failing items
- Get checklist sign-off
- Document any exceptions

**Rationale:** Quality gates prevent technical debt accumulation.

---

### Rule 014: No Console Errors Allowed

**Production code must have zero console errors and warnings.**

❌ NEVER:
- Leave `console.log()` in production code
- Ignore React warnings
- Allow PropTypes warnings
- Tolerate hydration mismatches

✅ ALWAYS:
- Remove debug logs before commit
- Fix all React warnings immediately
- Ensure clean console in development
- Test in production mode

**Rationale:** Professional quality, catches real issues, better DX.

---

### Rule 015: Git Commit Convention

**All commits follow Conventional Commits format.**

❌ NEVER:
- Write vague commit messages ("fix stuff", "update")
- Skip scope in commit messages
- Commit without testing
- Combine unrelated changes

✅ ALWAYS:
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Small, focused commits
- Test before committing

Example: `feat(documents): add pagination to document list`

**Rationale:** Clear history, automated changelogs, easier debugging.

---

### Rule 016: Component Props Documentation

**Every component must have documented props with TypeScript.**

❌ NEVER:
- Create components without prop types
- Use undocumented props
- Forget to export type interfaces
- Leave props ambiguous

✅ ALWAYS:
- Define interface for props
- Document each prop with JSDoc comments
- Mark optional props with `?`
- Provide default values where appropriate

```typescript
interface ButtonProps {
  /** The action to perform when clicked */
  onClick: () => void;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary';
  /** Button text content */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}
```

**Rationale:** Self-documenting code, better IDE support, clearer contracts.

---

### Rule 017: Performance Budget Enforcement

**Never exceed performance budgets.**

❌ NEVER:
- Ship bundles larger than budget
- Ignore Lighthouse scores
- Load unnecessary dependencies
- Forget to optimize images

✅ ALWAYS:
- Monitor bundle size
- Keep initial JS < 200KB (gzip)
- Achieve Lighthouse score > 90
- Use Next.js Image component
- Lazy load non-critical resources

**Rationale:** Fast pages, better SEO, improved UX.

---

### Rule 018: Backend Integration First

**Connect to real backend before building UI on top.**

❌ NEVER:
- Build complete UI before verifying API
- Assume API response structure
- Create components that can't connect to backend
- Delay API integration until "UI is done"

✅ ALWAYS:
- Test API endpoint first
- Verify response schema matches expectations
- Create TypeScript interface from actual response
- Then build UI component
- Handle all error cases from API

**Rationale:** Prevents rework, ensures feasibility, catches issues early.

---

### Rule 019: No Unused Dependencies

**Every dependency must be justified and used.**

❌ NEVER:
- Install packages "just in case"
- Keep unused dependencies
- Import entire libraries when partial works
- Forget to remove experimental packages

✅ ALWAYS:
- Document why each package is needed (see 01-foundation.md Section 4)
- Use tree-shakeable imports
- Remove unused dependencies immediately
- Audit dependencies regularly

**Rationale:** Smaller bundles, faster installs, fewer security risks.

---

### Rule 020: Phase Boundaries Respected

**Never implement features from future phases.**

❌ NEVER:
- Add document pages during foundation phase
- Implement search before Phase 4
- Create admin features without auth
- Jump ahead in the backlog

✅ ALWAYS:
- Check BACKLOG.md for current phase
- Stay within phase scope
- Note ideas for future phases separately
- Complete current phase fully before moving on

**Rationale:** Proper sequencing, manageable scope, clear progress tracking.

---

## Violation Consequences

If any rule is violated:

1. **Immediate:** Stop implementation
2. **Required:** Fix the violation before continuing
3. **Document:** Note the violation and fix in session log
4. **Review:** Understand why violation occurred
5. **Prevent:** Update process to prevent recurrence

---

## Rule Updates

These rules are living documents. To propose a rule change:

1. Document the proposed change in DECISIONS.md
2. Explain rationale and alternatives
3. Get approval from project lead
4. Update this file
5. Communicate to all team members

---

*Last Updated: Rules creation date*
*Next Review: End of each phase*
*Acknowledged By: All implementation sessions must confirm understanding before starting*
