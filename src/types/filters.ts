import type { OverallStatus, Phase } from './study';

export interface FilterState {
  searchTerm: string;
  condition: string;
  statuses: OverallStatus[];
  phases: Phase[];
  sponsor: string;
  intervention: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  piName: string;
}

export const EMPTY_FILTERS: FilterState = {
  searchTerm: '',
  condition: '',
  statuses: [],
  phases: [],
  sponsor: '',
  intervention: '',
  location: '',
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
  locn?: string;
  from?: string;
  to?: string;
  pi?: string;
};
