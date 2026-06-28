# Phase 10: Admin Dashboard - Tests

## Manual Verification Tests

### Test 1: Admin Dashboard Access
**Objective:** Verify admin dashboard is accessible only to authorized users

**Steps:**
1. Navigate to `/admin` while logged out
2. Navigate to `/admin` with a regular user account
3. Navigate to `/admin` with an admin account

**Expected Results:**
- Logged out: Redirected to login page
- Regular user: Redirected to home page with "Unauthorized" message
- Admin: Dashboard loads successfully with metrics

---

### Test 2: Dashboard Metrics Display
**Objective:** Verify all metrics display correctly on admin dashboard

**Steps:**
1. Log in as admin
2. Navigate to `/admin`
3. Observe metric cards

**Expected Results:**
- Total users count displays
- Active users count displays
- Total topics count displays
- Published topics count displays
- Pending documents count displays
- Total assessments count displays
- All numbers match database values
- Loading skeleton shows during fetch

---

### Test 3: User Management - List Users
**Objective:** Verify user list displays with pagination and filters

**Steps:**
1. Navigate to `/admin/users`
2. Observe user table
3. Change page size to 10, 25, 50, 100
4. Navigate through pages
5. Search for a user by name
6. Filter by role (admin, moderator, editor)
7. Filter by status (active, suspended)
8. Sort by name, email, created date

**Expected Results:**
- Table displays users with all columns
- Pagination works correctly
- Page size changes apply immediately
- Search filters results in real-time
- Role filter shows only selected roles
- Status filter shows only selected statuses
- Sorting works ascending/descending
- Total count updates with filters

---

### Test 4: User Management - Edit User
**Objective:** Verify user editing functionality

**Steps:**
1. Navigate to `/admin/users`
2. Click on a user row
3. Click "Edit" button
4. Change user's name
5. Change user's email
6. Change user's role
7. Save changes
8. Verify changes persist

**Expected Results:**
- User detail page loads
- Edit form pre-fills with current data
- Name field accepts valid input
- Email field validates format
- Role selector shows available roles
- Save button enabled when valid
- Success toast appears on save
- Changes visible in user list

---

### Test 5: User Management - Suspend/Unsuspend
**Objective:** Verify user suspension functionality

**Steps:**
1. Navigate to `/admin/users/[id]`
2. Click "Suspend User" button
3. Confirm suspension
4. Verify user status changes
5. Click "Unsuspend User"
6. Confirm unsuspension

**Expected Results:**
- Confirmation dialog appears
- User status changes to "suspended"
- Suspended user cannot log in
- Unsuspend restores access
- Audit log records action

---

### Test 6: User Management - Bulk Actions
**Objective:** Verify bulk user operations

**Steps:**
1. Navigate to `/admin/users`
2. Select multiple users via checkboxes
3. Click "Bulk Actions" dropdown
4. Select "Change Role"
5. Choose new role
6. Confirm action
7. Select different users
8. Select "Suspend Users"
9. Confirm action

**Expected Results:**
- Checkboxes select/deselect individual users
- "Select All" selects all visible users
- Bulk action toolbar appears when items selected
- Action executes on all selected users
- Progress indicator shows during execution
- Success message shows count of affected users
- Users update in table after action

---

### Test 7: Topic Management - Create Topic
**Objective:** Verify topic creation workflow

**Steps:**
1. Navigate to `/admin/topics`
2. Click "New Topic" button
3. Fill in title, slug, description
4. Select category
5. Add content using rich text editor
6. Add SEO metadata
7. Upload featured image
8. Set status to "Published"
9. Save topic

**Expected Results:**
- Form validates required fields
- Slug auto-generates from title
- Rich text editor functions properly
- Image upload shows preview
- SEO fields optional
- Save creates topic successfully
- Redirect to topic list
- New topic appears in list

---

### Test 8: Topic Management - Edit Topic
**Objective:** Verify topic editing functionality

**Steps:**
1. Navigate to `/admin/topics`
2. Click "Edit" on a topic
3. Modify title and content
4. Change category
5. Update SEO metadata
6. Save changes
7. Verify changes on public topic page

**Expected Results:**
- Form pre-fills with existing data
- All fields editable
- Changes save successfully
- Public page reflects updates
- Audit log records changes

---

### Test 9: Topic Management - Bulk Publish/Archive
**Objective:** Verify bulk topic operations

**Steps:**
1. Navigate to `/admin/topics`
2. Select multiple draft topics
3. Click "Publish Selected"
4. Confirm action
5. Select multiple published topics
6. Click "Archive Selected"
7. Confirm action

**Expected Results:**
- Bulk publish changes status to "published"
- Topics become visible to users
- Bulk archive changes status to "archived"
- Archived topics hidden from main list
- Operations complete within 10 seconds

---

### Test 10: Document Moderation - Approve Document
**Objective:** Verify document approval workflow

**Steps:**
1. Navigate to `/admin/documents`
2. Filter by "Pending" status
3. Click on a pending document
4. Review document content
5. Click "Approve" button
6. Verify document status changes

**Expected Results:**
- Pending documents listed first
- Document preview loads correctly
- Approve button enabled
- Status changes to "Approved"
- Document visible to users
- Submitter receives notification (if implemented)

---

### Test 11: Document Moderation - Reject Document
**Objective:** Verify document rejection workflow

**Steps:**
1. Navigate to `/admin/documents`
2. Select a pending document
3. Click "Reject" button
4. Enter rejection reason
5. Submit rejection
6. Verify document status changes

**Expected Results:**
- Rejection modal appears
- Reason field required
- Status changes to "Rejected"
- Document not visible to users
- Submitter receives rejection notice with reason

---

### Test 12: Document Moderation - Bulk Approve
**Objective:** Verify bulk document approval

**Steps:**
1. Navigate to `/admin/documents`
2. Filter by "Pending"
3. Select multiple documents
4. Click "Bulk Approve"
5. Confirm action

**Expected Results:**
- All selected documents approved
- Status changes to "Approved"
- Count displayed in success message
- Documents visible to users

---

### Test 13: Assessment Management - Create Assessment
**Objective:** Verify assessment creation with questions

**Steps:**
1. Navigate to `/admin/assessments`
2. Click "New Assessment"
3. Fill basic info (title, description, type)
4. Select associated topic
5. Add 3 MCQ questions
6. Add 1 true/false question
7. Configure settings (time limit, passing score)
8. Save as draft
9. Publish assessment

**Expected Results:**
- Basic info form validates
- Topic selector shows available topics
- Question builder adds questions correctly
- MCQ options editable
- Correct answers markable
- Explanations addable
- Settings save properly
- Draft saves without publishing
- Publish makes assessment available

---

### Test 14: Assessment Management - Edit Assessment
**Objective:** Verify assessment editing functionality

**Steps:**
1. Navigate to `/admin/assessments`
2. Click "Edit" on an assessment
3. Modify title
4. Add a new question
5. Delete an existing question
6. Reorder questions via drag-and-drop
7. Update settings
8. Save changes

**Expected Results:**
- Assessment loads with all questions
- Title editable
- New question adds to list
- Delete removes question
- Drag-and-drop reorders questions
- Settings update correctly
- Changes persist after save

---

### Test 15: Analytics Dashboard - View Metrics
**Objective:** Verify analytics dashboard displays data

**Steps:**
1. Navigate to `/admin/analytics`
2. Observe metric cards
3. View user growth chart
4. View topic engagement chart
5. View assessment performance chart
6. Change date range
7. Export report

**Expected Results:**
- Metric cards show current period data
- Charts render without errors
- Date range picker functions
- Charts update with new date range
- Export generates CSV/PDF file
- Data matches database aggregates

---

### Test 16: System Settings - Update Settings
**Objective:** Verify system settings can be updated

**Steps:**
1. Navigate to `/admin/settings`
2. Change site name
3. Update session timeout
4. Change password policy
5. Toggle feature flags
6. Save settings

**Expected Results:**
- All settings sections load
- Form validates inputs
- Save updates configuration
- Changes apply immediately
- Settings persist after refresh

---

### Test 17: Audit Logs - View Logs
**Objective:** Verify audit log viewing functionality

**Steps:**
1. Navigate to `/admin/logs`
2. Observe log entries
3. Filter by user
4. Filter by action type
5. Filter by date range
6. Search logs
7. View log details
8. Export logs

**Expected Results:**
- Log table displays entries
- Filters work correctly
- Search finds matching logs
- Detail modal shows full information
- Export generates CSV file
- Pagination works for large datasets

---

### Test 18: Role-Based Access Control
**Objective:** Verify RBAC enforcement across admin sections

**Steps:**
1. Log in as "analyst" role
2. Attempt to access `/admin/users`
3. Attempt to access `/admin/topics`
4. Attempt to access `/admin/analytics`
5. Log in as "editor" role
6. Attempt to edit a topic
7. Attempt to manage users
8. Log in as "moderator" role
9. Attempt to approve documents
10. Attempt to change system settings

**Expected Results:**
- Analyst: Can view analytics only, other sections restricted
- Editor: Can manage topics/assessments, cannot manage users
- Moderator: Can manage content and users, cannot change settings
- Unauthorized actions show "Forbidden" message
- Navigation hides inaccessible links

---

### Test 19: Keyboard Navigation
**Objective:** Verify keyboard accessibility throughout admin

**Steps:**
1. Navigate to `/admin` using keyboard only
2. Tab through all interactive elements
3. Use arrow keys in tables
4. Open dropdowns with Enter/Space
5. Close modals with Escape
6. Submit forms with Enter
7. Navigate sidebar with keyboard

**Expected Results:**
- All elements focusable
- Focus order logical
- Focus indicators visible
- Dropdowns open/close with keyboard
- Modals trap focus correctly
- Escape closes overlays
- Tables navigable with arrow keys

---

### Test 20: Screen Reader Compatibility
**Objective:** Verify screen reader support

**Steps:**
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate to `/admin/users`
3. Have screen reader read table
4. Navigate to edit form
5. Submit form with error
6. Open confirmation dialog

**Expected Results:**
- Table announced with caption
- Column headers announced
- Row data read correctly
- Form labels announced
- Error messages read
- Dialog purpose announced
- ARIA live regions announce updates

---

## Regression Tests

### Regression Test 1: User CRUD After Schema Changes
**Objective:** Ensure user management survives backend updates

**Steps:**
1. Perform backend deployment
2. Execute all user management tests
3. Verify no regressions

**Expected Results:**
- All user operations function correctly
- No breaking changes introduced

---

### Regression Test 2: Bulk Operations Performance
**Objective:** Ensure bulk operations remain performant with growing data

**Steps:**
1. Load admin with 1000+ users
2. Execute bulk action on 100 users
3. Measure execution time
4. Repeat with 500 users

**Expected Results:**
- Operations complete within SLA (< 10 seconds)
- UI remains responsive during execution
- No timeout errors

---

### Regression Test 3: Cross-Browser Compatibility
**Objective:** Verify admin works across supported browsers

**Steps:**
1. Test in Chrome (latest)
2. Test in Firefox (latest)
3. Test in Safari (latest)
4. Test in Edge (latest)
5. Execute critical path tests in each

**Expected Results:**
- All features functional in each browser
- Visual consistency maintained
- No browser-specific bugs

---

### Regression Test 4: Mobile Responsiveness
**Objective:** Verify admin remains usable on tablets

**Steps:**
1. Open admin on tablet (iPad/Surface)
2. Test navigation
3. Test user table
4. Test forms
5. Test modals

**Expected Results:**
- Layout adapts correctly
- Touch targets adequate
- No horizontal scrolling
- Forms usable

---

### Regression Test 5: Accessibility After Updates
**Objective:** Ensure accessibility not broken by changes

**Steps:**
1. Run automated accessibility tests (axe-core)
2. Manually test keyboard navigation
3. Test with screen reader
4. Check color contrast

**Expected Results:**
- Zero critical accessibility violations
- Keyboard navigation intact
- Screen reader compatibility maintained
- Contrast ratios meet WCAG AA

---

## API Verification Tests

### API Test 1: GET /api/v1/admin/users
**Objective:** Verify user list endpoint

**Request:**
```
GET /api/v1/admin/users?page=1&limit=20&status=active
Authorization: Bearer <admin_token>
```

**Expected Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**Verify:**
- Status code: 200
- Returns paginated response
- Filters applied correctly
- Authentication required

---

### API Test 2: PATCH /api/v1/admin/users/:id
**Objective:** Verify user update endpoint

**Request:**
```
PATCH /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "moderator",
  "status": "active"
}
```

**Expected Response:**
```json
{
  "id": "...",
  "name": "...",
  "email": "...",
  "role": "moderator",
  "status": "active"
}
```

**Verify:**
- Status code: 200
- User updated in database
- Response contains updated fields
- Audit log entry created

---

### API Test 3: POST /api/v1/admin/documents/bulk-approve
**Objective:** Verify bulk document approval endpoint

**Request:**
```
POST /api/v1/admin/documents/bulk-approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "documentIds": ["doc1", "doc2", "doc3"]
}
```

**Expected Response:**
```json
{
  "success": 3,
  "failed": 0,
  "errors": []
}
```

**Verify:**
- Status code: 200
- All documents approved
- Response counts accurate
- Operation atomic (all or nothing)

---

### API Test 4: GET /api/v1/admin/analytics/overview
**Objective:** Verify analytics endpoint

**Request:**
```
GET /api/v1/admin/analytics/overview?from=2024-01-01&to=2024-01-31
Authorization: Bearer <admin_token>
```

**Expected Response:**
```json
{
  "totalUsers": 1500,
  "activeUsers": 1200,
  "newUsersThisPeriod": 150,
  "totalTopics": 85,
  "publishedTopics": 75,
  ...
}
```

**Verify:**
- Status code: 200
- Metrics accurate
- Date range respected
- Aggregations correct

---

### API Test 5: GET /api/v1/admin/logs
**Objective:** Verify audit logs endpoint

**Request:**
```
GET /api/v1/admin/logs?page=1&limit=50&action=update
Authorization: Bearer <admin_token>
```

**Expected Response:**
```json
{
  "data": [
    {
      "id": "...",
      "timestamp": "...",
      "userId": "...",
      "action": "update",
      "resourceType": "topic",
      ...
    }
  ],
  "pagination": {...}
}
```

**Verify:**
- Status code: 200
- Logs returned in reverse chronological order
- Filters applied
- Sensitive data masked

---

## Edge Case Tests

### Edge Case 1: Empty State - No Users
**Objective:** Verify behavior when no users exist

**Steps:**
1. Navigate to `/admin/users` with empty database
2. Observe table

**Expected Results:**
- Empty state message displays
- "Create User" button visible (if applicable)
- No errors shown
- Pagination hidden

---

### Edge Case 2: Very Long User Names
**Objective:** Verify handling of long text

**Steps:**
1. Create user with 100-character name
2. View in user table
3. View in user detail

**Expected Results:**
- Table column truncates gracefully
- Tooltip shows full name
- Detail page displays full name
- No layout breaking

---

### Edge Case 3: Concurrent Edits
**Objective:** Verify behavior with simultaneous edits

**Steps:**
1. Open user edit in two browser tabs
2. Modify and save in Tab 1
3. Modify and save in Tab 2
4. Refresh both tabs

**Expected Results:**
- Last save wins (or optimistic locking)
- Conflict detection (if implemented)
- No data corruption
- Clear error message if conflict

---

### Edge Case 4: Network Failure During Bulk Operation
**Objective:** Verify resilience to network issues

**Steps:**
1. Select 50 users for bulk action
2. Disconnect network
3. Execute bulk action
4. Reconnect network
5. Retry operation

**Expected Results:**
- Error message shown
- Operation does not partially complete
- Retry succeeds
- No duplicate actions

---

### Edge Case 5: SQL Injection Attempt
**Objective:** Verify protection against injection attacks

**Steps:**
1. In user search field, enter: `'; DROP TABLE users; --`
2. Submit search
3. In URL parameters, inject malicious SQL
4. Attempt XSS in text fields

**Expected Results:**
- Input sanitized
- Query executes safely
- No SQL errors exposed
- XSS prevented
- Attack logged in audit trail

---

### Edge Case 6: Session Timeout During Operation
**Objective:** Verify graceful session expiration

**Steps:**
1. Log in as admin
2. Wait for session to expire (or manually expire)
3. Attempt to save user edit
4. Attempt to navigate to admin section

**Expected Results:**
- Redirect to login page
- Clear message about session expiration
- Return to same page after re-login (if possible)
- Unsaved changes preserved (if possible)

---

### Edge Case 7: Large Dataset Pagination
**Objective:** Verify pagination with 10,000+ records

**Steps:**
1. Load database with 10,000 users
2. Navigate to `/admin/users`
3. Jump to page 500
4. Change page size to 100
5. Sort by various columns

**Expected Results:**
- Pagination performs efficiently (< 2s)
- No timeout errors
- Correct records displayed
- Total count accurate
- Memory usage reasonable

---

### Edge Case 8: File Upload Limits
**Objective:** Verify file upload validation

**Steps:**
1. Attempt to upload 100MB image (exceeds limit)
2. Attempt to upload .exe file (invalid type)
3. Upload valid 5MB PNG

**Expected Results:**
- Oversized file rejected with clear message
- Invalid file type rejected
- Valid file uploads successfully
- Error messages helpful

---

### Edge Case 9: Timezone Handling
**Objective:** Verify correct timezone display

**Steps:**
1. Set system timezone to UTC
2. Set user timezone to EST
3. View audit logs with timestamps
4. View user "last active" times

**Expected Results:**
- Timestamps display in user's timezone
- UTC stored in database
- Conversion accurate
- DST handled correctly

---

### Edge Case 10: Permission Escalation Attempt
**Objective:** Verify prevention of privilege escalation

**Steps:**
1. Log in as editor
2. Attempt to access super admin-only endpoints via direct API call
3. Attempt to change own role to admin
4. Attempt to grant admin role to another user

**Expected Results:**
- All attempts blocked
- 403 Forbidden responses
- Attempts logged in audit trail
- No elevation successful

---

## Performance Tests

### Performance Test 1: Dashboard Load Time
**Objective:** Verify dashboard loads within 2 seconds

**Steps:**
1. Clear cache
2. Navigate to `/admin`
3. Measure time to interactive
4. Repeat 5 times
5. Calculate average

**Expected Results:**
- Average load time < 2 seconds
- First contentful paint < 1 second
- Time to interactive < 2.5 seconds

---

### Performance Test 2: Table Rendering Performance
**Objective:** Verify smooth table rendering with large datasets

**Steps:**
1. Load user table with 100 rows
2. Scroll through table
3. Apply filters
4. Sort columns
5. Measure frame rate

**Expected Results:**
- Frame rate ≥ 60 FPS
- No jank during scroll
- Filter application < 500ms
- Sort application < 500ms

---

### Performance Test 3: Chart Rendering Performance
**Objective:** Verify charts render efficiently

**Steps:**
1. Navigate to `/admin/analytics`
2. Measure time for all charts to render
3. Change date range
4. Measure chart update time

**Expected Results:**
- Initial render < 1 second
- Update on date change < 500ms
- No memory leaks on repeated updates
- Smooth animations

---

### Performance Test 4: Bulk Operation Throughput
**Objective:** Verify bulk operations handle large batches

**Steps:**
1. Select 1000 users
2. Execute bulk status change
3. Measure execution time
4. Monitor server resources

**Expected Results:**
- Completion within 10 seconds
- Server CPU < 80%
- No timeout errors
- All records processed

---

### Performance Test 5: Concurrent User Load
**Objective:** Verify admin handles multiple concurrent admins

**Steps:**
1. Simulate 10 concurrent admin sessions
2. Each session performs CRUD operations
3. Monitor response times
4. Monitor error rates

**Expected Results:**
- All operations succeed
- Response times < 3 seconds
- No deadlocks
- Database connections managed properly

---

## Acceptance Criteria Validation

### Validation 1: All Pages Implemented
**Check:**
- [ ] `/admin` - Dashboard
- [ ] `/admin/users` - User list
- [ ] `/admin/users/[id]` - User detail
- [ ] `/admin/users/[id]/edit` - User edit
- [ ] `/admin/topics` - Topic list
- [ ] `/admin/topics/new` - Create topic
- [ ] `/admin/topics/[id]/edit` - Edit topic
- [ ] `/admin/documents` - Document moderation
- [ ] `/admin/documents/[id]` - Document review
- [ ] `/admin/assessments` - Assessment list
- [ ] `/admin/assessments/new` - Create assessment
- [ ] `/admin/assessments/[id]/edit` - Edit assessment
- [ ] `/admin/analytics` - Analytics dashboard
- [ ] `/admin/settings` - System settings
- [ ] `/admin/logs` - Audit logs

---

### Validation 2: All Components Functional
**Check:**
- [ ] AdminLayout renders correctly
- [ ] AdminSidebar navigation works
- [ ] UserTable with pagination
- [ ] UserDetailCard displays info
- [ ] TopicManager CRUD operations
- [ ] DocumentModerator approval workflow
- [ ] AssessmentEditor question builder
- [ ] AnalyticsDashboard charts
- [ ] RoleSelector component
- [ ] StatusBadge component
- [ ] AuditLogTable component
- [ ] BulkActionToolbar component
- [ ] FilterPanel component
- [ ] PaginationControls component

---

### Validation 3: Security Requirements Met
**Check:**
- [ ] Authentication required for all routes
- [ ] RBAC enforced on all actions
- [ ] CSRF tokens on mutations
- [ ] Input validation on all forms
- [ ] XSS prevention verified
- [ ] SQL injection prevention verified
- [ ] Audit logging functional
- [ ] Session timeout working

---

### Validation 4: Accessibility Compliance
**Check:**
- [ ] WCAG 2.1 AA color contrast
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Focus indicators visible
- [ ] Form labels associated
- [ ] Error messages accessible
- [ ] Skip links functional

---

### Validation 5: Documentation Complete
**Check:**
- [ ] Component documentation written
- [ ] API documentation updated
- [ ] Admin user guide created
- [ ] Changelog updated
- [ ] CURRENT_PHASE.md updated
- [ ] README.md complete
- [ ] Implementation.md complete
- [ ] Tests.md complete
- [ ] Acceptance.md complete
