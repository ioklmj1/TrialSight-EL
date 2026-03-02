import type { FilterState } from '@/types/filters';
import type { StudySearchResponse } from '@/types/study';

/**
 * Builds the URL to our internal /api/studies endpoint from a FilterState
 * object and an optional page token for pagination.
 */
export function buildSearchUrl(
  filters: FilterState,
  pageToken?: string
): string {
  const params = new URLSearchParams();

  if (filters.searchTerm) params.set('q', filters.searchTerm);
  if (filters.condition) params.set('cond', filters.condition);
  const locationParts = [filters.country, filters.city].filter(Boolean);
  if (locationParts.length > 0) params.set('locn', locationParts.join(', '));
  if (filters.sponsor) params.set('spons', filters.sponsor);
  if (filters.intervention) params.set('intr', filters.intervention);
  if (filters.piName) params.set('pi', filters.piName);

  if (filters.statuses.length > 0) {
    params.set('status', filters.statuses.join(','));
  }

  if (filters.phases.length > 0) {
    params.set('phase', filters.phases.join(','));
  }

  if (filters.dateFrom) params.set('from', filters.dateFrom);
  if (filters.dateTo) params.set('to', filters.dateTo);

  if (pageToken) params.set('pageToken', pageToken);

  const qs = params.toString();
  return qs ? `/api/studies?${qs}` : '/api/studies';
}

/**
 * SWR-compatible fetcher that calls our internal API and returns
 * the typed StudySearchResponse.
 */
export async function fetcher(url: string): Promise<StudySearchResponse> {
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ??
        `API request failed: ${res.status}`
    );
  }

  return res.json() as Promise<StudySearchResponse>;
}
