import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Eye,
  Plane,
  BookOpen,
} from 'lucide-react';

export const SSBPreparationGuide: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [activeSection, setActiveSection] = useState<'ssb_stages' | 'olqs' | 'cpss' | 'physical'>('ssb_stages');

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div
        className={`p-5 rounded-2xl border ${
          darkMode
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>SSB & Aspirant Companion Guide</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Everything an officer aspirant needs: 5-Day SSB testing framework, 15 Officer Like Qualities (OLQs), CPSS Pilot Aptitude test, and Physical benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveSection('ssb_stages')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeSection === 'ssb_stages'
                  ? 'bg-emerald-700 text-white border-emerald-800'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              5-Day SSB Schedule
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('olqs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeSection === 'olqs'
                  ? 'bg-blue-800 text-white border-blue-900'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              15 OLQs
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('cpss')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeSection === 'cpss'
                  ? 'bg-sky-600 text-white border-sky-700'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              CPSS Pilot Test
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('physical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeSection === 'physical'
                  ? 'bg-amber-600 text-white border-amber-700'
                  : darkMode
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
            >
              Physical Standards
            </button>
          </div>
        </div>
      </div>

      {/* 1. 5-DAY SSB SCHEDULE */}
      {activeSection === 'ssb_stages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Day 1 */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Day 1: Stage 1 Screening
              </span>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold">Elimination Stage</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              OIR Test & PPDT
            </h3>
            <ul className="mt-2 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• <strong className="text-slate-900 dark:text-white">OIR (Officer Intelligence Rating):</strong> Verbal & Non-verbal reasoning test sets.</li>
              <li>• <strong className="text-slate-900 dark:text-white">PPDT (Picture Perception & Description):</strong> 30 seconds haze picture viewing, 4 mins story writing.</li>
              <li>• <strong className="text-slate-900 dark:text-white">Individual Narration (1 min)</strong> followed by Group Discussion (GD) to formulate common group story.</li>
              <li>• Results declared around 1:00 PM; screened-in candidates proceed to Stage 2.</li>
            </ul>
          </div>

          {/* Day 2 */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                Day 2: Psychological Testing
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Written Battery</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              TAT, WAT, SRT & SD
            </h3>
            <ul className="mt-2 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• <strong className="text-slate-900 dark:text-white">TAT (Thematic Apperception Test):</strong> 11 pictures + 1 blank slide (4 mins each).</li>
              <li>• <strong className="text-slate-900 dark:text-white">WAT (Word Association Test):</strong> 60 English words displayed for 15 secs each.</li>
              <li>• <strong className="text-slate-900 dark:text-white">SRT (Situation Reaction Test):</strong> 60 real-life crisis situations to solve in 30 minutes.</li>
              <li>• <strong className="text-slate-900 dark:text-white">SD (Self Description):</strong> Parents, teachers, friends opinion & self-aims.</li>
            </ul>
          </div>

          {/* Day 3 & 4 */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Day 3 & 4: GTO Outdoor Tasks
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">9 Group Tasks</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ground Testing Officer (GTO)
            </h3>
            <ul className="mt-2 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• <strong className="text-slate-900 dark:text-white">Group Discussion (GD) & GPE (Group Planning)</strong></li>
              <li>• <strong className="text-slate-900 dark:text-white">PGT (Progressive Group Task) & HGT (Half Group Task)</strong></li>
              <li>• <strong className="text-slate-900 dark:text-white">Snake Race (Obstacle Race) & Lecturette (3 min talk)</strong></li>
              <li>• <strong className="text-slate-900 dark:text-white">Individual Obstacles (10 tasks in 3 mins) & Command Task</strong></li>
              <li>• <strong className="text-slate-900 dark:text-white">FGT (Final Group Task)</strong></li>
            </ul>
          </div>

          {/* Personal Interview */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                Day 2 / 3 / 4 Afternoon
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">1-on-1 Session</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Personal Interview (IO)
            </h3>
            <ul className="mt-2 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• Conducted by President / Deputy President of Selection Board (45 to 60 mins).</li>
              <li>• Comprehensive review of PIQ (Personal Information Questionnaire).</li>
              <li>• Rapid-fire CIQs on education, family, friends, hobbies, GK, current affairs, defence awareness.</li>
            </ul>
          </div>

          {/* Day 5 */}
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                Day 5: Final Board Conference
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Recommendation</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Conference & Merit Declaration
            </h3>
            <ul className="mt-2 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
              <li>• Candidate faces the entire board of 15+ Uniformed Assessors (Psych, GTOs, IOs).</li>
              <li>• Closing questions on stay, food, self-improvement suggestions.</li>
              <li>• Final recommendation results announced by Technical Officer.</li>
              <li>• Recommended candidates stay back for 5-day Medical Board examination.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. 15 OFFICER LIKE QUALITIES (OLQs) */}
      {activeSection === 'olqs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Factor 1: Planning and Organizing */}
          <div
            className={`p-4 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
              Factor 1: Planning & Organizing
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li><strong className="text-slate-900 dark:text-white">1. Effective Intelligence:</strong> Practical problem-solving capability in novel situations.</li>
              <li><strong className="text-slate-900 dark:text-white">2. Reasoning Ability:</strong> Logical deduction and grasp of core issues.</li>
              <li><strong className="text-slate-900 dark:text-white">3. Organizing Ability:</strong> Systematically allocating resources and men.</li>
              <li><strong className="text-slate-900 dark:text-white">4. Power of Expression:</strong> Putting thoughts into crisp, coherent language.</li>
            </ul>
          </div>

          {/* Factor 2: Social Adjustment */}
          <div
            className={`p-4 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
              Factor 2: Social Adjustment
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li><strong className="text-slate-900 dark:text-white">5. Social Adaptability:</strong> Mingling and respecting diverse backgrounds.</li>
              <li><strong className="text-slate-900 dark:text-white">6. Cooperation:</strong> Placing group objective ahead of individual pride.</li>
              <li><strong className="text-slate-900 dark:text-white">7. Sense of Responsibility:</strong> Dependability without constant supervision.</li>
            </ul>
          </div>

          {/* Factor 3: Social Effectiveness */}
          <div
            className={`p-4 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
              Factor 3: Social Effectiveness
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li><strong className="text-slate-900 dark:text-white">8. Initiative:</strong> Taking the first constructive step independently.</li>
              <li><strong className="text-slate-900 dark:text-white">9. Self Confidence:</strong> Faith in one’s own competence.</li>
              <li><strong className="text-slate-900 dark:text-white">10. Speed of Decision:</strong> Quick, sound choices in critical moments.</li>
              <li><strong className="text-slate-900 dark:text-white">11. Group Influence:</strong> Inspiring teammates by merit.</li>
              <li><strong className="text-slate-900 dark:text-white">12. Liveliness:</strong> Cheerful disposition and resilience.</li>
            </ul>
          </div>

          {/* Factor 4: Dynamic */}
          <div
            className={`p-4 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2">
              Factor 4: Dynamic / Courage
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li><strong className="text-slate-900 dark:text-white">13. Determination:</strong> Sustained effort till the objective is achieved.</li>
              <li><strong className="text-slate-900 dark:text-white">14. Courage:</strong> Willingness to take calculated physical and moral risks.</li>
              <li><strong className="text-slate-900 dark:text-white">15. Stamina:</strong> Physical endurance and mental toughness.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 3. CPSS PILOT APTITUDE SYSTEM */}
      {activeSection === 'cpss' && (
        <div
          className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Plane className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Computerised Pilot Selection System (CPSS) Guide
            </h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            CPSS is the once-in-a-lifetime pilot aptitude test administered to all aspirants applying for Flying branches of the Indian Air Force, Navy (Pilot), Coast Guard (Pilot), and Army Aviation. If a candidate fails CPSS once, they can NEVER apply for a military flying branch again (ground duty entries remain open).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-2">
                Part 1: Cognitive & Instrument Battery Test
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                MCQ-based cognitive testing assessing speed, 3D spatial orientation, altimeter reading, artificial horizon comprehension, compass direction tracking, and mental arithmetic under time pressure.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-2">
                Part 2: Machine Testing & Sensory-Motor Simulator
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Sitting in a realistic flight cockpit simulator with joystick, rudder pedals, throttle, and headphones. Tests hand-eye-foot coordination, reflexes, peripheral vision, auditory tracking, and multitasking capabilities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. PHYSICAL STANDARDS */}
      {activeSection === 'physical' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Physical Endurance Benchmark
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li>• <strong className="text-slate-900 dark:text-white">1.6 km Run:</strong> Target under 7 mins (Max allowed: 8 mins).</li>
              <li>• <strong className="text-slate-900 dark:text-white">Push-ups:</strong> 20 to 30 repetitions clean.</li>
              <li>• <strong className="text-slate-900 dark:text-white">Chin-ups (Pull-ups):</strong> 6 to 10 minimum.</li>
              <li>• <strong className="text-slate-900 dark:text-white">Sit-ups:</strong> 25 to 30 reps in 1 min.</li>
              <li>• <strong className="text-slate-900 dark:text-white">Rope Climbing & Swimming:</strong> Highly beneficial for academy life.</li>
            </ul>
          </div>

          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2 flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> Eyesight & LASIK Rules
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li>• <strong className="text-slate-900 dark:text-white">Flying Branch:</strong> 6/6 without glasses (Uncorrected).</li>
              <li>• <strong className="text-slate-900 dark:text-white">Army/Navy/Ground Duty:</strong> 6/6 & 6/9 (Correctable with glasses up to -2.5D / +2.5D depending on branch).</li>
              <li>• <strong className="text-slate-900 dark:text-white">LASIK/PRK:</strong> Allowed for candidates &gt; 20 years old with at least 1-year post-op stability and normal corneal thickness (not permitted for NDA).</li>
            </ul>
          </div>

          <div
            className={`p-5 rounded-xl border ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Height & Tattoo Policy
            </h3>
            <ul className="text-xs space-y-2 text-slate-800 dark:text-slate-200">
              <li>• <strong className="text-slate-900 dark:text-white">Male Height:</strong> 157.5 cm (Army/Navy), 162.5 cm (Flying Branch AFA).</li>
              <li>• <strong className="text-slate-900 dark:text-white">Female Height:</strong> 152 cm (Army/Navy/Ground), 162.5 cm (Flying).</li>
              <li>• <strong className="text-slate-900 dark:text-white">Tattoos:</strong> Permanent body tattoos permitted ONLY on inner face of forearm (elbow to wrist) or reverse of palm. Offensive/indecent tattoos are barred.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
