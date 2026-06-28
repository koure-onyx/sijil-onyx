# Phase 05: Topic Detail - Testing Specification

## Manual Verification Tests

### Test 1: Navigate to Topic Detail Page

**Steps:**
1. Start the development server
2. Navigate to `/topics` (Topic List page from Phase 04)
3. Click on any topic card
4. Verify navigation to `/topics/[slug]`

**Expected Results:**
- URL changes to `/topics/[topic-slug]`
- Page loads without errors
- Breadcrumb shows: Home > Topics > [Topic Title]
- Topic header displays title, description, and metadata
- Child topics section appears (if children exist)
- Documents section appears (if documents exist)

---

### Test 2: Breadcrumb Navigation

**Steps:**
1. Navigate to a nested topic (e.g., `/topics/quran/surah/al-baqarah`)
2. Examine breadcrumb trail
3. Click on "Home" in breadcrumb
4. Navigate back to nested topic
5. Click on intermediate topic in breadcrumb

**Expected Results:**
- Breadcrumb shows full hierarchy path
- Each breadcrumb item except current page is clickable
- Clicking breadcrumb items navigates correctly
- Current page item is not clickable (plain text)
- Chevron separators between items
- Mobile: breadcrumb wraps gracefully if too long

---

### Test 3: Topic Header Display

**Steps:**
1. Navigate to various topics (root level, mid-level, leaf level)
2. Examine topic header section
3. Verify metadata display

**Expected Results:**
- Topic title displayed as h1
- Description shown below title (if available)
- Level indicator visible
- Document count displayed
- Child topic count displayed
- Empty states handled (no description, zero counts)

---

### Test 4: Child Topics Grid

**Steps:**
1. Navigate to a topic with child topics
2. Examine child topics grid
3. Count displayed topics
4. Click on a child topic

**Expected Results:**
- Child topics displayed in grid layout
- Each card shows title, description, document count
- Grid responsive (1 col mobile, 2 col tablet, 3 col desktop)
- Clicking child topic navigates to its detail page
- "View all child topics" link if pagination exists
- Empty state shown if no child topics

---

### Test 5: Document List Pagination

**Steps:**
1. Navigate to topic with many documents (>20)
2. Scroll to bottom of document list
3. Use pagination controls
4. Navigate to page 2, then page 3
5. Navigate back to page 1

**Expected Results:**
- Documents displayed in list format
- 20 documents per page (default)
- Pagination controls show current page
- Page numbers clickable
- Previous/Next buttons functional
- Disabled state for boundary pages
- URL updates with page parameter (optional)

---

### Test 6: Loading States

**Steps:**
1. Clear browser cache
2. Enable slow 3G throttling in DevTools
3. Navigate to topic detail page
4. Observe loading skeleton

**Expected Results:**
- Skeleton appears immediately
- Breadcrumb skeleton shows 3 segments
- Header skeleton shows title and description lines
- Child topics skeleton shows 6 cards
- Documents skeleton shows 5 rows
- Skeleton animates smoothly
- Content replaces skeleton when loaded

---

### Test 7: Error State - 404

**Steps:**
1. Navigate to non-existent topic: `/topics/non-existent-slug`
2. Observe error handling

**Expected Results:**
- Custom 404 page displayed
- Message: "Topic not found"
- Link to browse all topics provided
- HTTP status code is 404
- No console errors

---

### Test 8: Error State - Server Error

**Steps:**
1. Simulate server error (stop backend or mock 500)
2. Navigate to topic detail page
3. Click "Try again" button

**Expected Results:**
- Error boundary catches error
- User-friendly error message shown
- "Try again" button resets query
- Console logs error details
- No crash or white screen

---

### Test 9: Empty States

**Steps:**
1. Navigate to topic with no child topics
2. Navigate to topic with no documents
3. Navigate to topic with neither

**Expected Results:**
- "No child topics" message shown (if applicable)
- "No documents in this topic" message shown (if applicable)
- Empty state components styled consistently
- Suggestions to browse other topics
- No broken layouts or missing sections

---

### Test 10: SEO Metadata

**Steps:**
1. Navigate to topic detail page
2. View page source
3. Check meta tags
4. Check structured data
5. Use SEO testing tool

**Expected Results:**
- `<title>` contains topic title + " | Sijil"
- `<meta name="description">` contains topic description
- Open Graph tags present
- JSON-LD structured data present
- Canonical URL set correctly
- No duplicate meta tags

---

### Test 11: Mobile Responsiveness

**Steps:**
1. Open page on mobile device or use DevTools
2. Test at various breakpoints (320px, 375px, 414px, 768px, 1024px)
3. Interact with all elements

**Expected Results:**
- Layout adapts to screen size
- Text readable without zooming
- Touch targets minimum 44x44px
- No horizontal scrolling
- Breadcrumb wraps appropriately
- Grid collapses to single column on mobile
- Footer remains accessible

---

### Test 12: Accessibility - Keyboard Navigation

**Steps:**
1. Navigate to topic detail page
2. Use only keyboard (Tab, Enter, Arrow keys)
3. Tab through all interactive elements
4. Activate links and buttons

**Expected Results:**
- All links focusable with Tab
- Focus order logical (top to bottom, left to right)
- Focus indicators clearly visible
- Enter activates focused links
- Arrow keys navigate breadcrumb (if implemented)
- Skip to content link works
- No keyboard traps

---

### Test 13: Accessibility - Screen Reader

**Steps:**
1. Enable screen reader (NVDA, JAWS, or VoiceOver)
2. Navigate to topic detail page
3. Listen to page announcement
4. Navigate through sections

**Expected Results:**
- Page title announced correctly
- Breadcrumb labeled as "Breadcrumb"
- Headings announce level (heading 1, heading 2)
- Links announce destination
- Sections have proper labels
- Loading states announced
- Images/icons have alt text or are hidden

---

### Test 14: API Integration Verification

**Steps:**
1. Open browser DevTools Network tab
2. Navigate to topic detail page
3. Filter by XHR/Fetch requests
4. Examine API calls

**Expected Results:**
- GET `/api/v1/topics/:slug` called once
- GET `/api/v1/topics/:slug/children` called (if children exist)
- GET `/api/v1/topics/:slug/documents` called
- All requests return 200 status
- Response data matches expected schema
- No failed requests
- Caching headers present

---

### Test 15: Cross-Browser Compatibility

**Steps:**
1. Test in Chrome (latest)
2. Test in Firefox (latest)
3. Test in Safari (latest)
4. Test in Edge (latest)
5. Compare rendering and functionality

**Expected Results:**
- Consistent layout across browsers
- All features functional in all browsers
- No browser-specific bugs
- Fonts render correctly
- Colors consistent
- Animations smooth

---

### Test 16: Performance Metrics

**Steps:**
1. Open Chrome DevTools Lighthouse
2. Run performance audit
3. Record metrics

**Expected Results:**
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- Total Blocking Time < 200ms
- Performance score > 90

---

### Test 17: Deep Linking

**Steps:**
1. Copy URL of specific topic page
2. Open in new incognito window
3. Navigate directly via URL bar

**Expected Results:**
- Page loads correctly from direct URL
- No client-side routing issues
- SSR renders initial content
- SEO crawlers can access content
- Social media preview works

---

### Test 18: Browser Back/Forward

**Steps:**
1. Navigate from topic list to topic detail
2. Click browser back button
3. Click browser forward button
4. Repeat multiple times
5. Navigate deep into hierarchy, then back

**Expected Results:**
- Back button returns to previous page
- Forward button advances correctly
- Page state preserved appropriately
- No unnecessary reloads
- Scroll position restored (if applicable)

---

## Edge Cases

### Edge Case 1: Very Long Topic Title

**Test:** Topic with title exceeding 100 characters

**Expected:** Title truncates gracefully or wraps, no layout breakage

---

### Edge Case 2: Topic with Special Characters

**Test:** Topic title containing &, <, >, ", ', emojis

**Expected:** Characters display correctly, no XSS vulnerabilities, URL encoded properly

---

### Edge Case 3: Extremely Deep Hierarchy

**Test:** Topic at level 5+ in hierarchy

**Expected:** Breadcrumb handles depth (may truncate middle items), no overflow issues

---

### Edge Case 4: Topic with 1000+ Documents

**Test:** Topic with very large document count

**Expected:** Pagination handles large totals, performance acceptable, no timeout

---

### Edge Case 5: Rapid Navigation

**Test:** Click multiple topics rapidly before pages load

**Expected:** Previous requests cancelled, no race conditions, correct page displays

---

### Edge Case 6: Network Interruption

**Test:** Disconnect network mid-load, then reconnect

**Expected:** Error state shown, retry mechanism works, no infinite loading

---

### Edge Case 7: Very Slow Connection

**Test:** Throttle to 2G speed

**Expected:** Loading skeleton persists appropriately, eventual success or timeout error

---

### Edge Case 8: JavaScript Disabled

**Test:** Disable JavaScript in browser

**Expected:** Core content still accessible (SSR), graceful degradation

---

## Regression Tests

After any code changes, verify:

1. ✓ All previous manual tests still pass
2. ✓ No new console errors introduced
3. ✓ Build completes without warnings
4. ✓ TypeScript compilation succeeds
5. ✓ Linting passes
6. ✓ Existing routes unaffected
7. ✓ Shared components still work in other pages
8. ✓ Mobile responsiveness maintained
9. ✓ Accessibility not degraded
10. ✓ Performance metrics stable

---

## API Verification Checklist

Before marking phase complete, verify all API integrations:

- [ ] `/api/v1/topics/:slug` returns correct data structure
- [ ] `/api/v1/topics/:slug/children` returns paginated results
- [ ] `/api/v1/topics/:slug/documents` returns paginated results
- [ ] 404 responses handled correctly
- [ ] 500 responses handled correctly
- [ ] Request parameters sent correctly
- [ ] Response data mapped to TypeScript interfaces
- [ ] Caching strategy working (check Network tab)
- [ ] React Query devtools show correct cache state
- [ ] No unnecessary API calls (double-fetching)

---

## Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ✅ Pass | Full support |
| Firefox | Latest | ✅ Pass | Full support |
| Safari | Latest | ✅ Pass | Full support |
| Edge | Latest | ✅ Pass | Full support |
| Chrome | -2 versions | ✅ Pass | Full support |
| Firefox | -2 versions | ✅ Pass | Full support |
| Safari | -2 versions | ✅ Pass | Full support |
| iOS Safari | Latest | ✅ Pass | Touch optimized |
| Android Chrome | Latest | ✅ Pass | Touch optimized |

---

## Test Completion Criteria

Phase 05 testing is complete when:

1. All 18 manual tests pass
2. All 8 edge cases verified
3. All regression tests pass
4. All API verifications complete
5. Browser compatibility matrix filled
6. Accessibility audit passed
7. Performance benchmarks met
8. Zero critical bugs remaining
9. Test results documented
10. Sign-off from reviewer

---

## Bug Reporting Template

When reporting bugs found during testing:

```markdown
**Bug Title:** [Brief description]

**Severity:** Critical / High / Medium / Low

**Environment:**
- Browser: [Name + Version]
- Device: [Desktop/Mobile/Tablet]
- OS: [Operating System]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Screenshots/Recordings:**
[Attach if applicable]

**Console Errors:**
[Paste any errors]

**Additional Context:**
[Any other relevant info]
```
