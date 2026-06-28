# Phase 08: Assessments

## Overview

This phase implements the assessment system for Sijil, enabling students to test their knowledge through multiple-choice questions (MCQs), self-assessment quizzes, and interactive exercises embedded within topic content. Assessments are integrated into topics and can be taken independently.

## Goals

- Implement MCQ rendering and interaction within topic content
- Create standalone quiz pages for topic-based assessments
- Build assessment progress tracking
- Provide immediate feedback on answers
- Enable assessment completion tracking
- Support multiple question types (MCQ, true/false, short answer)
- Implement score calculation and display

## Deliverables

1. **Assessment Pages**
   - Quiz Taking Page (`/topics/[slug]/quiz`)
   - Assessment Results Page (`/assessments/[id]/results`)
   - Practice Mode Page (`/practice/[topicId]`)

2. **Components**
   - `MCQBlock` - Renders MCQ within topic content
   - `QuizContainer` - Wraps quiz interface
   - `QuestionCard` - Individual question display
   - `AnswerSelector` - Radio/checkbox answer selection
   - `FeedbackPanel` - Immediate answer feedback
   - `ScoreDisplay` - Final score visualization
   - `ProgressBar` - Quiz progress indicator
   - `QuizNavigation` - Next/Previous question controls
   - `AssessmentSummary` - Post-quiz summary
   - `PracticeModeToggle` - Switch between practice/graded mode

3. **Features**
   - Answer selection with validation
   - Immediate feedback (correct/incorrect with explanation)
   - Progress saving (resume quiz later)
   - Score calculation
   - Time tracking (optional)
   - Question shuffling (randomization)
   - Answer review before submission

## Dependencies

**Completed Before This Phase:**
- Phase 01: Foundation (API client, base components)
- Phase 02: App Shell (navigation, layout)
- Phase 05: Topic Detail (content block rendering)
- Phase 06: Document Viewer (content context)

**Required APIs:**
- `GET /api/v1/topics/:topicId/assessments` - List assessments for topic
- `GET /api/v1/assessments/:id` - Get assessment details
- `POST /api/v1/assessments/:id/submit` - Submit answers
- `GET /api/v1/assessments/:id/results` - Get results
- `POST /api/v1/analytics/assessment` - Track assessment events

## Exit Criteria

✓ All acceptance criteria in `acceptance.md` pass
✓ Manual verification tests in `tests.md` complete
✓ MCQs render correctly within topic content
✓ Quiz flow works end-to-end
✓ Responsive on mobile, tablet, desktop
✓ Accessibility audit passes (WCAG 2.1 AA)
✓ CURRENT_PHASE.md updated
✓ CHANGELOG.md updated

## Estimated Effort

**Complexity:** Medium-Large (M-L)
**Estimated Time:** 4-5 days
**Risk Level:** Medium (state management complexity)

## Key Challenges

1. **State Management:** Tracking answers across multiple questions
2. **Persistence:** Saving progress for resume functionality
3. **Feedback Timing:** When to show correct answers (immediate vs end)
4. **Accessibility:** Keyboard navigation for answer selection
5. **Performance:** Rendering large question banks efficiently

## Success Metrics

- Quiz completion rate > 60%
- Average score visibility within 2 seconds of submission
- Mobile quiz usage > 30% of total assessments
- Zero data loss on page refresh (progress saved)

## Integration Points

- **Topic Pages:** MCQs embedded in content blocks
- **Quiz Pages:** Standalone assessment experience
- **User Dashboard:** Assessment history and scores
- **Analytics:** Track assessment performance

## Technical Notes

- Use URL query parameters for quiz state (shareable URLs)
- Store in-progress answers in localStorage
- Support keyboard navigation (Arrow keys, Enter, Space)
- Implement answer validation before submission
- Use optimistic UI updates for responsive feel
