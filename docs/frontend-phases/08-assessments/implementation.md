# Phase 08: Assessments - Implementation Specification

This document is self-contained. An implementation AI can build Phase 08 using only this file.

---

## 1. Pages and Layouts

### Quiz Taking Page

**File:** `app/topics/[slug]/quiz/page.tsx`

**Type:** Client Component (needs interactivity)

**Purpose:** Main quiz interface where users answer questions.

**Props (from URL):**
- `slug` - Topic slug
- `mode` - 'practice' | 'graded' (query param)

**Structure:**
```tsx
<div className="container max-w-4xl py-8">
  <QuizHeader topic={topic} mode={mode} />
  <ProgressBar current={currentQuestion} total={totalQuestions} />
  
  <QuestionCard
    question={questions[currentQuestion]}
    selectedAnswer={answers[currentQuestion.id]}
    onAnswerSelect={handleAnswerSelect}
    showFeedback={showFeedback}
    feedback={feedback}
  />
  
  <QuizNavigation
    hasNext={currentQuestion < totalQuestions - 1}
    hasPrevious={currentQuestion > 0}
    onNext={handleNext}
    onPrevious={handlePrevious}
    onSubmit={handleSubmit}
    isLast={currentQuestion === totalQuestions - 1}
  />
</div>
```

**Behavior:**
- Load assessment questions on mount
- Save answers to localStorage on each selection
- Track progress in URL state
- Submit all answers at end (graded mode) or show immediate feedback (practice mode)

---

### Assessment Results Page

**File:** `app/assessments/[id]/results/page.tsx`

**Type:** Server Component with Client interactions

**Purpose:** Display quiz results, score, and detailed feedback.

**Structure:**
```tsx
<div className="container max-w-4xl py-8">
  <ScoreDisplay score={score} total={total} percentage={percentage} />
  
  <AssessmentSummary
    correctCount={correctCount}
    incorrectCount={incorrectCount}
    timeSpent={timeSpent}
  />
  
  <ReviewSection>
    {questions.map((q, i) => (
      <QuestionReview
        key={q.id}
        question={q}
        userAnswer={userAnswers[i]}
        correctAnswer={q.correctAnswer}
        explanation={q.explanation}
      />
    ))}
  </ReviewSection>
  
  <ActionButtons>
    <Button onClick={() => router.back()}>Back to Topic</Button>
    <Button onClick={() => router.push(`/topics/${topicSlug}/quiz`)}>Retry Quiz</Button>
  </ActionButtons>
</div>
```

---

### Practice Mode Page

**File:** `app/practice/[topicId]/page.tsx`

**Type:** Client Component

**Purpose:** Unlimited practice with instant feedback.

**Differences from Quiz Page:**
- Shows correct/incorrect immediately after each answer
- Allows unlimited attempts
- No score tracking (or informal tracking)
- Can skip questions freely

---

## 2. Routes

| Route | Purpose | Params |
|-------|---------|--------|
| `/topics/[slug]/quiz` | Take assessment | slug (path), mode (query) |
| `/assessments/[id]/results` | View results | id (path) |
| `/practice/[topicId]` | Practice mode | topicId (path) |

---

## 3. APIs

### GET /api/v1/topics/:topicId/assessments

**Response:**
```json
{
  "data": [
    {
      "id": "assessment-1",
      "title": "Chapter 1 Quiz",
      "questionCount": 10,
      "timeLimit": null,
      "passingScore": 70,
      "mode": ["practice", "graded"]
    }
  ]
}
```

### GET /api/v1/assessments/:id

**Response:**
```json
{
  "data": {
    "id": "assessment-1",
    "title": "Chapter 1 Quiz",
    "description": "Test your understanding of Chapter 1",
    "questions": [
      {
        "id": "q1",
        "type": "mcq",
        "text": "What is the formula for force?",
        "options": [
          { "id": "a", "text": "F = ma" },
          { "id": "b", "text": "F = mv" },
          { "id": "c", "text": "F = m/a" },
          { "id": "d", "text": "F = a/m" }
        ],
        "correctAnswer": "a",
        "explanation": "Newton's Second Law states F = ma",
        "points": 1
      }
    ],
    "totalPoints": 10,
    "passingScore": 70
  }
}
```

### POST /api/v1/assessments/:id/submit

**Request:**
```json
{
  "answers": {
    "q1": "a",
    "q2": "c"
  },
  "timeSpent": 180
}
```

**Response:**
```json
{
  "data": {
    "score": 80,
    "correctCount": 8,
    "incorrectCount": 2,
    "passed": true,
    "results": [
      {
        "questionId": "q1",
        "userAnswer": "a",
        "correctAnswer": "a",
        "isCorrect": true,
        "points": 1
      }
    ]
  }
}
```

---

## 4. Components Created

| Component | File | Type | Reusable |
|-----------|------|------|----------|
| MCQBlock | `components/assessments/mcq-block.tsx` | Client | Yes |
| QuizContainer | `components/assessments/quiz-container.tsx` | Client | Yes |
| QuestionCard | `components/assessments/question-card.tsx` | Client | Yes |
| AnswerSelector | `components/assessments/answer-selector.tsx` | Client | Yes |
| FeedbackPanel | `components/assessments/feedback-panel.tsx` | Client | Yes |
| ScoreDisplay | `components/assessments/score-display.tsx` | Client | Yes |
| ProgressBar | `components/assessments/progress-bar.tsx` | Client | Yes |
| QuizNavigation | `components/assessments/quiz-navigation.tsx` | Client | Yes |
| AssessmentSummary | `components/assessments/assessment-summary.tsx` | Client | Yes |
| QuestionReview | `components/assessments/question-review.tsx` | Client | Yes |

---

## 5. State Management

### Quiz State (Zustand Store)

**File:** `stores/quiz-store.ts`

```typescript
interface QuizState {
  currentAssessmentId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isSubmitted: boolean;
  startTime: number | null;
  endTime: number | null;
  
  // Actions
  setAssessment: (id: string) => void;
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  submit: () => void;
  reset: () => void;
}
```

### Persistence

- Save answers to localStorage on each change
- Key: `quiz-progress-${assessmentId}`
- Restore on page reload
- Clear on successful submission

---

## 6. Models

### TypeScript Types

**File:** `types/assessment.ts`

```typescript
export type QuestionType = 'mcq' | 'true-false' | 'short-answer';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  totalPoints: number;
  passingScore: number;
  timeLimit?: number; // in seconds
  modes: ('practice' | 'graded')[];
}

export interface QuizResults {
  score: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  passed: boolean;
  timeSpent: number;
  results: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  earnedPoints: number;
}
```

---

## 7. Folders and Files

### Create These Directories:

```
app/
  topics/
    [slug]/
      quiz/
        page.tsx
  assessments/
    [id]/
      results/
        page.tsx
  practice/
    [topicId]/
      page.tsx

components/
  assessments/
    mcq-block.tsx
    quiz-container.tsx
    question-card.tsx
    answer-selector.tsx
    feedback-panel.tsx
    score-display.tsx
    progress-bar.tsx
    quiz-navigation.tsx
    assessment-summary.tsx
    question-review.tsx

stores/
  quiz-store.ts

types/
  assessment.ts

lib/
  api/
    assessments.api.ts
```

---

## 8. SEO

Assessment pages are interactive tools, not content pages:

```typescript
// Quiz page metadata
export const metadata: Metadata = {
  title: 'Quiz - Practice Your Knowledge',
  description: 'Test your understanding with interactive quizzes',
  robots: {
    index: false,
    follow: false,
  },
};
```

---

## 9. Loading States

### Quiz Loading

```tsx
<Skeleton className="h-8 w-3/4 mb-4" /> {/* Title */}
<Skeleton className="h-4 w-full mb-2" /> {/* Progress bar */}
<Skeleton className="h-4 w-full mb-2" />
<div className="space-y-4">
  <Skeleton className="h-24 w-full" /> {/* Question */}
  <Skeleton className="h-12 w-full" /> {/* Option 1 */}
  <Skeleton className="h-12 w-full" /> {/* Option 2 */}
  <Skeleton className="h-12 w-full" /> {/* Option 3 */}
  <Skeleton className="h-12 w-full" /> {/* Option 4 */}
</div>
```

---

## 10. Error Handling

### Common Errors

1. **Assessment Not Found**
   - Show 404 page
   - Suggest returning to topic

2. **Submit Failed**
   - Retry button
   - Save answers locally for later retry

3. **Network Error During Quiz**
   - Continue with cached data
   - Queue submission for retry

---

## 11. Accessibility

### Requirements

✓ All answer options use radio buttons (single select) or checkboxes (multi-select)
✓ Keyboard navigation: Tab between options, Enter/Space to select
✓ Focus visible on selected option
✓ ARIA labels for feedback (aria-live for immediate feedback)
✓ Screen reader announces correct/incorrect status
✓ Color contrast meets WCAG AA (don't rely solely on color for feedback)

### Implementation

```tsx
// Answer selector with accessibility
<fieldset>
  <legend className="sr-only">Select your answer</legend>
  {options.map((option) => (
    <label key={option.id} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
      <input
        type="radio"
        name={`question-${questionId}`}
        value={option.id}
        checked={selectedAnswer === option.id}
        onChange={() => handleSelect(option.id)}
        className="sr-only"
      />
      <div
        role="radio"
        aria-checked={selectedAnswer === option.id}
        className={`w-5 h-5 rounded-full border-2 ${
          selectedAnswer === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'
        }`}
      />
      <span>{option.text}</span>
    </label>
  ))}
</fieldset>
```

---

## 12. Responsive Behavior

### Mobile (< 768px)

- Full-width question cards
- Stacked answer options
- Large touch targets (min 44px)
- Simplified navigation (Next/Prev as full-width buttons)

### Tablet (768px - 1024px)

- Two-column layout for options (if 4 options)
- Visible progress bar

### Desktop (> 1024px)

- Max-width container for readability
- Side-by-side question and progress info

---

## 13. Backend Integration

### API Layer

**File:** `lib/api/assessments.api.ts`

```typescript
import { apiClient } from './client';
import type { Assessment, QuizResults } from '@/types/assessment';

export const assessmentsApi = {
  getByTopicId: async (topicId: string) => {
    const response = await apiClient.get(`/api/v1/topics/${topicId}/assessments`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/api/v1/assessments/${id}`);
    return response.data;
  },

  submit: async (id: string, answers: Record<string, string>, timeSpent: number) => {
    const response = await apiClient.post(`/api/v1/assessments/${id}/submit`, {
      answers,
      timeSpent,
    });
    return response.data;
  },

  getResults: async (id: string) => {
    const response = await apiClient.get(`/api/v1/assessments/${id}/results`);
    return response.data;
  },
};
```

---

## 14. Acceptance Checklist

### Core Functionality

- [ ] MCQ blocks render correctly within topic content
- [ ] Users can select answers (single and multiple choice)
- [ ] Quiz navigation works (next, previous, submit)
- [ ] Progress saves to localStorage
- [ ] Quiz can be resumed after page refresh
- [ ] Results display accurate scores
- [ ] Feedback shows correct/incorrect status

### Practice Mode

- [ ] Immediate feedback after each answer
- [ ] Explanation displays for each question
- [ ] Unlimited retries allowed
- [ ] Skip functionality works

### Graded Mode

- [ ] Answers hidden until submission
- [ ] All questions must be answered before submit (or allow blank)
- [ ] Score calculated correctly
- [ ] Pass/fail determined by passing score threshold

### UI/UX

- [ ] Progress bar updates accurately
- [ ] Timer displays if time limit exists
- [ ] Confirmation dialog before submit
- [ ] Success message on completion

### Accessibility

- [ ] Keyboard navigation works throughout
- [ ] Screen readers announce state changes
- [ ] Focus management correct
- [ ] Color contrast passes WCAG AA

### Responsive

- [ ] Works on mobile (touch-friendly)
- [ ] Works on tablet
- [ ] Works on desktop

### Error Handling

- [ ] Network errors handled gracefully
- [ ] Invalid assessment ID shows 404
- [ ] Submission failures can be retried

---

## 15. Common Mistakes to Avoid

❌ **Not saving progress** - User loses answers on refresh
✅ **Solution:** Auto-save to localStorage on every answer change

❌ **Showing correct answers too early** - Ruins graded mode
✅ **Solution:** Only show feedback after submission in graded mode

❌ **Poor keyboard navigation** - Inaccessible to keyboard users
✅ **Solution:** Test with Tab/Enter/Space keys throughout

❌ **No confirmation before submit** - Accidental submissions
✅ **Solution:** Show confirmation dialog with question count summary

❌ **Ignoring time limits** - Users can take unlimited time
✅ **Solution:** Implement countdown timer with auto-submit

---

## 16. Git Commit Message

```
feat(assessments): implement quiz system with MCQ support

- Add MCQ block component for topic content integration
- Create quiz taking page with progress tracking
- Implement results page with score display and review
- Add practice mode with immediate feedback
- Build Zustand store for quiz state management
- Persist answers to localStorage for resume functionality
- Include accessibility features (keyboard nav, ARIA)
- Add responsive design for mobile/tablet/desktop

Part of Phase 08: Assessments
```
