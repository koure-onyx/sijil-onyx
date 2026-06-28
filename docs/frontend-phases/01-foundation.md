# Phase 1: Foundation

**Document Type:** Construction Specification  
**Phase:** 1 of 6  
**Status:** Ready for Implementation  
**Created:** 2026-06-27  

---

## 1. Phase Goal

This phase delivers the complete technical foundation upon which all subsequent frontend features will be built. 

**What This Phase Delivers:**

1. **Project Initialization** - A fully configured Next.js 14+ application with TypeScript, Tailwind CSS 4.x, and shadcn/ui components
2. **Core Infrastructure** - API client layer, HTTP wrapper, error handling boundaries, loading states, and React Query configuration
3. **Design System Foundation** - Theme configuration, design tokens, fonts, icons, and responsive layout shell
4. **Navigation Skeleton** - Root layout structure, header, footer, and basic routing infrastructure
5. **Homepage** - Landing page displaying platform statistics and navigation entry points
6. **Health Check Integration** - Connection to backend health endpoint to verify API connectivity
7. **404 Handler** - Basic not-found page with redirect resolution capability

**What This Phase Does NOT Deliver:**

- No business features (documents, topics, search, collections)
- No content rendering beyond static homepage
- No admin interface
- No export functionality
- No authentication flows
- No complex data fetching beyond health check and platform stats

**Success Criteria:**

- Project builds successfully (`npm run build` exits with code 0)
- Homepage renders with live platform statistics from backend
- Navigation between homepage and 404 page works
- All Core Web Vitals pass baseline thresholds
- Deployed to staging environment and accessible via URL

---

## 2. Scope

### Included in Phase 1

| Item | Description | Priority |
|------|-------------|----------|
| Project scaffolding | Next.js 14+, TypeScript 5.7+, Tailwind CSS 4.x | P0 |
| shadcn/ui setup | Base components (Button, Card, Skeleton, etc.) | P0 |
| API client | HTTP wrapper with error handling, base URL config | P0 |
| React Query | TanStack Query v5 configuration | P0 |
| Root layout | MainLayout with Header and Footer | P0 |
| Homepage | `/` route with stats widgets | P0 |
| Health check | Backend connectivity verification | P0 |
| 404 page | Catch-all route with slug resolution attempt | P1 |
| Environment config | `.env.local` template with required variables | P0 |
| TypeScript types | Base interfaces for API responses | P0 |
| Utilities | Helper functions for common operations | P1 |
| Icons | Lucide React integration | P1 |
| Fonts | Inter font family via next/font | P1 |
| Error boundary | Global error handling component | P0 |
| Loading boundary | Skeleton loaders and suspense fallbacks | P0 |

### Excluded from Phase 1

| Item | Reason for Exclusion | Phase |
|------|---------------------|-------|
| Document list/detail pages | Business feature | Phase 2 |
| Topic pages | Business feature | Phase 2 |
| Search functionality | Business feature | Phase 2 |
| Subject browse pages | Business feature | Phase 2 |
| Quran browser | Specialized feature | Phase 3 |
| Export system | Complex async workflow | Phase 4 |
| Admin dashboard | Requires auth specification | Phase 5 |
| Authentication | P0 blocker unresolved | Phase 5 |
| Formula search | Specialized feature | Phase 3 |
| Advanced SEO (JSON-LD, sitemaps) | Requires content pages | Phase 2 |
| Analytics integration | Not critical for foundation | Phase 5 |
| Testing suite | Can be added incrementally | Phase 2 |

---

## 3. Final Folder Structure

After Phase 1 completion, the project structure will be:

```
sijil-frontend/
├── .env.example                    # Environment variable template
├── .env.local                      # Local environment (gitignored)
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── components.json                 # shadcn/ui configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
│
├── public/
│   ├── favicon.ico                 # Site favicon
│   └── og-image.png                # OpenGraph default image
│
├── src/
│   ├── app/                        # App Router pages
│   │   ├── globals.css             # Global styles (Tailwind base)
│   │   ├── layout.tsx              # Root layout (providers wrapper)
│   │   ├── page.tsx                # Homepage (/)
│   │   ├── not-found.tsx           # 404 page (catch-all)
│   │   └── providers.tsx           # Client-side providers (React Query, Theme)
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ... (other base components)
│   │   │
│   │   ├── layout/                 # Layout components
│   │   │   ├── header.tsx          # Global header with logo and nav
│   │   │   ├── footer.tsx          # Global footer with links
│   │   │   └── main-layout.tsx     # Wrapper for standard pages
│   │   │
│   │   ├── shared/                 # Shared reusable components
│   │   │   ├── error-boundary.tsx  # Error boundary wrapper
│   │   │   ├── loading-skeleton.tsx # Generic loading skeleton
│   │   │   └── stat-card.tsx       # Statistics display card
│   │   │
│   │   └── icons/                  # Icon components
│   │       └── lucide-icons.ts     # Re-exported Lucide icons
│   │
│   ├── lib/
│   │   ├── api/                    # API layer
│   │   │   ├── client.ts           # HTTP client wrapper
│   │   │   ├── endpoints.ts        # Endpoint definitions
│   │   │   └── types.ts            # API response types
│   │   │
│   │   ├── utils.ts                # Utility functions (cn, formatDate, etc.)
│   │   └── constants.ts            # Application constants
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-api.ts              # Generic API hook
│   │   └── use-platform-stats.ts   # Platform stats hook
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── api.ts                  # API-related types
│   │   ├── models.ts               # Data model interfaces
│   │   └── common.ts               # Common/shared types
│   │
│   └── config/                     # Configuration objects
│       ├── site.ts                 # Site metadata
│       └── navigation.ts           # Navigation menu config
│
└── README.md                       # Project documentation
```

**Notes:**

- Feature modules (`features/`) are NOT created in Phase 1; they begin in Phase 2
- No `pages/` directory (App Router only)
- No `styles/` directory beyond `globals.css` (Tailwind handles styling)
- shadcn/ui components live in `components/ui/` and are managed via CLI

---

## 4. Packages

Install the following dependencies. Each package is justified by its role in the foundation.

### Core Framework

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `next` | `^14.2.0` | React framework | App Router, SSR, ISR, image optimization |
| `react` | `^18.3.0` | UI library | Component framework |
| `react-dom` | `^18.3.0` | React DOM renderer | Browser rendering |

### Language & Types

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `typescript` | `^5.7.0` | Type safety | Compile-time error checking, IntelliSense |
| `@types/react` | `^18.3.0` | React types | TypeScript support for React |
| `@types/react-dom` | `^18.3.0` | React DOM types | TypeScript support for ReactDOM |
| `@types/node` | `^20.0.0` | Node.js types | TypeScript support for Node APIs |

### Styling

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `tailwindcss` | `^4.0.0` | Utility-first CSS | Rapid UI development, consistent design tokens |
| `postcss` | `^8.4.0` | CSS transformation | Required for Tailwind processing |
| `autoprefixer` | `^10.4.0` | CSS vendor prefixes | Cross-browser CSS compatibility |
| `class-variance-authority` | `^0.7.0` | Component variants | shadcn/ui variant system |
| `clsx` | `^2.1.0` | Class name utility | Conditional class merging |
| `tailwind-merge` | `^2.2.0` | Tailwind class merging | Resolve Tailwind class conflicts |
| `lucide-react` | `^0.400.0` | Icon library | Consistent iconography throughout app |

### shadcn/ui Dependencies

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `@radix-ui/react-slot` | `^1.0.0` | Slot primitive | shadcn/ui component composition |
| `@radix-ui/react-dialog` | `^1.0.0` | Dialog primitive | Modal/dialog components |
| `@radix-ui/react-dropdown-menu` | `^2.0.0` | Dropdown primitive | Menu components |
| `@radix-ui/react-navigation-menu` | `^1.0.0` | Nav menu primitive | Header navigation |
| `@radix-ui/react-scroll-area` | `^1.0.0` | Scroll area primitive | Scrollable containers |
| `@radix-ui/react-separator` | `^1.0.0` | Separator primitive | Visual dividers |
| `@radix-ui/react-tooltip` | `^1.0.0` | Tooltip primitive | Hover tooltips |

### State Management & Data Fetching

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `@tanstack/react-query` | `^5.50.0` | Server state management | Caching, background updates, error handling |
| `zustand` | `^5.0.0` | Client state management | Lightweight global state (theme, UI preferences) |

### Utilities

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `zod` | `^3.23.0` | Schema validation | Runtime type validation for API responses |
| `date-fns` | `^3.6.0` | Date manipulation | Formatting dates in UI |

### Development Dependencies

| Package | Version | Purpose | Why Required |
|---------|---------|---------|--------------|
| `eslint` | `^8.57.0` | Linting | Code quality enforcement |
| `eslint-config-next` | `^14.2.0` | Next.js ESLint config | Recommended Next.js linting rules |
| `eslint-config-prettier` | `^9.1.0` | Prettier compatibility | Disable conflicting ESLint rules |
| `prettier` | `^3.3.0` | Code formatting | Consistent code style |
| `prettier-plugin-tailwindcss` | `^0.6.0` | Tailwind sorting | Automatic Tailwind class sorting |
| `husky` | `^9.0.0` | Git hooks | Pre-commit linting/formatting (optional) |
| `lint-staged` | `^15.2.0` | Staged file linting | Run linters on staged files only (optional) |

### Installation Commands

```bash
# Initialize Next.js project
npx create-next-app@14 sijil-frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd sijil-frontend

# Install core dependencies
npm install next@14.2.0 react@18.3.0 react-dom@18.3.0

# Install TypeScript
npm install -D typescript@5.7.0 @types/react@18.3.0 @types/react-dom@18.3.0 @types/node@20.0.0

# Install Tailwind CSS 4.x
npm install -D tailwindcss@4.0.0 postcss@8.4.0 autoprefixer@10.4.0

# Install shadcn/ui dependencies
npm install class-variance-authority@0.7.0 clsx@2.1.0 tailwind-merge@2.2.0
npm install lucide-react@0.400.0
npm install @radix-ui/react-slot@1.0.0 @radix-ui/react-dialog@1.0.0 @radix-ui/react-dropdown-menu@2.0.0 @radix-ui/react-navigation-menu@1.0.0 @radix-ui/react-scroll-area@1.0.0 @radix-ui/react-separator@1.0.0 @radix-ui/react-tooltip@1.0.0

# Install state management
npm install @tanstack/react-query@5.50.0 zustand@5.0.0

# Install utilities
npm install zod@3.23.0 date-fns@3.6.0

# Install dev dependencies
npm install -D eslint@8.57.0 eslint-config-next@14.2.0 eslint-config-prettier@9.1.0 prettier@3.3.0 prettier-plugin-tailwindcss@0.6.0

# Initialize shadcn/ui
npx shadcn-ui@latest init
```

---

## 5. Environment

### Required Environment Variables

Create `.env.local` for local development and configure these variables in your hosting platform for production.

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=SIJIL

# Image Configuration (if using external images)
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:3001/images

# Feature Flags (optional, for future use)
NEXT_PUBLIC_ENABLE_SEARCH=false
NEXT_PUBLIC_ENABLE_EXPORT=false
NEXT_PUBLIC_ENABLE_ADMIN=false

# Analytics (optional, for future use)
# NEXT_PUBLIC_GA_ID=
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

### Environment Variable Descriptions

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | - | Base URL for all backend API requests. Must end with `/api` |
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | - | Canonical URL of the frontend site. Used for meta tags, sitemaps |
| `NEXT_PUBLIC_SITE_NAME` | ✅ Yes | `SIJIL` | Human-readable site name for meta titles |
| `NEXT_PUBLIC_IMAGE_BASE_URL` | ❌ No | - | Base URL for served images. If empty, images use relative paths |
| `NEXT_PUBLIC_ENABLE_SEARCH` | ❌ No | `false` | Feature flag to hide/show search functionality |
| `NEXT_PUBLIC_ENABLE_EXPORT` | ❌ No | `false` | Feature flag to hide/show export functionality |
| `NEXT_PUBLIC_ENABLE_ADMIN` | ❌ No | `false` | Feature flag to hide/show admin navigation links |

### Frontend Configuration File

Create `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'SIJIL',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '',
  
  // Feature flags
  features: {
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
    export: process.env.NEXT_PUBLIC_ENABLE_EXPORT === 'true',
    admin: process.env.NEXT_PUBLIC_ENABLE_ADMIN === 'true',
  },
  
  // Metadata defaults
  description: 'Document Intelligence & Headless Publishing Engine',
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
  
  // Links
  links: {
    github: 'https://github.com/starly101/sijil',
    docs: '/docs', // Future documentation route
  },
}

export type SiteConfig = typeof siteConfig
```

### API Base Configuration

All API requests MUST use this pattern:

```typescript
// Correct
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g., "http://localhost:3001/api"
fetch(`${apiUrl}/health`);

// INCORRECT - Do not hardcode URLs
fetch('http://localhost:3001/api/health');
```

---

## 6. Architecture Rules

These rules are MANDATORY for all implementation work in Phase 1 and beyond.

### 6.1 Component Architecture

#### Server Components by Default

```typescript
// ✅ CORRECT - Server Component (default)
async function HomePage() {
  const data = await fetchApi('/health');
  return <div>{data.status}</div>;
}

// ✅ CORRECT - Client Component (when interactivity needed)
'use client';

export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

**Rule:** All components are Server Components unless they require:
- `useState` or `useReducer`
- `useEffect` or other lifecycle hooks
- Event handlers (`onClick`, `onChange`, etc.)
- Browser-only APIs (`window`, `localStorage`, etc.)

#### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `StatCard`, `ErrorBoundary` |
| Files | kebab-case | `stat-card.tsx`, `error-boundary.tsx` |
| Hooks | camelCase with `use` prefix | `usePlatformStats`, `useApi` |
| Utilities | camelCase | `formatDate`, `cn` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS`, `DEFAULT_PAGE_SIZE` |
| Types/Interfaces | PascalCase | `ApiResponse`, `PlatformStats` |

#### Import Organization

Imports must follow this order:

```typescript
// 1. React and Next.js
import React from 'react';
import { Suspense } from 'react';
import type { Metadata } from 'next';

// 2. Third-party libraries
import { QueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';

// 3. Internal absolute imports (@/)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

// 4. Relative imports
import { StatCard } from './stat-card';
import type { PlatformStats } from '../types/models';

// 5. Side-effect imports (rare)
import '@/app/globals.css';
```

### 6.2 State Boundaries

#### Server State (React Query)

```typescript
// ✅ CORRECT - Server state managed by React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['platform-stats'],
  queryFn: () => fetchApi('/utility/platform-stats'),
});

// ❌ INCORRECT - Don't store server state in useState
const [stats, setStats] = useState<PlatformStats | null>(null);
useEffect(() => {
  fetchApi('/utility/platform-stats').then(setStats);
}, []);
```

#### Client State (Zustand or useState)

```typescript
// ✅ CORRECT - Local UI state with useState
const [isOpen, setIsOpen] = useState(false);

// ✅ CORRECT - Global UI state with Zustand (theme, preferences)
const { theme, setTheme } = useThemeStore();

// ❌ INCORRECT - Don't use Zustand for server state
const stats = useStore((state) => state.platformStats); // Wrong!
```

### 6.3 Error Handling

#### Global Error Boundary

```typescript
// ✅ CORRECT - Wrap routes with error boundary
<ErrorBoundary fallback={<GenericError />}>
  <HomePage />
</ErrorBoundary>

// ✅ CORRECT - Handle errors at component level
const { error } = useQuery({
  queryKey: ['stats'],
  queryFn: fetchStats,
});

if (error) return <ErrorDisplay error={error} retry={refetch} />;
```

#### Error Response Format

All API errors follow this shape:

```typescript
interface ApiError {
  success: false;
  error: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

**Rule:** Always check for both `error` and `errors` fields in error responses.

### 6.4 Loading States

#### Skeleton Pattern

```typescript
// ✅ CORRECT - Use skeletons matching content shape
{isLoading ? (
  <Card className="p-6">
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-1/2" />
  </Card>
) : (
  <StatCard data={data} />
)}

// ❌ INCORRECT - Don't use generic spinners for content
{isLoading && <Spinner />}
{data && <StatCard data={data} />}
```

#### Suspense Boundaries

```typescript
// ✅ CORRECT - Wrap async components with Suspense
<Suspense fallback={<Skeleton className="h-96 w-full" />}>
  <StatsSection />
</Suspense>
```

### 6.5 Accessibility

#### Semantic HTML

```typescript
// ✅ CORRECT - Use semantic elements
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ INCORRECT - Don't use divs for everything
<div onClick={() => navigate('/')}>Home</div>
```

#### ARIA Labels

```typescript
// ✅ CORRECT - Provide ARIA labels for icon-only buttons
<Button aria-label="Close menu">
  <XIcon />
</Button>

// ✅ CORRECT - Describe complex widgets
<div role="region" aria-labelledby="stats-heading">
  <h2 id="stats-heading">Platform Statistics</h2>
  {/* stats content */}
</div>
```

#### Keyboard Navigation

**Rule:** All interactive elements must be keyboard-accessible:
- Focusable with Tab key
- Activatable with Enter/Space keys
- Visible focus indicators (do not remove `:focus` styles)

### 6.6 Responsive Design

#### Breakpoint System

Tailwind CSS default breakpoints:

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

#### Mobile-First Approach

```typescript
// ✅ CORRECT - Start with mobile, add breakpoints for larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards stack on mobile, grid on desktop */}
</div>

// ❌ INCORRECT - Don't start with desktop and override for mobile
<div className="grid grid-cols-4 md:grid-cols-1">
  {/* Harder to maintain */}
</div>
```

### 6.7 Design Tokens

#### Color Palette

Use shadcn/ui theming system. Do not hardcode colors:

```typescript
// ✅ CORRECT - Use Tailwind color tokens
<div className="bg-background text-foreground">
  <Card className="border-border">
    <Button variant="primary">Click me</Button>
  </Card>
</div>

// ❌ INCORRECT - Don't hardcode hex values
<div className="bg-white text-gray-900 border-gray-200">
  <Button className="bg-blue-500">Click me</Button>
</div>
```

#### Spacing Scale

Use Tailwind's spacing scale (multiples of 0.25rem):

```typescript
// ✅ CORRECT - Use Tailwind spacing tokens
<div className="p-4 md:p-6 lg:p-8 gap-4">
  <h1 className="mb-2 text-lg">Title</h1>
  <p className="text-sm">Content</p>
</div>

// ❌ INCORRECT - Don't use arbitrary values
<div className="p-[17px] gap-[11px]">
  <h1 className="mb-[9px]">Title</h1>
</div>
```

#### Typography Scale

```typescript
// Heading hierarchy
<h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
<h2 className="text-3xl font-semibold">Section</h2>
<h3 className="text-2xl font-medium">Subsection</h3>
<h4 className="text-xl">Group</h4>

// Body text
<p className="text-base leading-relaxed">Paragraph</p>
<small className="text-sm text-muted-foreground">Caption</small>
```

### 6.8 Prohibited Patterns

#### No Hardcoded URLs

```typescript
// ❌ NEVER DO THIS
fetch('http://localhost:3001/api/health');
axios.get('https://api.sijil.com/documents');

// ✅ ALWAYS DO THIS
fetch(`${siteConfig.apiBaseUrl}/health`);
```

#### No Mocked Backend

```typescript
// ❌ NEVER commit mocked data
const mockData = { status: 'ok', mongo: 'connected' };
return <div>{mockData.status}</div>;

// ✅ ALWAYS fetch from real backend
const { data } = useQuery({ queryKey: ['health'], queryFn: fetchHealth });
```

#### No Fake Data

```typescript
// ❌ NEVER hardcode fake statistics
const stats = { documents: 100, topics: 500, formulas: 1200 };

// ✅ ALWAYS fetch from API
const { data: stats } = usePlatformStats();
```

#### No `any` Types

```typescript
// ❌ NEVER use any
function process(data: any) { ... }

// ✅ ALWAYS define proper types
interface ProcessInput {
  id: string;
  value: number;
}
function process(data: ProcessInput) { ... }

// ✅ Or use unknown with type guard
function process(data: unknown) {
  if (isValidInput(data)) {
    // data is now typed
  }
}
```

#### No Direct DOM Manipulation

```typescript
// ❌ NEVER manipulate DOM directly
document.querySelector('.button')?.classList.add('active');

// ✅ ALWAYS use React patterns
const [isActive, setIsActive] = useState(false);
<button className={cn('button', isActive && 'active')} />
```

---

## 7. Project Structure

Detailed description of every directory and file created in Phase 1.

### `src/app/` - App Router Pages

| File | Purpose | Type |
|------|---------|------|
| `layout.tsx` | Root layout wrapping all pages. Includes providers and metadata | Server Component |
| `page.tsx` | Homepage (`/` route). Displays platform stats and hero section | Server Component |
| `not-found.tsx` | 404 page for unmatched routes. Attempts slug resolution | Server Component |
| `globals.css` | Global CSS with Tailwind directives and custom properties | CSS |
| `providers.tsx` | Client-side context providers (React Query, Theme) | Client Component |

### `src/components/` - React Components

#### `components/ui/` - shadcn/ui Base Components

Managed by shadcn/ui CLI. Initial components for Phase 1:

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | Interactive buttons with variants |
| Card | `card.tsx` | Container with header, content, footer |
| Skeleton | `skeleton.tsx` | Loading placeholder |
| Badge | `badge.tsx` | Small status indicators |
| Separator | `separator.tsx` | Visual divider |

Add more components via CLI as needed:
```bash
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add dropdown-menu
```

#### `components/layout/` - Layout Components

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| MainLayout | `main-layout.tsx` | Standard page wrapper with Header and Footer | `children: ReactNode` |
| Header | `header.tsx` | Global header with logo and navigation | `className?: string` |
| Footer | `footer.tsx` | Global footer with links and copyright | `className?: string` |

#### `components/shared/` - Shared Components

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| ErrorBoundary | `error-boundary.tsx` | Catches and displays errors | `fallback: ReactNode`, `children: ReactNode` |
| LoadingSkeleton | `loading-skeleton.tsx` | Generic skeleton loader | `className?: string` |
| StatCard | `stat-card.tsx` | Display single statistic | `label: string`, `value: number | string`, `icon?: LucideIcon` |

### `src/lib/` - Utility Libraries

#### `lib/api/` - API Layer

| File | Purpose |
|------|---------|
| `client.ts` | HTTP client wrapper with error handling |
| `endpoints.ts` | Centralized endpoint definitions |
| `types.ts` | API response type definitions |

#### `lib/utils.ts` - Utility Functions

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}
```

#### `lib/constants.ts` - Application Constants

```typescript
export const API_ENDPOINTS = {
  HEALTH: '/health',
  PLATFORM_STATS: '/utility/platform-stats',
  RECENT_ARRIVALS: '/utility/recent-arrivals',
  POPULAR_TOPICS: '/utility/popular-topics',
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Documents', href: '/documents' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Search', href: '/search' },
] as const;

export const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;
```

### `src/hooks/` - Custom React Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useApi` | Generic API hook with error handling | `{ data, isLoading, error, refetch }` |
| `usePlatformStats` | Fetch platform statistics | `{ stats, isLoading, error }` |

### `src/types/` - TypeScript Definitions

| File | Purpose |
|------|---------|
| `api.ts` | API request/response types |
| `models.ts` | Data model interfaces |
| `common.ts` | Shared/utility types |

### `src/config/` - Configuration Objects

| File | Purpose |
|------|---------|
| `site.ts` | Site metadata and feature flags |
| `navigation.ts` | Navigation menu configuration |

---

## 8. Shared Infrastructure

Everything implemented in this phase that supports future phases.

### 8.1 API Client

**File:** `src/lib/api/client.ts`

```typescript
import { siteConfig } from '@/config/site';
import type { ApiResponse, ApiError } from './types';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || siteConfig.apiBaseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `HTTP ${response.status}`,
        response.status,
        errorData.errors
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params 
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return this.request<T>(`${endpoint}${queryString}`);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Singleton instance
export const apiClient = new ApiClient();
```

### 8.2 HTTP Wrapper

**File:** `src/lib/api/endpoints.ts`

```typescript
import { apiClient } from './client';
import type { 
  HealthResponse, 
  PlatformStatsResponse,
  RecentArrivalsResponse,
  PopularTopicsResponse 
} from './types';

export const endpoints = {
  // Health
  health: () => apiClient.get<HealthResponse>('/health'),
  
  // Utility
  platformStats: () => 
    apiClient.get<PlatformStatsResponse>('/utility/platform-stats'),
  recentArrivals: (limit = 10) =>
    apiClient.get<RecentArrivalsResponse>('/utility/recent-arrivals', { limit: String(limit) }),
  popularTopics: (limit = 10) =>
    apiClient.get<PopularTopicsResponse>('/utility/popular-topics', { limit: String(limit) }),
};
```

### 8.3 Providers

**File:** `src/app/providers.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 8.4 React Query Configuration

Default query options (set in providers):

| Option | Value | Rationale |
|--------|-------|-----------|
| `staleTime` | 60000ms (1 min) | Content doesn't change frequently |
| `retry` | 1 | Retry once on failure |
| `refetchOnWindowFocus` | false | Prevent unnecessary refetches |

### 8.5 Error Boundary

**File:** `src/components/shared/error-boundary.tsx`

```typescript
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="my-8">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={this.handleRetry}>Try again</Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
```

### 8.6 Loading Boundary

**File:** `src/components/shared/loading-skeleton.tsx`

```typescript
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'image';
}

export function LoadingSkeleton({
  className,
  lines = 3,
  variant = 'text',
}: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn('space-y-4 p-4', className)}>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    );
  }

  if (variant === 'image') {
    return <Skeleton className={cn('aspect-video w-full', className)} />;
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 w-full',
            i === lines - 1 && 'w-2/3'
          )}
        />
      ))}
    </div>
  );
}
```

### 8.7 Theme Configuration

**File:** `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 8.8 Fonts

**File:** `src/app/layout.tsx`

```typescript
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

### 8.9 Icons

**File:** `src/components/icons/lucide-icons.ts`

```typescript
// Re-export commonly used Lucide icons
export {
  BookOpen,
  Search,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Home,
  Settings,
  Moon,
  Sun,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  BarChart3,
  FileText,
  Layers,
  Sigma,
} from 'lucide-react';
```

### 8.10 Layout Shell

**File:** `src/components/layout/main-layout.tsx`

```typescript
import { Header } from './header';
import { Footer } from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**File:** `src/components/layout/header.tsx`

```typescript
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/documents" 
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Documents
          </Link>
          <Link 
            href="/subjects" 
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Subjects
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {/* Search bar placeholder - implemented in Phase 2 */}
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
```

**File:** `src/components/layout/footer.tsx`

```typescript
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Link
            href="https://github.com/starly101/sijil"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            SIJIL Team
          </Link>
          . Document Intelligence & Headless Publishing Engine.
        </p>
      </div>
    </footer>
  );
}
```

---

## 9. Backend Integration

### Endpoints Connected in Phase 1

| Endpoint | Method | Purpose | Usage Location |
|----------|--------|---------|----------------|
| `/api/health` | GET | Verify backend connectivity | Development testing, health check widget (optional) |
| `/api/utility/platform-stats` | GET | Display platform statistics | Homepage stats section |
| `/api/utility/recent-arrivals` | GET | Show recently added content | Homepage recent arrivals carousel |
| `/api/utility/popular-topics` | GET | Display trending topics | Homepage popular topics widget |
| `/api/subjects` | GET | Populate subject navigation | Header dropdown (future), homepage subject cards |

### Why These Endpoints

1. **Health Check** - Confirms backend is running and reachable. Critical for debugging deployment issues.

2. **Platform Stats** - Provides social proof and platform overview on homepage. Shows scale of content available.

3. **Recent Arrivals** - Demonstrates active content pipeline. Gives users entry point to newest materials.

4. **Popular Topics** - Highlights high-value content. Helps users discover frequently accessed topics.

5. **Subjects** - Enables subject-based navigation. Foundation for subject browse pages in Phase 2.

### API Integration Pattern

```typescript
// Custom hook pattern for all API calls
export function usePlatformStats() {
  return useQuery({
    queryKey: ['platform-stats'],
    queryFn: () => endpoints.platformStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Usage in component
function StatsSection() {
  const { data: stats, isLoading, error } = usePlatformStats();

  if (isLoading) return <StatsSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Documents" value={stats.total_documents} />
      <StatCard label="Topics" value={stats.total_topics} />
      <StatCard label="Formulas" value={stats.total_formulas} />
      <StatCard label="Assets" value={stats.total_assets} />
    </div>
  );
}
```

---

## 10. Data Models

TypeScript interfaces required for Phase 1. Only models actually used in this phase.

### API Response Types

**File:** `src/lib/api/types.ts`

```typescript
// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// API error response
export interface ApiErrorResponse {
  success: false;
  error: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Health check response
export interface HealthResponse {
  status: 'ok' | 'degraded';
  mongo?: 'connected' | 'disconnected';
  redis?: 'connected' | 'disconnected';
  uptime_seconds?: number;
}

// Platform statistics response
export interface PlatformStatsResponse {
  total_documents: number;
  total_topics: number;
  total_formulas: number;
  total_assets: number;
  total_subjects: number;
  total_grades: number;
}

// Recent arrivals response
export interface RecentArrivalsResponse {
  documents: Array<{
    _id: string;
    title: string;
    subject?: string;
    grade_numeric?: number;
    document_type?: string;
    created_at: string;
  }>;
}

// Popular topics response
export interface PopularTopicsResponse {
  topics: Array<{
    _id: string;
    title: string;
    slug_global: string;
    view_count: number;
    subject?: string;
    grade_numeric?: number;
  }>;
}

// Subjects list response
export interface SubjectsResponse {
  subjects: string[];
}

// Grades list response
export interface GradesResponse {
  grades: number[];
}
```

### Data Model Interfaces

**File:** `src/types/models.ts`

```typescript
// Simplified Document model (for display purposes)
export interface Document {
  _id: string;
  title: string;
  subject?: string;
  grade_numeric?: number;
  document_type?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

// Simplified Topic model (for display purposes)
export interface Topic {
  _id: string;
  title: string;
  slug_global: string;
  url_path: string;
  subject?: string;
  grade_numeric?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  view_count?: number;
}

// Statistic item for display
export interface StatItem {
  label: string;
  value: number | string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

### Common Types

**File:** `src/types/common.ts`

```typescript
// Pagination metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Loading state type
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Nullable helper
export type Nullable<T> = T | null;
```

---

## 11. Components

Every component created in Phase 1 with purpose, props, and dependencies.

### Layout Components

#### MainLayout

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/layout/main-layout.tsx` |
| **Purpose** | Root wrapper for all standard pages with Header and Footer |
| **Props** | `children: React.ReactNode` |
| **Dependencies** | `Header`, `Footer` |
| **Reusable** | Yes - used by all public pages |
| **Type** | Server Component |

#### Header

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/layout/header.tsx` |
| **Purpose** | Global header with logo, branding, and primary navigation |
| **Props** | `className?: string` |
| **Dependencies** | `Button`, `siteConfig`, Lucide icons |
| **Reusable** | Yes - used in MainLayout |
| **Type** | Server Component |

#### Footer

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/layout/footer.tsx` |
| **Purpose** | Global footer with copyright and attribution links |
| **Props** | `className?: string` |
| **Dependencies** | `siteConfig` |
| **Reusable** | Yes - used in MainLayout |
| **Type** | Server Component |

### Shared Components

#### ErrorBoundary

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/shared/error-boundary.tsx` |
| **Purpose** | Catches React errors and displays fallback UI with retry option |
| **Props** | `children: React.ReactNode`, `fallback?: React.ReactNode` |
| **Dependencies** | `Button`, `Card` |
| **Reusable** | Yes - wrap any component tree |
| **Type** | Client Component (extends Component) |

#### LoadingSkeleton

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/shared/loading-skeleton.tsx` |
| **Purpose** | Generic skeleton loader with variants for different content shapes |
| **Props** | `className?: string`, `lines?: number`, `variant?: 'text' \| 'card' \| 'image'` |
| **Dependencies** | `Skeleton`, `cn` utility |
| **Reusable** | Yes - use throughout app |
| **Type** | Server Component |

#### StatCard

| Attribute | Value |
|-----------|-------|
| **File** | `src/components/shared/stat-card.tsx` |
| **Purpose** | Display single statistic with label, value, and optional icon |
| **Props** | `label: string`, `value: number \| string`, `icon?: LucideIcon`, `trend?: { value: number, direction: 'up' \| 'down' }` |
| **Dependencies** | `Card`, `cn` utility, Lucide icons |
| **Reusable** | Yes - homepage, dashboards |
| **Type** | Server Component |

### UI Components (shadcn/ui)

Installed via CLI. Key components for Phase 1:

| Component | File | Purpose |
|-----------|------|---------|
| Button | `components/ui/button.tsx` | Interactive buttons with variants (default, secondary, ghost, outline) |
| Card | `components/ui/card.tsx` | Container with header, content, footer slots |
| Skeleton | `components/ui/skeleton.tsx` | Animated loading placeholder |
| Badge | `components/ui/badge.tsx` | Small status indicators |
| Separator | `components/ui/separator.tsx` | Visual divider line |

---

## 12. Routes

Routes created in Phase 1 with layouts and metadata.

### Route: `/` (Homepage)

| Attribute | Value |
|-----------|-------|
| **File** | `src/app/page.tsx` |
| **Layout** | MainLayout |
| **Type** | Server Component |
| **Data Requirements** | Platform stats, recent arrivals, popular topics |
| **APIs Called** | `/api/utility/platform-stats`, `/api/utility/recent-arrivals`, `/api/utility/popular-topics` |

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'SIJIL - Document Intelligence & Headless Publishing Engine',
  description: 'Browse educational documents, topics, and formulas. Access textbooks, courses, and SOPs with AI-powered content intelligence.',
  keywords: ['education', 'documents', 'textbooks', 'formulas', 'learning'],
  authors: [{ name: 'SIJIL Team' }],
  openGraph: {
    title: 'SIJIL - Document Intelligence Platform',
    description: 'Educational content platform with AI-powered document intelligence',
    type: 'website',
    locale: 'en_US',
  },
};
```

### Route: `/not-found` (404 Page)

| Attribute | Value |
|-----------|-------|
| **File** | `src/app/not-found.tsx` |
| **Layout** | MainLayout |
| **Type** | Server Component |
| **Data Requirements** | None (static) |
| **Future Enhancement** | Attempt slug resolution via `/api/utility/slug/resolve` |

**Metadata:**

```typescript
export const metadata: Metadata = {
  title: 'Page Not Found - SIJIL',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};
```

### Root Layout

| Attribute | Value |
|-----------|-------|
| **File** | `src/app/layout.tsx` |
| **Wraps** | All routes |
| **Providers** | React Query, Theme |
| **Fonts** | Inter (Google Fonts) |

**Structure:**

```typescript
<html lang="en" suppressHydrationWarning>
  <head />
  <body className={inter.className}>
    <Providers>
      <MainLayout>
        {children}
      </MainLayout>
    </Providers>
  </body>
</html>
```

---

## 13. Acceptance Criteria

Detailed checklist for Phase 1 completion verification.

### Build & Deployment

- [ ] `npm run build` completes without errors
- [ ] `npm run lint` reports zero errors
- [ ] `npm run type-check` (tsc --noEmit) passes
- [ ] Application deploys to staging environment
- [ ] Staging URL is accessible and returns 200 OK
- [ ] Environment variables are correctly configured in staging

### Homepage

- [ ] Homepage loads within 2 seconds on fast 3G
- [ ] Platform statistics display correct values from backend
- [ ] Stat cards show appropriate labels and formatted numbers
- [ ] Recent arrivals section displays up to 10 items
- [ ] Popular topics section displays up to 10 items
- [ ] All links in Header are clickable and navigate correctly
- [ ] Footer displays copyright text and attribution link

### Navigation

- [ ] Header logo links to homepage
- [ ] Navigation links (Documents, Subjects) are visible
- [ ] Clicking navigation links changes URL correctly
- [ ] Active route is visually indicated (if implemented)
- [ ] Mobile menu hamburger button appears below 768px breakpoint

### Error Handling

- [ ] Backend connection failure shows user-friendly error message
- [ ] Error boundary catches component errors and displays fallback
- [ ] Retry button in error state triggers refetch
- [ ] Console logs error details for debugging

### Loading States

- [ ] Skeleton loaders appear while data fetches
- [ ] Skeleton dimensions match final content shape
- [ ] No layout shift when content loads (CLS < 0.1)
- [ ] Loading state persists no longer than 3 seconds on healthy backend

### Accessibility

- [ ] All interactive elements are keyboard-focusable
- [ ] Focus indicators are visible on all interactive elements
- [ ] All images have alt text (or are decorative with empty alt)
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] Color contrast ratio meets WCAG AA (4.5:1 for text)
- [ ] Screen reader announces page title on load

### Performance

- [ ] Lighthouse Performance score ≥ 90
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Interaction to Next Paint (INP) < 200 milliseconds
- [ ] Total JavaScript bundle size < 200 KB (gzipped)
- [ ] Time to First Byte (TTFB) < 600 milliseconds

### Responsive Design

- [ ] Homepage is usable on 320px width (small phone)
- [ ] Stat cards stack vertically on mobile
- [ ] Grid layout activates at 768px (tablet)
- [ ] Four-column layout activates at 1024px (desktop)
- [ ] No horizontal scrolling at any breakpoint

### Code Quality

- [ ] No TypeScript `any` types in committed code
- [ ] All components have explicit return types
- [ ] ESLint rules pass with zero warnings
- [ ] Prettier formatting applied to all files
- [ ] No hardcoded URLs (all use environment variables)
- [ ] No mocked or fake data in components

### Documentation

- [ ] README.md includes setup instructions
- [ ] README.md lists all environment variables
- [ ] README.md documents how to run development server
- [ ] Code comments explain non-obvious logic
- [ ] Component props are documented with JSDoc (if complex)

---

## 14. Manual Verification

Exact manual tests to perform before marking Phase 1 complete.

### Test 1: Fresh Install

1. Clone repository to new directory
2. Run `npm install`
3. Copy `.env.example` to `.env.local`
4. Update `NEXT_PUBLIC_API_URL` to point to running backend
5. Run `npm run dev`
6. Navigate to `http://localhost:3000`
7. **Expected:** Homepage loads with stats from backend

### Test 2: Backend Disconnection

1. Stop backend server
2. Refresh homepage
3. **Expected:** Error message displayed, no crash
4. Restart backend server
5. Click "Try again" button
6. **Expected:** Content loads successfully

### Test 3: Responsive Behavior

1. Open Chrome DevTools
2. Toggle device toolbar
3. Select "iPhone SE" (375px width)
4. **Expected:** Header collapses, stat cards stack
5. Select "iPad" (768px width)
6. **Expected:** Two-column stat grid
7. Select "Desktop" (1440px width)
8. **Expected:** Four-column stat grid

### Test 4: Keyboard Navigation

1. Press `Tab` repeatedly
2. **Expected:** Focus moves through all interactive elements in logical order
3. Press `Enter` on focused link
4. **Expected:** Navigation occurs
5. Press `Tab` until button is focused
6. Press `Space` or `Enter`
7. **Expected:** Button activates

### Test 5: Error Boundary

1. Manually throw error in a component (temporarily)
2. Refresh page
3. **Expected:** Error boundary catches error, displays fallback UI
4. Click "Try again" button
5. **Expected:** Component re-renders (error may recur if not fixed)
6. Remove error, refresh
7. **Expected:** Normal content displays

### Test 6: Production Build

1. Run `npm run build`
2. Run `npm start`
3. Navigate to homepage
4. **Expected:** All features work identically to dev mode
5. Check browser console
6. **Expected:** No errors or warnings

### Test 7: Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Performance", "Accessibility", "Best Practices", "SEO"
4. Click "Analyze page load"
5. **Expected:** All scores ≥ 90

### Test 8: API Response Changes

1. Modify backend to return different stat values
2. Refresh homepage
3. **Expected:** New values display within 1 minute (staleTime)
4. Force refresh (Ctrl+Shift+R)
5. **Expected:** Latest values display immediately

---

## 15. Common Mistakes

Implementation mistakes to avoid during Phase 1.

### Architecture Mistakes

❌ **Creating feature modules too early**
```typescript
// WRONG - Phase 1 should not have feature folders
src/features/documents/
src/features/topics/
```

✅ **Wait until Phase 2 for feature modules**
```typescript
// CORRECT - Phase 1 uses shared components only
src/components/shared/
src/hooks/
```

---

❌ **Using Client Components unnecessarily**
```typescript
// WRONG - Marking everything as client
'use client';
export function HomePage() { ... }
```

✅ **Default to Server Components**
```typescript
// CORRECT - Only mark as client when needed
export async function HomePage() { ... } // Server

'use client';
export function SearchBar() { ... } // Client (has useState)
```

---

❌ **Hardcoding API URLs**
```typescript
// WRONG
fetch('http://localhost:3001/api/health');
```

✅ **Use environment variables**
```typescript
// CORRECT
fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
```

---

### State Management Mistakes

❌ **Storing server state in useState**
```typescript
// WRONG
const [stats, setStats] = useState(null);
useEffect(() => {
  fetch('/api/stats').then(setStats);
}, []);
```

✅ **Use React Query for server state**
```typescript
// CORRECT
const { data: stats } = useQuery({
  queryKey: ['stats'],
  queryFn: fetchStats,
});
```

---

❌ **Using global state for everything**
```typescript
// WRONG - Zustand for server state
const stats = useStore((state) => state.stats);
```

✅ **Zustand only for client state (theme, UI prefs)**
```typescript
// CORRECT
const { theme, setTheme } = useThemeStore();
```

---

### Styling Mistakes

❌ **Hardcoding colors**
```typescript
// WRONG
<div className="bg-white text-gray-900">
```

✅ **Use Tailwind theme tokens**
```typescript
// CORRECT
<div className="bg-background text-foreground">
```

---

❌ **Arbitrary values**
```typescript
// WRONG
<div className="p-[17px] w-[347px]">
```

✅ **Use Tailwind spacing scale**
```typescript
// CORRECT
<div className="p-4 w-80">
```

---

❌ **Removing focus styles**
```typescript
// WRONG
button:focus {
  outline: none;
}
```

✅ **Enhance focus styles**
```typescript
// CORRECT
button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

### TypeScript Mistakes

❌ **Using `any` type**
```typescript
// WRONG
function processData(data: any) { ... }
```

✅ **Define proper types**
```typescript
// CORRECT
interface ProcessInput {
  id: string;
  value: number;
}
function processData(data: ProcessInput) { ... }
```

---

❌ **Ignoring TypeScript errors**
```typescript
// WRONG
// @ts-ignore
const value = someComplexOperation();
```

✅ **Fix the underlying issue**
```typescript
// CORRECT - Add proper type guards
if (isValidType(value)) {
  // TypeScript now knows the type
}
```

---

### Performance Mistakes

❌ **Fetching data in useEffect**
```typescript
// WRONG
useEffect(() => {
  fetch('/api/data').then(setData);
}, []);
```

✅ **Use React Query**
```typescript
// CORRECT
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
});
```

---

❌ **Not handling loading states**
```typescript
// WRONG
<div>{data.value}</div>
```

✅ **Show skeleton while loading**
```typescript
// CORRECT
{isLoading ? (
  <Skeleton className="h-6 w-24" />
) : (
  <div>{data.value}</div>
)}
```

---

### Accessibility Mistakes

❌ **Icon-only buttons without labels**
```typescript
// WRONG
<Button>
  <SearchIcon />
</Button>
```

✅ **Provide ARIA labels**
```typescript
// CORRECT
<Button aria-label="Search">
  <SearchIcon />
</Button>
```

---

❌ **Using divs for buttons**
```typescript
// WRONG
<div onClick={handleClick}>Click me</div>
```

✅ **Use semantic elements**
```typescript
// CORRECT
<button onClick={handleClick}>Click me</button>
```

---

## 16. Git Commit

Suggested commit message for Phase 1 completion:

```
feat: Phase 1 Foundation - Initial project setup

Implemented:
- Next.js 14+ project with TypeScript and Tailwind CSS 4.x
- shadcn/ui component library integration
- API client layer with error handling
- React Query for server state management
- Root layout with Header and Footer
- Homepage displaying platform statistics
- 404 page with error handling
- Error boundaries and loading skeletons
- Responsive design for mobile/tablet/desktop
- Accessibility features (keyboard nav, ARIA labels)
- Environment configuration
- TypeScript types for API responses

Connected APIs:
- GET /api/health
- GET /api/utility/platform-stats
- GET /api/utility/recent-arrivals
- GET /api/utility/popular-topics

Verified:
- Build succeeds without errors
- Lighthouse scores ≥ 90
- All acceptance criteria met
- Manual tests passed

Phase 1 of 6 complete. Ready for Phase 2 (Document Display).
```

---

## 17. Phase Completion Checklist

Every item that must be completed before Phase 2 begins.

### Infrastructure

- [ ] Next.js project initialized with correct versions
- [ ] TypeScript configured with strict mode
- [ ] Tailwind CSS 4.x installed and configured
- [ ] shadcn/ui initialized with base components
- [ ] ESLint and Prettier configured
- [ ] Environment variables documented in `.env.example`

### API Layer

- [ ] API client implemented with error handling
- [ ] Endpoint definitions centralized
- [ ] TypeScript types for all API responses
- [ ] React Query configured with default options
- [ ] Custom hooks for each endpoint

### Components

- [ ] MainLayout created and functional
- [ ] Header with logo and navigation
- [ ] Footer with copyright
- [ ] ErrorBoundary component
- [ ] LoadingSkeleton component
- [ ] StatCard component
- [ ] shadcn/ui Button, Card, Skeleton, Badge installed

### Pages

- [ ] Homepage (`/`) displays platform stats
- [ ] Homepage displays recent arrivals
- [ ] Homepage displays popular topics
- [ ] 404 page (`not-found.tsx`) implemented
- [ ] Root layout wraps all pages
- [ ] Providers wrap application (React Query)

### Styling

- [ ] Global CSS with Tailwind directives
- [ ] Theme colors configured (light mode)
- [ ] Inter font loaded via next/font
- [ ] Responsive breakpoints working
- [ ] No hardcoded colors or spacing

### Accessibility

- [ ] All interactive elements keyboard-accessible
- [ ] Focus indicators visible
- [ ] ARIA labels on icon buttons
- [ ] Semantic HTML structure
- [ ] Color contrast meets WCAG AA

### Performance

- [ ] Lighthouse Performance ≥ 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Bundle size < 200 KB gzipped

### Code Quality

- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Prettier formatting applied
- [ ] No `any` types
- [ ] No hardcoded URLs
- [ ] No mocked data

### Documentation

- [ ] README.md with setup instructions
- [ ] Environment variables documented
- [ ] Component props documented (JSDoc where needed)
- [ ] This phase document reviewed and finalized

### Deployment

- [ ] Application deployed to staging
- [ ] Staging URL verified
- [ ] Environment variables configured in hosting platform
- [ ] Production build tested locally

### Handoff Preparation

- [ ] Branch created for Phase 2 (`phase-2-document-display`)
- [ ] Phase 1 tagged in git (`v1.0.0-phase-1-complete`)
- [ ] Known issues documented
- [ ] Phase 2 prerequisites confirmed

---

**Phase 1 Sign-Off:**

- Technical Lead: _________________ Date: _______
- Product Owner: _________________ Date: _______
- QA Lead: _________________ Date: _______

**Next Phase:** Phase 2 - Document Display System (F01, F02, F06, F09 basic, F14 partial)

---

*This document is standalone and self-contained. Implementation teams should not need to reference other documentation files to complete Phase 1.*
