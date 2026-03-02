'use client';

import type { FilterState } from '@/types/filters';
import ConditionFilter from './ConditionFilter';
import StatusFilter from './StatusFilter';
import PhaseFilter from './PhaseFilter';
import SponsorFilter from './SponsorFilter';
import InterventionFilter from './InterventionFilter';
import LocationFilter from './LocationFilter';
import DateRangeFilter from './DateRangeFilter';
import FilterChips from './FilterChips';
import ViewToggle from '@/components/results/ViewToggle';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearAll: () => void;
  onSearch: () => void;
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
  resultCount: number;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onClearAll,
  onSearch,
  view,
  onViewChange,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.conditions.length > 0 ||
    filters.statuses.length > 0 ||
    filters.phases.length > 0 ||
    filters.sponsor !== '' ||
    filters.intervention !== '' ||
    filters.country !== '' ||
    filters.city !== '' ||
    filters.dateFrom !== '' ||
    filters.dateTo !== '' ||
    filters.piName !== '';

  return (
    <div className="bg-[#FAFAF5] border-b border-[#E8E5DE] px-5 py-2.5">
      <div className="max-w-[1600px] mx-auto space-y-2">
        {/* Filter row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dropdowns */}
          <ConditionFilter
            value={filters.conditions}
            onChange={(v) => onFilterChange('conditions', v)}
          />
          <StatusFilter
            value={filters.statuses}
            onChange={(v) => onFilterChange('statuses', v)}
          />
          <PhaseFilter
            value={filters.phases}
            onChange={(v) => onFilterChange('phases', v)}
          />
          <SponsorFilter
            value={filters.sponsor}
            onChange={(v) => onFilterChange('sponsor', v)}
            onCommit={onSearch}
          />
          <InterventionFilter
            value={filters.intervention}
            onChange={(v) => onFilterChange('intervention', v)}
          />
          <LocationFilter
            country={filters.country}
            city={filters.city}
            onCountryChange={(v) => onFilterChange('country', v)}
            onCityChange={(v) => onFilterChange('city', v)}
            onCommit={onSearch}
          />
          <DateRangeFilter
            fromValue={filters.dateFrom}
            toValue={filters.dateTo}
            onFromChange={(v) => onFilterChange('dateFrom', v)}
            onToChange={(v) => onFilterChange('dateTo', v)}
          />

          {/* Apply Filters button */}
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold bg-[#0D9488] text-white hover:bg-[#0F766E] transition-colors cursor-pointer shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Apply Filters
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Clear All + Result count */}
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-[#64748B] hover:text-[#1E293B] font-medium transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}

            <span className="text-xs text-[#94A3B8] tabular-nums">
              {resultCount.toLocaleString()} site{resultCount !== 1 ? 's' : ''}
            </span>

            {/* View Toggle */}
            <ViewToggle view={view} onChange={onViewChange} />
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <FilterChips
            filters={filters}
            onRemove={(key, value) => {
              if (key === 'conditions' && value) {
                onFilterChange(
                  'conditions',
                  filters.conditions.filter((c) => c !== value)
                );
              } else if (key === 'statuses' && value) {
                onFilterChange(
                  'statuses',
                  filters.statuses.filter((s) => s !== value)
                );
              } else if (key === 'phases' && value) {
                onFilterChange(
                  'phases',
                  filters.phases.filter((p) => p !== value)
                );
              } else if (key === 'dateFrom') {
                onFilterChange('dateFrom', '');
                onFilterChange('dateTo', '');
              } else {
                const arrayKeys: (keyof FilterState)[] = ['conditions', 'statuses', 'phases'];
                onFilterChange(key, arrayKeys.includes(key) ? [] : '');
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
