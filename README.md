<div align="center">

# 🇮🇳 Indian Armed Forces Officer Entry & Attempt Tracker

### *The definitive, real-time eligibility engine, SSB milestone roadmap, and attempt calculator for Indian Armed Forces aspirants.*

[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Made with Pride](https://img.shields.io/badge/Made%20With-%E2%9D%A4%EF%B8%8F%20by%20Defence%20Aspirant-orange?style=for-the-badge)]()

<br/>

**[🌟 Live App Preview](https://ais-pre-lgk4ylabnnfu7n4lxafjra-618772800972.asia-southeast1.run.app)** • **[📖 SSB Roadmap Guide](#-comprehensive-5-day-ssb-roadmap)** • **[🎯 Entry Rules Engine](#-eligibility-mathematics--rules-engine)** • **[🚀 Quickstart](#-getting-started)**

</div>

---

## 🎯 The Motivation: Why Build This?

Every year, millions of passionate defence aspirants across India dream of earning the prestigious **Stars on their Shoulders** and the **Stripes on their Sleeves**. However, navigating the maze of official notifications, differing age brackets, dynamic course commencement cutoffs, and changing branch criteria is often overwhelming:

* *"Am I eligible for CDS 1 or CDS 2 next year based on my exact date of birth?"*
* *"Why do I have 2 extra attempts for OTA Chennai after my IMA age limit expires at 24?"*
* *"Which Direct SSB entries (TGC, SSC-Tech, NCC Special) can I apply for with my engineering branch or degree?"*
* *"When does the notification release, when is the written exam, and when will my SSB take place?"*

This application was engineered by a **defence aspirant, for defence aspirants** to provide a single, crystal-clear, mathematically rigorous dashboard that eliminates guesswork and helps future officers plan every single attempt down to the exact cycle.

---

## 🛡️ Key Features

### 1. 🧮 Dynamic Eligibility & Attempt Calculator
- **Perpetual Year Engine**: Automatically calculates all upcoming and active cycles relative to the calendar year. Concluded past cycles are filtered out automatically.
- **Accurate Date-of-Birth Cutoffs**: Every entry evaluates the candidate's exact DOB against official UPSC and Service Selection Board notifications (calculated on the 1st day of the course commencement month).
- **One-Click Calculate**: Re-calculates and live-syncs all outputs with smooth feedback and celebratory milestones.

### 2. ⚔️ Full Tri-Services & Coast Guard Coverage
| Service | Entries Supported |
| :--- | :--- |
| **🪖 Indian Army** | NDA (Army), CDS (IMA Dehradun), CDS (OTA Chennai Men & Women), TGC, SSC Tech (Men & Women), NCC Special Entry, JAG (Judge Advocate General), Territorial Army (TA) |
| **⚓ Indian Naval Academy** | NDA (Navy & Naval Academy), CDS (INA Ezhimala), 10+2 B.Tech Cadet Entry, SSC Executive (GS / IT), SSC Tech (Engg & Electrical), NCC Navy Special |
| **✈️ Indian Air Force** | NDA (Air Force Flying & Ground Duty), CDS (AFA Dundigal), AFCAT Flying, AFCAT Ground Duty (Technical & Non-Technical), NCC Air Wing Special |
| **🛡️ Indian Coast Guard** | Assistant Commandant (General Duty), AC Technical (Mechanical & Electrical), AC Law, AC Commercial Pilot License (CPL) |

### 3. 🎓 Precise Academy & Commission Distinction
- **CDS (IMA / INA / AFA)**: Permanent Commission stream for gentlemen cadets (ages 19–24, 3 papers including Elementary Mathematics, 300 marks).
- **CDS OTA Chennai**: Short Service Commission for both Men & Women (ages 19–25, 2 papers without Mathematics, 200 marks). Accurately awards **+2 additional attempts** after IMA age is exhausted.
- **Commercial Pilot License (CPL) Extension**: Automatically grants extended upper age limits (up to 26 years) for AFCAT and AFA entries when CPL is selected.

### 4. 📅 Master Calendar & Milestone Predictor
- Full visual roadmap showing **Notification Releases**, **Application Windows**, **Written Exam Dates**, **SSB Interview Schedules**, and **Academy Joining Dates** (IMA Jan/July, OTA April/Oct, AFA Jan/July, INA Jan/July).
- Filterable by year, service branch, and entry category.

### 5. 🎖️ Comprehensive 5-Day SSB Roadmap & 15 OLQ Guide
- Integrated interactive breakdown of Stage-I (OIR + PPDT screening) and Stage-II (Psychological tests, GTO outdoor tasks, Personal Interview, and Final Board Conference).
- Detailed dossier on the **15 Officer Like Qualities (OLQs)** across Planning & Organizing, Social Adjustment, Dynamic/Action, and Factor-IV Stamina/Courage.

### 6. 🌓 Adaptive High-Contrast Dark & Light Theme
- Tailored color palette designed for high contrast and readability on all devices, with crisp slate neutrals and vibrant tricolor accents.

---

## 📐 Eligibility Mathematics & Rules Engine

```
                               ┌────────────────────────────────┐
                               │   Candidate Profile Inputs     │
                               │ (DOB, Gender, Education, CPL)  │
                               └──────────────┬─────────────────┘
                                              │
                       ┌──────────────────────┴──────────────────────┐
                       ▼                                             ▼
        ┌─────────────────────────────┐               ┌─────────────────────────────┐
        │     Age Range Verification  │               │   Education & Stream Check  │
        │  Min Age <= AgeOnCourseDate │               │ (PCM 12th, B.Tech, Law, NCC)│
        │       <= Max Age            │               └──────────────┬──────────────┘
        └──────────────┬──────────────┘                              │
                       │                                             │
                       └──────────────────────┬──────────────────────┘
                                              ▼
                               ┌─────────────────────────────┐
                               │ Dynamic Cycle DOB Brackets  │
                               │  (Jan / July / April / Oct) │
                               └──────────────┬──────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
       ┌──────────────────────────────┐                ┌──────────────────────────────┐
       │   CDS (IMA / INA / AFA)      │                │       CDS (OTA Chennai)      │
       │  Age: 19 - 24 Years          │                │   Age: 19 - 25 Years         │
       │  3 Papers (English, GK, Math)│                │   2 Papers (English, GK)     │
       │  Total: 300 Marks            │                │   Total: 200 Marks           │
       │  Candidates: Male Only       │                │   Candidates: Male & Female  │
       │  Attempts: N Cycles          │                │   Attempts: N + 2 Cycles     │
       └──────────────────────────────┘                └──────────────────────────────┘
```

### The CDS IMA vs OTA Cutoff Formulation
1. **Course Commencement Alignment**:
   - **CDS 1 Course**: Joining in January (IMA/INA/AFA) and April (OTA) of year `Y+1`.
   - **CDS 2 Course**: Joining in July (IMA/INA/AFA) and October (OTA) of year `Y+1`.
2. **Age Thresholds**:
   - **IMA / INA**: 19 to 24 years on day 1 of the commencement month.
   - **AFA**: 20 to 24 years (26 for CPL holders).
   - **OTA Chennai**: 19 to 25 years on day 1 of the commencement month.
3. **The 2-Attempt Advantage**:
   Because OTA admits candidates up to 25 years (1 full year older), an aspirant who reaches 24 and can no longer appear for IMA/INA/AFA still retains **two additional CDS cycles** exclusively for OTA Chennai.

---

## 💻 Tech Stack & Architecture

- **Frontend Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) with native OKLCH color palettes
- **Build Tooling & Bundling**: [Vite 6](https://vitejs.dev/) with fast HMR and esbuild
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [Motion (Framer)](https://motion.dev/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend / Deployment**: Node.js & Express static server ready for Cloud Run and containerization.

### 📂 Directory Structure

```
├── src/
│   ├── components/
│   │   ├── DashboardStats.tsx       # Overall statistics, branch pills & filter bar
│   │   ├── EligibilityForm.tsx      # Interactive candidate profile form & calculate trigger
│   │   ├── EntryCard.tsx            # Officer entry card with badge status & attempt count
│   │   ├── EntryDetailModal.tsx     # Deep-dive modal with syllabus, exam pattern & eligibility
│   │   ├── MasterCalendar.tsx       # Dynamic multi-year chronological milestone schedule
│   │   ├── SSBPreparationGuide.tsx  # 5-day SSB interview procedure & 15 OLQ masterclass
│   │   ├── Header.tsx               # Brand header with quick stats & theme toggle
│   │   └── Footer.tsx               # Defence portal quick links & aspirant dedication
│   ├── data/
│   │   └── armedForcesEntries.ts    # Comprehensive database of 20+ Armed Forces officer entries
│   ├── types/
│   │   └── entries.ts               # Strict TypeScript interfaces for profiles, entries & cycles
│   ├── utils/
│   │   └── eligibilityEngine.ts     # Core calculation algorithms, date checkers & dynamic years
│   ├── App.tsx                      # Root application layout & state orchestrator
│   ├── index.css                    # Tailwind CSS v4 entry point & custom styling
│   └── main.tsx                     # React root DOM mount
├── package.json                     # Dependency manifests & build scripts
├── metadata.json                    # Application metadata
└── README.md                        # Documentation & Developer Guide
```

---

## 🚀 Getting Started

Follow these simple steps to run the application locally on your machine:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation & Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/indian-armed-forces-entry-tracker.git
   cd indian-armed-forces-entry-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Lint and Type Check**:
   ```bash
   npm run lint
   ```

---

## 🔗 Official Defence Recruitment Portals

All dates and guidelines in this tracker are curated from and directly link to the official portals:

* 🏛️ **UPSC**: [upsc.gov.in](https://upsc.gov.in) & [upsconline.nic.in](https://upsconline.nic.in)
* 🪖 **Join Indian Army**: [joinindianarmy.nic.in](https://joinindianarmy.nic.in)
* ⚓ **Join Indian Navy**: [joinindiannavy.gov.in](https://joinindiannavy.gov.in)
* ✈️ **Indian Air Force (AFCAT CDAC)**: [afcat.cdac.in](https://afcat.cdac.in)
* 🛡️ **Indian Coast Guard**: [joinindiancoastguard.cdac.in](https://joinindiancoastguard.cdac.in)

---

## 🤝 Contributing

Contributions from fellow defence aspirants, developers, and veterans are warmly welcomed!
If you would like to contribute:

1. Fork the Project (`git checkout -b feature/AmazingEntry`)
2. Commit your Changes (`git commit -m 'Add new Technical Scheme entry'`)
3. Push to the Branch (`git push origin feature/AmazingEntry`)
4. Open a Pull Request

---

## 🇮🇳 Dedication

> *"Service Before Self"* — Indian Army  
> *"Sham No Varunah"* (May the Lord of the Oceans be auspicious unto us) — Indian Navy  
> *"Nabha Sparsham Deeptam"* (Touch the Sky with Glory) — Indian Air Force  
> *"Vayam Rakshamah"* (We Protect) — Indian Coast Guard  

*Crafted with utmost dedication by a defence aspirant for all brothers and sisters preparing to serve the Motherland.* 🇮🇳
