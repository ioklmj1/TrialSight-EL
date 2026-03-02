'use client';

import type { FilterState } from '@/types/filters';
import { STATUS_LABEL_MAP, PHASE_LABEL_MAP } from '@/lib/constants';

interface FilterChipsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: string) => void;
}

export default function FilterChips({ filters, onRemove }: FilterChipsProps) {
  const chips: { key: keyof FilterState; label: string; value?: string }[] = [];

  for (const cond of filters.conditions) {
    chips.push({
      key: 'conditions',
      label: cond,
      value: cond,
    });
  }

  for (const status of filters.statuses) {
    chips.push({
      key: 'statuses',
      label: STATUS_LABEL_MAP[status] || status,
      value: status,
    });
  }

  for (const phase of filters.phases) {
    chips.push({
      key: 'phases',
      label: PHASE_LABEL_MAP[phase] || phase,
      value: phase,
    });
  }

  if (filters.sponsor) {
    chips.push({ key: 'sponsor', label: `Sponsor: ${filters.sponsor}` });
  }

  if (filters.intervention) {
    chips.push({ key: 'intervention', label: `Intervention: ${filters.intervention}` });
  }

  if (filters.country) {
    chips.push({ key: 'country', label: `Country: ${filters.country}` });
  }

  if (filters.city) {
    chips.push({ key: 'city', label: `City: ${filters.city}` });
  }

  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom || '...';
    const to = filters.dateTo || '...';
    chips.push({ key: 'dateFrom', label: `Year: ${from}\u2013${to}` });
  }

  if (filters.piName) {
    chips.push({ key: 'piName', label: `PI: ${filters.piName}` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip, index) => (
        <span
          key={`${chip.key}-${chip.value || index}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0D9488]/8 text-[#0D9488] text-xs font-medium"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key, chip.value)}
            className="ml-0.5 hover:bg-[#0D9488]/20 rounded-full p-0.5 transition-colors cursor-pointer"
            aria-label={`Remove ${chip.label} filter`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}
