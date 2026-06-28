# Testing Guide

## Purpose

This document defines the comprehensive testing methodology for the SIJIL frontend, ensuring consistent test coverage across all implementation phases.

---

## Testing Pyramid

```
           ╱╲
          ╱  ╲
         ╱ E2E ╲         10% - Critical user journeys
        ╱──────╲
       ╱        ╲
      ╱Integration╲      20% - Feature integration points
     ╱────────────╲
    ╱              ╲
   ╱    Unit Tests   ╲   70% - Utilities, hooks, components
  ╱──────────────────╲
```

---

## Tool Stack

| Test Type | Tool | Configuration |
|-----------|------|---------------|
| Unit Tests | Vitest | `vitest.config.ts` |
| Component Tests | Testing Library + Vitest | `@testing-library/react` |
| Integration Tests | Testing Library + MSW | `msw`, `@mswjs/data` |
| E2E Tests | Playwright | `playwright.config.ts` |
| Visual Tests | Playwright + Percy | Optional, phase 8+ |
| Coverage | Vitest + c8 | Threshold: 80% |

---

## Unit Testing

### What to Test

- ✅ Utility functions
- ✅ Type guards
- ✅ Schema validators (Zod)
- ✅ Pure business logic
- ✅ API response parsers
- ✅ Custom hooks (logic only)

### What NOT to Test

- ❌ Third-party library internals
- ❌ Trivial getters/setters
- ❌ Implementation details
- ❌ Generated code

### Test File Naming

```bash
# Match source file name with .test suffix
utils/format-date.ts → format-date.test.ts
hooks/use-topic-query.ts → use-topic-query.test.ts
schemas/topic.schema.ts → topic.schema.test.ts
```

### Example: Utility Function Test

```typescript
// utils/format-date.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, isDateValid } from './format-date';

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const input = '2024-01-15T10:30:00Z';
    const expected = 'January 15, 2024';
    
    expect(formatDate(input)).toBe(expected);
  });

  it('handles different date formats', () => {
    expect(formatDate('2024-06-01')).toBe('June 1, 2024');
    expect(formatDate(new Date('2024-12-25'))).toBe('December 25, 2024');
  });

  it('returns empty string for invalid dates', () => {
    expect(formatDate('invalid')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });

  it('supports custom format options', () => {
    expect(formatDate('2024-01-15', { short: true })).toBe('Jan 15, 2024');
    expect(formatDate('2024-01-15', { withTime: true }))
      .toMatch(/January 15, 2024 \d+:\d+/);
  });
});

describe('isDateValid', () => {
  it('returns true for valid dates', () => {
    expect(isDateValid('2024-01-15')).toBe(true);
    expect(isDateValid(new Date())).toBe(true);
  });

  it('returns false for invalid dates', () => {
    expect(isDateValid('not-a-date')).toBe(false);
    expect(isDateValid('')).toBe(false);
  });
});
```

### Example: Hook Test

```typescript
// hooks/use-topic-filters.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTopicFilters } from './use-topic-filters';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useTopicFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default filters', () => {
    const { result } = renderHook(() => useTopicFilters(), {
      wrapper: createWrapper(),
    });

    expect(result.current.filters).toEqual({
      category: 'all',
      page: 1,
      search: '',
    });
  });

  it('updates category filter', async () => {
    const { result } = renderHook(() => useTopicFilters(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setCategory('mathematics');
    });

    await waitFor(() => {
      expect(result.current.filters.category).toBe('mathematics');
    });
  });

  it('resets all filters', () => {
    const { result } = renderHook(() => useTopicFilters(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.setCategory('physics');
      result.current.setPage(5);
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      category: 'all',
      page: 1,
      search: '',
    });
  });
});
```

---

## Component Testing

### Testing Strategy

Test component behavior, not implementation:

```typescript
// ✅ CORRECT: Test what user sees/does
describe('TopicCard', () => {
  it('displays topic title and description', () => {
    render(<TopicCard topic={mockTopic} />);
    
    expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    expect(screen.getByText(mockTopic.description)).toBeInTheDocument();
  });

  it('navigates to topic page when clicked', () => {
    const router = useRouter();
    render(<TopicCard topic={mockTopic} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(router.push).toHaveBeenCalledWith(`/topics/${mockTopic.slug}`);
  });
});

// ❌ WRONG: Test implementation details
describe('TopicCard', () => {
  it('calls handleClick function', () => {
    // Don't test internal functions
  });

  it('has correct className structure', () => {
    // Don't test CSS class names unless critical
  });
});
```

### Example: Component Test

```typescript
// features/topics/components/topic-card.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TopicCard } from './topic-card';
import { mockTopic } from '@/tests/mocks/topic.mock';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

describe('TopicCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders topic title', () => {
      render(<TopicCard topic={mockTopic} />);
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    });

    it('renders topic description', () => {
      render(<TopicCard topic={mockTopic} />);
      expect(screen.getByText(mockTopic.description)).toBeInTheDocument();
    });

    it('renders category badge if category exists', () => {
      render(<TopicCard topic={{ ...mockTopic, category: 'Math' }} />);
      expect(screen.getByText('Math')).toBeInTheDocument();
    });

    it('does not render category badge if no category', () => {
      render(<TopicCard topic={{ ...mockTopic, category: null }} />);
      expect(screen.queryByText('Category')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('navigates to topic detail on click', () => {
      const router = useRouter();
      render(<TopicCard topic={mockTopic} />);

      fireEvent.click(screen.getByRole('button'));

      expect(router.push).toHaveBeenCalledWith(`/topics/${mockTopic.slug}`);
    });

    it('calls onClick callback if provided', () => {
      const handleClick = vi.fn();
      render(<TopicCard topic={mockTopic} onClick={handleClick} />);

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledWith(mockTopic.id);
    });

    it('shows loading state while navigating', async () => {
      const router = useRouter();
      router.push.mockImplementation(() => new Promise(() => {}));

      render(<TopicCard topic={mockTopic} />);

      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    it('applies compact variant styles', () => {
      const { container } = render(
        <TopicCard topic={mockTopic} variant="compact" />
      );

      expect(container.firstChild).toHaveClass('topic-card--compact');
    });

    it('applies default variant when not specified', () => {
      const { container } = render(<TopicCard topic={mockTopic} />);

      expect(container.firstChild).toHaveClass('topic-card--default');
    });
  });

  describe('Accessibility', () => {
    it('has accessible role', () => {
      render(<TopicCard topic={mockTopic} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has aria-label for screen readers', () => {
      render(<TopicCard topic={mockTopic} />);
      expect(screen.getByRole('button')).toHaveAccessibleName(
        `View topic: ${mockTopic.title}`
      );
    });

    it('is keyboard navigable', () => {
      render(<TopicCard topic={mockTopic} />);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      fireEvent.keyDown(button, { key: 'Enter' });
      expect(useRouter().push).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles missing topic gracefully', () => {
      const { container } = render(<TopicCard topic={null as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('handles very long titles', () => {
      const longTitle = 'A'.repeat(500);
      render(<TopicCard topic={{ ...mockTopic, title: longTitle }} />);
      
      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longTitle)).toHaveStyle('overflow-wrap: break-word');
    });
  });
});
```

---

## Integration Testing

### When to Use Integration Tests

- Testing multiple components together
- Testing API interactions with mocked backend
- Testing feature workflows
- Testing state management across components

### Example: Feature Integration Test

```typescript
// features/topics/components/topic-list.integration.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopicList } from './topic-list';
import { server } from '@/tests/mocks/server';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TopicList Integration', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('fetches and displays topics from API', async () => {
    renderWithProviders(<TopicList />);

    // Show initial loading state
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Introduction to Calculus')).toBeInTheDocument();
    });

    // Verify multiple topics rendered
    expect(screen.getAllByTestId('topic-card')).toHaveLength(10);
  });

  it('handles API error gracefully', async () => {
    server.use(
      http.get('/api/v1/topics', () => {
        return HttpResponse.json(
          { message: 'Internal server error' },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<TopicList />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    expect(screen.getByText('Failed to load topics')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('refetches data on retry', async () => {
    let callCount = 0;

    server.use(
      http.get('/api/v1/topics', () => {
        callCount++;
        if (callCount === 1) {
          return HttpResponse.json({ error: 'Server error' }, { status: 500 });
        }
        return HttpResponse.json({ data: [mockTopic] });
      })
    );

    renderWithProviders(<TopicList />);

    // First attempt fails
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });

    // Click retry
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));

    // Second attempt succeeds
    await waitFor(() => {
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    });
  });

  it('applies filters and refetches', async () => {
    renderWithProviders(<TopicList />);

    await waitFor(() => {
      expect(screen.getByText('Introduction to Calculus')).toBeInTheDocument();
    });

    // Select category filter
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: 'mathematics' } });

    // Verify API called with filter
    await waitFor(() => {
      expect(screen.getByText('Loading filtered topics...')).toBeInTheDocument();
    });
  });

  it('paginates correctly', async () => {
    renderWithProviders(<TopicList />);

    await waitFor(() => {
      expect(screen.getByText('Introduction to Calculus')).toBeInTheDocument();
    });

    // Click next page
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageButton);

    // Verify page 2 loads
    await waitFor(() => {
      expect(screen.getByTestId('page-indicator')).toHaveTextContent('Page 2');
    });
  });
});
```

---

## E2E Testing

### Critical User Journeys

Test these flows end-to-end:

1. **Topic Discovery**
   - Visit homepage
   - Search for topic
   - View topic detail
   - Navigate related topics

2. **Search Flow**
   - Enter search query
   - Apply filters
   - View results
   - Handle no results

3. **Admin Workflow** (authenticated)
   - Login
   - Create topic
   - Edit topic
   - Delete topic

### Example: E2E Test

```typescript
// tests/e2e/topic-discovery.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Topic Discovery Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates from homepage to topic detail', async ({ page }) => {
    // Verify homepage loads
    await expect(page).toHaveTitle(/SIJIL/);

    // Find and click first topic card
    const firstTopic = page.getByTestId('topic-card').first();
    await firstTopic.click();

    // Verify navigation to topic detail
    await expect(page).toHaveURL(/\/topics\/[\w-]+/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('searches for topics and views results', async ({ page }) => {
    // Fill search input
    await page.fill('[name="search"]', 'calculus');
    await page.press('[name="search"]', 'Enter');

    // Verify URL updated
    await expect(page).toHaveURL('/search?query=calculus');

    // Verify results displayed
    await expect(page.getByTestId('search-results')).toBeVisible();
    await expect(page.getByTestId('topic-card').first()).toBeVisible();
  });

  test('handles empty search results', async ({ page }) => {
    await page.fill('[name="search"]', 'xyznonexistent123');
    await page.press('[name="search"]', 'Enter');

    await expect(page.getByText('No topics found')).toBeVisible();
    await expect(page.getByText('Try different keywords')).toBeVisible();
  });

  test('applies category filter', async ({ page }) => {
    await page.goto('/search');

    // Select category
    await page.selectOption('[name="category"]', 'mathematics');

    // Verify URL updated
    await expect(page).toHaveURL('/search?category=mathematics');

    // Verify filtered results
    const categoryBadges = page.getByTestId('category-badge');
    await expect(categoryBadges.first()).toContainText('Mathematics');
  });

  test('navigates using breadcrumbs', async ({ page }) => {
    await page.goto('/topics/introduction-to-calculus');

    // Click home breadcrumb
    await page.getByText('Home').click();
    await expect(page).toHaveURL('/');

    // Go back to topic
    await page.goto('/topics/introduction-to-calculus');

    // Click category breadcrumb
    await page.getByText('Mathematics').click();
    await expect(page).toHaveURL('/categories/mathematics');
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('topic list is usable on mobile', async ({ page }) => {
    await page.goto('/topics');

    // Verify touch targets are large enough
    const topicCards = page.getByTestId('topic-card');
    await expect(topicCards.first()).toBeVisible();

    // Verify navigation works
    await topicCards.first().click();
    await expect(page).toHaveURL(/\/topics\/[\w-]+/);
  });
});
```

---

## Mock Data Strategy

### Factory Functions

```typescript
// tests/mocks/topic.mock.ts
import { faker } from '@faker-js/faker';
import type { Topic } from '@/features/topics/types/topic.types';

export function createMockTopic(overrides?: Partial<Topic>): Topic {
  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(faker.lorem.words(3)),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    content: [],
    categoryId: faker.string.uuid(),
    categoryName: faker.helpers.arrayElement([
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
    ]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    viewCount: faker.number.int({ min: 0, max: 10000 }),
    ...overrides,
  };
}

export const mockTopic = createMockTopic();

export function createMockTopicList(count: number = 10): Topic[] {
  return Array.from({ length: count }, (_, i) =>
    createMockTopic({ title: `Topic ${i + 1}` })
  );
}
```

### MSW Handlers

```typescript
// tests/mocks/handlers/topics.handlers.ts
import { http, HttpResponse } from 'msw';
import { createMockTopicList } from '../mocks/topic.mock';

export const topicsHandlers = [
  // GET /api/v1/topics
  http.get('/api/v1/topics', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const category = url.searchParams.get('category');

    let topics = createMockTopicList(50);

    // Apply category filter
    if (category && category !== 'all') {
      topics = topics.filter(t => t.categoryName === category);
    }

    // Paginate
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const paginatedTopics = topics.slice(start, start + pageSize);

    return HttpResponse.json({
      data: paginatedTopics,
      meta: {
        total: topics.length,
        page,
        pageSize,
        totalPages: Math.ceil(topics.length / pageSize),
      },
    });
  }),

  // GET /api/v1/topics/:slug
  http.get('/api/v1/topics/slug/:slug', ({ params }) => {
    const { slug } = params;
    const topic = createMockTopic({ slug: slug as string });

    return HttpResponse.json({ data: topic });
  }),

  // POST /api/v1/topics
  http.post('/api/v1/topics', async ({ request }) => {
    const body = await request.json();
    const newTopic = createMockTopic(body);

    return HttpResponse.json({ data: newTopic }, { status: 201 });
  }),
];
```

---

## Coverage Requirements

### Minimum Thresholds

| Category | Minimum Coverage |
|----------|-----------------|
| Overall | 80% |
| Utilities | 100% |
| Type Guards | 100% |
| API Parsers | 100% |
| Business Logic | 90% |
| Components | 70% |
| Pages | 50% |

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        global: {
          statements: 80,
          branches: 75,
          functions: 80,
          lines: 80,
        },
        './lib/utils': {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.types.ts',
        '**/*.config.ts',
        '**/mocks/**',
      ],
    },
  },
});
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run unit tests with coverage
        run: npm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
        
      - name: Build application
        run: npm run build
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Related Documents

- `CLAUDE.md` Section 7: Testing Strategy
- `docs/frontend-blueprint/14-implementation-phases.md`
- `docs/frontend-implementation/08-performance-optimization.md`

---

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2024
