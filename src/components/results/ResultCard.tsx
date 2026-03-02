'use client';

import type { Site } from '@/types/site';
import Badge from '@/components/ui/Badge';
import { STATUS_OPTIONS } from '@/lib/constants';

interface ResultCardProps {
  site: Site;
  onSelect: (siteId: string) => void;
  isSelected?: boolean;
}

export default function ResultCard({ site, onSelect, isSelected = false }: ResultCardProps) {
  const topConditions = site.conditions.slice(0, 3);
  const remainingConditions = site.conditions.length - 3;

  // Get unique status colors for the dots
  const statusDots = site.statuses
    .map((s) => STATUS_OPTIONS.find((opt) => opt.value === s))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <button
      type="button"
      onClick={() => onSelect(site.id)}
      className={`
        w-full text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer
        ${
          isSelected
            ? 'border-[#0D9488] bg-[#0D9488]/3 shadow-sm'
            : 'border-[#E8E5DE] bg-white hover:border-[#CBD5E1] hover:shadow-md hover:shadow-black/[0.03]'
        }
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#1E293B] truncate leading-snug">
            {site.facility}
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            {site.city}
            {site.state ? `, ${site.state}` : ''}, {site.country}
          </p>
        </div>

        <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md bg-[#F5F5F0] text-xs font-semibold text-[#475569] tabular-nums">
          {site.trialCount} trial{site.trialCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Conditions */}
      {topConditions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {topConditions.map((cond) => (
            <Badge key={cond} label={cond} color="#475569" />
          ))}
          {remainingConditions > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs text-[#94A3B8]">
              +{remainingConditions} more
            </span>
          )}
        </div>
      )}

      {/* Status dots */}
      {statusDots.length > 0 && (
        <div className="flex items-center gap-1.5">
          {statusDots.map((dot, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: dot!.color }}
              title={dot!.label}
            />
          ))}
        </div>
      )}
    </button>
  );
}
