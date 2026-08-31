import React from 'react';
import { Shield, Moon, Sun, BookOpen, Calendar, RotateCcw } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: 'entries' | 'calendar' | 'ssb_guide';
  setActiveTab: (tab: 'entries' | 'calendar' | 'ssb_guide') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  onReset,
}) => {
  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        darkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform hover:scale-105 ${
                darkMode
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                  : 'bg-emerald-900 text-amber-300 border border-emerald-950'
              }`}
            >
              <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight">
                  Armed Forces Officer Tracker
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Army • Navy • IAF • ICG
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                All Officer Entries, Remaining Cycles & SSB Schedules
              </p>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View switcher */}
            <div
              id="navigation-tabs"
              className={`flex items-center p-1 rounded-lg border ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                id="tab-entries-btn"
                type="button"
                onClick={() => setActiveTab('entries')}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'entries'
                    ? darkMode
                      ? 'bg-slate-700 text-white shadow-sm font-semibold'
                      : 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Entries & Attempts
              </button>
              <button
                id="tab-calendar-btn"
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'calendar'
                    ? darkMode
                      ? 'bg-slate-700 text-white shadow-sm font-semibold'
                      : 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Yearly</span> Schedule
              </button>
              <button
                id="tab-ssb-guide-btn"
                type="button"
                onClick={() => setActiveTab('ssb_guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'ssb_guide'
                    ? darkMode
                      ? 'bg-slate-700 text-white shadow-sm font-semibold'
                      : 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SSB</span> Guide
              </button>
            </div>

            {/* Reset Form Button */}
            <button
              id="reset-profile-btn"
              type="button"
              onClick={onReset}
              title="Reset profile filters"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
