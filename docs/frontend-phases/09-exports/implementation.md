# Phase 09: Exports - Implementation Guide

## Overview

This document provides complete implementation instructions for the export functionality. Users can download documents and topics in PDF, LaTeX, and Markdown formats with progress tracking and download management.

---

## Pages

### 1. Export Status Page

**Path:** `/exports/[jobId]`

**File:** `src/pages/exports/[jobId].tsx`

**Purpose:** Display export job status, progress, and provide download action

**Layout:** Use `DefaultLayout` from Phase 02

**Route Definition:**
```typescript
// src/routes/exports.tsx
import { RouteObject } from 'react-router-dom';
import ExportStatusPage from '../pages/exports/[jobId]';

export const exportsRoutes: RouteObject[] = [
  {
    path: 'exports/:jobId',
    element: <ExportStatusPage />,
  },
];
```

---

## Components

### 1. ExportTrigger

**File:** `src/components/export/ExportTrigger.tsx`

**Purpose:** Button or dropdown to initiate export from document/topic pages

**Props:**
```typescript
interface ExportTriggerProps {
  resourceId: string;
  resourceType: 'document' | 'topic';
  availableFormats: ExportFormat[];
  onExportStart?: (jobId: string) => void;
  disabled?: boolean;
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
}

type ExportFormat = 'pdf' | 'latex' | 'markdown';
```

**Implementation:**
```typescript
import React, { useState } from 'react';
import { Button, Dropdown, MenuItem, Icon } from '@sijil/ui';
import { ExportModal } from './ExportModal';
import { useExport } from '../../hooks/useExport';

export const ExportTrigger: React.FC<ExportTriggerProps> = ({
  resourceId,
  resourceType,
  availableFormats = ['pdf', 'latex', 'markdown'],
  onExportStart,
  disabled = false,
  variant = 'dropdown',
  size = 'md',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { triggerExport } = useExport();

  const handleExport = async (format: ExportFormat, options: ExportOptions) => {
    try {
      const jobId = await triggerExport({
        resourceId,
        resourceType,
        format,
        ...options,
      });
      
      onExportStart?.(jobId);
      setIsModalOpen(false);
      
      // Navigate to status page or open status modal
      window.location.href = `/exports/${jobId}`;
    } catch (error) {
      // Handle error (toast notification)
    }
  };

  if (variant === 'button') {
    return (
      <>
        <Button
          icon={<Icon name="download" />}
          onClick={() => setIsModalOpen(true)}
          disabled={disabled}
          size={size}
        >
          Export
        </Button>
        <ExportModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleExport}
          availableFormats={availableFormats}
        />
      </>
    );
  }

  return (
    <>
      <Dropdown trigger="click">
        <Dropdown.Toggle>
          <Icon name="download" /> Export
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {availableFormats.map((format) => (
            <MenuItem
              key={format}
              onClick={() => handleExport(format, {})}
              icon={<Icon name={`file-${format}`} />}
            >
              {format.toUpperCase()}
            </MenuItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleExport}
        availableFormats={availableFormats}
      />
    </>
  );
};
```

---

### 2. ExportModal

**File:** `src/components/export/ExportModal.tsx`

**Purpose:** Modal for selecting export format and options

**Props:**
```typescript
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (format: ExportFormat, options: ExportOptions) => Promise<void>;
  availableFormats: ExportFormat[];
}

interface ExportOptions {
  quality?: 'low' | 'medium' | 'high';
  includeReferences?: boolean;
  includeMetadata?: boolean;
  customFilename?: string;
}
```

**Implementation:**
```typescript
import React, { useState } from 'react';
import { Modal, Radio, Checkbox, Input, Button, Form } from '@sijil/ui';

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  availableFormats,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [includeReferences, setIncludeReferences] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const [customFilename, setCustomFilename] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(selectedFormat, {
        quality,
        includeReferences,
        includeMetadata,
        customFilename: customFilename || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Document">
      <Form onSubmit={handleSubmit}>
        {/* Format Selection */}
        <Form.Field label="Format">
          <Radio.Group
            value={selectedFormat}
            onChange={setSelectedFormat}
          >
            {availableFormats.map((format) => (
              <Radio key={format} value={format}>
                {format.toUpperCase()}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Field>

        {/* Quality (PDF only) */}
        {selectedFormat === 'pdf' && (
          <Form.Field label="Quality">
            <Radio.Group value={quality} onChange={setQuality}>
              <Radio value="low">Low (smaller file)</Radio>
              <Radio value="medium">Medium (balanced)</Radio>
              <Radio value="high">High (best quality)</Radio>
            </Radio.Group>
          </Form.Field>
        )}

        {/* Options */}
        <Form.Field>
          <Checkbox
            checked={includeReferences}
            onChange={setIncludeReferences}
          >
            Include references
          </Checkbox>
        </Form.Field>

        <Form.Field>
          <Checkbox
            checked={includeMetadata}
            onChange={setIncludeMetadata}
          >
            Include metadata
          </Checkbox>
        </Form.Field>

        {/* Custom Filename */}
        <Form.Field label="Filename (optional)">
          <Input
            value={customFilename}
            onChange={setCustomFilename}
            placeholder="Leave blank for auto-generated name"
          />
        </Form.Field>

        {/* Actions */}
        <Form.Actions>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Start Export
          </Button>
        </Form.Actions>
      </Form>
    </Modal>
  );
};
```

---

### 3. ExportStatusIndicator

**File:** `src/components/export/ExportStatusIndicator.tsx`

**Purpose:** Display export job progress and status

**Props:**
```typescript
interface ExportStatusIndicatorProps {
  jobId: string;
  onComplete?: (downloadUrl: string) => void;
  compact?: boolean;
}

type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

interface ExportJob {
  id: string;
  status: ExportStatus;
  format: ExportFormat;
  progress: number; // 0-100
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  error?: string;
}
```

**Implementation:**
```typescript
import React, { useEffect } from 'react';
import { Progress, Alert, Icon, Spinner } from '@sijil/ui';
import { useExportJob } from '../../hooks/useExportJob';
import { DownloadButton } from './DownloadButton';

export const ExportStatusIndicator: React.FC<ExportStatusIndicatorProps> = ({
  jobId,
  onComplete,
  compact = false,
}) => {
  const { job, isLoading, error, refresh } = useExportJob(jobId);

  useEffect(() => {
    // Poll every 2 seconds while processing
    if (job?.status === 'pending' || job?.status === 'processing') {
      const interval = setInterval(refresh, 2000);
      return () => clearInterval(interval);
    }

    // Notify on completion
    if (job?.status === 'completed' && job.downloadUrl) {
      onComplete?.(job.downloadUrl);
    }
  }, [job?.status, refresh, onComplete]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <span>Loading status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error">
        Failed to load export status: {error.message}
      </Alert>
    );
  }

  if (!job) {
    return <Alert variant="warning">Export job not found</Alert>;
  }

  const statusConfig = {
    pending: {
      icon: 'clock',
      label: 'Preparing...',
      color: 'gray',
    },
    processing: {
      icon: 'spinner',
      label: `Processing ${job.progress}%`,
      color: 'blue',
    },
    completed: {
      icon: 'check-circle',
      label: 'Ready to download',
      color: 'green',
    },
    failed: {
      icon: 'x-circle',
      label: job.error || 'Export failed',
      color: 'red',
    },
    cancelled: {
      icon: 'stop-circle',
      label: 'Export cancelled',
      color: 'gray',
    },
  };

  const config = statusConfig[job.status];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {job.status === 'processing' && <Spinner size="sm" />}
        <Icon name={config.icon} className={`text-${config.color}-500`} />
        <span className="text-sm">{config.label}</span>
        {job.status === 'completed' && (
          <DownloadButton downloadUrl={job.downloadUrl!} filename={`export.${job.format}`} />
        )}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <Icon name={config.icon} className={`text-${config.color}-500 text-xl`} />
        <span className="font-medium">{config.label}</span>
      </div>

      {(job.status === 'pending' || job.status === 'processing') && (
        <Progress value={job.progress} max={100} className="mb-2" />
      )}

      <div className="text-sm text-gray-600">
        <div>Format: {job.format.toUpperCase()}</div>
        <div>Started: {new Date(job.createdAt).toLocaleString()}</div>
        {job.status === 'completed' && job.completedAt && (
          <div>Completed: {new Date(job.completedAt).toLocaleString()}</div>
        )}
      </div>

      {job.status === 'completed' && job.downloadUrl && (
        <div className="mt-4">
          <DownloadButton
            downloadUrl={job.downloadUrl}
            filename={`export.${job.format}`}
            size="lg"
          />
        </div>
      )}

      {job.status === 'failed' && (
        <Button onClick={refresh} variant="secondary" className="mt-3">
          Try Again
        </Button>
      )}
    </div>
  );
};
```

---

### 4. DownloadButton

**File:** `src/components/export/DownloadButton.tsx`

**Purpose:** Button to trigger file download

**Props:**
```typescript
interface DownloadButtonProps {
  downloadUrl: string;
  filename: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}
```

**Implementation:**
```typescript
import React from 'react';
import { Button, Icon } from '@sijil/ui';
import { downloadFile } from '../../utils/fileUtils';

interface DownloadButtonProps {
  downloadUrl: string;
  filename: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadUrl,
  filename,
  size = 'md',
  variant = 'primary',
  icon,
}) => {
  const handleDownload = async () => {
    try {
      await downloadFile(downloadUrl, filename);
    } catch (error) {
      // Handle download error (show toast)
      console.error('Download failed:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      size={size}
      variant={variant}
      icon={icon || <Icon name="download" />}
    >
      Download {filename.split('.').pop()?.toUpperCase()}
    </Button>
  );
};
```

---

### 5. Loading States

**Purpose:** Show progress during export generation

**Implementation:**
- Use `ExportStatusIndicator` component for real-time status
- Display progress bar if backend provides percentage
- Show estimated time remaining if available

```typescript
// Example loading state in ExportModal
if (exportJob.status === 'processing') {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Generating Export</h3>
      <ProgressBar 
        value={exportJob.progress} 
        label={`Processing ${exportJob.progress}%`}
      />
      <p className="text-sm text-gray-500 mt-2">
        Estimated time: {exportJob.estimatedTimeRemaining}
      </p>
    </div>
  );
}
```

---

## Hooks

### 1. useExport

**File:** `src/hooks/useExport.ts`

**Purpose:** Trigger new export jobs

**Implementation:**
```typescript
import { useState, useCallback } from 'react';
import { apiClient } from '../lib/api';

interface ExportRequest {
  resourceId: string;
  resourceType: 'document' | 'topic';
  format: 'pdf' | 'latex' | 'markdown';
  quality?: 'low' | 'medium' | 'high';
  includeReferences?: boolean;
  includeMetadata?: boolean;
  customFilename?: string;
}

interface ExportResponse {
  jobId: string;
  status: string;
  estimatedTime?: number;
}

export const useExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const triggerExport = useCallback(async (request: ExportRequest): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<ExportResponse>('/exports', {
        resource_id: request.resourceId,
        resource_type: request.resourceType,
        format: request.format,
        options: {
          quality: request.quality,
          include_references: request.includeReferences,
          include_metadata: request.includeMetadata,
          custom_filename: request.customFilename,
        },
      });

      return response.jobId;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Export failed');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { triggerExport, isLoading, error };
};
```

---

### 2. useExportJob

**File:** `src/hooks/useExportJob.ts`

**Purpose:** Poll export job status

**Implementation:**
```typescript
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';

interface ExportJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  format: 'pdf' | 'latex' | 'markdown';
  progress: number;
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  error?: string;
  filename?: string;
}

export const useExportJob = (jobId: string) => {
  const [job, setJob] = useState<ExportJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJob = useCallback(async () => {
    try {
      const data = await apiClient.get<ExportJob>(`/exports/${jobId}`);
      setJob(data);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch job status');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return { job, isLoading, error, refresh: fetchJob };
};
```

---

## State Management

### Export Store (Zustand)

**File:** `src/stores/exportStore.ts`

**Purpose:** Global state for active exports

**Implementation:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExportJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  format: 'pdf' | 'latex' | 'markdown';
  progress: number;
  resourceId: string;
  resourceType: 'document' | 'topic';
  createdAt: number;
  downloadUrl?: string;
  error?: string;
}

interface ExportState {
  activeJobs: Map<string, ExportJob>;
  addJob: (job: ExportJob) => void;
  updateJob: (jobId: string, updates: Partial<ExportJob>) => void;
  removeJob: (jobId: string) => void;
  getJob: (jobId: string) => ExportJob | undefined;
  getActiveJobs: () => ExportJob[];
  clearCompleted: () => void;
}

export const useExportStore = create<ExportState>()(
  persist(
    (set, get) => ({
      activeJobs: new Map(),

      addJob: (job) =>
        set((state) => {
          const newJobs = new Map(state.activeJobs);
          newJobs.set(job.id, job);
          return { activeJobs: newJobs };
        }),

      updateJob: (jobId, updates) =>
        set((state) => {
          const newJobs = new Map(state.activeJobs);
          const existingJob = newJobs.get(jobId);
          if (existingJob) {
            newJobs.set(jobId, { ...existingJob, ...updates });
          }
          return { activeJobs: newJobs };
        }),

      removeJob: (jobId) =>
        set((state) => {
          const newJobs = new Map(state.activeJobs);
          newJobs.delete(jobId);
          return { activeJobs: newJobs };
        }),

      getJob: (jobId) => get().activeJobs.get(jobId),

      getActiveJobs: () => Array.from(get().activeJobs.values()),

      clearCompleted: () =>
        set((state) => {
          const newJobs = new Map(
            Array.from(state.activeJobs.entries()).filter(
              ([_, job]) => job.status !== 'completed' && job.status !== 'failed'
            )
          );
          return { activeJobs: newJobs };
        }),
    }),
    {
      name: 'sijil-export-store',
      partialize: (state) => ({
        activeJobs: Object.fromEntries(
          Array.from(state.activeJobs.entries()).filter(
            ([_, job]) => job.status === 'processing' || job.status === 'pending'
          )
        ),
      }),
    }
  )
);
```

---

## Types

**File:** `src/types/export.ts`

```typescript
export type ExportFormat = 'pdf' | 'latex' | 'markdown';

export type ExportStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ExportJob {
  id: string;
  status: ExportStatus;
  format: ExportFormat;
  progress: number;
  resourceId: string;
  resourceType: 'document' | 'topic';
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  error?: string;
  filename?: string;
  fileSize?: number;
}

export interface ExportOptions {
  quality?: 'low' | 'medium' | 'high';
  includeReferences?: boolean;
  includeMetadata?: boolean;
  customFilename?: string;
}

export interface ExportRequest {
  resourceId: string;
  resourceType: 'document' | 'topic';
  format: ExportFormat;
  options?: ExportOptions;
}

export interface ExportJobStatus {
  id: string;
  status: ExportStatus;
  progress?: number;
  downloadUrl?: string;
  filename?: string;
  error?: string;
  createdAt: string;
  completedAt?: string;
}
```

---

## Utilities

### File Download Utility

**File:** `src/utils/fileUtils.ts`

```typescript
/**
 * Download a file from URL with proper filename
 */
export async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate export filename
 */
export function generateExportFilename(
  documentTitle: string,
  format: string,
  timestamp?: Date
): string {
  const date = timestamp || new Date();
  const dateStr = date.toISOString().split('T')[0];
  const safeTitle = documentTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
  
  return `${safeTitle}-${dateStr}.${format}`;
}
```

---

## API Integration

### API Client Extension

**File:** `src/lib/api.ts` (extend existing)

```typescript
// Add to existing API client

export interface ExportEndpoints {
  // Create export job
  'POST /api/v1/exports': {
    request: {
      resource_id: string;
      resource_type: 'document' | 'topic';
      format: 'pdf' | 'latex' | 'markdown';
      options?: {
        quality?: 'low' | 'medium' | 'high';
        include_references?: boolean;
        include_metadata?: boolean;
        custom_filename?: string;
      };
    };
    response: {
      job_id: string;
      status: string;
      estimated_time?: number;
    };
  };

  // Get job status
  'GET /api/v1/exports/:jobId': {
    params: { jobId: string };
    response: {
      id: string;
      status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
      format: 'pdf' | 'latex' | 'markdown';
      progress: number;
      created_at: string;
      completed_at?: string;
      download_url?: string;
      error?: string;
      filename?: string;
      file_size?: number;
    };
  };

  // Download file
  'GET /api/v1/exports/:jobId/download': {
    params: { jobId: string };
    response: Blob;
  };

  // Cancel job
  'DELETE /api/v1/exports/:jobId': {
    params: { jobId: string };
    response: { success: boolean };
  };

  // Get export history
  'GET /api/v1/users/:userId/exports': {
    params: { userId: string; limit?: number; offset?: number };
    response: Array<{
      id: string;
      document_title: string;
      document_id: string;
      format: 'pdf' | 'latex' | 'markdown';
      status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
      created_at: string;
      completed_at?: string;
      download_url?: string;
      filename: string;
      file_size?: number;
    }>;
  };
}
```

---

## Folder Structure

```
src/
├── components/
│   └── export/
│       ├── ExportTrigger.tsx
│       ├── ExportModal.tsx
│       ├── ExportStatusIndicator.tsx
│       └── DownloadButton.tsx
├── hooks/
│   ├── useExport.ts
│   └── useExportJob.ts
├── stores/
│   └── exportStore.ts
├── types/
│   └── export.ts
├── utils/
│   └── fileUtils.ts
├── pages/
│   └── exports/
│       └── [jobId].tsx
└── routes/
    └── exports.tsx
```

---

## SEO

No specific SEO requirements for export pages (authenticated, functional pages).

Ensure export status page has:
- Proper meta robots tag: `<meta name="robots" content="noindex, nofollow" />`
- Authentication check before rendering

---

## Loading States

1. **ExportTrigger**: Show disabled state while checking permissions
2. **ExportModal**: Show spinner during submission
3. **ExportStatusIndicator**: 
   - Initial load: "Loading status..."
   - Polling: Show progress bar
   - Completion: Show download button
4. **DownloadButton**: Show spinner during download initiation

---

## Error Handling

1. **Export Creation Failed**
   - Show toast notification
   - Provide retry option
   - Log error for debugging

2. **Polling Failed**
   - Show error message in status indicator
   - Auto-retry with exponential backoff
   - Manual refresh button

3. **Download Failed**
   - Show error toast
   - Provide alternative download link
   - Suggest trying different browser

4. **Job Failed**
   - Display error message from server
   - Offer retry option
   - Link to support if persistent

---

## Accessibility

1. **Keyboard Navigation**
   - All buttons focusable with Tab
   - Modal traps focus properly
   - Escape key closes modal

2. **Screen Readers**
   - ARIA labels on all interactive elements
   - Status changes announced via live regions
   - Progress updates announced periodically

3. **Visual Indicators**
   - Color + icon for status (not color alone)
   - High contrast for progress bars
   - Clear focus indicators

4. **ARIA Implementation**
```typescript
// Example for status indicator
<div
  role="status"
  aria-live="polite"
  aria-label={`Export ${job.status}, ${job.progress}% complete`}
>
  {/* content */}
</div>
```

---

## Responsive Behavior

1. **Mobile (< 640px)**
   - Full-width modal
   - Stacked form fields
   - Large touch targets (min 44px)

2. **Tablet (640px - 1024px)**
   - Centered modal (max-width: 90%)
   - Two-column layout where appropriate

3. **Desktop (> 1024px)**
   - Fixed-width modal (max-width: 500px)
   - Inline form fields where possible

---

## Backend Integration

### Required Endpoints

All endpoints must be implemented by backend team:

1. **POST /api/v1/exports**
   - Request: `{ resource_id, resource_type, format, options }`
   - Response: `{ job_id, status, estimated_time }`
   - Auth: Required
   - Rate Limit: 5 requests per minute

2. **GET /api/v1/exports/:jobId**
   - Response: Job status object
   - Auth: Required (owner check)
   - Caching: No cache

3. **GET /api/v1/exports/:jobId/download**
   - Response: File stream
   - Auth: Required (owner check)
   - Headers: `Content-Disposition: attachment`

4. **DELETE /api/v1/exports/:jobId**
   - Response: `{ success: true }`
   - Auth: Required (owner check)

5. **GET /api/v1/users/:userId/exports**
   - Query: `limit`, `offset`
   - Response: Array of export history items
   - Auth: Required (self or admin)

---

## Acceptance Checklist

- [ ] ExportTrigger component renders correctly
- [ ] ExportModal opens and closes properly
- [ ] Format selection works
- [ ] Export job creation succeeds
- [ ] Status polling updates in real-time
- [ ] Progress bar reflects actual progress
- [ ] Download button appears on completion
- [ ] File downloads successfully
- [ ] Error states display correctly
- [ ] Retry mechanism works
- [ ] Keyboard navigation functional
- [ ] Screen reader announcements work
- [ ] Mobile responsive design verified
- [ ] Export history displays correctly (if implemented)
- [ ] All TypeScript types are correct
- [ ] No console errors or warnings

