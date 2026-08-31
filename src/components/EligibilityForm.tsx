import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  User,
  GraduationCap,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  RotateCcw,
  ArrowDown
} from 'lucide-react';
import { UserProfile, GenderOption, EducationLevel, EnggBranch } from '../types/entries';

interface EligibilityFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  darkMode: boolean;
  onCalculate?: () => void;
  onReset?: () => void;
}

export const EligibilityForm: React.FC<EligibilityFormProps> = ({
  profile,
  setProfile,
  darkMode,
  onCalculate,
  onReset,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleCalculateClick = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setJustCalculated(true);
      if (onCalculate) {
        onCalculate();
      }
      setTimeout(() => {
        setJustCalculated(false);
      }, 3000);
    }, 350);
  };

  // Quick preset loader
  const applyPreset = (preset: '12th_pcm' | 'btech' | 'graduate_general' | 'ncc_cadet') => {
    if (preset === '12th_pcm') {
      setProfile({
        dob: '2008-04-15',
        gender: 'MALE',
        educationLevel: 'CLASS_12_PASSED',
        hasPCM12th: true,
        pcmPercentage: 78,
        hasMathsPhysics12th: true,
        hasNCCCertificate: false,
        hasCPL: false,
        hasLawDegree: false,
        isMarried: false,
        isGainfullyEmployed: false,
        appearedJEEMains: true,
      });
    } else if (preset === 'btech') {
      setProfile({
        dob: '2003-08-20',
        gender: 'MALE',
        educationLevel: 'BTECH_COMPLETED',
        hasPCM12th: true,
        pcmPercentage: 82,
        hasMathsPhysics12th: true,
        enggBranch: 'CSE_IT',
        graduationPercentage: 74,
        hasNCCCertificate: false,
        hasCPL: false,
        hasLawDegree: false,
        isMarried: false,
        isGainfullyEmployed: false,
        appearedJEEMains: true,
      });
    } else if (preset === 'graduate_general') {
      setProfile({
        dob: '2004-02-10',
        gender: 'MALE',
        educationLevel: 'GRADUATION_COMPLETED',
        hasPCM12th: false,
        hasMathsPhysics12th: false,
        graduationPercentage: 68,
        hasNCCCertificate: false,
        hasCPL: false,
        hasLawDegree: false,
        isMarried: false,
        isGainfullyEmployed: false,
        appearedJEEMains: false,
      });
    } else if (preset === 'ncc_cadet') {
      setProfile({
        dob: '2003-11-05',
        gender: 'MALE',
        educationLevel: 'GRADUATION_COMPLETED',
        hasPCM12th: true,
        pcmPercentage: 75,
        hasMathsPhysics12th: true,
        graduationPercentage: 65,
        hasNCCCertificate: true,
        nccWing: 'ARMY',
        nccGrade: 'A',
        hasCPL: false,
        hasLawDegree: false,
        isMarried: false,
        isGainfullyEmployed: false,
        appearedJEEMains: false,
      });
    }
  };

  const isFormFilled = Boolean(profile.dob && profile.gender && profile.educationLevel);

  // Active advanced filters counter
  const activeOptionalCount = [
    profile.pcmPercentage !== undefined && profile.pcmPercentage > 0,
    profile.enggBranch && profile.enggBranch !== 'ANY_ENGG',
    profile.graduationPercentage !== undefined && profile.graduationPercentage > 0,
    profile.hasNCCCertificate,
    profile.hasCPL,
    profile.hasLawDegree,
    profile.isGainfullyEmployed,
    profile.isMarried,
  ].filter(Boolean).length;

  return (
    <section
      id="profile-form-section"
      className={`rounded-2xl border transition-all shadow-sm p-5 sm:p-6 mb-8 ${
        darkMode
          ? 'bg-slate-800/80 border-slate-700/80'
          : 'bg-white border-slate-200 shadow-slate-100'
      }`}
    >
      {/* Header with Quick Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-200 dark:border-slate-700/80">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Your Profile & Eligibility Inputs</span>
            {isFormFilled && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Active
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Enter your Date of Birth, Gender, and Education to calculate exact remaining cycles & joining dates.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset('12th_pcm')}
            className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            12th PCM
          </button>
          <button
            type="button"
            onClick={() => applyPreset('btech')}
            className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            B.Tech / B.E.
          </button>
          <button
            type="button"
            onClick={() => applyPreset('graduate_general')}
            className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            BA/BSc/BCom
          </button>
          <button
            type="button"
            onClick={() => applyPreset('ncc_cadet')}
            className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
              darkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
          >
            NCC 'C' Cadet
          </button>
        </div>
      </div>

      {/* Main 3 Essential Inputs (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Date of Birth */}
        <div>
          <label
            htmlFor="user-dob"
            className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Date of Birth <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            id="user-dob"
            type="date"
            required
            value={profile.dob}
            min="1980-01-01"
            max="2015-12-31"
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, dob: e.target.value }))
            }
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              darkMode
                ? 'bg-slate-900/90 border-slate-700 text-slate-100'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
            }`}
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Exact DOB determines cutoff qualification
          </p>
        </div>

        {/* 2. Gender */}
        <div>
          <label
            htmlFor="user-gender"
            className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            Gender <span className="text-rose-500 font-bold">*</span>
          </label>
          <select
            id="user-gender"
            value={profile.gender}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                gender: e.target.value as GenderOption,
              }))
            }
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              darkMode
                ? 'bg-slate-900/90 border-slate-700 text-slate-100'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
            }`}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Filters IMA, OTA, AFA, INA & SSC branches
          </p>
        </div>

        {/* 3. Education Level */}
        <div>
          <label
            htmlFor="user-education"
            className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Highest Education Status <span className="text-rose-500 font-bold">*</span>
          </label>
          <select
            id="user-education"
            value={profile.educationLevel}
            onChange={(e) => {
              const val = e.target.value as EducationLevel;
              setProfile((prev) => ({
                ...prev,
                educationLevel: val,
                hasPCM12th:
                  val === 'BTECH_APPEARING' || val === 'BTECH_COMPLETED'
                    ? true
                    : prev.hasPCM12th,
                hasMathsPhysics12th:
                  val === 'BTECH_APPEARING' || val === 'BTECH_COMPLETED'
                    ? true
                    : prev.hasMathsPhysics12th,
              }));
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              darkMode
                ? 'bg-slate-900/90 border-slate-700 text-slate-100'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
            }`}
          >
            <option value="CLASS_12_APPEARING">Class 12th (Appearing)</option>
            <option value="CLASS_12_PASSED">Class 12th (Passed)</option>
            <option value="GRADUATION_APPEARING">Graduation - Final Year (BA / BSc / BCom / etc.)</option>
            <option value="GRADUATION_COMPLETED">Graduation Completed (BA / BSc / BCom / etc.)</option>
            <option value="BTECH_APPEARING">B.E. / B.Tech (Final Year Appearing)</option>
            <option value="BTECH_COMPLETED">B.E. / B.Tech (Completed)</option>
            <option value="POST_GRADUATION">Post Graduation (MA / MSc / MCA / M.Tech)</option>
          </select>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Qualifies for Cadet (NDA/TES) vs Graduate entries
          </p>
        </div>
      </div>

      {/* Collapsible Refinement / Non-Compulsory Filters */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/80">
        <button
          id="toggle-advanced-filters"
          type="button"
          onClick={() => setShowAdvancedFilters((prev) => !prev)}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            darkMode
              ? 'bg-slate-900/70 hover:bg-slate-900 text-slate-200'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Optional Refinements & Branch Qualifications</span>
            {activeOptionalCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {activeOptionalCount} active
              </span>
            )}
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              (PCM Marks, Engineering Branch, NCC C, CPL, Law, TA)
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-bold">
            <span>{showAdvancedFilters ? 'Collapse' : 'Expand'}</span>
            {showAdvancedFilters ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {showAdvancedFilters && (
          <div
            id="advanced-filters-panel"
            className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-200 dark:border-blue-900/60">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                These filters are purely optional. 10+2 science students can leave these as default unless checking specific entries like TGC, SSC Tech, SSC Navy IT, NCC Special, or JAG.
              </span>
            </div>

            {/* Row 1: 10+2 Science & PCM Percentage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.hasPCM12th}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        hasPCM12th: e.target.checked,
                        hasMathsPhysics12th: e.target.checked || prev.hasMathsPhysics12th,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  10+2 with Physics, Chemistry & Maths (PCM)
                </span>
              </div>

              {profile.hasPCM12th && (
                <div>
                  <label
                    htmlFor="pcm-percentage"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    10+2 PCM Aggregate % (TES requires ≥60%, Navy requires ≥70%)
                  </label>
                  <input
                    id="pcm-percentage"
                    type="number"
                    min="35"
                    max="100"
                    placeholder="e.g. 75"
                    value={profile.pcmPercentage || ''}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        pcmPercentage: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                      darkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              )}

              {/* JEE Mains appearance */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.appearedJEEMains}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        appearedJEEMains: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Appeared in JEE (Mains) Exam (Army TES & Navy 10+2 B.Tech)
                </span>
              </div>
            </div>

            {/* Row 2: Engineering Discipline & Degree % */}
            {(profile.educationLevel === 'BTECH_APPEARING' ||
              profile.educationLevel === 'BTECH_COMPLETED' ||
              profile.educationLevel === 'GRADUATION_APPEARING' ||
              profile.educationLevel === 'GRADUATION_COMPLETED' ||
              profile.educationLevel === 'POST_GRADUATION') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label
                    htmlFor="engg-branch-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Engineering / Technical Stream (for TGC, SSC Tech, SSC Navy IT)
                  </label>
                  <select
                    id="engg-branch-select"
                    value={profile.enggBranch || 'ANY_ENGG'}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        enggBranch: e.target.value as EnggBranch,
                      }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold ${
                      darkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="ANY_ENGG">Any Engineering Branch / General</option>
                    <option value="CSE_IT">Computer Science / IT / Cyber Security / Data Science</option>
                    <option value="MECHANICAL">Mechanical / Production / Automobile</option>
                    <option value="ELECTRICAL">Electrical / Electronics & Power</option>
                    <option value="ELECTRONICS_ECE">Electronics & Communication (ECE) / Telecommunication</option>
                    <option value="CIVIL">Civil Engineering / Structural</option>
                    <option value="AERONAUTICAL_AEROSPACE">Aeronautical / Aerospace Engineering</option>
                    <option value="NAVAL_ARCH">Naval Architecture / Marine Engineering</option>
                    <option value="OTHER_ENGG">Other Engineering Specialization</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="grad-percentage"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Graduation Aggregate % (AFCAT & Navy require ≥60%, CDS requires Passing)
                  </label>
                  <input
                    id="grad-percentage"
                    type="number"
                    min="35"
                    max="100"
                    placeholder="e.g. 68"
                    value={profile.graduationPercentage || ''}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        graduationPercentage: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold ${
                      darkMode
                        ? 'bg-slate-900 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Row 3: NCC, CPL, Law, TA toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              {/* NCC C Certificate */}
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  profile.hasNCCCertificate
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    id="ncc-cert-toggle"
                    type="checkbox"
                    checked={profile.hasNCCCertificate}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        hasNCCCertificate: e.target.checked,
                        nccWing: prev.nccWing || 'ARMY',
                        nccGrade: prev.nccGrade || 'A',
                      }))
                    }
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="ncc-cert-toggle" className="text-xs font-bold cursor-pointer text-slate-800 dark:text-slate-200">
                    NCC 'C' Certificate
                  </label>
                </div>
                {profile.hasNCCCertificate && (
                  <div className="mt-2 space-y-1.5">
                    <select
                      value={profile.nccWing || 'ARMY'}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          nccWing: e.target.value as 'ARMY' | 'NAVY' | 'AIR_FORCE',
                        }))
                      }
                      className={`w-full text-[11px] font-semibold p-1.5 rounded border ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="ARMY">Army Wing</option>
                      <option value="NAVY">Naval Wing</option>
                      <option value="AIR_FORCE">Air Wing</option>
                    </select>
                    <select
                      value={profile.nccGrade || 'A'}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          nccGrade: e.target.value as 'A' | 'B' | 'C',
                        }))
                      }
                      className={`w-full text-[11px] font-semibold p-1.5 rounded border ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="A">Grade 'A' (Accepted)</option>
                      <option value="B">Grade 'B' (Accepted)</option>
                      <option value="C">Grade 'C' (Not accepted)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Commercial Pilot License (CPL) */}
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  profile.hasCPL
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    id="cpl-toggle"
                    type="checkbox"
                    checked={profile.hasCPL}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, hasCPL: e.target.checked }))
                    }
                    className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="cpl-toggle" className="text-xs font-bold cursor-pointer text-slate-800 dark:text-slate-200">
                    Commercial Pilot (CPL)
                  </label>
                </div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Grants +2 years age waiver in AFCAT / CDS AFA / ICG
                </p>
              </div>

              {/* Law Degree (LLB) */}
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  profile.hasLawDegree
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    id="law-toggle"
                    type="checkbox"
                    checked={profile.hasLawDegree}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, hasLawDegree: e.target.checked }))
                    }
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="law-toggle" className="text-xs font-bold cursor-pointer text-slate-800 dark:text-slate-200">
                    Law Degree (LLB min 55%)
                  </label>
                </div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Enables Army JAG & ICG Law Officer entries
                </p>
              </div>

              {/* Gainfully Employed (Territorial Army) */}
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  profile.isGainfullyEmployed
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    id="ta-employed-toggle"
                    type="checkbox"
                    checked={profile.isGainfullyEmployed}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        isGainfullyEmployed: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="ta-employed-toggle" className="text-xs font-bold cursor-pointer text-slate-800 dark:text-slate-200">
                    Gainfully Employed (TA)
                  </label>
                </div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Enables Territorial Army up to age 42
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer: Re-Output / Calculate Button & Feedback Controls */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {justCalculated ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Eligibility & Output Re-calculated!</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Outputs live-sync on change or press update to re-evaluate</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              id="reset-filters-btn"
              type="button"
              onClick={onReset}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                darkMode
                  ? 'bg-slate-900/80 hover:bg-slate-900 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            id="recalculate-eligibility-output-btn"
            type="button"
            onClick={handleCalculateClick}
            disabled={isUpdating}
            className={`px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 text-white ${
              isUpdating
                ? 'bg-emerald-800 cursor-wait opacity-90'
                : 'bg-emerald-700 hover:bg-emerald-600 active:scale-95 hover:shadow-md'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Calculating...' : 'Calculate'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
