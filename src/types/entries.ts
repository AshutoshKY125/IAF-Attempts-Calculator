export type ForceBranch = 'ARMY' | 'NAVY' | 'AIR_FORCE' | 'COAST_GUARD';

export type EntryType = 'UPSC_EXAM' | 'DIRECT_SSB' | 'NON_UPSC_EXAM';

export type CommissionType = 'PERMANENT' | 'SHORT_SERVICE' | 'BOTH' | 'PART_TIME' | 'TERRITORIAL';

export type GenderOption = 'MALE' | 'FEMALE' | 'OTHER';

export type EducationLevel =
  | 'CLASS_12_APPEARING'
  | 'CLASS_12_PASSED'
  | 'GRADUATION_APPEARING'
  | 'GRADUATION_COMPLETED'
  | 'BTECH_APPEARING'
  | 'BTECH_COMPLETED'
  | 'POST_GRADUATION';

export type EnggBranch =
  | 'ANY_ENGG'
  | 'CSE_IT'
  | 'MECHANICAL'
  | 'ELECTRICAL'
  | 'ELECTRONICS_ECE'
  | 'CIVIL'
  | 'AERONAUTICAL_AEROSPACE'
  | 'NAVAL_ARCH'
  | 'OTHER_ENGG';

export interface UserProfile {
  dob: string; // YYYY-MM-DD
  gender: GenderOption;
  educationLevel: EducationLevel;
  // Optional filters
  hasPCM12th: boolean;
  pcmPercentage?: number;
  hasMathsPhysics12th: boolean;
  enggBranch?: EnggBranch;
  graduationPercentage?: number;
  hasNCCCertificate: boolean;
  nccWing?: 'ARMY' | 'NAVY' | 'AIR_FORCE';
  nccGrade?: 'A' | 'B' | 'C';
  hasCPL: boolean; // Commercial Pilot License (DGCA)
  hasLawDegree: boolean;
  lawPercentage?: number;
  isMarried: boolean;
  isGainfullyEmployed: boolean; // For Territorial Army
  appearedJEEMains: boolean; // For 10+2 TES & 10+2 Navy B.Tech
}

export interface CycleInfo {
  cycleName: string; // e.g. "CDS 1 2027"
  courseName: string; // e.g. "164th Regular IMA Course"
  courseJoiningDate: string; // e.g. "Jan 2028"
  courseJoiningDateRaw: string; // "2028-01-01"
  notificationMonth: string; // e.g. "Dec 2026"
  applicationWindow: string; // e.g. "Dec 2026 - Jan 2027"
  examDate?: string; // e.g. "April 2027"
  ssbPeriod: string; // e.g. "July - Oct 2027"
  minDob: string; // inclusive
  maxDob: string; // inclusive
  isEligible: boolean;
  ineligibilityReason?: string;
  isCurrentOrUpcoming: boolean;
}

export interface ArmedForcesEntry {
  id: string;
  name: string;
  shortCode: string;
  force: ForceBranch;
  academy: string; // e.g. "Indian Military Academy (IMA), Dehradun"
  commission: CommissionType;
  entryType: EntryType;
  genderEligibility: ('MALE' | 'FEMALE')[];
  minAgeYears: number; // e.g. 19
  maxAgeYears: number; // e.g. 24
  ageCriteriaDescription: string;
  educationCriteriaDescription: string;
  officialPortalUrl: string;
  officialPortalName: string;
  description: string;
  keyResponsibilities: string;
  selectionProcess: string[];
  examPattern?: {
    subjects: string[];
    duration: string;
    totalMarks: string;
    negativeMarking: boolean;
  };
  ssbDuration: string;
  directSSBNotes?: string;
  hasSpecialWaiver?: string;
  availableStreams?: {
    name: string;
    shortName: string;
    academy: string;
    commission: string;
    ageRange: string;
    qualification: string;
  }[];
  // Dynamic cycle generator function
  generateCycles: (userProfile: UserProfile, referenceYear?: number) => CycleInfo[];
}

export interface EvaluatedEntry {
  entry: ArmedForcesEntry;
  isEligible: boolean;
  eligibleCycles: CycleInfo[];
  nextEligibleCycle?: CycleInfo;
  eligibleStreams?: string[];
  reasonsIfNotEligible: string[];
}
