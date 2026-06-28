# Sijil — Frontend Blueprint: Admin Architecture

**Version:** 1.0  
**Generated:** 2026-06-27

---

## Overview

This document defines the admin subsystem architecture including dashboard, ingestion, batch imports, analytics, versions, health monitoring, search monitoring, and job tracking.

---

## Admin Dashboard

**Route:** `/admin`

**Purpose:** Central overview of system status and recent activity

**Components:**
- System health indicator
- Platform statistics cards
- Recent ingestion jobs
- Recent import batches
- Quick actions

**Implementation:**

```typescript
// app/admin/page.tsx
export default async function AdminDashboard() {
  const [stats, recentIngects, recentImports] = await Promise.all([
    analyticsApi.getPlatformStats(),
    // Fetch recent ingests
    // Fetch recent imports
  ]);
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <HealthIndicator />
        
        <div className="grid grid-cols-4 gap-4">
          <StatCard 
            label="Total Documents" 
            value={stats.data?.total_documents || 0}
          />
          <StatCard 
            label="Total Topics" 
            value={stats.data?.total_topics || 0}
          />
          <StatCard 
            label="Total Formulas" 
            value={stats.data?.total_formulas || 0}
          />
          <StatCard 
            label="Total Assessments" 
            value={stats.data?.total_assessments || 0}
          />
        </div>
        
        <RecentJobsTable type="ingest" />
        <RecentJobsTable type="import" />
      </div>
    </AdminLayout>
  );
}
```

---

## JSON Ingestion

**Route:** `/admin/ingest`

**Purpose:** Submit individual JSON documents for processing

**Workflow:**
1. User pastes JSON into editor
2. Client-side validation with Zod schema
3. Submit to `/api/ingest/json`
4. Receive tracking ID
5. Redirect to status page

**Components:**

```typescript
// features/admin/components/IngestionForm.tsx
export function IngestionForm() {
  const form = useForm<IngestPayload>({
    resolver: zodResolver(ingestSchema),
    defaultValues: {
      schema_version: '2.0.0',
      schema_type: 'textbook',
    },
  });
  
  const submitMutation = useSubmitIngest();
  
  const onSubmit = form.handleSubmit(async (data) => {
    const result = await submitMutation.mutateAsync(data);
    if (result.success) {
      router.push(`/admin/ingest/${result.data.tracking_id}`);
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <JsonEditor
          value={form.watch('document_metadata')}
          onChange={(value) => form.setValue('document_metadata', value)}
          error={form.formState.errors.document_metadata}
        />
        
        <div className="flex gap-4">
          <Button type="submit" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

---

## Ingestion Status Tracking

**Route:** `/admin/ingest/[trackingId]`

**Purpose:** Monitor ingestion job progress

**Features:**
- Real-time status polling
- Cancel running job
- Retry failed job
- View error details

**Status States:**
- `pending` — Queued
- `processing` — Being processed
- `complete` — Successfully ingested
- `error` — Failed with errors

**Implementation:**

```typescript
// features/admin/components/JobStatusTracker.tsx
export function JobStatusTracker({ trackingId }) {
  const { data, isLoading } = useIngestStatus(trackingId);
  const cancelMutation = useCancelJob();
  const retryMutation = useRetryJob();
  
  if (isLoading) return <Spinner />;
  
  const status = data?.data?.status;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Badge variant={getStatusVariant(status)}>{status}</Badge>
        <div className="flex gap-2">
          {status === 'pending' && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => cancelMutation.mutate(trackingId)}
            >
              Cancel
            </Button>
          )}
          {status === 'error' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => retryMutation.mutate(trackingId)}
            >
              Retry
            </Button>
          )}
        </div>
      </div>
      
      <ProgressBar 
        value={getProgressValue(status)}
        max={100}
      />
      
      {data?.data?.errors && (
        <Alert variant="destructive">
          <AlertTitle>Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {data.data.errors.map((e, i) => (
                <li key={i}>{e.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
```

---

## Batch Import from GitHub

**Route:** `/admin/import`

**Purpose:** Import multiple documents from GitHub repository

**4-Stage Process:**
1. **Scanning** — Discover files in repo
2. **Validating** — Validate each file against schema
3. **Importing** — Insert into MongoDB
4. **Indexing** — Create Atlas search indexes

**Implementation:**

```typescript
// features/admin/components/BatchImportForm.tsx
export function BatchImportForm() {
  const form = useForm<{ repoUrl: string }>({
    defaultValues: { repoUrl: '' },
  });
  
  const previewMutation = usePreviewImport();
  
  const onPreview = form.handleSubmit(async (data) => {
    const result = await previewMutation.mutateAsync(data.repoUrl);
    if (result.success) {
      router.push(`/admin/import/${result.data.batch_id}`);
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={onPreview} className="space-y-4">
        <Input 
          {...form.register('repoUrl')}
          placeholder="https://github.com/username/repo"
        />
        <Button type="submit" disabled={previewMutation.isPending}>
          Preview Import
        </Button>
      </form>
    </Form>
  );
}
```

---

## Import Progress Dashboard

**Route:** `/admin/import/[batchId]`

**Purpose:** Track multi-stage import progress

**Multi-Stage Progress Component:**

```typescript
// features/admin/components/MultiStageProgress.tsx
export function MultiStageProgress({ progress }) {
  const stages = [
    { name: 'Scanning', value: progress.scanning },
    { name: 'Validating', value: progress.validating },
    { name: 'Importing', value: progress.importing },
    { name: 'Indexing', value: progress.indexing },
  ];
  
  return (
    <div className="space-y-4">
      {stages.map(stage => (
        <div key={stage.name}>
          <div className="flex justify-between text-sm mb-1">
            <span>{stage.name}</span>
            <span>{stage.value}%</span>
          </div>
          <Progress value={stage.value} />
        </div>
      ))}
    </div>
  );
}
```

**Error Log Display:**

```typescript
// features/admin/components/ImportErrorLog.tsx
export function ImportErrorLog({ failedFiles }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File</TableHead>
          <TableHead>Error</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {failedFiles.map(file => (
          <TableRow key={file.file}>
            <TableCell>{file.file}</TableCell>
            <TableCell>{file.error}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Retry</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

## Analytics Dashboard

**Route:** `/admin/analytics`

**Purpose:** View platform usage statistics

**Widgets:**
- Search volume over time
- Popular topics table
- Failed searches list
- Topic view counts

**Date Range Picker:**

```typescript
// features/shared/components/DateRangePicker.tsx
export function DateRangePicker({ onRangeChange }) {
  const [range, setRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {format(range.start, 'PPP')} - {format(range.end, 'PPP')}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="range"
          selected={range}
          onSelect={(newRange) => {
            setRange(newRange);
            onRangeChange(newRange);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
```

---

## Health Monitoring

**Component:** `HealthIndicator`

**Purpose:** Display system health status

**Checks:**
- MongoDB connection
- Redis connection
- API response time
- Queue status

**Implementation:**

```typescript
// features/admin/components/HealthIndicator.tsx
export function HealthIndicator() {
  const { data } = useQuery({
    queryKey: ['health'],
    queryFn: () => fetch('/api/health').then(r => r.json()),
    refetchInterval: 30000, // 30 seconds
  });
  
  const isHealthy = data?.mongo === 'connected' && data?.redis === 'connected';
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
      <span>{isHealthy ? 'All Systems Operational' : 'System Degraded'}</span>
    </div>
  );
}
```

---

## Search Monitoring

**Route:** `/admin/analytics/search`

**Purpose:** Monitor search performance and identify gaps

**Metrics:**
- Total searches today
- Unique queries
- Average result count
- Failed search rate

**Failed Queries Table:**

```typescript
// See 09-search-architecture.md for FailedSearchesList implementation
```

---

## Job Tracking

**Shared Hook:** `useJobPolling`

**Purpose:** Poll job status across all job types

```typescript
// features/admin/hooks/useJobPolling.ts
export function useJobPolling(jobId: string, type: 'ingest' | 'import') {
  const queryKey = type === 'ingest' 
    ? queryKeys.admin.ingestStatus(jobId)
    : queryKeys.admin.importStatus(jobId);
  
  return useQuery({
    queryKey,
    queryFn: () => type === 'ingest' 
      ? adminApi.getIngestStatus(jobId, adminId)
      : adminApi.getImportStatus(jobId, adminId),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      if (['complete', 'error'].includes(status)) {
        return false;
      }
      return 2000;
    },
  });
}
```

---

## Related Documents

- [02-route-architecture.md](./02-route-architecture.md) — Route structure
- [07-api-layer.md](./07-api-layer.md) — API clients
- [10-admin-architecture.md](./10-admin-architecture.md) — This document
