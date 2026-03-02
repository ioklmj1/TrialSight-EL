'use client';

import { useState } from 'react';
import type { Site } from '@/types/site';
import ResultCard from './ResultCard';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';

type SortOption = 'trialCount' | 'alphabetical' | 'country';

interface ResultsListProps {
  sites: Site[];
  selectedSiteId: string | null;
  onSiteSelect: (siteId: string) => void;
  isLoading: boolean;
  totalStudyCount: number;
}

export default function ResultsList({
  sites,
  selectedSiteId,
  onSiteSelect,
  isLoading,
  totalStudyCount,
}: ResultsListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('trialCount');

  const sortedSites = [...sites].sort((a, b) => {
    switch (sortBy) {
      case 'trialCount':
        return b.trialCount - a.trialCount;
      case 'alphabetical':
        return a.facility.localeCompare(b.facility);
      case 'country':
        return a.country.localeCompare(b.country) || a.city.localeCompare(b.city);
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E5DE] bg-[#FAFAF5] shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-[#1E293B] tabular-nums">
            {sites.length.toLocaleString()} sites
          </span>
          <span className="text-xs text-[#94A3B8]">
            across {totalStudyCount.toLocaleString()} studies
          </span>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="text-xs text-[#64748B] bg-transparent border border-[#E8E5DE] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] cursor-pointer"
        >
          <option value="trialCount">Most trials</option>
          <option value="alphabetical">A-Z</option>
          <option value="country">By country</option>
        </select>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {isLoading && sites.length === 0 ? (
          <div className="py-16">
            <Spinner size="lg" />
          </div>
        ) : sortedSites.length === 0 ? (
          <EmptyState
            title="No sites found"
            description="Try adjusting your search or filters to find clinical trial sites."
          />
        ) : (
          sortedSites.map((site) => (
            <ResultCard
              key={site.id}
              site={site}
              onSelect={onSiteSelect}
              isSelected={selectedSiteId === site.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
