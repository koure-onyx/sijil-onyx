# SIJIL Session Handoff Protocol

## Overview

This document defines the protocol for handing off context between AI implementation sessions to ensure continuity, prevent architectural drift, and maintain consistency across multiple Qwen sessions.

---

## Why Session Handoff Matters

AI implementation sessions may be interrupted or need to continue in a new conversation. Without proper handoff:

- **Context Loss:** New session doesn't know what was done
- **Architectural Drift:** Different interpretations of blueprint
- **Duplicated Work:** Same tasks implemented twice
- **Inconsistent Patterns:** Different coding styles across sessions
- **Missing Tests:** Tests forgotten in transition

This protocol ensures seamless continuation.

---

## Handoff Document Structure

At the end of EVERY session, create or update a handoff document with this structure:

```markdown
# Session [N] Handoff - [DATE]

## Session Summary

**Session Number:** [N]  
**Date:** [YYYY-MM-DD]  
**AI Agent:** Qwen  
**Duration:** [X hours]  
**Phase:** [Phase Name]  
**Tasks Completed:** [List of task IDs]

## What Was Done

### Files Created
- `path/to/file1.ts` - Description
- `path/to/file2.tsx` - Description

### Files Modified
- `path/to/file3.ts` - Changes made
- `path/to/file4.tsx` - Changes made

### Key Decisions Made
1. Decision description - Rationale
2. Decision description - Rationale

### Patterns Established
- Pattern name: Description and location

## Current State

### Working Features
- Feature 1: Status and location
- Feature 2: Status and location

### Incomplete Work
- Task ID: What's remaining, known issues

### Known Issues
- Issue 1: Description, workaround if any
- Issue 2: Description, workaround if any

## Next Session Instructions

### Immediate Next Tasks
1. **Task ID:** [Name]
   - Starting point: [file/location]
   - Expected output: [description]
   - Tests needed: [types]
   - Blueprint reference: [doc/section]
   - CLAUDE.md rules: [sections]

2. **Task ID:** [Name]
   - [same structure]

### Context Needed
- Review [specific blueprint doc]
- Understand [specific pattern]
- Check [specific file]

### Gotchas to Avoid
- Don't [specific mistake]
- Remember [important constraint]
- Use [specific pattern] not [alternative]

## Verification Commands

```bash
# Run these to verify state
npm run lint
npm run test
npm run build
```

## Rollback Information

If something is wrong:
- Last known good commit: `[hash]`
- Files to check: `[list]`
- Tests that should pass: `[list]`

---

## Appendix: Detailed Notes

[Any additional context, code snippets, debugging notes, etc.]
```

---

## Handoff Checklist

Before ending a session, ensure:

### Documentation Complete

- [ ] Handoff document created/updated in `docs/project-management/session-handoffs/`
- [ ] Progress tracker updated (`05-progress-tracker.md`)
- [ ] Task backlog marked with completed tasks (`09-task-backlog.md`)
- [ ] Decision log updated with architectural decisions

### Code Quality Verified

- [ ] `npm run lint` passes
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds
- [ ] No console errors in browser

### Tests Passing

- [ ] All new tests written
- [ ] All existing tests still pass
- [ ] Test coverage targets met
- [ ] E2E tests updated if UI changed

### Git State Clean

- [ ] All changes committed
- [ ] Commit messages follow convention
- [ ] Branch pushed to remote
- [ ] No uncommitted changes

### Context Preserved

- [ ] File paths documented
- [ ] Function/component names documented
- [ ] API endpoints used documented
- [ ] State management patterns documented

---

## Decision Log Format

When architectural decisions are made, record them:

```markdown
## Decision: [Decision Title]

**Date:** [YYYY-MM-DD]  
**Session:** [N]  
**Decided By:** Qwen  
**Status:** Approved | Pending | Superseded

### Context
[What situation prompted this decision]

### Options Considered
1. **Option A:** Description - Pros/Cons
2. **Option B:** Description - Pros/Cons
3. **Option C:** Description - Pros/Cons

### Decision
[Chosen option and rationale]

### Consequences
- **Positive:** [Expected benefits]
- **Negative:** [Trade-offs accepted]
- **Neutral:** [Side effects]

### References
- Blueprint: `[doc/section]`
- CLAUDE.md: `[section]`
- Related decisions: `[links]`

### Review Date
[When to revisit this decision if needed]
```

---

## Session Continuation Template

When starting a NEW session, use this template to establish context:

```markdown
# Session [N+1] Kickoff - [DATE]

## Previous Session Reference

**Last Session:** Session [N] Handoff  
**Handoff Document:** `docs/project-management/session-handoffs/session-n-handoff.md`  
**Date:** [YYYY-MM-DD]

## Context Review

### Where We Left Off
[Brief summary from previous handoff]

### Current Phase
- **Phase:** [Name]
- **Progress:** X/Y tasks complete (Z%)
- **Current Task:** [Task ID and name]

### Files to Review Before Starting
1. `[path]` - Reason
2. `[path]` - Reason

## Today's Plan

### Primary Objective
[Main goal for this session]

### Tasks to Complete
1. **[Task ID]:** [Name]
   - Input: [prerequisites]
   - Output: [expected deliverables]
   - Tests: [required tests]
   - Acceptance: [criteria from task backlog]

2. **[Task ID]:** [Name]
   - [same structure]

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Verification Plan

### Before Starting
```bash
# Verify clean state
git status
npm run lint
npm run test
```

### During Development
- Run tests after each component
- Check linting frequently
- Build periodically to catch issues

### Before Ending
```bash
# Final verification
npm run lint
npm run test
npm run build
# Update progress tracker
# Create handoff document
```

## Potential Blockers

### Known Issues from Previous Session
- [Issue 1] - Plan to address
- [Issue 2] - Plan to address

### Anticipated Challenges
- [Challenge 1] - Mitigation strategy
- [Challenge 2] - Mitigation strategy

## Reference Documents

- Blueprint: `docs/frontend-blueprint/[relevant-doc].md`
- Governance: `CLAUDE.md` sections [X, Y, Z]
- Task Backlog: `docs/project-management/09-task-backlog.md`
- Previous Handoff: `docs/project-management/session-handoffs/session-n-handoff.md`
```

---

## Common Handoff Scenarios

### Scenario 1: Mid-Task Interruption

**Situation:** Task partially complete, need to continue later

**Handoff Actions:**
1. Document exactly what's done vs remaining
2. Note any partial implementations
3. List files touched and their state
4. Include any temporary workarounds
5. Specify exact next step

**Example:**
```markdown
### Incomplete Work
- **Task C020:** BlockRenderer 70% complete
  - Done: Core renderer, 10 of 17 block types
  - Remaining: Formula, Table, MCQ, Quran, Cross-reference blocks
  - Location: `features/topics/components/block-renderer.tsx`
  - Next Step: Implement formula-block.tsx using KaTeX
  - Known Issue: KaTeX CSS needs global import
```

### Scenario 2: Phase Completion

**Situation:** Entire phase complete, ready to start next phase

**Handoff Actions:**
1. Complete phase verification checklist
2. Update progress tracker with phase status
3. Document all deliverables
4. Note any technical debt to address
5. Prepare entry criteria for next phase

**Example:**
```markdown
## Phase 1 Complete ✅

### Deliverables
- All 23 foundation tasks complete
- CI/CD pipeline operational
- Architecture tests passing
- Test coverage: 87% on utilities

### Technical Debt
- TODO: Add more MSW mock scenarios
- TODO: Expand architecture test coverage

### Ready for Phase 2
- Entry criteria verified
- Phase 2 kickoff document prepared
- First 5 tasks identified
```

### Scenario 3: Bug Fix Session

**Situation:** Dedicated session to fix specific bug(s)

**Handoff Actions:**
1. Link to bug report
2. Document root cause analysis
3. Describe fix approach
4. List regression tests added
5. Note any related issues found

**Example:**
```markdown
## Bug Fix: Search Results Not Updating

### Bug Report
- Issue #123: Search results don't update when filters change
- Severity: P1

### Root Cause
- URL state not syncing with TanStack Query params
- Missing dependency in useEffect

### Fix Applied
- Added URL params to query key
- Updated search.api.ts to read from URL
- Added integration test for filter flow

### Regression Tests
- `tests/search/filter-sync.test.tsx` - New test
- `tests/search/url-sync.test.tsx` - Updated test

### Related Issues Found
- Similar issue可能在 advanced filters - created issue #124
```

---

## Anti-Patterns to Avoid

### ❌ Bad Handoff Examples

**Too Vague:**
```markdown
## What Was Done
- Worked on search
- Fixed some bugs
- Need to continue tomorrow
```

**Missing Context:**
```markdown
## Files Modified
- `some-file.ts` - fixed it
```

**No Next Steps:**
```markdown
## Next Session
- Continue working
```

### ✅ Good Handoff Examples

**Specific and Actionable:**
```markdown
## What Was Done
- Implemented basic search input component
  - File: `features/search/components/search-input.tsx`
  - Features: Controlled input, debounced onChange (300ms), clear button
  - Tests: `search-input.test.tsx` - 5 tests covering all interactions

## Next Session Instructions
### Immediate Next Task
**Task A002:** Search suggestions component
- Starting point: `features/search/components/search-suggestions.tsx` (create new)
- Expected output: Dropdown with suggestions from API, keyboard navigation
- Tests needed: Unit tests for filtering, integration with search-input
- Blueprint reference: `09-search-architecture.md` - Suggestions section
- CLAUDE.md rules: Section 4.3 (composition), Section 6.2 (debouncing)
```

---

## Storage Convention

Store handoff documents in:
```
docs/project-management/session-handoffs/
├── session-00-handoff.md
├── session-01-handoff.md
├── session-02-handoff.md
└── ...
```

File naming: `session-{NN}-handoff.md`

---

## Quick Reference Card

Print this for quick access during sessions:

```
╔═══════════════════════════════════════════════════════════╗
║           SESSION HANDOFF QUICK CHECKLIST                 ║
╠═══════════════════════════════════════════════════════════╣
║ BEFORE ENDING SESSION:                                    ║
║ □ Commit all changes with clear messages                  ║
║ □ Run: npm run lint && npm run test && npm run build      ║
║ □ Update: 05-progress-tracker.md                          ║
║ □ Mark tasks complete in 09-task-backlog.md               ║
║ □ Create: docs/project-management/session-handoffs/       ║
║     session-{N}-handoff.md                                ║
║ □ Include: Files created/modified, decisions, next steps  ║
║ □ Push branch to remote                                   ║
║ □ Verify handoff document is complete                     ║
╠═══════════════════════════════════════════════════════════╣
║ WHEN STARTING NEW SESSION:                                ║
║ □ Read previous session handoff                           ║
║ □ Review relevant blueprint docs                          ║
║ □ Check CLAUDE.md for applicable rules                    ║
║ □ Verify local environment matches handoff state          ║
║ □ Run verification commands from handoff                  ║
║ □ Create session kickoff document                         ║
╚═══════════════════════════════════════════════════════════╝
```

---

## References

- Progress Tracker: `05-progress-tracker.md`
- Task Backlog: `09-task-backlog.md`
- Review Checklist: `06-review-checklist.md`
- CLAUDE.md - Governance rules
- Blueprint: `docs/frontend-blueprint/`
