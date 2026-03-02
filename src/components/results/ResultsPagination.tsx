'use client';

import Spinner from '@/components/ui/Spinner';

interface ResultsPaginationProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadedCount: number;
  totalCount: number;
}

export default function ResultsPagination({
  hasMore,
  isLoading,
  onLoadMore,
  loadedCount,
  totalCount,
}: ResultsPaginationProps) {
  if (totalCount === 0) return null;

  const percentage = Math.min((loadedCount / totalCount) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-3 py-4 px-4">
      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-1 bg-[#E8E5DE] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0D9488] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Count text */}
      <p className="text-xs text-[#94A3B8] tabular-nums">
        Loaded {loadedCount.toLocaleString()} of {totalCount.toLocaleString()} studies
      </p>

      {/* Load More button */}
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E5DE] bg-white text-sm font-medium text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" />
              Loading...
            </>
          ) : (
            'Load More'
          )}
        </button>
      )}
    </div>
  );
}
