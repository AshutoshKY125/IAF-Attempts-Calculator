import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { ForceBranch } from '../types/entries';

interface CalendarEvent {
  month: string;
  monthIndex: number;
  entryName: string;
  force: ForceBranch;
  eventType: 'NOTIFICATION' | 'APPLICATION' | 'EXAM' | 'SSB';
  details: string;
  tentativeDate: string;
}

const YEARLY_SCHEDULE_EVENTS: CalendarEvent[] = [
  {
    month: 'December - January',
    monthIndex: 0,
    entryName: 'CDS 1 (UPSC Combined Defence Services)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Notification Release & Online Applications on upsc.gov.in (Single application for IMA, INA, AFA, OTA)',
    tentativeDate: 'Notification: Mid Dec • Form Close: Early Jan',
  },
  {
    month: 'December - January',
    monthIndex: 0,
    entryName: 'NDA 1 (UPSC National Defence Academy)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Notification Release for 10+2 high school aspirants for Army, Navy, Air Force wings & 10+2 INA',
    tentativeDate: 'Dec - Jan Registration Window',
  },
  {
    month: 'December - January',
    monthIndex: 0,
    entryName: 'AFCAT 1 (Air Force Common Admission Test)',
    force: 'AIR_FORCE',
    eventType: 'NOTIFICATION',
    details: 'Notification & Applications on afcat.cdac.in for Flying, GD Tech & Non-Tech branches',
    tentativeDate: 'December 1 to 30',
  },
  {
    month: 'December - January',
    monthIndex: 0,
    entryName: 'Navy SSC Executive (IT / GS) & Tech Branch',
    force: 'NAVY',
    eventType: 'NOTIFICATION',
    details: 'Applications for B.Tech/MCA/M.Sc for July course commencement (Direct SSB)',
    tentativeDate: 'Dec - Jan Online Registration',
  },
  {
    month: 'February',
    monthIndex: 1,
    entryName: 'AFCAT 1 Online CBT Exam',
    force: 'AIR_FORCE',
    eventType: 'EXAM',
    details: 'Computer Based Test across 100+ cities (General Awareness, English, Maths, Reasoning)',
    tentativeDate: 'Mid to Late February',
  },
  {
    month: 'February',
    monthIndex: 1,
    entryName: 'ICG Assistant Commandant (01/Batch)',
    force: 'COAST_GUARD',
    eventType: 'NOTIFICATION',
    details: 'Notification for GD, CPL, Tech (Mech/Elec) and Law entries on joinindiancoastguard.cdac.in',
    tentativeDate: 'Feb 1 to 15',
  },
  {
    month: 'March - April',
    monthIndex: 2,
    entryName: 'TGC (Technical Graduate Course - Army)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Applications for Engineering final year & graduates for Jan IMA course (Direct SSB)',
    tentativeDate: 'March - April Applications',
  },
  {
    month: 'April',
    monthIndex: 3,
    entryName: 'CDS 1 Written Exam (UPSC)',
    force: 'ARMY',
    eventType: 'EXAM',
    details: 'UPSC Offline Exam across India: English (9-11 AM), GK (12-2 PM), Maths (3-5 PM)',
    tentativeDate: 'Mid to Late April',
  },
  {
    month: 'April',
    monthIndex: 3,
    entryName: 'NDA 1 Written Exam (UPSC)',
    force: 'ARMY',
    eventType: 'EXAM',
    details: 'UPSC Offline Exam: Maths (Paper 1 - 300M) & GAT (Paper 2 - 600M)',
    tentativeDate: 'Mid to Late April',
  },
  {
    month: 'May - June',
    monthIndex: 4,
    entryName: 'CDS 2 (UPSC Combined Defence Services)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Notification Release for CDS 2 (IMA, INA, AFA, OTA Chennai)',
    tentativeDate: 'Mid May Notification • Form Close: June',
  },
  {
    month: 'May - June',
    monthIndex: 4,
    entryName: 'NDA 2 (UPSC National Defence Academy)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Notification Release for NDA 2 batch on upsc.gov.in',
    tentativeDate: 'Mid May - Early June',
  },
  {
    month: 'May - June',
    monthIndex: 4,
    entryName: 'AFCAT 2 (CDAC)',
    force: 'AIR_FORCE',
    eventType: 'NOTIFICATION',
    details: 'Notification for AFCAT 2 Flying & Ground Duty batches',
    tentativeDate: 'June 1 to 30 Application Window',
  },
  {
    month: 'June - July',
    monthIndex: 5,
    entryName: 'SSC Tech (Men & Women) - Army',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'OTA Chennai technical entry notification on joinindianarmy.nic.in (Direct SSB)',
    tentativeDate: 'June - July Online Application',
  },
  {
    month: 'July - August',
    monthIndex: 6,
    entryName: 'NCC Special Entry (Army)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'Direct SSB for NCC "C" certificate holders with min B grade',
    tentativeDate: 'July - August Application Window',
  },
  {
    month: 'July - August',
    monthIndex: 6,
    entryName: 'Navy SSC Executive & Technical (Jan Course)',
    force: 'NAVY',
    eventType: 'NOTIFICATION',
    details: 'Direct SSB entries for GS(X), IT Branch, Engineering, Electrical and Aviation',
    tentativeDate: 'July - August',
  },
  {
    month: 'August',
    monthIndex: 7,
    entryName: 'AFCAT 2 Online CBT Exam',
    force: 'AIR_FORCE',
    eventType: 'EXAM',
    details: 'AFCAT 2 Computer Based Written Examination',
    tentativeDate: 'Late August (Sat/Sun)',
  },
  {
    month: 'September',
    monthIndex: 8,
    entryName: 'CDS 2 Written Exam (UPSC)',
    force: 'ARMY',
    eventType: 'EXAM',
    details: 'UPSC All-India Offline Examination for CDS 2',
    tentativeDate: 'Early September',
  },
  {
    month: 'September',
    monthIndex: 8,
    entryName: 'NDA 2 Written Exam (UPSC)',
    force: 'ARMY',
    eventType: 'EXAM',
    details: 'UPSC All-India Examination for NDA 2',
    tentativeDate: 'Early September',
  },
  {
    month: 'September - October',
    monthIndex: 9,
    entryName: 'TGC (Technical Graduate Course - July Batch)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'IMA Dehradun Permanent Commission technical entry notification',
    tentativeDate: 'Sept - Oct Applications',
  },
  {
    month: 'October - November',
    monthIndex: 10,
    entryName: 'Territorial Army (TA Officer)',
    force: 'ARMY',
    eventType: 'NOTIFICATION',
    details: 'CBT written examination notification for gainfully employed civilian graduates',
    tentativeDate: 'Oct - Nov Applications',
  },
  {
    month: 'October - December',
    monthIndex: 11,
    entryName: 'Peak SSB Interview Season',
    force: 'ARMY',
    eventType: 'SSB',
    details: '5-Day SSB testing across Army, Navy & Air Force Selection Boards for CDS-1 & NDA-1 qualifiers',
    tentativeDate: 'Running across Bangalore, Bhopal, Prayagraj, Mysore, Dehradun, Varanasi, Gandhinagar',
  }
];

export const MasterCalendar: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [selectedForceFilter, setSelectedForceFilter] = useState<'ALL' | ForceBranch>('ALL');

  const filteredEvents = YEARLY_SCHEDULE_EVENTS.filter((e) => {
    if (selectedForceFilter !== 'ALL' && e.force !== selectedForceFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`p-6 rounded-2xl border ${
          darkMode
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Armed Forces Year-Round Exam & SSB Calendar</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Master timeline of notification releases, application closing dates, written exams, and SSB schedules across all 4 services.
            </p>
          </div>

          {/* Force Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedForceFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedForceFilter === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-700 dark:border-slate-600'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              All Forces
            </button>
            <button
              type="button"
              onClick={() => setSelectedForceFilter('ARMY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedForceFilter === 'ARMY'
                  ? 'bg-emerald-700 text-white border-emerald-800'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              Indian Army
            </button>
            <button
              type="button"
              onClick={() => setSelectedForceFilter('NAVY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedForceFilter === 'NAVY'
                  ? 'bg-blue-800 text-white border-blue-900'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              Indian Navy
            </button>
            <button
              type="button"
              onClick={() => setSelectedForceFilter('AIR_FORCE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedForceFilter === 'AIR_FORCE'
                  ? 'bg-sky-600 text-white border-sky-700'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              Air Force
            </button>
            <button
              type="button"
              onClick={() => setSelectedForceFilter('COAST_GUARD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                selectedForceFilter === 'COAST_GUARD'
                  ? 'bg-amber-600 text-white border-amber-700'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              Coast Guard
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              darkMode
                ? 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono border border-slate-200 dark:border-slate-700">
                {evt.month}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  evt.eventType === 'NOTIFICATION'
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : evt.eventType === 'EXAM'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    : evt.eventType === 'SSB'
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}
              >
                {evt.eventType}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {evt.entryName}
            </h3>

            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
              {evt.details}
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Timeline:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {evt.tentativeDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
