'use client';

import useSWRInfinite from 'swr/infinite';
import type { FilterState } from '@/types/filters';
import type { StudySearchResponse } from '@/types/study';
import { useMemo } from 'react';

function buildSearchUrl(filters: FilterState, pageToken?: string): string {
  const params = new URLSearchParams();

  if (filters.searchTerm) params.set('q', filters.searchTerm);
  if (filters.condition) params.set('cond', filters.condition);
  if (filters.statuses.length > 0) params.set('status', filters.statuses.join(','));
  if (filters.phases.length > 0) params.set('phase', filters.phases.join(','));
  if (filters.sponsor) params.set('spons', filters.sponsor);
  if (filters.intervention) params.set('intr', filters.intervention);
  if (filters.location) params.set('locn', filters.location);
  if (filters.dateFrom) params.set('from', filters.dateFrom);
  if (filters.dateTo) params.set('to', filters.dateTo);
  if (filters.piName) params.set('pi', filters.piName);
  if (pageToken) params.set('pageToken', pageToken);

  const qs = params.toString();
  return `/api/studies${qs ? `?${qs}` : ''}`;
}

const fetcher = async (url: string): Promise<StudySearchResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
};

function hasAnyFilter(filters: FilterState): boolean {
  return Boolean(
    filters.searchTerm ||
    filters.condition ||
    filters.statuses.length > 0 ||
    filters.phases.length > 0 ||
    filters.sponsor ||
    filters.intervention ||
    filters.location ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.piName
  );
}

export function useStudySearch(filters: FilterState) {
  const shouldFetch = hasAnyFilter(filters);

  const getKey = (pageIndex: number, previousPageData: StudySearchResponse | null) => {
    if (!shouldFetch) return null;
    if (previousPageData && !previousPageData.nextPageToken) return null;
    const pageToken = previousPageData?.nextPageToken;
    return buildSearchUrl(filters, pageToken);
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<StudySearchResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });

  const studies = useMemo(() => {
    return data?.flatMap(page => page.studies) ?? [];
  }, [data]);

  const totalCount = data?.[0]?.totalCount ?? 0;
  const hasMore = Boolean(data?.[data.length - 1]?.nextPageToken);

  return {
    studies,
    totalCount,
    isLoading,
    isLoadingMore: isValidating && size > 1,
    error: error as Error | undefined,
    hasMore,
    loadMore: () => setSize(size + 1),
    shouldFetch,
  };
}
