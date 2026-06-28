# Sijil — Frontend Discovery: SEO Requirements

**Generated:** 2026-06-27  
**Source Files:** `src/controllers/seo.controller.js`, `src/services/seo/`, model SEO fields

---

## Overview

Sijil has comprehensive SEO/AEO/GEO (Search Engine Optimization / Answer Engine Optimization / Generative Engine Optimization) capabilities built into the backend. This document outlines all frontend SEO responsibilities.

---

## Backend SEO Services

### Files Analyzed
- `src/controllers/seo.controller.js` — SEO endpoint handlers
- `src/services/seo/jsonld.service.js` — JSON-LD generation
- `src/services/seo/sitemap.service.js` — Sitemap generation
- `src/services/seo/aeo.service.js` — Answer Engine Optimization

---

## SEO Data Sources

### Topic Model SEO Fields

**File:** `src/models/topic.model.js`

```javascript
seo: {
  meta_title: String,           // <title> tag
  meta_description: String,     // <meta name="description">
  canonical_url: String,        // <link rel="canonical">
  focus_keyword: String,        // Primary keyword
  keywords: [String],           // Meta keywords
  breadcrumb: [{                // Breadcrumb structured data
    name: String,
    url: String
  }],
  json_ld_types: [String]       // Types to generate
}
```

### Topic Model GEO Fields

```javascript
geo: {
  llm_summary: String,                    // LLM-generated summary
  authoritative_source: String,           // Source attribution
  citation_format: String,                // Citation style
  entity_name: String,                    // Entity for knowledge graph
  entity_type: String,                    // Entity type
  trustworthiness_signals: {              // E-E-A-T signals
    expertise: String,
    experience: String,
    authoritativeness: String,
    trustworthiness: String
  },
  source_citations: [{
    verbatim_quote: String,
    page_number: Number,
    context: String
  }]
}
```

---

## SEO Endpoints

### GET /api/seo/topic/:topicId/jsonld

**Purpose:** Generate JSON-LD structured data for a topic

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Vernier Callipers",
    "description": "Learn about vernier callipers...",
    "url": "https://sijil.com/topics/slug/...",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    },
    "hasPart": [...],
    "educationalLevel": "Grade 9",
    "inLanguage": "en"
  }
}
```

**Frontend Responsibility:**
1. Fetch on topic page load (non-blocking)
2. Inject into `<head>` as `<script type="application/ld+json">`
3. Update on client-side navigation

---

### GET /api/seo/document/:documentId/jsonld

**Purpose:** Generate JSON-LD for entire document/textbook

**Response:** Similar structure with `@type: Book` or `EducationalOccupationalProgram`

**Frontend Responsibility:** Inject on document detail pages

---

### GET /api/seo/sitemap-index.xml

**Purpose:** Root sitemap index pointing to paginated sitemaps

**Response:** XML content
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://sijil.com/api/seo/sitemap-0.xml</loc>
    <lastmod>2026-06-27</lastmod>
  </sitemap>
  <!-- More sitemaps -->
</sitemapindex>
```

**Frontend Responsibility:** None (search engines access directly)

---

### GET /api/seo/sitemap-:page.xml

**Purpose:** Paginated sitemap with topic URLs

**Response:** XML with up to 1000 URLs per page
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sijil.com/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers</loc>
    <lastmod>2026-06-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- More URLs -->
</urlset>
```

**Frontend Responsibility:** None

---

### GET /api/seo/sitemap/stats

**Purpose:** Get sitemap statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "total_urls": 5000,
    "total_pages": 5,
    "last_generated": "2026-06-27T10:00:00Z"
  }
}
```

**Frontend Responsibility:** Display in admin dashboard (optional)

---

### GET /api/seo/topic/:topicId/aeo

**Purpose:** Get Answer Engine Optimization data for featured snippets

**Response:**
```json
{
  "success": true,
  "data": {
    "primary_question": "What is a vernier calliper?",
    "featured_snippet_block": "A vernier calliper is a precision measuring instrument...",
    "faq": [
      {
        "question": "How do you read a vernier calliper?",
        "answer": "To read a vernier calliper..."
      }
    ],
    "ai_answer_hub": [
      {
        "question_intent": "definition",
        "answer_markdown": "**Vernier Calliper**: A precision instrument...",
        "answer_plain": "Vernier Calliper is a precision instrument...",
        "answer_type": "definition"
      }
    ]
  }
}
```

**Frontend Responsibility:**
1. Use `featured_snippet_block` for meta description fallback
2. Render FAQ section with proper schema markup
3. Optimize content structure for voice search

---

### GET /api/seo/topic/:topicId/aeo/score

**Purpose:** Get AEO readiness score

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 0.85,
    "max_score": 1.0,
    "missing_fields": ["author_info", "review_date"],
    "recommendations": [
      "Add author credentials",
      "Include last reviewed date"
    ]
  }
}
```

**Frontend Responsibility:** Display in admin interface for content quality monitoring

---

## Frontend SEO Implementation Checklist

### 1. Meta Tags (Per Page)

**Component:** `<MetaTags />`

**Required Tags:**
```jsx
<title>{seo.meta_title}</title>
<meta name="description" content={seo.meta_description} />
<meta name="keywords" content={seo.keywords?.join(', ')} />
<link rel="canonical" href={seo.canonical_url} />
<meta name="robots" content="index, follow" />
```

**Optional Tags:**
```jsx
<meta name="author" content={document.authors?.join(', ')} />
<meta property="article:published_time" content={topic.created_at} />
<meta property="article:modified_time" content={topic.updated_at} />
```

---

### 2. Open Graph Tags

**Component:** `<OpenGraphTags />`

```jsx
<meta property="og:type" content="website" />
<meta property="og:url" content={currentUrl} />
<meta property="og:title" content={seo.meta_title} />
<meta property="og:description" content={seo.meta_description} />
<meta property="og:image" content={topic.featured_image || defaultOgImage} />
<meta property="og:site_name" content="Sijil" />
```

---

### 3. Twitter Card Tags

**Component:** `<TwitterCardTags />`

```jsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={seo.meta_title} />
<meta name="twitter:description" content={seo.meta_description} />
<meta name="twitter:image" content={topic.featured_image || defaultOgImage} />
```

---

### 4. JSON-LD Structured Data

**Component:** `<JsonLdScript />`

**Implementation:**
```jsx
useEffect(() => {
  fetch(`/api/seo/topic/${topicId}/jsonld`)
    .then(res => res.json())
    .then(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data.data);
      document.head.appendChild(script);
      
      return () => document.head.removeChild(script);
    });
}, [topicId]);
```

**Types to Support:**
- `LearningResource` — Main topic type
- `Book` — Document/textbook type
- `BreadcrumbList` — Navigation breadcrumbs
- `FAQPage` — FAQ sections
- `Question` / `Answer` — Individual Q&A
- `Article` — Content articles
- `EducationalOccupationalProgram` — Courses

---

### 5. Breadcrumb Navigation

**Component:** `<Breadcrumb />`

**Data Source:** `seo.breadcrumb` array

**Schema Markup:**
```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": seo.breadcrumb.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
}
</script>
```

---

### 6. FAQ Schema

**Component:** `<FAQSection />`

**Data Source:** `topic_content.faq` array

**Schema Markup:**
```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faq.map(qa => ({
    "@type": "Question",
    "name": qa.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": qa.answer
    }
  }))
}
</script>
```

---

### 7. Content Structure for AEO

**Best Practices:**
1. **Direct Answers:** Place concise answers (40-60 words) early in content
2. **Question Headings:** Use question-format H2/H3 headings
3. **Lists:** Use ordered/unordered lists for step-by-step content
4. **Tables:** Use tables for comparison data
5. **Bold Key Terms:** Highlight important terminology

**Implementation:** Block renderer should preserve semantic HTML structure

---

### 8. Image SEO

**Requirements:**
- Always include `alt` text from `figures.alt`
- Use descriptive filenames (from `image_path_local`)
- Include `figure.caption` as visible caption
- Add `figure.figure_number` for reference

**Schema:**
```jsx
<ImageObject
  contentUrl={figure.image_url}
  caption={figure.caption}
  alt={figure.alt}
/>
```

---

### 9. Internal Linking

**Strategy:**
- Link to related topics using `slug_global`
- Use descriptive anchor text from `fallback_anchor_text`
- Implement cross-concept links from `entity_extraction.cross_concept_links`

**Component:** `<ContentLink />`
```jsx
<Link to={`/topics/slug/${link.slug_ref}`}>
  {link.fallback_anchor_text || link.target_entity}
</Link>
```

---

### 10. Mobile Optimization

**Requirements:**
- Responsive viewport meta tag
- Touch-friendly tap targets (min 44x44px)
- Readable font sizes (min 16px body)
- Fast Core Web Vitals scores

**Meta:**
```jsx
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

### 11. Performance for SEO

**Core Web Vitals Targets:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization Strategies:**
1. **Lazy Loading:** Images, code blocks below fold
2. **Preloading:** Critical CSS, fonts, next topic data
3. **Caching:** SWR strategy for API responses
4. **Code Splitting:** Per-route component loading

---

### 12. URL Structure

**Pattern:** `/topics/slug/:slug_global`

**Slug Format:** `{country}-{curriculum}-{subject}-{grade}-ch{chapter}-{topic}`

**Example:** `/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers`

**SEO Benefits:**
- Hierarchical structure
- Keyword-rich
- Human-readable
- Stable (redirects handle changes)

---

### 13. Sitemap Submission

**Automated:**
- Backend generates sitemaps continuously
- Submit sitemap index URL to Google Search Console
- Bing Webmaster Tools
- Other search engines

**Frontend Role:** None (backend handles generation)

---

### 14. Robots.txt

**Recommended:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://sijil.com/api/seo/sitemap-index.xml
```

---

### 15. Error Handling for SEO

**404 Page:**
- Return proper 404 status code
- Include slug resolution check
- Provide search and navigation alternatives
- Custom 404 page (not soft 404)

**Redirects:**
- Use 301 for permanent slug changes
- Update via `/api/utility/slug/resolve`
- Client-side history update after resolution

---

## AEO Score Monitoring

**Admin Dashboard Widget:**

Display AEO scores for content quality monitoring:

```jsx
<AeoScoreCard topicId={topicId} />
```

**Metrics to Show:**
- Overall score (0-100%)
- Missing fields list
- Recommendations
- Trend over time

---

## GEO (Generative Engine Optimization)

**Purpose:** Optimize for AI crawlers (ChatGPT, Claude, Perplexity, etc.)

**Implementation:**
1. **Entity Extraction:** Use `geo.entity_name` and `geo.entity_type`
2. **Authoritative Citations:** Include `geo.source_citations`
3. **Trust Signals:** Display `geo.trustworthiness_signals`
4. **LLM Summary:** Use `geo.llm_summary` for quick answers

**Component:** `<GeoMetadata />`
```jsx
<meta name="entity-name" content={geo.entity_name} />
<meta name="entity-type" content={geo.entity_type} />
<meta name="authoritative-source" content={geo.authoritative_source} />
```

---

## Testing & Validation

### Tools to Use
1. **Google Rich Results Test** — Validate structured data
2. **Google Search Console** — Monitor indexing
3. **Lighthouse** — Performance audit
4. **Schema.org Validator** — JSON-LD validation
5. **Facebook Sharing Debugger** — Open Graph preview
6. **Twitter Card Validator** — Twitter card preview

### Manual Checks
- [ ] Meta titles unique per page
- [ ] Descriptions compelling and within 150-160 chars
- [ ] Canonical URLs correct
- [ ] JSON-LD validates without errors
- [ ] Breadcrumbs display correctly
- [ ] Images have alt text
- [ ] Internal links use descriptive anchors
- [ ] Mobile responsive
- [ ] Page speed acceptable

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [03-model-dictionary.md](./03-model-dictionary.md) — SEO field definitions
- [04-form-dictionary.md](./04-form-dictionary.md) — Ingest schema SEO fields
