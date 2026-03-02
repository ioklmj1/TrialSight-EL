'use client';

import { useMemo } from 'react';
import type { StudyRecord } from '@/types/study';
import type { Site, SiteTrialSummary, SiteContact } from '@/types/site';
import { generateSiteId, unique } from '@/lib/utils';

export function aggregateStudiesToSites(studies: StudyRecord[]): Site[] {
  const siteMap = new Map<string, Site>();

  for (const study of studies) {
    const proto = study.protocolSection;
    const locations = proto.contactsLocationsModule?.locations ?? [];

    for (const loc of locations) {
      if (!loc.geoPoint) continue;

      const siteId = generateSiteId(loc.facility, loc.geoPoint.lat, loc.geoPoint.lon);

      const trialSummary: SiteTrialSummary = {
        nctId: proto.identificationModule.nctId,
        briefTitle: proto.identificationModule.briefTitle,
        overallStatus: proto.statusModule.overallStatus,
        phases: proto.designModule?.phases ?? [],
        sponsor: proto.sponsorCollaboratorsModule.leadSponsor.name,
        conditions: proto.conditionsModule?.conditions ?? [],
        interventions: proto.armsInterventionsModule?.interventions?.map(i => i.name) ?? [],
        enrollment: proto.designModule?.enrollmentInfo?.count,
        siteStatus: loc.status,
        startDate: proto.statusModule.startDateStruct?.date,
        completionDate: proto.statusModule.completionDateStruct?.date,
      };

      const contacts: SiteContact[] = (loc.contacts ?? []).map(c => ({
        name: c.name,
        role: c.role,
        phone: c.phone,
        email: c.email,
        trialNctId: proto.identificationModule.nctId,
      }));

      if (siteMap.has(siteId)) {
        const existing = siteMap.get(siteId)!;
        // Only add trial if not already present
        if (!existing.trials.some(t => t.nctId === trialSummary.nctId)) {
          existing.trials.push(trialSummary);
          existing.trialCount = existing.trials.length;
          existing.totalEnrollment += trialSummary.enrollment ?? 0;
        }

        // Deduplicate contacts by name+role+trialNctId
        for (const contact of contacts) {
          const isDuplicate = existing.contacts.some(
            (c) =>
              c.name === contact.name &&
              c.role === contact.role &&
              c.trialNctId === contact.trialNctId
          );
          if (!isDuplicate) {
            existing.contacts.push(contact);
          }
        }

        existing.conditions = unique([...existing.conditions, ...trialSummary.conditions]);
        existing.statuses = unique([...existing.statuses, trialSummary.overallStatus]);
        existing.sponsors = unique([...existing.sponsors, trialSummary.sponsor]);
        existing.phases = unique([...existing.phases, ...trialSummary.phases]);
      } else {
        siteMap.set(siteId, {
          id: siteId,
          facility: loc.facility,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          lat: loc.geoPoint.lat,
          lon: loc.geoPoint.lon,
          trialCount: 1,
          trials: [trialSummary],
          contacts,
          conditions: [...trialSummary.conditions],
          statuses: [trialSummary.overallStatus],
          sponsors: [trialSummary.sponsor],
          phases: [...trialSummary.phases],
          totalEnrollment: trialSummary.enrollment ?? 0,
        });
      }
    }
  }

  return Array.from(siteMap.values());
}

export function useSiteAggregation(studies: StudyRecord[]): Site[] {
  return useMemo(() => aggregateStudiesToSites(studies), [studies]);
}
