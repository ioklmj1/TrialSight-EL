'use client';

import { useState, useCallback, useEffect, useRef, useMemo, Suspense } from 'react';
import { useFilterState } from '@/hooks/useFilterState';
import { useStudySearch } from '@/hooks/useStudySearch';
import { useSiteAggregation } from '@/hooks/useSiteAggregation';
import type { FilterState } from '@/types/filters';
import { EMPTY_FILTERS } from '@/types/filters';

import AppShell from '@/components/layout/AppShell';
import Header from '@/components/layout/Header';
import FilterBar from '@/components/filters/FilterBar';
import ResultsList from '@/components/results/ResultsList';
import ResultsPagination from '@/components/results/ResultsPagination';
import MapContainer from '@/components/map/MapContainer';
import SiteDetailPanel from '@/components/detail/SiteDetailPanel';
import EmptyState from '@/components/ui/EmptyState';

function HomeContent() {
  const { filters: urlFilters, commitFilters, clearAll, hasActiveFilters } = useFilterState();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'sites' | 'pi'>('sites');

  // Local "draft" filter state — only synced to URL on explicit Search
  const [localFilters, setLocalFilters] = useState<FilterState>(urlFilters);
  const localRef = useRef(localFilters);
  localRef.current = localFilters;

  // Sync local state when URL params change (browser back, clearAll, etc.)
  useEffect(() => {
    setLocalFilters(urlFilters);
  }, [urlFilters]);

  // API reads from committed URL params (not local draft)
  const { studies, totalCount, isLoading, isLoadingMore, hasMore, loadMore, shouldFetch } =
    useStudySearch(urlFilters);
  const allSites = useSiteAggregation(studies);

  // Post-filter sites by location when country/city filters are active.
  // The CT.gov API returns entire studies (all locations) when any location matches,
  // so we need to filter client-side to only show sites in the requested location.
  const sites = useMemo(() => {
    const country = urlFilters.country.toLowerCase().trim();
    const city = urlFilters.city.toLowerCase().trim();
    if (!country && !city) return allSites;
    return allSites.filter((site) => {
      if (country && !(site.country || '').toLowerCase().includes(country)) return false;
      if (city && !(site.city || '').toLowerCase().includes(city)) return false;
      return true;
    });
  }, [allSites, urlFilters.country, urlFilters.city]);

  const selectedSite = selectedSiteId
    ? sites.find((s) => s.id === selectedSiteId) ?? null
    : null;

  // Commit current local filters to URL (triggers API call)
  const commitSearch = useCallback((overrides?: Partial<FilterState>) => {
    const toCommit = overrides
      ? { ...localRef.current, ...overrides }
      : localRef.current;
    commitFilters(toCommit);
  }, [commitFilters]);

  // Update a local filter value without triggering API
  const updateLocal = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // All filters update local draft state only — committed on explicit Search
  const handleFilterChange = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    updateLocal(key, value);
  }, [updateLocal]);

  const handleSiteSelect = useCallback((siteId: string) => {
    setSelectedSiteId(siteId);
  }, []);

  const handleSearchModeChange = useCallback((mode: 'sites' | 'pi') => {
    setSearchMode(mode);
    if (mode === 'pi') {
      updateLocal('searchTerm', '');
    } else {
      updateLocal('piName', '');
    }
  }, [updateLocal]);

  const handleClearAll = useCallback(() => {
    setLocalFilters(EMPTY_FILTERS);
    clearAll();
  }, [clearAll]);

  return (
    <AppShell
      header={
        <Header
          searchTerm={searchMode === 'pi' ? localFilters.piName : localFilters.searchTerm}
          onSearchChange={(term) => {
            if (searchMode === 'pi') {
              updateLocal('piName', term);
            } else {
              updateLocal('searchTerm', term);
            }
          }}
          onSearch={() => commitSearch()}
          searchMode={searchMode}
          onSearchModeChange={handleSearchModeChange}
          piName={localFilters.piName}
          onPINameChange={(name) => updateLocal('piName', name)}
        />
      }
      filterBar={
        <FilterBar
          filters={localFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          onSearch={() => commitSearch()}
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
