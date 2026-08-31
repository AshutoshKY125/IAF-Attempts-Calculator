import { ALL_ARMED_FORCES_ENTRIES } from '../data/armedForcesEntries';
import {
  ArmedForcesEntry,
  EvaluatedEntry,
  UserProfile,
} from '../types/entries';

export function evaluateUserEligibility(
  profile: UserProfile
): EvaluatedEntry[] {
  if (!profile.dob || !profile.gender || !profile.educationLevel) {
    return [];
  }

  return ALL_ARMED_FORCES_ENTRIES.map((entry) => {
    const reasons: string[] = [];

    // 1. Gender check
    if (!entry.genderEligibility.includes(profile.gender as 'MALE' | 'FEMALE')) {
      reasons.push(
        `Open only for ${entry.genderEligibility.join(' / ')} candidates.`
      );
    }

    // 2. Education qualification check
    const eduCheck = checkEducationEligibility(entry, profile);
    if (!eduCheck.isEligible) {
      reasons.push(...eduCheck.reasons);
    }

    // 3. Optional specific filter checks (NCC, Law, Employment, CPL)
    const extraCheck = checkSpecialFilters(entry, profile);
    if (!extraCheck.isEligible) {
      reasons.push(...extraCheck.reasons);
    }

    // 4. Generate all cycles and filter by DOB
    const allCycles = entry.generateCycles(profile);
    const eligibleCycles = allCycles.filter((c) => c.isEligible);

    // 5. Calculate eligible streams for multi-stream entries
    const eligibleStreams = getEligibleStreams(entry, profile);

    // If educational / gender checks failed, mark all cycles ineligible with reason
    if (reasons.length > 0) {
      return {
        entry,
        isEligible: false,
        eligibleCycles: [],
        eligibleStreams,
        reasonsIfNotEligible: reasons
      };
    }

    // If no cycles match DOB
    if (eligibleCycles.length === 0) {
      const minAgeDesc = `${entry.minAgeYears} to ${entry.maxAgeYears} years`;
      reasons.push(
        `Date of Birth (${profile.dob}) does not fall in the active cutoff age window for upcoming ${entry.shortCode} cycles (${minAgeDesc}).`
      );
      return {
        entry,
        isEligible: false,
        eligibleCycles: [],
        eligibleStreams,
        reasonsIfNotEligible: reasons
      };
    }

    // Sort eligible cycles by joining date
    eligibleCycles.sort(
      (a, b) =>
        new Date(a.courseJoiningDateRaw).getTime() -
        new Date(b.courseJoiningDateRaw).getTime()
    );

    return {
      entry,
      isEligible: true,
      eligibleCycles,
      nextEligibleCycle: eligibleCycles[0],
      eligibleStreams,
      reasonsIfNotEligible: []
    };
  });
}

function getEligibleStreams(entry: ArmedForcesEntry, profile: UserProfile): string[] {
  const edu = profile.educationLevel;
  const isMale = profile.gender === 'MALE';
  const isFemale = profile.gender === 'FEMALE';
  const isBTech =
    edu === 'BTECH_APPEARING' ||
    edu === 'BTECH_COMPLETED' ||
    (edu === 'POST_GRADUATION' && (profile.enggBranch !== undefined && profile.enggBranch !== 'ANY_ENGG'));
  const has12thSci = profile.hasPCM12th || profile.hasMathsPhysics12th;

  if (entry.id === 'cds_ima_ina_afa') {
    const streams: string[] = [];
    if (isMale) {
      streams.push('IMA Dehradun (Army - Permanent Commission)');
      if (isBTech) {
        streams.push('INA Ezhimala (Navy - Permanent Commission)');
      }
      if (isBTech || has12thSci) {
        streams.push('AFA Dundigal (Air Force - Flying PC)');
      }
    }
    return streams;
  }

  if (entry.id === 'cds_ota_chennai') {
    const streams: string[] = [];
    if (isMale) {
      streams.push('OTA SSC Non-Tech (Men - Army Short Service)');
    } else if (isFemale) {
      streams.push('OTA SSC Non-Tech (Women - Army Short Service)');
    }
    return streams;
  }

  if (entry.id === 'nda_combined_upsc') {
    const streams: string[] = ['Army Wing (NDA)'];
    if (has12thSci) {
      streams.push('Air Force Wing (NDA)');
      streams.push('Navy Wing (NDA)');
      streams.push('10+2 Naval Academy (INA Ezhimala)');
    }
    return streams;
  }

  if (entry.id === 'afcat_combined_iaf') {
    const streams: string[] = [];
    if (has12thSci || isBTech) {
      streams.push('Flying Branch (Pilots)');
    }
    if (isBTech) {
      streams.push('Ground Duty (Technical - Aeronautical Engg)');
    }
    streams.push('Ground Duty (Non-Technical - Admin, Logistics, Accounts, Education)');
    return streams;
  }

  return [];
}

function checkEducationEligibility(
  entry: ArmedForcesEntry,
  profile: UserProfile
): { isEligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const edu = profile.educationLevel;

  // 12th level entries: NDA, 10+2 TES, 10+2 Navy BTech
  const is12thLevelOnlyEntry =
    entry.id === 'nda_combined_upsc' ||
    entry.id === 'army_tes' ||
    entry.id === 'navy_10_plus_2_btech';

  if (is12thLevelOnlyEntry) {
    if (entry.id === 'army_tes') {
      if (!profile.hasPCM12th) {
        reasons.push('Requires 10+2 with Physics, Chemistry & Mathematics (min 60% PCM) + JEE Mains.');
      } else if (
        profile.pcmPercentage !== undefined &&
        profile.pcmPercentage < 60
      ) {
        reasons.push(
          `Requires minimum 60% in PCM at 10+2 level (Current: ${profile.pcmPercentage}%).`
        );
      }
    }

    if (entry.id === 'navy_10_plus_2_btech') {
      if (!profile.hasPCM12th) {
        reasons.push('Requires 10+2 with Physics, Chemistry & Mathematics (min 70% PCM) + JEE Mains.');
      } else if (
        profile.pcmPercentage !== undefined &&
        profile.pcmPercentage < 70
      ) {
        reasons.push(
          `Requires minimum 70% in PCM at 10+2 level (Current: ${profile.pcmPercentage}%).`
        );
      }
    }

    return {
      isEligible: reasons.length === 0,
      reasons
    };
  }

  // Graduate & Technical Entries:
  // If user selected only 12th class, they cannot apply for graduate entries
  if (
    edu === 'CLASS_12_APPEARING' ||
    edu === 'CLASS_12_PASSED'
  ) {
    if (entry.id !== 'nda_combined_upsc' && entry.id !== 'army_tes' && entry.id !== 'navy_10_plus_2_btech') {
      reasons.push(
        'Requires Graduation Degree (or final year) / Engineering Degree.'
      );
      return { isEligible: false, reasons };
    }
  }

  // Engineering required entries:
  const isEnggRequiredEntry =
    entry.id === 'army_tgc' ||
    entry.id === 'army_ssc_tech' ||
    entry.id === 'navy_ssc_technical_branch' ||
    entry.id === 'navy_ssc_executive_gs_it' ||
    entry.id === 'navy_ssc_aviation' ||
    entry.id === 'icg_ac_tech';

  const isBTechOrPG =
    edu === 'BTECH_APPEARING' ||
    edu === 'BTECH_COMPLETED' ||
    edu === 'POST_GRADUATION';

  if (isEnggRequiredEntry) {
    if (!isBTechOrPG) {
      reasons.push(
        'Requires B.E. / B.Tech Engineering degree (or final year appearing).'
      );
    }

    // Check graduation % if provided
    if (
      profile.graduationPercentage !== undefined &&
      profile.graduationPercentage < 60 &&
      (entry.id.startsWith('navy_') || entry.id.startsWith('iaf_') || entry.id.startsWith('icg_'))
    ) {
      reasons.push(
        `Requires minimum 60% aggregate marks in Engineering Degree (Current: ${profile.graduationPercentage}%).`
      );
    }
  }

  // AFCAT requirements
  if (entry.id === 'afcat_combined_iaf') {
    if (
      profile.graduationPercentage !== undefined &&
      profile.graduationPercentage < 60
    ) {
      reasons.push(
        `Requires minimum 60% aggregate marks in Graduation / B.Tech (Current: ${profile.graduationPercentage}%).`
      );
    }
  }

  // Coast Guard GD requires 60% in degree + 55% in 12th Maths & Physics
  if (entry.id === 'icg_ac_gd') {
    if (
      profile.graduationPercentage !== undefined &&
      profile.graduationPercentage < 60
    ) {
      reasons.push('Requires minimum 60% marks in Graduation Degree.');
    }
    if (!profile.hasMathsPhysics12th && !profile.hasPCM12th) {
      reasons.push('Requires Mathematics & Physics at 10+2 level with min 55%.');
    }
  }

  // IAF Meteorology requires Post-Graduation
  if (entry.id === 'iaf_meteorology') {
    if (edu !== 'POST_GRADUATION') {
      reasons.push('Requires Post-Graduate Degree in Science / Physics / Applied Maths / Meteorology / CA / CS.');
    }
  }

  return {
    isEligible: reasons.length === 0,
    reasons
  };
}

function checkSpecialFilters(
  entry: ArmedForcesEntry,
  profile: UserProfile
): { isEligible: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // NCC Special entries
  if (
    entry.id === 'army_ncc_special' ||
    entry.id === 'iaf_ncc_special_flying'
  ) {
    if (!profile.hasNCCCertificate) {
      reasons.push(
        'Requires NCC Senior Division "C" Certificate with minimum "B" grade.'
      );
    } else if (profile.nccGrade === 'C') {
      reasons.push(
        'Requires minimum "B" or "A" grade in NCC "C" certificate (Grade C not accepted).'
      );
    }
  }

  // JAG entries
  if (entry.id === 'army_jag' || entry.id === 'icg_ac_law') {
    if (!profile.hasLawDegree) {
      reasons.push(
        'Requires LLB (Law Degree) with minimum 55% aggregate marks and eligibility for Bar Council.'
      );
    } else if (
      profile.lawPercentage !== undefined &&
      profile.lawPercentage < 55
    ) {
      reasons.push(
        `Requires minimum 55% in LLB (Current: ${profile.lawPercentage}%).`
      );
    }
  }

  // CPL specific entry
  if (entry.id === 'icg_ac_cpl') {
    if (!profile.hasCPL) {
      reasons.push(
        'Requires valid Commercial Pilot License (CPL) issued by DGCA.'
      );
    }
  }

  // Territorial Army
  if (entry.id === 'army_ta') {
    if (profile.isGainfullyEmployed === false) {
      reasons.push(
        'Requires gainful civil employment or self-employed business status.'
      );
    }
  }

  // Marital Status checks for cadet entries
  if (profile.isMarried) {
    if (
      entry.id === 'nda_combined_upsc' ||
      entry.id === 'army_tes' ||
      entry.id === 'navy_10_plus_2_btech'
    ) {
      reasons.push('10+2 Cadet entry requires Unmarried status.');
    }
  }

  return {
    isEligible: reasons.length === 0,
    reasons
  };
}
