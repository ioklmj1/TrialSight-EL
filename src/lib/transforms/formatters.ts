import type { OverallStatus, Phase } from '@/types/study';
import { STATUS_LABEL_MAP, PHASE_LABEL_MAP, STATUS_OPTIONS } from '@/lib/constants';

/**
 * Returns a human-readable label for a study status.
 */
export function formatStatus(status: OverallStatus): string {
  return STATUS_LABEL_MAP[status] ?? status;
}

/**
 * Returns a human-readable label for a study phase.
 */
export function formatPhase(phase: Phase): string {
  return PHASE_LABEL_MAP[phase] ?? phase;
}

/**
 * Formats a date string for display.
 * Accepts ISO dates (2024-03-15) and partial dates (March 2024, 2024).
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';

  // Try to parse as ISO or common date format
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // If parsing fails, return the raw string
  return dateStr;
}

/**
 * Returns a hex color string associated with a study status.
 * Falls back to a neutral gray for unknown statuses.
 */
export function getStatusColor(status: OverallStatus): string {
  const option = STATUS_OPTIONS.find((opt) => opt.value === status);
  return option?.color ?? '#9ca3af';
}
