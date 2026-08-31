import React from 'react';
import { Shield, ExternalLink, Heart, Award, Compass, HelpCircle } from 'lucide-react';

export const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <footer
      id="app-footer"
      className={`border-t mt-16 transition-colors ${
        darkMode
          ? 'bg-slate-900 border-slate-800 text-slate-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                  darkMode
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-emerald-800 text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Armed Forces Officer Entry & Attempt Tracker
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-md">
              A streamlined, dedicated utility for Indian Armed Forces aspirants to track active eligibility, upcoming cycle cutoffs, course commencement dates, notification windows, and SSB schedules across Army, Navy, Air Force, and Coast Guard.
            </p>
            <div className="text-[11px] text-slate-400">
              Disclaimer: Based on official UPSC notifications, Army, Navy, IAF, and ICG eligibility guidelines. Always refer to official notifications on UPSC and Armed Forces websites for gazetted rules.
            </div>
          </div>

          {/* Col 2: Official Recruitment Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Official Recruitment Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://upsc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>UPSC (NDA / CDS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://joinindianarmy.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Join Indian Army (TGC / SSC Tech)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://joinindiannavy.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Join Indian Navy (SSC Tech / IT)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://afcat.cdac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>IAF AFCAT (CDAC Portal)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://joinindiancoastguard.cdac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span>Join Indian Coast Guard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Armed Forces Academies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Officer Training Academies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>• NDA Khadakwasla, Pune</li>
              <li>• IMA Dehradun (Army PC)</li>
              <li>• OTA Chennai (Army SSC)</li>
              <li>• INA Ezhimala, Kerala (Navy)</li>
              <li>• AFA Dundigal, Hyderabad (IAF)</li>
              <li>• CGTC Kochi (Coast Guard)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner with Made with love */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>by defence aspirant</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Jai Hind • Bharat Mata Ki Jai 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
};
