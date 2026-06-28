# Phase 10: Admin Dashboard - Acceptance Criteria

## Definition of Done

This document defines the complete acceptance criteria for Phase 10: Admin Dashboard. All criteria must be met before this phase is considered complete.

---

## Functional Requirements

### FR-1: Admin Authentication & Authorization

**FR-1.1:** System shall require authentication for all `/admin/*` routes
- **Test:** Navigate to `/admin` while logged out
- **Expected:** Redirect to login page with return URL

**FR-1.2:** System shall enforce role-based access control (RBAC)
- **Test:** Login as regular user, attempt to access `/admin`
- **Expected:** Redirect to home with "Unauthorized" message

**FR-1.3:** System shall support four admin roles: Super Admin, Moderator, Editor, Analyst
- **Test:** Create users with each role
- **Expected:** Each role has correct permissions per hierarchy

**FR-1.4:** System shall hide navigation items based on user permissions
- **Test:** Login as Analyst, view admin sidebar
- **Expected:** Only Analytics visible in navigation

**FR-1.5:** System shall log all admin access attempts to audit trail
- **Test:** Attempt unauthorized access
- **Expected:** Entry in audit logs with timestamp, user, action, result

---

### FR-2: Admin Dashboard

**FR-2.1:** Dashboard shall display total users count
- **Test:** Compare dashboard metric with database count
- **Expected:** Numbers match within 5-second freshness

**FR-2.2:** Dashboard shall display active users count (last 30 days)
- **Test:** Verify calculation matches definition
- **Expected:** Count accurate

**FR-2.3:** Dashboard shall display total and published topics counts
- **Test:** Compare with database
- **Expected:** Numbers match

**FR-2.4:** Dashboard shall display pending documents count
- **Test:** Submit document, verify count increases
- **Expected:** Real-time update or refresh shows new count

**FR-2.5:** Dashboard shall display total assessments and completion counts
- **Test:** Compare with database aggregates
- **Expected:** Numbers accurate

**FR-2.6:** Dashboard shall show recent activity feed (last 20 actions)
- **Test:** Perform admin actions, verify they appear
- **Expected:** Actions listed chronologically with details

**FR-2.7:** Dashboard shall load within 2 seconds
- **Test:** Measure time to interactive (5 samples)
- **Expected:** Average < 2 seconds

**FR-2.8:** Dashboard metrics shall auto-refresh every 60 seconds
- **Test:** Wait 60 seconds, observe refresh
- **Expected:** Metrics update without page reload

---

### FR-3: User Management

**FR-3.1:** System shall display paginated user list
- **Test:** Navigate to `/admin/users`, verify table
- **Expected:** 20 users per page default, pagination controls visible

**FR-3.2:** System shall allow searching users by name/email
- **Test:** Enter search term, observe results
- **Expected:** Filtered results within 500ms, search highlights matches

**FR-3.3:** System shall allow filtering by role
- **Test:** Select multiple roles, apply filter
- **Expected:** Only users with selected roles shown

**FR-3.4:** System shall allow filtering by status (active/suspended)
- **Test:** Filter by status
- **Expected:** Correct users displayed

**FR-3.5:** System shall allow sorting by all columns
- **Test:** Click column headers, verify sort direction
- **Expected:** Ascending/descending toggle works correctly

**FR-3.6:** System shall display user detail page
- **Test:** Click user row, navigate to detail
- **Expected:** Complete user information displayed

**FR-3.7:** System shall allow editing user profile
- **Test:** Modify name, email, save
- **Expected:** Changes persist, validation errors shown for invalid input

**FR-3.8:** System shall allow changing user role
- **Test:** Change role from dropdown, save
- **Expected:** Role updates immediately, confirmation shown

**FR-3.9:** System shall allow suspending/unsuspending users
- **Test:** Suspend active user, verify cannot login
- **Expected:** Status changes, login blocked, unsuspend restores access

**FR-3.10:** System shall allow deleting users
- **Test:** Delete user with no associated content
- **Expected:** User removed, confirmation required

**FR-3.11:** System shall prevent deleting users with associated content
- **Test:** Attempt to delete user with topics/documents
- **Expected:** Error message, deletion blocked, option to transfer content offered

**FR-3.12:** System shall support bulk selection of users
- **Test:** Select multiple users via checkboxes
- **Expected:** Selected count displayed, bulk toolbar appears

**FR-3.13:** System shall support bulk role change
- **Test:** Select 10 users, change role to "moderator"
- **Expected:** All users updated, success message shows count

**FR-3.14:** System shall support bulk suspend/unsuspend
- **Test:** Select users, suspend all
- **Expected:** All users suspended, operation completes < 10 seconds

**FR-3.15:** System shall support bulk delete
- **Test:** Select users without content, delete
- **Expected:** Confirmation required, users deleted, audit logged

**FR-3.16:** System shall export users to CSV
- **Test:** Click "Export CSV", open file
- **Expected:** CSV contains all filtered users with all columns

---

### FR-4: Topic Management

**FR-4.1:** System shall display all topics in paginated table
- **Test:** Navigate to `/admin/topics`
- **Expected:** Table with title, category, status, author, views, date

**FR-4.2:** System shall allow filtering topics by category
- **Test:** Select categories, apply filter
- **Expected:** Only topics in selected categories shown

**FR-4.3:** System shall allow filtering by status (draft/published/archived)
- **Test:** Filter by status
- **Expected:** Correct topics displayed

**FR-4.4:** System shall allow filtering by author
- **Test:** Select author, apply filter
- **Expected:** Only topics by that author shown

**FR-4.5:** System shall allow creating new topics
- **Test:** Click "New Topic", fill form, save
- **Expected:** Topic created, redirect to topic list, success message

**FR-4.6:** System shall validate required topic fields
- **Test:** Submit form with missing title
- **Expected:** Validation error shown, form not submitted

**FR-4.7:** System shall auto-generate slug from title
- **Test:** Enter title, observe slug field
- **Expected:** Slug populated, editable

**FR-4.8:** System shall provide rich text editor for content
- **Test:** Format text, add links, insert images
- **Expected:** Editor functions, content saves correctly

**FR-4.9:** System shall allow uploading featured image
- **Test:** Upload image, verify preview
- **Expected:** Image displays, saves with topic

**FR-4.10:** System shall allow editing existing topics
- **Test:** Edit topic, modify fields, save
- **Expected:** Changes persist, public page updates

**FR-4.11:** System shall allow changing topic status
- **Test:** Change draft to published, save
- **Expected:** Topic visible to users

**FR-4.12:** System shall allow bulk publishing
- **Test:** Select drafts, publish all
- **Expected:** All topics published, count shown

**FR-4.13:** System shall allow bulk archiving
- **Test:** Select published topics, archive all
- **Expected:** Topics archived, hidden from main list

**FR-4.14:** System shall allow bulk deletion
- **Test:** Select topics, delete
- **Expected:** Confirmation required, topics deleted

**FR-4.15:** System shall export topics to CSV
- **Test:** Export topics
- **Expected:** CSV with all topic metadata

---

### FR-5: Document Moderation

**FR-5.1:** System shall display pending documents first
- **Test:** Navigate to `/admin/documents`
- **Expected:** Pending documents at top, sorted by submission date

**FR-5.2:** System shall allow filtering by status
- **Test:** Filter by pending/approved/rejected
- **Expected:** Correct documents shown

**FR-5.3:** System shall allow filtering by document type
- **Test:** Select types, apply filter
- **Expected:** Only selected types shown

**FR-5.4:** System shall allow filtering by submitter
- **Test:** Select user, apply filter
- **Expected:** Only documents by that user shown

**FR-5.5:** System shall display document preview
- **Test:** Click document, view preview
- **Expected:** Full content visible, metadata displayed

**FR-5.6:** System shall allow approving documents
- **Test:** Click "Approve", confirm
- **Expected:** Status changes to approved, document visible to users

**FR-5.7:** System shall allow rejecting documents with reason
- **Test:** Click "Reject", enter reason, submit
- **Expected:** Status changes to rejected, reason saved, submitter notified

**FR-5.8:** System shall require rejection reason
- **Test:** Reject without reason
- **Expected:** Validation error, submission blocked

**FR-5.9:** System shall support bulk approval
- **Test:** Select pending documents, bulk approve
- **Expected:** All approved, count shown

**FR-5.10:** System shall support bulk rejection
- **Test:** Select documents, bulk reject with reason
- **Expected:** All rejected, reason applied to all

**FR-5.11:** System shall track approval history
- **Test:** View document with multiple approvals/rejections
- **Expected:** History shows all actions with timestamps and admins

---

### FR-6: Assessment Management

**FR-6.1:** System shall display all assessments in table
- **Test:** Navigate to `/admin/assessments`
- **Expected:** Table with title, type, topic, status, questions count

**FR-6.2:** System shall allow filtering by assessment type
- **Test:** Filter by quiz/practice/graded
- **Expected:** Correct assessments shown

**FR-6.3:** System shall allow filtering by topic
- **Test:** Select topic, apply filter
- **Expected:** Only assessments for that topic shown

**FR-6.4:** System shall allow creating new assessments
- **Test:** Click "New Assessment", fill form
- **Expected:** Assessment created successfully

**FR-6.5:** System shall provide question builder interface
- **Test:** Add MCQ, true/false, short answer questions
- **Expected:** Questions added with all fields

**FR-6.6:** System shall allow adding answer options for MCQs
- **Test:** Add 4 options, mark correct answer
- **Expected:** Options saved, correct answer indicated

**FR-6.7:** System shall allow adding explanations to questions
- **Test:** Add explanation, save
- **Expected:** Explanation saved, visible to students after attempt

**FR-6.8:** System shall allow reordering questions via drag-and-drop
- **Test:** Drag question to new position
- **Expected:** Order changes, persists after save

**FR-6.9:** System shall allow deleting questions
- **Test:** Delete question from assessment
- **Expected:** Question removed, count updates

**FR-6.10:** System shall allow configuring assessment settings
- **Test:** Set time limit, passing score, shuffle, retakes
- **Expected:** All settings save correctly

**FR-6.11:** System shall allow saving drafts
- **Test:** Save incomplete assessment as draft
- **Expected:** Draft saved, not visible to students

**FR-6.12:** System shall allow publishing assessments
- **Test:** Publish draft assessment
- **Expected:** Status changes, visible to students

**FR-6.13:** System shall allow editing published assessments
- **Test:** Edit published assessment, save
- **Expected:** Changes apply, warns if students have attempted

**FR-6.14:** System shall prevent editing assessments with completed attempts
- **Test:** Attempt to modify questions after student attempts
- **Expected:** Warning shown, requires confirmation or blocks changes

**FR-6.15:** System shall allow duplicating assessments
- **Test:** Duplicate existing assessment
- **Expected:** Copy created with "(Copy)" in title, all questions copied

---

### FR-7: Analytics Dashboard

**FR-7.1:** System shall display user growth chart
- **Test:** View analytics page
- **Expected:** Line chart showing signups over time

**FR-7.2:** System shall display topic engagement chart
- **Test:** View analytics page
- **Expected:** Bar chart showing views/completions per topic

**FR-7.3:** System shall display assessment performance chart
- **Test:** View analytics page
- **Expected:** Pie/bar chart showing pass/fail distribution

**FR-7.4:** System shall display document submissions trend
- **Test:** View analytics page
- **Expected:** Area chart showing submissions over time

**FR-7.5:** System shall provide date range picker
- **Test:** Change date range
- **Expected:** All charts update with new range

**FR-7.6:** System shall allow exporting analytics report
- **Test:** Click "Export Report"
- **Expected:** PDF/CSV generated with all metrics

**FR-7.7:** System shall display top performing topics table
- **Test:** View analytics page
- **Expected:** Top 10 topics by views/completions

**FR-7.8:** System shall allow comparing periods
- **Test:** Enable "Compare previous period"
- **Expected:** Previous period data shown alongside current

---

### FR-8: System Settings

**FR-8.1:** System shall allow updating general settings
- **Test:** Change site name, logo, language
- **Expected:** Changes apply immediately

**FR-8.2:** System shall allow configuring authentication settings
- **Test:** Change session timeout, password policy
- **Expected:** New settings apply to subsequent logins

**FR-8.3:** System shall allow toggling 2FA requirement
- **Test:** Enable 2FA enforcement
- **Expected:** Users prompted to set up 2FA on next login

**FR-8.4:** System shall allow configuring content defaults
- **Test:** Change default topic visibility
- **Expected:** New topics use default setting

**FR-8.5:** System shall allow configuring email settings
- **Test:** Update SMTP configuration
- **Expected:** Test email sends successfully

**FR-8.6:** System shall allow managing feature flags
- **Test:** Toggle feature flag
- **Expected:** Feature enables/disables immediately

**FR-8.7:** System shall allow configuring storage limits
- **Test:** Change max file size
- **Expected:** Upload validation uses new limit

**FR-8.8:** System shall validate settings before saving
- **Test:** Enter invalid SMTP host
- **Expected:** Validation error, save blocked

---

### FR-9: Audit Logs

**FR-9.1:** System shall display audit log entries in table
- **Test:** Navigate to `/admin/logs`
- **Expected:** Table with timestamp, user, action, resource, IP

**FR-9.2:** System shall allow filtering by user
- **Test:** Select user, apply filter
- **Expected:** Only actions by that user shown

**FR-9.3:** System shall allow filtering by action type
- **Test:** Select actions (create, update, delete)
- **Expected:** Only selected actions shown

**FR-9.4:** System shall allow filtering by resource type
- **Test:** Select resource types (user, topic, document)
- **Expected:** Only actions on those resources shown

**FR-9.5:** System shall allow filtering by date range
- **Test:** Set date range
- **Expected:** Only logs in range shown

**FR-9.6:** System shall allow searching logs
- **Test:** Search by keyword
- **Expected:** Matching logs displayed

**FR-9.7:** System shall display log details in modal
- **Test:** Click log entry
- **Expected:** Modal shows full details including request/response

**FR-9.8:** System shall allow exporting logs to CSV
- **Test:** Click "Export Logs"
- **Expected:** CSV downloaded with all filtered logs

**FR-9.9:** System shall retain logs for minimum 90 days
- **Test:** Query logs from 90 days ago
- **Expected:** Logs available

---

## Technical Requirements

### TR-1: Performance

**TR-1.1:** Admin dashboard shall load within 2 seconds
- **Measurement:** Time to interactive, 5-sample average
- **Threshold:** < 2000ms

**TR-1.2:** Table operations shall complete within 500ms
- **Measurement:** Filter/sort/pagination response time
- **Threshold:** < 500ms

**TR-1.3:** Bulk operations shall complete within 10 seconds for 1000 records
- **Measurement:** End-to-end execution time
- **Threshold:** < 10000ms

**TR-1.4:** Charts shall render within 1 second
- **Measurement:** Time from navigation to chart visible
- **Threshold:** < 1000ms

**TR-1.5:** System shall maintain 60 FPS during table scrolling
- **Measurement:** Frame rate during scroll
- **Threshold:** ≥ 60 FPS

---

### TR-2: Security

**TR-2.1:** All admin routes shall require authentication
- **Test:** Access `/admin` without token
- **Expected:** 401 Unauthorized

**TR-2.2:** All mutations shall include CSRF token
- **Test:** Submit POST without CSRF token
- **Expected:** 403 Forbidden

**TR-2.3:** System shall validate all inputs server-side
- **Test:** Submit malicious input
- **Expected:** Rejected with validation error

**TR-2.4:** System shall prevent SQL injection
- **Test:** Submit SQL injection payloads
- **Expected:** Sanitized, no SQL errors exposed

**TR-2.5:** System shall prevent XSS attacks
- **Test:** Submit XSS payloads in text fields
- **Expected:** Escaped, not executed

**TR-2.6:** System shall enforce RBAC on backend
- **Test:** Call admin API with non-admin token
- **Expected:** 403 Forbidden

**TR-2.7:** System shall log security events
- **Test:** Attempt unauthorized access
- **Expected:** Event in audit log

**TR-2.8:** System shall implement rate limiting
- **Test:** Send 100 requests/second
- **Expected:** Rate limit exceeded after threshold

---

### TR-3: Accessibility

**TR-3.1:** System shall meet WCAG 2.1 AA color contrast
- **Test:** Automated contrast check
- **Expected:** Ratio ≥ 4.5:1 for all text

**TR-3.2:** All interactive elements shall be keyboard accessible
- **Test:** Navigate entire admin with keyboard only
- **Expected:** All actions possible, logical tab order

**TR-3.3:** Focus indicators shall be visible
- **Test:** Tab through elements
- **Expected:** 3px outline visible on focused element

**TR-3.4:** Forms shall have associated labels
- **Test:** Screen reader navigation
- **Expected:** Labels announced for all inputs

**TR-3.5:** Tables shall have proper ARIA attributes
- **Test:** Screen reader table navigation
- **Expected:** Caption, headers, row/column info announced

**TR-3.6:** Dynamic updates shall use ARIA live regions
- **Test:** Trigger bulk action, screen reader active
- **Expected:** Progress/completion announced

**TR-3.7:** Modals shall trap focus
- **Test:** Open modal, tab through
- **Expected:** Focus cycles within modal, Escape closes

**TR-3.8:** Skip links shall be functional
- **Test:** Press Tab on page load
- **Expected:** "Skip to main content" link appears and works

**TR-3.9:** Zero critical accessibility violations
- **Test:** Run axe-core automated scan
- **Expected:** 0 critical violations

---

### TR-4: Responsive Design

**TR-4.1:** Admin shall be fully functional on desktop (> 1024px)
- **Test:** Use at 1920x1080 resolution
- **Expected:** All features work, optimal layout

**TR-4.2:** Admin shall be functional on tablet (640-1024px)
- **Test:** Use at 768x1024 resolution
- **Expected:** All features work, sidebar collapsible

**TR-4.3:** Admin shall be usable on mobile (< 640px)
- **Test:** Use at 375x667 resolution
- **Expected:** Core features work, tables convert to cards

**TR-4.4:** Touch targets shall be minimum 44x44 pixels
- **Test:** Measure button/link sizes
- **Expected:** All interactive elements ≥ 44px

---

### TR-5: Browser Compatibility

**TR-5.1:** System shall work in Chrome (latest)
- **Test:** Execute all critical path tests
- **Expected:** All pass

**TR-5.2:** System shall work in Firefox (latest)
- **Test:** Execute all critical path tests
- **Expected:** All pass

**TR-5.3:** System shall work in Safari (latest)
- **Test:** Execute all critical path tests
- **Expected:** All pass

**TR-5.4:** System shall work in Edge (latest)
- **Test:** Execute all critical path tests
- **Expected:** All pass

---

### TR-6: Error Handling

**TR-6.1:** API errors shall display user-friendly messages
- **Test:** Trigger 400 error
- **Expected:** Clear message explaining issue

**TR-6.2:** Permission errors shall redirect appropriately
- **Test:** Access unauthorized resource
- **Expected:** Redirect with explanation

**TR-6.3:** Network errors shall offer retry option
- **Test:** Disconnect network, trigger action
- **Expected:** Error with "Retry" button

**TR-6.4:** Form validation errors shall be inline
- **Test:** Submit invalid form
- **Expected:** Errors shown next to fields, not just top

**TR-6.5:** 404 errors shall show custom page
- **Test:** Navigate to non-existent admin route
- **Expected:** Custom 404 within admin layout

---

## Documentation Requirements

### DR-1: Code Documentation

**DR-1.1:** All components shall have JSDoc comments
- **Check:** Review component files
- **Expected:** Props, return type documented

**DR-1.2:** Complex logic shall have inline comments
- **Check:** Review business logic
- **Expected:** Comments explain why, not what

**DR-1.3:** API functions shall document parameters and return types
- **Check:** Review API client
- **Expected:** TypeScript types complete

---

### DR-2: User Documentation

**DR-2.1:** Admin user guide shall be written
- **Check:** Documentation exists
- **Expected:** Covers all features with screenshots

**DR-2.2:** Role-specific guides shall be provided
- **Check:** Separate sections for each role
- **Expected:** Analyst, Editor, Moderator, Super Admin guides

**DR-2.3:** FAQ section shall address common issues
- **Check:** FAQ exists
- **Expected:** 10+ common questions answered

---

### DR-3: Project Documentation

**DR-3.1:** README.md shall be complete
- **Check:** Phase 10 README
- **Expected:** Overview, goals, deliverables, dependencies, exit criteria

**DR-3.2:** Implementation.md shall be complete
- **Check:** Phase 10 implementation guide
- **Expected:** All pages, components, APIs, state documented

**DR-3.3:** Tests.md shall be complete
- **Check:** Phase 10 test plan
- **Expected:** Manual, regression, API, edge case tests

**DR-3.4:** Acceptance.md shall be complete
- **Check:** This document
- **Expected:** All criteria defined

**DR-3.5:** CHANGELOG.md shall be updated
- **Check:** Changelog entry for Phase 10
- **Expected:** Date, version, features, fixes listed

**DR-3.6:** CURRENT_PHASE.md shall be updated
- **Check:** Current phase indicator
- **Expected:** Shows Phase 10 as current/completed

---

## Testing Requirements

### TST-1: Unit Tests

**TST-1.1:** All components shall have unit tests
- **Requirement:** ≥ 80% component coverage
- **Check:** Test files exist, coverage report

**TST-1.2:** All hooks shall have unit tests
- **Requirement:** 100% hook coverage
- **Check:** Test files for all hooks

**TST-1.3:** All utility functions shall have unit tests
- **Requirement:** ≥ 90% utility coverage
- **Check:** Test files for utilities

---

### TST-2: Integration Tests

**TST-2.1:** Critical workflows shall have integration tests
- **Workflows:** User CRUD, Topic CRUD, Document moderation, Assessment creation
- **Check:** Integration test files exist

**TST-2.2:** API integration shall be tested
- **Check:** Mock API tests for all endpoints
- **Expected:** Request/response validated

---

### TST-3: E2E Tests

**TST-3.1:** Happy path shall have E2E coverage
- **Paths:** Login → Admin → User management → Logout
- **Check:** Playwright/Cypress tests exist

**TST-3.2:** Error scenarios shall have E2E coverage
- **Scenarios:** Unauthorized access, validation errors, network failures
- **Check:** Error path tests exist

---

### TST-4: Performance Tests

**TST-4.1:** Load time benchmarks shall be tested
- **Check:** Performance test suite exists
- **Expected:** Dashboard, tables, charts benchmarked

**TST-4.2:** Load testing shall be performed
- **Check:** 10 concurrent users test executed
- **Expected:** Results documented

---

## Sign-Off

### Approval Required From:

- [ ] **Frontend Lead** - Code quality, architecture compliance
- [ ] **Backend Lead** - API integration, security review
- [ ] **QA Lead** - Test coverage, acceptance verification
- [ ] **Product Owner** - Feature completeness, UX approval
- [ ] **Security Team** - Security audit passed

### Sign-Off Date: _______________

### Phase 10 Completion Checklist:

- [ ] All functional requirements met
- [ ] All technical requirements met
- [ ] All documentation complete
- [ ] All tests passing
- [ ] Security review passed
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Stakeholder approval obtained

---

**Phase 10 is complete when ALL criteria above are satisfied.**
