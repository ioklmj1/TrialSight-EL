'use client';

import { useMemo } from 'react';
import type { Site, SiteContact } from '@/types/site';

export interface PIResult {
  name: string;
  role: string;
  sites: Site[];
  totalTrials: number;
  email?: string;
  phone?: string;
}

export function usePIAggregation(sites: Site[], piName: string): PIResult[] {
  return useMemo(() => {
    if (!piName) return [];

    const piMap = new Map<string, PIResult>();
    const searchLower = piName.toLowerCase();

    for (const site of sites) {
      for (const contact of site.contacts) {
        if (!contact.name.toLowerCase().includes(searchLower)) continue;

        const key = contact.name.toLowerCase();
        if (piMap.has(key)) {
          const existing = piMap.get(key)!;
          if (!existing.sites.some(s => s.id === site.id)) {
            existing.sites.push(site);
            existing.totalTrials += site.trialCount;
          }
          if (!existing.email && contact.email) existing.email = contact.email;
          if (!existing.phone && contact.phone) existing.phone = contact.phone;
        } else {
          piMap.set(key, {
            name: contact.name,
            role: contact.role,
            sites: [site],
            totalTrials: site.trialCount,
            email: contact.email,
            phone: contact.phone,
          });
        }
      }
    }

    return Array.from(piMap.values()).sort((a, b) => b.totalTrials - a.totalTrials);
  }, [sites, piName]);
}
