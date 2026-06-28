# Sijil — Frontend Blueprint: Search Architecture

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the complete search system architecture including global search, formula search, suggestions, filters, analytics, failed searches, and URL synchronization.

---

## Search System Components

### Global Search

**Location:** Header (all pages) + `/search` page

**Features:**
- Debounced input (300ms)
- Autocomplete dropdown
- Recent searches
- Trending searches
- Keyboard navigation (↑↓ Enter Esc)

**Implementation:**

```typescript
// features/search/components/SearchBar.tsx
export function SearchBar({ initialValue = '', showSuggestions = true }) {
  const form = useForm<{ q: string }>({ defaultValues: { q: initialValue } });
  const query = form.watch('q');
  const debouncedQuery = useDebounce(query, 300);
  const { data: suggestions } = useSearchSuggestions(debouncedQuery);
  const { setFilters } = useSearchURL();
  const router = useRouter();
  
  const onSubmit = form.handleSubmit((data) => {
    if (data.q.trim()) {
      setFilters({ q: data.q });
      router.push(`/search?q=${encodeURIComponent(data.q)}`);
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="relative">
        <Input {...form.register('q')} placeholder="Search topics..." />
        
        {showSuggestions && suggestions && suggestions.data?.suggestions?.length > 0 && (
          <Popover open>
            <PopoverContent>
              {suggestions.data.suggestions.map(s => (
                <button 
                  key={s}
                  onClick={() => {
                    form.setValue('q', s);
                    setFilters({ q: s });
                  }}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  {s}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </form>
    </Form>
  );
}
```

---

### Formula Search

**Route:** `/search/formulas`

**Features:**
- LaTeX-aware search
- Variable matching
- Source topic linking
- Copy LaTeX button

**Implementation:**

```typescript
// app/search/formulas/page.tsx
export default async function FormulaSearchPage({ searchParams }) {
  const { q, subject, grade } = await searchParams;
  const results = await searchApi.searchFormulas({ q, subject, grade });
  
  return (
    <SearchLayout>
      <h1 className="text-2xl font-bold mb-6">Formula Search</h1>
      
      <div className="space-y-4">
        {results.data?.results?.map(formula => (
          <FormulaCard key={formula._id} formula={formula} />
        ))}
      </div>
    </SearchLayout>
  );
}

// features/search/components/FormulaCard.tsx
export function FormulaCard({ formula }) {
  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{formula.name}</h3>
          <LatexRenderer latex={formula.latex} displayMode />
          <p className="text-sm text-gray-600 mt-2">
            Variables: {formula.variables.join(', ')}
          </p>
        </div>
        <CopyButton text={formula.latex} />
      </div>
      <Link 
        href={`/topics/slug/${formula.source_topic.slug_global}`}
        className="text-sm text-blue-600 mt-2 inline-block"
      >
        Source: {formula.source_topic.title}
      </Link>
    </div>
  );
}
```

---

### Suggestions System

**API:** `GET /api/search/suggest?prefix=&limit=`

**Features:**
- Prefix-based autocomplete
- Minimum 2 characters
- Cached results (5 min)
- Keyboard accessible

**Implementation:**

```typescript
// features/search/hooks/useSearchSuggestions.ts
export function useSearchSuggestions(prefix: string) {
  return useQuery({
    queryKey: queryKeys.search.suggestions(prefix),
    queryFn: () => searchApi.getSuggestions(prefix),
    enabled: prefix.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}
```

---

### Filter System

**Supported Filters:**
- Subject (multi-select)
- Grade (multi-select)
- Difficulty (single-select: easy/medium/hard)
- Topic Type (single-select)

**URL Synchronization:**

```typescript
// features/search/hooks/useSearchFilters.ts
export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const filters = {
    subject: searchParams.getAll('subject'),
    grade: searchParams.getAll('grade'),
    difficulty: searchParams.get('difficulty'),
    topicType: searchParams.get('topicType'),
  };
  
  const setFilter = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach(v => params.append(key, v));
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/search?${params.toString()}`, { scroll: false });
  };
  
  const clearFilters = () => {
    router.push('/search');
  };
  
  return { filters, setFilter, clearFilters };
}
```

**Filter Panel Component:**

```typescript
// features/search/components/FilterPanel.tsx
export function FilterPanel({ currentFilters }) {
  const { setFilter, clearFilters } = useSearchFilters();
  const { data: subjects } = useSubjects();
  const { data: grades } = useGrades();
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Subject</h3>
        <div className="space-y-2">
          {subjects?.data?.map(subject => (
            <Checkbox
              key={subject}
              checked={currentFilters.subject?.includes(subject)}
              onCheckedChange={(checked) => {
                const updated = checked
                  ? [...(currentFilters.subject || []), subject]
                  : currentFilters.subject?.filter(s => s !== subject);
                setFilter('subject', updated || []);
              }}
            >
              {subject}
            </Checkbox>
          ))}
        </div>
      </div>
      
      {/* Similar for Grade, Difficulty, TopicType */}
      
      <Button variant="outline" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
}
```

---

### Search Analytics

**Tracking:**
- Successful searches (query → result count)
- Failed searches (query → 0 results)
- Click-through rate per result
- Time to first click

**Implementation:**

```typescript
// features/search/hooks/useSearchTracking.ts
export function useSearchTracking() {
  const trackSearch = async (query: string, resultCount: number) => {
    // Fire-and-forget tracking
    fetch('/api/log-search', {
      method: 'POST',
      body: JSON.stringify({ query, resultCount, timestamp: Date.now() }),
    }).catch(() => {});
    
    if (resultCount === 0) {
      // Track as failed search
      fetch('/api/log-failed-search', {
        method: 'POST',
        body: JSON.stringify({ query, timestamp: Date.now() }),
      }).catch(() => {});
    }
  };
  
  const trackClick = async (query: string, topicId: string, position: number) => {
    fetch('/api/log-search-click', {
      method: 'POST',
      body: JSON.stringify({ query, topicId, position, timestamp: Date.now() }),
    }).catch(() => {});
  };
  
  return { trackSearch, trackClick };
}
```

---

### Failed Searches

**Admin View:** `/admin/analytics/search`

**Purpose:** Identify content gaps

**Display:**
- Query text
- Failure count
- Last searched date
- Suggested actions

**Implementation:**

```typescript
// features/admin/components/FailedSearchesList.tsx
export function FailedSearchesList() {
  const { data } = useFailedSearches();
  
  return (
    <DataTable
      columns={[
        { header: 'Query', accessorKey: 'query' },
        { header: 'Count', accessorKey: 'count' },
        { header: 'Last Searched', accessorKey: 'last_searched' },
        { 
          header: 'Action', 
          cell: ({ row }) => (
            <Button variant="outline" size="sm">
              Create Content
            </Button>
          )
        },
      ]}
      data={data?.data?.failed_queries || []}
    />
  );
}
```

---

### URL Synchronization

**Strategy:** All search state in URL for shareability

**Synced State:**
- Query (`q`)
- Subject filters (`subject[]`)
- Grade filters (`grade[]`)
- Difficulty (`difficulty`)
- Topic type (`topicType`)
- Page (`page`)
- Limit (`limit`)

**Not Synced:**
- Suggestions dropdown state
- Loading state
- Error state

**Implementation:**

```typescript
// features/search/hooks/useSearchURL.ts
export function useSearchURL() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const getState = () => ({
    q: searchParams.get('q') || '',
    subject: searchParams.getAll('subject'),
    grade: searchParams.getAll('grade'),
    difficulty: searchParams.get('difficulty') as Difficulty | null,
    topicType: searchParams.get('topicType'),
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
  });
  
  const setState = (newState: Partial<ReturnType<typeof getState>>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newState).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach(v => params.append(key, v));
      } else {
        params.set(key, String(value));
      }
    });
    
    router.push(`/search?${params.toString()}`, { scroll: false });
  };
  
  return { getState, setState };
}
```

---

## Related Documents

- [02-route-architecture.md](./02-route-architecture.md) — Route structure
- [06-state-architecture.md](./06-state-architecture.md) — State management
- [07-api-layer.md](./07-api-layer.md) — API clients
