'use client';

import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/Spinner';
import type { Site } from '@/types/site';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#F5F5F0] rounded-xl">
      <Spinner size="lg" />
      <p className="text-sm text-[#94A3B8] mt-3">Loading map...</p>
    </div>
  ),
});

interface MapContainerWrapperProps {
  sites: Site[];
  selectedSiteId: string | null;
  onSiteSelect: (siteId: string) => void;
}

export default function MapContainerWrapper({
  sites,
  selectedSiteId,
  onSiteSelect,
}: MapContainerWrapperProps) {
  return (
    <div className="h-full w-full">
      <MapView
        sites={sites}
        selectedSiteId={selectedSiteId}
        onSiteSelect={onSiteSelect}
      />
    </div>
  );
}
