'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { FilterState } from '@/types/filters';
import type { OverallStatus, Phase } from '@/types/study';
import { EMPTY_FILTERS } from '@/types/filters';

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
    location: searchParams.get('locn') ?? '',
    dateFrom: searchParams.get('from') ?? '',
    dateTo: searchParams.get('to') ?? '',
    piName: searchParams.get('pi') ?? '',
  }), [searchParams]);

  const setFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const paramMap: Record<keyof FilterState, string> = {
      searchTerm: 'q',
      condition: 'cond',
      statuses: 'status',
      phases: 'phase',
      sponsor: 'spons',
      intervention: 'intr',
      location: 'locn',
      dateFrom: 'from',
      dateTo: 'to',
      piName: 'pi',
    };

    const paramName = paramMap[key];

    if (Array.isArray(value)) {
      const arrVal = value as string[];
      if (arrVal.length === 0) {
        params.delete(paramName);
      } else {
        params.set(paramName, arrVal.join(','));
      }
    } else {
      const strVal = value as string;
      if (!strVal) {
        params.delete(paramName);
      } else {
        params.set(paramName, strVal);
      }
    }

    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return Boolean(value);
    });
  }, [filters]);

  return { filters, setFilter, clearAll, hasActiveFilters };
}
