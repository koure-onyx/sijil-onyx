# Sijil — Frontend Discovery: User Flows

**Generated:** 2026-06-27  
**Source Files:** Derived from routes, controllers, services

---

## Overview

This document describes complete user flows through the Sijil platform, organized by user type and task.

---

## Public User Flows

### Flow 1: Content Discovery → Reading

**Actor:** Anonymous/Public User  
**Goal:** Find and read educational content

**Steps:**
1. **Landing on Homepage**
   - User arrives at `/`
   - Sees platform stats, recent arrivals, popular topics
   - System calls: `GET /api/utility/platform-stats`, `GET /api/utility/recent-arrivals`

2. **Initiating Search**
   - User types in search bar (header component)
   - System calls: `GET /api/search/suggest?prefix=` (debounced)
   - User sees autocomplete dropdown

3. **Executing Search**
   - User presses Enter or clicks search
   - System navigates to `/search?q=physics`
   - System calls: `GET /api/search?q=physics&limit=20`
   - User sees paginated results with filters

4. **Refining Search** (optional)
   - User applies filters (subject: Physics, grade: 9)
   - System updates URL: `/search?q=physics&subject=Physics&grade=9`
   - System calls: `GET /api/search?q=physics&subject=Physics&grade=9`

5. **Selecting Result**
   - User clicks topic result
   - System navigates to `/topics/slug/pk/pctb/phys/9/ch1/vernier-callipers`
   - System calls: `GET /api/topics/slug/*slug`
   - Middleware fires analytics tracking

6. **Reading Content**
   - Topic page loads with metadata
   - System calls: `GET /api/topics/:id/content`, `GET /api/topics/:id/assets`
   - Block renderer displays content
   - User scrolls through sections

7. **Navigating Within Content**
   - User clicks table of contents link
   - Page scrolls to section anchor
   - OR user clicks next topic link
   - System navigates to next topic slug

8. **Exporting Content** (optional)
   - User clicks Export button
   - Selects format (formula_pack, mcq_pack, etc.)
   - System calls: `POST /api/exports` with `{topic_id, format}`
   - Modal shows progress polling: `GET /api/exports/:jobId`
   - When complete, download starts automatically

**APIs Involved:**
- `/api/search/suggest`
- `/api/search`
- `/api/topics/slug/*`
- `/api/topics/:id/content`
- `/api/topics/:id/assets`
- `/api/exports` (POST)
- `/api/exports/:id` (GET)

---

### Flow 2: Curriculum Browsing

**Actor:** Student/Teacher  
**Goal:** Browse content by subject and grade level

**Steps:**
1. **Navigate to Subjects**
   - User clicks "Browse by Subject" from homepage
   - System calls: `GET /api/subjects`
   - Displays subject cards grid

2. **Select Subject**
   - User clicks "Physics"
   - System navigates to `/subjects/Physics`
   - System calls: `GET /api/subjects/Physics/grades`
   - Shows available grades for Physics

3. **Select Grade**
   - User clicks "Grade 9"
   - System navigates to `/subjects/Physics/grade/9`
   - System calls: `GET /api/documents?subject=Physics&grade=9`
   - Shows filtered document list

4. **Select Document**
   - User clicks textbook title
   - System navigates to `/documents/pk-pctb-phys-9`
   - System calls: `GET /api/documents/:id`, `GET /api/documents/:id/topics`
   - Shows chapter outline and topic list

5. **Select Chapter/Topic**
   - User clicks chapter heading (expands)
   - User clicks topic within chapter
   - Navigates to topic page (see Flow 1)

**APIs Involved:**
- `/api/subjects`
- `/api/subjects/:subject/grades`
- `/api/documents` (filtered)
- `/api/documents/:id`
- `/api/documents/:id/topics`

---

### Flow 3: Formula Search & Export

**Actor:** Student preparing for exam  
**Goal:** Find specific formulas and export them

**Steps:**
1. **Navigate to Formula Search**
   - User clicks "Formulas" in header
   - Or goes directly to `/search/formulas`

2. **Search for Formula**
   - User types "force" or "F=ma"
   - System calls: `GET /api/search/formulas?q=force`
   - Shows formula cards with LaTeX rendering

3. **Review Results**
   - Each card shows: name, LaTeX, variables, source topic
   - User can click "Copy LaTeX" button
   - Or click source topic link

4. **Export Formula Pack**
   - User clicks "Export Formulas" button
   - Selects "formula_pack" format
   - System calls: `POST /api/exports` with topic context
   - Polls for completion
   - Downloads ZIP with all formulas

**APIs Involved:**
- `/api/search/formulas`
- `/api/exports` (POST)
- `/api/exports/:id` (GET)

---

### Flow 4: Quran Reference Lookup

**Actor:** Student studying Islamic content  
**Goal:** View Quran verse referenced in textbook

**Steps:**
1. **Encounter Quran Reference**
   - While reading topic, user sees Quran reference block
   - Shows: "Surah 1, Ayah 1-5"

2. **Click Reference**
   - Opens modal or new tab
   - System calls: `GET /api/quran/range/1/1/5`

3. **View Ayah**
   - Modal displays Urdu translation
   - Shows position indicators (juz, hizb, ruku)
   - Optional: Fetch Arabic from external API if needed

4. **Navigate Quran** (optional)
   - User clicks "View Full Surah"
   - System navigates to `/quran/1`
   - System calls: `GET /api/quran/surah/1`
   - User can browse ayahs

**APIs Involved:**
- `/api/quran/range/:surah/:start/:end`
- `/api/quran/surah/:surahNumber`
- `/api/quran/ayah/:surah/:ayah`

---

## Admin User Flows

### Flow 5: Single Document Ingestion

**Actor:** Admin  
**Goal:** Submit a single JSON document for processing

**Prerequisites:** Admin authentication via `X-Admin-ID` header

**Steps:**
1. **Navigate to Ingestion Page**
   - Admin goes to `/admin/ingest`
   - Sees JSON editor and submission form

2. **Prepare JSON**
   - Admin pastes or writes JSON conforming to DocumentIngestSchema
   - Includes: schema_version, document_metadata, container, topics array

3. **Validate Locally** (client-side)
   - Click "Validate" button
   - Zod schema validation runs in browser
   - Errors displayed inline

4. **Submit for Ingestion**
   - Click "Submit" button
   - System calls: `POST /api/ingest/json` with JSON body
   - Receives: `{tracking_id, status: "pending"}`

5. **Track Progress**
   - Page auto-navigates to status view
   - Polls: `GET /api/ingest/:trackingId` every 5 seconds
   - Status transitions: pending → processing → complete/error

6. **Handle Completion**
   - **If Complete:** Shows success message, link to document
   - **If Error:** Shows error log, offers retry option
   - Click "Retry" calls: `POST /api/ingest/:id/retry`

7. **Cancel Job** (optional, while pending)
   - Click "Cancel" button
   - System calls: `POST /api/ingest/:id/cancel`
   - Job marked as cancelled

**APIs Involved:**
- `/api/ingest/json` (POST)
- `/api/ingest/:trackingId` (GET)
- `/api/ingest/:id/retry` (POST)
- `/api/ingest/:id/cancel` (POST)

---

### Flow 6: Batch Import from GitHub

**Actor:** Admin  
**Goal:** Import multiple documents from GitHub repository

**Steps:**
1. **Navigate to Import Page**
   - Admin goes to `/admin/import`

2. **Enter Repository URL**
   - Input: `https://github.com/starly101/sijil`
   - Click "Preview"

3. **Preview Contents**
   - System calls: `POST /api/admin/import/preview` with repo_url
   - Receives: `{batch_id, documents_found, topics_found}`
   - Shows preview table of files to import

4. **Start Import**
   - Click "Start Import" button
   - System calls: `POST /api/admin/import/start` with batch_id
   - Receives: `{batch_id, status: "PENDING"}`

5. **Monitor Progress**
   - Dashboard shows 4-stage progress:
     - SCANNING: Listing files in repo
     - VALIDATING: Checking JSON schemas
     - IMPORTING: Creating documents/topics
     - INDEXING: Building search indexes
   - Polls: `GET /api/admin/import/:batchId` every 10 seconds

6. **Handle Failures** (if any)
   - Failed files shown in error table
   - Each error includes: file path, validation error, line number
   - Click "Retry Failed" calls: `POST /api/admin/import/:batchId/retry`

7. **Complete Import**
   - Status changes to COMPLETED or PARTIAL_SUCCESS
   - Summary shows: imported count, failed count
   - Click "Download Report" gets CSV/PDF summary

8. **Cancel Import** (optional)
   - At any point, click "Cancel"
   - System calls: `POST /api/admin/import/:batchId/cancel`
   - Stops processing, saves partial results

**APIs Involved:**
- `/api/admin/import/preview` (POST)
- `/api/admin/import/start` (POST)
- `/api/admin/import/:batchId` (GET)
- `/api/admin/import/:batchId/retry` (POST)
- `/api/admin/import/:batchId/cancel` (POST)
- `/api/admin/import/:batchId/report` (GET)

---

### Flow 7: Analytics Review

**Actor:** Admin/Content Manager  
**Goal:** Analyze search behavior and content performance

**Steps:**
1. **Navigate to Analytics**
   - Admin goes to `/admin/analytics`

2. **View Search Analytics**
   - Default view shows search query stats
   - System calls: `GET /api/utility/analytics/search`
   - Chart displays top searches over time

3. **Review Failed Searches**
   - Click "Failed Searches" tab
   - System calls: `GET /api/utility/failed-searches`
   - List shows queries with no results
   - Identifies content gaps

4. **View Popular Topics**
   - Click "Popular Topics" tab
   - System calls: `GET /api/utility/popular-topics`
   - Table shows most-viewed topics

5. **Filter by Date Range**
   - Select date range picker
   - All charts update with filtered data

6. **Export Data** (optional)
   - Click "Export CSV"
   - Downloads analytics data for external analysis

**APIs Involved:**
- `/api/utility/analytics/search`
- `/api/utility/failed-searches`
- `/api/utility/popular-topics`

---

### Flow 8: Platform Stats Recomputation

**Actor:** Admin  
**Goal:** Manually trigger platform statistics recalculation

**Steps:**
1. **Navigate to Dashboard**
   - Admin goes to `/admin`

2. **View Current Stats**
   - System calls: `GET /api/utility/platform-stats`
   - Displays: total documents, topics, formulas, MCQs, assets

3. **Trigger Recompute** (if stats seem stale)
   - Click "Recompute Stats" button
   - System calls: `POST /api/utility/platform-stats/recompute`
   - Shows loading indicator

4. **Refresh Display**
   - After completion, refresh stats display
   - Verify counts updated

**APIs Involved:**
- `/api/utility/platform-stats` (GET)
- `/api/utility/platform-stats/recompute` (POST)

---

## Edge Case Flows

### Flow 9: Slug Redirect Resolution

**Actor:** Any user  
**Scenario:** User clicks old bookmark or external link with outdated slug

**Steps:**
1. **Navigate to Old URL**
   - User goes to `/topics/slug/old-chapter-name/old-topic`
   - Topic was renamed/moved

2. **404 Handler Activates**
   - Frontend router catches 404
   - Calls: `GET /api/utility/slug/resolve?slug=old-chapter-name/old-topic`

3. **Redirect Found**
   - Response: `{resolved_url: "/topics/top_xyz", redirect_type: "301"}`
   - Frontend updates browser history
   - Navigates to new URL

4. **No Redirect Found**
   - Response: 404 or null
   - Show standard 404 page
   - Offer search bar and home link

**APIs Involved:**
- `/api/utility/slug/resolve`

---

### Flow 10: Export Staleness Detection

**Actor:** User  
**Scenario:** User tries to download export that may be outdated

**Steps:**
1. **Request Export**
   - User clicks download for previously generated export
   - OR export job completes

2. **Check Staleness**
   - System calls: `GET /api/export/:jobId/stale`
   - Compares content_hash with current topic version

3. **If Stale**
   - Response: `{is_stale: true}`
   - Show warning: "Content has changed since this export was generated"
   - Offer: "Regenerate" or "Download Anyway"

4. **If Not Stale**
   - Proceed with download
   - No warning shown

**APIs Involved:**
- `/api/export/:jobId/stale`

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Project overview
- [06-screen-inventory.md](./06-screen-inventory.md) — Screen list
- [08-navigation-map.md](./08-navigation-map.md) — Navigation structure
