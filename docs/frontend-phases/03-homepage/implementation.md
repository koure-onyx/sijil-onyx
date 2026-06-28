# Phase 03: Homepage - Implementation Specification

This document is self-contained. An implementation AI can build Phase 03 using only this file.

---

## 1. Page Structure

### Homepage Route

**File:** `app/page.tsx`

**Type:** Server Component (async)

**Purpose:** Main landing page for all users, showcases platform features and provides entry points to content.

**Structure:**
```typescript
export default async function HomePage() {
  const [stats, subjects, recentDocs] = await Promise.all([
    fetchStats(),
    fetchSubjects(),
    fetchRecentDocuments()
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection data={stats} />
      <CollectionsGrid subjects={subjects} />
      <FeaturedContent docs={recentDocs} />
      <CTASection />
    </>
  );
}
```

**Data Fetching:** All data fetched in parallel at top level to minimize waterfall.

---

## 2. Components

### HeroSection

**File:** `components/home/hero-section.tsx`

**Type:** Server Component

**Props:** None

**Structure:**
```tsx
<section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
  <div className="container">
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <Badge variant="outline">Pakistani Curriculum</Badge>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Digital Textbooks for 
        <span className="text-primary"> Modern Learning</span>
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Comprehensive educational content for grades 9-12. Access physics, chemistry, biology, and mathematics with interactive topics, assessments, and exports.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button size="lg" asChild>
          <Link href="/documents">Browse Documents</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/search">Search Content</Link>
        </Button>
      </div>
    </div>
  </div>
</section>
```

**Key Features:**
- Gradient background for visual interest
- Clear value proposition in headline
- Two primary CTAs
- Responsive typography (4xl → 6xl)

---

### StatsSection

**File:** `components/home/stats-section.tsx`

**Type:** Server Component

**Props:**
```typescript
interface StatsSectionProps {
  data: {
    documents: number;
    topics: number;
    subjects: number;
    grades: number;
  };
}
```

**Structure:**
```tsx
<section className="py-16 border-y">
  <div className="container">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center space-y-2">
          <div className="text-3xl md:text-4xl font-bold text-primary">
            {formatNumber(stat.value)}
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Stats to Display:**
- Total Documents
- Total Topics
- Available Subjects
- Grade Levels

---

### CollectionsGrid

**File:** `components/home/collections-grid.tsx`

**Type:** Server Component

**Props:**
```typescript
interface CollectionsGridProps {
  subjects: string[];
}
```

**Structure:**
```tsx
<section className="py-20 bg-muted/30">
  <div className="container">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Browse by Subject</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Explore our comprehensive collection organized by subject and grade level
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {subjects.map((subject) => (
        <SubjectCard 
          key={subject} 
          subject={subject}
          href={`/subjects/${subject.toLowerCase()}`}
        />
      ))}
    </div>
  </div>
</section>
```

---

### SubjectCard

**File:** `components/home/subject-card.tsx`

**Type:** Server Component

**Props:**
```typescript
interface SubjectCardProps {
  subject: string;
  href: string;
}
```

**Structure:**
```tsx
<Card className="group hover:shadow-lg transition-all duration-300">
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <getSubjectIcon(subject)}
    </div>
    <CardTitle className="text-xl">{subject}</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Grades 9-12 available
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
      Explore
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </CardFooter>
</Card>
```

**Subject Icons Mapping:**
```typescript
const subjectIcons = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: Dna,
  Mathematics: Calculator,
  ComputerScience: Laptop,
  English: BookOpen,
  Urdu: Type,
  Islamiat: MoonStar,
};
```

---

### FeaturedContent

**File:** `components/home/featured-content.tsx`

**Type:** Server Component

**Props:**
```typescript
interface FeaturedContentProps {
  docs: Document[];
}
```

**Structure:**
```tsx
<section className="py-20">
  <div className="container">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-3xl font-bold mb-2">Recently Added</h2>
        <p className="text-muted-foreground">Latest content from our collection</p>
      </div>
      <Button variant="ghost" asChild>
        <Link href="/documents">View All →</Link>
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {docs.slice(0, 6).map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  </div>
</section>
```

---

### DocumentCard

**File:** `components/documents/document-card.tsx`

**Type:** Server Component

**Props:**
```typescript
interface DocumentCardProps {
  document: Document;
}
```

**Structure:**
```tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader>
    <Badge variant="secondary" className="w-fit mb-2">
      {document.subject}
    </Badge>
    <CardTitle className="line-clamp-2">{document.title}</CardTitle>
    <CardDescription>
      Grade {document.grade} • {document.type}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center">
        <FileText className="h-3 w-3 mr-1" />
        {document.topicCount} topics
      </span>
      <span className="flex items-center">
        <Calendar className="h-3 w-3 mr-1" />
        {formatDate(document.createdAt)}
      </span>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm" className="w-full" asChild>
      <Link href={`/documents/${document.id}`}>View Details</Link>
    </Button>
  </CardFooter>
</Card>
```

---

### CTASection

**File:** `components/home/cta-section.tsx`

**Type:** Server Component

**Props:** None

**Structure:**
```tsx
<section className="py-20 bg-primary text-primary-foreground">
  <div className="container max-w-4xl text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold">
      Ready to Start Learning?
    </h2>
    <p className="text-lg opacity-90 max-w-2xl mx-auto">
      Access thousands of educational resources aligned with the Pakistani curriculum. Free for all students and educators.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
      <Button size="lg" variant="secondary" asChild>
        <Link href="/documents">Browse Collection</Link>
      </Button>
      <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
        <Link href="/search">Advanced Search</Link>
      </Button>
    </div>
  </div>
</section>
```

---

## 3. APIs

### GET /api/documents/aggregates

**Purpose:** Fetch homepage statistics

**Request:** No parameters

**Response:**
```json
{
  "documents": 150,
  "topics": 1200,
  "subjects": 8,
  "grades": 4
}
```

**Usage:** StatsSection component

**Error Handling:** If API fails, show placeholder stats or hide section gracefully.

---

### GET /api/subjects

**Purpose:** Get list of all subjects

**Request:** No parameters

**Response:**
```json
["Physics", "Chemistry", "Biology", "Mathematics", ...]
```

**Usage:** CollectionsGrid component

**Caching:** ISR with revalidate=3600 (1 hour)

---

### GET /api/documents?limit=6&sort=-createdAt

**Purpose:** Get recently added documents

**Query Params:**
- `limit`: 6
- `sort`: `-createdAt` (newest first)

**Response:** Paginated document list

**Usage:** FeaturedContent component

**Caching:** ISR with revalidate=600 (10 minutes)

---

## 4. Data Models

### Document Interface

```typescript
interface Document {
  id: string;
  title: string;
  subject: string;
  grade: number;
  type: 'textbook' | 'guide' | 'notes' | 'past_paper';
  topicCount: number;
  createdAt: string;
  updatedAt: string;
  status: 'published' | 'draft' | 'archived';
}
```

### Stats Interface

```typescript
interface HomepageStats {
  documents: number;
  topics: number;
  subjects: number;
  grades: number;
}
```

---

## 5. Routes

### Homepage

**Path:** `/`

**Layout:** Root layout (from Phase 02)

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Sijil - Digital Textbook Platform for Pakistani Curriculum',
  description: 'Comprehensive digital textbooks for grades 9-12. Access physics, chemistry, biology, mathematics with interactive topics, assessments, and exportable content.',
  keywords: ['Pakistani curriculum', 'textbooks', 'education', 'PCTB', 'grade 9', 'grade 10', 'grade 11', 'grade 12', 'physics', 'chemistry', 'biology', 'mathematics'],
  openGraph: {
    title: 'Sijil - Modern Digital Learning',
    description: 'Free access to Pakistani curriculum textbooks',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Sijil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sijil - Digital Textbooks',
    description: 'Comprehensive educational content for Pakistani students',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Structured Data (JSON-LD)

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Sijil',
  description: 'Digital textbook platform for Pakistani curriculum',
  url: 'https://sijil.com',
  hasCourse: subjects.map(subject => ({
    '@type': 'Course',
    name: subject,
    educationalLevel: 'Grades 9-12'
  })),
};
```

---

## 6. State Management

No client state needed. All data fetched server-side.

Optional: Add search query state if integrating search bar in hero (Phase 07 feature).

---

## 7. Folders and Files

### Create These Directories:

```
components/
  home/
    hero-section.tsx
    stats-section.tsx
    collections-grid.tsx
    subject-card.tsx
    featured-content.tsx
    cta-section.tsx
  documents/
    document-card.tsx
```

### Update/Create:

```
app/
  page.tsx (create)
```

---

## 8. SEO Requirements

### Meta Tags
- ✓ Title tag with primary keywords
- ✓ Meta description (150-160 characters)
- ✓ Open Graph tags for social sharing
- ✓ Twitter Card tags
- ✓ Canonical URL
- ✓ Robots meta tag

### Structured Data
- ✓ EducationalOrganization schema
- ✓ Course schemas for each subject
- ✓ BreadcrumbList schema (future)

### Performance for SEO
- ✓ LCP < 2.5s (optimize hero image/text)
- ✓ CLS < 0.1 (reserve space for dynamic content)
- ✓ INP < 200ms (minimize JavaScript)

---

## 9. Loading States

Since this is a Server Component with async data fetching:

```tsx
// app/page.tsx uses React Suspense boundaries
<Suspense fallback={<StatsSkeleton />}>
  <StatsSection data={stats} />
</Suspense>
```

### StatsSkeleton

**File:** `components/skeletons/stats-skeleton.tsx`

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {[...Array(4)].map((_, i) => (
    <div key={i} className="text-center space-y-2">
      <Skeleton className="h-10 w-20 mx-auto" />
      <Skeleton className="h-4 w-24 mx-auto" />
    </div>
  ))}
</div>
```

---

## 10. Error States

### Empty State (No Documents)

```tsx
{docs.length === 0 ? (
  <EmptyState
    icon={Inbox}
    title="No documents yet"
    description="Check back soon for new content"
  />
) : (
  <DocumentGrid docs={docs} />
)}
```

### API Error Handling

```tsx
// In try-catch blocks
try {
  const stats = await fetchStats();
} catch (error) {
  console.error('Failed to fetch stats:', error);
  // Return default/empty stats
  return { documents: 0, topics: 0, subjects: 0, grades: 0 };
}
```

---

## 11. Accessibility

### Requirements

✓ All links have descriptive text
✓ Images have alt text (subject icons)
✓ Proper heading hierarchy (h1 → h2 → h3)
✓ Color contrast meets WCAG AA
✓ Focus indicators on all interactive elements
✓ Skip link from Phase 02 works

### Implementation Notes

```tsx
// Subject card with proper aria labels
<SubjectCard 
  subject={subject}
  href={`/subjects/${subject.toLowerCase()}`}
  ariaLabel={`Browse ${subject} collection`}
/>

// Stats section with semantic markup
<section aria-labelledby="stats-heading">
  <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
  ...
</section>
```

---

## 12. Responsive Behavior

### Mobile (< 768px)
- Hero: Single column, stacked CTAs
- Stats: 2 columns
- Collections: 1 column
- Featured: 1 column

### Tablet (768px - 1024px)
- Hero: Centered layout
- Stats: 4 columns
- Collections: 2 columns
- Featured: 2 columns

### Desktop (≥ 1024px)
- Hero: Full width with max-width container
- Stats: 4 columns
- Collections: 4 columns
- Featured: 3 columns

---

## 13. Backend Integration

### API Client Usage

```typescript
import { api } from '@/lib/api-client';

// Fetch stats
async function fetchStats(): Promise<HomepageStats> {
  try {
    const response = await api.get('/documents/aggregates');
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
}

// Fetch subjects
async function fetchSubjects(): Promise<string[]> {
  const response = await api.get('/subjects');
  return response.data;
}

// Fetch recent documents
async function fetchRecentDocuments(limit = 6): Promise<Document[]> {
  const response = await api.get('/documents', {
    params: { limit, sort: '-createdAt' }
  });
  return response.data.results;
}
```

### Caching Strategy

```typescript
// Next.js ISR
export const revalidate = 3600; // 1 hour for static data

// For frequently changing data
export const dynamic = 'force-dynamic';
```

---

## 14. Acceptance Checklist

### Structure
- [ ] Homepage route exists at `/`
- [ ] All sections render in correct order
- [ ] Components properly separated
- [ ] No logic duplication

### Content
- [ ] Hero displays value proposition
- [ ] Stats show real data from API
- [ ] All subjects displayed in grid
- [ ] Recent documents shown (max 6)
- [ ] CTA section present

### Design
- [ ] Consistent spacing throughout
- [ ] Typography scale followed
- [ ] Color palette used correctly
- [ ] Hover states on interactive elements

### Responsive
- [ ] Mobile layout works perfectly
- [ ] Tablet layout optimized
- [ ] Desktop layout maximizes space
- [ ] No horizontal scroll at any breakpoint

### Performance
- [ ] Page loads in < 2s
- [ ] Images optimized
- [ ] No unnecessary re-renders
- [ ] Lighthouse score > 90

### SEO
- [ ] Meta title present
- [ ] Meta description present
- [ ] Open Graph tags added
- [ ] Structured data implemented
- [ ] Semantic HTML used

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast passes
- [ ] Alt text on images

### Code Quality
- [ ] TypeScript strict mode passes
- [ ] No console errors
- [ ] Components properly typed
- [ ] No hardcoded values

---

## 15. Common Mistakes to Avoid

❌ **Fetching data in client components** - Slows down initial load
✅ **Solution:** Use Server Components for data fetching

❌ **Not handling empty states** - Shows broken UI
✅ **Solution:** Always implement empty/error states

❌ **Hardcoding subject list** - Requires code changes to update
✅ **Solution:** Fetch from API endpoint

❌ **Ignoring mobile experience** - Most users on mobile
✅ **Solution:** Mobile-first design approach

❌ **Missing SEO metadata** - Poor search rankings
✅ **Solution:** Complete metadata object on every page

❌ **Large hero images** - Slow LCP
✅ **Solution:** Use text-based hero or optimize images

❌ **Not caching API responses** - Slow page loads
✅ **Solution:** Use Next.js ISR with appropriate revalidate times

---

## 16. Git Commit Message

```
feat(homepage): implement homepage with hero, stats, collections, and CTA

- Add HeroSection with value proposition and dual CTAs
- Implement StatsSection with live API data
- Create CollectionsGrid showing all subjects
- Build FeaturedContent with recent documents
- Add CTASection for user engagement
- Configure comprehensive SEO metadata
- Implement JSON-LD structured data
- Add responsive design for all breakpoints
- Include loading skeletons and error states
- Ensure accessibility compliance (WCAG AA)

Part of Phase 03: Homepage
```
