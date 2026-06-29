# Phase 09: Exports - Manual Verification Tests

## Manual Verification

### 1. Export Trigger Component

**Test Case:** Export button renders correctly

**Steps:**
1. Navigate to any document detail page (Phase 06)
2. Locate the export button in the toolbar
3. Verify button displays with download icon

**Expected Results:**
- ✓ Button visible and enabled for authenticated users
- ✓ Button disabled for unauthenticated users (if applicable)
- ✓ Dropdown shows all available formats (PDF, LaTeX, Markdown)
- ✓ No console errors

---

### 2. Export Modal

**Test Case:** Export modal opens and functions correctly

**Steps:**
1. Click the Export button
2. Verify modal opens with title "Export Document"
3. Select different formats (PDF, LaTeX, Markdown)
4. For PDF, verify quality options appear
5. Toggle "Include references" checkbox
6. Toggle "Include metadata" checkbox
7. Enter custom filename
8. Click "Start Export"

**Expected Results:**
- ✓ Modal opens with smooth animation
- ✓ Format selection works (radio buttons)
- ✓ Quality options only show for PDF
- ✓ Checkboxes toggle correctly
- ✓ Custom filename input accepts text
- ✓ Submit button shows loading state during submission
- ✓ Modal closes after successful submission
- ✓ Redirects to status page with job ID

---

### 3. Export Status Page

**Test Case:** Status page displays job progress correctly

**Steps:**
1. After starting an export, navigate to `/exports/[jobId]`
2. Observe the status indicator
3. Wait for automatic polling updates
4. Verify progress bar updates

**Expected Results:**
- ✓ Page loads with job ID from URL
- ✓ Initial state shows "Preparing..." or "Processing X%"
- ✓ Progress bar updates every 2 seconds
- ✓ Status icon changes based on state
- ✓ Timestamp displays correctly
- ✓ Format displayed in uppercase

---

### 4. Download Completion

**Test Case:** File downloads successfully on completion

**Steps:**
1. Wait for export to complete (or use mock completed job)
2. Verify status changes to "Ready to download"
3. Click the Download button
4. Check browser's download folder

**Expected Results:**
- ✓ Status changes to green "Ready to download"
- ✓ Download button appears with correct format label
- ✓ File downloads with correct filename
- ✓ File opens correctly in appropriate application
- ✓ File size matches expected range

---

### 5. Error Handling

**Test Case:** Errors display correctly with recovery options

**Steps:**
1. Trigger export with invalid resource ID (test environment)
2. Observe error message
3. Click "Try Again" button
4. Test network failure scenario (disconnect internet)

**Expected Results:**
- ✓ Error message displays in red alert box
- ✓ Specific error message shown (not generic)
- ✓ "Try Again" button visible
- ✓ Retry initiates new request
- ✓ Network errors show appropriate message
- ✓ Auto-retry with exponential backoff works

---

### 6. Loading States and Progress

**Test Case:** Export progress displays correctly

**Steps:**
1. Initiate export for a large document
2. Observe modal during processing state
3. Verify progress indicator updates
4. Wait for completion
5. Verify success state with download button

**Expected Results:**
- ✓ Modal shows "Generating Export" title during processing
- ✓ Progress bar displays percentage if available from backend
- ✓ Estimated time remaining shown if provided
- ✓ Status indicator changes color based on state (blue=processing, green=completed, red=failed)
- ✓ Download button appears automatically on completion
- ✓ Modal can be closed without cancelling export (export continues in background)

---

### 7. Multiple Formats

**Test Case:** All export formats work correctly

**Steps:**
1. Export same document as PDF
2. Export same document as LaTeX
3. Export same document as Markdown
4. Open each file and verify content

**Expected Results:**
- ✓ PDF renders with proper formatting
- ✓ LaTeX file contains valid LaTeX syntax
- ✓ Markdown preserves structure and headings
- ✓ All files contain document content
- ✓ References included when option selected
- ✓ Metadata included when option selected

---

### 8. Quality Settings (PDF)

**Test Case:** PDF quality settings affect output

**Steps:**
1. Export document with Low quality
2. Export document with Medium quality
3. Export document with High quality
4. Compare file sizes and visual quality

**Expected Results:**
- ✓ Low quality produces smallest file
- ✓ High quality produces largest file
- ✓ Visual quality differences noticeable
- ✓ All qualities remain readable
- ✓ File size differences significant (>20% between levels)

---

### 9. Keyboard Navigation

**Test Case:** Full keyboard accessibility

**Steps:**
1. Navigate to export button using Tab key
2. Press Enter to open dropdown/modal
3. Navigate through options with arrow keys
4. Press Enter to select
5. Press Escape to close modal
6. Tab through form fields

**Expected Results:**
- ✓ All interactive elements focusable
- ✓ Focus indicators visible (outline/highlight)
- ✓ Dropdown opens with Enter/Space
- ✓ Arrow keys navigate menu items
- ✓ Escape closes modal/dropdown
- ✓ Form submission with Enter key works
- ✓ Focus trapped inside modal when open

---

### 10. Screen Reader Support

**Test Case:** Screen reader announces status changes

**Steps:**
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate to export button
3. Open export modal
4. Submit export
5. Monitor announcements on status page

**Expected Results:**
- ✓ Button labeled "Export" or "Download"
- ✓ Modal title announced
- ✓ Form fields have proper labels
- ✓ Status changes announced ("Processing 50%")
- ✓ Completion announced ("Ready to download")
- ✓ Error messages announced immediately

---

## Regression Tests

### 11. Concurrent Exports

**Test Case:** Multiple exports can run simultaneously

**Steps:**
1. Start export for Document A
2. While processing, start export for Document B
3. Monitor both status pages

**Expected Results:**
- ✓ Both jobs process independently
- ✓ Each status page shows correct job
- ✓ Downloads work for both when complete
- ✓ No race conditions or data mixing

---

### 12. Browser Refresh

**Test Case:** Export survives page refresh

**Steps:**
1. Start an export
2. Navigate to status page
3. Refresh browser (F5)
4. Verify status persists

**Expected Results:**
- ✓ Job ID preserved in URL
- ✓ Status reloads correctly
- ✓ Polling resumes automatically
- ✓ Download still works on completion

---

### 13. Long-Running Exports

**Test Case:** Large documents export correctly

**Steps:**
1. Export a very large document (100+ pages)
2. Leave status page open for extended time
3. Verify eventual completion

**Expected Results:**
- ✓ Polling continues without timeout
- ✓ Progress updates continue
- ✓ Eventually completes successfully
- ✓ No memory leaks in browser
- ✓ Download works after long wait

---

### 14. Cancelled Exports

**Test Case:** Cancelled jobs handled gracefully

**Steps:**
1. Start an export
2. Cancel via API or backend (simulate)
3. Observe status page behavior

**Expected Results:**
- ✓ Status changes to "Cancelled"
- ✓ Appropriate message displayed
- ✓ No download button shown
- ✓ Option to start new export provided

---

### 15. Mobile Responsiveness

**Test Case:** Export works on mobile devices

**Steps:**
1. Open on mobile device (< 640px width)
2. Trigger export
3. Complete full flow

**Expected Results:**
- ✓ Button accessible with touch
- ✓ Modal fills screen appropriately
- ✓ Form fields easy to tap
- ✓ Touch targets minimum 44px
- ✓ Status page readable on small screen
- ✓ Download initiates correctly

---

## API Verification

### 16. POST /api/v1/exports

**Test Case:** Create export job endpoint

**Request:**
```json
{
  "resource_id": "doc_123",
  "resource_type": "document",
  "format": "pdf",
  "options": {
    "quality": "high",
    "include_references": true
  }
}
```

**Expected Response:**
```json
{
  "job_id": "job_abc123",
  "status": "pending",
  "estimated_time": 30
}
```

**Verification:**
- ✓ Returns 201 Created status
- ✓ Job ID is unique string
- ✓ Status is "pending" or "processing"
- ✓ Estimated time provided (optional)

---

### 17. GET /api/v1/exports/:jobId

**Test Case:** Get job status endpoint

**Expected Response:**
```json
{
  "id": "job_abc123",
  "status": "processing",
  "format": "pdf",
  "progress": 45,
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": null,
  "download_url": null,
  "error": null
}
```

**Verification:**
- ✓ Returns 200 OK
- ✓ All required fields present
- ✓ Progress is 0-100 number
- ✓ Timestamps in ISO 8601 format
- ✓ download_url null until completed

---

### 18. GET /api/v1/exports/:jobId/download

**Test Case:** Download file endpoint

**Expected Response:**
- ✓ Returns 200 OK
- ✓ Content-Type matches file format
- ✓ Content-Disposition header set with filename
- ✓ File content valid and complete
- ✓ Authentication required

---

### 19. DELETE /api/v1/exports/:jobId

**Test Case:** Cancel job endpoint

**Expected Response:**
```json
{
  "success": true
}
```

**Verification:**
- ✓ Returns 200 OK or 204 No Content
- ✓ Job status changes to "cancelled"
- ✓ Subsequent status checks show cancelled
- ✓ No download URL provided

---

### 20. GET /api/v1/users/:userId/exports

**Test Case:** Export history endpoint

**Expected Response:**
```json
[
  {
    "id": "job_abc123",
    "document_title": "Introduction to Physics",
    "document_id": "doc_123",
    "format": "pdf",
    "status": "completed",
    "created_at": "2024-01-15T10:30:00Z",
    "completed_at": "2024-01-15T10:32:00Z",
    "download_url": "https://...",
    "filename": "intro-physics-2024-01-15.pdf"
  }
]
```

**Verification:**
- ✓ Returns array of export objects
- ✓ Pagination parameters work (limit, offset)
- ✓ Only returns user's own exports (or admin access)
- ✓ Sorted by created_at descending

---

## Edge Cases

### 21. Invalid Job ID

**Test Case:** Non-existent job ID

**Steps:**
1. Navigate to `/exports/invalid_job_id`

**Expected Results:**
- ✓ Shows "Export job not found" message
- ✓ No crash or infinite loading
- ✓ Option to start new export

---

### 22. Expired Download URL

**Test Case:** Download URL expiration

**Steps:**
1. Complete an export
2. Wait for URL to expire (if time-limited)
3. Attempt download

**Expected Results:**
- ✓ Graceful error message
- ✓ Option to regenerate download link
- ✓ No security vulnerability

---

### 23. Unsupported Format

**Test Case:** Request unsupported export format

**Steps:**
1. Modify request to use unsupported format
2. Submit export request

**Expected Results:**
- ✓ Server returns 400 Bad Request
- ✓ Frontend shows validation error
- ✓ User informed of supported formats

---

### 24. Zero-byte Document

**Test Case:** Export empty document

**Steps:**
1. Create/export document with no content
2. Attempt export

**Expected Results:**
- ✓ Export completes or shows appropriate message
- ✓ No crash or timeout
- ✓ Generated file valid (even if empty)

---

### 25. Special Characters in Filename

**Test Case:** Documents with special characters

**Steps:**
1. Export document titled "C++ & C# Programming: What's New?"
2. Verify downloaded filename

**Expected Results:**
- ✓ Filename sanitized (no illegal characters)
- ✓ File downloads successfully
- ✓ Filename remains recognizable

---

### 26. Simultaneous Same-Document Exports

**Test Case:** Export same document twice rapidly

**Steps:**
1. Click export twice quickly
2. Verify both jobs created

**Expected Results:**
- ✓ Both jobs created with unique IDs
- ✓ No duplicate prevention needed (or implemented)
- ✓ Both complete independently

---

### 27. Network Interruption During Download

**Test Case:** Download interrupted mid-stream

**Steps:**
1. Start downloading large file
2. Disconnect network mid-download
3. Reconnect and retry

**Expected Results:**
- ✓ Browser shows download failed
- ✓ Retry initiates new download
- ✓ No corrupted partial files

---

### 28. Timezone Handling

**Test Case:** Timestamps display in user's timezone

**Steps:**
1. Create export in one timezone
2. View status in different timezone

**Expected Results:**
- ✓ Timestamps convert to local timezone
- ✓ Format consistent across timezones
- ✓ No UTC displayed to user directly

---

### 29. Rate Limiting

**Test Case:** Export rate limits enforced

**Steps:**
1. Trigger 6+ exports within 1 minute
2. Observe behavior

**Expected Results:**
- ✓ Server returns 429 Too Many Requests after limit
- ✓ Frontend shows rate limit message
- ✓ Cooldown period communicated

---

### 30. Browser Compatibility

**Test Case:** Export works across browsers

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Expected Results:**
- ✓ All features work in each browser
- ✓ Download mechanism compatible
- ✓ Styling consistent
- ✓ No browser-specific bugs

---

## Performance Tests

### 31. Initial Load Time

**Test Case:** Status page loads quickly

**Metrics:**
- ✓ Page loads in < 2 seconds
- ✓ First status fetch completes in < 500ms
- ✓ No layout shift during load

---

### 32. Polling Efficiency

**Test Case:** Polling doesn't overload server

**Metrics:**
- ✓ Polling interval is 2 seconds (configurable)
- ✓ Polling stops when job completes
- ✓ Polling pauses when tab inactive (optional optimization)
- ✓ Server load acceptable under concurrent users

---

### 33. Memory Usage

**Test Case:** No memory leaks during long sessions

**Metrics:**
- ✓ Memory stable over 10+ minute export
- ✓ No increasing heap size
- ✓ Cleanup occurs on unmount

---

All tests must pass before Phase 09 is considered complete.
