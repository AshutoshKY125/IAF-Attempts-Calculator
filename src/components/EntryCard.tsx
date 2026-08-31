import React from 'react';
import {
  Calendar,
  ChevronRight,
  Info,
  XCircle,
  Building,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { EvaluatedEntry, ForceBranch } from '../types/entries';

interface EntryCardProps {
  evaluated: EvaluatedEntry;
  onOpenDetails: (evaluated: EvaluatedEntry) => void;
  darkMode: boolean;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  evaluated,
  onOpenDetails,
  darkMode,
}) => {
  const { entry, isEligible, eligibleCycles, reasonsIfNotEligible, eligibleStreams } = evaluated;

  // Branch visual accents (subtle, authentic colors with high contrast in both modes)
  const getBranchBadge = (force: ForceBranch) => {
    switch (force) {
      case 'ARMY':
        return {
          label: 'Indian Army',
          bg: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-600',
        };
      case 'NAVY':
        return {
          label: 'Indian Navy',
          bg: 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800',
          dot: 'bg-blue-600',
        };
      case 'AIR_FORCE':
        return {
          label: 'Indian Air Force',
          bg: 'bg-sky-100 text-sky-950 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800',
          dot: 'bg-sky-600',
        };
      case 'COAST_GUARD':
        return {
          label: 'Indian Coast Guard',
          bg: 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800',
          dot: 'bg-amber-600',
        };
    }
  };

  const branchInfo = getBranchBadge(entry.force);

  return (
    <div
      id={`entry-card-${entry.id}`}
      className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-5 ${
        isEligible
          ? darkMode
            ? 'bg-slate-800/90 border-slate-700/90 hover:border-slate-600 shadow-sm hover:shadow-md'
            : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
          : darkMode
          ? 'bg-slate-900/40 border-slate-800/60 opacity-75 hover:opacity-90'
          : 'bg-slate-50/80 border-slate-200 opacity-80 hover:opacity-95'
      }`}
    >
      <div>
        {/* Top badges: Branch, Type, Commission */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${branchInfo.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${branchInfo.dot}`}></span>
              {branchInfo.label}
            </span>

            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                entry.entryType === 'DIRECT_SSB'
                  ? 'bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
                  : entry.entryType === 'UPSC_EXAM'
                  ? 'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                  : 'bg-teal-100 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
              }`}
            >
              {entry.entryType === 'DIRECT_SSB'
                ? 'Direct SSB (No Written Exam)'
                : entry.entryType === 'UPSC_EXAM'
                ? 'UPSC Written Exam'
                : 'Service CBT Exam'}
            </span>
          </div>

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
              entry.commission === 'PERMANENT'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                : entry.commission === 'SHORT_SERVICE'
                ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                : entry.commission === 'BOTH'
                ? 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                : 'bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            {entry.commission === 'PERMANENT'
              ? 'Permanent Commission'
              : entry.commission === 'SHORT_SERVICE'
              ? 'Short Service (SSC)'
              : entry.commission === 'BOTH'
              ? 'PC & SSC Options'
              : 'Territorial Army'}
          </span>
        </div>

        {/* Entry Title & Academy */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {entry.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600 dark:text-slate-400">
            <Building className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400" />
            <span className="truncate font-medium">{entry.academy}</span>
          </div>
        </div>

        {/* Multi-stream breakdown pill for CDS / NDA / AFCAT */}
        {eligibleStreams && eligibleStreams.length > 0 && (
          <div className="mb-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <Layers className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Available Choice Streams ({eligibleStreams.length}):</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {eligibleStreams.map((s, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Cycles Breakdown */}
        <div className="mb-4">
          {isEligible ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Eligible Cycles & Joining:
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                  {eligibleCycles.length} {eligibleCycles.length === 1 ? 'attempt' : 'attempts'} available
                </span>
              </div>

              {/* List of eligible upcoming cycles */}
              <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-0.5">
                {eligibleCycles.map((cycle, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border transition-colors ${
                      idx === 0
                        ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                        : darkMode
                        ? 'bg-slate-900/60 border-slate-700/60 text-slate-300'
                        : 'bg-slate-100/90 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {idx === 0 ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white shrink-0 uppercase tracking-wider">
                          Next
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      )}
                      <span className="font-bold text-slate-900 dark:text-white">
                        {cycle.cycleName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-right text-slate-600 dark:text-slate-400 shrink-0">
                      <span className="text-[11px] font-medium">Joining:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-200">
                        {cycle.courseJoiningDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-400">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Currently Ineligible</span>
              </div>
              <ul className="text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside space-y-0.5">
                {reasonsIfNotEligible.slice(0, 2).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer / More info action */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Age: {entry.minAgeYears}–{entry.maxAgeYears} yrs
        </span>

        <button
          id={`more-info-btn-${entry.id}`}
          type="button"
          onClick={() => onOpenDetails(evaluated)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            isEligible
              ? darkMode
                ? 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white shadow-xs'
              : darkMode
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>More Info</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
