# Phase 03: Homepage - Tests

## Manual Verification Tests

### Test 1: Hero Section Display

**Steps:**
1. Navigate to homepage (`/`)
2. Observe hero section at top of page

**Expected Results:**
- ✓ Badge displays "Pakistani Curriculum"
- ✓ H1 headline reads clearly with highlighted text
- ✓ Subtitle/description visible and readable
- ✓ Two CTA buttons displayed ("Browse Documents" and "Search Content")
- ✓ Gradient background visible
- ✓ Text centered on desktop, left-aligned on mobile

---

### Test 2: Stats Section Data Loading

**Steps:**
1. Load homepage
2. Watch stats section load
3. Verify numbers displayed

**Expected Results:**
- ✓ Skeleton appears during loading
- ✓ Numbers populate within 2 seconds
- ✓ Four stats displayed (Documents, Topics, Subjects, Grades)
- ✓ Numbers formatted correctly (e.g., "1,234" not "1234")
- ✓ Primary color used for stat values
- ✓ Labels readable under each stat

---

### Test 3: Collections Grid Display

**Steps:**
1. Scroll to collections section
2. Count subject cards
3. Verify each card content

**Expected Results:**
- ✓ Section title "Browse by Subject" visible
- ✓ All subjects from API displayed (minimum 8)
- ✓ Each card shows subject name
- ✓ Each card shows "Grades 9-12 available"
- ✓ Each card has icon representing subject
- ✓ "Explore" button on each card
- ✓ Cards arranged in grid (responsive)

---

### Test 4: Subject Card Hover Effects

**Steps:**
1. Hover over any subject card on desktop
2. Observe visual changes

**Expected Results:**
- ✓ Shadow increases on hover
- ✓ Card lifts slightly (transform)
- ✓ "Explore" button changes background color
- ✓ Arrow icon animates or shifts
- ✓ Transition smooth (300ms)
- ✓ Effect reverses on mouse leave

---

### Test 5: Featured Content Section

**Steps:**
1. Scroll to "Recently Added" section
2. Verify document cards displayed

**Expected Results:**
- ✓ Section title "Recently Added" visible
- ✓ "View All →" link in top right
- ✓ Maximum 6 document cards shown
- ✓ Each card shows subject badge
- ✓ Each card shows document title (truncated if long)
- ✓ Each card shows grade and type
- ✓ Each card shows topic count and date
- ✓ "View Details" button on each card

---

### Test 6: Document Card Layout

**Steps:**
1. Examine individual document card
2. Verify information hierarchy

**Expected Results:**
- ✓ Subject badge at top (secondary variant)
- ✓ Title uses CardTitle component
- ✓ Grade and type in description
- ✓ Topic count with FileText icon
- ✓ Date with Calendar icon
- ✓ All text properly aligned
- ✓ No overflow or clipping

---

### Test 7: CTA Section Display

**Steps:**
1. Scroll to bottom of homepage
2. Observe final CTA section

**Expected Results:**
- ✓ Full-width background (primary color)
- ✓ White text on colored background
- ✓ Headline "Ready to Start Learning?"
- ✓ Descriptive paragraph below headline
- ✓ Two buttons: "Browse Collection" (secondary) and "Advanced Search" (outline)
- ✓ Content centered horizontally
- ✓ Adequate padding top/bottom

---

### Test 8: Mobile Responsiveness

**Steps:**
1. Resize browser to mobile width (< 768px)
2. Scroll through entire homepage

**Expected Results:**
- ✓ Hero: Stacked layout, full-width text
- ✓ Hero CTAs: Stacked vertically
- ✓ Stats: 2 columns instead of 4
- ✓ Collections: 1 column (cards stack)
- ✓ Featured: 1 column (cards stack)
- ✓ CTA: Single column, stacked buttons
- ✓ No horizontal scrolling
- ✓ Touch targets ≥ 44px

---

### Test 9: Tablet Responsiveness

**Steps:**
1. Resize browser to tablet width (768px - 1024px)
2. Observe layout changes

**Expected Results:**
- ✓ Hero: Centered with max-width
- ✓ Stats: 4 columns
- ✓ Collections: 2 columns
- ✓ Featured: 2 columns
- ✓ CTA: Centered content
- ✓ Smooth transitions at breakpoints

---

### Test 10: Navigation Links

**Steps:**
1. Click "Browse Documents" button in hero
2. Go back, click "Search Content"
3. Go back, click any subject card
4. Go back, click any document card
5. Go back, click "View All" in featured
6. Go back, click CTA buttons

**Expected Results:**
- ✓ "Browse Documents" → `/documents`
- ✓ "Search Content" → `/search`
- ✓ Subject card → `/subjects/[subject]`
- ✓ Document card → `/documents/[id]`
- ✓ "View All" → `/documents`
- ✓ CTA buttons navigate correctly
- ✓ All links work without 404

---

### Test 11: Loading State Behavior

**Steps:**
1. Clear browser cache
2. Hard refresh homepage (Ctrl+Shift+R)
3. Observe loading sequence

**Expected Results:**
- ✓ Stats skeleton appears immediately
- ✓ Content replaces skeleton smoothly
- ✓ No layout shift when content loads
- ✓ All sections load within 3 seconds
- ✓ No flashing or flickering

---

### Test 12: Empty State Handling

**Steps:**
1. Simulate empty API response (use dev tools or mock)
2. Reload homepage

**Expected Results:**
- ✓ Stats section shows zeros or hides gracefully
- ✓ Collections shows message if no subjects
- ✓ Featured section shows "No documents yet" message
- ✓ No broken images or undefined errors
- ✓ Empty state has appropriate icon and text

---

### Test 13: SEO Metadata Verification

**Steps:**
1. View page source (Ctrl+U)
2. Check `<head>` section
3. Use Facebook Sharing Debugger or similar tool

**Expected Results:**
- ✓ `<title>` contains "Sijil" and keywords
- ✓ `<meta name="description">` present (150-160 chars)
- ✓ `<meta name="keywords">` present
- ✓ Open Graph tags (`og:title`, `og:description`, `og:type`)
- ✓ Twitter Card tags (`twitter:card`, `twitter:title`)
- ✓ Canonical URL present
- ✓ JSON-LD structured data in `<script>` tag

---

### Test 14: Accessibility - Keyboard Navigation

**Steps:**
1. Press Tab repeatedly from page load
2. Navigate through all interactive elements
3. Press Enter on focused buttons

**Expected Results:**
- ✓ Focus order follows visual layout
- ✓ Visible focus ring on all elements
- ✓ Skip link works (jumps to main content)
- ✓ All buttons activatable with Enter
- ✓ No keyboard traps
- ✓ Focus moves logically between sections

---

### Test 15: Accessibility - Screen Reader

**Steps:**
1. Enable NVDA (Windows) or VoiceOver (Mac)
2. Navigate through homepage
3. Listen to announcements

**Expected Results:**
- ✓ Page title announced correctly
- ✓ Headings announced with level (H1, H2, etc.)
- ✓ Links announced with descriptive text
- ✓ Images have alt text or are marked decorative
- ✓ Stats section announced as landmark
- ✓ No "click here" or vague link text

---

### Test 16: Color Contrast

**Steps:**
1. Use axe DevTools or similar extension
2. Run accessibility audit
3. Check contrast ratios

**Expected Results:**
- ✓ All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- ✓ Button text contrasts with background
- ✓ Link text contrasts with background
- ✓ Badge text contrasts with background
- ✓ No contrast violations reported

---

### Test 17: Performance Metrics

**Steps:**
1. Open Chrome DevTools → Lighthouse
2. Run performance audit
3. Review metrics

**Expected Results:**
- ✓ Performance score ≥ 90
- ✓ First Contentful Paint < 1.5s
- ✓ Largest Contentful Paint < 2.5s
- ✓ Time to Interactive < 3.0s
- ✓ Cumulative Layout Shift < 0.1
- ✓ Total Blocking Time < 200ms

---

### Test 18: Cross-Browser Testing

**Steps:**
1. Test homepage in Chrome, Firefox, Safari, Edge
2. Compare rendering

**Expected Results:**
- ✓ Consistent layout across browsers
- ✓ Fonts render correctly in all browsers
- ✓ Colors match design system
- ✓ Animations work smoothly
- ✓ No browser-specific bugs

---

## Regression Tests

### After Future Updates:

1. **After Phase 04 (Topic List):** Verify homepage links to topic list still work
2. **After Phase 07 (Search):** Verify search CTA integrates with actual search
3. **After theme changes:** Verify colors still contrast properly
4. **After API changes:** Verify stats still display correctly
5. **After adding new subjects:** Verify grid expands correctly

---

## API Verification

### GET /api/documents/aggregates

**Test:**
1. Open Network tab in DevTools
2. Reload homepage
3. Find aggregates request

**Expected:**
- ✓ Request sent to `/api/documents/aggregates`
- ✓ Response returns 200 OK
- ✓ Response contains documents, topics, subjects, grades
- ✓ Values are numbers (not strings)
- ✓ Response time < 500ms

---

### GET /api/subjects

**Test:**
1. Observe network requests
2. Find subjects request

**Expected:**
- ✓ Request sent to `/api/subjects`
- ✓ Response returns array of strings
- ✓ Array contains minimum 4 subjects
- ✓ Subject names capitalized correctly
- ✓ Cached by Next.js ISR

---

### GET /api/documents?limit=6&sort=-createdAt

**Test:**
1. Observe network requests
2. Find documents request

**Expected:**
- ✓ Request includes `limit=6` parameter
- ✓ Request includes `sort=-createdAt` parameter
- ✓ Response contains results array
- ✓ Each document has required fields (id, title, subject, grade)
- ✓ Documents sorted newest first

---

## Edge Cases

### Edge Case 1: Very Long Subject Name

**Test:** Subject name with 20+ characters

**Expected:** Card handles gracefully, text wraps or truncates

---

### Edge Case 2: Very Long Document Title

**Test:** Document title with 50+ characters

**Expected:** Title truncated with ellipsis (line-clamp-2), no layout break

---

### Edge Case 3: Zero Stats

**Test:** API returns all zeros

**Expected:** Displays "0" or "No data" gracefully, no broken UI

---

### Edge Case 4: Slow API Response (> 5s)

**Test:** Throttle network to slow 3G

**Expected:** Skeleton remains visible, no timeout error shown to user

---

### Edge Case 5: API Returns 500 Error

**Test:** Simulate server error

**Expected:** Shows fallback content or error message, page still usable

---

### Edge Case 6: No Recent Documents

**Test:** Database has no documents

**Expected:** Shows empty state with helpful message, not blank space

---

### Edge Case 7: Extremely Wide Browser Window (> 2560px)

**Test:** Resize to very wide viewport

**Expected:** Content stays centered with max-width, doesn't stretch unnaturally

---

### Edge Case 8: Browser Zoom (150%+)

**Test:** Zoom browser to 150%, 200%

**Expected:** Content reflows correctly, no overlap or clipping

---

### Edge Case 9: Dark Mode Toggle During Load

**Test:** Toggle theme while page is loading

**Expected:** Theme applies correctly, no flash of wrong colors

---

### Edge Case 10: Multiple Rapid Refreshes

**Test:** Refresh page 5 times rapidly

**Expected:** No rate limiting errors, consistent data displayed

---

## Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ✅ Pass | Reference browser |
| Firefox | Latest | ✅ Pass | Verify font rendering |
| Safari | Latest | ✅ Pass | Test on macOS and iOS |
| Edge | Latest | ✅ Pass | Chromium-based |
| Chrome Mobile | Latest | ✅ Pass | Android testing |
| Safari iOS | Latest | ✅ Pass | iPhone and iPad |
| Samsung Internet | Latest | ✅ Pass | Android alternative |

---

## Performance Benchmarks

| Metric | Target | Good | Needs Improvement |
|--------|--------|------|-------------------|
| First Paint | < 1.0s | < 1.8s | > 3.0s |
| Largest Contentful Paint | < 2.5s | < 4.0s | > 4.0s |
| Time to Interactive | < 3.0s | < 5.0s | > 7.0s |
| Cumulative Layout Shift | < 0.1 | < 0.25 | > 0.25 |
| Total Bundle Size | < 300KB | < 500KB | > 500KB |
| API Response Time | < 500ms | < 1000ms | > 1000ms |
| Lighthouse Score | > 90 | > 75 | < 75 |

---

## Visual Regression Checklist

Compare against design mockups:

- [ ] Hero section matches design
- [ ] Typography scale correct
- [ ] Color palette matches design tokens
- [ ] Spacing consistent (8px grid)
- [ ] Border radius consistent
- [ ] Shadow depths correct
- [ ] Icon sizes consistent
- [ ] Button styles match design system
- [ ] Card layouts match designs
- [ ] Responsive breakpoints correct
