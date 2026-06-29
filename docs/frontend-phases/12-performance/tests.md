# Phase 12: Performance & Optimization - Tests

## Manual Verification Tests

### 1. Core Web Vitals Measurement
**Test ID:** PERF-001  
**Purpose:** Verify Core Web Vitals meet targets  
**Steps:**
1. Open Chrome DevTools > Lighthouse
2. Run performance audit on homepage
3. Check LCP, FID, CLS, INP values
4. Run on mobile and desktop presets

**Expected Results:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- INP < 200ms
- Overall performance score ≥ 90

---

### 2. Bundle Size Analysis
**Test ID:** PERF-002  
**Purpose:** Verify bundle size optimization  
**Steps:**
1. Run `npm run build`
2. Run `npm run analyze` (webpack-bundle-analyzer)
3. Check initial JavaScript bundle size
4. Verify code splitting is working

**Expected Results:**
- Initial JS bundle < 200KB (gzipped)
- Chunks properly split by route
- No duplicate dependencies
- Vendor chunk separated from app code

---

### 3. Image Lazy Loading
**Test ID:** PERF-003  
**Purpose:** Verify images load lazily  
**Steps:**
1. Navigate to page with multiple images
2. Open Network tab in DevTools
3. Scroll down page slowly
4. Observe image loading behavior

**Expected Results:**
- Images below fold don't load initially
- Images load as they enter viewport
- Placeholder shown before image loads
- Blur-up effect works correctly
- Alt text present for accessibility

---

### 4. Service Worker Caching
**Test ID:** PERF-004  
**Purpose:** Verify service worker caching strategy  
**Steps:**
1. Load application
2. Open DevTools > Application > Service Workers
3. Verify service worker is registered
4. Go offline in DevTools
5. Reload page

**Expected Results:**
- Service worker registers successfully
- Static assets cached
- App works offline for cached routes
- Cache version updates on new deployment
- Update notification appears when new version available

---

### 5. Virtualized List Performance
**Test ID:** PERF-005  
**Purpose:** Verify virtualization works for large lists  
**Steps:**
1. Navigate to topic list with 1000+ items
2. Open DevTools Performance tab
3. Scroll through list rapidly
4. Check DOM node count

**Expected Results:**
- Only visible items + overscan rendered in DOM
- Smooth 60fps scrolling
- Memory usage stable during scroll
- No jank or frame drops
- Keyboard navigation works correctly

---

### 6. Skeleton Loading States
**Test ID:** PERF-006  
**Purpose:** Verify skeleton loaders improve perceived performance  
**Steps:**
1. Clear cache and reload page
2. Observe loading states
3. Check skeleton animation smoothness
4. Verify content replacement

**Expected Results:**
- Skeleton screens appear immediately
- Animation is smooth (60fps)
- Content replaces skeletons without layout shift
- Skeleton dimensions match final content
- Screen readers announce loading state

---

### 7. Prefetching Behavior
**Test ID:** PREF-007  
**Purpose:** Verify link prefetching works  
**Steps:**
1. Navigate to homepage
2. Hover over navigation links
3. Check Network tab for prefetch requests
4. Click prefetched link

**Expected Results:**
- Links prefetch on hover (after delay)
- Prefetched pages load instantly on click
- No prefetching on mobile data saver mode
- Priority links prefetch on intersection

---

### 8. Network Adaptation
**Test ID:** PERF-008  
**Purpose:** Verify app adapts to network conditions  
**Steps:**
1. Open DevTools > Network throttling
2. Test on Fast 3G, Slow 3G, Offline
3. Observe adaptive behavior
4. Check console for network status changes

**Expected Results:**
- Lower quality images on slow networks
- Reduced prefetching on slow connections
- Offline mode shows appropriate UI
- Data saver mode respected

---

### 9. Font Loading Optimization
**Test ID:** PERF-009  
**Purpose:** Verify fonts load without blocking  
**Steps:**
1. Clear cache
2. Load page with network throttling
3. Observe text rendering
4. Check for FOIT/FOUT

**Expected Results:**
- Text visible immediately (fallback font)
- Custom font swaps in without layout shift
- font-display: swap in use
- Preload hints for critical fonts
- No invisible text period

---

### 10. Third-Party Script Optimization
**Test ID:** PERF-010  
**Purpose:** Verify third-party scripts don't block rendering  
**Steps:**
1. Audit page with Lighthouse
2. Check Third-Party Summary
3. Verify script loading strategy
4. Test with script blocker

**Expected Results:**
- Analytics scripts loaded asynchronously
- No render-blocking third-party scripts
- Scripts deferred until after user interaction if non-critical
- Graceful degradation if scripts fail

---

## Regression Tests

### 1. Performance Budget Regression
**Test ID:** PERF-REG-001  
**Purpose:** Ensure performance doesn't regress  
**Steps:**
1. Run Lighthouse CI on all key pages
2. Compare against established budgets
3. Check for violations

**Expected Results:**
- All pages pass performance budget
- No metric degraded by >10% from baseline
- Bundle size within limits
- All assertions pass in CI

---

### 2. Cross-Browser Performance
**Test ID:** PERF-REG-002  
**Purpose:** Verify performance across browsers  
**Steps:**
1. Test on Chrome, Firefox, Safari, Edge
2. Run performance audits on each
3. Compare metrics

**Expected Results:**
- Core Web Vitals pass on all browsers
- No browser-specific performance issues
- Service worker supported browsers work offline
- Graceful degradation on older browsers

---

### 3. Mobile Performance
**Test ID:** PERF-REG-003  
**Purpose:** Verify mobile performance  
**Steps:**
1. Test on real mobile devices (iOS, Android)
2. Use Chrome DevTools remote debugging
3. Run Lighthouse mobile audit
4. Test on low-end devices

**Expected Results:**
- LCP < 2.5s on mobile 4G
- TTI < 5s on mid-range devices
- Smooth scrolling at 60fps
- Touch interactions responsive (< 100ms)

---

### 4. Long Session Performance
**Test ID:** PERF-REG-004  
**Purpose:** Verify no memory leaks or degradation  
**Steps:**
1. Keep app open for 30+ minutes
2. Navigate between pages repeatedly
3. Monitor memory usage
4. Check for increasing JS heap

**Expected Results:**
- Memory usage stable over time
- No memory leaks detected
- Performance consistent after extended use
- Event listeners properly cleaned up

---

### 5. Build Size Regression
**Test ID:** PERF-REG-005  
**Purpose:** Prevent bundle size creep  
**Steps:**
1. Compare current build size to previous
2. Check for unexpected increases
3. Identify new dependencies

**Expected Results:**
- Bundle size increase < 5% per release
- No accidental inclusion of large libraries
- Tree shaking working correctly
- Duplicate packages identified and removed

---

## API Verification Tests

### 1. Performance Metrics Endpoint
**Test ID:** PERF-API-001  
**Endpoint:** POST /api/performance/metrics  
**Purpose:** Verify metrics collection  
**Request:**
```json
{
  "metrics": [
    {"name": "LCP", "value": 1800, "rating": "good"},
    {"name": "FID", "value": 50, "rating": "good"}
  ],
  "userAgent": "Mozilla/5.0...",
  "url": "https://sijil.com/"
}
```

**Expected Response:**
```json
{"success": true}
```

**Status Codes:**
- 200: Success
- 400: Invalid metrics array
- 500: Server error

---

### 2. Bundle Info Endpoint
**Test ID:** PERF-API-002  
**Endpoint:** GET /api/performance/bundle-info  
**Purpose:** Verify bundle information retrieval  

**Expected Response:**
```json
{
  "totalSize": 185000,
  "chunks": [
    {"name": "main.js", "size": 45000},
    {"name": "vendors.js", "size": 120000}
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### 3. Cache Status Endpoint
**Test ID:** PERF-API-003  
**Endpoint:** GET /api/performance/cache-status  
**Purpose:** Verify cache statistics  

**Expected Response:**
```json
{
  "hits": 1250,
  "misses": 180,
  "hitRate": 0.874,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

---

## Edge Case Tests

### 1. Empty State Performance
**Test ID:** PERF-EDGE-001  
**Purpose:** Verify performance with empty data  
**Steps:**
1. Load pages with no content
2. Check virtualized list behavior
3. Verify skeleton loaders

**Expected Results:**
- No errors with empty arrays
- Virtualized list handles 0 items
- Appropriate empty state shown quickly

---

### 2. Very Large Lists
**Test ID:** PERF-EDGE-002  
**Purpose:** Verify performance with 10,000+ items  
**Steps:**
1. Load list with 10,000 items
2. Scroll rapidly from top to bottom
3. Monitor memory and FPS

**Expected Results:**
- Virtualization maintains constant DOM nodes
- Scrolling remains smooth
- Memory usage stable
- No crashes or freezes

---

### 3. Slow Network Timeout
**Test ID:** PERF-EDGE-003  
**Purpose:** Verify timeout handling  
**Steps:**
1. Simulate very slow network (50kbps)
2. Load resource-heavy page
3. Wait for timeout

**Expected Results:**
- Timeout occurs gracefully
- Error message shown to user
- Retry option available
- No hanging requests

---

### 4. Rapid Navigation
**Test ID:** PERF-EDGE-004  
**Purpose:** Verify performance during rapid page changes  
**Steps:**
1. Click through multiple pages rapidly
2. Cancel loading pages mid-flight
3. Check for memory leaks

**Expected Results:**
- Previous requests cancelled properly
- No memory leaks from aborted requests
- Current page loads correctly
- No race conditions

---

### 5. Multiple Service Worker Updates
**Test ID:** PERF-EDGE-005  
**Purpose:** Verify SW update handling  
**Steps:**
1. Deploy new version multiple times quickly
2. Keep tab open during updates
3. Observe update behavior

**Expected Results:**
- Latest version eventually installed
- No broken cache states
- Update notification shows correctly
- Old caches cleaned up

---

### 6. High DPI Displays
**Test ID:** PERF-EDGE-006  
**Purpose:** Verify image optimization on retina displays  
**Steps:**
1. Test on 4K/retina display
2. Check image srcset attributes
3. Verify appropriate resolution served

**Expected Results:**
- Higher resolution images served when needed
- File sizes still optimized
- No unnecessary bandwidth usage on standard displays

---

### 7. Reduced Motion Preference
**Test ID:** PERF-EDGE-007  
**Purpose:** Verify respects reduced motion  
**Steps:**
1. Enable "Reduce Motion" in OS
2. Load application
3. Check animations

**Expected Results:**
- Skeleton animations disabled or reduced
- No parallax effects
- Transitions instant or minimal
- prefers-reduced-motion media query used

---

### 8. Concurrent Tabs
**Test ID:** PERF-EDGE-008  
**Purpose:** Verify performance with multiple tabs  
**Steps:**
1. Open app in 10+ tabs
2. Interact with each tab
3. Monitor overall system performance

**Expected Results:**
- Each tab performs independently
- Shared workers don't cause issues
- Memory usage scales reasonably
- VisibilityChange pauses background activity

---

### 9. Storage Quota Exceeded
**Test ID:** PERF-EDGE-009  
**Purpose:** Verify handling of storage limits  
**Steps:**
1. Fill browser storage quota
2. Try to cache new resources
3. Observe error handling

**Expected Results:**
- Graceful error handling
- Oldest cache entries evicted
- User notified if critical
- App continues functioning

---

### 10. CPU Throttling
**Test ID:** PERF-EDGE-010  
**Purpose:** Verify performance on throttled CPU  
**Steps:**
1. Enable 4x CPU slowdown in DevTools
2. Interact with application
3. Check responsiveness

**Expected Results:**
- Critical interactions remain responsive
- Non-critical work deferred
- IdleCallback schedules appropriately
- No frozen UI

---

## Performance Tests

### 1. Time to Interactive
**Test ID:** PERF-PERF-001  
**Metric:** TTI  
**Target:** < 3.5s on 3G  
**Measurement:** Lighthouse, WebPageTest

---

### 2. First Contentful Paint
**Test ID:** PERF-PERF-002  
**Metric:** FCP  
**Target:** < 1.5s  
**Measurement:** Lighthouse, Chrome UX Report

---

### 3. Total Blocking Time
**Test ID:** PERF-PERF-003  
**Metric:** TBT  
**Target:** < 300ms  
**Measurement:** Lighthouse

---

### 4. Speed Index
**Test ID:** PERF-PERF-004  
**Metric:** Speed Index  
**Target:** < 3.4s  
**Measurement:** Lighthouse, WebPageTest

---

### 5. JavaScript Execution Time
**Test ID:** PERF-PERF-005  
**Metric:** Script Evaluation  
**Target:** < 2.5s total  
**Measurement:** Chrome DevTools Performance panel

---

## Acceptance Validation

### Checklist

**Core Web Vitals:**
- [ ] LCP < 2.5s on 75th percentile
- [ ] FID < 100ms on 75th percentile
- [ ] CLS < 0.1 on 75th percentile
- [ ] INP < 200ms on 75th percentile

**Bundle Optimization:**
- [ ] Initial JS < 200KB gzipped
- [ ] Code splitting implemented
- [ ] Tree shaking effective
- [ ] No duplicate dependencies

**Caching:**
- [ ] Service worker registered
- [ ] Static assets cached
- [ ] Cache invalidation works
- [ ] Offline mode functional

**Images:**
- [ ] Modern formats (WebP/AVIF) used
- [ ] Lazy loading implemented
- [ ] Responsive images with srcset
- [ ] Placeholder blur-up working

**Rendering:**
- [ ] 60fps during interactions
- [ ] Virtualization for long lists
- [ ] Skeleton loaders implemented
- [ ] No layout shifts

**Monitoring:**
- [ ] Performance dashboard operational
- [ ] Real user metrics collected
- [ ] Alerts configured for regressions
- [ ] Lighthouse CI passing

**Accessibility:**
- [ ] Reduced motion respected
- [ ] Loading states announced
- [ ] Focus management during lazy load
- [ ] WCAG 2.1 AA compliant

**Cross-Browser:**
- [ ] Chrome performance verified
- [ ] Firefox performance verified
- [ ] Safari performance verified
- [ ] Edge performance verified

**Mobile:**
- [ ] Mobile performance verified
- [ ] Touch interactions smooth
- [ ] Network adaptation working
- [ ] Low-end device tested

**Documentation:**
- [ ] Implementation guide complete
- [ ] API documentation updated
- [ ] Performance best practices documented
- [ ] Troubleshooting guide created
