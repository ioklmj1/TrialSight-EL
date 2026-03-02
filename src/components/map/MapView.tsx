'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { MAP_DEFAULTS } from '@/lib/constants';
import type { Site } from '@/types/site';
import SiteMarker from './SiteMarker';

// Fix default marker icons for webpack/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  sites: Site[];
  selectedSiteId: string | null;
  onSiteSelect: (siteId: string) => void;
}

export default function MapView({ sites, selectedSiteId, onSiteSelect }: MapViewProps) {
  return (
    <MapContainer
      center={MAP_DEFAULTS.center}
      zoom={MAP_DEFAULTS.zoom}
      maxZoom={MAP_DEFAULTS.maxZoom}
      style={{ height: '100%', width: '100%', background: '#F5F5F0' }}
    >
      <TileLayer
        attribution={MAP_DEFAULTS.tileAttribution}
        url={MAP_DEFAULTS.tileUrl}
      />
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={80}
        spiderfyOnMaxZoom={false}
        zoomToBoundsOnClick={true}
        showCoverageOnHover={false}
      >
        {sites.map((site) => (
          <SiteMarker key={site.id} site={site} onSelect={onSiteSelect} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
