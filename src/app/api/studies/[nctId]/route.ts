import { NextRequest, NextResponse } from 'next/server';
import { fetchStudy } from '@/lib/api/ctgov';
import { cache } from '@/lib/api/cache';

/**
 * GET /api/studies/:nctId
 *
 * Fetches a single study by NCT ID from ClinicalTrials.gov.
 * Responses are cached for 5 minutes.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ nctId: string }> }
) {
  try {
    const { nctId } = await params;

    // Check cache
    const cacheKey = `study:${nctId}`;
    const cached = cache.get<unknown>(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from ClinicalTrials.gov
    const data = await fetchStudy(nctId);

    // Store in cache
    cache.set(cacheKey, data);

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('[/api/studies/[nctId]] Error:', message);
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
