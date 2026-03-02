import type { OverallStatus, Phase } from './study';

export interface FilterState {
  searchTerm: string;
  conditions: string[];
  statuses: OverallStatus[];
  phases: Phase[];
  sponsor: string;
  intervention: string;
  country: string;
  city: string;
  dateFrom: string;
  dateTo: string;
  piName: string;
}

export const EMPTY_FILTERS: FilterState = {
  searchTerm: '',
  conditions: [],
  statuses: [],
  phases: [],
  sponsor: '',
  intervention: '',
  country: '',
  city: '',
  dateFrom: '',
  dateTo: '',
  piName: '',
};

export type FilterSearchParams = {
  q?: string;
  cond?: string;
  status?: string;
  phase?: string;
  spons?: string;
  intr?: string;
  ctry?: string;
  city?: string;
  from?: string;
  to?: string;
  pi?: string;
};
