# Sijil — Frontend Discovery: Missing Information

**Generated:** 2026-06-27  
**Status:** Items that could not be determined from backend code analysis

---

## Overview

This document lists information gaps that were identified during the backend reverse engineering audit. These items require clarification from the backend team or additional documentation.

---

## Authentication & Authorization

### 1. Admin Authentication Mechanism
**Unknown:** Exact authentication flow for admin users

**What We Know:**
- `requireAdmin` middleware checks for `X-Admin-ID` header
- Bootstrap admin exists as fallback
- Admin routes are protected

**What's Missing:**
- How is `X-Admin-ID` obtained? (Login endpoint?)
- Is there a session/token system?
- Token expiration and refresh mechanism?
- Password reset flow?
- Multi-factor authentication support?

**Impact:** Cannot implement admin login screen without auth flow details

**Recommended Action:** Review `src/middleware/auth.middleware.js` for complete auth logic

---

### 2. User Roles Beyond Admin
**Unknown:** Whether non-admin user roles exist

**What We Know:**
- `access_control.allowed_roles` field exists in documents
- Default is `["anonymous"]`
- `is_premium` boolean flag exists

**What's Missing:**
- What other roles exist? (e.g., "student", "teacher", "premium")
- How are users assigned roles?
- Role-based content filtering logic?
- Subscription/payment integration?

**Impact:** Cannot implement role-based UI features

---

## File & Asset Handling

### 3. Image Serving Endpoint
**Unknown:** How images are served to frontend

**What We Know:**
- `topic_assets.figures.image_path_local` stores file paths
- `asset_registry.local_path` tracks file locations
- `render_strategy` enum includes "image", "svg", "animation"

**What's Missing:**
- Static file serving route configuration
- CDN integration details
- Image transformation/resizing endpoints
- Authentication for asset access (if any)

**Impact:** Cannot configure image loading in frontend

**Recommended Action:** Check `app.js` for static file middleware configuration

---

### 4. Export File Download Flow
**Unknown:** Complete download flow for exports

**What We Know:**
- `GET /api/export/download` returns binary ZIP
- `export_jobs.package_url` stores download path
- Direct download endpoint exists

**What's Missing:**
- Are files stored locally or in cloud storage (S3, etc.)?
- Download URL expiration?
- Download authentication requirements?
- File cleanup/deletion policy?

**Impact:** Unclear if special handling needed for downloads

---

## Real-time Features

### 5. WebSocket / Real-time Communication
**Unknown:** Whether real-time features exist

**What We Know:**
- BullMQ uses Redis for job queues
- Polling is used for job status tracking

**What's Missing:**
- WebSocket server configuration?
- Socket.io or similar library usage?
- Real-time notifications for job completion?
- Live collaboration features?

**Impact:** Currently assuming polling-only; may miss real-time capabilities

**Recommended Action:** Search codebase for "socket", "ws", "realtime" keywords

---

## Content Rendering

### 6. LaTeX Rendering Configuration
**Unknown:** Which LaTeX library to use

**What We Know:**
- Formulas stored in LaTeX format
- `formula.latex` field exists
- Block renderer needs to render math

**What's Missing:**
- Preferred library (MathJax vs KaTeX)?
- Configuration options (delimiters, extensions)?
- SSR compatibility requirements?
- Custom macros or extensions?

**Impact:** Need to make assumption; may not match backend expectations

**Recommendation:** Use KaTeX for performance unless specified otherwise

---

### 7. SVG/Animation Rendering
**Unknown:** How dynamic SVGs and animations should be handled

**What We Know:**
- `figures.render_strategy` includes "svg", "animation", "3d"
- `figures.svg_code` stores SVG markup
- `figures.animation_type` field exists

**What's Missing:**
- Animation library preference (GSAP, Framer Motion, etc.)?
- 3D rendering library (Three.js)?
- Interactive figure requirements?
- Accessibility considerations for animations?

**Impact:** May need to revise component implementation

---

## Internationalization

### 8. Multi-language Support
**Unknown:** Extent of i18n implementation

**What We Know:**
- `language` field in documents (default: "english")
- `locale` field in topics (default: "en")
- `title_vernacular` field exists
- Urdu translations for Quran

**What's Missing:**
- Supported language list?
- Language switcher UI requirements?
- Translation management workflow?
- RTL layout support (for Arabic/Urdu)?
- Date/time localization?

**Impact:** Cannot implement language switching without requirements

---

### 9. Vernacular Language Handling
**Unknown:** How vernacular languages should display

**What We Know:**
- `title_vernacular` field for local language titles
- Quran data has Urdu translation
- No Arabic glyphs stored (per validation)

**What's Missing:**
- Font requirements for vernacular scripts?
- Mixed-language content rendering?
- Transliteration needs?

**Impact:** Typography decisions may need revision

---

## Analytics & Tracking

### 10. Analytics Tracker Details
**Unknown:** Full scope of analytics tracking

**What We Know:**
- `analyticsTracker.middleware.js` exists
- Topic views tracked automatically
- Search queries logged

**What's Missing:**
- What specific events are tracked?
- Third-party analytics integration (Google Analytics, etc.)?
- User identification method (anonymous vs authenticated)?
- GDPR/privacy compliance requirements?
- Analytics dashboard data freshness?

**Impact:** May need to add client-side tracking calls

**Recommended Action:** Review `src/middleware/analyticsTracker.middleware.js` completely

---

## Error Handling

### 11. Client-Side Error Boundaries
**Unknown:** Expected error handling patterns

**What We Know:**
- Backend returns structured error responses
- HTTP status codes used appropriately

**What's Missing:**
- Global error boundary requirements?
- Error reporting service (Sentry, etc.)?
- User-friendly error message guidelines?
- Retry logic specifications?

**Impact:** Error UX may not match expectations

---

## Performance

### 12. Caching Headers Configuration
**Unknown:** HTTP caching headers set by backend

**What We Know:**
- API responses available
- Some endpoints likely cacheable

**What's Missing:**
- Cache-Control headers on responses?
- ETag support?
- CDN caching rules?
- Service worker caching strategy alignment?

**Impact:** Frontend caching may conflict with backend headers

---

## Testing

### 13. End-to-End Testing Requirements
**Unknown:** Testing expectations

**What We Know:**
- Backend has comprehensive validation
- APIs are well-defined

**What's Missing:**
- E2E testing framework preference (Cypress, Playwright)?
- Test coverage requirements?
- CI/CD integration details?
- Staging environment availability?

**Impact:** Testing strategy unclear

---

## Deployment

### 14. Environment Configuration
**Unknown:** Frontend environment variables

**What We Know:**
- Backend has config system (`src/config/`)
- API base URL needed

**What's Missing:**
- Required environment variables list?
- Different configs per environment (dev, staging, prod)?
- Feature flag system?
- A/B testing infrastructure?

**Impact:** Deployment configuration incomplete

---

### 15. Build & Deployment Process
**Unknown:** How frontend should be built and deployed

**What We Know:**
- Backend is Node.js/Express
- MongoDB and Redis required

**What's Missing:**
- Frontend framework choice (React, Next.js, Vue)?
- Build tool (Vite, Webpack, Turbopack)?
- Hosting platform (Vercel, Netlify, custom)?
- Docker requirements?
- CI/CD pipeline details?

**Impact:** Cannot finalize tech stack recommendations

---

## Content Management

### 16. Content Moderation Workflow
**Unknown:** How content is reviewed before publishing

**What We Know:**
- `publishing.status` enum: draft, processing, published
- Admin can ingest content

**What's Missing:**
- Editorial review process?
- Content approval workflow?
- Version comparison tools?
- Rollback procedures?

**Impact:** Admin CMS may lack required features

---

### 17. Content Scheduling
**Unknown:** Whether content can be scheduled for publication

**What We Know:**
- `created_at`, `updated_at` timestamps exist
- Status field controls visibility

**What's Missing:**
- Scheduled publish date field?
- Auto-publish functionality?
- Timezone handling?

**Impact:** Cannot implement scheduling features

---

## Search

### 18. Search Relevance Tuning
**Unknown:** How search results are ranked

**What We Know:**
- Atlas Search is used
- Multiple filter options available

**What's Missing:**
- Ranking algorithm details?
- Boost factors (recent, popular, etc.)?
- Synonym handling?
- Fuzzy matching configuration?

**Impact:** Cannot optimize search UX beyond basic implementation

---

## Notifications

### 19. Notification System
**Unknown:** Whether notifications exist

**What We Know:**
- No notification models found
- No notification endpoints found

**What's Missing:**
- Email notification requirements?
- Push notification plans?
- In-app notification center?
- Notification preferences?

**Impact:** Assuming no notifications needed; may need to add later

---

## Integration

### 20. Third-Party Integrations
**Unknown:** External service integrations

**What We Know:**
- GitHub integration for batch imports
- Quran.com API for Quran data

**What's Missing:**
- Payment gateway (Stripe, etc.)?
- Email service (SendGrid, etc.)?
- Cloud storage (S3, Cloudinary)?
- Social media sharing integration?
- LMS integration (Canvas, Moodle)?

**Impact:** May need to add integration points

---

## Accessibility

### 21. Accessibility Standards
**Unknown:** Required accessibility compliance level

**What We Know:**
- Alt text fields exist for images
- Semantic HTML possible via block renderer

**What's Missing:**
- WCAG compliance level (A, AA, AAA)?
- Screen reader testing requirements?
- Keyboard navigation specifications?
- Color contrast requirements?

**Impact:** Accessibility implementation may be insufficient

**Recommendation:** Target WCAG 2.1 AA as default

---

## Summary of Critical Gaps

| Priority | Item | Impact |
|----------|------|--------|
| High | Admin authentication flow | Cannot build admin login |
| High | Image serving configuration | Cannot load figures |
| High | Frontend framework decision | Blocks all development |
| Medium | User roles beyond admin | Limits feature planning |
| Medium | LaTeX library choice | Affects content rendering |
| Medium | Multi-language requirements | Affects architecture |
| Low | WebSocket/real-time | Can add later if needed |
| Low | Notification system | Can add later if needed |

---

## Recommended Next Steps

1. **Review Auth Middleware:** Examine `src/middleware/auth.middleware.js` for complete auth picture
2. **Check App.js:** Find static file serving and CORS configuration
3. **Clarify Framework:** Decide on React/Next.js vs other options
4. **Define i18n Strategy:** Document supported languages and requirements
5. **Set Accessibility Standard:** Agree on WCAG compliance level
6. **Plan Integrations:** List all third-party services needed

---

## Related Documents

- [01-project-overview.md](./01-project-overview.md) — Known architecture
- [02-api-inventory.md](./02-api-inventory.md) — Available endpoints
- [09-component-inventory.md](./09-component-inventory.md) — Components needing clarification
