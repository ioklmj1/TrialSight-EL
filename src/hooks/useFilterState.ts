'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { FilterState } from '@/types/filters';
import type { OverallStatus, Phase } from '@/types/study';

export function useFilterState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: FilterState = useMemo(() => ({
    searchTerm: searchParams.get('q') ?? '',
    condition: searchParams.get('cond') ?? '',
    statuses: (searchParams.get('status')?.split(',').filter(Boolean) ?? []) as OverallStatus[],
    phases: (searchParams.get('phase')?.split(',').filter(Boolean) ?? []) as Phase[],
    sponsor: searchParams.get('spons') ?? '',
    intervention: searchParams.get('intr') ?? '',
    country: searchParams.get('ctry') ?? '',
    city: searchParams.get('city') ?? '',
    dateFrom: searchParams.get('from') ?? '',
    dateTo: searchParams.get('to') ?? '',
    piName: searchParams.get('pi') ?? '',
  }), [searchParams]);

  /** Write a full FilterState to URL params in one batch */
  const commitFilters = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.searchTerm) params.set('q', newFilters.searchTerm);
    if (newFilters.condition) params.set('cond', newFilters.condition);
    if (newFilters.statuses.length > 0) params.set('status', newFilters.statuses.join(','));
    if (newFilters.phases.length > 0) params.set('phase', newFilters.phases.join(','));
    if (newFilters.sponsor) params.set('spons', newFilters.sponsor);
    if (newFilters.intervention) params.set('intr', newFilters.intervention);
    if (newFilters.country) params.set('ctry', newFilters.country);
    if (newFilters.city) params.set('city', newFilters.city);
    if (newFilters.dateFrom) params.set('from', newFilters.dateFrom);
    if (newFilters.dateTo) params.set('to', newFilters.dateTo);
    if (newFilters.piName) params.set('pi', newFilters.piName);

    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [router, pathname]);

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return Boolean(value);
    });
  }, [filters]);

  return { filters, commitFilters, clearAll, hasActiveFilters };
}
