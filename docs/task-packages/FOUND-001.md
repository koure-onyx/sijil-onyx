# FOUND-001: Project Foundation & Infrastructure Setup

**Status:** Ready for Implementation  
**Phase:** Phase 1 (Foundation & Infrastructure)  
**Priority:** Critical  
**Created:** 2026-06-27  
**Last Verified:** 2026-06-27  

---

## Objective

Initialize the SIJIL Next.js frontend project with all foundational infrastructure, tooling, and configuration required for subsequent feature development.

---

## Why This Task Exists

This is the first implementation task in the SIJIL frontend build. It establishes:
- The core Next.js 16 project structure
- TypeScript strict mode configuration
- Tailwind CSS 4 styling system
- shadcn/ui component library
- TanStack Query for server state management
- Zustand for client state management
- ESLint and Prettier for code quality
- Environment variable management
- Base API client infrastructure

Without this foundation, no feature development can proceed safely or consistently.

---

## Prerequisites

- Node.js 20.x or later installed
- pnpm package manager installed
- Git configured with GitHub access
- Backend API available at `http://localhost:3000` (for testing)
- Technology baseline document reviewed (`docs/project-management/00-technology-baseline.md`)

---

## Files to Create

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/ (shadcn/ui components - auto-generated)
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── types.ts
│   ├── query-client.ts
│   └── utils.ts
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
├── stores/
│   └── index.ts (placeholder for future stores)
├── hooks/
│   └── index.ts (placeholder for future hooks)
└── styles/
    └── globals.css (if not in app/)

Configuration Files:
├── tsconfig.json
├── tailwind.config.ts (or globals.css for Tailwind 4)
├── .eslintrc.json
├── .prettierrc
├── .env.local.example
├── next.config.ts
├── components.json (shadcn/ui)
└── package.json
```

---

## Files to Modify

None (fresh project initialization)

---

## Latest Documentation References

### Next.js 16.2.9
- **Docs:** https://nextjs.org/docs
- **App Router:** https://nextjs.org/docs/app
- **Key Changes:** Turbopack stable, Server Actions stable, React 19 required
- **Setup Command:** `npx create-next-app@latest sijil --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`

### React 19.2.7
- **Docs:** https://react.dev
- **Key Changes:** Automatic JSX transform, StrictMode improvements, useSyncExternalStore required for external stores

### TypeScript 6.0.3
- **Docs:** https://www.typescriptlang.org/docs/
- **Config:** Strict mode, `moduleResolution: "bundler"`, `target: "ES2025"`

### Tailwind CSS 4.3.1
- **Docs:** https://tailwindcss.com/docs
- **Key Changes:** CSS-first configuration, Oxide engine, `@import "tailwindcss"` instead of `@tailwind` directives

### TanStack Query 5.101.1
- **Docs:** https://tanstack.com/query/latest
- **Key Changes:** Array query keys required, `gcTime` renamed from `cacheTime`, improved TypeScript

### Zustand 5.0.14
- **Docs:** https://zustand.docs.pmnd.rs
- **Key Changes:** React 18+ required, improved TypeScript inference, persist middleware updates

### shadcn/ui
- **Docs:** https://ui.shadcn.com
- **Setup:** `npx shadcn@latest init`
- **Note:** Components are copied to project, not installed as npm package

---

## Exact Implementation Steps

### Step 1: Initialize Next.js Project

```bash
cd /workspace/sijil
npx create-next-app@latest sijil-frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

**Expected Output:**
- Next.js 16.x installed
- TypeScript configured
- Tailwind CSS 4 configured
- ESLint configured
- `src/app` directory structure created

**Verification:**
```bash
cd sijil-frontend
pnpm dev
# Should start without errors on http://localhost:3001
```

### Step 2: Install Core Dependencies

```bash
cd sijil-frontend

# TanStack Query
pnpm add @tanstack/react-query @tanstack/react-query-devtools

# Zustand
pnpm add zustand

# React Hook Form + Zod
pnpm add react-hook-form @hookform/resolvers zod

# shadcn/ui dependencies
pnpm add class-variance-authority clsx tailwind-merge lucide-react

# Additional utilities
pnpm add axios
```

### Step 3: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

**Configuration:**
- Style: `default`
- RSC: `Yes`
- TSX: `Yes`
- Tailwind config: Uses CSS variables (Tailwind 4)
- Base color: `slate`
- CSS variables: `Yes`

**Install base components:**
```bash
npx shadcn@latest add button card input label form dialog alert skeleton dropdown-menu
```

### Step 4: Configure TypeScript (`tsconfig.json`)

Ensure the following configuration:

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

### Step 5: Configure Tailwind CSS 4 (`src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
  
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(222.2 84% 4.9%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(222.2 84% 4.9%);
  --color-popover: hsl(0 0% 100%);
  --color-popover-foreground: hsl(222.2 84% 4.9%);
  --color-primary: hsl(222.2 47.4% 11.2%);
  --color-primary-foreground: hsl(210 40% 98%);
  --color-secondary: hsl(210 40% 96.1%);
  --color-secondary-foreground: hsl(222.2 47.4% 11.2%);
  --color-muted: hsl(210 40% 96.1%);
  --color-muted-foreground: hsl(215.4 16.3% 46.9%);
  --color-accent: hsl(210 40% 96.1%);
  --color-accent-foreground: hsl(222.2 47.4% 11.2%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-destructive-foreground: hsl(210 40% 98%);
  --color-border: hsl(214.3 31.8% 91.4%);
  --color-input: hsl(214.3 31.8% 91.4%);
  --color-ring: hsl(222.2 84% 4.9%);
  
  --radius-lg: 0.5rem;
  --radius-md: calc(var(--radius-lg) - 2px);
  --radius-sm: calc(var(--radius-lg) - 4px);
}

.dark {
  --color-background: hsl(222.2 84% 4.9%);
  --color-foreground: hsl(210 40% 98%);
  --color-card: hsl(222.2 84% 4.9%);
  --color-card-foreground: hsl(210 40% 98%);
  --color-popover: hsl(222.2 84% 4.9%);
  --color-popover-foreground: hsl(210 40% 98%);
  --color-primary: hsl(210 40% 98%);
  --color-primary-foreground: hsl(222.2 47.4% 11.2%);
  --color-secondary: hsl(217.2 32.6% 17.5%);
  --color-secondary-foreground: hsl(210 40% 98%);
  --color-muted: hsl(217.2 32.6% 17.5%);
  --color-muted-foreground: hsl(215 20.2% 65.1%);
  --color-accent: hsl(217.2 32.6% 17.5%);
  --color-accent-foreground: hsl(210 40% 98%);
  --color-destructive: hsl(0 62.8% 30.6%);
  --color-destructive-foreground: hsl(210 40% 98%);
  --color-border: hsl(217.2 32.6% 17.5%);
  --color-input: hsl(217.2 32.6% 17.5%);
  --color-ring: hsl(212.7 26.8% 83.9%);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### Step 6: Create Query Client (`src/lib/query-client.ts`)

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
    mutations: {
      retry: false,
      throwOnError: false,
    },
  },
})
```

### Step 7: Create Query Provider (`src/providers/query-provider.tsx`)

```typescript
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(queryClient)
  
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### Step 8: Create Theme Provider (`src/providers/theme-provider.tsx`)

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'sijil-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  
  return context
}
```

### Step 9: Update Root Layout (`src/app/layout.tsx`)

```typescript
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "SIJIL - Islamic Educational Content Platform",
  description: "Access comprehensive Islamic educational content including documents, topics, Quran, and more.",
  keywords: ["Islamic education", "Quran", "topics", "documents", "learning"],
  authors: [{ name: "SIJIL Team" }],
  creator: "SIJIL",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sijil.app",
    siteName: "SIJIL",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="sijil-theme">
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 10: Create Homepage Placeholder (`src/app/page.tsx`)

```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">SIJIL</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Islamic Educational Content Platform
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Foundation setup complete. Feature development ready.
        </p>
      </div>
    </main>
  )
}
```

### Step 11: Create Base API Client (`src/lib/api/client.ts`)

```typescript
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    // TODO: Integrate with auth store when implemented
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // TODO: Redirect to login or refresh token
      console.error('Unauthorized request')
    }
    
    if (error.response?.status === 404) {
      console.error('Resource not found')
    }
    
    if (error.response?.status === 500) {
      console.error('Server error')
    }
    
    return Promise.reject(error)
  }
)

// Retry logic for failed requests
const retryRequest = async (
  config: InternalAxiosRequestConfig,
  maxRetries = 3
): Promise<any> => {
  let retries = 0
  
  while (retries < maxRetries) {
    try {
      return await apiClient.request(config)
    } catch (error) {
      retries++
      if (retries === maxRetries) {
        throw error
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, retries) * 1000)
      )
    }
  }
}

export { apiClient, retryRequest }
export default apiClient
```

### Step 12: Create API Types (`src/lib/api/types.ts`)

```typescript
// Shared API response types

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, string[]>
}

// Document types
export interface Document {
  _id: string
  title: string
  slug: string
  subject: string
  grade: string
  type: 'chapter' | 'lesson' | 'worksheet' | 'exam'
  chapters?: Chapter[]
  createdAt: string
  updatedAt: string
}

export interface Chapter {
  _id: string
  title: string
  number: number
  lessons?: Lesson[]
}

export interface Lesson {
  _id: string
  title: string
  number: number
  content?: any
}

// Topic types
export interface Topic {
  _id: string
  title: string
  slug: string
  subject: string
  grade: string
  blocks: TopicBlock[]
  tableOfContents?: TableOfContentsItem[]
  prevTopic?: Pick<Topic, '_id' | 'title' | 'slug'>
  nextTopic?: Pick<Topic, '_id' | 'title' | 'slug'>
  createdAt: string
  updatedAt: string
}

export interface TopicBlock {
  _id: string
  type: BlockType
  content: any
}

export type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'quote'
  | 'code'
  | 'equation'
  | 'image'
  | 'table'
  | 'mcq'
  | 'callout'
  | 'definition'
  | 'example'
  | 'exercise'
  | 'summary'
  | 'warning'
  | 'tip'
  | 'reference'

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

// Search types
export interface SearchResult {
  type: 'topic' | 'document' | 'quran'
  id: string
  title: string
  excerpt?: string
  score?: number
}

export interface SearchFilters {
  subject?: string
  grade?: string
  type?: string
  query?: string
}

// Quran types
export interface Surah {
  _id: string
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

export interface Ayah {
  _id: string
  number: number
  surahNumber: number
  ayahNumber: number
  arabicText: string
  translation?: string
}

// Export types
export interface ExportJob {
  _id: string
  type: 'pdf' | 'docx' | 'html'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  resourceType: 'topic' | 'document'
  resourceId: string
  downloadUrl?: string
  error?: string
  createdAt: string
  completedAt?: string
}

// Admin types
export interface IngestionJob {
  _id: string
  type: 'document' | 'topic' | 'batch'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  data: any
  result?: any
  error?: string
  createdAt: string
  completedAt?: string
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  database: boolean
  redis: boolean
  bullmq: boolean
  atlasSearch: boolean
  uptime: number
  timestamp: string
}
```

### Step 13: Create Utility Functions (`src/lib/utils.ts`)

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
```

### Step 14: Create Placeholder Stores (`src/stores/index.ts`)

```typescript
// Store registry - individual stores will be added in subsequent tasks

// Export all stores from this file once implemented
export {}
```

### Step 15: Create Placeholder Hooks (`src/hooks/index.ts`)

```typescript
// Custom hooks registry - hooks will be added in subsequent tasks

// Export all custom hooks from this file once implemented
export {}
```

### Step 16: Configure Environment Variables (`.env.local.example`)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_SEARCH=true
NEXT_PUBLIC_ENABLE_EXPORTS=true
NEXT_PUBLIC_ENABLE_ADMIN=true

# Analytics (optional)
# NEXT_PUBLIC_ANALYTICS_ID=

# Error Tracking (optional)
# NEXT_PUBLIC_SENTRY_DSN=
```

### Step 17: Configure ESLint (`.eslintrc.json`)

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Step 18: Configure Prettier (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Step 19: Update Next.js Config (`next.config.ts`)

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Enable if needed for specific features
  },
}

export default nextConfig
```

### Step 20: Copy Project to Main Directory

Since we're initializing in `/workspace/sijil`, move contents appropriately:

```bash
# If created in sijil-frontend subdirectory
mv sijil-frontend/* .
mv sijil-frontend/.* . 2>/dev/null || true
rmdir sijil-frontend
```

---

## Testing Requirements

### Unit Tests
- [ ] Verify query client configuration
- [ ] Verify API client interceptors
- [ ] Verify utility functions

### Integration Tests
- [ ] Verify homepage renders
- [ ] Verify providers wrap application
- [ ] Verify API client can make requests

### Manual Verification
- [ ] `pnpm dev` starts without errors
- [ ] Homepage displays at http://localhost:3001
- [ ] No console errors in browser
- [ ] TanStack Query DevTools accessible (bottom-right icon)
- [ ] Theme switching works (if implemented)

---

## Acceptance Criteria

**ALL must pass:**

1. ✅ Build passes: `pnpm build` completes without errors
2. ✅ Lint passes: `pnpm lint` shows no errors (warnings acceptable)
3. ✅ Typecheck passes: `pnpm typecheck` (or `tsc --noEmit`) shows no errors
4. ✅ Dev server starts: `pnpm dev` runs without crashing
5. ✅ Homepage renders: Basic SIJIL landing page visible
6. ✅ Providers configured: Query and Theme providers active
7. ✅ API client functional: Can make test requests to backend
8. ✅ shadcn/ui installed: Base components available
9. ✅ Tailwind working: Utility classes apply correctly
10. ✅ TypeScript strict: No `any` types, strict mode enforced

---

## Rollback Criteria

If any of the following occur, rollback immediately:

1. **Build fails repeatedly:** Revert to previous commit and investigate dependency conflicts
2. **Critical TypeScript errors:** More than 5 type errors that block development
3. **Dev server unstable:** Crashes more than 3 times in 5 minutes
4. **Dependency conflicts:** Peer dependency warnings that cannot be resolved
5. **Blueprint misalignment:** Implementation deviates significantly from documented architecture

### Rollback Procedure

```bash
# If changes committed but not pushed
git reset --hard HEAD~1

# If changes pushed
git revert <commit-hash>
git push origin main

# Clean reinstall if needed
rm -rf node_modules .next
pnpm install
```

---

## Blueprint Alignment Notes

This implementation follows **Phase 1: Foundation & Infrastructure** from `docs/frontend-blueprint/14-implementation-phases.md`:

- ✅ Next.js 16 project initialized
- ✅ TypeScript configured (strict mode)
- ✅ Tailwind 4 + shadcn/ui installed
- ✅ ESLint + Prettier configured
- ✅ Environment variables set up
- ✅ Root layout with providers
- ✅ Base HTTP client created
- ✅ TanStack Query setup
- ✅ shadcn/ui components installed (base set)

**Deviations from Blueprint:** None

**Updates based on latest docs:**
- Tailwind CSS 4 uses CSS-first configuration (not `tailwind.config.js`)
- TanStack Query uses `gcTime` instead of deprecated `cacheTime`
- Next.js 16 uses Turbopack by default
- React 19 compatibility ensured throughout

---

## Next Tasks

Upon completion of FOUND-001, proceed to:

1. **FOUND-002:** API Layer Implementation (Phase 2)
   - Implement all `*.api.ts` files
   - Define query keys
   - Create Zustand stores

2. **FOUND-003:** Rendering Engine (Phase 3)
   - Implement BlockRenderer
   - Create all 17 block renderers

---

## Related Documents

- `docs/project-management/00-technology-baseline.md` - Technology versions and patterns
- `docs/frontend-blueprint/14-implementation-phases.md` - Phase 1 requirements
- `docs/frontend-blueprint/01-system-architecture.md` - Overall architecture
- `docs/frontend-blueprint/13-folder-structure.md` - File organization
- `docs/frontend-implementation/01-architecture-laws.md` - Architecture constraints

---

## Task Completion Checklist

Before marking this task complete, verify:

- [ ] All 20 implementation steps completed
- [ ] All acceptance criteria met
- [ ] Build passes
- [ ] Lint passes
- [ ] Typecheck passes
- [ ] Dev server runs
- [ ] No console errors
- [ ] Documentation references verified
- [ ] Blueprint alignment confirmed
- [ ] Code committed and pushed

---

**Task Owner:** SIJIL Builder  
**Reviewer:** SIJIL Technical Architect  
**Estimated Duration:** 2-3 hours  
**Actual Duration:** _To be filled_
