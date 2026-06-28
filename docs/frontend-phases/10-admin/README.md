# Phase 10: Admin Dashboard

## Overview

This phase implements the admin dashboard for Sijil, enabling administrators to manage users, topics, documents, assessments, and system settings. The admin panel provides a comprehensive interface for content moderation, user management, analytics overview, and platform configuration.

## Goals

- Build a secure admin dashboard accessible only to authorized users
- Implement user management (view, edit, suspend, delete)
- Create topic management interface (CRUD operations)
- Build document moderation tools
- Implement assessment management
- Provide system analytics overview
- Enable role-based access control (RBAC)
- Create audit logging interface

## Deliverables

1. **Admin Pages**
   - Admin Dashboard (`/admin`)
   - User Management (`/admin/users`, `/admin/users/[id]`)
   - Topic Management (`/admin/topics`, `/admin/topics/[id]/edit`)
   - Document Moderation (`/admin/documents`, `/admin/documents/[id]`)
   - Assessment Management (`/admin/assessments`, `/admin/assessments/[id]/edit`)
   - Analytics Overview (`/admin/analytics`)
   - System Settings (`/admin/settings`)
   - Audit Logs (`/admin/logs`)

2. **Components**
   - `AdminLayout` - Admin-specific layout with sidebar navigation
   - `AdminSidebar` - Navigation menu for admin sections
   - `UserTable` - User list with filters and actions
   - `UserDetailCard` - Individual user information display
   - `TopicManager` - Topic CRUD interface
   - `DocumentModerator` - Document approval/rejection interface
   - `AssessmentEditor` - Assessment creation/editing form
   - `AnalyticsDashboard` - Key metrics visualization
   - `RoleSelector` - Role assignment component
   - `StatusBadge` - Content status indicators
   - `AuditLogTable` - System activity log display
   - `SettingsForm` - System configuration form
   - `BulkActionToolbar` - Multi-select action toolbar
   - `FilterPanel` - Advanced filtering controls
   - `PaginationControls` - Table pagination

3. **Features**
   - Role-based access control (Admin, Moderator, Editor)
   - User search and filtering
   - Bulk user actions (suspend, delete, role change)
   - Topic CRUD with rich text editor
   - Document approval workflow
   - Assessment builder with question management
   - Real-time analytics charts
   - Audit trail viewing
   - System configuration management
   - Export admin data (CSV, PDF)

## Dependencies

**Completed Before This Phase:**
- Phase 01: Foundation (API client, base components, auth)
- Phase 02: App Shell (layout system, navigation patterns)
- Phase 04: Topic List (table patterns, filtering)
- Phase 05: Topic Detail (content editing patterns)
- Phase 08: Assessments (assessment data structures)
- Phase 09: Exports (data export utilities)

**Required APIs:**
- `GET /api/v1/admin/users` - List users with pagination/filters
- `GET /api/v1/admin/users/:id` - Get user details
- `PATCH /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user
- `POST /api/v1/admin/users/:id/suspend` - Suspend user
- `GET /api/v1/admin/topics` - List all topics
- `POST /api/v1/admin/topics` - Create topic
- `PATCH /api/v1/admin/topics/:id` - Update topic
- `DELETE /api/v1/admin/topics/:id` - Delete topic
- `GET /api/v1/admin/documents` - List documents for moderation
- `PATCH /api/v1/admin/documents/:id/approve` - Approve document
- `PATCH /api/v1/admin/documents/:id/reject` - Reject document
- `GET /api/v1/admin/assessments` - List assessments
- `POST /api/v1/admin/assessments` - Create assessment
- `PATCH /api/v1/admin/assessments/:id` - Update assessment
- `DELETE /api/v1/admin/assessments/:id` - Delete assessment
- `GET /api/v1/admin/analytics/overview` - Get analytics summary
- `GET /api/v1/admin/settings` - Get system settings
- `PATCH /api/v1/admin/settings` - Update settings
- `GET /api/v1/admin/audit-logs` - Get audit logs
- `POST /api/v1/admin/export` - Export admin data

## Exit Criteria

✓ All acceptance criteria in `acceptance.md` pass
✓ Manual verification tests in `tests.md` complete
✓ Admin dashboard loads in < 2 seconds
✓ All CRUD operations work correctly
✓ RBAC enforced on all routes and actions
✓ Responsive on tablet and desktop (admin is desktop-first)
✓ Accessibility audit passes (WCAG 2.1 AA)
✓ Security review completed (no unauthorized access)
✓ CURRENT_PHASE.md updated
✓ CHANGELOG.md updated

## Estimated Effort

**Complexity:** Large (L-XL)
**Estimated Time:** 6-8 days
**Risk Level:** Medium-High (security critical, complex permissions)

## Key Challenges

1. **Security:** Ensuring no unauthorized access to admin functions
2. **Permissions:** Complex RBAC with multiple roles and capabilities
3. **Data Volume:** Handling large datasets efficiently (pagination, virtualization)
4. **Audit Trail:** Comprehensive logging without performance impact
5. **Bulk Operations:** Safe execution of bulk actions with rollback capability

## Success Metrics

- Admin dashboard load time < 2 seconds
- Zero unauthorized access incidents
- 99.9% uptime for admin functions
- Admin user satisfaction score > 4.5/5
- Bulk operations complete within 10 seconds for 1000 records

## Integration Points

- **Authentication:** Admin-only route protection
- **User Management:** Links to user profiles from other sections
- **Topic Management:** Integration with topic creation/editing flow
- **Analytics:** Data from all system modules
- **Audit Logs:** Tracking all admin actions
- **Exports:** Data export functionality

## Technical Notes

- Use Next.js API routes for server-side admin operations
- Implement server-side pagination for all tables
- Use React Query for data fetching with optimistic updates
- Store admin session separately with shorter timeout
- Implement CSRF protection for all mutations
- Use feature flags for rolling out admin features
- Log all admin actions to audit trail
- Implement rate limiting on admin APIs

## Admin Roles

1. **Super Admin** - Full access to all admin functions
2. **Moderator** - Content moderation, user management
3. **Editor** - Topic and assessment management only
4. **Analyst** - Read-only access to analytics and reports
