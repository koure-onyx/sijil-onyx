# Phase 11: SEO & Discoverability - Implementation Guide

## Self-Contained Implementation Specification

This document contains everything needed to implement SEO & Discoverability for the Sijil platform. No references to external documents required.

---

## Table of Contents

1. [Pages & Routes](#pages--routes)
2. [Layouts](#layouts)
3. [Components](#components)
4. [Hooks](#hooks)
5. [API Routes](#api-routes)
6. [State Management](#state-management)
7. [TypeScript Models](#typescript-models)
8. [Utilities](#utilities)
9. [Folder Structure](#folder-structure)
10. [SEO Configuration](#seo-configuration)
11. [Loading States](#loading-states)
12. [Error Handling](#error-handling)
13. [Accessibility](#accessibility)
14. [Responsive Behavior](#responsive-behavior)
15. [Backend Integration](#backend-integration)
16. [Acceptance Checklist](#acceptance-checklist)

---

## Pages & Routes

### 1. Dynamic Sitemap Pages

#### `/sitemap.xml` (app/sitemap.ts)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getSitemapIndex } from '@/lib/seo/sitemap-generator';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  
  return [
    {
      url: `${baseUrl}/sitemap-topics.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap-documents.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-assessments.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];
}
```

#### `/sitemap-topics.xml` (app/sitemap-topics.xml/route.ts)

```typescript
// app/sitemap-topics.xml/route.ts
import { NextResponse } from 'next/server';
import { generateTopicsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const sitemapXml = await generateTopicsSitemap();
    
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating topics sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
```

#### `/sitemap-documents.xml` (app/sitemap-documents.xml/route.ts)

```typescript
// app/sitemap-documents.xml/route.ts
import { NextResponse } from 'next/server';
import { generateDocumentsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 3600;

export async function GET() {
  try {
    const sitemapXml = await generateDocumentsSitemap();
    
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating documents sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
```

#### `/sitemap-assessments.xml` (app/sitemap-assessments.xml/route.ts)

```typescript
// app/sitemap-assessments.xml/route.ts
import { NextResponse } from 'next/server';
import { generateAssessmentsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 7200; // Revalidate every 2 hours

export async function GET() {
  try {
    const sitemapXml = await generateAssessmentsSitemap();
    
    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200',
      },
    });
  } catch (error) {
    console.error('Error generating assessments sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
```

#### `/sitemap-static.xml` (app/sitemap-static.xml/route.ts)

```typescript
// app/sitemap-static.xml/route.ts
import { NextResponse } from 'next/server';

const staticRoutes = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/topics', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/search', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/assessments', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  const lastMod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

### 2. Robots.txt Route

#### `/robots.txt` (app/robots.txt/route.ts)

```typescript
// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 86400; // Revalidate daily

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  
  const robotsTxt = `User-agent: *
Allow: /
Allow: /topics
Allow: /documents
Allow: /assessments
Allow: /search
Allow: /about
Allow: /contact

Disallow: /admin
Disallow: /dashboard
Disallow: /profile
Disallow: /settings
Disallow: /api
Disallow: /_next
Disallow: /*?*q=
Disallow: /*session=
Disallow: /*token=

Sitemap: ${baseUrl}/sitemap.xml

Host: ${baseUrl}

Crawl-delay: 1
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

### 3. Enhanced Content Pages

All existing pages must be enhanced with dynamic metadata. Here are examples:

#### Topic Detail Page Enhancement (app/topics/[slug]/page.tsx)

```typescript
// app/topics/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTopicBySlug } from '@/lib/api/topics';
import { SeoHead } from '@/components/seo/SeoHead';
import { StructuredData } from '@/components/seo/StructuredData';
import TopicDetail from '@/components/topics/TopicDetail';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = await getTopicBySlug(params.slug);
  
  if (!topic) {
    return {
      title: 'Topic Not Found | Sijil',
      description: 'The requested topic could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  const canonicalUrl = `${siteUrl}/topics/${topic.slug}`;

  return {
    title: {
      default: `${topic.title} | Sijil`,
      template: `%s | Sijil`,
    },
    description: topic.excerpt || `Learn about ${topic.title} with comprehensive educational resources on Sijil.`,
    keywords: [...topic.tags, topic.category, 'education', 'learning'].join(', '),
    authors: topic.author ? [{ name: topic.author.name }] : [],
    openGraph: {
      title: topic.title,
      description: topic.excerpt,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: topic.coverImage || `${siteUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
      siteName: 'Sijil',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.excerpt,
      images: [topic.coverImage || `${siteUrl}/og-default.jpg`],
      creator: topic.author?.twitterHandle || '@sijil',
    },
    alternates: {
      canonical: canonicalUrl,
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

export default async function TopicPage({ params }: Props) {
  const topic = await getTopicBySlug(params.slug);
  
  if (!topic) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: topic.title,
    description: topic.excerpt,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/topics/${topic.slug}`,
    image: topic.coverImage,
    author: topic.author ? {
      '@type': 'Person',
      name: topic.author.name,
      url: topic.author.url,
    } : undefined,
    datePublished: topic.publishedAt,
    dateModified: topic.updatedAt,
    educationalLevel: topic.difficulty,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      name: topic.category,
    },
  };

  return (
    <>
      <SeoHead />
      <StructuredData data={structuredData} />
      <TopicDetail topic={topic} />
    </>
  );
}
```

---

## Layouts

### 1. SeoLayout (components/seo/layouts/SeoLayout.tsx)

```typescript
// components/seo/layouts/SeoLayout.tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useSeoMetadata } from '@/hooks/seo/useSeoMetadata';
import { SeoHead } from '../SeoHead';

interface SeoLayoutProps {
  children: ReactNode;
}

export function SeoLayout({ children }: SeoLayoutProps) {
  const pathname = usePathname();
  const metadata = useSeoMetadata(pathname);

  // Don't apply SEO to admin/dashboard pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    return <>{children}</>;
  }

  return (
    <>
      <SeoHead {...metadata} />
      {children}
    </>
  );
}
```

### 2. ArticleLayout (components/seo/layouts/ArticleLayout.tsx)

```typescript
// components/seo/layouts/ArticleLayout.tsx
import { ReactNode } from 'react';
import { StructuredData } from '../StructuredData';
import { BreadcrumbSchema } from '../BreadcrumbSchema';
import { SeoHead } from '../SeoHead';

interface ArticleLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  articleType?: 'Article' | 'LearningResource' | 'Course';
}

export function ArticleLayout({
  children,
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  author,
  breadcrumbs,
  articleType = 'Article',
}: ArticleLayoutProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: title,
    description: description,
    url: typeof window !== 'undefined' ? window.location.href : siteUrl,
    image: image ? [image] : undefined,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: author.url,
          image: author.image,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Sijil',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    inLanguage: 'en',
  };

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        image={image}
        type="article"
      />
      <StructuredData data={articleSchema} />
      {breadcrumbs && <BreadcrumbSchema items={breadcrumbs} />}
      <article className="prose prose-lg max-w-none">{children}</article>
    </>
  );
}
```

---

## Components

### 1. SeoHead Component (components/seo/SeoHead.tsx)

```typescript
// components/seo/SeoHead.tsx
'use client';

import { useEffect } from 'react';
import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  hreflang?: Array<{ lang: string; url: string }>;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
}

export function SeoHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
  nofollow = false,
  canonical,
  hreflang,
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
}: SeoHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  const defaultImage = `${siteUrl}/og-default.jpg`;
  const finalUrl = url || siteUrl;
  const finalImage = image || defaultImage;

  useEffect(() => {
    // Dynamically update meta tags for client-side navigation
    if (title) {
      document.title = `${title} | Sijil`;
    }

    const setMeta = (name: string, content: string, property = false) => {
      let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    if (description) setMeta('description', description);
    if (keywords?.length) setMeta('keywords', keywords.join(', '));
    
    // Open Graph
    setMeta('og:title', title || 'Sijil', true);
    setMeta('og:description', description || '', true);
    setMeta('og:image', finalImage, true);
    setMeta('og:url', finalUrl, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'Sijil', true);
    
    if (publishedTime) setMeta('article:published_time', publishedTime, true);
    if (modifiedTime) setMeta('article:modified_time', modifiedTime, true);
    if (author) setMeta('article:author', author, true);
    if (section) setMeta('article:section', section, true);
    tags?.forEach((tag, i) => setMeta(`article:tag`, tag, true));

    // Twitter
    setMeta('twitter:card', twitterCard);
    setMeta('twitter:title', title || 'Sijil');
    setMeta('twitter:description', description || '');
    setMeta('twitter:image', finalImage);
    if (twitterSite) setMeta('twitter:site', twitterSite);
    if (twitterCreator) setMeta('twitter:creator', twitterCreator);

    // Robots
    const robotsContent = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');
    setMeta('robots', robotsContent);

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Hreflang
    hreflang?.forEach(({ lang, url: href }) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.href = href;
    });
  }, [
    title,
    description,
    keywords,
    finalImage,
    finalUrl,
    type,
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
    noindex,
    nofollow,
    canonical,
    hreflang,
    twitterCard,
    twitterSite,
    twitterCreator,
  ]);

  return null; // This component only updates meta tags dynamically
}
```

### 2. StructuredData Component (components/seo/StructuredData.tsx)

```typescript
// components/seo/StructuredData.tsx
'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
  scriptId?: string;
}

export function StructuredData({ data, scriptId = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data, scriptId]);

  return null;
}
```

### 3. BreadcrumbSchema Component (components/seo/BreadcrumbSchema.tsx)

```typescript
// components/seo/BreadcrumbSchema.tsx
'use client';

import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={breadcrumbSchema} scriptId="breadcrumb-schema" />;
}
```

### 4. SocialSharePreview Component (components/seo/SocialSharePreview.tsx)

```typescript
// components/seo/SocialSharePreview.tsx
'use client';

import { useState } from 'react';

interface SocialSharePreviewProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export function SocialSharePreview({
  title,
  description,
  image,
  url,
}: SocialSharePreviewProps) {
  const [platform, setPlatform] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook');

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Social Media Preview</h3>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPlatform('facebook')}
          className={`px-3 py-1 rounded ${
            platform === 'facebook' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Facebook
        </button>
        <button
          onClick={() => setPlatform('twitter')}
          className={`px-3 py-1 rounded ${
            platform === 'twitter' ? 'bg-sky-500 text-white' : 'bg-gray-200'
          }`}
        >
          Twitter
        </button>
        <button
          onClick={() => setPlatform('linkedin')}
          className={`px-3 py-1 rounded ${
            platform === 'linkedin' ? 'bg-blue-700 text-white' : 'bg-gray-200'
          }`}
        >
          LinkedIn
        </button>
      </div>

      <div className="border rounded overflow-hidden max-w-md">
        {platform === 'facebook' && (
          <div className="bg-white">
            <div className="relative aspect-[1.91/1] bg-gray-200">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/og-default.jpg';
                }}
              />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 uppercase mb-1">{new URL(url).hostname}</p>
              <h4 className="font-semibold text-gray-900 line-clamp-2">{title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
            </div>
          </div>
        )}

        {platform === 'twitter' && (
          <div className="bg-white">
            <div className="aspect-[2/1] bg-gray-200">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/og-default.jpg';
                }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-gray-900 line-clamp-2">{title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
              <p className="text-xs text-gray-500 mt-2">{url}</p>
            </div>
          </div>
        )}

        {platform === 'linkedin' && (
          <div className="bg-white">
            <div className="aspect-[1.91/1] bg-gray-200">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/og-default.jpg';
                }}
              />
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-gray-900 line-clamp-2">{title}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
              <p className="text-xs text-gray-500 mt-2">{new URL(url).hostname}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 5. CanonicalLink Component (components/seo/CanonicalLink.tsx)

```typescript
// components/seo/CanonicalLink.tsx
'use client';

import { useEffect } from 'react';

interface CanonicalLinkProps {
  href: string;
}

export function CanonicalLink({ href }: CanonicalLinkProps) {
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }

    link.href = href;

    return () => {
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [href]);

  return null;
}
```

### 6. HreflangTags Component (components/seo/HreflangTags.tsx)

```typescript
// components/seo/HreflangTags.tsx
'use client';

import { useEffect } from 'react';

interface HreflangTag {
  lang: string;
  url: string;
}

interface HreflangTagsProps {
  tags: HreflangTag[];
  xDefault?: string;
}

export function HreflangTags({ tags, xDefault }: HreflangTagsProps) {
  useEffect(() => {
    // Remove existing hreflang tags
    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach((el) => el.remove());

    // Add new hreflang tags
    tags.forEach(({ lang, url }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    });

    // Add x-default if provided
    if (xDefault) {
      const xDefaultLink = document.createElement('link');
      xDefaultLink.rel = 'alternate';
      xDefaultLink.hreflang = 'x-default';
      xDefaultLink.href = xDefault;
      document.head.appendChild(xDefaultLink);
    }

    return () => {
      const all = document.querySelectorAll('link[rel="alternate"][hreflang]');
      all.forEach((el) => el.remove());
    };
  }, [tags, xDefault]);

  return null;
}
```

---

## Hooks

### 1. useSeoMetadata Hook (hooks/seo/useSeoMetadata.ts)

```typescript
// hooks/seo/useSeoMetadata.ts
import { useMemo } from 'react';

interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  canonical?: string;
}

export function useSeoMetadata(pathname: string): SeoMetadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';

  return useMemo(() => {
    // Admin and dashboard pages should not be indexed
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
      return {
        noindex: true,
        title: 'Sijil',
      };
    }

    // Default metadata based on route
    switch (true) {
      case pathname === '/':
        return {
          title: 'Sijil - Learn Anything, Master Everything',
          description:
            'Free educational platform with comprehensive topics, documents, and assessments. Start learning today.',
          keywords: ['education', 'learning', 'courses', 'tutorials', 'certifications'],
          image: `${siteUrl}/og-home.jpg`,
          url: siteUrl,
          type: 'website',
        };

      case pathname === '/topics':
        return {
          title: 'Browse Topics | Sijil',
          description:
            'Explore our comprehensive library of educational topics across multiple categories.',
          keywords: ['topics', 'categories', 'subjects', 'learning paths'],
          image: `${siteUrl}/og-topics.jpg`,
          url: `${siteUrl}/topics`,
          type: 'website',
        };

      case pathname.startsWith('/topics/'):
        return {
          // Dynamic metadata will be filled by page component
          type: 'article',
        };

      case pathname === '/assessments':
        return {
          title: 'Practice Assessments | Sijil',
          description:
            'Test your knowledge with our interactive quizzes and practice exams.',
          keywords: ['quiz', 'exam', 'test', 'assessment', 'practice'],
          image: `${siteUrl}/og-assessments.jpg`,
          url: `${siteUrl}/assessments`,
          type: 'website',
        };

      case pathname === '/search':
        return {
          title: 'Search | Sijil',
          description: 'Find educational content across all topics and documents.',
          noindex: true, // Search results pages typically noindexed
        };

      default:
        return {
          title: 'Sijil',
          description: 'Educational platform for lifelong learners.',
          url: `${siteUrl}${pathname}`,
        };
    }
  }, [pathname, siteUrl]);
}
```

### 2. useStructuredData Hook (hooks/seo/useStructuredData.ts)

```typescript
// hooks/seo/useStructuredData.ts
import { useMemo } from 'react';

interface UseStructuredDataProps {
  type: 'LearningResource' | 'Article' | 'Course' | 'Quiz';
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
  language?: string;
}

export function useStructuredData({
  type,
  title,
  description,
  url,
  image,
  author,
  publishedAt,
  updatedAt,
  difficulty,
  estimatedTime,
  language = 'en',
}: UseStructuredDataProps) {
  return useMemo(() => {
    const baseSchema: any = {
      '@context': 'https://schema.org',
      '@type': type,
      headline: title,
      description: description,
      url: url,
      inLanguage: language,
    };

    if (image) {
      baseSchema.image = [image];
    }

    if (author) {
      baseSchema.author = {
        '@type': 'Person',
        name: author.name,
        url: author.url,
      };
    }

    if (publishedAt) {
      baseSchema.datePublished = publishedAt;
    }

    if (updatedAt) {
      baseSchema.dateModified = updatedAt;
    }

    // Type-specific properties
    if (type === 'LearningResource' || type === 'Course') {
      if (difficulty) {
        baseSchema.educationalLevel = difficulty;
      }
      if (estimatedTime) {
        baseSchema.timeRequired = estimatedTime;
      }
      baseSchema.publisher = {
        '@type': 'Organization',
        name: 'Sijil',
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        },
      };
    }

    if (type === 'Quiz') {
      baseSchema.numberOfQuestions = 10; // Default, override as needed
      baseSchema.typicalAgeRange = '13+';
    }

    return baseSchema;
  }, [
    type,
    title,
    description,
    url,
    image,
    author,
    publishedAt,
    updatedAt,
    difficulty,
    estimatedTime,
    language,
  ]);
}
```

### 3. useCanonicalUrl Hook (hooks/seo/useCanonicalUrl.ts)

```typescript
// hooks/seo/useCanonicalUrl.ts
import { useMemo } from 'react';

export function useCanonicalUrl(pathname: string, params?: Record<string, string>): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';

  return useMemo(() => {
    // Remove query parameters for canonical URL
    let cleanPath = pathname.split('?')[0];

    // Handle dynamic routes
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        cleanPath = cleanPath.replace(`[${key}]`, value);
      });
    }

    return `${siteUrl}${cleanPath}`;
  }, [pathname, params, siteUrl]);
}
```

### 4. useSocialPreview Hook (hooks/seo/useSocialPreview.ts)

```typescript
// hooks/seo/useSocialPreview.ts
import { useMemo } from 'react';

interface SocialPreviewData {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: string;
}

interface UseSocialPreviewProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
}

export function useSocialPreview({
  title,
  description,
  image,
  url,
  type = 'website',
}: UseSocialPreviewProps): SocialPreviewData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';
  const defaultImage = `${siteUrl}/og-default.jpg`;

  return useMemo(
    () => ({
      ogTitle: title,
      ogDescription: description,
      ogImage: image || defaultImage,
      ogUrl: url,
      ogType: type,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image || defaultImage,
      twitterCard: 'summary_large_image',
    }),
    [title, description, image, url, type, defaultImage]
  );
}
```

---

## API Routes

### 1. Sitemap Generation API (app/api/seo/sitemap/topics/route.ts)

```typescript
// app/api/seo/sitemap/topics/route.ts
import { NextResponse } from 'next/server';
import { generateTopicsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 3600;

export async function GET() {
  try {
    const sitemapXml = await generateTopicsSitemap();

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating topics sitemap:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

### 2. Documents Sitemap API (app/api/seo/sitemap/documents/route.ts)

```typescript
// app/api/seo/sitemap/documents/route.ts
import { NextResponse } from 'next/server';
import { generateDocumentsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 3600;

export async function GET() {
  try {
    const sitemapXml = await generateDocumentsSitemap();

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating documents sitemap:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

### 3. Assessments Sitemap API (app/api/seo/sitemap/assessments/route.ts)

```typescript
// app/api/seo/sitemap/assessments/route.ts
import { NextResponse } from 'next/server';
import { generateAssessmentsSitemap } from '@/lib/seo/sitemap-generator';

export const revalidate = 7200;

export async function GET() {
  try {
    const sitemapXml = await generateAssessmentsSitemap();

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200',
      },
    });
  } catch (error) {
    console.error('Error generating assessments sitemap:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

### 4. Robots.txt API (app/api/seo/robots/route.ts)

```typescript
// app/api/seo/robots/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 86400;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sijil.com';

  const robotsTxt = `User-agent: *
Allow: /
Allow: /topics
Allow: /documents
Allow: /assessments
Allow: /search
Allow: /about
Allow: /contact

Disallow: /admin
Disallow: /dashboard
Disallow: /profile
Disallow: /settings
Disallow: /api
Disallow: /_next
Disallow: /*?*q=
Disallow: /*session=
Disallow: /*token=

Sitemap: ${baseUrl}/sitemap.xml

Host: ${baseUrl}

Crawl-delay: 1
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
```

### 5. Search Engine Ping API (app/api/seo/ping/route.ts)

```typescript
// app/api/seo/ping/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SEARCH_ENGINE_PING_URLS = [
  `https://www.google.com/ping?sitemap=`,
  `https://www.bing.com/ping?sitemap=`,
];

export async function POST(request: NextRequest) {
  try {
    const { sitemapUrl } = await request.json();

    if (!sitemapUrl) {
      return new NextResponse(
        JSON.stringify({ error: 'sitemapUrl is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const results = await Promise.allSettled(
      SEARCH_ENGINE_PING_URLS.map(async (baseUrl) => {
        const pingUrl = `${baseUrl}${encodeURIComponent(sitemapUrl)}`;
        const response = await fetch(pingUrl, { method: 'GET' });
        return {
          url: pingUrl,
          success: response.ok,
          status: response.status,
        };
      })
    );

    const successful = results.filter(
      (r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && r.value.success
    ).length;

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: `Notified ${successful}/${SEARCH_ENGINE_PING_URLS.length} search engines`,
        results: results.map((r) => (r.status === 'fulfilled' ? r.value : { error: 'Failed' })),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error pinging search engines:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to ping search engines' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

---

## State Management

No global state management required for SEO features. All SEO data is derived from page context and props.

---

## TypeScript Models

### Schema Types (types/seo.ts)

```typescript
// types/seo.ts
export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  hreflang?: HreflangTag[];
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
}

export interface HreflangTag {
  lang: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface StructuredDataBase {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface LearningResourceSchema extends StructuredDataBase {
  '@type': 'LearningResource';
  name: string;
  description: string;
  url: string;
  image?: string[];
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
    image?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  timeRequired?: string;
  inLanguage?: string;
  isPartOf?: {
    '@type': 'Course';
    name: string;
  };
}

export interface ArticleSchema extends StructuredDataBase {
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  image?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': 'Person';
    name: string;
    url?: string;
    image?: string;
  };
  publisher?: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  inLanguage?: string;
}

export interface QuizSchema extends StructuredDataBase {
  '@type': 'Quiz';
  name: string;
  description: string;
  url: string;
  numberOfQuestions?: number;
  typicalAgeRange?: string;
  inLanguage?: string;
}

export interface BreadcrumbListSchema extends StructuredDataBase {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface OrganizationSchema extends StructuredDataBase {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: {
    '@type': 'ImageObject';
    url: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema extends StructuredDataBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export type SchemaType =
  | LearningResourceSchema
  | ArticleSchema
  | QuizSchema
  | BreadcrumbListSchema
  | OrganizationSchema
  | WebSiteSchema;
```

---

## Utilities

### 1. SEO Utils (lib/seo/seo-utils.ts)

```typescript
// lib/seo/seo-utils.ts
import { SeoMetadata } from '@/types/seo';

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return url;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function generateTitle(title: string, siteName: string = 'Sijil'): string {
  return `${title} | ${siteName}`;
}

export function generateDescription(excerpt: string, maxLength: number = 160): string {
  return truncateText(excerpt.replace(/<[^>]*>/g, ''), maxLength);
}

export function extractKeywords(content: string, tags: string[], limit: number = 10): string[] {
  const uniqueTags = Array.from(new Set(tags.map((t) => t.toLowerCase())));
  return uniqueTags.slice(0, limit);
}

export function formatDateForSeo(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0];
}

export function getImageDimensions(imageUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = imageUrl;
  });
}

export function validateSeoMetadata(metadata: SeoMetadata): string[] {
  const errors: string[] = [];

  if (metadata.title && metadata.title.length > 60) {
    errors.push(`Title too long: ${metadata.title.length} characters (max 60)`);
  }

  if (metadata.description && metadata.description.length > 160) {
    errors.push(`Description too long: ${metadata.description.length} characters (max 160)`);
  }

  if (metadata.keywords && metadata.keywords.length > 20) {
    errors.push(`Too many keywords: ${metadata.keywords.length} (max 20)`);
  }

  return errors;
}

export function createCanonicalUrl(base
