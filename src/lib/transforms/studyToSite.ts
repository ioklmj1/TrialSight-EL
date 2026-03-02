import type { StudyRecord, Phase } from '@/types/study';
import type { Site, SiteTrialSummary, SiteContact } from '@/types/site';
import { generateSiteId, unique } from '@/lib/utils';

/**
 * Aggregate an array of studies into site-centric records.
 *
 * Each unique location (identified by facility + lat/lon) becomes a Site.
 * Multiple trials at the same physical location are merged into one Site
 * with deduplicated contacts, conditions, sponsors, and phases.
 */
export function aggregateStudiesToSites(studies: StudyRecord[]): Site[] {
  const siteMap = new Map<string, Site>();

  for (const study of studies) {
    const proto = study.protocolSection;
    const locations =
      proto.contactsLocationsModule?.locations ?? [];

    for (const loc of locations) {
      if (!loc.geoPoint) continue;

      const { lat, lon } = loc.geoPoint;
      const siteId = generateSiteId(loc.facility, lat, lon);

      // Build trial summary for this study
      const trialSummary: SiteTrialSummary = {
        nctId: proto.identificationModule.nctId,
        briefTitle: proto.identificationModule.briefTitle,
        overallStatus: proto.statusModule.overallStatus,
        phases: proto.designModule.phases ?? [],
        sponsor: proto.sponsorCollaboratorsModule.leadSponsor.name,
        conditions: proto.conditionsModule.conditions,
        interventions:
          proto.armsInterventionsModule?.interventions?.map(
            (i) => i.name
          ) ?? [],
        enrollment: proto.designModule.enrollmentInfo?.count,
        siteStatus: loc.status,
        startDate: proto.statusModule.startDateStruct?.date,
        completionDate:
          proto.statusModule.completionDateStruct?.date,
      };

      // Build contacts for this location + study
      const contacts: SiteContact[] = (loc.contacts ?? []).map(
        (c) => ({
          name: c.name,
          role: c.role,
          phone: c.phone,
          email: c.email,
          trialNctId: proto.identificationModule.nctId,
        })
      );

      const existing = siteMap.get(siteId);

      if (existing) {
        // Merge into existing site
        // Only add trial if not already present (dedup by nctId)
        const alreadyHasTrial = existing.trials.some(
          (t) => t.nctId === trialSummary.nctId
        );
        if (!alreadyHasTrial) {
          existing.trials.push(trialSummary);
          existing.trialCount = existing.trials.length;
          existing.totalEnrollment +=
            trialSummary.enrollment ?? 0;
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

        // Union conditions, sponsors, phases, statuses
        existing.conditions = unique([
          ...existing.conditions,
          ...proto.conditionsModule.conditions,
        ]);
        existing.sponsors = unique([
          ...existing.sponsors,
          proto.sponsorCollaboratorsModule.leadSponsor.name,
        ]);
        existing.phases = unique([
          ...existing.phases,
          ...(proto.designModule.phases ?? []),
        ]) as Phase[];
        existing.statuses = unique([
          ...existing.statuses,
          proto.statusModule.overallStatus,
        ]);
      } else {
        // Create new site entry
        siteMap.set(siteId, {
          id: siteId,
          facility: loc.facility,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          lat,
          lon,
          trialCount: 1,
          trials: [trialSummary],
          contacts,
          conditions: [...proto.conditionsModule.conditions],
          statuses: [proto.statusModule.overallStatus],
          sponsors: [
            proto.sponsorCollaboratorsModule.leadSponsor.name,
          ],
          phases: [...(proto.designModule.phases ?? [])],
          totalEnrollment: trialSummary.enrollment ?? 0,
        });
      }
    }
  }

  return Array.from(siteMap.values());
}
