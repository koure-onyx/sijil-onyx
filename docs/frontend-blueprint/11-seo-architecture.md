# Sijil — Frontend Blueprint: SEO Architecture

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the SEO/AEO/GEO architecture for Sijil, including metadata generation, JSON-LD integration, breadcrumbs, canonical URLs, sitemap integration, and SSR requirements based on discovery document `11-seo-requirements.md`.

---

## Metadata Generation

### Page-Level Metadata

**File:** `app/topics/slug/[...slug]/page.tsx`

```typescript
import { Metadata } from 'next';
import { getTopicBySlug } from '@/lib/api/topics';

export async function generateMetadata({ params }): Promise<Metadata> {
  const topic = await getTopicBySlug(params.slug);
  
  return {
    title: topic.seo.meta_title,
    description: topic.seo.meta_description,
    keywords: topic.seo.keywords?.join(', '),
    authors: topic.document_metadata.authors || [],
    openGraph: {
      title: topic.seo.meta_title,
      description: topic.seo.meta_description,
      type: 'article',
      publishedTime: topic.created_at,
      modifiedTime: topic.updated_at,
      images: topic.assets?.figures?.[0]?.image_url 
        ? [{ url: topic.assets.figures[0].image_url }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.seo.meta_title,
      description: topic.seo.meta_description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

### Dynamic OG Images

**File:** `app/topics/slug/[...slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og';

export default async function TopicOGImage({ params }) {
  const topic = await getTopicBySlug(params.slug);
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
          color: 'white',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          {topic.title}
        </h1>
        <p style={{ fontSize: '24px', opacity: 0.9 }}>
          {topic.document_metadata.subject} • Grade {topic.document_metadata.grade}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## JSON-LD Integration

### Topic Schema (EducationalOccupationalCourse)

**API:** `GET /api/seo/topic/:id/jsonld`

```typescript
// features/seo/components/JsonLdScript.tsx
interface JsonLdProps {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export function JsonLdScript({ data }: { data: JsonLdProps }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in TopicPage
const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalCourse',
  name: topic.title,
  description: topic.seo.meta_description,
  educationalLevel: `Grade ${topic.document_metadata.grade}`,
  courseMode: ['textbook', 'online'],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseWorkload: 'PT2H',
    educationalCredentialAwarded: topic.document_metadata.subject,
  },
  provider: {
    '@type': 'Organization',
    name: 'Sijil',
    url: 'https://sijil.example.com',
  },
};

return (
  <>
    <JsonLdScript data={jsonLdData} />
    {/* Page content */}
  </>
);
```

### Breadcrumb Schema

```typescript
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: topic.seo.breadcrumb.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${process.env.NEXT_PUBLIC_BASE_URL}${item.url}`,
  })),
};
```

### FAQ Schema (from AEO data)

```typescript
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: aeoData.faq.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};
```

---

## Breadcrumbs

### Component Implementation

```typescript
// features/navigation/components/Breadcrumb.tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            <span className="mx-2">/</span>
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-900">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-blue-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

## Canonical URLs

### Implementation

```typescript
// In generateMetadata
canonical: topic.seo.canonical_url 
  ? topic.seo.canonical_url
  : `${process.env.NEXT_PUBLIC_BASE_URL}/topics/slug/${topic.slug_global}`,
```

### Handling Duplicate Content

For topics accessible via multiple slugs:
- Primary slug gets canonical URL
- Alternate slugs redirect to primary
- `rel="canonical"` points to primary

---

## Sitemap Integration

### Dynamic Sitemap

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quran`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Dynamic topic routes (paginated)
  const topicSitemaps: MetadataRoute.Sitemap = [];
  const pageSize = 1000;
  let page = 0;
  
  while (true) {
    const topics = await fetchAllTopics(page, pageSize);
    if (topics.length === 0) break;
    
    topicSitemaps.push(
      ...topics.map(topic => ({
        url: `${baseUrl}/topics/slug/${topic.slug_global}`,
        lastModified: new Date(topic.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    );
    
    page++;
  }
  
  return [...staticRoutes, ...topicSitemaps];
}
```

### Robots.txt

**File:** `app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
```

---

## AEO Integration

### Answer Engine Optimization Data

**API:** `GET /api/seo/topic/:id/aeo`

```typescript
interface AEOData {
  primary_question: string;
  featured_snippet_block: string;
  faq: Array<{ question: string; answer: string }>;
  ai_answer_hub: Array<{
    question_intent: string;
    answer_markdown: string;
    answer_plain: string;
    answer_type: 'definition' | 'procedure' | 'comparison' | 'explanation';
  }>;
}
```

### AEO Score Calculation

**API:** `GET /api/seo/topic/:id/aeo/score`

```typescript
interface AEOScore {
  score: number; // 0-100
  max_score: number;
  missing_fields: string[];
  recommendations: string[];
}

// Scoring criteria:
// - Has primary question (+20)
// - Has featured snippet (+20)
// - Has 3+ FAQs (+20)
// - Has AI answer hub (+20)
// - Has structured data (+20)
```

---

## GEO Integration

### Generative Engine Optimization

**Fields Required:**
- `geo.llm_summary` — LLM-friendly summary
- `geo.entity_name` — Named entity
- `geo.entity_type` — Entity classification

**Implementation:**

```typescript
// In topic page metadata
export async function generateMetadata({ params }) {
  const topic = await getTopicBySlug(params.slug);
  
  return {
    // ... other metadata
    other: {
      'entity-name': topic.geo.entity_name,
      'entity-type': topic.geo.entity_type,
      'llm-summary': topic.geo.llm_summary,
    },
  };
}
```

---

## SSR Requirements

### When to Use SSR

| Page Type | Rendering | Reason |
|-----------|-----------|--------|
| Homepage | ISR (60s) | Fresh stats, SEO critical |
| Topic pages | SSR + ISR | SEO critical, content updates |
| Document list | ISR (300s) | SEO important, less frequent updates |
| Search results | CSR | User-specific, no SEO value |
| Admin pages | CSR | No SEO requirements |

### ISR Configuration

```typescript
// app/topics/slug/[...slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

// Or on-demand revalidation
export default async function TopicPage({ params }) {
  // Fetch data
  return <Content />;
}

// Trigger revalidation after content update
await revalidatePath(`/topics/slug/${slug}`);
```

### Hydration Optimization

```typescript
// Pre-fetch related data on server
await queryClient.prefetchQuery({
  queryKey: queryKeys.topics.content(topic._id),
  queryFn: () => getTopicContent(topic._id),
});

// Hydrate on client
<HydrationBoundary state={dehydrate(queryClient)}>
  <TopicPageClient topic={topic} />
</HydrationBoundary>
```

---

## Related Documents

- [02-route-architecture.md](./02-route-architecture.md) — Route structure
- [03-layout-architecture.md](./03-layout-architecture.md) — Layout components
- [11-seo-requirements.md](../frontend-discovery/11-seo-requirements.md) — SEO discovery
