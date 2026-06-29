# Phase 11: SEO & Discoverability - Manual Tests

## Manual Verification Tests

### Test 1: Sitemap Index Verification
**Steps:**
1. Navigate to `https://sijil.com/sitemap.xml`
2. Verify the XML is well-formed
3. Check that it contains references to all sub-sitemaps (topics, documents, assessments, static)
4. Verify each sitemap URL is accessible

**Expected Results:**
- ✅ Valid XML with proper declaration
- ✅ Contains 4 sitemap entries
- ✅ All referenced sitemaps return 200 status
- ✅ Last modified dates are present

---

### Test 2: Topics Sitemap Content
**Steps:**
1. Navigate to `https://sijil.com/sitemap-topics.xml`
2. Verify XML structure
3. Check that topic URLs follow the pattern `/topics/[slug]`
4. Verify priority and change frequency values

**Expected Results:**
- ✅ Valid XML format
- ✅ Contains all published topics
- ✅ No draft or unpublished topics included
- ✅ Priority values between 0.5-0.9
- ✅ Change frequency set appropriately

---

### Test 3: Robots.txt Validation
**Steps:**
1. Navigate to `https://sijil.com/robots.txt`
2. Verify allow/disallow rules
3. Check sitemap reference
4. Test blocked paths are actually blocked

**Expected Results:**
- ✅ Admin paths disallowed (`/admin`, `/dashboard`)
- ✅ Public paths allowed
- ✅ Sitemap URL correctly referenced
- ✅ Crawl-delay specified

---

### Test 4: Meta Tags on Homepage
**Steps:**
1. Open homepage in browser
2. View page source (Ctrl+U)
3. Search for meta tags
4. Verify title, description, keywords, OG tags

**Expected Results:**
- ✅ Title tag: "Sijil - Learn Anything, Master Everything"
- ✅ Meta description present (150-160 chars)
- ✅ Keywords meta tag present
- ✅ OG:title, OG:description, OG:image present
- ✅ Twitter card tags present
- ✅ Canonical URL set

---

### Test 5: Dynamic Meta Tags on Topic Page
**Steps:**
1. Navigate to any topic detail page
2. View page source
3. Verify dynamic metadata based on topic content

**Expected Results:**
- ✅ Title includes topic name
- ✅ Description matches topic excerpt
- ✅ OG image uses topic cover image
- ✅ Structured data JSON-LD present
- ✅ Article schema type used

---

### Test 6: Structured Data Validation (Google Rich Results)
**Steps:**
1. Copy URL of a topic detail page
2. Visit https://search.google.com/test/rich-results
3. Paste URL and test
4. Review detected structured data

**Expected Results:**
- ✅ No errors detected
- ✅ LearningResource or Article schema recognized
- ✅ All required fields present
- ✅ Rich result eligible

---

### Test 7: Open Graph Preview (Facebook)
**Steps:**
1. Copy URL of a topic page
2. Visit https://developers.facebook.com/tools/debug/
3. Paste URL and debug
4. Review preview

**Expected Results:**
- ✅ Correct title displayed
- ✅ Correct description shown
- ✅ Image displays properly (1200x630)
- ✅ No warnings or errors

---

### Test 8: Twitter Card Preview
**Steps:**
1. Copy URL of a topic page
2. Visit https://cards-dev.twitter.com/validator
3. Paste URL and validate
4. Review card preview

**Expected Results:**
- ✅ Summary large image card displayed
- ✅ Title and description correct
- ✅ Image renders properly
- ✅ No validation errors

---

### Test 9: Canonical URL Verification
**Steps:**
1. Navigate to various pages
2. View source and find canonical link
3. Verify it points to the correct URL without parameters

**Expected Results:**
- ✅ Each page has exactly one canonical tag
- ✅ URL is absolute (includes domain)
- ✅ No query parameters in canonical URL
- ✅ Points to preferred version of page

---

### Test 10: Noindex on Admin Pages
**Steps:**
1. Navigate to admin dashboard (if logged in)
2. View page source
3. Check robots meta tag

**Expected Results:**
- ✅ `<meta name="robots" content="noindex, nofollow">` present
- ✅ Or HTTP header `X-Robots-Tag: noindex, nofollow`

---

### Test 11: Breadcrumb Structured Data
**Steps:**
1. Navigate to a topic detail page
2. View page source
3. Find breadcrumb JSON-LD
4. Validate with Google Rich Results Test

**Expected Results:**
- ✅ BreadcrumbList schema present
- ✅ All breadcrumb items listed
- ✅ Positions are sequential
- ✅ URLs are absolute

---

### Test 12: Hreflang Tags (If Applicable)
**Steps:**
1. If multi-language is enabled, check hreflang tags
2. View page source
3. Verify language alternates

**Expected Results:**
- ✅ Hreflang tags for each language version
- ✅ x-default tag present
- ✅ Correct language codes used
- ✅ URLs are valid

---

### Test 13: Mobile-Friendly Test
**Steps:**
1. Visit https://search.google.com/test/mobile-friendly
2. Enter homepage URL
3. Run test

**Expected Results:**
- ✅ Page is mobile-friendly
- ✅ No viewport issues
- ✅ Text is readable without zooming
- ✅ Tap targets are appropriately sized

---

### Test 14: Core Web Vitals Check
**Steps:**
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run performance audit on homepage
4. Check Core Web Vitals

**Expected Results:**
- ✅ LCP < 2.5s
- ✅ FID < 100ms (or INP < 200ms)
- ✅ CLS < 0.1
- ✅ Overall performance score > 90

---

### Test 15: Search Console Verification Files
**Steps:**
1. Check if verification files exist at root
2. Access `https://sijil.com/google[verification].html`
3. Verify file is accessible

**Expected Results:**
- ✅ Google verification file returns 200
- ✅ Bing verification file returns 200
- ✅ Files contain correct verification codes

---

### Test 16: Sitemap Submission Test
**Steps:**
1. Use the ping API endpoint
2. Send POST request to `/api/seo/ping`
3. Verify response

**Expected Results:**
- ✅ Returns success message
- ✅ Indicates number of search engines notified
- ✅ No errors in response

---

### Test 17: Social Share Preview Component
**Steps:**
1. Navigate to dev-only preview page (if exists)
2. Test different platforms (Facebook, Twitter, LinkedIn)
3. Verify previews match actual social media display

**Expected Results:**
- ✅ Previews accurately represent social cards
- ✅ Images have correct aspect ratios
- ✅ Text truncation works properly

---

### Test 18: Image Alt Text Verification
**Steps:**
1. Browse various pages
2. Inspect images
3. Verify alt attributes

**Expected Results:**
- ✅ All content images have descriptive alt text
- ✅ Decorative images have empty alt (`alt=""`)
- ✅ Alt text is concise but informative

---

### Test 19: URL Structure Verification
**Steps:**
1. Check various page URLs
2. Verify they are clean and descriptive
3. Ensure no session IDs or tracking params in canonical URLs

**Expected Results:**
- ✅ URLs are human-readable
- ✅ Use hyphens as separators
- ✅ No unnecessary parameters
- ✅ Consistent structure across site

---

### Test 20: 404 Page SEO
**Steps:**
1. Navigate to non-existent page
2. View page source
3. Check meta tags and status code

**Expected Results:**
- ✅ Returns 404 status code
- ✅ Has appropriate title ("Page Not Found")
- ✅ Noindex may be applied
- ✅ Custom 404 page is helpful

---

## Regression Tests

### Regression 1: After Content Updates
**Steps:**
1. Update a topic's title or description
2. Rebuild/redeploy site
3. Check that meta tags reflect changes

**Expected Results:**
- ✅ New title appears in meta tags
- ✅ New description in OG tags
- ✅ Structured data updated

---

### Regression 2: After Adding New Topic
**Steps:**
1. Publish a new topic
2. Wait for sitemap regeneration
3. Check sitemap includes new topic

**Expected Results:**
- ✅ New topic URL in sitemap within 1 hour
- ✅ Correct priority assigned
- ✅ Metadata properly generated

---

### Regression 3: After Design Changes
**Steps:**
1. Make layout/CSS changes
2. Verify meta tags still present
3. Check structured data not affected

**Expected Results:**
- ✅ All SEO elements remain intact
- ✅ No broken JSON-LD
- ✅ Meta tags still in head

---

### Regression 4: After Dependency Updates
**Steps:**
1. Update Next.js or SEO-related packages
2. Run build
3. Test all SEO features

**Expected Results:**
- ✅ Sitemaps still generate
- ✅ Meta tags render correctly
- ✅ No console errors

---

### Regression 5: Cross-Browser Compatibility
**Steps:**
1. Test in Chrome, Firefox, Safari, Edge
2. View page source in each
3. Verify meta tags present in all

**Expected Results:**
- ✅ Meta tags consistent across browsers
- ✅ Structured data valid in all
- ✅ No browser-specific issues

---

## API Verification Tests

### API Test 1: Topics Sitemap Endpoint
**Request:**
```bash
curl https://sijil.com/api/seo/sitemap/topics
```

**Expected Response:**
- ✅ Status: 200 OK
- ✅ Content-Type: application/xml
- ✅ Valid XML with topic URLs
- ✅ Cache headers present

---

### API Test 2: Documents Sitemap Endpoint
**Request:**
```bash
curl https://sijil.com/api/seo/sitemap/documents
```

**Expected Response:**
- ✅ Status: 200 OK
- ✅ Content-Type: application/xml
- ✅ Valid XML with document URLs

---

### API Test 3: Assessments Sitemap Endpoint
**Request:**
```bash
curl https://sijil.com/api/seo/sitemap/assessments
```

**Expected Response:**
- ✅ Status: 200 OK
- ✅ Content-Type: application/xml
- ✅ Valid XML with assessment URLs

---

### API Test 4: Robots.txt Endpoint
**Request:**
```bash
curl https://sijil.com/api/seo/robots
```

**Expected Response:**
- ✅ Status: 200 OK
- ✅ Content-Type: text/plain
- ✅ Contains allow/disallow rules
- ✅ Sitemap URL included

---

### API Test 5: Ping Endpoint
**Request:**
```bash
curl -X POST https://sijil.com/api/seo/ping \
  -H "Content-Type: application/json" \
  -d '{"sitemapUrl": "https://sijil.com/sitemap.xml"}'
```

**Expected Response:**
- ✅ Status: 200 OK
- ✅ JSON response with success status
- ✅ Number of search engines notified

---

## Edge Cases

### Edge Case 1: Empty Sitemap
**Scenario:** No topics/documents exist yet

**Steps:**
1. Clear all content (test environment only)
2. Access sitemap endpoint
3. Verify behavior

**Expected Results:**
- ✅ Returns valid XML with root element only
- ✅ No errors thrown
- ✅ Gracefully handles empty state

---

### Edge Case 2: Very Long Titles
**Scenario:** Topic title exceeds 60 characters

**Steps:**
1. Create topic with 100-character title
2. Check generated meta title

**Expected Results:**
- ✅ Title truncated appropriately
- ✅ Truncation happens at word boundary
- ✅ Still includes site name

---

### Edge Case 3: Missing Images
**Scenario:** Topic has no cover image

**Steps:**
1. Create topic without cover image
2. Check OG:image tag

**Expected Results:**
- ✅ Falls back to default OG image
- ✅ No broken image references
- ✅ Still valid for social sharing

---

### Edge Case 4: Special Characters in Titles
**Scenario:** Title contains quotes, ampersands, etc.

**Steps:**
1. Create topic with special characters
2. Check meta tags and structured data

**Expected Results:**
- ✅ Special characters properly escaped
- ✅ Valid XML/JSON output
- ✅ No parsing errors

---

### Edge Case 5: Duplicate Content
**Scenario:** Similar content exists on multiple URLs

**Steps:**
1. Check canonical tags
2. Verify they point to preferred URL

**Expected Results:**
- ✅ Canonical prevents duplicate indexing
- ✅ Consistent canonical strategy

---

### Edge Case 6: Pagination
**Scenario:** Topic list with pagination

**Steps:**
1. Navigate to paginated results
2. Check meta tags on each page

**Expected Results:**
- ✅ Each page has unique title (e.g., "Page 2")
- ✅ Canonical points to correct page
- ✅ Prev/next links if implemented

---

### Edge Case 7: Deleted Content
**Scenario:** Topic is deleted after being indexed

**Steps:**
1. Delete a published topic
2. Access its old URL
3. Check response

**Expected Results:**
- ✅ Returns 404 or 410 status
- ✅ Sitemap updated to remove URL
- ✅ Proper error page shown

---

### Edge Case 8: Concurrent Sitemap Requests
**Scenario:** Multiple requests to sitemap endpoint simultaneously

**Steps:**
1. Send 10 concurrent requests to sitemap API
2. Monitor server logs
3. Check responses

**Expected Results:**
- ✅ All requests succeed
- ✅ No race conditions
- ✅ Consistent output

---

### Edge Case 9: Very Large Sitemap
**Scenario:** 10,000+ topics

**Steps:**
1. Generate sitemap with many URLs
2. Check file size and load time
3. Verify splitting into multiple files if needed

**Expected Results:**
- ✅ Sitemap under 50MB uncompressed
- ✅ If larger, splits into multiple sitemaps
- ✅ Sitemap index used correctly

---

### Edge Case 10: Timezone Issues
**Scenario:** Last modified dates in sitemaps

**Steps:**
1. Check sitemap from different timezones
2. Verify date format

**Expected Results:**
- ✅ Dates in ISO 8601 format
- ✅ Timezone handled correctly
- ✅ Consistent across regions

---

## Performance Tests

### Performance 1: Sitemap Generation Time
**Steps:**
1. Time the sitemap generation API
2. Should complete quickly even with many URLs

**Expected Results:**
- ✅ Generation time < 2 seconds
- ✅ With caching: < 500ms
- ✅ No timeout errors

---

### Performance 2: Meta Tag Rendering
**Steps:**
1. Measure time to first byte (TTFB)
2. Check that meta tags are in initial HTML

**Expected Results:**
- ✅ Meta tags in server-rendered HTML
- ✅ No client-side injection delay
- ✅ TTFB < 600ms

---

### Performance 3: Structured Data Size
**Steps:**
1. Check size of JSON-LD scripts
2. Ensure not bloating page

**Expected Results:**
- ✅ JSON-LD < 5KB per page
- ✅ Minimal impact on page weight
- ✅ Efficient data structure

---

### Performance 4: Multiple Schema Types
**Steps:**
1. Page with multiple structured data types
2. Validate all are parsed correctly

**Expected Results:**
- ✅ All schemas valid
- ✅ No conflicts between types
- ✅ Google can parse all

---

### Performance 5: Cache Effectiveness
**Steps:**
1. Request sitemap multiple times
2. Check cache headers
3. Verify cached responses

**Expected Results:**
- ✅ Cache-Control headers present
- ✅ Subsequent requests served from cache
- ✅ Revalidation after TTL expires

---

## Acceptance Validation

Before marking this phase complete, verify:

- [ ] All 20 manual tests pass
- [ ] All 5 regression tests pass
- [ ] All 5 API tests pass
- [ ] All 10 edge cases handled
- [ ] All 5 performance tests meet targets
- [ ] Google Search Console shows no critical errors
- [ ] Bing Webmaster Tools shows no issues
- [ ] Rich Results Test passes for all content types
- [ ] Mobile-Friendly Test passes
- [ ] Lighthouse SEO score ≥ 95
- [ ] All public pages have unique meta titles
- [ ] All public pages have meta descriptions
- [ ] Structured data validates without errors
- [ ] Social media previews display correctly
- [ ] Sitemaps submitted and accepted
- [ ] Robots.txt properly configured
- [ ] Canonical URLs set on all pages
- [ ] No index coverage issues in Search Console

---

## Sign-off

**Tested By:** ___________________  
**Date:** ___________________  
**Results:** Pass / Fail  

**Notes:**


