'use client';

import { useState, useCallback, Suspense } from 'react';
import { useFilterState } from '@/hooks/useFilterState';
import { useStudySearch } from '@/hooks/useStudySearch';
import { useSiteAggregation } from '@/hooks/useSiteAggregation';
import { useDebounce } from '@/hooks/useDebounce';
import type { FilterState } from '@/types/filters';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import FilterBar from '@/components/filters/FilterBar';
import ResultsList from '@/components/results/ResultsList';
import ResultsPagination from '@/components/results/ResultsPagination';
import MapContainer from '@/components/map/MapContainer';
import SiteDetailPanel from '@/components/detail/SiteDetailPanel';
import EmptyState from '@/components/ui/EmptyState';

function HomeContent() {
  const { filters, setFilter, clearAll, hasActiveFilters } = useFilterState();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'sites' | 'pi'>('sites');

  // Debounce text-based filters for API calls
  const debouncedFilters: FilterState = {
    ...filters,
    searchTerm: useDebounce(filters.searchTerm, 400),
    sponsor: useDebounce(filters.sponsor, 400),
    intervention: useDebounce(filters.intervention, 400),
    location: useDebounce(filters.location, 400),
    piName: useDebounce(filters.piName, 400),
    dateFrom: useDebounce(filters.dateFrom, 600),
    dateTo: useDebounce(filters.dateTo, 600),
  };

  const { studies, totalCount, isLoading, isLoadingMore, hasMore, loadMore, shouldFetch } =
    useStudySearch(debouncedFilters);
  const sites = useSiteAggregation(studies);

  const selectedSite = selectedSiteId
    ? sites.find((s) => s.id === selectedSiteId) ?? null
    : null;

  const handleSiteSelect = useCallback((siteId: string) => {
    setSelectedSiteId(siteId);
  }, []);

  const handleSearchChange = useCallback(
    (term: string) => {
      if (searchMode === 'pi') {
        setFilter('piName', term);
      } else {
        setFilter('searchTerm', term);
      }
    },
    [setFilter, searchMode]
  );

  const handleSearchModeChange = useCallback(
    (mode: 'sites' | 'pi') => {
      setSearchMode(mode);
      if (mode === 'pi') {
        setFilter('searchTerm', '');
      } else {
        setFilter('piName', '');
      }
    },
    [setFilter]
  );

  return (
    <AppShell
      header={
        <Header
          searchTerm={searchMode === 'pi' ? filters.piName : filters.searchTerm}
          onSearchChange={handleSearchChange}
          searchMode={searchMode}
          onSearchModeChange={handleSearchModeChange}
          piName={filters.piName}
          onPINameChange={(name) => setFilter('piName', name)}
        />
      }
      filterBar={
        <FilterBar
          filters={filters}
          onFilterChange={(key, value) => setFilter(key, value)}
          onClearAll={clearAll}
          view={view}
          onViewChange={setView}
          resultCount={sites.length}
        />
      }
    >
      <div className="flex-1 relative">
        {!shouldFetch && !hasActiveFilters ? (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="Search clinical trial sites"
              description="Use the search bar or filters above to discover clinical trial sites worldwide. Try searching by condition, sponsor, or location."
            />
          </div>
        ) : view === 'list' ? (
          <div className="h-full overflow-auto">
            <ResultsList
              sites={sites}
              selectedSiteId={selectedSiteId}
              onSiteSelect={handleSiteSelect}
              isLoading={isLoading}
              totalStudyCount={totalCount}
            />
            {sites.length > 0 && (
              <ResultsPagination
                hasMore={hasMore}
                isLoading={isLoadingMore ?? false}
                onLoadMore={loadMore}
                loadedCount={studies.length}
                totalCount={totalCount}
              />
            )}
          </div>
        ) : (
          <MapContainer
            sites={sites}
            selectedSiteId={selectedSiteId}
            onSiteSelect={handleSiteSelect}
          />
        )}
      </div>

      <SiteDetailPanel
        site={selectedSite}
        isOpen={selectedSite !== null}
        onClose={() => setSelectedSiteId(null)}
      />
    </AppShell>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
