# Phase 11: SEO & Discoverability - Implementation Prompt

## Objective

Implement comprehensive SEO features including metadata, structured data (Schema.org), sitemaps, robots.txt, Open Graph tags, and Core Web Vitals optimization.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/11-seo/README.md`
4. `docs/frontend-phases/11-seo/implementation.md`

---

## Files To Create

### Pages/Routes
- `src/app/sitemap.xml/route.tsx` - Dynamic XML sitemap index
- `src/app/robots.txt/route.tsx` - Crawler directives

### Components
- `src/components/seo/seo-head.tsx` - Centralized metadata component
- `src/components/seo/structured-data.tsx` - JSON-LD schema generator
- `src/components/seo/breadcrumb-schema.tsx` - Breadcrumb structured data
- `src/components/seo/canonical-link.tsx` - Canonical URL handler
- `src/components/seo/hreflang-tags.tsx` - Multi-language link tags

### Layouts
- Enhanced metadata for all existing pages

### API Routes
- `src/app/api/seo/sitemap/topics/route.ts` - Topics sitemap
- `src/app/api/seo/sitemap/documents/route.ts` - Documents sitemap
- `src/app/api/seo/sitemap/assessments/route.ts` - Assessments sitemap

### Hooks
- `src/hooks/use-seo-metadata.ts` - Dynamic metadata generator

---

## Rules

**Critical:**
- Full indexability for all public content
- Rich snippets with Schema.org structured data
- Open Graph and Twitter Card metadata
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Dynamic XML sitemaps
- Proper canonical URLs
- hreflang ready for future i18n

---

## Stop Conditions

✓ All content indexable by search engines
✓ Structured data valid (Google Rich Results Test)
✓ Open Graph tags working
✓ Sitemaps generated dynamically
✓ robots.txt configured
✓ Core Web Vitals passing

**DO NOT continue to:** Performance (Phase 12), Testing (Phase 13)

---

## Deliverables

**Files Created:** SEO components, sitemaps, metadata
**Tests Run:** Build, type-check, lint, Lighthouse audit
**Acceptance:** All Phase 11 exit criteria met

**Estimated Effort:** 2-3 days

**Complexity:** Medium
