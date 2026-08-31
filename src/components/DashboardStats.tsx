import React, { useState } from 'react';
import {
  CheckCircle,
  Search,
  Filter,
  Flame,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { ForceBranch, EntryType } from '../types/entries';

interface DashboardStatsProps {
  totalEligibleEntries: number;
  totalEligibleCyclesCount: number;
  selectedBranch: 'ALL' | ForceBranch;
  setSelectedBranch: (b: 'ALL' | ForceBranch) => void;
  selectedEntryType: 'ALL' | EntryType;
  setSelectedEntryType: (t: 'ALL' | EntryType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showOnlyEligible: boolean;
  setShowOnlyEligible: (val: boolean) => void;
  branchCounts: {
    ARMY: number;
    NAVY: number;
    AIR_FORCE: number;
    COAST_GUARD: number;
  };
  darkMode: boolean;
  onReCalculate?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalEligibleEntries,
  totalEligibleCyclesCount,
  selectedBranch,
  setSelectedBranch,
  selectedEntryType,
  setSelectedEntryType,
  searchQuery,
  setSearchQuery,
  showOnlyEligible,
  setShowOnlyEligible,
  branchCounts,
  darkMode,
  onReCalculate,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onReCalculate) {
        onReCalculate();
      }
    }, 300);
  };

  return (
    <div id="dashboard-stats-section" className="space-y-4 mb-6">
      {/* Top Banner: Metrics & Branch Breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Eligible Entries */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            darkMode
              ? 'bg-slate-800/90 border-slate-700/80'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Eligible Officer Entries
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalEligibleEntries}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              active entries
            </span>
          </div>
        </div>

        {/* Total Remaining Cycles Available */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            darkMode
              ? 'bg-slate-800/90 border-slate-700/80'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Total Attempt Cycles
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 flex items-center justify-center text-sky-700 dark:text-sky-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalEligibleCyclesCount}
            </span>
            <span className="text-xs text-sky-700 dark:text-sky-400 font-bold">
              upcoming attempts
            </span>
          </div>
        </div>

        {/* Armed Forces Branches breakdown */}
        <div
          className={`p-4 rounded-xl border transition-all col-span-2 ${
            darkMode
              ? 'bg-slate-800/90 border-slate-700/80'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Eligible Branch Breakdown
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Filter by branch:</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <button
              type="button"
              onClick={() => setSelectedBranch(selectedBranch === 'ARMY' ? 'ALL' : 'ARMY')}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
                selectedBranch === 'ARMY'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 hover:border-emerald-500 text-slate-300'
                  : 'bg-slate-100 border-slate-200 hover:border-emerald-600 text-slate-800'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                selectedBranch === 'ARMY' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Army
              </div>
              <div className="text-base font-extrabold">{branchCounts.ARMY}</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBranch(selectedBranch === 'NAVY' ? 'ALL' : 'NAVY')}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
                selectedBranch === 'NAVY'
                  ? 'bg-blue-800 text-white border-blue-900 shadow-xs'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 hover:border-blue-500 text-slate-300'
                  : 'bg-slate-100 border-slate-200 hover:border-blue-600 text-slate-800'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                selectedBranch === 'NAVY' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Navy
              </div>
              <div className="text-base font-extrabold">{branchCounts.NAVY}</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBranch(selectedBranch === 'AIR_FORCE' ? 'ALL' : 'AIR_FORCE')}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
                selectedBranch === 'AIR_FORCE'
                  ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 hover:border-sky-500 text-slate-300'
                  : 'bg-slate-100 border-slate-200 hover:border-sky-600 text-slate-800'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                selectedBranch === 'AIR_FORCE' ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Air Force
              </div>
              <div className="text-base font-extrabold">{branchCounts.AIR_FORCE}</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBranch(selectedBranch === 'COAST_GUARD' ? 'ALL' : 'COAST_GUARD')}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
                selectedBranch === 'COAST_GUARD'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 hover:border-amber-500 text-slate-300'
                  : 'bg-slate-100 border-slate-200 hover:border-amber-600 text-slate-800'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${
                selectedBranch === 'COAST_GUARD' ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                Coast Guard
              </div>
              <div className="text-base font-extrabold">{branchCounts.COAST_GUARD}</div>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-3 rounded-xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          darkMode
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search entry (e.g. CDS, NDA, SSC Tech, Navy IT, AFCAT, TGC, ICG)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              darkMode
                ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Branch Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mr-1 font-semibold">
            <Filter className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Type:</span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedEntryType('ALL')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              selectedEntryType === 'ALL'
                ? darkMode
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-slate-900 border-slate-900 text-white'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
          >
            All Types
          </button>

          <button
            type="button"
            onClick={() => setSelectedEntryType('UPSC_EXAM')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              selectedEntryType === 'UPSC_EXAM'
                ? 'bg-emerald-700 border-emerald-800 text-white'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
          >
            UPSC Exams
          </button>

          <button
            type="button"
            onClick={() => setSelectedEntryType('DIRECT_SSB')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              selectedEntryType === 'DIRECT_SSB'
                ? 'bg-blue-700 border-blue-800 text-white'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
          >
            Direct SSB
          </button>

          <button
            type="button"
            onClick={() => setSelectedEntryType('NON_UPSC_EXAM')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              selectedEntryType === 'NON_UPSC_EXAM'
                ? 'bg-sky-700 border-sky-800 text-white'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
          >
            AFCAT / ICG / TA
          </button>

          {/* Toggle show all vs only eligible */}
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>
          <button
            type="button"
            onClick={() => setShowOnlyEligible(!showOnlyEligible)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              showOnlyEligible
                ? 'bg-emerald-600/20 border-emerald-600 text-emerald-800 dark:text-emerald-300'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            {showOnlyEligible ? 'Eligible Only' : 'Showing All'}
          </button>

          {/* Re-calculate & Refresh Output Button */}
          <button
            id="refresh-filter-output-btn"
            type="button"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            title="Re-calculate & Refresh Output"
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-all flex items-center gap-1.5 shadow-xs ${
              isRefreshing
                ? 'bg-emerald-800 text-white border-emerald-800'
                : darkMode
                ? 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-700'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
          >
            <RefreshCw className={`w-3 h-3 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Updating...' : 'Re-Output'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
