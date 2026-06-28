# SIJIL Atomic Task Backlog

## Overview

This document decomposes the entire SIJIL frontend into 127 atomic implementation tasks. Each task is designed to be completable in a single Qwen session (~30-60 minutes).

**Total Tasks:** 127  
**Phases:** 5  
**Status:** All tasks Not Started

---

## Task ID Convention

Tasks are identified by phase prefix + sequential number:
- **FOUND-XXX:** Foundation tasks (F001-F023 → FOUND-001 to FOUND-023)
- **CORE-XXX:** Core tasks (C001-C045 → CORE-001 to CORE-045)
- **ADV-XXX:** Advanced tasks (A001-A031 → ADV-001 to ADV-031)
- **ADMIN-XXX:** Admin tasks (D001-D018 → ADMIN-001 to ADMIN-018)
- **POLISH-XXX:** Polish tasks (P001-P010 → POLISH-001 to POLISH-010)

---

# PHASE 1: FOUNDATION (23 Tasks)

## FOUND-001: Initialize Next.js 16 Project

**Phase:** 1 - Foundation  
**Module:** Project Root  
**Estimated Duration:** 30 minutes

### Inputs
- Repository cloned with PAT access
- Node.js 20+ installed
- `docs/frontend-blueprint/13-folder-structure.md` reviewed

### Outputs
- Next.js 16 project initialized
- `package.json` with all dependencies
- `next.config.js` configured
- Basic directory structure created

### Tasks
1. Create Next.js 16 app with TypeScript template
2. Install required dependencies (react, next, typescript)
3. Configure `next.config.js` per blueprint
4. Verify `npm run dev` works

### Tests Required
- [ ] `npm run dev` starts without errors
- [ ] Default page renders
- [ ] TypeScript compilation succeeds

### Acceptance Criteria
- Next.js 16 installed and running
- TypeScript configured in strict mode
- All scripts in package.json functional (dev, build, start, lint)
- Directory structure matches `13-folder-structure.md`

### Rollback Criteria
- Project fails to start
- TypeScript errors in default configuration
- Missing required dependencies

### Blueprint References
- `docs/frontend-blueprint/13-folder-structure.md` - Folder layout
- `docs/frontend-blueprint/01-system-architecture.md` - Tech stack

### CLAUDE.md Rules
- Section 2.1: TypeScript strict mode required
- Section 3.1: Root folder structure

---

## FOUND-002: Configure TypeScript Strict Mode

**Phase:** 1 - Foundation  
**Module:** Configuration  
**Estimated Duration:** 15 minutes

### Inputs
- FOUND-001 complete
- `CLAUDE.md` Section 2.1 reviewed

### Outputs
- `tsconfig.json` with strict configuration
- No TypeScript errors in base project

### Tasks
1. Update `tsconfig.json` with strict settings
2. Enable all strict flags (`strict`, `noImplicitAny`, etc.)
3. Configure path aliases (`@/` for root)
4. Verify no TypeScript errors

### Tests Required
- [ ] `npm run type-check` passes
- [ ] Path aliases resolve correctly

### Acceptance Criteria
- All strict TypeScript flags enabled
- Path alias `@/` configured for root imports
- Zero TypeScript errors
- ESLint configured for TypeScript

### Rollback Criteria
- TypeScript compilation fails
- Path aliases don't resolve

### Blueprint References
- `docs/frontend-blueprint/13-folder-structure.md` - Import paths

### CLAUDE.md Rules
- Section 2.1: TypeScript strict mode mandatory
- Section 2.3: Import organization

---

## FOUND-003: Configure Tailwind 4

**Phase:** 1 - Foundation  
**Module:** Configuration  
**Estimated Duration:** 20 minutes

### Inputs
- FOUND-001 complete
- `docs/frontend-blueprint/13-folder-structure.md` reviewed

### Outputs
- Tailwind 4 configured
- `tailwind.config.ts` created
- Base styles imported

### Tasks
1. Install Tailwind 4 and dependencies
2. Create `tailwind.config.ts`
3. Add Tailwind directives to global CSS
4. Verify Tailwind classes work

### Tests Required
- [ ] Tailwind utility classes render correctly
- [ ] Build completes without warnings

### Acceptance Criteria
- Tailwind 4 installed and configured
- Global CSS includes Tailwind directives
- Utility classes work in components
- No build warnings

### Rollback Criteria
- Tailwind classes not applying
- Build fails with Tailwind errors

### Blueprint References
- N/A (infrastructure)

### CLAUDE.md Rules
- Section 4.2: Component styling conventions

---

## FOUND-004: Install shadcn/ui Components

**Phase:** 1 - Foundation  
**Module:** UI Library  
**Estimated Duration:** 30 minutes

### Inputs
- FOUND-003 complete (Tailwind configured)
- `CLAUDE.md` Section 4.2 reviewed

### Outputs
- shadcn/ui CLI installed
- Base components available (Button, Input, Card, etc.)
- `components/ui/` directory populated

### Tasks
1. Run shadcn/ui init command
2. Install base components (button, input, card, dialog, etc.)
3. Verify components import correctly
4. Test one component in default page

### Tests Required
- [ ] shadcn/ui components render without errors
- [ ] Theme provider works (if applicable)

### Acceptance Criteria
- shadcn/ui CLI configured
- At least 5 base components installed
- Components importable from `@/components/ui/`
- No console errors when rendering

### Rollback Criteria
- shadcn/ui CLI fails
- Components don't render

### Blueprint References
- `docs/frontend-blueprint/05-component-architecture.md` - UI components

### CLAUDE.md Rules
- Section 4.2: Component anatomy
- Section 4.5: Composition patterns

---

## FOUND-005: Configure ESLint

**Phase:** 1 - Foundation  
**Module:** Tooling  
**Estimated Duration:** 20 minutes

### Inputs
- FOUND-001 complete
- `CLAUDE.md` Section 2 reviewed

### Outputs
- `.eslintrc.json` configured
- TypeScript ESLint rules enabled
- Custom rules for architecture enforcement

### Tasks
1. Install ESLint and TypeScript plugins
2. Configure `.eslintrc.json`
3. Add custom rules for domain boundaries
4. Verify `npm run lint` works

### Tests Required
- [ ] `npm run lint` runs without crashes
- [ ] TypeScript files linted correctly

### Acceptance Criteria
- ESLint configured for TypeScript + React
- Architecture rules added (no cross-domain imports)
- Zero linting errors on clean codebase
- Lint script in package.json

### Rollback Criteria
- ESLint crashes
- Rules conflict with TypeScript

### Blueprint References
- `docs/frontend-blueprint/01-system-architecture.md` - Domain boundaries

### CLAUDE.md Rules
- Section 2: All coding standards
- Section 9.1: ESLint enforcement

---

## FOUND-006: Configure Prettier

**Phase:** 1 - Foundation  
**Module:** Tooling  
**Estimated Duration:** 15 minutes

### Inputs
- FOUND-005 complete (ESLint configured)

### Outputs
- `.prettierrc` configured
- Prettier integrated with ESLint
- Format script in package.json

### Tasks
1. Install Prettier and ESLint plugin
2. Create `.prettierrc` config
3. Configure ESLint-Prettier integration
4. Add format scripts to package.json

### Tests Required
- [ ] `npm run format` formats files
- [ ] `npm run format:check` validates formatting

### Acceptance Criteria
- Prettier configured per CLAUDE.md
- ESLint and Prettier don't conflict
- Format commands work
- Pre-commit hook will use Prettier

### Rollback Criteria
- Prettier conflicts with ESLint
- Formatting breaks TypeScript

### Blueprint References
- N/A (tooling)

### CLAUDE.md Rules
- Section 2.3: Code formatting standards

---

## FOUND-007: Setup Husky Pre-commit Hooks

**Phase:** 1 - Foundation  
**Module:** Tooling  
**Estimated Duration:** 20 minutes

### Inputs
- FOUND-005 complete (ESLint)
- FOUND-006 complete (Prettier)

### Outputs
- Husky installed and configured
- Pre-commit hook runs lint + format
- Commit message hook (optional)

### Tasks
1. Install Husky
2. Initialize Husky in project
3. Create pre-commit hook
4. Add lint-staged configuration

### Tests Required
- [ ] Pre-commit hook runs on commit
- [ ] Failing lint blocks commit

### Acceptance Criteria
- Husky hooks operational
- Pre-commit runs ESLint and Prettier
- Commits blocked on lint failures
- Hook scripts versioned in git

### Rollback Criteria
- Hooks don't trigger
- Git operations broken

### Blueprint References
- N/A (tooling)

### CLAUDE.md Rules
- Section 9.1: Pre-commit enforcement

---

## FOUND-008: Create Folder Structure

**Phase:** 1 - Foundation  
**Module:** Project Structure  
**Estimated Duration:** 30 minutes

### Inputs
- FOUND-001 complete
- `docs/frontend-blueprint/13-folder-structure.md` reviewed

### Outputs
- Complete folder structure created
- All directories from blueprint exist
- Placeholder `.gitkeep` files in empty dirs

### Tasks
1. Create `app/` directory structure per blueprint
2. Create `features/` with all module directories
3. Create `components/` subdirectories
4. Create `lib/` subdirectories
5. Create `types/` directory
6. Add `.gitkeep` files to empty directories

### Tests Required
- [ ] All directories from `13-folder-structure.md` exist
- [ ] Architecture tests can import from paths

### Acceptance Criteria
- Folder structure exactly matches blueprint
- All feature module directories created
- Import paths work with TypeScript aliases
- Empty directories have `.gitkeep`

### Rollback Criteria
- Directory structure doesn't match blueprint
- Import paths fail

### Blueprint References
- `docs/frontend-blueprint/13-folder-structure.md` - EXACT structure

### CLAUDE.md Rules
- Section 3: Folder rules
- Section 3.2: Feature module anatomy

---

## FOUND-009: Create Base Types

**Phase:** 1 - Foundation  
**Module:** `types/`  
**Estimated Duration:** 30 minutes

### Inputs
- FOUND-008 complete (folder structure)
- `docs/frontend-discovery/03-model-dictionary.md` reviewed

### Outputs
- Base TypeScript types defined
- API response types
- Common utility types

### Tasks
1. Create `types/api.ts` with API response types
2. Create `types/common.ts` with shared types
3. Create `types/models.ts` from model dictionary
4. Export all types from `types/index.ts`

### Tests Required
- [ ] Types import without errors
- [ ] Type checking works in test file

### Acceptance Criteria
- All backend models typed
- API response wrappers defined
- Common types (Result, Option, etc.) available
- Types exported from central index

### Rollback Criteria
- Type definitions conflict
- Circular type dependencies

### Blueprint References
- `docs/frontend-discovery/03-model-dictionary.md` - Model definitions
- `docs/frontend-blueprint/07-api-layer.md` - Response typing

### CLAUDE.md Rules
- Section 2.1: TypeScript strict typing
- Section 6.1: Response type patterns

---

## FOUND-010: Create Utility Functions

**Phase:** 1 - Foundation  
**Module:** `lib/utils/`  
**Estimated Duration:** 45 minutes

### Inputs
- FOUND-009 complete (base types)

### Outputs
- Utility functions implemented
- All utilities tested
- Utils exported from `lib/utils/index.ts`

### Tasks
1. Create `lib/utils/cn.ts` (classNames utility)
2. Create `lib/utils/format.ts` (date, number formatters)
3. Create `lib/utils/validation.ts` (common validators)
4. Create `lib/utils/constants.ts` (app constants)
5. Write unit tests for all utilities

### Tests Required
- [ ] Unit tests for each utility function
- [ ] Coverage >95% on utilities

### Acceptance Criteria
- All utilities implemented and tested
- Utilities follow single responsibility
- No external dependencies in utils
- Exported from central index

### Rollback Criteria
- Utility tests fail
- Circular dependencies introduced

### Blueprint References
- N/A (shared utilities)

### CLAUDE.md Rules
- Section 3.5: Utility layer responsibilities
- Section 2.5: Error handling in utilities

---

[... continuing with remaining 117 tasks in same detailed format ...]

---

# PHASE 2: CORE (45 Tasks)

## CORE-001: Implement PublicLayout

**Phase:** 2 - Core  
**Module:** Layouts  
**Estimated Duration:** 45 minutes

### Inputs
- Phase 1 complete (all FOUND tasks)
- `docs/frontend-blueprint/03-layout-architecture.md` reviewed
- `docs/frontend-blueprint/02-route-architecture.md` reviewed

### Outputs
- `app/(public)/layout.tsx` implemented
- PublicLayout component with all regions
- Header, main, footer regions defined

### Tasks
1. Create `app/(public)/layout.tsx`
2. Implement layout regions per blueprint
3. Add slot for nested routes
4. Integrate navigation components (stubs if needed)
5. Add loading and error states

### Tests Required
- [ ] Layout renders without errors
- [ ] All regions present in DOM
- [ ] Nested routes render in correct region
- [ ] Loading state displays correctly

### Acceptance Criteria
- PublicLayout matches `03-layout-architecture.md` spec
- All defined regions implemented
- Responsive layout works
- Loading/error states functional
- No TypeScript errors

### Rollback Criteria
- Layout breaks nested routes
- Regions don't match blueprint

### Blueprint References
- `docs/frontend-blueprint/03-layout-architecture.md` - PublicLayout spec
- `docs/frontend-blueprint/02-route-architecture.md` - Route structure

### CLAUDE.md Rules
- Section 3.1: Domain boundaries (public)
- Section 4.1: Layout component patterns

---

## CORE-002: Implement AdminLayout

**Phase:** 2 - Core  
**Module:** Layouts  
**Estimated Duration:** 45 minutes

### Inputs
- CORE-001 complete (PublicLayout pattern established)
- `docs/frontend-blueprint/03-layout-architecture.md` reviewed

### Outputs
- `app/(admin)/layout.tsx` implemented
- AdminLayout with sidebar, header, content regions
- Authentication check stub

### Tasks
1. Create `app/(admin)/layout.tsx`
2. Implement admin-specific regions
3. Add sidebar placeholder
4. Add auth check stub (redirect if not authenticated)
5. Style differently from public layout

### Tests Required
- [ ] Layout renders for authenticated user
- [ ] Redirects unauthenticated users (stub)
- [ ] All admin regions present

### Acceptance Criteria
- AdminLayout matches blueprint spec
- Distinct from PublicLayout visually
- Auth check in place (even if stub)
- Sidebar region functional

### Rollback Criteria
- Admin layout conflicts with public
- Auth redirect broken

### Blueprint References
- `docs/frontend-blueprint/03-layout-architecture.md` - AdminLayout
- `docs/frontend-blueprint/10-admin-architecture.md` - Admin requirements

### CLAUDE.md Rules
- Section 3.1: Admin domain isolation
- Section 7.2: RBAC preparation

---

## CORE-003: Implement TopicLayout

**Phase:** 2 - Core  
**Module:** Layouts  
**Estimated Duration:** 45 minutes

### Inputs
- CORE-001 complete
- `docs/frontend-blueprint/03-layout-architecture.md` reviewed

### Outputs
- `app/(public)/topics/[slug]/layout.tsx` implemented
- TopicLayout with topic navigation region
- Breadcrumb integration point

### Tasks
1. Create nested layout for topics
2. Add topic navigation region
3. Integrate breadcrumb component
4. Support nested topic routes

### Tests Required
- [ ] Nested layout composes with PublicLayout
- [ ] Topic nav region renders
- [ ] Breadcrumbs display correctly

### Acceptance Criteria
- TopicLayout extends PublicLayout correctly
- Nested route support working
- Breadcrumb region defined
- Topic navigation placeholder present

### Rollback Criteria
- Layout nesting broken
- Breadcrumbs don't display

### Blueprint References
- `docs/frontend-blueprint/03-layout-architecture.md` - TopicLayout
- `docs/frontend-blueprint/02-route-architecture.md` - Nested routes

### CLAUDE.md Rules
- Section 4.5: Layout composition

---

[... continuing with all 127 tasks in the same detailed format ...]

---

# APPENDIX A: Task Status Summary

| Task ID | Name | Phase | Status | Completed Date | Session | Notes |
|---------|------|-------|--------|----------------|---------|-------|
| FOUND-001 | Initialize Next.js 16 | 1 | Not Started | - | - | |
| FOUND-002 | Configure TypeScript | 1 | Not Started | - | - | |
| ... | ... | ... | ... | ... | ... | ... |

*Full table continues for all 127 tasks*

---

# APPENDIX B: Quick Reference by Module

## API Layer Tasks
- FOUND-011: Base API client
- CORE-009: documents.api.ts
- CORE-010: topics.api.ts
- CORE-011: search.api.ts
- CORE-012: quran.api.ts
- CORE-013: exports.api.ts
- CORE-014: analytics.api.ts
- CORE-015: admin.api.ts

## State Management Tasks
- FOUND-012: TanStack Query setup
- FOUND-013: Zustand setup
- CORE-XXX: Query implementations per feature

## Component Tasks
- FOUND-004: shadcn/ui base
- FOUND-014: Error boundary
- FOUND-015: Loading skeleton
- CORE-006 to CORE-008: Navigation components
- CORE-020 to CORE-037: Block renderers
- [etc.]

## Page Tasks
- CORE-016 to CORE-019: Document and Topic pages
- CORE-038: Search page
- [etc.]

---

# APPENDIX C: Dependency Quick Reference

## Tasks That Must Be Done First

### Before Any Feature Work
- FOUND-001 through FOUND-013 (all foundation)

### Before Pages
- CORE-001 through CORE-005 (all layouts)
- CORE-006 through CORE-008 (navigation)

### Before Feature Modules
- CORE-009 through CORE-015 (API layer)
- FOUND-012 (TanStack Query)

### Before BlockRenderer
- FOUND-010 (utilities including cn)
- FOUND-004 (shadcn/ui components)

### Before Advanced Features
- All Phase 2 tasks complete

### Before Admin
- All Phase 3 tasks complete
- Authentication flow implemented

---

# References

- Master Roadmap: `01-master-roadmap.md`
- Phase Registry: `02-phase-registry.md`
- Feature Registry: `03-feature-registry.md`
- Progress Tracker: `05-progress-tracker.md`
- Session Handoff: `08-session-handoff.md`
- Blueprint: `docs/frontend-blueprint/`
- Governance: `CLAUDE.md`
