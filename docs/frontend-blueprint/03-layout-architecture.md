# Sijil — Frontend Blueprint: Layout Architecture

**Version:** 1.0  
**Generated:** 2026-06-27  
**Assumptions:** Next.js 16 App Router, TypeScript, Tailwind 4, shadcn/ui

---

## Overview

This document defines all layout components used across the Sijil frontend. Each layout establishes regions, navigation patterns, shared components, and responsibilities for its route group.

---

## RootLayout

**File:** `src/app/layout.tsx`

**Purpose:** Top-level layout wrapping all pages. Provides providers, fonts, and global styles.

### Regions

```
┌─────────────────────────────────────┐
│           RootLayout                │
│  ┌───────────────────────────────┐  │
│  │        Providers              │  │
│  │  - TanStack Query             │  │
│  │  - Zustand                    │  │
│  │  - Theme                      │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │         Fonts                 │  │
│  │  - Inter (main)               │  │
│  │  - Amiri (Arabic for Quran)   │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │      Child Layout + Page      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Responsibilities

- Initialize TanStack Query client with default options
- Provide Zustand stores via context
- Load and configure fonts (Inter, Amiri)
- Set up theme provider (light/dark mode)
- Inject global CSS variables
- Configure metadata defaults

### Implementation

```typescript
// src/app/layout.tsx
import { Inter, Amiri } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({ 
  weight: ['400', '700'], 
  subsets: ['arabic'],
  variable: '--font-arabic'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sijil',
    default: 'Sijil - Document Intelligence & Publishing Engine',
  },
  description: 'Structured educational content powered by AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## PublicLayout

**File:** `src/app/documents/layout.tsx` (shared by documents, subjects, exports)

**Purpose:** Standard public-facing layout with header and footer navigation.

### Regions

```
┌────────────────────────────────────────────┐
│                 Header                     │
│  ┌────┐  ┌──────────┐  ┌──────────────┐   │
│  │Logo│  │Search Bar│  │Nav + Actions │   │
│  └────┘  └──────────┘  └──────────────┘   │
├────────────────────────────────────────────┤
│                                            │
│            Page Content                    │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │                                    │    │
│  │         Main Content Area          │    │
│  │                                    │    │
│  └────────────────────────────────────┘    │
│                                            │
├────────────────────────────────────────────┤
│                 Footer                     │
│  Links: About | Contact | Privacy | Terms  │
└────────────────────────────────────────────┘
```

### Navigation Components

1. **Header**
   - Logo (links to `/`)
   - Global search bar with autocomplete
   - Browse dropdown (Subjects, Documents, Formulas)
   - Quran link
   - Admin link (conditional on auth)

2. **Footer**
   - About Us
   - Contact
   - Privacy Policy
   - Terms of Service
   - Social media links

### Shared Components

- `Header` — Global header component
- `Footer` — Global footer component
- `SearchBar` — Debounced search with suggestions
- `BrowseDropdown` — Navigation menu

### Responsibilities

- Render consistent header/footer across public pages
- Provide search functionality in header
- Handle mobile responsive navigation
- Manage authentication state display

### Implementation

```typescript
// src/components/layouts/PublicLayout.tsx
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

export function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

---

## TopicLayout

**File:** `src/app/topics/slug/layout.tsx`

**Purpose:** Specialized layout for topic content consumption with sidebar navigation.

### Regions

```
┌─────────────────────────────────────────────────────────┐
│                      Header                             │
├─────────────────────────────────────────────────────────┤
│  Breadcrumb                                             │
│  Home > Documents > Physics > Chapter 1 > Topic Name    │
├───────────────┬─────────────────────────┬───────────────┤
│               │                         │               │
│   Sidebar     │    Main Content         │    Sidebar    │
│   (Left)      │    (BlockRenderer)      │    (Right)    │
│               │                         │               │
│  • TOC        │  • Headings             │  • Export     │
│  • Related    │  • Paragraphs           │  • Share      │
│               │  • Formulas             │  • Related    │
│               │  • Figures              │  • Nav        │
│               │  • Tables               │               │
│               │  • MCQs                 │               │
│               │  • Examples             │               │
│               │                         │               │
├───────────────┴─────────────────────────┴───────────────┤
│                   Next/Prev Navigation                  │
├─────────────────────────────────────────────────────────┤
│                      Footer                             │
└─────────────────────────────────────────────────────────┘
```

### Navigation Components

1. **Breadcrumb**
   - Source: `topic.seo.breadcrumb` array
   - Clickable hierarchy trail
   - JSON-LD structured data injection

2. **Table of Contents (Left Sidebar)**
   - Generated from heading blocks
   - Anchor links to sections
   - Active section highlighting
   - Collapsible on mobile

3. **Next/Prev Navigation**
   - Based on topic order in document
   - Shows topic titles
   - Keyboard navigation support (← →)

4. **Action Sidebar (Right Sidebar)**
   - Export button (opens modal)
   - Share button (social sharing)
   - Related topics list
   - Sticky positioning

### Shared Components

- `Breadcrumb` — Hierarchical navigation
- `TableOfContents` — Auto-generated from headings
- `TopicSidebar` — Actions and related content
- `NextPrevNavigation` — Sequential navigation
- `BlockRenderer` — Polymorphic content renderer
- `ExportButton` — Export job trigger

### Responsibilities

- Render topic content with proper semantic structure
- Generate table of contents from content blocks
- Display breadcrumb with schema markup
- Provide export and share actions
- Handle LaTeX rendering for formulas
- Track topic views (automatic via middleware)
- Inject JSON-LD for SEO

### Implementation

```typescript
// src/app/topics/slug/[...slug]/page.tsx
import { TopicLayout } from '@/components/layouts/TopicLayout';
import { BlockRenderer } from '@/components/content/BlockRenderer';
import { TableOfContents } from '@/components/navigation/TableOfContents';
import { TopicSidebar } from '@/components/topics/TopicSidebar';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { getTopicBySlug, getTopicContent } from '@/lib/api/topics';

export async function generateMetadata({ params }) {
  const topic = await getTopicBySlug(params.slug);
  return {
    title: topic.seo.meta_title,
    description: topic.seo.meta_description,
  };
}

export default async function TopicPage({ params }) {
  const topic = await getTopicBySlug(params.slug);
  const content = await getTopicContent(topic._id);
  
  const tocItems = content.content_blocks
    .filter(block => block.type === 'heading')
    .map(block => ({
      id: block.id,
      title: block.text,
      level: block.level,
    }));

  return (
    <TopicLayout>
      <Breadcrumb items={topic.seo.breadcrumb} />
      
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - TOC */}
        <aside className="col-span-2 hidden lg:block">
          <TableOfContents items={tocItems} />
        </aside>
        
        {/* Main Content */}
        <article className="col-span-12 lg:col-span-7">
          <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
          <BlockRenderer blocks={content.content_blocks} />
        </article>
        
        {/* Right Sidebar - Actions */}
        <aside className="col-span-2 hidden lg:block">
          <TopicSidebar topicId={topic._id} />
        </aside>
      </div>
      
      <NextPrevNavigation 
        prevTopic={topic.prev_topic}
        nextTopic={topic.next_topic}
      />
    </TopicLayout>
  );
}
```

---

## SearchLayout

**File:** `src/app/search/layout.tsx`

**Purpose:** Layout optimized for search interfaces with prominent search bar and filter sidebar.

### Regions

```
┌────────────────────────────────────────────┐
│                 Header                     │
├────────────────────────────────────────────┤
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │         Prominent Search Bar         │ │
│  │  [===============================🔍] │ │
│  └──────────────────────────────────────┘ │
│                                            │
├───────────────┬────────────────────────────┤
│               │                            │
│  Filter       │       Results Area         │
│  Sidebar      │                            │
│               │  ┌──────────────────────┐  │
│  • Subject    │  │   Result Card        │  │
│  • Grade      │  ├──────────────────────┤  │
│  • Difficulty │  │   Result Card        │  │
│  • Type       │  ├──────────────────────┤  │
│               │  │   Result Card        │  │
│               │  └──────────────────────┘  │
│               │                            │
│               │  [Pagination Controls]     │
│               │                            │
├───────────────┴────────────────────────────┤
│                 Footer                     │
└────────────────────────────────────────────┘
```

### Navigation Components

1. **Prominent Search Bar**
   - Larger than header search
   - Real-time autocomplete
   - Query suggestions
   - Clear button

2. **Filter Sidebar**
   - Subject filter (checkboxes)
   - Grade filter (checkboxes)
   - Difficulty filter (radio)
   - Topic type filter
   - Active filters display
   - Clear all button

3. **Results Area**
   - Result cards with snippets
   - Highlight matched terms
   - Badges (subject, grade, difficulty)
   - Result count display

### Shared Components

- `SearchBar` — Enhanced version with suggestions
- `FilterPanel` — Faceted search filters
- `SearchResultCard` — Individual result display
- `Pagination` — Page navigation
- `EmptyState` — No results message
- `SearchSkeleton` — Loading state

### Responsibilities

- Display prominent search interface
- Synchronize filters with URL state
- Show loading skeletons during search
- Handle empty states with suggestions
- Track successful/failed searches

### Implementation

```typescript
// src/app/search/page.tsx
import { SearchLayout } from '@/components/layouts/SearchLayout';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from '@/components/search/FilterPanel';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { Pagination } from '@/components/navigation/Pagination';
import { searchTopics } from '@/lib/api/search';

export default async function SearchResultsPage({ searchParams }) {
  const { q, subject, grade, difficulty, page = 1 } = await searchParams;
  
  const results = await searchTopics({
    q,
    subject,
    grade,
    difficulty,
    page,
  });

  return (
    <SearchLayout>
      <div className="mb-8">
        <SearchBar initialValue={q} showSuggestions />
      </div>
      
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <FilterPanel 
            currentFilters={{ subject, grade, difficulty }}
          />
        </aside>
        
        <main className="col-span-9">
          <div className="mb-4 text-gray-600">
            {results.count} results found
          </div>
          
          {results.count === 0 ? (
            <EmptyState 
              query={q}
              suggestions={await getTrendingSearches()}
            />
          ) : (
            <>
              <div className="space-y-4">
                {results.data.map(result => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
              
              <Pagination 
                currentPage={page}
                totalPages={Math.ceil(results.count / 20)}
              />
            </>
          )}
        </main>
      </div>
    </SearchLayout>
  );
}
```

---

## QuranLayout

**File:** `src/app/quran/layout.tsx`

**Purpose:** Specialized layout for Quran browsing with surah selector and translation controls.

### Regions

```
┌────────────────────────────────────────────┐
│                 Header                     │
├────────────────────────────────────────────┤
│                                            │
│  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Surah       │  │ Translation Toggle  │ │
│  │ Selector ▼  │  │ ○ Urdu ○ English   │ │
│  └─────────────┘  └─────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │         Ayah Navigator               │ │
│  │  ← 1 2 3 ... 114 →                   │ │
│  └──────────────────────────────────────┘ │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│            Quran Content Area              │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │   Arabic Text (External Font)        │ │
│  │                                      │ │
│  │   Urdu Translation                   │ │
│  │                                      │ │
│  │   English Translation                │ │
│  └──────────────────────────────────────┘ │
│                                            │
├────────────────────────────────────────────┤
│                 Footer                     │
└────────────────────────────────────────────┘
```

### Navigation Components

1. **Surah Selector**
   - Dropdown with all 114 surahs
   - Shows surah name, number, ayah count
   - Quick navigation

2. **Ayah Navigator**
   - Previous/Next buttons
   - Direct ayah jump input
   - Juz/Hizb/Ruku markers

3. **Translation Toggle**
   - Urdu translation on/off
   - English translation on/off
   - Side-by-side or stacked view

### Shared Components

- `SurahSelector` — Dropdown navigation
- `AyahNavigator` — Verse navigation
- `TranslationToggle` — Language controls
- `QuranText` — Arabic text display (external font)
- `TranslationPanel` — Translation display

### Responsibilities

- Load Arabic font (Amiri)
- Fetch surah/ayah data from API
- Handle translation toggling
- Preserve scroll position on navigation
- Support right-to-left text for Arabic

### Implementation

```typescript
// src/app/quran/[surahNumber]/page.tsx
import { QuranLayout } from '@/components/layouts/QuranLayout';
import { SurahSelector } from '@/components/quran/SurahSelector';
import { AyahNavigator } from '@/components/quran/AyahNavigator';
import { TranslationToggle } from '@/components/quran/TranslationToggle';
import { getSurah } from '@/lib/api/quran';

export default async function SurahPage({ params }) {
  const surah = await getSurah(params.surahNumber);
  
  return (
    <QuranLayout>
      <div className="flex gap-4 mb-6">
        <SurahSelector 
          currentSurah={params.surahNumber}
          totalSurahs={114}
        />
        <TranslationToggle />
      </div>
      
      <AyahNavigator 
        surahNumber={params.surahNumber}
        ayahCount={surah.ayah_count}
      />
      
      <div className="space-y-6">
        {surah.ayahs.map(ayah => (
          <div key={ayah.number} className="border-b pb-6">
            <p className="font-arabic text-3xl text-right mb-4" dir="rtl">
              {ayah.arabic_text}
            </p>
            <p className="text-lg text-urdu">{ayah.urdu_translation}</p>
            <p className="text-gray-600">{ayah.english_translation}</p>
          </div>
        ))}
      </div>
    </QuranLayout>
  );
}
```

---

## AdminLayout

**File:** `src/app/admin/layout.tsx`

**Purpose:** Protected layout for admin interfaces with sidebar navigation and dashboard widgets.

### Regions

```
┌────────────────────────────────────────────┐
│              Admin Header                  │
│  ┌────┐  ┌──────────────────┐  ┌────────┐ │
│  │Logo│  │  System Status   │  │ User   │ │
│  └────┘  │  ● All Systems   │  │ Menu   │ │
│          └──────────────────┘  └────────┘ │
├────────┬───────────────────────────────────┤
│        │                                   │
│ Admin  │         Page Content              │
│ Sidebar│                                   │
│        │  ┌─────────────────────────────┐  │
│ • Dash │  │  Dashboard Widgets          │  │
│ • Ingest│ │  ┌─────┐ ┌─────┐ ┌─────┐   │  │
│ • Import│ │  │Stats│ │Jobs │ │Health│  │  │
│ • Analy│ │  └─────┘ └─────┘ └─────┘   │  │
│ • Vers │  │                             │  │
│        │  │  Recent Activity Table      │  │
│        │  │                             │  │
│        │  └─────────────────────────────┘  │
│        │                                   │
└────────┴───────────────────────────────────┘
```

### Navigation Components

1. **Admin Sidebar**
   - Dashboard
   - Ingestion
   - Batch Import
   - Analytics
   - Versions
   - Settings (future)

2. **Admin Header**
   - System health indicator
   - User menu (logout)
   - Quick actions

### Shared Components

- `AdminSidebar` — Navigation menu
- `AdminHeader` — Top bar with status
- `StatCard` — Dashboard statistics
- `JobStatusBadge` — Job status indicator
- `HealthIndicator` — System health display

### Responsibilities

- Protect routes with authentication middleware
- Display system health status
- Provide admin-specific navigation
- Handle job status polling
- Show error boundaries for admin actions

### Implementation

```typescript
// src/app/admin/layout.tsx
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { checkAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();
  
  if (!isAuthenticated) {
    redirect('/401');
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## Layout Composition Strategy

### Nesting Rules

1. **RootLayout** always wraps everything
2. **Domain layouts** (Public, Topic, Search, Quran, Admin) are mutually exclusive
3. **Page components** render within their parent layout
4. **Loading/Error** components inherit parent layout

### Shared Component Ownership

| Component | Owned By | Used In |
|-----------|----------|---------|
| `Header` | PublicLayout | Public, Topic, Search, Quran |
| `Footer` | PublicLayout | Public, Topic, Search, Quran |
| `Breadcrumb` | TopicLayout | Topic pages only |
| `SearchBar` | SearchLayout | Search, Header |
| `AdminSidebar` | AdminLayout | Admin pages only |

### Responsive Behavior

| Layout | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| PublicLayout | Hamburger menu, stacked | Collapsed sidebar | Full nav |
| TopicLayout | Hidden TOC, drawer | Collapsible sidebar | Full sidebar |
| SearchLayout | Stacked filters | Collapsible filters | Side filters |
| QuranLayout | Stacked controls | Side controls | Full controls |
| AdminLayout | Drawer sidebar | Collapsed sidebar | Full sidebar |

---

## Related Documents

- [01-system-architecture.md](./01-system-architecture.md) — System boundaries
- [02-route-architecture.md](./02-route-architecture.md) — Route structure
- [05-component-architecture.md](./05-component-architecture.md) — Component tree
- [09-component-inventory.md](../frontend-discovery/09-component-inventory.md) — Component reference
