# SIJIL Bug Triage Process

## Overview

This document defines the bug triage process, severity classifications, SLAs, and resolution workflows for the SIJIL frontend project.

---

## Bug Severity Classification

### P0: Critical

**Definition:** System is unusable, data loss, security vulnerability, or production outage.

**Examples:**
- Application fails to build or deploy
- Authentication broken (users cannot log in)
- Data corruption or loss
- Security vulnerability (XSS, CSRF, auth bypass)
- Complete feature outage affecting all users
- Admin area inaccessible

**SLA:**
- **Response Time:** 1 hour
- **Resolution Time:** 4 hours
- **Communication:** Hourly updates until resolved

**Process:**
1. Immediate escalation to all available developers
2. War room session initiated
3. All other work paused
4. Hotfix branch created
5. Emergency deployment if needed
6. Post-mortem required within 24 hours

---

### P1: High

**Definition:** Major functionality impaired, significant user impact, no workaround available.

**Examples:**
- Core feature broken (search, document viewing, topic navigation)
- Data display incorrect (wrong content shown)
- Performance degradation (>5s load times)
- Mobile responsiveness broken
- Form submissions failing
- API integration failures

**SLA:**
- **Response Time:** 4 hours
- **Resolution Time:** 24 hours
- **Communication:** Daily updates

**Process:**
1. Assign to available developer immediately
2. Fix prioritized over new feature work
3. Code review expedited
4. Deploy with next available window
5. Verification testing required

---

### P2: Medium

**Definition:** Functionality impaired but workaround exists, moderate user impact.

**Examples:**
- Non-critical feature partially broken
- UI rendering issues (non-blocking)
- Validation errors unclear
- Missing error states
- Accessibility issues (non-critical)
- Browser compatibility issues (single browser)

**SLA:**
- **Response Time:** 24 hours
- **Resolution Time:** 3-5 days
- **Communication:** Update on status change

**Process:**
1. Triage during daily standup
2. Assigned to sprint backlog
3. Fixed in normal development cycle
4. Standard code review process
5. QA verification before merge

---

### P3: Low

**Definition:** Minor issue, cosmetic problem, or enhancement request.

**Examples:**
- Typographical errors
- Color/spacing inconsistencies
- Minor accessibility improvements
- Performance optimizations (non-critical)
- Feature enhancements
- Documentation errors

**SLA:**
- **Response Time:** 48 hours
- **Resolution Time:** Next sprint or as capacity allows
- **Communication:** Update when scheduled

**Process:**
1. Added to backlog
2. Prioritized during sprint planning
3. Assigned based on capacity
4. Standard development process

---

### P4: Trivial

**Definition:** Negligible impact, nice-to-have improvements.

**Examples:**
- Subjective UI preferences
- Future enhancements
- Technical debt (non-critical)
- Code style suggestions

**SLA:**
- **Response Time:** 1 week
- **Resolution Time:** As time permits
- **Communication:** Acknowledged in backlog

**Process:**
1. Logged in backlog
2. Reviewed quarterly
3. Implemented if time allows
4. May be closed as "won't fix"

---

## Bug Report Template

```markdown
## Bug Report

### Basic Information
- **Title:** [Brief description]
- **Severity:** P0 | P1 | P2 | P3 | P4
- **Status:** New | Triaged | In Progress | In Review | Resolved | Closed
- **Reporter:** [Name]
- **Date Reported:** [YYYY-MM-DD]

### Description
[Clear description of the bug]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [And so on...]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- **Browser:** [Chrome/Firefox/Safari/Edge + version]
- **OS:** [Windows/Mac/Linux/iOS/Android + version]
- **Device:** [Desktop/Mobile/Tablet]
- **Screen Size:** [if relevant]
- **URL:** [where bug occurred]

### Evidence
- [ ] Screenshot attached
- [ ] Screen recording attached
- [ ] Console errors captured
- [ ] Network logs captured

### Technical Details
- **Error Messages:** [copy exact error text]
- **Console Logs:** [relevant log output]
- **Network Requests:** [failed requests with status codes]
- **Affected Components:** [if known]

### Impact Assessment
- **Users Affected:** [All | Some | Specific segment]
- **Frequency:** [Always | Sometimes | Rare]
- **Workaround Available:** [Yes/No - describe if yes]
- **Business Impact:** [High/Medium/Low]

### Root Cause (if known)
[Preliminary analysis of what caused the bug]

### Proposed Fix (if known)
[Suggested approach to fix]

### Related Issues
- [Links to related bugs, PRs, or discussions]

---

## Triage Notes

### Triage Date: [YYYY-MM-DD]
### Triage By: [Name]

**Confirmed Severity:** [P0-P4]  
**Assigned To:** [Developer name]  
**Target Resolution:** [Date]  
**Additional Notes:** [Any context for developer]

---

## Resolution

### Fixed By: [Name]
### Date Fixed: [YYYY-MM-DD]
### PR Link: [link]

### Fix Description
[Description of what was changed]

### Testing Performed
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Regression testing completed

### Verification

**Verified By:** [Name]  
**Date Verified:** [YYYY-MM-DD]

- [ ] Bug reproduced before fix
- [ ] Fix confirmed working
- [ ] No regressions introduced
- [ ] Documentation updated (if needed)

### Post-Mortem (P0/P1 only)

**Date:** [YYYY-MM-DD]  
**Attendees:** [Names]

#### What Happened
[Timeline of events]

#### Root Cause
[Final determination of root cause]

#### Prevention
[How to prevent similar issues in future]

#### Action Items
- [ ] [Action 1] - Owner: [Name] - Due: [Date]
- [ ] [Action 2] - Owner: [Name] - Due: [Date]
```

---

## Triage Workflow

### Step 1: Bug Submission

**Who:** Anyone (developer, tester, stakeholder, user)  
**Where:** GitHub Issues with "bug" label  
**Required:** Completed bug report template (minimum: description, steps to reproduce, expected vs actual)

### Step 2: Initial Triage

**Who:** Tech Lead or designated triage owner  
**When:** Within SLA timeframe based on reported severity  
**Actions:**
1. Verify bug is reproducible
2. Confirm or adjust severity classification
3. Add missing labels (component, phase, etc.)
4. Assign to developer based on expertise and availability
5. Set target resolution date

### Step 3: Analysis

**Who:** Assigned developer  
**When:** Within 24 hours of assignment (P0/P1: immediately)  
**Actions:**
1. Reproduce the bug locally
2. Identify root cause
3. Estimate fix complexity
4. Propose solution approach
5. Update ticket with findings

### Step 4: Fix Implementation

**Who:** Assigned developer  
**When:** Based on severity SLA  
**Actions:**
1. Create fix branch from main
2. Implement fix with tests
3. Run full test suite
4. Verify fix resolves issue
5. Check for regressions
6. Submit PR with clear description

### Step 5: Code Review

**Who:** Peer developer + Tech Lead (for P0/P1)  
**When:** Within 4 hours for P0/P1, 24 hours for P2  
**Actions:**
1. Review code changes
2. Verify tests are adequate
3. Check for side effects
4. Approve or request changes
5. Ensure changelog updated

### Step 6: Deployment

**Who:** DevOps or developer with deploy access  
**When:** 
- P0: Immediate emergency deploy
- P1: Next available deploy window
- P2-P4: Regular deploy schedule

**Actions:**
1. Merge to main
2. Trigger deployment pipeline
3. Monitor deployment health
4. Verify fix in production

### Step 7: Verification & Closure

**Who:** Reporter or QA  
**When:** Within 24 hours of deployment  
**Actions:**
1. Verify fix in production
2. Confirm no regressions
3. Update ticket status to "Resolved"
4. Add closure notes
5. Close ticket after 48 hours if no issues

---

## Escalation Matrix

| Severity | After | Escalate To |
|----------|-------|-------------|
| P0 | 1 hour without response | All developers, Project Lead |
| P0 | 2 hours without fix | Stakeholders, Emergency team |
| P1 | 4 hours without response | Tech Lead, Team Lead |
| P1 | 12 hours without fix | Project Lead |
| P2 | 24 hours without response | Tech Lead |
| P2 | 3 days without fix | Project Lead |

---

## Common Bug Categories

### Rendering Issues
- Component not displaying
- Incorrect layout/styling
- Responsive design failures
- Dark mode issues

### Functional Issues
- Button/action not working
- Form validation failures
- Navigation broken
- State management bugs

### Data Issues
- Incorrect data displayed
- Missing data
- Data not updating
- API response handling failures

### Performance Issues
- Slow page loads
- Janky animations
- Memory leaks
- Excessive re-renders

### Accessibility Issues
- Keyboard navigation broken
- Screen reader incompatibility
- Missing ARIA attributes
- Focus management issues

### Security Issues
- Authentication bypass
- XSS vulnerabilities
- CSRF exposure
- Data leakage

### Integration Issues
- API connection failures
- Third-party service errors
- Webhook failures
- Export/import problems

---

## Metrics & Reporting

### Weekly Bug Report

Generate weekly report including:

| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| New Bugs | # | # | ↑↓→ |
| Bugs Fixed | # | # | ↑↓→ |
| Bugs Open | # | # | ↑↓→ |
| P0/P1 Open | # | # | ↑↓→ |
| Avg Resolution Time | X days | X days | ↑↓→ |

### Bug Distribution by Severity

```
P0: # (#%)
P1: # (#%)
P2: # (#%)
P3: # (#%)
P4: # (#%)
```

### Bug Distribution by Component

```
Documents: # (#%)
Topics: # (#%)
Search: # (#%)
Quran: # (#%)
Exports: # (#%)
Analytics: # (#%)
Admin: # (#%)
SEO: # (#%)
Other: # (#%)
```

### Aging Report

Bugs open longer than SLA:
- P0 > 4 hours: [list]
- P1 > 24 hours: [list]
- P2 > 5 days: [list]

---

## Prevention Strategies

### Code-Level Prevention

- [ ] Comprehensive unit tests
- [ ] Integration tests for critical paths
- [ ] E2E tests for user journeys
- [ ] TypeScript strict mode
- [ ] ESLint rules for common mistakes
- [ ] Pre-commit hooks

### Process-Level Prevention

- [ ] Mandatory code reviews
- [ ] QA sign-off before deploy
- [ ] Staging environment testing
- [ ] Gradual rollouts for major changes
- [ ] Feature flags for risky features
- [ ] Monitoring and alerting

### Architecture-Level Prevention

- [ ] Error boundaries throughout app
- [ ] Graceful degradation patterns
- [ ] Retry logic with backoff
- [ ] Circuit breakers for external services
- [ ] Defensive programming practices

---

## References

- Progress Tracker: `05-progress-tracker.md`
- Review Checklist: `06-review-checklist.md`
- Session Handoff: `08-session-handoff.md`
- CLAUDE.md - Section 2.5 (Error Handling)
