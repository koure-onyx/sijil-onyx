# Phase 11: SEO & Discoverability

## Overview

This phase implements comprehensive Search Engine Optimization (SEO) and discoverability features for the Sijil platform. It ensures that all educational content (topics, documents, assessments) is properly indexed by search engines, social media platforms share previews correctly, and the application achieves high visibility in search results.

SEO is implemented as a cross-cutting concern that enhances all previous phases without duplicating their functionality. This phase adds metadata, structured data, sitemaps, and performance optimizations specifically for search engine crawlers.

## Goals

1. **Full Indexability**: Ensure all public content (topics, documents, assessments) is discoverable and indexable by major search engines (Google, Bing, DuckDuckGo).
2. **Rich Snippets**: Implement structured data (Schema.org) to enable rich search results (stars, breadcrumbs, course info).
3. **Social Sharing**: Optimize Open Graph (OG) and Twitter Card metadata for perfect social media previews.
4. **Technical SEO**: Achieve 90+ scores on Core Web Vitals, Lighthouse SEO audit, and mobile-friendliness tests.
5. **Sitemap & Robots**: Generate dynamic XML sitemaps and configure robots.txt for optimal crawler behavior.
6. **Canonical URLs**: Prevent duplicate content issues with proper canonical tags.
7. **Internationalization Ready**: Structure hreflang tags for future multi-language support.
8. **Analytics Integration**: Track organic search traffic, keyword rankings, and crawl errors.

## Deliverables

### Pages & Routes
- `/sitemap.xml` - Dynamic XML sitemap index
- `/sitemap-topics.xml` - Sitemap for topic pages
- `/sitemap-documents.xml` - Sitemap for document pages
- `/sitemap-assessments.xml` - Sitemap for assessment pages
- `/robots.txt` - Crawler directives
- Enhanced metadata for all existing pages (Home, Topic List, Topic Detail, Document Viewer, Assessment)

### Components
- `SeoHead` - Centralized metadata component (Next.js `<Head>` wrapper)
- `StructuredData` - JSON-LD schema generator
- `BreadcrumbSchema` - Breadcrumb structured data
- `SocialSharePreview` - Social media preview tester (dev only)
- `CanonicalLink` - Canonical URL handler
- `HreflangTags` - Multi-language link tags

### Layouts
- `SeoLayout` - Wrapper applying default SEO metadata to all pages
- `ArticleLayout` - Enhanced layout for content pages with article schema

### API Routes
- `GET /api/seo/sitemap/topics` - Generate topics sitemap
- `GET /api/seo/sitemap/documents` - Generate documents sitemap
- `GET /api/seo/sitemap/assessments` - Generate assessments sitemap
- `GET /api/seo/robots` - Serve robots.txt
- `POST /api/seo/ping` - Notify search engines of sitemap updates

### Hooks
- `useSeoMetadata` - Dynamic metadata generator based on page context
- `useStructuredData` - Schema.org JSON-LD generator
- `useCanonicalUrl` - Canonical URL resolver
- `useSocialPreview` - OG/Twitter card data builder

### Utilities
- `seo-utils.ts` - Metadata formatting, URL normalization, schema generators
- `sitemap-generator.ts` - Dynamic sitemap XML builder
- `robots-config.ts` - Robots.txt rule definitions
- `schema-types.ts` - TypeScript types for Schema.org entities

### Configuration
- `next-seo.config.ts` - Global SEO defaults (title template, description, OG images)
- `search-console-verification.html` - Google Search Console verification file
- `bing-site-verification.xml` - Bing Webmaster Tools verification file

### Documentation
- SEO checklist for content creators
- Schema.org implementation guide
- Social media preview guidelines
- Search console setup instructions

## Dependencies

**Required Completed Phases:**
- Phase 01 (Foundation) - Next.js app structure, TypeScript config
- Phase 02 (App Shell) - Root layout, metadata patterns
- Phase 03 (Homepage) - Home page content for SEO optimization
- Phase 04 (Topic List) - Topic listing page metadata
- Phase 05 (Topic Detail) - Topic detail page structured data
- Phase 06 (Document Viewer) - Document page SEO
- Phase 07 (Search) - Search result page indexing rules
- Phase 08 (Assessments) - Assessment page metadata
- Phase 10 (Admin) - Admin tools for SEO management (optional enhancement)

**External Dependencies:**
- `next-seo` or `@next/third-parties/google` (optional, can use native Next.js metadata)
- Google Search Console account
- Bing Webmaster Tools account
- Sitemap submission endpoints (Google, Bing)

## Exit Criteria

✅ All public pages have unique, descriptive title tags (50-60 characters)
✅ All public pages have meta descriptions (150-160 characters)
✅ All content pages implement appropriate Schema.org structured data
✅ Open Graph tags present on all shareable pages with correct images
✅ Twitter Card tags present on all shareable pages
✅ Canonical URLs set on all pages to prevent duplicates
✅ Dynamic XML sitemaps generated and submitted to search engines
✅ robots.txt configured with proper allow/disallow rules
✅ Breadcrumb navigation implemented with structured data
✅ All images have alt text and are optimized for discovery
✅ Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
✅ Mobile-friendly test passes on all page types
✅ No critical SEO errors in Lighthouse audit (score ≥ 90)
✅ Search Console verification files deployed
✅ Social media preview testing tool shows correct previews
✅ 301 redirects configured for any legacy URLs (if applicable)
✅ Hreflang tags structure ready for future localization

## Estimated Effort

- **Implementation**: 4-5 days
- **Testing & Validation**: 2 days
- **Search Engine Submission & Monitoring Setup**: 1 day
- **Total**: 7-8 days

## Success Metrics

- **Lighthouse SEO Score**: ≥ 95/100
- **Indexed Pages**: 100% of public content indexed within 2 weeks
- **Rich Results**: ≥ 80% of eligible pages showing rich snippets
- **Organic Traffic**: Baseline established for future growth tracking
- **Social Click-Through Rate**: ≥ 3% improvement with optimized previews
- **Crawl Errors**: 0 critical errors in Search Console
- **Mobile Usability**: 0 errors in Mobile-Friendly Test

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Duplicate content issues | High | Implement strict canonical URL strategy |
| Slow sitemap generation | Medium | Use incremental generation, caching |
| Structured data validation errors | Medium | Test with Google Rich Results Test before deployment |
| Meta tag conflicts | Low | Centralize SEO logic in SeoHead component |
| Crawler blocking important pages | High | Review robots.txt thoroughly before deployment |
| Social image aspect ratio issues | Low | Define strict image dimension requirements |

## Notes

- SEO is iterative; this phase establishes the foundation, but ongoing optimization based on analytics data is expected.
- All SEO implementations must not compromise accessibility (Phase 13) or performance (Phase 12).
- Private/user-specific content (dashboards, assessments in progress) must NOT be indexed.
- Use `noindex` meta tag for authenticated-only pages.
- Implement `x-robots-tag` headers for non-HTML content (PDFs, exports).
