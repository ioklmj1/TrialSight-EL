'use client';

import { useState, useCallback, useEffect, useRef, Suspense } from 'react';
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
  const sites = useSiteAggregation(studies);

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

  // For dropdown/checkbox filters: update local AND immediately commit
  const updateAndCommit = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const updated = { ...localRef.current, [key]: value };
    setLocalFilters(updated);
    commitFilters(updated);
  }, [commitFilters]);

  const handleFilterChange = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    // Dropdowns and checkboxes commit immediately
    const immediateKeys: (keyof FilterState)[] = ['condition', 'statuses', 'phases'];
    if (immediateKeys.includes(key)) {
      updateAndCommit(key, value);
    } else {
      updateLocal(key, value);
    }
  }, [updateAndCommit, updateLocal]);

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
