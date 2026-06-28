# Sijil Frontend Master Implementation Prompt

This document defines the permanent implementation workflow for the Sijil frontend.

Every future implementation AI session begins by reading this file.

It replaces all ad-hoc prompts and becomes the frontend equivalent of `CLAUDE.md`.

---

## Project Overview

**Project:** Sijil - A comprehensive Islamic knowledge platform providing structured access to documents, topics, formulas, and assessments.

**Purpose of This Document:** Define the exact workflow, rules, and boundaries for every frontend coding session. Ensures consistency, quality, and architectural compliance across all implementation phases.

---

## Reading Order

Every implementation session **MUST** read files in this exact order:

### 1. Mandatory First Reads (Always)

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md` - Permanent coding rules and constraints
2. `docs/frontend-pm/CURRENT_PHASE.md` - Current active phase status and checklist
3. Current phase specification (e.g., `docs/frontend-phases/01-foundation.md`)

### 2. Conditional Reads (Only If Required)

- `docs/frontend-execution/02-api-registry.md` - When connecting new endpoints
- `docs/frontend-execution/03-screen-registry.md` - When building new screens
- `docs/frontend-execution/04-component-registry.md` - When creating reusable components
- `docs/frontend-execution/05-data-models.md` - When defining new TypeScript interfaces

### 3. Never Read Unless Absolutely Necessary

- Original architecture documents (`architecture_V2.md`, `CLAUDE.md`)
- Discovery documents (`docs/frontend-discovery/`)
- Blueprint documents (`docs/frontend-blueprint/`)

**Rule:** The execution knowledge base (`frontend-execution/`) is the source of truth. Never bypass it.

---

## Session Workflow

Every implementation session **MUST** follow this sequence:

```
1. READ    → Load all mandatory files in order
2. UNDERSTAND → Verify comprehension of current phase goals and constraints
3. PLAN    → Outline specific tasks for this session
4. IMPLEMENT → Write code following all rules
5. SELF-REVIEW → Check work against specifications before testing
6. TEST    → Run build, lint, TypeScript, and manual tests
7. VERIFY  → Complete acceptance checklist from CURRENT_PHASE.md
8. UPDATE  → Modify CURRENT_PHASE.md and CHANGELOG.md
9. STOP    → End session. Never continue into next phase automatically.
```

**Critical:** Never skip steps. Never proceed to the next phase without explicit instruction.

---

## Modification Rules

### ✅ Allowed Modifications

- Frontend source code (`src/`, `app/`, `components/`, `lib/`, `hooks/`, `types/`)
- Test files (`__tests__/`, `*.test.ts`, `*.spec.ts`)
- `docs/frontend-pm/CURRENT_PHASE.md` (update progress only)
- `docs/CHANGELOG.md` (log completed work only)
- Environment configuration (`.env.local`, `site.ts`)
- Package dependencies (`package.json`, `pnpm-lock.yaml`)

### ❌ Forbidden Modifications

- Backend code (any file outside frontend directories)
- Architecture documents (`docs/frontend-execution/`, `docs/frontend-phases/` specs)
- Previous phase specifications (once marked complete)
- `docs/frontend-pm/IMPLEMENTATION_RULES.md` (permanent rules)
- `docs/frontend-pm/BACKLOG.md` (roadmap managed separately)
- `docs/frontend-pm/DECISIONS.md` (architectural decisions are immutable)
- `docs/frontend-pm/RISKS.md` (risk registry managed separately)

**Rule:** If a modification seems necessary outside allowed scope, stop and flag it in `CURRENT_PHASE.md` blockers.

---

## Coding Rules

All permanent coding rules are defined in:

`docs/frontend-pm/IMPLEMENTATION_RULES.md`

**Key Principles (Summary):**

- **Server Components by default** - Use Client Components only when interactivity requires
- **Strict TypeScript** - No `any` types. Full type safety required.
- **No mocked data** - All data must come from real backend APIs
- **No duplicate components** - Reuse existing components from registry
- **Mobile-first responsive** - Design for mobile, enhance for desktop
- **Shared API client** - Always use `lib/api/client.ts`, never inline fetch
- **Design tokens** - Use Tailwind config, no hardcoded values
- **Accessibility first** - WCAG 2.1 AA compliance required
- **Error boundaries** - Every async operation must handle errors
- **Loading states** - Skeleton loaders for all async content

**Rule:** Before writing any code, review `IMPLEMENTATION_RULES.md` completely. Violations will be rejected.

---

## Quality Gate

Before finishing every implementation session, verify **ALL** criteria:

### Build & Type Safety

- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run type-check` (or `tsc --noEmit`) passes with zero errors
- [ ] No `@ts-ignore` or `@ts-expect-error` directives added

### API Integration

- [ ] All required endpoints connected via shared API client
- [ ] No mocked data or fake responses
- [ ] Error handling implemented for all async operations
- [ ] Loading states implemented for all async content
- [ ] Response types match backend schemas exactly

### UI/UX

- [ ] Responsive design verified (mobile, tablet, desktop breakpoints)
- [ ] Accessibility audit passed (keyboard navigation, screen reader, contrast)
- [ ] Design tokens used (no hardcoded colors, spacing, fonts)
- [ ] Consistent component usage (no duplicate implementations)

### Performance

- [ ] No unnecessary Client Components
- [ ] Proper code splitting implemented
- [ ] Images optimized with Next.js Image component
- [ ] No layout shift (CLS < 0.1)

### Documentation

- [ ] Component props documented with JSDoc
- [ ] Complex logic commented
- [ ] New features added to component registry if reusable

---

## Completion Rules

A phase is **ONLY** complete when **ALL** conditions are met:

1. ✅ Every acceptance criterion from `CURRENT_PHASE.md` passes
2. ✅ Manual verification tests from phase spec pass
3. ✅ All automated tests pass (build, lint, type-check)
4. ✅ `CURRENT_PHASE.md` updated with completion status
5. ✅ `CHANGELOG.md` updated with summary of changes
6. ✅ Code committed and pushed to repository
7. ✅ No pending blockers or unresolved questions

**Then STOP.**

Never begin the next phase automatically. Wait for explicit instruction to proceed.

---

## AI Behavior

### ✅ Expected Behaviors

- Preserve project consistency with existing code
- Follow architecture patterns exactly as specified
- Reuse existing components before creating new ones
- Ask clarifying questions when specifications are ambiguous
- Update project management files after completing work
- Stop immediately when encountering blockers

### ❌ Forbidden Behaviors

- Redesign architecture or modify established patterns
- Skip acceptance criteria or quality gates
- Simplify specifications without authorization
- Ignore backend contracts or API schemas
- Create duplicate components when reusable ones exist
- Add unnecessary abstractions or over-engineering
- Proceed to next phase without completion verification
- Modify files outside allowed scope

**Rule:** If uncertain about any decision, consult `docs/frontend-execution/` or flag in `CURRENT_PHASE.md` before proceeding.

---

## Phase Transition Protocol

When a phase is complete:

1. Update `CURRENT_PHASE.md`:
   - Set status to "Complete"
   - Add completion date
   - Document any deviations from spec
   - List unresolved issues for next phase

2. Update `CHANGELOG.md`:
   - Add entry with phase number
   - Summarize key deliverables
   - Note any breaking changes

3. Prepare for next phase:
   - Do NOT start implementation
   - Wait for explicit instruction
   - Ensure repository is clean and pushed

4. Handoff:
   - Verify all acceptance criteria documented
   - Ensure tests are passing
   - Confirm no technical debt introduced

---

## Emergency Protocols

### If Backend API Changes

1. Stop implementation immediately
2. Verify API contract in `docs/frontend-execution/02-api-registry.md`
3. If mismatch found, update registry first
4. Flag in `CURRENT_PHASE.md` blockers
5. Wait for resolution before continuing

### If Architecture Conflict Discovered

1. Stop implementation immediately
2. Document conflict in `docs/frontend-execution/09-open-questions.md`
3. Add to `CURRENT_PHASE.md` blockers
4. Do NOT guess or assume
5. Wait for architectural decision

### If Scope Creep Detected

1. Compare requested feature against current phase spec
2. If out of scope, add to backlog suggestion
3. Do NOT implement without phase update
4. Flag in `CURRENT_PHASE.md`

---

## Quick Reference

| File | Purpose | Read Frequency |
|------|---------|----------------|
| `IMPLEMENTATION_RULES.md` | Permanent coding rules | Every session |
| `CURRENT_PHASE.md` | Active phase status | Every session |
| Phase spec (e.g., `01-foundation.md`) | Implementation details | Every session |
| `02-api-registry.md` | API contracts | When connecting APIs |
| `03-screen-registry.md` | Screen requirements | When building screens |
| `04-component-registry.md` | Component inventory | When creating components |
| `05-data-models.md` | TypeScript interfaces | When defining types |
| `BACKLOG.md` | Future phases | Planning only |
| `DECISIONS.md` | Architecture history | Reference only |
| `RISKS.md` | Known risks | Risk mitigation |

---

## Session Start Template

Copy this template at the start of every implementation session:

```markdown
## Session [N] - [Phase X.X Task Name]

### Files Read
- [x] IMPLEMENTATION_RULES.md
- [x] CURRENT_PHASE.md
- [x] [Phase Spec]

### Plan
1. [Task 1]
2. [Task 2]
3. [Task 3]

### Implementation Notes
[Any deviations, challenges, or decisions made]

### Verification Status
- [ ] Build passes
- [ ] Lint passes
- [ ] Type-check passes
- [ ] APIs connected
- [ ] Tests passing
- [ ] Acceptance criteria met

### Updates Made
- CURRENT_PHASE.md: [Yes/No]
- CHANGELOG.md: [Yes/No]

### Blockers
[List any blockers encountered]

### Next Steps
[What should happen in next session]
```

---

**This document is permanent. Do not modify unless explicitly instructed.**

All future frontend implementation sessions begin here.
