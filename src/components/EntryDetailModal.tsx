import React from 'react';
import {
  X,
  Calendar,
  ExternalLink,
  Building,
  GraduationCap,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';
import { EvaluatedEntry } from '../types/entries';

interface EntryDetailModalProps {
  evaluated: EvaluatedEntry | null;
  onClose: () => void;
  darkMode: boolean;
}

export const EntryDetailModal: React.FC<EntryDetailModalProps> = ({
  evaluated,
  onClose,
  darkMode,
}) => {
  if (!evaluated) return null;

  const { entry, isEligible, eligibleCycles, eligibleStreams } = evaluated;
  const sampleCycle =
    eligibleCycles[0] ||
    entry.generateCycles({
      dob: '',
      gender: 'MALE',
      educationLevel: 'GRADUATION_COMPLETED',
      hasPCM12th: true,
      hasMathsPhysics12th: true,
      hasNCCCertificate: false,
      hasCPL: false,
      hasLawDegree: false,
      isMarried: false,
      isGainfullyEmployed: false,
      appearedJEEMains: false,
    })[0];

  return (
    <div
      id="entry-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="entry-detail-modal-content"
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl transition-all ${
          darkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`sticky top-0 z-20 px-6 py-4 border-b flex items-start justify-between gap-4 backdrop-blur-md ${
            darkMode
              ? 'bg-slate-900/95 border-slate-700'
              : 'bg-white/95 border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {entry.force.replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {entry.commission === 'PERMANENT'
                  ? 'Permanent Commission (PC)'
                  : entry.commission === 'SHORT_SERVICE'
                  ? 'Short Service Commission (SSC)'
                  : entry.commission === 'BOTH'
                  ? 'Permanent & Short Service'
                  : 'Territorial Army'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {entry.name}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span>{entry.academy}</span>
            </p>
          </div>

          <button
            id="close-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-xl border transition-colors ${
              darkMode
                ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* MULTI-STREAM CARD (CDS, NDA, AFCAT) */}
          {entry.availableStreams && entry.availableStreams.length > 0 && (
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Available Streams / Academies in this Unified Exam ({entry.availableStreams.length})</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Candidates give a single entrance examination and rank these academies in their preference order based on qualification and merit:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {entry.availableStreams.map((stream, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs ${
                      darkMode
                        ? 'bg-slate-900/60 border-slate-700/80 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{stream.shortName}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {stream.ageRange}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      {stream.qualification}
                    </div>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                      {stream.commission}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 1: THE 4 CRITICAL MILESTONES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Key Schedule Milestones (Approx Timeline)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Notification */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  Notification Release
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {sampleCycle?.notificationMonth || 'Bi-annually'}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Published in Employment News & Official Portal
                </p>
              </div>

              {/* 2. Application Window */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                    2
                  </span>
                  Application Window
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {sampleCycle?.applicationWindow || 'Approx 3–4 weeks'}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Online registration & choice submission
                </p>
              </div>

              {/* 3. Written Exam / Shortlisting */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  Exam / Shortlisting
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {sampleCycle?.examDate || 'Direct SSB Call Letter'}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  {entry.entryType === 'DIRECT_SSB'
                    ? 'Degree / JEE cutoff shortlisting'
                    : 'All-India Written Examination'}
                </p>
              </div>

              {/* 4. SSB & Joining */}
              <div
                className={`p-3.5 rounded-xl border ${
                  darkMode
                    ? 'bg-slate-800/80 border-slate-700/80'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 flex items-center justify-center text-[10px] font-bold">
                    4
                  </span>
                  SSB & Academy Joining
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  SSB: {sampleCycle?.ssbPeriod}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Joining: <span className="font-bold text-emerald-700 dark:text-emerald-400">{sampleCycle?.courseJoiningDate}</span>
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: OFFICIAL PORTAL DIRECT LINK BUTTON */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              darkMode
                ? 'bg-emerald-950/40 border-emerald-800/60'
                : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                Official Application Portal
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                Apply online and check official notifications directly on{' '}
                <span className="font-bold text-slate-900 dark:text-white">
                  {entry.officialPortalName}
                </span>
              </p>
            </div>

            <a
              id="official-portal-link-btn"
              href={entry.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs shrink-0"
            >
              <span>Visit {entry.officialPortalName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* SECTION 3: DETAILED ELIGIBILITY CRITERIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age & DOB Window */}
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Age & Cutoff Window
              </h4>
              <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {entry.ageCriteriaDescription}
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Standard Age Limit:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {entry.minAgeYears} to {entry.maxAgeYears} Years
                </span>
              </div>
            </div>

            {/* Educational Qualifications */}
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Educational Qualification
              </h4>
              <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {entry.educationCriteriaDescription}
              </div>
            </div>
          </div>

          {/* SECTION 4: ALL UPCOMING CYCLES WITH EXACT DATES */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              All Projected Upcoming Cycles & DOB Eligibility Ranges
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b ${
                    darkMode
                      ? 'bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <tr>
                    <th className="p-2.5 font-bold">Cycle / Batch</th>
                    <th className="p-2.5 font-bold">Course Joining</th>
                    <th className="p-2.5 font-bold">DOB Cutoff Range</th>
                    <th className="p-2.5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {entry
                    .generateCycles({
                      dob: '',
                      gender: 'MALE',
                      educationLevel: 'GRADUATION_COMPLETED',
                      hasPCM12th: true,
                      hasMathsPhysics12th: true,
                      hasNCCCertificate: false,
                      hasCPL: false,
                      hasLawDegree: false,
                      isMarried: false,
                      isGainfullyEmployed: false,
                      appearedJEEMains: false,
                    })
                    .map((cycle, i) => {
                      const isUserEligibleForThisCycle = eligibleCycles.some(
                        (ec) => ec.cycleName === cycle.cycleName
                      );
                      return (
                        <tr
                          key={i}
                          className={
                            isUserEligibleForThisCycle
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                          }
                        >
                          <td className="p-2.5 font-bold text-slate-900 dark:text-white">
                            {cycle.cycleName}
                          </td>
                          <td className="p-2.5 font-bold text-emerald-700 dark:text-emerald-400">
                            {cycle.courseJoiningDate}
                          </td>
                          <td className="p-2.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                            {cycle.minDob} to {cycle.maxDob}
                          </td>
                          <td className="p-2.5 text-right font-medium">
                            {isUserEligibleForThisCycle ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Eligible
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Ineligible / Age
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 5: SELECTION PROCESS & EXAM PATTERN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Selection Stages
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                {entry.selectionProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {entry.examPattern && (
              <div
                className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Written Examination Pattern
                </h4>
                <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Subjects: </span>
                    {entry.examPattern.subjects.join(', ')}
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5">
                    <span>Duration:</span>
                    <span className="font-bold">{entry.examPattern.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Marks:</span>
                    <span className="font-bold">{entry.examPattern.totalMarks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Negative Marking:</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      {entry.examPattern.negativeMarking ? 'Yes (1/3rd penalty)' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`sticky bottom-0 z-20 px-6 py-3.5 border-t flex items-center justify-between backdrop-blur-md ${
            darkMode
              ? 'bg-slate-900/95 border-slate-700'
              : 'bg-white/95 border-slate-200'
          }`}
        >
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Armed Forces Career Tracker • Verified UPSC & Service Standards
          </p>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
