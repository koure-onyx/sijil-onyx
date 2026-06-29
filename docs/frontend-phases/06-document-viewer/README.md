# Phase 06: Document Viewer & Quran Browser

## Overview

This phase implements the core document reading experience for Sijil, including the Quran browser. Users can view full documents with proper typography, navigation, metadata display, and version information. This is also the primary interface for browsing the Quran by surah and ayah.

## Goals

- Render full document text with optimal readability
- Display comprehensive document metadata
- Support hierarchical navigation (chapters/sections)
- Implement smooth scrolling and position memory
- Provide citation and reference tools
- Ensure accessibility for screen readers
- Optimize for long-form reading sessions
- **Implement Quran browsing with surah and ayah navigation**
- **Support Arabic text rendering with proper fonts**
- **Provide translation toggles (Urdu/English)**

## Deliverables

1. **Document Detail Page** (`/documents/[id]`)
   - Main content area with rendered text
   - Sticky header with navigation controls
   - Metadata sidebar (collapsible on mobile)
   - Table of contents panel
   - Citation tools

2. **Quran Browser Pages**
   - **Quran Entry Page** (`/quran`) - Redirects to Surah 1 or shows surah list
   - **Surah Detail Page** (`/quran/[surahNumber]`) - Full surah view with ayah navigation
   - QuranLayout specialized layout

3. **Components**
   - `DocumentViewer` - Main viewer container
   - `DocumentText` - Text rendering with typography
   - `DocumentMetadata` - Author, date, collection info
   - `TableOfContents` - Chapter/section navigation
   - `CitationTool` - Copy/paste citation formats
   - `ReadingProgress` - Scroll progress indicator
   - `FontControls` - Text size/theme adjustments
   - `SectionNavigator` - Jump to section
   - **`QuranBrowser`** - Main Quran container
   - **`SurahSelector`** - Dropdown to select surah
   - **`AyahNavigator`** - Navigate between ayahs
   - **`TranslationToggle`** - Switch between Urdu/English translations
   - **`QuranText`** - Arabic text rendering with external font
   - **`TranslationPanel`** - Side-by-side translation display
   - **`JuzMarker`**, **`HizbMarker`**, **`RukuMarker`** - Navigation markers
   - **`QuranVerseBlock`** - Content block for Quran verses in topics
   - **`QuranReferenceBlock`** - Content block for Quran references

4. **Features**
   - Persistent scroll position (localStorage)
   - Font size adjustment (3 levels)
   - Reading theme toggle (light/sepia/dark)
   - Section highlighting on scroll
   - Copy section functionality
   - Print-friendly styles
   - **Arabic font loading (Amiri or similar)**
   - **Ayah-by-ayah navigation**
   - **Juz/Hizb/Ruku browsing**
   - **Translation side-by-side view**
   - **Surah metadata display (revelation type, ayah count)**

## Dependencies

**Completed Before This Phase:**
- Phase 01: Foundation (API client, base components)
- Phase 02: App Shell (navigation, layout)
- Phase 03: Homepage
- Phase 04: Topic List
- Phase 05: Topic Detail

**Required APIs:**
- `GET /api/v1/documents/:id` - Document content
- `GET /api/v1/documents/:id/metadata` - Extended metadata
- `GET /api/v1/collections/:id` - Collection context
- `POST /api/v1/analytics/read` - Track reading session
- **`GET /api/quran/surah/:surahNumber`** - Get surah metadata and ayahs
- **`GET /api/quran/ayah/:surahNumber/:ayahNumber`** - Get single ayah
- **`GET /api/quran/range/:surahNumber/:start/:end`** - Get ayah range

## Exit Criteria

✓ All acceptance criteria in `acceptance.md` pass
✓ Manual verification tests in `tests.md` complete
✓ No mocked data - all content from real APIs
✓ Responsive on mobile, tablet, desktop
✓ Accessibility audit passes (WCAG 2.1 AA)
✓ Performance metrics met (TTI < 2s for 50k words)
✓ **Arabic text renders correctly with proper fonts**
✓ **Quran navigation flow works end-to-end**
✓ CURRENT_PHASE.md updated
✓ CHANGELOG.md updated

## Estimated Effort

**Complexity:** Large (L)
**Estimated Time:** 7-9 days (increased from 5-7 due to Quran features)
**Risk Level:** Medium (text rendering edge cases, Arabic font loading)

## Key Challenges

1. **Performance:** Rendering very long documents (100k+ words) without lag
2. **Typography:** Ensuring readable text at all font sizes
3. **Navigation:** Smooth scrolling to sections in long documents
4. **Memory:** Managing scroll position across sessions
5. **Accessibility:** Proper ARIA labels for screen readers
6. **Print:** Generating print-friendly layouts
7. **Arabic Fonts:** Loading and rendering Arabic text correctly
8. **RTL Support:** Proper right-to-left text direction for Arabic
9. **Translation Sync:** Keeping Arabic and translation aligned

## Success Metrics

- Time to Interactive < 2 seconds
- Scroll performance > 55fps on mid-range devices
- Zero layout shift during text loading
- 100% keyboard navigable
- Successful citation copy in < 1 click
- **Arabic font loads within 500ms**
- **Surah navigation completes in < 1 second**
