# Phase 06: Document Viewer & Quran Browser - Implementation Prompt

## Objective

Implement the core document reading experience including full document viewer with typography, navigation, metadata, and the Quran browser with surah/ayah navigation, Arabic text rendering, and translation toggles.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/06-document-viewer/README.md`
4. `docs/frontend-phases/06-document-viewer/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Document and Quran APIs

---

## Files To Create

### Pages
- `src/app/documents/[id]/page.tsx` - Document detail page
- `src/app/quran/page.tsx` - Quran entry (redirects to Surah 1)
- `src/app/quran/[surahNumber]/page.tsx` - Surah detail page

### Layouts
- `src/app/quran/layout.tsx` - Quran-specific layout

### Components - Document Viewer
- `src/components/document/document-viewer.tsx` - Main viewer container
- `src/components/document/document-text.tsx` - Text rendering with typography
- `src/components/document/document-metadata.tsx` - Author, date, collection
- `src/components/document/table-of-contents.tsx` - Chapter/section navigation
- `src/components/document/citation-tool.tsx` - Copy/paste citations
- `src/components/document/reading-progress.tsx` - Scroll progress indicator
- `src/components/document/font-controls.tsx` - Text size/theme adjustments
- `src/components/document/section-navigator.tsx` - Jump to section

### Components - Quran Browser
- `src/components/quran/quran-browser.tsx` - Main Quran container
- `src/components/quran/surah-selector.tsx` - Dropdown to select surah
- `src/components/quran/ayah-navigator.tsx` - Navigate between ayahs
- `src/components/quran/translation-toggle.tsx` - Switch Urdu/English
- `src/components/quran/quran-text.tsx` - Arabic text rendering
- `src/components/quran/translation-panel.tsx` - Side-by-side translation
- `src/components/quran/juz-marker.tsx` - Juz navigation marker
- `src/components/quran/hizb-marker.tsx` - Hizb marker
- `src/components/quran/ruku-marker.tsx` - Ruku marker

### Hooks
- `src/hooks/use-document.ts` - Document data fetching
- `src/hooks/use-quran-surah.ts` - Surah data fetching
- `src/hooks/use-reading-progress.ts` - Scroll position tracking
- `src/hooks/use-font-size.ts` - Font size management

---

## Backend APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/documents/:id` | GET | Document content |
| `/api/v1/documents/:id/metadata` | GET | Extended metadata |
| `/api/v1/collections/:id` | GET | Collection context |
| `/api/quran/surah/:surahNumber` | GET | Surah metadata and ayahs |
| `/api/quran/ayah/:surahNumber/:ayahNumber` | GET | Single ayah |
| `/api/quran/range/:surahNumber/:start/:end` | GET | Ayah range |

---

## Rules

**Critical:**
- Never use mocked data - all from real APIs
- Server Components by default
- Arabic font must load correctly (Amiri or similar)
- Support persistent scroll position (localStorage)
- Font size adjustment (3 levels)
- Reading theme toggle (light/sepia/dark)

---

## Stop Conditions

✓ All acceptance criteria pass
✓ Arabic text renders correctly with proper fonts
✓ Quran navigation works end-to-end
✓ Responsive on all devices
✓ Accessibility audit passes (WCAG 2.1 AA)
✓ Performance: TTI < 2s for 50k words

**DO NOT continue to:** Search (Phase 07), Assessments (Phase 08)

---

## Deliverables

**Files Created:** Document viewer components, Quran browser components, hooks
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 06 exit criteria met

**Estimated Effort:** 7-9 days

**Complexity:** Large
