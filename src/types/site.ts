import type { OverallStatus, Phase } from './study';

export interface Site {
  id: string;
  facility: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  trialCount: number;
  trials: SiteTrialSummary[];
  contacts: SiteContact[];
  conditions: string[];
  statuses: OverallStatus[];
  sponsors: string[];
  phases: Phase[];
  totalEnrollment: number;
}

export interface SiteTrialSummary {
  nctId: string;
  briefTitle: string;
  overallStatus: OverallStatus;
  phases: Phase[];
  sponsor: string;
  conditions: string[];
  interventions: string[];
  enrollment?: number;
  siteStatus?: string;
  startDate?: string;
  completionDate?: string;
}

export interface SiteContact {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  trialNctId: string;
}
