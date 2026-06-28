# Phase 08: Assessments - Acceptance Criteria

## Definition of Done

Every requirement below must be met and verified before this phase is considered complete.

---

## 1. Core Functionality (Must Have)

### 1.1 MCQ Block Rendering
- [ ] MCQBlock component renders within topic content
- [ ] Question text displays without truncation
- [ ] All answer options visible and selectable
- [ ] KaTeX formulas render correctly in questions and options
- [ ] Component matches design specifications

### 1.2 Answer Selection
- [ ] Single-select questions allow only one answer
- [ ] Multi-select questions allow multiple answers
- [ ] Visual feedback on selection (< 100ms)
- [ ] Selected state persists during session
- [ ] Users can change answers before submission

### 1.3 Quiz Navigation
- [ ] Next button advances to next question
- [ ] Previous button returns to previous question
- [ ] Progress bar updates accurately (±0%)
- [ ] Question count displays correctly (e.g., "3 of 10")
- [ ] Submit button appears on last question

### 1.4 Progress Persistence
- [ ] Answers save to localStorage automatically
- [ ] Page refresh preserves all answered questions
- [ ] Browser close/reopen preserves progress
- [ ] Progress clears after successful submission
- [ ] Multiple quizzes maintain separate progress

### 1.5 Quiz Submission
- [ ] Confirmation dialog shows before submit
- [ ] Dialog displays question count summary
- [ ] Submit API call includes all answers
- [ ] Loading indicator shows during submission
- [ ] Success redirects to results page
- [ ] Failure shows error with retry option

### 1.6 Results Display
- [ ] Score percentage calculates correctly
- [ ] Correct/incorrect counts accurate
- [ ] Pass/fail status reflects passing score threshold
- [ ] Each question reviewable with user's answer
- [ ] Correct answer shown for each question
- [ ] Explanation displays if available
- [ ] Time spent displays if tracked

---

## 2. Practice Mode (Must Have)

### 2.1 Immediate Feedback
- [ ] Feedback appears within 200ms of answer selection
- [ ] Correct answers highlight in green (#22c55e or equivalent)
- [ ] Incorrect answers highlight in red (#ef4444 or equivalent)
- [ ] Explanation visible after selection
- [ ] User can continue after viewing feedback

### 2.2 Unlimited Attempts
- [ ] No limit on quiz restarts
- [ ] Each attempt starts fresh (no carried-over answers)
- [ ] Attempt count tracked (optional display)

### 2.3 Skip Functionality
- [ ] Skip button available on each question
- [ ] Skipped questions marked for review
- [ ] Can return to skipped questions via Previous
- [ ] Summary shows skipped count at end

---

## 3. Graded Mode (Must Have)

### 3.1 Answer Visibility
- [ ] Correct answers hidden until submission
- [ ] No feedback during quiz
- [ ] Results page shows all answers post-submission

### 3.2 Completion Requirements
- [ ] All questions must be answered OR blank allowed (configurable)
- [ ] Warning if unanswered questions exist
- [ ] Submit blocked until requirements met (if configured)

### 3.3 Scoring
- [ ] Points per question sum correctly
- [ ] Percentage = (earnedPoints / totalPoints) * 100
- [ ] Rounding to 1 decimal place
- [ ] Passing score comparison accurate

---

## 4. UI/UX Requirements (Must Have)

### 4.1 Visual Design
- [ ] Matches Figma/design specifications
- [ ] Consistent spacing and typography
- [ ] Brand colors applied correctly
- [ ] Icons from lucide-react library
- [ ] No visual regressions on existing pages

### 4.2 Loading States
- [ ] Skeleton screens during data fetch
- [ ] Spinner during submission
- [ ] Progress bar during multi-step processes
- [ ] No layout shift during loading

### 4.3 Error States
- [ ] Network errors show user-friendly message
- [ ] Retry button functional
- [ ] 404 for invalid assessment IDs
- [ ] Graceful degradation for partial failures

### 4.4 Confirmation Dialogs
- [ ] Submit confirmation required
- [ ] Clear action buttons (Cancel/Confirm)
- [ ] Escape key closes dialog
- [ ] Focus trapped in dialog while open

---

## 5. Accessibility (Must Have)

### 5.1 Keyboard Navigation
- [ ] Tab cycles through interactive elements
- [ ] Enter/Space triggers buttons and selections
- [ ] Arrow keys navigate between answer options
- [ ] Escape closes modals/dialogs
- [ ] No keyboard traps

### 5.2 Screen Reader Support
- [ ] All interactive elements have accessible names
- [ ] ARIA live regions announce feedback
- [ ] Question number announced
- [ ] Selection state announced
- [ ] Results announced on completion

### 5.3 Visual Accessibility
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Color contrast ratio ≥ 3:1 for UI components
- [ ] Focus indicators visible (2px outline minimum)
- [ ] Don't rely solely on color for meaning (use icons/text)

### 5.4 Semantic HTML
- [ ] Form elements use proper fieldset/legend
- [ ] Radio buttons for single-select
- [ ] Checkboxes for multi-select
- [ ] Heading hierarchy maintained
- [ ] Landmark regions used appropriately

---

## 6. Responsive Design (Must Have)

### 6.1 Mobile (< 768px)
- [ ] Full-width question cards
- [ ] Touch targets ≥ 44px × 44px
- [ ] Horizontal scroll absent
- [ ] Text readable without zoom
- [ ] Navigation buttons stack vertically

### 6.2 Tablet (768px - 1024px)
- [ ] Two-column option layout (when applicable)
- [ ] Progress bar visible
- [ ] Comfortable reading width

### 6.3 Desktop (> 1024px)
- [ ] Max-width container for readability
- [ ] Side-by-side layouts where appropriate
- [ ] Hover states functional

---

## 7. Performance (Should Have)

### 7.1 Load Times
- [ ] Quiz page loads in < 2 seconds (3G network simulation)
- [ ] Questions render within 500ms of data receipt
- [ ] Results page loads in < 1 second post-submission

### 7.2 Interaction Performance
- [ ] Answer selection visual feedback < 100ms
- [ ] Navigation between questions < 200ms
- [ ] No jank during scrolling
- [ ] 60fps animations

### 7.3 Bundle Impact
- [ ] Assessment components add < 50KB to bundle
- [ ] Code splitting implemented for quiz routes
- [ ] Lazy load non-critical components

---

## 8. Error Handling (Must Have)

### 8.1 Network Errors
- [ ] API failures caught and displayed
- [ ] Offline detection (optional)
- [ ] Queue submissions for retry when online

### 8.2 Validation Errors
- [ ] Invalid answer formats rejected
- [ ] Clear error messages for users
- [ ] Admin notified of systematic issues

### 8.3 Edge Cases
- [ ] Empty assessments handled gracefully
- [ ] Very long text wraps properly
- [ ] Special characters escape correctly
- [ ] Concurrent tab usage doesn't cause conflicts

---

## 9. Analytics & Tracking (Should Have)

### 9.1 Event Tracking
- [ ] Quiz start event fires
- [ ] Answer selection events fire
- [ ] Quiz completion event fires
- [ ] Score sent to analytics
- [ ] Time spent tracked

### 9.2 Data Privacy
- [ ] No PII sent to analytics
- [ ] Consent respected (if consent mode enabled)
- [ ] Anonymized user IDs used

---

## 10. Documentation (Must Have)

### 10.1 Code Documentation
- [ ] Components have JSDoc comments
- [ ] Complex logic explained inline
- [ ] Types/interfaces documented

### 10.2 User Documentation
- [ ] Help text for first-time users (optional)
- [ ] Tooltip explanations for modes
- [ ] FAQ section (if applicable)

### 10.3 Developer Documentation
- [ ] README updated with assessment features
- [ ] API integration guide
- [ ] State management flow diagram

---

## 11. Testing (Must Have)

### 11.1 Manual Testing
- [ ] All tests in `tests.md` pass
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Cross-device testing (iOS, Android, desktop)

### 11.2 Automated Testing (if applicable)
- [ ] Unit tests for utility functions
- [ ] Component tests for rendering
- [ ] Integration tests for quiz flow
- [ ] E2E test for critical path (start → submit → results)

---

## 12. Security (Must Have)

### 12.1 Input Validation
- [ ] XSS prevention on all user inputs
- [ ] Sanitize HTML in explanations
- [ ] Validate answer IDs server-side

### 12.2 Data Protection
- [ ] No sensitive data in localStorage
- [ ] API responses don't leak correct answers prematurely
- [ ] Rate limiting on submission endpoint

---

## Sign-Off Checklist

Before marking this phase complete:

- [ ] All "Must Have" criteria above are met
- [ ] All manual tests in `tests.md` pass
- [ ] No critical bugs open
- [ ] Code reviewed and approved
- [ ] Accessibility audit completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Stakeholder demo completed
- [ ] CURRENT_PHASE.md updated
- [ ] CHANGELOG.md updated
- [ ] Git commit created with proper message

---

**Phase Owner:** [Name]
**Review Date:** [Date]
**Status:** [Pending / Approved / Rejected]

**Notes:**
[Any additional comments or exceptions]
