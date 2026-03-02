// Types mirroring the ClinicalTrials.gov API v2 response structure

export interface StudySearchResponse {
  totalCount: number;
  studies: StudyRecord[];
  nextPageToken?: string;
}

export interface StudyRecord {
  protocolSection: ProtocolSection;
  hasResults?: boolean;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  conditionsModule: ConditionsModule;
  designModule: DesignModule;
  armsInterventionsModule?: ArmsInterventionsModule;
  contactsLocationsModule?: ContactsLocationsModule;
  descriptionModule?: DescriptionModule;
  eligibilityModule?: EligibilityModule;
}

export interface IdentificationModule {
  nctId: string;
  briefTitle: string;
  officialTitle?: string;
  acronym?: string;
  organization?: {
    fullName: string;
    class: string;
  };
}

export interface StatusModule {
  overallStatus: OverallStatus;
  startDateStruct?: DateStruct;
  primaryCompletionDateStruct?: DateStruct;
  completionDateStruct?: DateStruct;
  lastUpdatePostDateStruct?: DateStruct;
}

export interface DateStruct {
  date: string;
  type?: string;
}

export type OverallStatus =
  | 'RECRUITING'
  | 'NOT_YET_RECRUITING'
  | 'ENROLLING_BY_INVITATION'
  | 'ACTIVE_NOT_RECRUITING'
  | 'SUSPENDED'
  | 'TERMINATED'
  | 'COMPLETED'
  | 'WITHDRAWN'
  | 'UNKNOWN';

export interface SponsorCollaboratorsModule {
  leadSponsor: {
    name: string;
    class: string;
  };
  collaborators?: Array<{
    name: string;
    class: string;
  }>;
  responsibleParty?: {
    type: string;
    investigatorFullName?: string;
    investigatorTitle?: string;
    investigatorAffiliation?: string;
  };
}

export interface ConditionsModule {
  conditions: string[];
  keywords?: string[];
}

export interface DesignModule {
  studyType: string;
  phases?: Phase[];
  enrollmentInfo?: {
    count: number;
    type: string;
  };
  designInfo?: {
    allocation?: string;
    interventionModel?: string;
    primaryPurpose?: string;
  };
}

export type Phase =
  | 'EARLY_PHASE1'
  | 'PHASE1'
  | 'PHASE2'
  | 'PHASE3'
  | 'PHASE4'
  | 'NA';

export interface ArmsInterventionsModule {
  interventions?: Array<{
    type: string;
    name: string;
    description?: string;
  }>;
}

export interface ContactsLocationsModule {
  centralContacts?: ContactRecord[];
  locations?: LocationRecord[];
}

export interface ContactRecord {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface LocationRecord {
  facility: string;
  status?: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  contacts?: ContactRecord[];
  geoPoint?: {
    lat: number;
    lon: number;
  };
}

export interface DescriptionModule {
  briefSummary?: string;
  detailedDescription?: string;
}

export interface EligibilityModule {
  eligibilityCriteria?: string;
  healthyVolunteers?: boolean;
  sex?: string;
  minimumAge?: string;
  maximumAge?: string;
}
