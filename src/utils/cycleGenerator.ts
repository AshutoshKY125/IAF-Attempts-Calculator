import { CycleInfo, UserProfile } from '../types/entries';

// Helper to format date strings YYYY-MM-DD
export function formatDate(year: number, month: number, day: number): string {
  const m = month < 10 ? `0${month}` : `${month}`;
  const d = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${m}-${d}`;
}

// Helper to check if a user DOB falls within [minDob, maxDob]
export function isDobInRange(userDob: string, minDob: string, maxDob: string): boolean {
  if (!userDob) return true; // If DOB not yet entered, consider within range for projection
  return userDob >= minDob && userDob <= maxDob;
}

// Dynamic current date reference
export function getReferenceDate(customDate?: Date | string): Date {
  if (customDate) {
    return typeof customDate === 'string' ? new Date(customDate) : customDate;
  }
  return new Date();
}

/**
 * Checks if an exam / application cycle in the current reference year has already concluded.
 * @param cycleYear The year of the cycle (e.g. 2026)
 * @param expiryMonth The month (1-12) when the exam / registration ends for this cycle
 * @param expiryDay The day of the month
 * @param refDate Current system date
 */
export function isCycleConcluded(
  cycleYear: number,
  expiryMonth: number,
  expiryDay: number = 1,
  refDate: Date = new Date()
): boolean {
  const currentYear = refDate.getFullYear();
  if (cycleYear < currentYear) return true;
  if (cycleYear > currentYear) return false;

  // In the same year, compare with expiry date
  const expiryDate = new Date(cycleYear, expiryMonth - 1, expiryDay, 23, 59, 59);
  return refDate.getTime() > expiryDate.getTime();
}

/**
 * Generates an array of future years starting from the current year up to the user's maximum age limit.
 * If no DOB is entered, defaults to generating 6 years into the future.
 */
export function getDynamicYearsList(
  profile: UserProfile,
  maxAgeYears: number = 28,
  minYearsSpan: number = 6,
  refDate: Date = new Date()
): number[] {
  const currentYear = refDate.getFullYear();
  let maxYear = currentYear + minYearsSpan;

  if (profile.dob) {
    const birthYear = parseInt(profile.dob.split('-')[0], 10);
    if (!isNaN(birthYear)) {
      const userMaxYear = birthYear + Math.ceil(maxAgeYears) + 1;
      maxYear = Math.max(currentYear + 2, Math.min(currentYear + 10, userMaxYear));
    }
  }

  const years: number[] = [];
  for (let y = currentYear; y <= maxYear; y++) {
    years.push(y);
  }
  return years;
}
