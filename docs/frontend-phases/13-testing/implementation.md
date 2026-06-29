# Phase 13: Testing Strategy - Implementation Guide

## Overview

This document provides complete implementation instructions for establishing a comprehensive testing strategy for the Sijil frontend. Follow these steps to set up unit tests, integration tests, E2E tests, accessibility testing, and CI/CD integration.

---

## 1. Configuration Files

### 1.1 Jest Configuration

**File:** `jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/web/$1',
    '^@components/(.*)$': '<rootDir>/apps/web/components/$1',
    '^@hooks/(.*)$': '<rootDir>/apps/web/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/apps/web/utils/$1',
    '^@types/(.*)$': '<rootDir>/apps/web/types/$1',
    '^@stores/(.*)$': '<rootDir>/apps/web/stores/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|@react-pdf/renderer)/)',
  ],
  collectCoverageFrom: [
    'apps/web/**/*.{ts,tsx}',
    '!apps/web/**/*.d.ts',
    '!apps/web/**/*.stories.*',
    '!apps/web/**/*.config.*',
    '!apps/web/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    ['jest-html-reporter', { outputPath: 'test-results/report.html' }],
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  verbose: true,
  bail: false,
  watchAll: false,
  maxWorkers: '50%',
  testTimeout: 10000,
};
```

### 1.2 Playwright Configuration

**File:** `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
  outputDir: 'playwright-test-results/',
});
```

### 1.3 Test Setup File

**File:** `setupTests.ts`

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { loadEnvConfig } from '@next/env';

// Load Next.js environment variables
const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
```

### 1.4 TypeScript Test Types

**File:** `types/global.d.ts`

```typescript
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toBeInTheDocument(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeVisible(): R;
      toContainElement(element: HTMLElement | null): R;
      toHaveAttribute(attr: string, value?: any): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveStyle(css: string | Record<string, any>): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value?: string | string[] | number): R;
      toBeChecked(): R;
    }
  }
}

export {};
```

---

## 2. Mock Data Factories

### 2.1 User Factory

**File:** `__mocks__/factories/user.factory.ts`

```typescript
import { faker } from '@faker-js/faker';
import type { User, UserRole } from '@/types/user';

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    role: (overrides.role || 'student') as UserRole,
    isActive: true,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}

export function createAdminUser(overrides: Partial<User> = {}): User {
  return createUser({ role: 'admin', ...overrides });
}

export function createStudentUser(overrides: Partial<User> = {}): User {
  return createUser({ role: 'student', ...overrides });
}

export function createMultipleUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}
```

### 2.2 Topic Factory

**File:** `__mocks__/factories/topic.factory.ts`

```typescript
import { faker } from '@faker-js/faker';
import type { Topic } from '@/types/topic';

export function createTopic(overrides: Partial<Topic> = {}): Topic {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    slug: faker.helpers.slugify(faker.lorem.words(3)),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    icon: faker.helpers.arrayElement(['book', 'code', 'database']),
    color: faker.internet.color(),
    status: 'published',
    order: faker.number.int({ min: 1, max: 100 }),
    isFeatured: faker.datatype.boolean({ probability: 0.2 }),
    documentCount: faker.number.int({ min: 5, max: 50 }),
    viewCount: faker.number.int({ min: 100, max: 10000 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}

export function createMultipleTopics(count: number): Topic[] {
  return Array.from({ length: count }, () => createTopic());
}
```

### 2.3 Document Factory

**File:** `__mocks__/factories/document.factory.ts`

```typescript
import { faker } from '@faker-js/faker';
import type { Document } from '@/types/document';

export function createDocument(overrides: Partial<Document> = {}): Document {
  return {
    id: faker.string.uuid(),
    topicId: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    slug: faker.helpers.slugify(faker.lorem.words(4)),
    content: faker.lorem.paragraphs({ min: 5, max: 15 }),
    excerpt: faker.lorem.paragraph({ min: 1, max: 2 }),
    type: 'article',
    status: 'published',
    readTime: faker.number.int({ min: 5, max: 30 }),
    viewCount: faker.number.int({ min: 50, max: 5000 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}

export function createMultipleDocuments(count: number): Document[] {
  return Array.from({ length: count }, () => createDocument());
}
```

### 2.4 Assessment Factory

**File:** `__mocks__/factories/assessment.factory.ts`

```typescript
import { faker } from '@faker-js/faker';
import type { Assessment, Question } from '@/types/assessment';

export function createQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: faker.string.uuid(),
    text: faker.lorem.sentence({ min: 8, max: 20 }),
    type: 'multiple-choice',
    points: faker.number.int({ min: 1, max: 10 }),
    order: faker.number.int({ min: 1, max: 50 }),
    options: [
      { id: faker.string.uuid(), text: faker.lorem.sentence(), isCorrect: true },
      { id: faker.string.uuid(), text: faker.lorem.sentence(), isCorrect: false },
    ],
    ...overrides,
  };
}

export function createAssessment(overrides: Partial<Assessment> = {}): Assessment {
  const questionCount = faker.number.int({ min: 5, max: 20 });
  
  return {
    id: faker.string.uuid(),
    topicId: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    slug: faker.helpers.slugify(faker.lorem.words(4)),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    type: 'practice',
    status: 'published',
    passingScore: 80,
    timeLimit: 30,
    questionCount,
    questions: Array.from({ length: questionCount }, () => createQuestion()),
    totalPoints: faker.number.int({ min: 50, max: 200 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
```

### 2.5 Export Job Factory

**File:** `__mocks__/factories/export.factory.ts`

```typescript
import { faker } from '@faker-js/faker';
import type { ExportJob } from '@/types/export';

export function createExportJob(overrides: Partial<ExportJob> = {}): ExportJob {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: 'document',
    resourceId: faker.string.uuid(),
    format: 'pdf',
    status: 'completed',
    progress: 100,
    fileSize: faker.number.int({ min: 10000, max: 5000000 }),
    downloadUrl: faker.internet.url(),
    createdAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
```

---

## 3. Mock Service Worker (MSW) Setup

### 3.1 MSW Handlers

**File:** `__mocks__/handlers/index.ts`

```typescript
import { http, HttpResponse } from 'msw';
import { createMultipleTopics } from '../factories/topic.factory';
import { createMultipleDocuments } from '../factories/document.factory';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const handlers = [
  // Auth
  http.post(`${API_BASE}/api/auth/login`, async ({ request }) => {
    const { email } = await request.json() as { email: string };
    if (email === 'test@example.com') {
      return HttpResponse.json({ user: { id: '1', email }, token: 'mock-token' });
    }
    return new HttpResponse(null, { status: 401 });
  }),

  // Topics
  http.get(`${API_BASE}/api/topics`, () => {
    return HttpResponse.json({ data: createMultipleTopics(10), pagination: { total: 100 } });
  }),

  http.get(`${API_BASE}/api/topics/:slug`, ({ params }) => {
    const topics = createMultipleTopics(1);
    return HttpResponse.json({ data: { ...topics[0], slug: params.slug } });
  }),

  // Documents
  http.get(`${API_BASE}/api/documents/:slug`, ({ params }) => {
    const docs = createMultipleDocuments(1);
    return HttpResponse.json({ data: { ...docs[0], slug: params.slug } });
  }),
];
```

### 3.2 MSW Browser Setup

**File:** `__mocks__/browser.ts`

```typescript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### 3.3 MSW Node Setup

**File:** `__mocks__/server.ts`

```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

---

## 4. Component Test Examples

### 4.1 Button Component Test

**File:** `components/ui/Button/Button.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

### 4.2 Topic Card Component Test

**File:** `components/topics/TopicCard/TopicCard.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TopicCard } from './TopicCard';
import { createTopic } from '../../../../__mocks__/factories/topic.factory';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('TopicCard', () => {
  const mockTopic = createTopic();

  it('renders topic title', () => {
    renderWithRouter(<TopicCard topic={mockTopic} />);
    expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
  });

  it('links to topic detail page', () => {
    renderWithRouter(<TopicCard topic={mockTopic} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/topics/${mockTopic.slug}`);
  });

  it('applies featured styles for featured topics', () => {
    const featuredTopic = createTopic({ isFeatured: true });
    const { container } = renderWithRouter(<TopicCard topic={featuredTopic} />);
    expect(container.firstChild).toHaveClass('border-yellow-500');
  });
});
```

---

## 5. Hook Test Examples

### 5.1 useAuth Hook Test

**File:** `hooks/useAuth/useAuth.test.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './useAuth';

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAuth', () => {
  it('returns initial auth state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(result.current.user).toBeDefined();
  });

  it('handles logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    await result.current.logout();
    await waitFor(() => expect(result.current.isAuthenticated).toBe(false));
  });
});
```

---

## 6. E2E Test Examples

### 6.1 Homepage E2E Test

**File:** `e2e/homepage.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('displays homepage title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sijil/i);
  });

  test('displays navigation menu', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: /topics/i })).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('React');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/search\?q=react/i);
  });

  test('clicking on topic navigates to topic page', async ({ page }) => {
    const firstTopic = page.locator('[data-testid="topic-card"]').first();
    await firstTopic.click();
    await expect(page).toHaveURL(/\/topics\//);
  });
});
```

### 6.2 Authentication E2E Test

**File:** `e2e/auth.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login form is visible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/email/i).fill('test@example.com');
    await page.getByPlaceholder(/password/i).fill('password123');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('failed login shows error', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/email/i).fill('wrong@example.com');
    await page.getByPlaceholder(/password/i).fill('wrong');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/invalid/i)).toBeVisible();
  });
});
```

### 6.3 Assessment E2E Test

**File:** `e2e/assessment.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Assessment Flow', () => {
  test('starts assessment', async ({ page }) => {
    await page.goto('/assessments/react-basics');
    await page.getByRole('button', { name: /start/i }).click();
    await expect(page.getByTestId('question-container')).toBeVisible();
  });

  test('submits answers', async ({ page }) => {
    await page.goto('/assessments/react-basics');
    await page.getByRole('button', { name: /start/i }).click();
    await page.locator('[data-testid="option"]').first().click();
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByTestId('question-container')).toBeVisible();
  });

  test('completes assessment and shows results', async ({ page }) => {
    await page.goto('/assessments/react-basics');
    await page.getByRole('button', { name: /start/i }).click();
    // Answer all questions then submit
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByTestId('results-container')).toBeVisible();
  });
});
```

---

## 7. Accessibility Tests

### 7.1 E2E Accessibility Tests

**File:** `e2e/accessibility.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('topic list page should be accessible', async ({ page }) => {
    await page.goto('/topics');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('assessment page should be accessible', async ({ page }) => {
    await page.goto('/assessments');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

---

## 8. Performance Tests

### 8.1 Lighthouse Performance Tests

**File:** `e2e/performance.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('homepage meets performance thresholds', async ({ page }) => {
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      return new Promise<{ lcp: number; fid: number; cls: number }>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries.find((e) => e.entryType === 'largest-contentful-paint');
          resolve({
            lcp: lcp?.startTime || 0,
            fid: 0,
            cls: 0,
          });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        setTimeout(() => resolve({ lcp: 0, fid: 0, cls: 0 }), 5000);
      });
    });
    
    expect(metrics.lcp).toBeLessThan(2500);
  });

  test('bundle size is within limits', async ({ page }) => {
    await page.goto('/');
    const response = await page.waitForResponse((res) => res.url().includes('_next/static'));
    const size = parseInt(response.headers()['content-length'] || '0');
    expect(size).toBeLessThan(200 * 1024); // 200KB
  });
});
```

---

## 9. CI/CD Integration

### 9.1 GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 10. Folder Structure

```
apps/web/
├── __mocks__/
│   ├── factories/
│   │   ├── user.factory.ts
│   │   ├── topic.factory.ts
│   │   ├── document.factory.ts
│   │   ├── assessment.factory.ts
│   │   └── export.factory.ts
│   ├── handlers/
│   │   └── index.ts
│   ├── browser.ts
│   └── server.ts
├── components/
│   └── **/__tests__/*.test.tsx
├── hooks/
│   └── **/__tests__/*.test.ts
├── e2e/
│   ├── homepage.spec.ts
│   ├── auth.spec.ts
│   ├── assessment.spec.ts
│   ├── accessibility.spec.ts
│   └── performance.spec.ts
├── jest.config.js
├── playwright.config.ts
├── setupTests.ts
└── types/
    └── global.d.ts

.github/
└── workflows/
    └── test.yml
```

---

## 11. Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --config jest.config.js",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:a11y": "playwright test e2e/accessibility.spec.ts",
    "test:perf": "playwright test e2e/performance.spec.ts",
    "test:ci": "npm run test:unit -- --ci && npm run test:e2e"
  }
}
```

---

## 12. Required Dependencies

```bash
# Testing frameworks
npm install -D jest @types/jest jest-environment-jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test
npm install -D @axe-core/playwright jest-axe

# Mocking
npm install -D msw @faker-js/faker
npm install -D identity-obj-proxy

# Reporting
npm install -D jest-html-reporter
```

---

## 13. Running Tests

```bash
# Unit tests
npm run test:unit
npm run test:coverage
npm run test:watch

# E2E tests
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:perf

# All tests in CI
npm run test:ci
```

---

## 14. Best Practices

1. **Write tests alongside code**: Create test files next to components
2. **Use descriptive test names**: `it('should do something when condition')`
3. **Keep tests independent**: Each test should run in isolation
4. **Mock external dependencies**: Use MSW for API calls
5. **Test user behavior, not implementation**: Focus on user experience
6. **Maintain test data**: Use factories for reusable test data
7. **Run tests frequently**: Use watch mode during development
8. **Fix flaky tests immediately**: Investigate intermittent failures
9. **Keep tests fast**: Optimize slow tests, parallelize where possible
10. **Document complex test scenarios**: Explain why, not just what

---

## 15. Acceptance Checklist

- [ ] Jest configured and running
- [ ] Playwright configured and running
- [ ] MSW setup for API mocking
- [ ] Mock factories created for all entities
- [ ] Unit tests for all components (80%+ coverage)
- [ ] Unit tests for all hooks
- [ ] Integration tests for critical flows
- [ ] E2E tests for main user journeys
- [ ] Accessibility tests integrated
- [ ] Performance tests configured
- [ ] CI/CD workflow set up
- [ ] Coverage reports generated
- [ ] Test documentation completed
- [ ] All tests passing in CI
