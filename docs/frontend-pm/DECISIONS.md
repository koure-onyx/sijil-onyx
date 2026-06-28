# Architectural Decisions Log

This document contains all architectural decisions made during the Sijil frontend development.

Each decision is permanent and must be referenced before making changes to established patterns.

---

## Decision 001: Next.js 14+ App Router

**Title:** Use Next.js 14+ with App Router

**Decision:** The project will use Next.js 14 or later with the App Router architecture (not Pages Router).

**Why:**
- Server Components by default reduce client-side JavaScript bundle
- Built-in support for layouts, loading states, and error boundaries
- Better performance with automatic code splitting
- Native support for Server Actions (future phases)
- Active development and long-term support from Vercel
- Aligns with React's future direction

**Alternatives Rejected:**
- **Next.js Pages Router:** Legacy approach, less efficient, no Server Components
- **Create React App:** No SSR, poor SEO, larger bundles
- **Vite + SPA:** No SSR capabilities, SEO challenges
- **Remix:** Good alternative but smaller ecosystem, less mature

**Impact:**
- All components must follow Server/Client Component boundaries
- File-based routing using `app/` directory structure
- Layouts defined at folder level
- Loading and error states handled per route segment

---

## Decision 002: TypeScript Strict Mode

**Title:** Enforce Strict TypeScript Configuration

**Decision:** TypeScript will be configured with strict mode enabled. No `any` types allowed without explicit eslint-disable justification.

**Why:**
- Catches errors at compile time
- Better IDE autocomplete and documentation
- Self-documenting code through type definitions
- Reduces runtime errors
- Improves refactoring safety

**Alternatives Rejected:**
- **Loose TypeScript:** Defeats purpose of type safety
- **JavaScript only:** No type safety, harder to maintain
- **JSDoc types:** Less powerful than native TypeScript

**Impact:**
- All files must be `.ts` or `.tsx`
- Type definitions required for all props, state, and API responses
- No implicit `any` types
- Type errors block builds

---

## Decision 003: Tailwind CSS 4.x

**Title:** Use Tailwind CSS 4.x for Styling

**Decision:** Tailwind CSS version 4.x will be used as the primary styling solution.

**Why:**
- Utility-first approach enables rapid development
- Consistent design system through configuration
- Small production bundles with PurgeCSS
- Excellent responsive design support
- Strong community and ecosystem
- Version 4 offers improved performance and DX

**Alternatives Rejected:**
- **CSS Modules:** More verbose, harder to maintain consistency
- **Styled Components:** Runtime overhead, larger bundles
- **Sass/Less:** Manual maintenance of design tokens
- **Chakra UI / MUI:** Larger bundles, less flexibility

**Impact:**
- All styling uses Tailwind utility classes
- Design tokens defined in `tailwind.config.ts`
- Custom components wrap Tailwind primitives
- No inline styles except for dynamic values

---

## Decision 004: shadcn/ui Component Library

**Title:** Use shadcn/ui as Component Foundation

**Decision:** shadcn/ui will be used as the base component library, with components copied into the project (not installed as npm package).

**Why:**
- Full control over component code
- No runtime dependency on external library
- Components can be customized freely
- Built on Radix UI primitives (accessible)
- Tailwind CSS native
- Actively maintained and growing

**Alternatives Rejected:**
- **Radix UI alone:** Requires more setup, less opinionated
- **Headless UI:** Less component coverage
- **Mantine:** Larger bundle, harder to customize
- **Building from scratch:** Reinventing wheels, accessibility risks

**Impact:**
- UI components live in `src/components/ui/`
- Components can be modified as needed
- New components should follow shadcn patterns
- Accessibility built-in through Radix primitives

---

## Decision 005: React Query (TanStack Query)

**Title:** Use React Query for Server State Management

**Decision:** TanStack Query (React Query) v5 will be used for all server state management, caching, and data fetching.

**Why:**
- Automatic caching and background refetching
- Built-in loading and error states
- Optimistic updates support
- DevTools for debugging
- Reduces boilerplate compared to Redux
- Perfect fit for API-driven applications

**Alternatives Rejected:**
- **SWR:** Good but less features, smaller ecosystem
- **Redux Toolkit:** Overkill for this use case, more boilerplate
- **Zustand:** Good for client state, not server state
- **Context + useEffect:** Too much manual work, error-prone

**Impact:**
- All API calls go through React Query hooks
- Queries defined in `src/hooks/queries/`
- Mutations defined in `src/hooks/mutations/`
- Global query client configuration in provider

---

## Decision 006: Server Components by Default

**Title:** Default to React Server Components

**Decision:** All components are Server Components by default. Client Components (`"use client"`) only when interactivity is required.

**Why:**
- Reduced client-side JavaScript bundle
- Better performance and faster initial page load
- Direct database/API access from server
- Improved SEO with full HTML rendering
- Follows Next.js best practices

**Alternatives Rejected:**
- **All Client Components:** Larger bundles, slower loads
- **Pages Router:** Doesn't support Server Components

**Impact:**
- Components are Server Components unless they need:
  - useState
  - useEffect
  - onClick handlers
  - Browser APIs
- `"use client"` directive added only when necessary
- Clear separation between server and client logic

---

## Decision 007: Mobile-First Responsive Design

**Title:** Implement Mobile-First Responsive Strategy

**Decision:** All responsive design will follow mobile-first approach using Tailwind's breakpoint system.

**Why:**
- Better performance (load mobile styles first)
- Forces prioritization of content
- Matches user behavior (majority mobile traffic)
- Cleaner CSS with progressive enhancement
- Industry standard practice

**Alternatives Rejected:**
- **Desktop-first:** Larger mobile payloads, harder maintenance
- **Separate mobile site:** Maintenance nightmare, SEO issues
- **Responsive afterthought:** Inconsistent experience

**Impact:**
- Base styles target mobile
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl` add enhancements
- Test on mobile devices first
- Navigation designed for touch first

---

## Decision 008: No Mocked Data Policy

**Title:** Never Use Mocked or Fake Data

**Decision:** All data must come from real backend APIs. No mock data, no hardcoded values, no fake responses.

**Why:**
- Ensures frontend works with actual backend
- Catches integration issues early
- Prevents false confidence in implementation
- Forces proper error handling
- Realistic testing from day one

**Alternatives Rejected:**
- **Mock data for development:** Creates disconnect from reality
- **MSW (Mock Service Worker):** Adds complexity, delays real integration
- **Hardcoded samples:** Must be removed later, often forgotten

**Impact:**
- Backend must be running during development
- Environment variables must point to real API
- If backend unavailable, show appropriate loading/error states
- No placeholder content in components

---

## Decision 009: Centralized API Client

**Title:** Single Shared API Client for All Requests

**Decision:** All API requests must go through a centralized API client in `src/lib/api.ts`. No direct `fetch()` calls in components.

**Why:**
- Single place for auth headers, base URL, error handling
- Consistent request/response handling
- Easier to add interceptors, logging, retries
- Simplifies testing and mocking if needed
- Reduces code duplication

**Alternatives Rejected:**
- **Direct fetch in components:** Duplicated logic, inconsistent handling
- **Axios instances everywhere:** Same problem, less control
- **API SDK generation:** Over-engineering for this project

**Impact:**
- `api.get()`, `api.post()`, etc. methods used everywhere
- Base URL from environment variable
- Auth headers added automatically
- Errors normalized to consistent format

---

## Decision 010: Feature-Based Folder Structure

**Title:** Organize Code by Feature After Foundation

**Decision:** After Phase 1 (foundation), code will be organized by feature/domain rather than by type.

**Why:**
- Easier to find related code
- Better for team collaboration
- Features can be developed independently
- Clearer ownership boundaries
- Scales better as project grows

**Alternatives Rejected:**
- **Type-based folders (all components together):** Hard to find feature-specific code
- **Single flat structure:** Becomes unmanageable quickly
- **Domain-driven deep nesting:** Over-engineering for current scope

**Impact:**
- Foundation code in `src/components/`, `src/lib/`, etc.
- Feature code in `src/features/[feature-name]/`
- Each feature has its own components, hooks, types
- Shared utilities stay in root folders

---

## Decision 011: Accessibility WCAG 2.1 AA Compliance

**Title:** Meet WCAG 2.1 Level AA Accessibility Standards

**Decision:** All components and pages must meet WCAG 2.1 Level AA accessibility standards.

**Why:**
- Legal compliance in many jurisdictions
- Ethical responsibility for inclusive design
- Better UX for all users
- SEO benefits
- shadcn/ui components are accessible by default

**Alternatives Rejected:**
- **Lower compliance level:** Excludes users, legal risks
- **Accessibility as afterthought:** Expensive to fix later
- **No formal standard:** Inconsistent quality

**Impact:**
- Semantic HTML always
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios checked
- Screen reader testing required
- Focus management implemented

---

## Decision 012: Error Boundaries at Route Level

**Title:** Implement Error Boundaries at Each Route Segment

**Decision:** Error boundaries will be implemented at each route segment level using Next.js `error.tsx` pattern.

**Why:**
- Graceful degradation when errors occur
- Better user experience than blank pages
- Easier debugging with clear error boundaries
- Can show contextual fallback UI
- Follows Next.js conventions

**Alternatives Rejected:**
- **Global error handler only:** Too broad, loses context
- **No error boundaries:** Poor UX, hard to debug
- **Custom error library:** Unnecessary complexity

**Impact:**
- `error.tsx` file in routes that need it
- Error UI matches design system
- Retry functionality included
- Errors logged to monitoring service

---

## Decision 013: Environment Variable Prefixing

**Title:** Use NEXT_PUBLIC_ Prefix for Client Variables

**Decision:** Only environment variables prefixed with `NEXT_PUBLIC_` will be exposed to the client. Server-only variables remain unprefixed.

**Why:**
- Security: prevents accidental exposure of secrets
- Clear intent about variable usage
- Next.js convention
- Build-time validation

**Alternatives Rejected:**
- **All variables public:** Security risk
- **No prefix convention:** Confusing, error-prone
- **Runtime config:** Defeats purpose of env vars

**Impact:**
- `NEXT_PUBLIC_API_URL` available in browser
- `DATABASE_URL` server-only
- `.env.local` for development
- `.env.production` for production
- Validation on build

---

## Decision 014: Git Commit Convention

**Title:** Use Conventional Commits Format

**Decision:** All git commits will follow the Conventional Commits specification.

**Why:**
- Automated changelog generation
- Clear commit history
- Enables semantic versioning
- Easier to understand changes at a glance
- Industry standard

**Alternatives Rejected:**
- **Free-form commits:** Unclear history, hard to parse
- **No commit messages:** Impossible to track changes
- **Custom format:** Tooling incompatibility

**Impact:**
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope: feature name or area affected
- Breaking changes noted with `!` or `BREAKING CHANGE` footer

Example: `feat(documents): add pagination to document list`

---

## Decision 015: No Inline Fetch Pattern

**Title:** Prohibit Inline Fetch Calls in Components

**Decision:** No `fetch()` or API calls directly inside component bodies. All data fetching through React Query hooks.

**Why:**
- Consistent caching strategy
- Automatic deduplication of requests
- Built-in loading and error states
- Easier to test and mock
- Separation of concerns

**Alternatives Rejected:**
- **useEffect + fetch:** Manual caching, error-prone
- **getServerSideProps:** Legacy pattern, less flexible
- **Inline async in component:** Anti-pattern, breaks rules of hooks

**Impact:**
- Custom hooks for each query/mutation
- Hooks exported from `src/hooks/`
- Components consume hooks only
- No raw fetch calls anywhere

---

*Last Updated: Decision log creation date*
*New decisions added as they are made during implementation*
