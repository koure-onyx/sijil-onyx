# Phase 12: Performance & Optimization - Implementation Prompt

## Objective

Optimize the application for maximum performance including bundle size reduction, lazy loading, caching strategies, image optimization, code splitting, and Core Web Vitals excellence.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/12-performance/README.md`
4. `docs/frontend-phases/12-performance/implementation.md`

---

## Files To Create

### Components
- `src/components/performance/lazy-image.tsx` - Progressive image loading
- `src/components/performance/virtualized-list.tsx` - Virtual scrolling
- `src/components/performance/skeleton-loader.tsx` - Perceived performance
- `src/components/performance/bundle-analyzer.tsx` - Dev tool
- `src/components/performance/service-worker-manager.tsx` - PWA caching
- `src/components/performance/performance-monitor.tsx` - Real-time metrics
- `src/components/performance/prefetch-link.tsx` - Intelligent prefetching

### Hooks
- `src/hooks/use-idle-callback.ts` - Schedule non-critical work
- `src/hooks/use-optimized-resize.ts` - Debounced resize handler
- `src/hooks/use-visibility-change.ts` - Pause/resume on tab visibility
- `src/hooks/use-network-status.ts` - Adapt to network conditions

### Pages
- `src/app/admin/performance/page.tsx` - Performance dashboard

---

## Rules

**Critical:**
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1, INP < 200ms
- Initial JavaScript bundle < 200KB (gzipped)
- Strategic caching (browser, CDN, service worker)
- Modern image formats (WebP, AVIF)
- Code splitting by route and component
- TTI < 3.5s on 3G networks
- Maintain 60fps during interactions

---

## Stop Conditions

✓ All Core Web Vitals targets met
✓ Bundle size optimized
✓ Images optimized with modern formats
✓ Code splitting implemented
✓ Caching strategies in place
✓ Performance monitoring active

**DO NOT continue to:** Testing (Phase 13), Polish (Phase 14)

---

## Deliverables

**Files Created:** Performance components, hooks, dashboard
**Tests Run:** Build, type-check, lint, Lighthouse audit
**Acceptance:** All Phase 12 exit criteria met

**Estimated Effort:** 3-4 days

**Complexity:** Medium-Large
