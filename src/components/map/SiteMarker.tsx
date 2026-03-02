'use client';

import { Marker, Popup } from 'react-leaflet';
import type { Site } from '@/types/site';

interface SiteMarkerProps {
  site: Site;
  onSelect: (siteId: string) => void;
}

export default function SiteMarker({ site, onSelect }: SiteMarkerProps) {
  return (
    <Marker position={[site.lat, site.lon]}>
      <Popup>
        <div className="min-w-[200px] p-1">
          <h3 className="text-sm font-semibold text-[#1E293B] leading-snug mb-1">
            {site.facility}
          </h3>
          <p className="text-xs text-[#64748B] mb-2">
            {site.city}
            {site.state ? `, ${site.state}` : ''}, {site.country}
          </p>
          <p className="text-xs text-[#475569] mb-2">
            <span className="font-medium">{site.trialCount}</span> trial
            {site.trialCount !== 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={() => onSelect(site.id)}
            className="text-xs font-medium text-[#0D9488] hover:text-[#0F766E] transition-colors cursor-pointer"
          >
            View Details &rarr;
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
