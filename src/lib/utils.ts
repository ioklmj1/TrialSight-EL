/**
 * Normalizes a facility name for consistent site aggregation.
 * ClinicalTrials.gov data has extreme naming inconsistency — the same
 * physical institution can appear as "Dana-Farber Cancer Institute",
 * "Dana Farber Cancer Inst.", "Dana Farber Can Ins", etc.
 *
 * This normalizer:
 * - lowercases
 * - strips parenthetical suffixes like "(MGH)", "( Site 0003)", "/ID# 218010"
 * - removes punctuation (hyphens, periods, commas, apostrophes)
 * - collapses whitespace
 */
export function normalizeFacilityName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\s*\/\s*id#?\s*\S*/gi, '')        // strip "/ID# 218010" suffixes
    .replace(/\s*\([^)]*\)/g, '')                 // strip parenthetical like "(MGH)", "( Site 0003)"
    .replace(/[.,\-''`]/g, '')                    // strip punctuation
    .replace(/\s+/g, ' ')                         // collapse whitespace
    .trim();
}

/**
 * Generates a deterministic site ID from facility name and coordinates.
 * Uses a simple DJB2 hash of the composite key.
 * Facility names are normalized before hashing to merge naming variants.
 */
export function generateSiteId(
  facility: string,
  lat: number,
  lon: number
): string {
  const normalized = normalizeFacilityName(facility);
  const raw = `${normalized}|${lat.toFixed(4)}|${lon.toFixed(4)}`;
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash + raw.charCodeAt(i)) | 0;
  }
  // Convert to unsigned 32-bit hex string
  return `site_${(hash >>> 0).toString(16)}`;
}

/**
 * Returns a new array with duplicate values removed.
 * Uses strict equality via Set.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
