# Phase 12: Performance & Optimization - Implementation Guide

## Overview

This document provides complete implementation instructions for optimizing the Sijil application's performance. Follow these steps to achieve Core Web Vitals excellence, reduce bundle sizes, implement caching strategies, and ensure smooth user interactions.

## Pages

### 1. Performance Dashboard (`/admin/performance`)

**File:** `apps/web/app/admin/performance/page.tsx`

```typescript
'use client';

import { usePerformanceMetrics } from '@/hooks/performance/usePerformanceMetrics';
import { CoreWebVitalsCard } from '@/components/performance/CoreWebVitalsCard';
import { BundleSizeChart } from '@/components/performance/BundleSizeChart';
import { CacheStatusPanel } from '@/components/performance/CacheStatusPanel';
import { PerformanceTimeline } from '@/components/performance/PerformanceTimeline';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function PerformanceDashboard() {
  const { metrics, loading, error } = usePerformanceMetrics();

  if (loading) {
    return <AdminLayout><div>Loading performance data...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout><div>Error loading performance data</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Performance Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CoreWebVitalsCard metrics={metrics} />
        <BundleSizeChart />
        <CacheStatusPanel />
        <PerformanceTimeline />
      </div>
    </AdminLayout>
  );
}
```

## Layouts

### Optimized Root Layout

**File:** `apps/web/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Optimize font loading with display swap and preload
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sijil.com'),
  // Additional meta tags in Phase 11
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.sijil.com" />
        <link rel="dns-prefetch" href="https://analytics.sijil.com" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## Components

### 1. LazyImage Component

**File:** `apps/web/components/performance/LazyImage.tsx`

```typescript
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
  sizes?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      aria-busy={!isLoaded}
    >
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error('Image failed to load:', src);
            e.currentTarget.src = '/images/placeholder.png';
          }}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div
          className="animate-pulse bg-gray-200"
          style={{ width, height }}
          aria-label={`Loading image: ${alt}`}
        />
      )}
    </div>
  );
}
```

### 2. VirtualizedList Component

**File:** `apps/web/components/performance/VirtualizedList.tsx`

```typescript
'use client';

import React, { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = '',
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      role="list"
      aria-busy={virtualItems.length === 0}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            role="listitem"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. SkeletonLoader Component

**File:** `apps/web/components/performance/SkeletonLoader.tsx`

```typescript
import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
  className?: string;
  sx?: React.CSSProperties;
}

export function SkeletonLoader({
  variant = 'text',
  width = '100%',
  height = '1.2em',
  animation = 'pulse',
  className = '',
  sx = {},
}: SkeletonLoaderProps) {
  const baseStyles: React.CSSProperties = {
    backgroundColor: '#e0e0e0',
    backgroundImage: 'linear-gradient(90deg, #e0e0e0, #f5f5f5, #e0e0e0)',
    backgroundSize: '200% 100%',
    borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? '8px' : '4px',
    width,
    height,
    ...(animation === 'pulse' || animation === 'wave'
      ? { animation: 'skeleton-loading 1.5s infinite' }
      : {}),
    ...sx,
  };

  return (
    <div
      className={`skeleton-loader ${className}`}
      style={baseStyles}
      aria-label="Loading content"
      role="status"
    />
  );
}
```

### 4. ServiceWorkerManager Component

**File:** `apps/web/components/performance/ServiceWorkerManager.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export function ServiceWorkerManager() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    async function registerSW() {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        setRegistration(reg);

        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              }
            };
          }
        };
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }

    registerSW();
  }, []);

  const handleUpdate = async () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50"
      role="alert"
      aria-live="polite"
    >
      <p className="font-medium">New version available!</p>
      <button
        onClick={handleUpdate}
        className="mt-2 bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
        aria-label="Update to latest version"
      >
        Update Now
      </button>
    </div>
  );
}
```

### 5. PerformanceMonitor Component

**File:** `apps/web/components/performance/PerformanceMonitor.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { onLCP, onFID, onCLS, onINP } from 'web-vitals';
import { usePerformanceStore } from '@/stores/performanceStore';

interface MetricDisplay {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<MetricDisplay[]>([]);
  const addMetric = usePerformanceStore((state) => state.addMetric);

  useEffect(() => {
    const reportMetric = (metric: any) => {
      let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
      
      if (metric.name === 'LCP') {
        if (metric.value > 2500) rating = metric.value > 4000 ? 'poor' : 'needs-improvement';
      } else if (metric.name === 'FID' || metric.name === 'INP') {
        if (metric.value > 100) rating = metric.value > 300 ? 'poor' : 'needs-improvement';
      } else if (metric.name === 'CLS') {
        if (metric.value > 0.1) rating = metric.value > 0.25 ? 'poor' : 'needs-improvement';
      }

      const display: MetricDisplay = {
        name: metric.name,
        value: metric.value,
        rating,
      };

      setMetrics((prev) => [...prev.filter((m) => m.name !== metric.name), display]);
      addMetric(metric);
    };

    onLCP(reportMetric);
    onFID(reportMetric);
    onCLS(reportMetric);
    onINP(reportMetric);
  }, [addMetric]);

  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 z-40 max-w-xs">
      <h3 className="font-bold text-sm mb-2">Performance Metrics</h3>
      <div className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex justify-between items-center text-xs">
            <span className="font-medium">{metric.name}</span>
            <span
              className={`px-2 py-1 rounded ${
                metric.rating === 'good'
                  ? 'bg-green-100 text-green-800'
                  : metric.rating === 'needs-improvement'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {metric.name === 'CLS' ? metric.value.toFixed(3) : `${Math.round(metric.value)}ms`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 6. PrefetchLink Component

**File:** `apps/web/components/performance/PrefetchLink.tsx`

```typescript
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetchOnHover?: boolean;
  priority?: 'low' | 'high';
}

export function PrefetchLink({
  href,
  children,
  className = '',
  prefetchOnHover = true,
  priority = 'low',
}: PrefetchLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!prefetchOnHover || !linkRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && priority === 'high') {
          router.prefetch(href);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(linkRef.current);

    return () => observer.disconnect();
  }, [href, prefetchOnHover, priority, router]);

  const handleMouseEnter = () => {
    if (prefetchOnHover) {
      router.prefetch(href);
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      prefetch={false}
    >
      {children}
    </Link>
  );
}
```

## Hooks

### 1. useIdleCallback Hook

**File:** `apps/web/hooks/performance/useIdleCallback.ts`

```typescript
import { useEffect, useRef, useCallback } from 'react';

interface IdleCallbackOptions {
  timeout?: number;
  priority?: 'user-visible' | 'background';
}

export function useIdleCallback(
  callback: (deadline: IdleDeadline) => void,
  options: IdleCallbackOptions = {}
) {
  const requestRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const scheduleIdleTask = useCallback(() => {
    if (requestRef.current) return;

    const idleCallback = (deadline: IdleDeadline) => {
      while (deadline.timeRemaining() > 0 && requestRef.current !== null) {
        callbackRef.current(deadline);
      }
      requestRef.current = null;
      
      if (!deadline.didTimeout && deadline.timeRemaining() <= 0) {
        scheduleIdleTask();
      }
    };

    if ('requestIdleCallback' in window) {
      requestRef.current = window.requestIdleCallback(idleCallback, {
        timeout: options.timeout ?? 2000,
      });
    } else {
      requestRef.current = window.setTimeout(() => {
        const mockDeadline: IdleDeadline = {
          didTimeout: false,
          timeRemaining: () => 50,
        };
        callbackRef.current(mockDeadline);
        requestRef.current = null;
      }, options.priority === 'user-visible' ? 0 : 1000);
    }
  }, [options.priority, options.timeout]);

  const cancelIdleCallback = useCallback(() => {
    if (requestRef.current !== null) {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(requestRef.current);
      } else {
        window.clearTimeout(requestRef.current);
      }
      requestRef.current = null;
    }
  }, []);

  useEffect(() => {
    scheduleIdleTask();
    return () => cancelIdleCallback();
  }, [scheduleIdleTask, cancelIdleCallback]);

  return { schedule: scheduleIdleTask, cancel: cancelIdleCallback };
}
```

### 2. useOptimizedResize Hook

**File:** `apps/web/hooks/performance/useOptimizedResize.ts`

```typescript
import { useEffect, useState, useCallback } from 'react';

interface UseOptimizedResizeOptions {
  delay?: number;
  immediate?: boolean;
}

export function useOptimizedResize(
  callback: (size: { width: number; height: number }) => void,
  options: UseOptimizedResizeOptions = {}
) {
  const { delay = 150, immediate = true } = options;
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (immediate) {
      callback(size);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        setSize(newSize);
        callback(newSize);
      }, delay);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [callback, delay, immediate]);

  return size;
}
```

### 3. useVisibilityChange Hook

**File:** `apps/web/hooks/performance/useVisibilityChange.ts`

```typescript
import { useEffect, useState, useCallback } from 'react';

export function useVisibilityChange() {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

export function usePauseOnHidden(callback: () => void, resumeCallback?: () => void) {
  const isVisible = useVisibilityChange();

  useEffect(() => {
    if (!isVisible) {
      callback();
    } else if (resumeCallback) {
      resumeCallback();
    }
  }, [isVisible, callback, resumeCallback]);

  return isVisible;
}
```

### 4. useResourceTiming Hook

**File:** `apps/web/hooks/performance/useResourceTiming.ts`

```typescript
import { useEffect, useState } from 'react';

interface ResourceTimingEntry {
  name: string;
  initiatorType: string;
  duration: number;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
  startTime: number;
  responseEnd: number;
}

export function useResourceTiming(filter?: (entry: PerformanceResourceTiming) => boolean) {
  const [resources, setResources] = useState<ResourceTimingEntry[]>([]);

  useEffect(() => {
    if (typeof performance === 'undefined') return;

    const getEntries = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const filtered = filter ? entries.filter(filter) : entries;
      
      return filtered.map((entry) => ({
        name: entry.name,
        initiatorType: entry.initiatorType,
        duration: entry.duration,
        transferSize: entry.transferSize,
        encodedBodySize: entry.encodedBodySize,
        decodedBodySize: entry.decodedBodySize,
        startTime: entry.startTime,
        responseEnd: entry.responseEnd,
      }));
    };

    setResources(getEntries());

    const observer = new PerformanceObserver((list) => {
      const newEntries = list.getEntries() as PerformanceResourceTiming[];
      const filtered = filter ? newEntries.filter(filter) : newEntries;
      
      setResources((prev) => [
        ...prev,
        ...filtered.map((entry) => ({
          name: entry.name,
          initiatorType: entry.initiatorType,
          duration: entry.duration,
          transferSize: entry.transferSize,
          encodedBodySize: entry.encodedBodySize,
          decodedBodySize: entry.decodedBodySize,
          startTime: entry.startTime,
          responseEnd: entry.responseEnd,
        })),
      ]);
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('PerformanceObserver not supported');
    }

    return () => observer.disconnect();
  }, [filter]);

  return resources;
}
```

### 5. useNetworkStatus Hook

**File:** `apps/web/hooks/performance/useNetworkStatus.ts`

```typescript
import { useEffect, useState } from 'react';

type NetworkConnection = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

type NetworkStatus = {
  online: boolean;
  connection?: NetworkConnection;
  isSlow: boolean;
  isOffline: boolean;
};

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    connection: undefined,
    isSlow: false,
    isOffline: false,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const updateStatus = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      const networkStatus: NetworkStatus = {
        online: navigator.onLine,
        connection: connection
          ? {
              effectiveType: connection.effectiveType,
              downlink: connection.downlink,
              rtt: connection.rtt,
              saveData: connection.saveData,
            }
          : undefined,
        isSlow: connection ? connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' : false,
        isOffline: !navigator.onLine,
      };

      setStatus(networkStatus);
    };

    updateStatus();

    const handleOnline = () => setStatus((prev) => ({ ...prev, online: true, isOffline: false }));
    const handleOffline = () => setStatus((prev) => ({ ...prev, online: false, isOffline: true }));

    window.addEventListener('online', handleOnline, { passive: true });
    window.addEventListener('offline', handleOffline, { passive: true });

    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateStatus, { passive: true });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateStatus);
      }
    };
  }, []);

  return status;
}
```

## State Management

### Performance Store

**File:** `apps/web/stores/performanceStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  navigationType?: string;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
}

interface PerformanceState {
  metrics: PerformanceMetric[];
  cacheStats: CacheStats;
  bundleInfo: {
    totalSize: number;
    chunks: Array<{ name: string; size: number }>;
  };
  addMetric: (metric: any) => void;
  updateCacheStats: (stats: Partial<CacheStats>) => void;
  setBundleInfo: (info: PerformanceState['bundleInfo']) => void;
  getAverageMetric: (name: string) => number | null;
  clearMetrics: () => void;
}

const initialState = {
  metrics: [],
  cacheStats: { hits: 0, misses: 0, hitRate: 0 },
  bundleInfo: { totalSize: 0, chunks: [] },
};

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addMetric: (metricData: any) => {
        let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
        
        if (metricData.name === 'LCP') {
          if (metricData.value > 2500) rating = metricData.value > 4000 ? 'poor' : 'needs-improvement';
        } else if (metricData.name === 'FID' || metricData.name === 'INP') {
          if (metricData.value > 100) rating = metricData.value > 300 ? 'poor' : 'needs-improvement';
        } else if (metricData.name === 'CLS') {
          if (metricData.value > 0.1) rating = metricData.value > 0.25 ? 'poor' : 'needs-improvement';
        }

        const metric: PerformanceMetric = {
          name: metricData.name,
          value: metricData.value,
          rating,
          timestamp: Date.now(),
          navigationType: metricData.navigationType,
        };

        set((state) => ({
          metrics: [...state.metrics.filter((m) => m.name !== metric.name), metric],
        }));
      },

      updateCacheStats: (stats: Partial<CacheStats>) => {
        set((state) => {
          const newStats = { ...state.cacheStats, ...stats };
          const total = newStats.hits + newStats.misses;
          newStats.hitRate = total > 0 ? newStats.hits / total : 0;
          return { cacheStats: newStats };
        });
      },

      setBundleInfo: (info) => set({ bundleInfo: info }),

      getAverageMetric: (name: string) => {
        const relevantMetrics = get().metrics.filter((m) => m.name === name);
        if (relevantMetrics.length === 0) return null;
        const sum = relevantMetrics.reduce((acc, m) => acc + m.value, 0);
        return sum / relevantMetrics.length;
      },

      clearMetrics: () => set({ metrics: [] }),
    }),
    {
      name: 'performance-storage',
      partialize: (state) => ({ metrics: state.metrics, cacheStats: state.cacheStats }),
    }
  )
);
```

## APIs

### 1. POST /api/performance/metrics

**File:** `apps/web/app/api/performance/metrics/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metrics, userAgent, url } = body;

    if (!Array.isArray(metrics) || metrics.length === 0) {
      return NextResponse.json(
        { error: 'Invalid metrics array' },
        { status: 400 }
      );
    }

    console.log('Received performance metrics:', {
      metrics,
      userAgent,
      url,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing performance metrics:', error);
    return NextResponse.json(
      { error: 'Failed to process metrics' },
      { status: 500 }
    );
  }
}
```

### 2. GET /api/performance/bundle-info

**File:** `apps/web/app/api/performance/bundle-info/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cacheStats = {
      hits: 1250,
      misses: 180,
      hitRate: 0.874,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(cacheStats);
  } catch (error) {
    console.error('Error getting cache status:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}
```

### 3. GET /api/performance/cache-status

**File:** `apps/web/app/api/performance/cache-status/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cacheStats = {
      hits: 1250,
      misses: 180,
      hitRate: 0.874,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(cacheStats);
  } catch (error) {
    console.error('Error getting cache status:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}
```

## TypeScript Types

**File:** `apps/web/types/performance.ts`

```typescript
export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  inp?: number;
  tti?: number;
  fcp?: number;
  ttfb?: number;
}

export interface CoreWebVitals {
  lcp: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    percentile: number;
  };
  fid: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    percentile: number;
  };
  cls: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    percentile: number;
  };
  inp: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    percentile: number;
  };
}

export enum CacheStrategy {
  CACHE_FIRST = 'cache-first',
  NETWORK_FIRST = 'network-first',
  STALE_WHILE_REVALIDATE = 'stale-while-revalidate',
  CACHE_ONLY = 'cache-only',
  NETWORK_ONLY = 'network-only',
}

export interface ResourceHint {
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch' | 'modulepreload';
  href: string;
  as?: string;
  crossorigin?: boolean;
}

export interface BundleInfo {
  totalSize: number;
  chunks: Array<{
    name: string;
    size: number;
    gzipSize?: number;
    brotliSize?: number;
  }>;
  largestChunks: Array<{
    name: string;
    size: number;
  }>;
  duplicateModules?: Array<{
    module: string;
    occurrences: number;
  }>;
}

export interface PerformanceBudget {
  resourceType: 'script' | 'style' | 'image' | 'font' | 'total';
  limit: number;
  unit: 'kb' | 'ms';
}

export interface OptimizationConfig {
  lazyLoadImages: boolean;
  lazyLoadComponents: boolean;
  enableVirtualization: boolean;
  codeSplitting: boolean;
  treeShaking: boolean;
  minification: boolean;
  compression: 'gzip' | 'brotli' | 'both';
  cacheStrategy: CacheStrategy;
  budgets: PerformanceBudget[];
}
```

## Folder Structure

```
apps/web/
├── app/
│   ├── admin/
│   │   └── performance/
│   │       └── page.tsx
│   └── api/
│       └── performance/
│           ├── metrics/
│           │   └── route.ts
│           ├── bundle-info/
│           │   └── route.ts
│           └── cache-status/
│               └── route.ts
├── components/performance/
│   ├── LazyImage.tsx
│   ├── VirtualizedList.tsx
│   ├── SkeletonLoader.tsx
│   ├── BundleAnalyzer.tsx
│   ├── ServiceWorkerManager.tsx
│   ├── PerformanceMonitor.tsx
│   ├── IntersectionObserverWrapper.tsx
│   ├── MemoizedContent.tsx
│   ├── DebouncedSearch.tsx
│   └── PrefetchLink.tsx
├── hooks/performance/
│   ├── useIdleCallback.ts
│   ├── useOptimizedResize.ts
│   ├── useVisibilityChange.ts
│   ├── useResourceTiming.ts
│   └── useNetworkStatus.ts
├── stores/
│   └── performanceStore.ts
├── utils/performance/
│   ├── metrics.ts
│   ├── caching.ts
│   ├── imageOptimization.ts
│   ├── bundleAnalysis.ts
│   └── networkDetection.ts
└── types/
    └── performance.ts

public/
├── sw.js
├── manifest.json
└── icons/
```

## Configuration Files

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@tanstack/react-virtual', 'web-vitals'],
    webpackBuildWorker: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  async headers() {
    return [
      {
        source: '/static/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

### .lighthouserc.js

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready started on',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/topics',
        'http://localhost:3000/search',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

## Service Worker

**File:** `public/sw.js`

```javascript
const CACHE_NAME = 'sijil-v1';
const STATIC_ASSETS = ['/', '/offline', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/offline');
        }
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

## Acceptance Checklist

- [ ] All Core Web Vitals targets met on production
- [ ] Bundle size reduced by at least 40% from baseline
- [ ] All images use modern formats with fallbacks
- [ ] Code splitting implemented for all routes
- [ ] Service worker caching functional
- [ ] Performance monitoring dashboard operational
- [ ] Lighthouse score ≥ 90 on all categories
- [ ] 60fps maintained during all interactions
- [ ] TTI < 3.5s on 3G simulation
- [ ] Zero layout shift on page load
- [ ] All hooks tested and documented
- [ ] All components accessible (WCAG 2.1 AA)
- [ ] Responsive behavior verified on mobile, tablet, desktop
- [ ] Error handling implemented for all optimization features
- [ ] Backend integration complete for all API endpoints
- [ ] TypeScript types defined for all performance entities
- [ ] Configuration files properly set up
- [ ] Service worker registered and functioning
- [ ] Performance budgets enforced
