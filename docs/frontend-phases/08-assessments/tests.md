# Phase 08: Assessments - Manual Verification Tests

## Manual Verification

### Test 1: MCQ Block Rendering in Topic Content

**Steps:**
1. Navigate to a topic page that contains MCQ blocks
2. Scroll to the MCQ section
3. Verify the question displays correctly
4. Verify all answer options are visible

**Expected Results:**
- Question text renders without errors
- All answer options display as selectable buttons/radios
- KaTeX formulas render correctly if present
- No console errors

---

### Test 2: Answer Selection

**Steps:**
1. Click on an answer option
2. Observe visual feedback
3. Try selecting a different answer
4. Try deselecting (if allowed)

**Expected Results:**
- Selected answer highlights immediately
- Previous selection clears when new one chosen
- Visual state matches actual selection

---

### Test 3: Quiz Navigation

**Steps:**
1. Start a quiz from topic page
2. Answer first question
3. Click "Next"
4. Click "Previous"
5. Navigate to last question
6. Click "Submit"

**Expected Results:**
- Next button advances to next question
- Previous button returns to previous question
- Progress bar updates accurately
- Submit shows confirmation dialog

---

### Test 4: Progress Persistence

**Steps:**
1. Start a quiz
2. Answer 3 questions
3. Refresh the page
4. Navigate back to quiz

**Expected Results:**
- Answers persist after refresh
- Same question displays as before refresh
- Progress bar shows correct position

---

### Test 5: Quiz Submission

**Steps:**
1. Complete all questions in a quiz
2. Click "Submit"
3. Confirm submission in dialog
4. Wait for results

**Expected Results:**
- Confirmation dialog appears
- Loading indicator shows during submission
- Results page loads automatically
- Score displays correctly

---

### Test 6: Results Display

**Steps:**
1. View results page after submission
2. Check score display
3. Review each question
4. Click "Retry Quiz"

**Expected Results:**
- Percentage score accurate
- Correct/incorrect indicators show
- Explanations display for each question
- Retry button navigates to new quiz attempt

---

### Test 7: Practice Mode

**Steps:**
1. Start quiz in practice mode
2. Select an answer
3. Observe immediate feedback
4. Continue to next question

**Expected Results:**
- Feedback appears immediately after selection
- Correct answer highlighted in green
- Incorrect answer highlighted in red
- Explanation visible

---

### Test 8: Keyboard Navigation

**Steps:**
1. Tab through answer options
2. Press Enter/Space to select
3. Tab to Next button
4. Press Enter to advance

**Expected Results:**
- Focus moves logically between elements
- Selected option visible with focus ring
- Enter/Space triggers selection
- No keyboard traps

---

## Regression Tests

### Regression 1: Topic Page Still Works

**Verify:** Topic pages without assessments still render correctly.

### Regression 2: Other Components Unaffected

**Verify:** shadcn/ui components work normally outside assessment context.

### Regression 3: Mobile Menu Still Works

**Verify:** Header mobile menu functions after assessment interactions.

---

## API Verification

### Test API: GET /api/v1/topics/:topicId/assessments

**Steps:**
1. Open browser DevTools Network tab
2. Navigate to topic with assessments
3. Find assessments API call
4. Inspect response

**Expected Response:**
```json
{
  "data": [{
    "id": "string",
    "title": "string",
    "questionCount": number,
    "mode": ["practice", "graded"]
  }]
}
```

---

### Test API: POST /api/v1/assessments/:id/submit

**Steps:**
1. Complete a quiz
2. Submit answers
3. Inspect request payload
4. Inspect response

**Expected Request:**
```json
{
  "answers": { "q1": "a", "q2": "b" },
  "timeSpent": number
}
```

**Expected Response:**
```json
{
  "data": {
    "score": number,
    "passed": boolean,
    "results": [...]
  }
}
```

---

## Edge Cases

### Edge Case 1: Empty Assessment

**Scenario:** Assessment with no questions

**Expected:** Show message "This assessment has no questions" with back button.

### Edge Case 2: Network Failure During Submit

**Scenario:** Internet disconnects during submission

**Expected:** 
- Error message displays
- Answers remain saved locally
- Retry button available

### Edge Case 3: Very Long Question Text

**Scenario:** Question with 500+ character text

**Expected:** Text wraps properly, no overflow, readable layout.

### Edge Case 4: Special Characters in Options

**Scenario:** Answer options contain <, >, &, quotes

**Expected:** Characters display correctly, no XSS vulnerabilities.

### Edge Case 5: Rapid Answer Changes

**Scenario:** User changes answer 5 times in 2 seconds

**Expected:** Last selection persists, no race conditions.

### Edge Case 6: Multiple Tabs Same Quiz

**Scenario:** Same quiz open in two browser tabs

**Expected:** Each tab maintains independent state, no conflicts.

### Edge Case 7: Browser Back Button

**Scenario:** User clicks browser back during quiz

**Expected:** State preserved, can return to quiz with answers intact.

### Edge Case 8: Time Limit Expiry (if applicable)

**Scenario:** Quiz with time limit expires

**Expected:** Auto-submit triggered, user notified, results shown.

---

## Performance Checks

1. **Quiz Load Time:** < 2 seconds for 20-question quiz
2. **Answer Selection:** Visual feedback within 100ms
3. **Results Display:** < 1 second after submission
4. **localStorage Operations:** No noticeable delay

---

## Accessibility Checks

1. Run axe DevTools extension - 0 critical violations
2. Test with screen reader (NVDA/VoiceOver)
   - Announces question number
   - Announces selected state
   - Announces feedback
3. Check color contrast ratio ≥ 4.5:1
4. Verify focus indicators visible
