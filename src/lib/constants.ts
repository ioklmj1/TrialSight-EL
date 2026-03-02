import type { OverallStatus, Phase } from '@/types/study';

export const CTGOV_API_BASE = 'https://clinicaltrials.gov/api/v2';

export const DEFAULT_PAGE_SIZE = 200;

export const MAP_DEFAULTS = {
  center: [20, 0] as [number, number],
  zoom: 2,
  maxZoom: 18,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const THERAPEUTIC_AREAS = [
  'Oncology',
  'Cardiology',
  'Neurology',
  'Metabolic',
  'Immunology',
  'Infectious Disease',
  'Respiratory',
  'Rare Disease',
  'Dermatology',
  'Ophthalmology',
  'Hematology',
  'Gastroenterology',
  'Endocrinology',
  'Psychiatry',
  'Rheumatology',
] as const;

export const STATUS_OPTIONS: { value: OverallStatus; label: string; color: string }[] = [
  { value: 'RECRUITING', label: 'Recruiting', color: '#16a34a' },
  { value: 'NOT_YET_RECRUITING', label: 'Not Yet Recruiting', color: '#ca8a04' },
  { value: 'ENROLLING_BY_INVITATION', label: 'Enrolling by Invitation', color: '#2563eb' },
  { value: 'ACTIVE_NOT_RECRUITING', label: 'Active, Not Recruiting', color: '#7c3aed' },
  { value: 'COMPLETED', label: 'Completed', color: '#64748b' },
  { value: 'SUSPENDED', label: 'Suspended', color: '#ea580c' },
  { value: 'TERMINATED', label: 'Terminated', color: '#dc2626' },
  { value: 'WITHDRAWN', label: 'Withdrawn', color: '#6b7280' },
];

export const PHASE_OPTIONS: { value: Phase; label: string }[] = [
  { value: 'EARLY_PHASE1', label: 'Early Phase 1' },
  { value: 'PHASE1', label: 'Phase 1' },
  { value: 'PHASE2', label: 'Phase 2' },
  { value: 'PHASE3', label: 'Phase 3' },
  { value: 'PHASE4', label: 'Phase 4' },
];

export const STATUS_LABEL_MAP: Record<OverallStatus, string> = {
  RECRUITING: 'Recruiting',
  NOT_YET_RECRUITING: 'Not Yet Recruiting',
  ENROLLING_BY_INVITATION: 'Enrolling by Invitation',
  ACTIVE_NOT_RECRUITING: 'Active, Not Recruiting',
  COMPLETED: 'Completed',
  SUSPENDED: 'Suspended',
  TERMINATED: 'Terminated',
  WITHDRAWN: 'Withdrawn',
  UNKNOWN: 'Unknown',
};

export const PHASE_LABEL_MAP: Record<Phase, string> = {
  EARLY_PHASE1: 'Early Phase 1',
  PHASE1: 'Phase 1',
  PHASE2: 'Phase 2',
  PHASE3: 'Phase 3',
  PHASE4: 'Phase 4',
  NA: 'N/A',
};
