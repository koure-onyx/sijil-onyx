# Phase 02: App Shell - Tests

## Manual Verification Tests

### Test 1: Desktop Header Display

**Steps:**
1. Open application in desktop browser (width ≥ 1024px)
2. Scroll page up and down

**Expected Results:**
- ✓ Header remains visible at top of viewport (sticky)
- ✓ Background has subtle blur effect on scroll
- ✓ Logo displays on left side
- ✓ Navigation links visible in center
- ✓ Search icon and theme toggle visible on right
- ✓ No layout shift during scroll

---

### Test 2: Mobile Header Display

**Steps:**
1. Resize browser to mobile width (< 768px) or use device emulator
2. Observe header

**Expected Results:**
- ✓ Desktop navigation links hidden
- ✓ Hamburger menu button visible on right
- ✓ Logo still visible on left
- ✓ Theme toggle still visible
- ✓ Header height remains consistent (h-16)

---

### Test 3: Mobile Menu Opening

**Steps:**
1. On mobile viewport, click hamburger menu button
2. Observe animation

**Expected Results:**
- ✓ Dark backdrop fades in smoothly
- ✓ Menu panel slides in from left
- ✓ Animation completes within 300ms
- ✓ Menu covers ~75% of screen width
- ✓ Close button (X) visible in top-left of menu
- ✓ Navigation links visible and clickable

---

### Test 4: Mobile Menu Closing

**Steps:**
1. With mobile menu open, click backdrop area
2. Reopen menu, click close button (X)
3. Reopen menu, click a navigation link

**Expected Results:**
- ✓ Backdrop click closes menu with slide-out animation
- ✓ Close button click closes menu
- ✓ Navigation link click closes menu AND navigates to page
- ✓ All animations smooth (no jank)

---

### Test 5: Footer Display (Desktop)

**Steps:**
1. Navigate to homepage
2. Scroll to bottom of page
3. Observe footer on desktop width

**Expected Results:**
- ✓ Footer appears below main content
- ✓ 4 columns displayed side-by-side
- ✓ Brand column shows logo and tagline
- ✓ Quick Links column shows 3+ links
- ✓ Subjects column lists 4 subjects
- ✓ Legal column shows Privacy and Terms links
- ✓ Copyright text centered at bottom
- ✓ Top border visible above footer

---

### Test 6: Footer Display (Mobile)

**Steps:**
1. Resize to mobile width (< 768px)
2. Observe footer

**Expected Results:**
- ✓ Columns stack vertically (single column)
- ✓ All content readable without horizontal scroll
- ✓ Adequate spacing between sections (gap-8)
- ✓ Copyright text still centered

---

### Test 7: Theme Toggle

**Steps:**
1. Click theme toggle button in header
2. Observe color change
3. Refresh page
4. Click again to switch back

**Expected Results:**
- ✓ Colors invert immediately on click
- ✓ No flash of wrong theme on reload
- ✓ Theme preference persists after refresh
- ✓ Icon reflects current theme (sun/moon)

---

### Test 8: Keyboard Navigation

**Steps:**
1. Press Tab key repeatedly starting from page load
2. Observe focus indicators

**Expected Results:**
- ✓ Focus moves in logical order (header → nav → main → footer)
- ✓ Visible focus ring on each interactive element
- ✓ Skip-to-content link appears on first Tab press
- ✓ Skip link moves focus to main content when activated
- ✓ Mobile menu button reachable via Tab

---

### Test 9: Mobile Menu Accessibility

**Steps:**
1. Enable screen reader (NVDA/VoiceOver)
2. Open mobile menu
3. Navigate inside menu

**Expected Results:**
- ✓ Screen reader announces "Menu expanded" or similar
- ✓ Close button labeled as "Close menu"
- ✓ Navigation links announced clearly
- ✓ Focus trapped inside menu (cannot tab outside)
- ✓ Closing menu returns focus to trigger button

---

### Test 10: Responsive Breakpoints

**Steps:**
1. Use browser dev tools to test exact breakpoints
2. Test at 767px, 768px, 769px

**Expected Results:**
- ✓ At 767px: Mobile menu trigger visible, desktop nav hidden
- ✓ At 768px: Desktop nav visible, mobile trigger hidden
- ✓ Clean transition with no overlapping elements
- ✓ No horizontal scrollbar at any width

---

### Test 11: Z-Index Layering

**Steps:**
1. Open any modal or dropdown (from future phases)
2. Observe layering relative to header

**Expected Results:**
- ✓ Modals appear above header (z-index higher than 50)
- ✓ Mobile menu backdrop covers entire viewport
- ✓ Header appears above page content
- ✓ No unexpected clipping or overlap

---

### Test 12: Performance Check

**Steps:**
1. Open Chrome DevTools → Lighthouse
2. Run performance audit
3. Check layout shift metrics

**Expected Results:**
- ✓ CLS (Cumulative Layout Shift) < 0.1
- ✓ No layout shift on theme toggle
- ✓ No layout shift on mobile menu open/close
- ✓ Header does not cause reflow on scroll

---

## Regression Tests

### After Future Phase Updates:

1. **After Phase 03 (Homepage):** Verify header/footer still wrap homepage correctly
2. **After Phase 04 (Topic List):** Verify header doesn't overlap topic list content
3. **After Phase 07 (Search):** Verify search modal appears above header
4. **After any CSS changes:** Verify responsive breakpoints still work

---

## API Verification

Not applicable - No API calls in this phase.

---

## Edge Cases

### Edge Case 1: Very Long Page Content

**Test:** Create page with 10x viewport height content

**Expected:** Footer stays at bottom of content, not fixed to viewport bottom

---

### Edge Case 2: Very Short Page Content

**Test:** Create page with minimal content (less than viewport height)

**Expected:** Footer sticks to bottom of viewport (sticky footer behavior)

---

### Edge Case 3: Rapid Mobile Menu Toggling

**Test:** Click hamburger button rapidly (5+ times in 2 seconds)

**Expected:** No animation glitches, menu state remains consistent

---

### Edge Case 4: Theme Toggle During Navigation

**Test:** Click theme toggle while page is loading

**Expected:** Theme applies correctly, no flash of wrong theme

---

### Edge Case 5: Browser Back Button

**Test:** Open mobile menu, navigate to page, press browser back button

**Expected:** Returns to previous page with menu closed

---

### Edge Case 6: Orientation Change

**Test:** On real mobile device, rotate from portrait to landscape

**Expected:** Menu closes gracefully, layout adapts without overflow

---

### Edge Case 7: Font Loading

**Test:** Clear cache, load page with network throttling

**Expected:** Fallback fonts display until custom fonts load, no FOIT (Flash of Invisible Text)

---

### Edge Case 8: Reduced Motion Preference

**Test:** Set OS preference to "Reduce Motion", open mobile menu

**Expected:** Menu opens instantly without slide animation (respects prefers-reduced-motion)

---

## Browser Compatibility Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Pass |
| Firefox | Latest | ✅ Pass |
| Safari | Latest | ✅ Pass |
| Edge | Latest | ✅ Pass |
| Chrome Mobile | Latest | ✅ Pass |
| Safari iOS | Latest | ✅ Pass |

---

## Performance Benchmarks

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Paint | < 1.0s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Total Bundle Size (shell) | < 100KB | Webpack Bundle Analyzer |
