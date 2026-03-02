import type { StudySearchResponse } from '@/types/study';

const BASE_URL = 'https://clinicaltrials.gov/api/v2';

// ---------------------------------------------------------------------------
// Token-bucket rate limiter: 8 requests per second max
// ---------------------------------------------------------------------------

const RATE_LIMIT = 8;
const INTERVAL_MS = 1000;

let tokens = RATE_LIMIT;
let lastRefill = Date.now();

function refillTokens(): void {
  const now = Date.now();
  const elapsed = now - lastRefill;
  if (elapsed >= INTERVAL_MS) {
    const refills = Math.floor(elapsed / INTERVAL_MS);
    tokens = Math.min(RATE_LIMIT, tokens + refills * RATE_LIMIT);
    lastRefill += refills * INTERVAL_MS;
  }
}

async function waitForToken(): Promise<void> {
  refillTokens();
  if (tokens > 0) {
    tokens--;
    return;
  }
  // Wait until the next refill window
  const waitMs = INTERVAL_MS - (Date.now() - lastRefill);
  await new Promise((resolve) => setTimeout(resolve, waitMs));
  refillTokens();
  tokens--;
}

// ---------------------------------------------------------------------------
// Retry helper for 429 responses
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 1000;

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES
): Promise<Response> {
  await waitForToken();

  const res = await fetch(url);

  if (res.status === 429 && retries > 0) {
    const retryAfter = res.headers.get('Retry-After');
    const delayMs = retryAfter
      ? parseInt(retryAfter, 10) * 1000
      : RETRY_BASE_MS * (MAX_RETRIES - retries + 1);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return fetchWithRetry(url, retries - 1);
  }

  return res;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Search studies on ClinicalTrials.gov using the v2 API.
 * Handles rate limiting and automatic retries on 429 responses.
 */
export async function searchStudies(
  params: URLSearchParams
): Promise<StudySearchResponse> {
  const url = `${BASE_URL}/studies?${params.toString()}`;
  const res = await fetchWithRetry(url);

  if (!res.ok) {
    throw new Error(
      `ClinicalTrials.gov API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<StudySearchResponse>;
}

/**
 * Fetch a single study by its NCT ID.
 */
export async function fetchStudy(nctId: string): Promise<unknown> {
  const url = `${BASE_URL}/studies/${encodeURIComponent(nctId)}`;
  const res = await fetchWithRetry(url);

  if (!res.ok) {
    throw new Error(
      `ClinicalTrials.gov API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}
