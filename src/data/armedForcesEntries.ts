import { ArmedForcesEntry, CycleInfo, UserProfile } from '../types/entries';
import {
  formatDate,
  isDobInRange,
  isCycleConcluded,
  getDynamicYearsList,
} from '../utils/cycleGenerator';

export const ALL_ARMED_FORCES_ENTRIES: ArmedForcesEntry[] = [
  // ==========================================
  // 1A. COMBINED DEFENCE SERVICES - IMA, INA & AFA (UPSC CDS)
  // (Permanent Commission entries for IMA Dehradun, INA Ezhimala & AFA Dundigal)
  // ==========================================
  {
    id: 'cds_ima_ina_afa',
    name: 'Combined Defence Services (CDS - IMA, INA & AFA)',
    shortCode: 'CDS (IMA/INA/AFA)',
    force: 'ARMY',
    academy: 'IMA Dehradun / INA Ezhimala / AFA Dundigal',
    commission: 'PERMANENT',
    entryType: 'UPSC_EXAM',
    genderEligibility: ['MALE'],
    minAgeYears: 19,
    maxAgeYears: 24,
    ageCriteriaDescription:
      'IMA & INA: 19–24 yrs | AFA: 20–24 yrs (up to 26 yrs for DGCA CPL holders). Age on 1st day of month course commences (Jan / July). Unmarried Male candidates.',
    educationCriteriaDescription:
      'IMA: Degree of a recognized University in any discipline. INA: Degree in Engineering (B.E./B.Tech). AFA: Degree with 10+2 Physics & Maths OR Engineering Degree (B.E./B.Tech). Final year appearing candidates eligible.',
    officialPortalUrl: 'https://upsc.gov.in',
    officialPortalName: 'UPSC Official Portal (upsconline.nic.in)',
    description:
      'Premier entrance examination conducted bi-annually by UPSC for gentlemen cadets seeking Permanent Commission into the Indian Military Academy (IMA), Indian Naval Academy (INA), or Air Force Academy (AFA). Written exam has 3 papers including Elementary Mathematics (300 Marks).',
    keyResponsibilities:
      'Permanent Commission command in Army Combat Arms (Infantry, Artillery, Armoured Corps), Warship Bridge & Systems (Navy), or Combat Fighter/Transport squadrons (Air Force).',
    ssbDuration: '5 Days SSB / AFSB (Service Selection Board)',
    availableStreams: [
      {
        name: 'Indian Military Academy (IMA), Dehradun',
        shortName: 'IMA (Army PC)',
        academy: 'IMA Dehradun',
        commission: 'Permanent Commission (Male Only)',
        ageRange: '19 to 24 Years',
        qualification: 'Degree in any discipline (Appearing / Passed)',
      },
      {
        name: 'Indian Naval Academy (INA), Ezhimala',
        shortName: 'INA (Navy PC)',
        academy: 'INA Ezhimala, Kerala',
        commission: 'Permanent Commission (Male Only)',
        ageRange: '19 to 24 Years',
        qualification: 'Degree in Engineering (B.E. / B.Tech)',
      },
      {
        name: 'Air Force Academy (AFA), Dundigal',
        shortName: 'AFA (Air Force PC)',
        academy: 'AFA Dundigal, Hyderabad',
        commission: 'Permanent Commission (Flying Branch)',
        ageRange: '20 to 24 Years (up to 26 yrs for DGCA CPL holders)',
        qualification: 'Graduation with 10+2 Physics & Maths OR B.E./B.Tech',
      },
    ],
    selectionProcess: [
      'UPSC CDS Written Exam (English 100M, GK 100M, Elementary Mathematics 100M = 300 Marks, 6 Hours)',
      '5-Day SSB / AFSB Interview for shortlisted candidates based on academy-wise cut-offs',
      'Special Medical Board Examination at Military / Air Force / Naval Base Hospitals',
      'UPSC All-India Merit List based on aggregate written + SSB marks'
    ],
    examPattern: {
      subjects: [
        'English (100 Marks - 2 Hours)',
        'General Knowledge (100 Marks - 2 Hours)',
        'Elementary Mathematics (100 Marks - 2 Hours)'
      ],
      duration: '6 Hours total (3 papers of 2 hrs each)',
      totalMarks: '300 Marks',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 24, 6);

      for (const y of years) {
        // CDS 1 of Year Y (Exam in April, Expiry: May 1)
        // Course commences: Jan Y+1 (IMA Jan course)
        // UPSC official cutoff: Born not earlier than 2nd Jan (Y-23) [or Y-25 for CPL] and not later than 1st Jan (Y-18)
        if (!isCycleConcluded(y, 5, 1)) {
          const cds1MinDob = profile.hasCPL
            ? formatDate(y - 25, 1, 2)
            : formatDate(y - 23, 1, 2);
          const cds1MaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `CDS 1 ${y} (IMA/INA/AFA)`,
            courseName: `CDS-1 ${y} (IMA Jan ${y + 1} / INA & AFA Jan ${y + 1})`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Dec ${y - 1} - Jan ${y}`,
            applicationWindow: `Dec ${y - 1} - Jan ${y}`,
            examDate: `April ${y}`,
            ssbPeriod: `Aug - Nov ${y}`,
            minDob: cds1MinDob,
            maxDob: cds1MaxDob,
            isEligible: isDobInRange(profile.dob, cds1MinDob, cds1MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // CDS 2 of Year Y (Exam in Sept, Expiry: Oct 1)
        // Course commences: July Y+1 (IMA July course)
        // UPSC official cutoff: Born not earlier than 2nd July (Y-23) [or Y-25 for CPL] and not later than 1st July (Y-18)
        if (!isCycleConcluded(y, 10, 1)) {
          const cds2MinDob = profile.hasCPL
            ? formatDate(y - 25, 7, 2)
            : formatDate(y - 23, 7, 2);
          const cds2MaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `CDS 2 ${y} (IMA/INA/AFA)`,
            courseName: `CDS-2 ${y} (IMA July ${y + 1} / INA & AFA July ${y + 1})`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `May - June ${y}`,
            applicationWindow: `May - June ${y}`,
            examDate: `September ${y}`,
            ssbPeriod: `Jan - April ${y + 1}`,
            minDob: cds2MinDob,
            maxDob: cds2MaxDob,
            isEligible: isDobInRange(profile.dob, cds2MinDob, cds2MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 1B. OFFICERS TRAINING ACADEMY (CDS OTA CHENNAI - UPSC)
  // (Short Service Commission for Men & Women with extended 19–25 age limit: +2 extra attempts)
  // ==========================================
  {
    id: 'cds_ota_chennai',
    name: 'Officers Training Academy (CDS OTA Chennai - UPSC)',
    shortCode: 'CDS OTA (UPSC)',
    force: 'ARMY',
    academy: 'Officers Training Academy (OTA), Chennai',
    commission: 'SHORT_SERVICE',
    entryType: 'UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19,
    maxAgeYears: 25,
    ageCriteriaDescription:
      '19 to 25 years as on 1st day of month course commences (April / October). Extends 1 full year beyond IMA/INA/AFA, giving exactly 2 additional attempts after IMA attempts are exhausted at 24. Open to Men & Women.',
    educationCriteriaDescription:
      'Degree of a recognized University in any discipline (BA, BSc, BCom, BBA, B.Tech, etc.) or appearing in final year. No Elementary Mathematics paper in written exam.',
    officialPortalUrl: 'https://upsc.gov.in',
    officialPortalName: 'UPSC Official Portal (upsconline.nic.in)',
    description:
      'Conducted bi-annually by UPSC for both Gentlemen and Lady Cadets for Short Service Commission in the Indian Army at OTA Chennai. Candidates take only 2 papers (English 100M & GK 100M, total 200M; No Mathematics paper) and enjoy an extended 19–25 age bracket providing 2 additional attempts (+1 year) beyond IMA/INA/AFA.',
    keyResponsibilities:
      'Short Service Commission (10+4 years with Permanent Commission option) in Combat Arms (Infantry, Artillery, Armoured Corps), Support Arms (Signals, Engineers, EME), and Services (ASC, AOC, Intelligence).',
    ssbDuration: '5 Days SSB (Service Selection Board)',
    directSSBNotes:
      'OTA Chennai offers 2 extra attempts (up to age 25) after IMA/INA/AFA eligibility expires at age 24. Written exam consists of only English and GK (200 marks, no Maths paper). Open to both Men & Women.',
    availableStreams: [
      {
        name: 'OTA SSC Non-Technical (Men)',
        shortName: 'OTA Men (SSC)',
        academy: 'OTA Chennai',
        commission: 'Short Service Commission (14 Years)',
        ageRange: '19 to 25 Years (+2 extra attempts over IMA)',
        qualification: 'Degree in any discipline (No Maths paper in CDS)',
      },
      {
        name: 'OTA SSC Non-Technical (Women)',
        shortName: 'OTA Women (SSC)',
        academy: 'OTA Chennai',
        commission: 'Short Service Commission (14 Years)',
        ageRange: '19 to 25 Years (Open to Lady Cadets)',
        qualification: 'Degree in any discipline (No Maths paper in CDS)',
      },
    ],
    selectionProcess: [
      'UPSC CDS OTA Written Exam (English 100M & GK 100M = 200 Marks, 4 Hours; No Maths paper)',
      '5-Day SSB Interview at Selection Centres (Allahabad, Bhopal, Bengaluru, Jalandhar)',
      'Medical Examination at Military Base Hospitals',
      'UPSC All-India OTA Merit List based on aggregate written + SSB marks'
    ],
    examPattern: {
      subjects: [
        'English (100 Marks - 2 Hours)',
        'General Knowledge (100 Marks - 2 Hours)'
      ],
      duration: '4 Hours total (2 papers of 2 hrs each - No Maths paper)',
      totalMarks: '200 Marks',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        // CDS 1 OTA of Year Y (Exam in April, Expiry: May 1)
        // Course commences: April Y+1 (OTA April course)
        // UPSC official cutoff: Born not earlier than 2nd Jan (Y-24) and not later than 1st Jan (Y-18)
        // (Note: This is exactly 1 full year / 2 cycles older than IMA cutoff 2nd Jan Y-23!)
        if (!isCycleConcluded(y, 5, 1)) {
          const cds1OtaMinDob = formatDate(y - 24, 1, 2);
          const cds1OtaMaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `CDS 1 OTA ${y}`,
            courseName: `CDS-1 OTA April ${y + 1} Course (SSC Men & Women)`,
            courseJoiningDate: `April ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 4, 1),
            notificationMonth: `Dec ${y - 1} - Jan ${y}`,
            applicationWindow: `Dec ${y - 1} - Jan ${y}`,
            examDate: `April ${y}`,
            ssbPeriod: `Aug - Nov ${y}`,
            minDob: cds1OtaMinDob,
            maxDob: cds1OtaMaxDob,
            isEligible: isDobInRange(profile.dob, cds1OtaMinDob, cds1OtaMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // CDS 2 OTA of Year Y (Exam in Sept, Expiry: Oct 1)
        // Course commences: October Y+1 (OTA October course)
        // UPSC official cutoff: Born not earlier than 2nd July (Y-24) and not later than 1st July (Y-18)
        // (Note: Exactly 1 full year / 2 cycles older than IMA cutoff 2nd July Y-23!)
        if (!isCycleConcluded(y, 10, 1)) {
          const cds2OtaMinDob = formatDate(y - 24, 7, 2);
          const cds2OtaMaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `CDS 2 OTA ${y}`,
            courseName: `CDS-2 OTA October ${y + 1} Course (SSC Men & Women)`,
            courseJoiningDate: `October ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 10, 1),
            notificationMonth: `May - June ${y}`,
            applicationWindow: `May - June ${y}`,
            examDate: `September ${y}`,
            ssbPeriod: `Jan - April ${y + 1}`,
            minDob: cds2OtaMinDob,
            maxDob: cds2OtaMaxDob,
            isEligible: isDobInRange(profile.dob, cds2OtaMinDob, cds2OtaMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 2. NATIONAL DEFENCE ACADEMY (NDA & NA) - UPSC
  // (Consolidated Army, Navy, Air Force & Naval Academy)
  // ==========================================
  {
    id: 'nda_combined_upsc',
    name: 'National Defence Academy & Naval Academy (NDA & NA - UPSC)',
    shortCode: 'NDA & NA (UPSC)',
    force: 'ARMY',
    academy: 'NDA Khadakwasla, Pune & INA Ezhimala (10+2 Executive)',
    commission: 'PERMANENT',
    entryType: 'UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 16.5,
    maxAgeYears: 19.5,
    ageCriteriaDescription:
      '16.5 to 19.5 years on the 1st day of the month course commences (Jan / July). Single UPSC exam for Army, Navy, Air Force wings and Naval Academy.',
    educationCriteriaDescription:
      'Army Wing: 12th Class pass/appearing (Any stream). Air Force, Navy Wings & Naval Academy: 12th Class with Physics, Chemistry & Mathematics (PCM).',
    officialPortalUrl: 'https://upsc.gov.in',
    officialPortalName: 'UPSC Official Portal (upsconline.nic.in)',
    description:
      'The premier joint tri-services military training academy producing commissioned officers for the Indian Army, Navy, and Air Force with a full 3-year degree from JNU followed by 1 year at IMA/INA/AFA.',
    keyResponsibilities:
      'Permanent Commission leadership in combat arms, warships, and combat aircraft squadrons.',
    ssbDuration: '5 Days SSB / AFSB',
    availableStreams: [
      {
        name: 'Army Wing (NDA)',
        shortName: 'NDA Army',
        academy: 'NDA Khadakwasla, Pune & IMA Dehradun',
        commission: 'Permanent Commission (Men & Women)',
        ageRange: '16.5 to 19.5 Years',
        qualification: '10+2 (Any stream appearing / passed)',
      },
      {
        name: 'Air Force Wing (NDA Flying & Ground Duty)',
        shortName: 'NDA Air Force',
        academy: 'NDA Khadakwasla, Pune & AFA Dundigal',
        commission: 'Permanent Commission (Men & Women)',
        ageRange: '16.5 to 19.5 Years',
        qualification: '10+2 with Physics and Mathematics',
      },
      {
        name: 'Navy Wing (NDA) & 10+2 Naval Academy (INA)',
        shortName: 'NDA Navy / INA',
        academy: 'NDA Khadakwasla & INA Ezhimala (Cadet Entry)',
        commission: 'Permanent Commission (Men & Women)',
        ageRange: '16.5 to 19.5 Years',
        qualification: '10+2 with Physics and Mathematics',
      },
    ],
    selectionProcess: [
      'UPSC NDA Written Exam (Mathematics 300M + General Ability Test 600M = 900M)',
      '5-Day SSB / AFSB Interview (Screening, Psych, GTO, Personal Interview & Conference = 900M)',
      'Medical Examination at Service Base Hospitals (Special Flight Cadet board for Air Force)',
      'Final UPSC All-India Merit List based on aggregate 1800 marks'
    ],
    examPattern: {
      subjects: [
        'Paper 1: Mathematics (300 Marks - 2.5 Hours)',
        'Paper 2: General Ability Test - English & GK (600 Marks - 2.5 Hours)'
      ],
      duration: '5 Hours total (2.5 hrs per paper)',
      totalMarks: '900 Marks Written + 900 Marks SSB = 1800 Marks',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 19.5, 5);

      for (const y of years) {
        // NDA 1 (Exam in April, Expiry May 1)
        if (!isCycleConcluded(y, 5, 1)) {
          const nda1MinDob = formatDate(y - 19, 7, 2);
          const nda1MaxDob = formatDate(y - 16, 7, 1);
          cycles.push({
            cycleName: `NDA 1 ${y}`,
            courseName: `${148 + (y - 2022) * 2}th NDA & ${110 + (y - 2022) * 2}th INAC Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Dec ${y - 1} - Jan ${y}`,
            applicationWindow: `Dec ${y - 1} - Jan ${y}`,
            examDate: `April ${y}`,
            ssbPeriod: `Aug - Nov ${y}`,
            minDob: nda1MinDob,
            maxDob: nda1MaxDob,
            isEligible: isDobInRange(profile.dob, nda1MinDob, nda1MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // NDA 2 (Exam in Sept, Expiry Oct 1)
        if (!isCycleConcluded(y, 10, 1)) {
          const nda2MinDob = formatDate(y - 18, 1, 2);
          const nda2MaxDob = formatDate(y - 15, 1, 1);
          cycles.push({
            cycleName: `NDA 2 ${y}`,
            courseName: `${149 + (y - 2022) * 2}th NDA & ${111 + (y - 2022) * 2}th INAC Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `May - June ${y}`,
            applicationWindow: `May - June ${y}`,
            examDate: `September ${y}`,
            ssbPeriod: `Jan - April ${y + 1}`,
            minDob: nda2MinDob,
            maxDob: nda2MaxDob,
            isEligible: isDobInRange(profile.dob, nda2MinDob, nda2MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 3. 10+2 TECHNICAL ENTRY SCHEME (TES) - ARMY
  // ==========================================
  {
    id: 'army_tes',
    name: '10+2 Technical Entry Scheme (TES - Army Direct SSB)',
    shortCode: '10+2 TES',
    force: 'ARMY',
    academy: 'Cadet Training Wings (CME Pune / MCTE Mhow / MCEME Secunderabad) & IMA Dehradun',
    commission: 'PERMANENT',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE'],
    minAgeYears: 16.5,
    maxAgeYears: 19.5,
    ageCriteriaDescription: '16.5 to 19.5 years on course commencement (Jan / July). Unmarried male candidates.',
    educationCriteriaDescription:
      'Passed 10+2 examination or equivalent with minimum aggregate of 60% marks in Physics, Chemistry and Mathematics (PCM) + Appeared in JEE (Mains).',
    officialPortalUrl: 'https://joinindianarmy.nic.in',
    officialPortalName: 'Join Indian Army Official Portal',
    description:
      'Direct SSB entry for Class 12 Science PCM students leading to a permanent commission in the Indian Army and a fully funded 4-year B.Tech Engineering Degree alongside military training.',
    keyResponsibilities: 'Corps of Engineers, Corps of Signals, EME, Mechanised Forces technical command.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes:
      'No written examination. Candidates are shortlisted directly for 5-Day SSB based on JEE (Mains) All India CRL Rank and 10+2 PCM percentage.',
    selectionProcess: [
      'Shortlisting based on JEE (Mains) All-India CRL cutoff published by Army Headquarters',
      '5-Day SSB Interview at Army Selection Centres (Allahabad, Bhopal, Bengaluru, Jalandhar)',
      'Special Medical Examination at Military Hospitals',
      'Final Merit List by Directorate General of Recruiting'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 19.5, 5);

      for (const y of years) {
        // TES Jan Course (Apps in May-July Y, Expiry Aug 1)
        if (!isCycleConcluded(y, 8, 1)) {
          const tesJanMinDob = formatDate(y - 19, 7, 2);
          const tesJanMaxDob = formatDate(y - 16, 7, 1);
          cycles.push({
            cycleName: `TES ${51 + (y - 2024) * 2} (Jan Course)`,
            courseName: `TES-${51 + (y - 2024) * 2} Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `May - June ${y}`,
            applicationWindow: `May - July ${y}`,
            examDate: 'Direct SSB (Shortlisting on JEE Main CRL)',
            ssbPeriod: `Aug - Oct ${y}`,
            minDob: tesJanMinDob,
            maxDob: tesJanMaxDob,
            isEligible: isDobInRange(profile.dob, tesJanMinDob, tesJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // TES July Course (Apps Nov-Dec Y, Expiry Jan 1 Y+1)
        if (!isCycleConcluded(y, 12, 31)) {
          const tesJulyMinDob = formatDate(y - 18, 1, 2);
          const tesJulyMaxDob = formatDate(y - 15, 1, 1);
          cycles.push({
            cycleName: `TES ${52 + (y - 2024) * 2} (July Course)`,
            courseName: `TES-${52 + (y - 2024) * 2} Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Nov - Dec ${y}`,
            applicationWindow: `Nov - Dec ${y}`,
            examDate: 'Direct SSB (Shortlisting on JEE Main CRL)',
            ssbPeriod: `Feb - April ${y + 1}`,
            minDob: tesJulyMinDob,
            maxDob: tesJulyMaxDob,
            isEligible: isDobInRange(profile.dob, tesJulyMinDob, tesJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 4. 10+2 B.TECH CADET ENTRY SCHEME - INDIAN NAVY
  // ==========================================
  {
    id: 'navy_10_plus_2_btech',
    name: '10+2 (B.Tech) Cadet Entry Scheme - Indian Navy (Direct SSB)',
    shortCode: '10+2 Navy B.Tech',
    force: 'NAVY',
    academy: 'Indian Naval Academy (INA), Ezhimala, Kerala',
    commission: 'PERMANENT',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 16.5,
    maxAgeYears: 19.5,
    ageCriteriaDescription: '16.5 to 19.5 years on course commencement date (Jan / July). Open to unmarried Men & Women.',
    educationCriteriaDescription:
      'Passed 10+2 or equivalent with minimum 70% aggregate marks in Physics, Chemistry & Maths (PCM) and min 50% in English in 10th or 12th + Appeared in JEE (Mains).',
    officialPortalUrl: 'https://joinindiannavy.gov.in',
    officialPortalName: 'Join Indian Navy Portal',
    description:
      'Direct SSB entry for high-performing 10+2 Science students offering a fully funded 4-year B.Tech Engineering Degree from JNU at INA Ezhimala and Permanent Commission in Executive, Engineering, or Electrical branches.',
    keyResponsibilities:
      'Naval Surface Operations, Marine Propulsion Engineering, Weapon Systems, Submarines & Naval Aviation.',
    ssbDuration: '5 Days Direct SSB (Naval Selection Boards)',
    directSSBNotes:
      'Shortlisting for 5-Day SSB is conducted purely based on JEE (Mains) All India CRL Rank.',
    selectionProcess: [
      'Shortlisting based on JEE (Mains) CRL cutoff released by Naval Headquarters',
      '5-Day SSB Interview at Naval Selection Boards (Bhopal, Bangalore, Visakhapatnam, Kolkata)',
      'Naval Special Medical Board (SMB)',
      'All-India Final Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 19.5, 5);

      for (const y of years) {
        // Jan Course (Apps in June-July Y, Expiry Aug 1)
        if (!isCycleConcluded(y, 8, 1)) {
          const navyJanMinDob = formatDate(y - 19, 7, 2);
          const navyJanMaxDob = formatDate(y - 16, 7, 1);
          cycles.push({
            cycleName: `Navy B.Tech (Jan ${y + 1} Batch)`,
            courseName: `10+2 B.Tech INA Jan ${y + 1} Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `June - July ${y}`,
            applicationWindow: `June - July ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Sept - Nov ${y}`,
            minDob: navyJanMinDob,
            maxDob: navyJanMaxDob,
            isEligible: isDobInRange(profile.dob, navyJanMinDob, navyJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // July Course (Apps Dec Y - Jan Y+1, Expiry Feb 1 Y+1)
        if (!isCycleConcluded(y, 12, 31)) {
          const navyJulyMinDob = formatDate(y - 18, 1, 2);
          const navyJulyMaxDob = formatDate(y - 15, 1, 1);
          cycles.push({
            cycleName: `Navy B.Tech (July ${y + 1} Batch)`,
            courseName: `10+2 B.Tech INA July ${y + 1} Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Nov - Dec ${y}`,
            applicationWindow: `Dec ${y} - Jan ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Mar - May ${y + 1}`,
            minDob: navyJulyMinDob,
            maxDob: navyJulyMaxDob,
            isEligible: isDobInRange(profile.dob, navyJulyMinDob, navyJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 5. AIR FORCE COMMON ADMISSION TEST (AFCAT) - IAF
  // (Consolidated Flying, Ground Duty Tech & Non-Tech)
  // ==========================================
  {
    id: 'afcat_combined_iaf',
    name: 'Air Force Common Admission Test (AFCAT - Flying & Ground Duty)',
    shortCode: 'AFCAT (IAF)',
    force: 'AIR_FORCE',
    academy: 'Air Force Academy (AFA), Dundigal, Hyderabad',
    commission: 'SHORT_SERVICE',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 20,
    maxAgeYears: 26,
    ageCriteriaDescription:
      'Flying Branch: 20–24 yrs (up to 26 yrs for DGCA CPL holders) | Ground Duty (Tech & Non-Tech): 20–26 yrs on course commencement (Jan / July). Single AFCAT exam for all branches.',
    educationCriteriaDescription:
      'Graduation Degree (min 60%) in any stream OR B.E./B.Tech (min 60%). Flying branch requires min 50% in Maths & Physics in 10+2. Technical Ground Duty requires recognized Engineering Degree.',
    officialPortalUrl: 'https://afcat.cdac.in',
    officialPortalName: 'IAF AFCAT Official Portal (afcat.cdac.in)',
    description:
      'Premier entrance examination conducted bi-annually by the Indian Air Force via CDAC for officer selection in Flying Branch (Fighters, Transports, Helicopters), Ground Duty Technical, and Ground Duty Non-Technical branches.',
    keyResponsibilities:
      'Combat Flying, Air Traffic Control, Weapon Systems, Radar Operations, Engineering, Logistics, Administration & Accounts.',
    ssbDuration: '5 Days AFSB (Air Force Selection Board) + CPSS (for Flying)',
    availableStreams: [
      {
        name: 'Flying Branch (Pilots)',
        shortName: 'AFCAT Flying',
        academy: 'AFA Dundigal, Hyderabad',
        commission: 'Short Service Commission (Men & Women)',
        ageRange: '20 to 24 Years (26 with DGCA CPL)',
        qualification: 'Graduation / B.Tech (min 60%) + 10+2 Maths & Physics (min 50%)',
      },
      {
        name: 'Ground Duty - Technical (Aeronautical Engg)',
        shortName: 'AFCAT GD (Tech)',
        academy: 'AFA Dundigal & Air Force Technical College (AFTC) Bengaluru',
        commission: 'Permanent & Short Service Commission',
        ageRange: '20 to 26 Years',
        qualification: '4-year B.E. / B.Tech Engineering Degree with min 60% aggregate',
      },
      {
        name: 'Ground Duty - Non-Technical (Admin, Logistics, Accounts, Education)',
        shortName: 'AFCAT GD (Non-Tech)',
        academy: 'AFA Dundigal, Hyderabad',
        commission: 'Permanent & Short Service Commission',
        ageRange: '20 to 26 Years',
        qualification: 'Graduate Degree in any discipline with min 60% marks',
      },
    ],
    selectionProcess: [
      'AFCAT Online CBT Examination (100 Questions, 300 Marks - General Awareness, Verbal Ability, Numerical Ability, Reasoning)',
      '5-Day AFSB Testing (Dehradun, Mysuru, Gandhinagar, Varanasi, Guwahati)',
      'Computerised Pilot Selection System (CPSS) test for Flying Branch qualifiers (once-in-a-lifetime test)',
      'Medical Examination at Air Force Central Medical Establishment (AFCME)',
      'IAF All-India Final Merit List'
    ],
    examPattern: {
      subjects: [
        'General Awareness',
        'Verbal Ability in English',
        'Numerical Ability',
        'Reasoning & Military Aptitude'
      ],
      duration: '2 Hours (120 Minutes)',
      totalMarks: '300 Marks (100 Questions @ 3 marks each)',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 26, 6);

      for (const y of years) {
        // AFCAT 1 of Year Y (Exam in Feb, Expiry March 1)
        if (!isCycleConcluded(y, 3, 1)) {
          // Broadest AFCAT cutoff (20 to 26 yrs for Ground Duty): 2nd Jan Y-25 to 1st Jan Y-19
          const afcat1MinDob = formatDate(y - 25, 1, 2);
          const afcat1MaxDob = formatDate(y - 19, 1, 1);
          cycles.push({
            cycleName: `AFCAT 1 ${y}`,
            courseName: `${217 + (y - 2024) * 2} F(P) / Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Dec ${y - 1}`,
            applicationWindow: `Dec 1 - Dec 30 ${y - 1}`,
            examDate: `February ${y}`,
            ssbPeriod: `May - Aug ${y}`,
            minDob: afcat1MinDob,
            maxDob: afcat1MaxDob,
            isEligible: isDobInRange(profile.dob, afcat1MinDob, afcat1MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // AFCAT 2 of Year Y (Exam in August, Expiry Sept 1)
        if (!isCycleConcluded(y, 9, 1)) {
          const afcat2MinDob = formatDate(y - 25, 7, 2);
          const afcat2MaxDob = formatDate(y - 19, 7, 1);
          cycles.push({
            cycleName: `AFCAT 2 ${y}`,
            courseName: `${218 + (y - 2024) * 2} F(P) / Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `June ${y}`,
            applicationWindow: `June 1 - June 30 ${y}`,
            examDate: `August ${y}`,
            ssbPeriod: `Nov ${y} - Feb ${y + 1}`,
            minDob: afcat2MinDob,
            maxDob: afcat2MaxDob,
            isEligible: isDobInRange(profile.dob, afcat2MinDob, afcat2MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 6. TECHNICAL GRADUATE COURSE (TGC) - ARMY
  // ==========================================
  {
    id: 'army_tgc',
    name: 'Technical Graduate Course (TGC - Army IMA Direct SSB)',
    shortCode: 'TGC (Army)',
    force: 'ARMY',
    academy: 'Indian Military Academy (IMA), Dehradun',
    commission: 'PERMANENT',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE'],
    minAgeYears: 20,
    maxAgeYears: 27,
    ageCriteriaDescription: '20 to 27 years on 1st day of month in which course starts (Jan / July). Male Engineering Graduates.',
    educationCriteriaDescription:
      'Candidates who have passed Engineering Degree (B.E. / B.Tech) or are in the final year of Engineering Degree in notified technical streams.',
    officialPortalUrl: 'https://joinindianarmy.nic.in',
    officialPortalName: 'Join Indian Army Official Portal',
    description:
      'Direct entry offering Permanent Commission at IMA Dehradun for engineering graduates with no written exam requirement. Directly shortlisted for 5-Day SSB based on engineering semester aggregate cutoffs.',
    keyResponsibilities:
      'Corps of Engineers, Corps of Signals, EME, Military Survey, Technical Staff & Combat Arms support.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes:
      'Shortlisting is based on cumulative engineering degree percentage cut-offs declared by the Directorate General of Recruiting.',
    selectionProcess: [
      'Shortlisting based on discipline-wise engineering degree percentage',
      '5-Day SSB Interview at Selection Centres (Allahabad, Bhopal, Bengaluru, Jalandhar)',
      'Comprehensive Medical Board Examination',
      'Directorate General of Recruiting All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 27, 6);

      for (const y of years) {
        // TGC Jan Course (Apps May-June Y, Expiry July 1)
        if (!isCycleConcluded(y, 7, 1)) {
          const tgcJanMinDob = formatDate(y - 26, 1, 2);
          const tgcJanMaxDob = formatDate(y - 19, 1, 1);
          cycles.push({
            cycleName: `TGC ${140 + (y - 2024) * 2} (Jan Course)`,
            courseName: `TGC-${140 + (y - 2024) * 2} IMA Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `April - May ${y}`,
            applicationWindow: `May - June ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Aug - Nov ${y}`,
            minDob: tgcJanMinDob,
            maxDob: tgcJanMaxDob,
            isEligible: isDobInRange(profile.dob, tgcJanMinDob, tgcJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // TGC July Course (Apps Sept-Oct Y, Expiry Nov 1)
        if (!isCycleConcluded(y, 11, 1)) {
          const tgcJulyMinDob = formatDate(y - 26, 7, 2);
          const tgcJulyMaxDob = formatDate(y - 19, 7, 1);
          cycles.push({
            cycleName: `TGC ${141 + (y - 2024) * 2} (July Course)`,
            courseName: `TGC-${141 + (y - 2024) * 2} IMA Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Sept - Oct ${y}`,
            applicationWindow: `Oct - Nov ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Feb - May ${y + 1}`,
            minDob: tgcJulyMinDob,
            maxDob: tgcJulyMaxDob,
            isEligible: isDobInRange(profile.dob, tgcJulyMinDob, tgcJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 7. SSC (TECHNICAL) MEN & WOMEN - ARMY
  // ==========================================
  {
    id: 'army_ssc_tech',
    name: 'Short Service Commission (SSC Technical) - Army (OTA Chennai)',
    shortCode: 'SSC Tech (Army)',
    force: 'ARMY',
    academy: 'Officers Training Academy (OTA), Chennai',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 20,
    maxAgeYears: 27,
    ageCriteriaDescription:
      '20 to 27 years on 1st day of month in which course commences (April / October). Open to unmarried Men & Women engineering graduates.',
    educationCriteriaDescription:
      'Candidates who have passed the requisite Engineering Degree (B.E. / B.Tech) or are in the final year of Engineering Degree course.',
    officialPortalUrl: 'https://joinindianarmy.nic.in',
    officialPortalName: 'Join Indian Army Official Portal',
    description:
      'Direct SSB entry for male and female engineering graduates leading to a Short Service Commission in the Indian Army (10+4 years with option for Permanent Commission).',
    keyResponsibilities:
      'Technical Arms, Combat Engineers, Telecommunication Signals, EME workshops, Field Ordnance & Logistics.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes:
      'Direct shortlisting for 5-Day SSB based on engineering discipline cutoff percentage.',
    selectionProcess: [
      'Engineering degree percentage shortlisting by Army Headquarters',
      '5-Day SSB Interview at Selection Centres',
      'Special Medical Board Examination',
      'Directorate General of Recruiting All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 27, 6);

      for (const y of years) {
        // April Course (Apps June-July Y, Expiry Aug 1)
        if (!isCycleConcluded(y, 8, 1)) {
          const sscTechAprMinDob = formatDate(y - 26, 4, 2);
          const sscTechAprMaxDob = formatDate(y - 19, 4, 1);
          cycles.push({
            cycleName: `SSC Tech ${63 + (y - 2024) * 2} Men / ${34 + (y - 2024) * 2} Women`,
            courseName: `SSC (Tech) April ${y + 1} Course`,
            courseJoiningDate: `April ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 4, 1),
            notificationMonth: `June - July ${y}`,
            applicationWindow: `June - July ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Nov ${y} - Jan ${y + 1}`,
            minDob: sscTechAprMinDob,
            maxDob: sscTechAprMaxDob,
            isEligible: isDobInRange(profile.dob, sscTechAprMinDob, sscTechAprMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // October Course (Apps Dec Y - Jan Y+1, Expiry Feb 1 Y+1)
        if (!isCycleConcluded(y, 12, 31)) {
          const sscTechOctMinDob = formatDate(y - 26, 10, 2);
          const sscTechOctMaxDob = formatDate(y - 19, 10, 1);
          cycles.push({
            cycleName: `SSC Tech ${64 + (y - 2024) * 2} Men / ${35 + (y - 2024) * 2} Women`,
            courseName: `SSC (Tech) October ${y + 1} Course`,
            courseJoiningDate: `October ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 10, 1),
            notificationMonth: `Dec ${y} - Jan ${y + 1}`,
            applicationWindow: `Dec ${y} - Jan ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `May - July ${y + 1}`,
            minDob: sscTechOctMinDob,
            maxDob: sscTechOctMaxDob,
            isEligible: isDobInRange(profile.dob, sscTechOctMinDob, sscTechOctMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 8. SSC EXECUTIVE (GS & IT) - INDIAN NAVY
  // ==========================================
  {
    id: 'navy_ssc_executive_gs_it',
    name: 'SSC Executive (General Service, Hydro & IT Branch) - Indian Navy',
    shortCode: 'Navy SSC Exec & IT',
    force: 'NAVY',
    academy: 'Indian Naval Academy (INA), Ezhimala, Kerala',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19.5,
    maxAgeYears: 25,
    ageCriteriaDescription: '19.5 to 25 years on course commencement (Jan / July). Open to Men & Women.',
    educationCriteriaDescription:
      'BE/B.Tech in any discipline with min 60% marks OR for IT Branch: B.E./B.Tech (CSE, IT, Cyber, AI/ML) / MCA / M.Sc (Computer Science/IT) with min 60% marks and min 60% in 10th & 12th.',
    officialPortalUrl: 'https://joinindiannavy.gov.in',
    officialPortalName: 'Join Indian Navy Official Portal',
    description:
      'Direct SSB entry for engineering and IT graduates to serve as Executive Naval Officers overseeing warship bridge watchkeeping, naval cyber warfare, IT networks, and hydrographic survey.',
    keyResponsibilities: 'Surface ship operations, Cyber defense, IT systems, C4I infrastructure.',
    ssbDuration: '5 Days Direct SSB (Naval Selection Boards)',
    directSSBNotes:
      'Shortlisting for 5-Day SSB is conducted directly on the basis of candidate graduation / engineering percentage.',
    selectionProcess: [
      'Graduation percentage cut-off shortlisting by Naval HQ',
      '5-Day SSB Interview at Naval Selection Boards (Bhopal, Bangalore, Visakhapatnam, Kolkata)',
      'Naval Medical Board Review',
      'Directorate of Manpower Planning All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        // Jan Course (Apps July-Aug Y, Expiry Sept 1)
        if (!isCycleConcluded(y, 9, 1)) {
          const navyExecJanMinDob = formatDate(y - 24, 1, 2);
          const navyExecJanMaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `Navy SSC Exec & IT (Jan ${y + 1} Course)`,
            courseName: `Navy SSC (Executive & IT) Jan ${y + 1} Batch`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `July - August ${y}`,
            applicationWindow: `July - August ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Sept - Nov ${y}`,
            minDob: navyExecJanMinDob,
            maxDob: navyExecJanMaxDob,
            isEligible: isDobInRange(profile.dob, navyExecJanMinDob, navyExecJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // July Course (Apps Dec Y - Jan Y+1, Expiry Feb 1 Y+1)
        if (!isCycleConcluded(y, 12, 31)) {
          const navyExecJulyMinDob = formatDate(y - 24, 7, 2);
          const navyExecJulyMaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `Navy SSC Exec & IT (July ${y + 1} Course)`,
            courseName: `Navy SSC (Executive & IT) July ${y + 1} Batch`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Dec ${y} - Jan ${y + 1}`,
            applicationWindow: `Dec ${y} - Jan ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Feb - April ${y + 1}`,
            minDob: navyExecJulyMinDob,
            maxDob: navyExecJulyMaxDob,
            isEligible: isDobInRange(profile.dob, navyExecJulyMinDob, navyExecJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 9. SSC TECHNICAL (ENGINEERING & ELECTRICAL) - INDIAN NAVY
  // ==========================================
  {
    id: 'navy_ssc_technical_branch',
    name: 'SSC Technical (Engineering, Marine & Electrical Branches) - Indian Navy',
    shortCode: 'Navy SSC Technical',
    force: 'NAVY',
    academy: 'Indian Naval Academy (INA), Ezhimala & INS Shivaji Lonavala / INS Valsura Jamnagar',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19.5,
    maxAgeYears: 25,
    ageCriteriaDescription: '19.5 to 25 years on course commencement date (Jan / July). Open to Men & Women.',
    educationCriteriaDescription:
      'BE/B.Tech in Mechanical, Marine, Automobile, Industrial, Electrical, Electronics, Telecommunication, Power Engineering with min 60% marks.',
    officialPortalUrl: 'https://joinindiannavy.gov.in',
    officialPortalName: 'Join Indian Navy Official Portal',
    description:
      'Direct SSB entry for technical engineers to maintain warship propulsion systems, gas turbines, marine diesels, submarine systems, radar, sonar, and high-voltage shipboard power grids.',
    keyResponsibilities: 'Warship engineering officer, weapons electrical officer, submarine technical officer.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes: 'Direct SSB shortlisting based on engineering branch graduation percentage.',
    selectionProcess: [
      'Graduation percentage cut-off shortlisting by Naval Headquarters',
      '5-Day SSB Interview at Naval Selection Boards',
      'Special Medical Examination at Naval Base Hospital',
      'All-India Final Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        // Jan Course
        if (!isCycleConcluded(y, 9, 1)) {
          const navyTechJanMinDob = formatDate(y - 24, 1, 2);
          const navyTechJanMaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `Navy SSC Tech (Jan ${y + 1} Batch)`,
            courseName: `Navy SSC (Engineering/Electrical) Jan ${y + 1} Batch`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `July - August ${y}`,
            applicationWindow: `July - August ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Sept - Nov ${y}`,
            minDob: navyTechJanMinDob,
            maxDob: navyTechJanMaxDob,
            isEligible: isDobInRange(profile.dob, navyTechJanMinDob, navyTechJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // July Course
        if (!isCycleConcluded(y, 12, 31)) {
          const navyTechJulyMinDob = formatDate(y - 24, 7, 2);
          const navyTechJulyMaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `Navy SSC Tech (July ${y + 1} Batch)`,
            courseName: `Navy SSC (Engineering/Electrical) July ${y + 1} Batch`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Dec ${y} - Jan ${y + 1}`,
            applicationWindow: `Dec ${y} - Jan ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Feb - April ${y + 1}`,
            minDob: navyTechJulyMinDob,
            maxDob: navyTechJulyMaxDob,
            isEligible: isDobInRange(profile.dob, navyTechJulyMinDob, navyTechJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 10. SSC AVIATION (PILOT, OBSERVER & ATC) - INDIAN NAVY
  // ==========================================
  {
    id: 'navy_ssc_aviation',
    name: 'SSC Aviation (Pilot, Naval Air Operations Officer & ATC) - Indian Navy',
    shortCode: 'Navy SSC Aviation',
    force: 'NAVY',
    academy: 'Indian Naval Academy (INA), Ezhimala & INS Garuda, Kochi',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19,
    maxAgeYears: 24,
    ageCriteriaDescription:
      'Pilot & NAOO (Observer): 19 to 24 years | ATC: 19.5 to 25 years on course commencement. Open to Men & Women.',
    educationCriteriaDescription:
      'BE/B.Tech in any discipline with min 60% marks and min 60% in 10th & 12th with Maths & Physics.',
    officialPortalUrl: 'https://joinindiannavy.gov.in',
    officialPortalName: 'Join Indian Navy Official Portal',
    description:
      'Direct SSB entry to fly naval combat aircraft (MiG-29K, Rafale-M, MH-60R Seahawk, P-8I Neptune) or operate airborne radar systems and Air Traffic Control towers on aircraft carriers and naval air stations.',
    keyResponsibilities:
      'Carrier-based combat flying, anti-submarine warfare, maritime reconnaissance, flight operations.',
    ssbDuration: '5 Days Direct SSB + CPSS (for Pilot branch)',
    directSSBNotes: 'Direct SSB shortlisting based on engineering graduation percentage.',
    selectionProcess: [
      'Graduation percentage cut-off shortlisting',
      '5-Day SSB Interview at Naval Selection Boards',
      'CPSS Pilot Aptitude testing for Pilot applicants',
      'Naval Aviation Special Medical Board (SMB)',
      'Final Naval Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 24, 6);

      for (const y of years) {
        // Jan Batch
        if (!isCycleConcluded(y, 9, 1)) {
          const navyAvJanMinDob = formatDate(y - 23, 1, 2);
          const navyAvJanMaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `Navy Aviation (Jan ${y + 1} Course)`,
            courseName: `Navy SSC Pilot/NAOO/ATC Jan ${y + 1} Batch`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `July - August ${y}`,
            applicationWindow: `July - August ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Sept - Nov ${y}`,
            minDob: navyAvJanMinDob,
            maxDob: navyAvJanMaxDob,
            isEligible: isDobInRange(profile.dob, navyAvJanMinDob, navyAvJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // July Batch
        if (!isCycleConcluded(y, 12, 31)) {
          const navyAvJulyMinDob = formatDate(y - 23, 7, 2);
          const navyAvJulyMaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `Navy Aviation (July ${y + 1} Course)`,
            courseName: `Navy SSC Pilot/NAOO/ATC July ${y + 1} Batch`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Dec ${y} - Jan ${y + 1}`,
            applicationWindow: `Dec ${y} - Jan ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Feb - April ${y + 1}`,
            minDob: navyAvJulyMinDob,
            maxDob: navyAvJulyMaxDob,
            isEligible: isDobInRange(profile.dob, navyAvJulyMinDob, navyAvJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 11. NCC SPECIAL ENTRY SCHEME - ARMY
  // ==========================================
  {
    id: 'army_ncc_special',
    name: 'NCC Special Entry Scheme - Army (OTA Chennai Direct SSB)',
    shortCode: 'NCC Special (Army)',
    force: 'ARMY',
    academy: 'Officers Training Academy (OTA), Chennai',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19,
    maxAgeYears: 25,
    ageCriteriaDescription: '19 to 25 years on 1st day of month in which course commences (April / October). Open to Men & Women.',
    educationCriteriaDescription:
      'Degree of a recognized University or equivalent with aggregate minimum 50% marks + Should have served for minimum 2/3 years in Senior Division/Wing of NCC and obtained minimum "B" Grade in NCC "C" Certificate Examination.',
    officialPortalUrl: 'https://joinindianarmy.nic.in',
    officialPortalName: 'Join Indian Army Official Portal',
    description:
      'Direct SSB entry for NCC Senior Division "C" Certificate holders (Men & Women) with no written exam requirement, leading to a Short Service Commission at OTA Chennai.',
    keyResponsibilities: 'Combat and Staff Officer appointments in the Indian Army.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes:
      'No written exam. Candidates holding valid NCC "C" Certificate with minimum "B" grade and ≥50% in graduation are called directly for 5-Day SSB.',
    selectionProcess: [
      'Document verification and shortlisting based on NCC "C" Certificate grade & degree %',
      '5-Day SSB Interview at Selection Centres (Allahabad, Bhopal, Bengaluru, Kapurthala)',
      'Medical Board Examination at Military Hospitals',
      'Directorate General of Recruiting All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        // April Course (Apps July-Aug Y, Expiry Sept 1)
        if (!isCycleConcluded(y, 9, 1)) {
          const nccAprMinDob = formatDate(y - 24, 1, 2);
          const nccAprMaxDob = formatDate(y - 18, 1, 1);
          cycles.push({
            cycleName: `NCC Special ${56 + (y - 2024) * 2} (April ${y + 1} Course)`,
            courseName: `NCC Special Entry April ${y + 1} Batch`,
            courseJoiningDate: `April ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 4, 1),
            notificationMonth: `July - August ${y}`,
            applicationWindow: `July - August ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Nov ${y} - Jan ${y + 1}`,
            minDob: nccAprMinDob,
            maxDob: nccAprMaxDob,
            isEligible: isDobInRange(profile.dob, nccAprMinDob, nccAprMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // October Course (Apps Jan-Feb Y+1, Expiry March 1 Y+1)
        if (!isCycleConcluded(y, 12, 31)) {
          const nccOctMinDob = formatDate(y - 24, 7, 2);
          const nccOctMaxDob = formatDate(y - 18, 7, 1);
          cycles.push({
            cycleName: `NCC Special ${57 + (y - 2024) * 2} (Oct ${y + 1} Course)`,
            courseName: `NCC Special Entry October ${y + 1} Batch`,
            courseJoiningDate: `October ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 10, 1),
            notificationMonth: `Jan - Feb ${y + 1}`,
            applicationWindow: `Jan - Feb ${y + 1}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `May - July ${y + 1}`,
            minDob: nccOctMinDob,
            maxDob: nccOctMaxDob,
            isEligible: isDobInRange(profile.dob, nccOctMinDob, nccOctMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 12. NCC SPECIAL ENTRY (FLYING BRANCH) - IAF
  // ==========================================
  {
    id: 'iaf_ncc_special_flying',
    name: 'NCC Special Entry (Flying Branch) - Indian Air Force (Direct AFSB)',
    shortCode: 'IAF NCC Flying',
    force: 'AIR_FORCE',
    academy: 'Air Force Academy (AFA), Dundigal, Hyderabad',
    commission: 'PERMANENT',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 20,
    maxAgeYears: 24,
    ageCriteriaDescription: '20 to 24 years on course commencement (Jan / July). Permanent Commission for Men, SSC for Women.',
    educationCriteriaDescription:
      'Minimum 60% in Graduation / B.Tech + 10+2 with Maths & Physics + Air Wing NCC Senior Division "C" Certificate with minimum "B" grade.',
    officialPortalUrl: 'https://afcat.cdac.in',
    officialPortalName: 'IAF Official Portal (afcat.cdac.in)',
    description:
      'Direct AFSB entry for Air Wing NCC "C" certificate holders to become combat pilots in the Indian Air Force with no written examination.',
    keyResponsibilities: 'Fighter, transport, and helicopter pilot operations.',
    ssbDuration: '5 Days AFSB + CPSS Pilot Test',
    directSSBNotes: 'Direct call for 5-Day AFSB testing for qualified Air Wing NCC C holders.',
    selectionProcess: [
      'Air Wing NCC "C" certificate verification',
      '5-Day AFSB testing at Selection Boards',
      'Computerised Pilot Selection System (CPSS)',
      'Air Force Medical Board (AFCME / IAM)',
      'Final IAF All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 24, 6);

      for (const y of years) {
        // Jan Course
        if (!isCycleConcluded(y, 3, 1)) {
          const iafNccJanMinDob = formatDate(y - 23, 1, 2);
          const iafNccJanMaxDob = formatDate(y - 19, 1, 1);
          cycles.push({
            cycleName: `IAF NCC Flying (Jan ${y + 1} Batch)`,
            courseName: `NCC Special Flying Jan ${y + 1} Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Dec ${y - 1} - Jan ${y}`,
            applicationWindow: `Dec ${y - 1} - Jan ${y}`,
            examDate: 'Direct AFSB (No Written Exam)',
            ssbPeriod: `May - Aug ${y}`,
            minDob: iafNccJanMinDob,
            maxDob: iafNccJanMaxDob,
            isEligible: isDobInRange(profile.dob, iafNccJanMinDob, iafNccJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // July Course
        if (!isCycleConcluded(y, 9, 1)) {
          const iafNccJulyMinDob = formatDate(y - 23, 7, 2);
          const iafNccJulyMaxDob = formatDate(y - 19, 7, 1);
          cycles.push({
            cycleName: `IAF NCC Flying (July ${y + 1} Batch)`,
            courseName: `NCC Special Flying July ${y + 1} Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `June ${y}`,
            applicationWindow: `June 1 - June 30 ${y}`,
            examDate: 'Direct AFSB (No Written Exam)',
            ssbPeriod: `Nov ${y} - Feb ${y + 1}`,
            minDob: iafNccJulyMinDob,
            maxDob: iafNccJulyMaxDob,
            isEligible: isDobInRange(profile.dob, iafNccJulyMinDob, iafNccJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 13. JUDGE ADVOCATE GENERAL (JAG) - ARMY
  // ==========================================
  {
    id: 'army_jag',
    name: 'Judge Advocate General (JAG Entry) - Army (OTA Chennai Direct SSB)',
    shortCode: 'JAG Entry (Army)',
    force: 'ARMY',
    academy: 'Officers Training Academy (OTA), Chennai',
    commission: 'SHORT_SERVICE',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 21,
    maxAgeYears: 27,
    ageCriteriaDescription: '21 to 27 years on 1st day of month in which course commences (April / October). Open to Law graduates (Men & Women).',
    educationCriteriaDescription:
      'Minimum 55% aggregate marks in LLB Degree (3-year professional course after graduation or 5-year integrated course after 10+2) + Eligible for registration with Bar Council of India/State.',
    officialPortalUrl: 'https://joinindianarmy.nic.in',
    officialPortalName: 'Join Indian Army Official Portal',
    description:
      'Legal advisory and judicial branch of the Indian Army handling court martials, military law, operational law, and international humanitarian law with a Short Service Commission at OTA Chennai.',
    keyResponsibilities: 'Court Martial proceedings, Military Law advice, Human Rights compliance, Legal advisory.',
    ssbDuration: '5 Days Direct SSB',
    directSSBNotes:
      'Shortlisting for 5-Day SSB is based directly on aggregate percentage in LLB Degree & CLAT PG scores as notified.',
    selectionProcess: [
      'Shortlisting based on LLB aggregate percentage',
      '5-Day SSB Interview at Army Selection Centres',
      'Special Medical Examination at Military Hospitals',
      'Directorate General of Recruiting All-India Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 27, 6);

      for (const y of years) {
        // April Course (Apps Oct-Nov Y, Expiry Dec 1)
        if (!isCycleConcluded(y, 12, 1)) {
          const jagAprMinDob = formatDate(y - 26, 1, 2);
          const jagAprMaxDob = formatDate(y - 20, 1, 1);
          cycles.push({
            cycleName: `JAG ${33 + (y - 2024) * 2} (April ${y + 1} Course)`,
            courseName: `JAG Entry April ${y + 1} Batch`,
            courseJoiningDate: `April ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 4, 1),
            notificationMonth: `Oct - Nov ${y}`,
            applicationWindow: `Oct - Nov ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `Jan - March ${y + 1}`,
            minDob: jagAprMinDob,
            maxDob: jagAprMaxDob,
            isEligible: isDobInRange(profile.dob, jagAprMinDob, jagAprMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // October Course (Apps May-June Y, Expiry July 1)
        if (!isCycleConcluded(y, 7, 1)) {
          const jagOctMinDob = formatDate(y - 26, 7, 2);
          const jagOctMaxDob = formatDate(y - 20, 7, 1);
          cycles.push({
            cycleName: `JAG ${34 + (y - 2024) * 2} (Oct ${y + 1} Course)`,
            courseName: `JAG Entry October ${y + 1} Batch`,
            courseJoiningDate: `October ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 10, 1),
            notificationMonth: `May - June ${y}`,
            applicationWindow: `May - June ${y}`,
            examDate: 'Direct SSB (No Written Exam)',
            ssbPeriod: `July - Sept ${y + 1}`,
            minDob: jagOctMinDob,
            maxDob: jagOctMaxDob,
            isEligible: isDobInRange(profile.dob, jagOctMinDob, jagOctMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 14. ICG ASSISTANT COMMANDANT (GENERAL DUTY & WOMEN SSA)
  // ==========================================
  {
    id: 'icg_ac_gd',
    name: 'Assistant Commandant - General Duty (GD & Women SSA) - Indian Coast Guard',
    shortCode: 'ICG AC (GD)',
    force: 'COAST_GUARD',
    academy: 'Indian Naval Academy (INA), Ezhimala & ICG Academy',
    commission: 'PERMANENT',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 21,
    maxAgeYears: 25,
    ageCriteriaDescription: '21 to 25 years on 1st day of batch commencement (Jan / July). (5 yrs SC/ST, 3 yrs OBC relaxation).',
    educationCriteriaDescription:
      'Bachelor’s Degree with minimum 60% aggregate marks + Minimum 55% marks in Mathematics and Physics at 10+2 level.',
    officialPortalUrl: 'https://joinindiancoastguard.cdac.in',
    officialPortalName: 'Join Indian Coast Guard Portal (CDAC)',
    description:
      'Command offshore patrol vessels, hovercraft, and interceptor boats for maritime security, coastal surveillance, counter-smuggling, and Search & Rescue in the Indian Exclusive Economic Zone (EEZ).',
    keyResponsibilities: 'Coast Guard ship command, boarding operations, maritime law enforcement, pollution response.',
    ssbDuration: 'Stage 1 (CGCAT CBT) + Stage 2 (PSB) + Stage 3 (FSB - 5 Days)',
    selectionProcess: [
      'Stage 1: CGCAT (Computer Based Online Examination)',
      'Stage 2: Preliminary Selection Board (PSB) - CCBT & Picture Perception Test',
      'Stage 3: Final Selection Board (FSB) - 5 Days Psychological, GTO & Interview testing at Noida',
      'Stage 4: Special Medical Examination at Base Hospital',
      'Stage 5: All-India Merit List'
    ],
    examPattern: {
      subjects: [
        'Section I: English (25Q), Reasoning (25Q), Numerical Ability (25Q), General Science/GK (25Q)'
      ],
      duration: '2 Hours (120 Minutes)',
      totalMarks: '400 Marks (100 Questions @ 4 marks each)',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        // 01 Batch (Apps Feb Y, Expiry May 1)
        if (!isCycleConcluded(y, 5, 1)) {
          const icg01MinDob = formatDate(y - 24, 7, 1);
          const icg01MaxDob = formatDate(y - 20, 6, 30);
          cycles.push({
            cycleName: `ICG AC GD (01/${y + 1} Batch)`,
            courseName: `ICG Assistant Commandant 01/${y + 1} Batch`,
            courseJoiningDate: `Dec ${y} / Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Feb ${y}`,
            applicationWindow: `Feb 1 - Feb 15 ${y}`,
            examDate: `March - April ${y}`,
            ssbPeriod: `FSB: June - Aug ${y}`,
            minDob: icg01MinDob,
            maxDob: icg01MaxDob,
            isEligible: isDobInRange(profile.dob, icg01MinDob, icg01MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // 02 Batch (Apps Aug-Sept Y, Expiry Nov 1)
        if (!isCycleConcluded(y, 11, 1)) {
          const icg02MinDob = formatDate(y - 23, 1, 1);
          const icg02MaxDob = formatDate(y - 19, 12, 31);
          cycles.push({
            cycleName: `ICG AC GD (02/${y + 1} Batch)`,
            courseName: `ICG Assistant Commandant 02/${y + 1} Batch`,
            courseJoiningDate: `June / July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Aug - Sept ${y}`,
            applicationWindow: `Aug - Sept ${y}`,
            examDate: `Oct - Nov ${y}`,
            ssbPeriod: `FSB: Dec ${y} - Feb ${y + 1}`,
            minDob: icg02MinDob,
            maxDob: icg02MaxDob,
            isEligible: isDobInRange(profile.dob, icg02MinDob, icg02MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 15. ICG ASSISTANT COMMANDANT (CPL - PILOT SSA)
  // ==========================================
  {
    id: 'icg_ac_cpl',
    name: 'Assistant Commandant - Commercial Pilot License (CPL-SSA) - Indian Coast Guard',
    shortCode: 'ICG AC (CPL Pilot)',
    force: 'COAST_GUARD',
    academy: 'Indian Naval Academy (INA), Ezhimala & Coast Guard Air Stations',
    commission: 'SHORT_SERVICE',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 19,
    maxAgeYears: 25,
    ageCriteriaDescription:
      '19 to 25 years (born between specified cutoff dates) with +2 years age waiver for DGCA CPL holders (up to 27 years). Men & Women.',
    educationCriteriaDescription:
      'Passed 10+2 with minimum 55% in Physics and Mathematics + Valid Commercial Pilot License (CPL) issued by DGCA.',
    officialPortalUrl: 'https://joinindiancoastguard.cdac.in',
    officialPortalName: 'Join Indian Coast Guard Portal (CDAC)',
    description:
      'Direct aviation entry for commercial pilots to fly Coast Guard Dornier 228 maritime patrol aircraft, ALH Dhruv, and Chetak helicopters along the Indian coastline.',
    keyResponsibilities: 'Maritime aerial surveillance, search and rescue, pollution monitoring flights.',
    ssbDuration: 'Stage 1 (CBT) + Stage 2 (PSB) + Stage 3 (FSB) + CPSS',
    hasSpecialWaiver: 'Provides +2 years age relaxation up to 27 years for holders of valid DGCA CPL.',
    selectionProcess: [
      'Stage 1: CGCAT CBT Examination',
      'Stage 2: PSB at regional centres',
      'Stage 3: Final Selection Board (FSB) at Noida',
      'Stage 4: Special Medical Examination at IAM / AFCME'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 27, 6);

      for (const y of years) {
        // 01 Batch
        if (!isCycleConcluded(y, 5, 1)) {
          const cpl01MinDob = formatDate(y - 26, 7, 1);
          const cpl01MaxDob = formatDate(y - 20, 6, 30);
          cycles.push({
            cycleName: `ICG CPL Pilot (01/${y + 1} Batch)`,
            courseName: `ICG AC CPL 01/${y + 1} Batch`,
            courseJoiningDate: `Dec ${y} / Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Feb ${y}`,
            applicationWindow: `Feb 1 - Feb 15 ${y}`,
            examDate: `March - April ${y}`,
            ssbPeriod: `June - Aug ${y}`,
            minDob: cpl01MinDob,
            maxDob: cpl01MaxDob,
            isEligible: isDobInRange(profile.dob, cpl01MinDob, cpl01MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        // 02 Batch
        if (!isCycleConcluded(y, 11, 1)) {
          const cpl02MinDob = formatDate(y - 25, 1, 1);
          const cpl02MaxDob = formatDate(y - 19, 12, 31);
          cycles.push({
            cycleName: `ICG CPL Pilot (02/${y + 1} Batch)`,
            courseName: `ICG AC CPL 02/${y + 1} Batch`,
            courseJoiningDate: `June / July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Aug - Sept ${y}`,
            applicationWindow: `Aug - Sept ${y}`,
            examDate: `Oct - Nov ${y}`,
            ssbPeriod: `Dec ${y} - Feb ${y + 1}`,
            minDob: cpl02MinDob,
            maxDob: cpl02MaxDob,
            isEligible: isDobInRange(profile.dob, cpl02MinDob, cpl02MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 16. ICG ASSISTANT COMMANDANT (TECHNICAL)
  // ==========================================
  {
    id: 'icg_ac_tech',
    name: 'Assistant Commandant - Technical (Mechanical & Electrical) - Indian Coast Guard',
    shortCode: 'ICG AC (Tech)',
    force: 'COAST_GUARD',
    academy: 'Indian Naval Academy (INA), Ezhimala & ICG Technical establishments',
    commission: 'PERMANENT',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE'],
    minAgeYears: 21,
    maxAgeYears: 25,
    ageCriteriaDescription: '21 to 25 years on 1st day of batch commencement (Jan / July). Male engineering graduates.',
    educationCriteriaDescription:
      'Engineering Degree in Mechanical, Marine, Industrial, Production, Electrical, Electronics, Telecommunication, Power with min 60% marks + 10+2 with min 55% in Maths & Physics.',
    officialPortalUrl: 'https://joinindiancoastguard.cdac.in',
    officialPortalName: 'Join Indian Coast Guard Portal (CDAC)',
    description:
      'Technical leadership managing Coast Guard ship propulsion machinery, electrical power stations, weapon sensors, and aircraft maintenance workshops.',
    keyResponsibilities: 'Coast Guard fleet maintenance, drydocking, marine engineering.',
    ssbDuration: 'Stage 1 (CBT) + Stage 2 (PSB) + Stage 3 (FSB)',
    selectionProcess: [
      'Stage 1: CGCAT CBT Exam (General + Engineering subject paper)',
      'Stage 2: PSB testing',
      'Stage 3: 5-Day FSB testing at Noida',
      'Stage 4: Medical Board'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 25, 6);

      for (const y of years) {
        if (!isCycleConcluded(y, 5, 1)) {
          const tech01MinDob = formatDate(y - 24, 7, 1);
          const tech01MaxDob = formatDate(y - 20, 6, 30);
          cycles.push({
            cycleName: `ICG AC Tech (01/${y + 1} Batch)`,
            courseName: `ICG AC Tech 01/${y + 1} Batch`,
            courseJoiningDate: `Dec ${y} / Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Feb ${y}`,
            applicationWindow: `Feb 1 - Feb 15 ${y}`,
            examDate: `March - April ${y}`,
            ssbPeriod: `June - Aug ${y}`,
            minDob: tech01MinDob,
            maxDob: tech01MaxDob,
            isEligible: isDobInRange(profile.dob, tech01MinDob, tech01MaxDob),
            isCurrentOrUpcoming: true
          });
        }

        if (!isCycleConcluded(y, 11, 1)) {
          const tech02MinDob = formatDate(y - 23, 1, 1);
          const tech02MaxDob = formatDate(y - 19, 12, 31);
          cycles.push({
            cycleName: `ICG AC Tech (02/${y + 1} Batch)`,
            courseName: `ICG AC Tech 02/${y + 1} Batch`,
            courseJoiningDate: `June / July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `Aug - Sept ${y}`,
            applicationWindow: `Aug - Sept ${y}`,
            examDate: `Oct - Nov ${y}`,
            ssbPeriod: `Dec ${y} - Feb ${y + 1}`,
            minDob: tech02MinDob,
            maxDob: tech02MaxDob,
            isEligible: isDobInRange(profile.dob, tech02MinDob, tech02MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 17. ICG ASSISTANT COMMANDANT (LAW OFFICER)
  // ==========================================
  {
    id: 'icg_ac_law',
    name: 'Assistant Commandant - Law Officer - Indian Coast Guard',
    shortCode: 'ICG AC (Law)',
    force: 'COAST_GUARD',
    academy: 'Indian Naval Academy (INA), Ezhimala',
    commission: 'PERMANENT',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 21,
    maxAgeYears: 30,
    ageCriteriaDescription: '21 to 30 years (upper age limit 30 years!). Open to Men & Women LLB graduates.',
    educationCriteriaDescription: 'Degree in Law (LLB) with minimum 60% marks from a recognized University.',
    officialPortalUrl: 'https://joinindiancoastguard.cdac.in',
    officialPortalName: 'Join Indian Coast Guard Portal (CDAC)',
    description:
      'Legal advisory officer for maritime boundary disputes, UNCLOS maritime law, anti-piracy prosecution, and Coast Guard court proceedings.',
    keyResponsibilities: 'Maritime legal prosecution, UNCLOS advisory, disciplinary inquiry.',
    ssbDuration: 'Stage 1 + Stage 2 (PSB) + Stage 3 (FSB)',
    selectionProcess: [
      'CGCAT Law screening examination',
      'PSB screening',
      '5-Day FSB testing at Noida',
      'Medical Review'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 30, 6);

      for (const y of years) {
        if (!isCycleConcluded(y, 5, 1)) {
          const law01MinDob = formatDate(y - 29, 7, 1);
          const law01MaxDob = formatDate(y - 20, 6, 30);
          cycles.push({
            cycleName: `ICG Law Officer (01/${y + 1} Batch)`,
            courseName: `ICG Law 01/${y + 1} Batch`,
            courseJoiningDate: `Dec ${y} / Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Feb ${y}`,
            applicationWindow: `Feb 1 - Feb 15 ${y}`,
            examDate: `March - April ${y}`,
            ssbPeriod: `June - Aug ${y}`,
            minDob: law01MinDob,
            maxDob: law01MaxDob,
            isEligible: isDobInRange(profile.dob, law01MinDob, law01MaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 18. IAF METEOROLOGY BRANCH
  // ==========================================
  {
    id: 'iaf_meteorology',
    name: 'Meteorology Branch (Permanent & Short Service) - Indian Air Force',
    shortCode: 'IAF Meteorology',
    force: 'AIR_FORCE',
    academy: 'Air Force Academy (AFA), Dundigal, Hyderabad',
    commission: 'BOTH',
    entryType: 'DIRECT_SSB',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 20,
    maxAgeYears: 26,
    ageCriteriaDescription: '20 to 26 years on course commencement (Jan / July). Open to Post-Graduates (Men & Women).',
    educationCriteriaDescription:
      'Post-Graduate Degree in Science / Physics / Applied Maths / Meteorology / Oceanography / Geo-Physics / Computer Applications / Environmental Science with min 50% aggregate and min 55% in Maths & Physics at Graduation level.',
    officialPortalUrl: 'https://afcat.cdac.in',
    officialPortalName: 'IAF Official Portal (afcat.cdac.in)',
    description:
      'Direct AFSB entry for Post-Graduates to provide aviation weather forecasts, atmospheric analysis, radar weather intelligence, and flight clearance for IAF combat aircraft and missions.',
    keyResponsibilities: 'Combat weather briefing, satellite meteorology, flight safety forecasting.',
    ssbDuration: '5 Days Direct AFSB',
    directSSBNotes: 'Direct AFSB call letter issued based on Post-Graduation percentage.',
    selectionProcess: [
      'Post-Graduation qualification shortlisting',
      '5-Day AFSB testing at Selection Boards',
      'Air Force Medical Board (AFCME)',
      'Final IAF Merit List'
    ],
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 26, 6);

      for (const y of years) {
        if (!isCycleConcluded(y, 3, 1)) {
          const metJanMinDob = formatDate(y - 25, 1, 2);
          const metJanMaxDob = formatDate(y - 19, 1, 1);
          cycles.push({
            cycleName: `IAF Met (Jan ${y + 1} Batch)`,
            courseName: `IAF Meteorology Jan ${y + 1} Course`,
            courseJoiningDate: `Jan ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 1, 1),
            notificationMonth: `Dec ${y - 1} - Jan ${y}`,
            applicationWindow: `Dec ${y - 1} - Jan ${y}`,
            examDate: 'Direct AFSB (No Written Exam)',
            ssbPeriod: `May - Aug ${y}`,
            minDob: metJanMinDob,
            maxDob: metJanMaxDob,
            isEligible: isDobInRange(profile.dob, metJanMinDob, metJanMaxDob),
            isCurrentOrUpcoming: true
          });
        }

        if (!isCycleConcluded(y, 9, 1)) {
          const metJulyMinDob = formatDate(y - 25, 7, 2);
          const metJulyMaxDob = formatDate(y - 19, 7, 1);
          cycles.push({
            cycleName: `IAF Met (July ${y + 1} Batch)`,
            courseName: `IAF Meteorology July ${y + 1} Course`,
            courseJoiningDate: `July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 7, 1),
            notificationMonth: `June ${y}`,
            applicationWindow: `June 1 - June 30 ${y}`,
            examDate: 'Direct AFSB (No Written Exam)',
            ssbPeriod: `Nov ${y} - Feb ${y + 1}`,
            minDob: metJulyMinDob,
            maxDob: metJulyMaxDob,
            isEligible: isDobInRange(profile.dob, metJulyMinDob, metJulyMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  },

  // ==========================================
  // 19. TERRITORIAL ARMY OFFICER (TA)
  // ==========================================
  {
    id: 'army_ta',
    name: 'Territorial Army Officer (Non-Departmental TA - Indian Army)',
    shortCode: 'Territorial Army (TA)',
    force: 'ARMY',
    academy: 'IMA Dehradun / Territorial Army Training Centres',
    commission: 'TERRITORIAL',
    entryType: 'NON_UPSC_EXAM',
    genderEligibility: ['MALE', 'FEMALE'],
    minAgeYears: 18,
    maxAgeYears: 42,
    ageCriteriaDescription: '18 to 42 years on the date of application! Open to gainfully employed civilian graduates.',
    educationCriteriaDescription:
      'Graduation Degree from a recognized University in any discipline + Must be gainfully employed in civil government/semi-govt/private sector or self-employed.',
    officialPortalUrl: 'https://jointerritorialarmy.gov.in',
    officialPortalName: 'Join Territorial Army Official Portal',
    description:
      'Enables gainfully employed citizens and professionals (aged 18 to 42) to don the olive green uniform, undergo military training, and serve the nation in uniform during active deployments while continuing their civilian career.',
    keyResponsibilities: 'Infantry unit command, national disaster relief, rear area security.',
    ssbDuration: 'Stage 1 (PIB CBT Exam) + Stage 2 (5-Day SSB)',
    hasSpecialWaiver: 'Age limit extends up to 42 years for gainfully employed civilian citizens.',
    selectionProcess: [
      'Stage 1: Preliminary Interview Board (PIB) Computer Based Written Test',
      'Stage 2: 5-Day SSB Interview at Selection Centres',
      'Stage 3: Medical Examination at Military Hospitals',
      'Final Merit List by TA Directorate'
    ],
    examPattern: {
      subjects: [
        'Paper 1: Reasoning (50M) & Elementary Mathematics (50M) - 2 Hours',
        'Paper 2: General Knowledge (50M) & English (50M) - 2 Hours'
      ],
      duration: '4 Hours total',
      totalMarks: '200 Marks',
      negativeMarking: true
    },
    generateCycles: (profile: UserProfile) => {
      const cycles: CycleInfo[] = [];
      const years = getDynamicYearsList(profile, 42, 6);

      for (const y of years) {
        if (!isCycleConcluded(y, 12, 15)) {
          const taMinDob = formatDate(y - 42, 12, 2);
          const taMaxDob = formatDate(y - 18, 12, 1);
          cycles.push({
            cycleName: `TA Officer ${y} Cycle`,
            courseName: `Territorial Army ${y} Batch`,
            courseJoiningDate: `April - July ${y + 1}`,
            courseJoiningDateRaw: formatDate(y + 1, 4, 1),
            notificationMonth: `Oct - Nov ${y}`,
            applicationWindow: `Oct - Nov ${y}`,
            examDate: `December ${y}`,
            ssbPeriod: `Feb - April ${y + 1}`,
            minDob: taMinDob,
            maxDob: taMaxDob,
            isEligible: isDobInRange(profile.dob, taMinDob, taMaxDob),
            isCurrentOrUpcoming: true
          });
        }
      }
      return cycles;
    }
  }
];
