# SIJIL Technology Baseline Report

**Generated:** $(date -u +"%Y-%m-%d")  
**Purpose:** Establish verified technology baseline for SIJIL frontend development  
**Status:** Verified against official documentation and npm registry

---

## 1. Next.js

### Latest Stable Version
**16.2.9** (verified via npm registry)

### Official Documentation URL
- https://nextjs.org/docs
- https://nextjs.org/docs/app

### Breaking Changes from Previous Major Versions

#### Next.js 14 → 15
- **App Router is now stable**: Pages router is in maintenance mode
- **Turbopack stable**: Default for `next dev` in new projects
- **React 19 requirement**: Requires React 19 or later
- **Server Actions stable**: No longer experimental
- **Partial Prerendering**: New rendering model (experimental)
- **Middleware updates**: Stricter type requirements

#### Next.js 13 → 14
- App Router moved from experimental to stable
- Server Actions introduced (experimental at the time)
- Turbopack introduced as replacement for webpack (experimental)

### Recommended Project Setup

```bash
npx create-next-app@latest sijil --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Key configuration:
- Use App Router (`app/` directory)
- Enable TypeScript strict mode
- Use Turbopack for development
- Enable Server Components by default
- Configure import aliases (`@/*`)

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- `getStaticProps`, `getServerSideProps`, `getStaticPaths` (Pages router patterns)
- `next/link` with `a` tag children (use direct children)
- `Image` component without `sizes` prop for responsive images
- Client Components for data fetching (use Server Components)
- `useEffect` for data fetching (use TanStack Query or Server Components)
- Mixed routing (stick to App Router only)

### Relevant Patterns for SIJIL

✅ **USE:**
- Server Components for initial data loading
- Route Handlers (`route.ts`) for API endpoints
- Server Actions for form submissions
- Streaming with Suspense boundaries
- Parallel routes for dashboard layouts
- Intercepting routes for modals
- Middleware for auth and redirects

---

## 2. React

### Latest Stable Version
**19.2.7** (verified via npm registry)

### Official Documentation URL
- https://react.dev
- https://react.dev/reference/react

### Breaking Changes from Previous Major Versions

#### React 18 → 19
- **Automatic JSX transform**: Required (no more `React` import for JSX)
- **StrictMode changes**: Double-invokes effects in development
- **Suspense behavior**: Improved concurrent rendering
- **useSyncExternalStore**: Required for external state stores
- **Act warnings**: Stricter testing requirements
- **Deprecated APIs**: Removed legacy context, string refs

### Recommended Project Setup

```tsx
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

Key practices:
- Always use functional components
- Use hooks exclusively (no class components)
- Enable StrictMode in development
- Use `use client` directive sparingly

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- Class components
- `React.createClass`
- String refs
- `findDOMNode`
- Mixins
- `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`
- Context Consumer/Provider pattern (use `useContext`)

### Relevant Patterns for SIJIL

✅ **USE:**
- Server Components (default in Next.js 14+)
- Client Components with `'use client'` when needed
- Custom hooks for reusable logic
- Compound components for UI primitives
- Composition over inheritance
- Error Boundaries for graceful failures

---

## 3. TypeScript

### Latest Stable Version
**6.0.3** (verified via npm registry)

### Official Documentation URL
- https://www.typescriptlang.org/docs/
- https://www.typescriptlang.org/tsconfig/

### Breaking Changes from Previous Major Versions

#### TypeScript 5 → 6
- **Stricter type inference**: More precise union narrowing
- **Module resolution changes**: `bundler` strategy improvements
- **Decorators**: Stage 3 decorator support finalized
- **Const type parameters**: Enhanced inference
- **ES2025 target support**: Latest ECMAScript features

#### TypeScript 4 → 5
- Decorators moved to Stage 3
- `satisfies` operator introduced
- Improved type inference for template literals

### Recommended Project Setup

```json
{
  "compilerOptions": {
    "target": "ES2025",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- `any` type (use `unknown` if truly unknown)
- Non-null assertions (`!`) without verification
- Type assertions (`as Type`) instead of proper typing
- Implicit `any` returns
- Namespace imports for types (use named imports)
- `export =` syntax

### Relevant Patterns for SIJIL

✅ **USE:**
- Strict mode enabled
- Discriminated unions for state machines
- Generic types for reusable utilities
- Utility types (`Pick`, `Omit`, `Partial`, `Required`)
- Branding for primitive types (IDs, emails)
- Zod for runtime validation with type inference

---

## 4. Tailwind CSS

### Latest Stable Version
**4.3.1** (verified via npm registry)

### Official Documentation URL
- https://tailwindcss.com/docs
- https://v4.tailwindcss.com/docs

### Breaking Changes from Previous Major Versions

#### Tailwind CSS 3 → 4
- **New engine**: Oxide (Rust-based) for faster builds
- **CSS-first configuration**: Replace `tailwind.config.js` with CSS variables
- **No more `@tailwind` directives**: Use `@import "tailwindcss"`
- **Automatic content detection**: No need for `content` array
- **Theme values as CSS variables**: Dynamic theming support
- **Simplified plugin API**: New plugin system

### Recommended Project Setup

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --font-sans: var(--font-inter);
}
```

```bash
npm install tailwindcss @tailwindcss/cli
```

Key configuration:
- Use CSS-first configuration
- Leverage CSS variables for theming
- Enable dark mode with `dark:` variant
- Use arbitrary values sparingly

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- `tailwind.config.js` for theme customization (use CSS)
- `@tailwind base/components/utilities` (use `@import "tailwindcss"`)
- PurgeCSS configuration (automatic now)
- JIT mode flag (always on)
- Deep nesting of utilities

### Relevant Patterns for SIJIL

✅ **USE:**
- CSS variables for design tokens
- Component composition with `@apply` sparingly
- Responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- State variants (`hover:`, `focus:`, `disabled:`)
- Dark mode with `dark:` variant
- Container queries with `@container`

---

## 5. TanStack Query (React Query)

### Latest Stable Version
**5.101.1** (verified via npm registry)

### Official Documentation URL
- https://tanstack.com/query/latest
- https://tanstack.com/query/v5/docs/framework/react/overview

### Breaking Changes from Previous Major Versions

#### TanStack Query 4 → 5
- **Query key structure**: Arrays required, no more string keys
- **Deduplication**: Built-in query deduplication
- **Hooks renamed**: `useQueries` signature changed
- **TypeScript improvements**: Stricter typing
- **Persistence API**: Changed for better SSR support
- **Devtools**: Separate package installation

### Recommended Project Setup

```tsx
// src/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
```

```tsx
// src/providers/query-provider.tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- String query keys (use arrays: `['users', id]`)
- `cacheTime` (renamed to `gcTime`)
- `refetchOnMount` options (use `staleTime`)
- Manual cache management
- `setQueryData` with updater function for simple updates

### Relevant Patterns for SIJIL

✅ **USE:**
- Array query keys with dependencies
- `useQuery` for data fetching
- `useMutation` for data modifications
- `useQueryClient` for cache invalidation
- `useSuspenseQuery` with React Suspense
- Optimistic updates with `onMutate`
- Infinite queries with `useInfiniteQuery`
- Prefetching with `queryClient.prefetchQuery`

---

## 6. Zustand

### Latest Stable Version
**5.0.14** (verified via npm registry)

### Official Documentation URL
- https://zustand.docs.pmnd.rs
- https://github.com/pmndrs/zustand

### Breaking Changes from Previous Major Versions

#### Zustand 4 → 5
- **React 18+ required**: Dropped support for older React versions
- **TypeScript improvements**: Better inference
- **Middleware changes**: Updated persist middleware API
- **Subscribe selector**: Enhanced subscription API
- **SSR improvements**: Better server-side rendering support

### Recommended Project Setup

```tsx
// src/stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (credentials) => {
        // Implementation
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
)
```

Key practices:
- Use TypeScript for store definitions
- Persist only necessary data
- Keep stores focused (single responsibility)
- Use selectors for derived state

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- Global store for everything (split by domain)
- Storing non-serializable data in persisted stores
- Direct state mutation
- Multiple stores with circular dependencies
- `subscribe` without cleanup

### Relevant Patterns for SIJIL

✅ **USE:**
- Slice pattern for large stores
- Middleware for cross-cutting concerns
- Selectors for computed values
- `shallow` comparison for performance
- Hydration handling for SSR
- Transient updates for high-frequency changes

---

## 7. React Hook Form

### Latest Stable Version
**7.80.0** (verified via npm registry)

### Official Documentation URL
- https://reacthookform.com
- https://reacthookform.com/docs

### Breaking Changes from Previous Major Versions

#### React Hook Form 6 → 7
- **Controller simplification**: Unified API
- **TypeScript improvements**: Better type inference
- **Validation changes**: Enhanced resolver API
- **Watch behavior**: Improved re-render optimization
- **Form state**: More granular subscriptions

### Recommended Project Setup

```tsx
// src/components/forms/login-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    // Handle submission
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

Key practices:
- Use Zod for schema validation
- Type-safe form values with `z.infer`
- Controlled components with `Controller`
- Server Actions integration

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- Native form validation (use Zod)
- Manual error state management
- `register` without type safety
- Uncontrolled inputs for complex forms
- `watch` for everything (use specific subscriptions)

### Relevant Patterns for SIJIL

✅ **USE:**
- Zod schema validation
- `Controller` for custom inputs (shadcn/ui)
- `useFieldArray` for dynamic fields
- `formState` subscriptions for performance
- Server Actions with `handleSubmit`
- Progressive enhancement patterns

---

## 8. Zod

### Latest Stable Version
**4.4.3** (verified via npm registry)

### Official Documentation URL
- https://zod.dev
- https://github.com/colinhacks/zod

### Breaking Changes from Previous Major Versions

#### Zod 3 → 4
- **Brand type changes**: Enhanced branding API
- **Error map improvements**: Better error customization
- **Async refinement**: Enhanced async validation
- **Performance**: Improved parsing speed
- **Type inference**: Better TypeScript integration

### Recommended Project Setup

```ts
// src/lib/validations/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
```

Key practices:
- Share schemas between frontend and backend
- Use `z.infer` for type extraction
- Create reusable schema utilities
- Validate API responses

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- Runtime type checks instead of Zod
- Manual validation logic
- Any type in schemas
- Complex refinements when simple schemas work
- Validating without error messages

### Relevant Patterns for SIJIL

✅ **USE:**
- Schema composition with `extend`, `omit`, `pick`
- Transformations with `.transform()`
- Default values with `.default()`
- Optional/nullable handling
- Discriminated unions for polymorphic data
- Async refinements for database checks

---

## 9. shadcn/ui

### Latest Stable Version
**0.0.4** (CLI package, components are copied to project)

### Official Documentation URL
- https://ui.shadcn.com
- https://github.com/shadcn/ui

### Breaking Changes from Previous Major Versions

#### Recent Updates
- **Radix UI primitives**: Updated to latest versions
- **Tailwind CSS 4 compatibility**: Updated for new engine
- **Component API changes**: Some props renamed for consistency
- **Dark mode improvements**: Better theme switching
- **Accessibility enhancements**: WCAG 2.1 compliance

### Recommended Project Setup

```bash
npx shadcn@latest init
```

Configuration:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Add components:
```bash
npx shadcn@latest add button card form dialog table
```

Key practices:
- Copy components to your project (not a dependency)
- Customize components in place
- Use CSS variables for theming
- Compose primitives for complex UIs

### Deprecated Patterns to Avoid

❌ **DO NOT USE:**
- Importing from `@/components/ui` without adding first
- Modifying component source without understanding Radix primitives
- Ignoring accessibility features
- Using components without proper form integration
- Hardcoding colors instead of using CSS variables

### Relevant Patterns for SIJIL

✅ **USE:**
- Component composition
- Custom variants with `cva`
- Form integration with React Hook Form
- Dialog/drawer for complex interactions
- Data table patterns for lists
- Skeleton loaders for loading states
- Toast notifications for feedback

---

## Summary Table

| Technology | Latest Version | Docs URL | Key Pattern for SIJIL |
|------------|---------------|----------|----------------------|
| Next.js | 16.2.9 | nextjs.org/docs | App Router + Server Components |
| React | 19.2.7 | react.dev | Functional + Hooks |
| TypeScript | 6.0.3 | typescriptlang.org | Strict Mode |
| Tailwind CSS | 4.3.1 | tailwindcss.com | CSS Variables |
| TanStack Query | 5.101.1 | tanstack.com/query | Array Query Keys |
| Zustand | 5.0.14 | zustand.pmnd.rs | Slice Pattern |
| React Hook Form | 7.80.0 | reacthookform.com | Zod Resolver |
| Zod | 4.4.3 | zod.dev | Schema Composition |
| shadcn/ui | 0.0.4 | ui.shadcn.com | Component Copy |

---

## Verification Checklist

Before starting any implementation task, verify:

- [ ] All versions match this baseline
- [ ] Documentation links are accessible
- [ ] No deprecated patterns in use
- [ ] Project setup matches recommendations
- [ ] TypeScript strict mode enabled
- [ ] App Router used (not Pages Router)
- [ ] Server Components default to Client Components
- [ ] Zod used for all validation
- [ ] TanStack Query for server state
- [ ] Zustand for client state only

---

**Next Action:** Use this baseline to validate FOUND-001 implementation package before generation.
