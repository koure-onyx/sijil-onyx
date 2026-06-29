# Phase 08: Assessments - Implementation Prompt

## Objective

Implement the assessment system for MCQs, self-assessment quizzes, and interactive exercises embedded within topic content with progress tracking and immediate feedback.

---

## Read First

1. `docs/frontend-pm/IMPLEMENTATION_RULES.md`
2. `docs/frontend-pm/CURRENT_PHASE.md`
3. `docs/frontend-phases/08-assessments/README.md`
4. `docs/frontend-phases/08-assessments/implementation.md`
5. `docs/frontend-execution/02-api-registry.md` - Assessment APIs

**Note:** Assessments are CLIENT-SIDE ONLY. There are NO backend APIs for storing or retrieving assessments. Do not create fake API calls.

---

## Files To Create

### Pages
- `src/app/topics/[slug]/quiz/page.tsx` - Quiz taking page
- `src/app/assessments/[id]/results/page.tsx` - Results page
- `src/app/practice/[topicId]/page.tsx` - Practice mode page

### Components
- `src/components/assessment/mcq-block.tsx` - MCQ rendering in topics
- `src/components/assessment/quiz-container.tsx` - Quiz interface wrapper
- `src/components/assessment/question-card.tsx` - Individual question display
- `src/components/assessment/answer-selector.tsx` - Radio/checkbox selection
- `src/components/assessment/feedback-panel.tsx` - Immediate answer feedback
- `src/components/assessment/score-display.tsx` - Final score visualization
- `src/components/assessment/progress-bar.tsx` - Quiz progress indicator
- `src/components/assessment/quiz-navigation.tsx` - Next/Previous controls
- `src/components/assessment/assessment-summary.tsx` - Post-quiz summary
- `src/components/assessment/practice-mode-toggle.tsx` - Practice/graded switch

### Hooks
- `src/hooks/use-quiz.ts` - Quiz state management (client-side)
- `src/hooks/use-assessment-progress.ts` - Progress tracking

---

## Backend APIs

**NONE** - Assessments are client-side only per the audit.

All assessment data is managed locally. Do NOT create API calls for:
- Getting assessments
- Submitting answers
- Getting results

If assessment data is needed, it comes embedded in topic content from Phase 05.

---

## Rules

**Critical:**
- NO backend API calls for assessments
- All state managed client-side
- Answer selection with validation
- Immediate feedback (correct/incorrect with explanation)
- Progress saving in localStorage
- Score calculation client-side
- Question shuffling (randomization)

---

## Stop Conditions

✓ MCQ rendering works within topic content
✓ Quiz taking page functional
✓ Immediate feedback on answers
✓ Progress tracking works
✓ Score calculation correct
✓ Practice mode available

**DO NOT continue to:** Exports (Phase 09), Admin (Phase 10)

---

## Deliverables

**Files Created:** Assessment pages, components, hooks
**Tests Run:** Build, type-check, lint, manual tests
**Acceptance:** All Phase 08 exit criteria met

**Estimated Effort:** 3-4 days

**Complexity:** Medium
