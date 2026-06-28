# Architecture Laws

## Purpose

This document provides deep implementation guidance for the architectural boundaries and layer separation rules defined in the constitution (`CLAUDE.md` Section 1).

---

## Law 1: Domain Boundary Enforcement

### Implementation Rules

#### 1.1 Public Domain (`/app/(public)`)

**Routes**:
- `/` - Homepage
- `/topics/[slug]` - Topic detail pages
- `/documents/[id]` - Document viewing
- `/quran/[surah]/[ayah]` - Quran references
- `/search` - Global search
- `/categories/[slug]` - Category browsing

**Allowed Imports**:
```typescript
// ✅ Allowed
import { topicApi } from '@/features/topics/api/topics.api';
import { BlockRenderer } from '@/components/content/block-renderer';
import { useTopicQuery } from '@/features/topics/hooks/use-topic-query';

// ❌ Forbidden
import { adminApi } from '@/features/admin/api/admin.api';
import { DashboardWidget } from '@/features/admin/components/dashboard-widget';
```

#### 1.2 Admin Domain (`/app/(admin)/admin`)

**Routes**:
- `/admin` - Dashboard
- `/admin/topics` - Topic management
- `/admin/documents` - Document ingestion
- `/admin/analytics` - Analytics dashboard
- `/admin/settings` - System settings

**Authentication Requirement**:
All admin routes MUST be protected by authentication middleware.

```typescript
// app/(admin)/admin/layout.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await auth.getSession();
  
  if (!session || !session.isAdmin) {
    redirect('/login');
  }
  
  return <AdminShell>{children}</AdminShell>;
}
```

#### 1.3 Cross-Domain Communication

**Rule**: Domains communicate ONLY through facades.

```typescript
// ✅ Correct: Using search facade from topics domain
import { searchFacade } from '@/features/search/facade';

const results = await searchFacade.searchTopics(query);

// ❌ Wrong: Direct import across domains
import { TopicSearchComponent } from '@/features/topics/components/topic-search';
```

---

## Law 2: Layer Separation

### Dependency Graph

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│     (pages, layouts, components)    │
└─────────────────┬───────────────────┘
                  │ imports ↓
┌─────────────────▼───────────────────┐
│     Feature Layer                   │
│     (feature modules, hooks)        │
└─────────────────┬───────────────────┘
                  │ imports ↓
┌─────────────────▼───────────────────┐
│     Domain Layer                    │
│     (business logic, validators)    │
└─────────────────┬───────────────────┘
                  │ imports ↓
┌─────────────────▼───────────────────┐
│     Infrastructure Layer            │
│     (API clients, utilities)        │
└─────────────────────────────────────┘
```

### Implementation Examples

#### Presentation Layer (Pages)

```typescript
// ✅ CORRECT: Page imports from feature layer
import { TopicView } from '@/features/topics/components/topic-view';
import { useTopicQuery } from '@/features/topics/hooks/use-topic-query';

export default function TopicPage({ params }: { params: { slug: string } }) {
  const { data: topic, isLoading } = useTopicQuery(params.slug);
  
  if (isLoading) return <LoadingSkeleton />;
  if (!topic) return <NotFound />;
  
  return <TopicView topic={topic} />;
}

// ❌ WRONG: Page imports infrastructure directly
import { topicApi } from '@/features/topics/api/topics.api'; // Should use hook

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = await topicApi.getTopicBySlug(params.slug); // No abstraction
  return <TopicView topic={topic} />;
}
```

#### Feature Layer (Hooks)

```typescript
// ✅ CORRECT: Hook uses infrastructure layer
export function useTopicQuery(slug: string) {
  return useQuery({
    queryKey: topicKeys.detail(slug),
    queryFn: () => topicApi.getTopicBySlug(slug),
  });
}

// ❌ WRONG: Hook imports presentation layer
import { TopicCard } from '@/features/topics/components/topic-card';

export function useTopicQuery(slug: string) {
  // Hook should not know about UI components
  const component = <TopicCard />; // WRONG
  return useQuery(...);
}
```

#### Infrastructure Layer (API Clients)

```typescript
// ✅ CORRECT: API client has no dependencies on higher layers
export const topicApi = {
  getTopicBySlug: async (slug: string): Promise<Topic> => {
    const response = await apiClient.get(`/api/v1/topics/slug/${slug}`);
    return TopicSchema.parse(response.data);
  },
};

// ❌ WRONG: API client imports business logic
import { validateTopicAccess } from '@/domain/topic-validation';

export const topicApi = {
  getTopicBySlug: async (slug: string) => {
    validateTopicAccess(slug); // Infrastructure shouldn't know domain rules
    // ...
  },
};
```

---

## Law 3: Single Responsibility

### Module Boundaries

Each feature module MUST have exactly one responsibility:

```
features/topics/          # Topic-related functionality ONLY
features/documents/       # Document-related functionality ONLY
features/search/          # Search functionality ONLY
features/quran/           # Quran content ONLY
features/admin/           # Admin operations ONLY
features/exports/         # Export generation ONLY
features/analytics/       # Analytics tracking ONLY
```

### Component Responsibility

```typescript
// ✅ CORRECT: Single-purpose component
export function TopicTitle({ title }: { title: string }) {
  return <h1 className="text-2xl font-bold">{title}</h1>;
}

// ❌ WRONG: Component does too much
export function TopicEverything({ topicId }: { topicId: string }) {
  const { data: topic } = useTopicQuery(topicId);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  
  // Fetches data, manages state, handles navigation, renders UI
  // This violates single responsibility
}
```

### Hook Responsibility

```typescript
// ✅ CORRECT: One hook, one purpose
export function useTopicQuery(id: string) { /* fetches topic */ }
export function useTopicMutation() { /* mutates topic */ }
export function useTopicFilters() { /* manages filters */ }

// ❌ WRONG: Hook does everything
export function useTopic(id: string) {
  // Fetches, mutates, filters, AND manages UI state
  const query = useQuery(...);
  const mutation = useMutation(...);
  const [uiState, setUiState] = useState(...);
  // Returns 15 different things
  return { ...query, ...mutation, ...uiState, /* etc */ };
}
```

---

## Law 4: Immutability

### State Updates

```typescript
// ✅ CORRECT: Immutable update pattern
const [topics, setTopics] = useState<Topic[]>([]);

const addTopic = (newTopic: Topic) => {
  setTopics(prev => [...prev, newTopic]);
};

const updateTopic = (id: string, updates: Partial<Topic>) => {
  setTopics(prev => prev.map(t => 
    t.id === id ? { ...t, ...updates } : t
  ));
};

// ❌ WRONG: Mutable operations
const addTopic = (newTopic: Topic) => {
  topics.push(newTopic); // MUTATION
  setTopics(topics);
};
```

### Prop Handling

```typescript
// ✅ CORRECT: Treat props as read-only
export function TopicCard({ topic }: TopicCardProps) {
  const displayedTopic = { ...topic, viewedAt: new Date() };
  return <div>{displayedTopic.title}</div>;
}

// ❌ WRONG: Mutating props
export function TopicCard({ topic }: TopicCardProps) {
  topic.viewedAt = new Date(); // MUTATION - NEVER DO THIS
  return <div>{topic.title}</div>;
}
```

### API Response Handling

```typescript
// ✅ CORRECT: Parse to new immutable object
const TopicSchema = z.object({ /* ... */ });

const processResponse = (data: unknown): Topic => {
  return TopicSchema.parse(data); // Returns new object
};

// ❌ WRONG: Modifying response directly
const processResponse = (data: any): Topic => {
  data.processed = true; // MUTATION
  data.createdAt = new Date(data.createdAt);
  return data;
};
```

---

## Cross-Cutting Concerns

### Logging

```typescript
// Use centralized logger
import { logger } from '@/lib/logging';

logger.info('Topic loaded', { topicId, userId });
logger.error('Failed to fetch topic', error, { topicId });
```

### Error Boundaries

```typescript
// Wrap feature areas with error boundaries
<ErrorBoundary fallback={<FeatureError />}>
  <TopicFeature />
</ErrorBoundary>
```

### Performance Monitoring

```typescript
// Mark performance milestones
import { mark, measure } from '@/lib/performance';

mark('topic-fetch-start');
const topic = await topicApi.getById(id);
mark('topic-fetch-end');
measure('topic-fetch', 'topic-fetch-start', 'topic-fetch-end');
```

---

## Violation Detection

### ESLint Rules

The following ESLint rules enforce architecture laws:

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // Prevent cross-domain imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/admin/**'],
            message: 'Admin modules cannot be imported from public domain',
          },
          {
            group: ['@/features/*/api/*'],
            message: 'Import from hooks, not directly from API layer',
          },
        ],
      },
    ],
    
    // Enforce immutability
    'no-param-reassign': 'error',
    'no-unused-expressions': 'error',
  },
};
```

### Architecture Tests

```typescript
// tests/architecture/domain-boundaries.test.ts
import { analyzeImports } from 'madge';

describe('Domain Boundaries', () => {
  it('prevents admin imports from public domain', async () => {
    const result = await analyzeImports('app/(public)');
    
    const violations = result.filter(import_ => 
      import_.includes('features/admin')
    );
    
    expect(violations).toHaveLength(0);
  });
});
```

---

## Exceptions Process

Architecture law violations require explicit approval:

1. Document the exception in code comment
2. Link to GitHub issue explaining rationale
3. Get approval from tech lead
4. Add to technical debt register

```typescript
// ARCHITECTURE_EXCEPTION(#1234): Temporary cross-domain import
// Reason: Shared search functionality being refactored
// Approved by: @techlead on 2024-01-15
// TODO(#1234): Remove when search facade is implemented
import { SearchBox } from '@/features/search/components/search-box';
```

---

## Related Documents

- `CLAUDE.md` Section 1: Architecture Laws
- `docs/frontend-blueprint/01-system-architecture.md`
- `docs/frontend-implementation/03-folder-organization.md`

---

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2024
