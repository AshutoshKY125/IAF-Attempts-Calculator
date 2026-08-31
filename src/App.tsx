/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { EligibilityForm } from './components/EligibilityForm';
import { DashboardStats } from './components/DashboardStats';
import { EntryCard } from './components/EntryCard';
import { EntryDetailModal } from './components/EntryDetailModal';
import { MasterCalendar } from './components/MasterCalendar';
import { SSBPreparationGuide } from './components/SSBPreparationGuide';
import { Footer } from './components/Footer';
import { evaluateUserEligibility } from './utils/eligibilityEngine';
import { UserProfile, EvaluatedEntry, ForceBranch, EntryType } from './types/entries';
import { Shield, Sparkles, Filter, AlertCircle, Compass, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Theme state (Dark / Light)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('armed_forces_tracker_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('armed_forces_tracker_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('armed_forces_tracker_theme', 'light');
    }
  }, [darkMode]);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'entries' | 'calendar' | 'ssb_guide'>('entries');

  // Initial user profile state
  const initialProfile: UserProfile = {
    dob: '2004-06-15',
    gender: 'MALE',
    educationLevel: 'BTECH_COMPLETED',
    hasPCM12th: true,
    pcmPercentage: 78,
    hasMathsPhysics12th: true,
    enggBranch: 'CSE_IT',
    graduationPercentage: 72,
    hasNCCCertificate: false,
    nccWing: 'ARMY',
    nccGrade: 'A',
    hasCPL: false,
    hasLawDegree: false,
    isMarried: false,
    isGainfullyEmployed: false,
    appearedJEEMains: true,
  };

  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  // Filters & Search
  const [selectedBranch, setSelectedBranch] = useState<'ALL' | ForceBranch>('ALL');
  const [selectedEntryType, setSelectedEntryType] = useState<'ALL' | EntryType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyEligible, setShowOnlyEligible] = useState(true);

  // Active Modal
  const [activeModalEntry, setActiveModalEntry] = useState<EvaluatedEntry | null>(null);

  // Reset function
  const handleReset = () => {
    setProfile({
      dob: '',
      gender: 'MALE',
      educationLevel: 'CLASS_12_PASSED',
      hasPCM12th: true,
      pcmPercentage: undefined,
      hasMathsPhysics12th: true,
      hasNCCCertificate: false,
      hasCPL: false,
      hasLawDegree: false,
      isMarried: false,
      isGainfullyEmployed: false,
      appearedJEEMains: false,
    });
    setSelectedBranch('ALL');
    setSelectedEntryType('ALL');
    setSearchQuery('');
  };

  // Re-calculate output handler with scroll & celebratory feedback
  const handleCalculate = () => {
    const statsSection = document.getElementById('dashboard-stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (eligibleEntriesList.length > 0) {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#047857', '#0284c7', '#d97706', '#6366f1'],
        });
      } catch {
        // ignore
      }
    }
  };

  // Evaluate all entries
  const evaluatedEntries = useMemo(() => {
    return evaluateUserEligibility(profile);
  }, [profile]);

  // Compute eligible metrics
  const eligibleEntriesList = useMemo(() => {
    return evaluatedEntries.filter((e) => e.isEligible);
  }, [evaluatedEntries]);

  const totalEligibleCyclesCount = useMemo(() => {
    return eligibleEntriesList.reduce(
      (sum, entry) => sum + entry.eligibleCycles.length,
      0
    );
  }, [eligibleEntriesList]);

  const branchCounts = useMemo(() => {
    return {
      ARMY: eligibleEntriesList.filter((e) => e.entry.force === 'ARMY').length,
      NAVY: eligibleEntriesList.filter((e) => e.entry.force === 'NAVY').length,
      AIR_FORCE: eligibleEntriesList.filter((e) => e.entry.force === 'AIR_FORCE').length,
      COAST_GUARD: eligibleEntriesList.filter((e) => e.entry.force === 'COAST_GUARD').length,
    };
  }, [eligibleEntriesList]);

  // Filter and search entries for display
  const displayedEntries = useMemo(() => {
    return evaluatedEntries.filter((item) => {
      // Eligibility filter
      if (showOnlyEligible && !item.isEligible) return false;

      // Branch filter
      if (selectedBranch !== 'ALL' && item.entry.force !== selectedBranch) return false;

      // Entry type filter
      if (selectedEntryType !== 'ALL' && item.entry.entryType !== selectedEntryType) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.entry.name.toLowerCase().includes(q);
        const matchesShort = item.entry.shortCode.toLowerCase().includes(q);
        const matchesAcademy = item.entry.academy.toLowerCase().includes(q);
        const matchesForce = item.entry.force.toLowerCase().includes(q);
        if (!matchesName && !matchesShort && !matchesAcademy && !matchesForce) {
          return false;
        }
      }

      return true;
    });
  }, [evaluatedEntries, showOnlyEligible, selectedBranch, selectedEntryType, searchQuery]);

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/60 text-slate-900'
      }`}
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'entries' && (
          <div>
            {/* Profile Input Form */}
            <EligibilityForm
              profile={profile}
              setProfile={setProfile}
              darkMode={darkMode}
              onCalculate={handleCalculate}
              onReset={handleReset}
            />

            {/* Dashboard Overview Metrics & Branch Switchers */}
            <DashboardStats
              totalEligibleEntries={eligibleEntriesList.length}
              totalEligibleCyclesCount={totalEligibleCyclesCount}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              selectedEntryType={selectedEntryType}
              setSelectedEntryType={setSelectedEntryType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showOnlyEligible={showOnlyEligible}
              setShowOnlyEligible={setShowOnlyEligible}
              branchCounts={branchCounts}
              darkMode={darkMode}
              onReCalculate={handleCalculate}
            />

            {/* Entry Cards Grid */}
            {displayedEntries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedEntries.map((evaluated) => (
                  <EntryCard
                    key={evaluated.entry.id}
                    evaluated={evaluated}
                    onOpenDetails={(item) => setActiveModalEntry(item)}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            ) : (
              <div
                className={`p-12 text-center rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <AlertCircle className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No matching officer entries found
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try adjusting your filters, clearing search keywords, or enabling "Showing All (incl. Ineligible)" to explore qualifications for other branches.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('ALL');
                    setSelectedEntryType('ALL');
                    setSearchQuery('');
                    setShowOnlyEligible(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
                >
                  Clear Filters & Show All
                </button>
              </div>
            )}
          </div>
        )}

        {/* Master Year-Round Calendar Tab */}
        {activeTab === 'calendar' && (
          <MasterCalendar darkMode={darkMode} />
        )}

        {/* SSB Preparation & Aspirant Companion Guide Tab */}
        {activeTab === 'ssb_guide' && (
          <SSBPreparationGuide darkMode={darkMode} />
        )}
      </main>

      {/* Entry Detail & 4 Milestones Modal */}
      <EntryDetailModal
        evaluated={activeModalEntry}
        onClose={() => setActiveModalEntry(null)}
        darkMode={darkMode}
      />

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
