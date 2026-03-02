import { NextRequest, NextResponse } from 'next/server';
import { searchStudies } from '@/lib/api/ctgov';
import { cache } from '@/lib/api/cache';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import type { StudySearchResponse } from '@/types/study';

/**
 * GET /api/studies
 *
 * Proxies search requests to ClinicalTrials.gov, mapping client filter
 * params to the v2 API query format. Responses are cached for 5 minutes.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // --- Build ClinicalTrials.gov query params ---
    const ctParams = new URLSearchParams();

    // Simple 1:1 mappings
    const q = searchParams.get('q');
    const cond = searchParams.get('cond');
    const locn = searchParams.get('locn');
    const spons = searchParams.get('spons');
    const intr = searchParams.get('intr');
    const status = searchParams.get('status');
    const phase = searchParams.get('phase');
    const pageToken = searchParams.get('pageToken');

    // Date range params
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');

    // PI name param
    const pi = searchParams.get('pi');

    // Build composite query.term from free text, date range, and PI
    const termParts: string[] = [];

    if (q) termParts.push(q);

    if (dateFrom || dateTo) {
      const from = dateFrom || 'MIN';
      const to = dateTo || 'MAX';
      termParts.push(`AREA[StartDate]RANGE[${from},${to}]`);
    }

    if (pi) {
      termParts.push(`AREA[LocationContactName]${pi}`);
    }

    if (termParts.length > 0) {
      ctParams.set('query.term', termParts.join(' '));
    }

    if (cond) ctParams.set('query.cond', cond);
    if (locn) ctParams.set('query.locn', locn);
    if (spons) ctParams.set('query.spons', spons);
    if (intr) ctParams.set('query.intr', intr);

    if (status) ctParams.set('filter.overallStatus', status);

    // Phase filtering uses filter.advanced with AREA syntax (filter.phase is not a valid CT.gov v2 param)
    if (phase) {
      const phases = phase.split(',').map((p) => `AREA[Phase]${p}`).join(' OR ');
      const existingAdvanced = ctParams.get('filter.advanced');
      ctParams.set('filter.advanced', existingAdvanced ? `${existingAdvanced} AND (${phases})` : phases);
    }

    if (pageToken) ctParams.set('pageToken', pageToken);

    ctParams.set('pageSize', String(DEFAULT_PAGE_SIZE));
    ctParams.set('countTotal', 'true');

    // --- Check cache ---
    const cacheKey = `studies:${ctParams.toString()}`;
    const cached = cache.get<StudySearchResponse>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // --- Fetch from ClinicalTrials.gov ---
    const data = await searchStudies(ctParams);

    // Store in cache
    cache.set(cacheKey, data);

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('[/api/studies] Error:', message);
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
