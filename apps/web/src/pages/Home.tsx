import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export const Home: React.FC = () => {
  const { isAuthenticated, isTeacher } = useAuth();

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-8 sm:p-12 border border-indigo-500/20 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <span>🚀 Module M0 Active</span>
            <span>•</span>
            <span>System Architecture Verified</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Learn & Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">PC Assembly</span> In Virtual Reality.
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            An interactive engineering laboratory designed for computer science students. Master component selection, socket compatibility, thermal dynamics, cabling, POST simulation, and hardware troubleshooting.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/lab"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                >
                  Enter Hardware Lab →
                </Link>
                {isTeacher && (
                  <Link
                    to="/teacher"
                    className="px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40 transition"
                  >
                    Teacher Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                >
                  Create Student Account
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
                >
                  Sign In With Demo Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Demo Credentials Helper */}
      <section className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
          🎓 Seeded Demo Credentials (From DB Seed)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span className="text-amber-400 font-bold block mb-1">👨‍🏫 Teacher Account</span>
            <p className="text-slate-300">Email: <code className="text-amber-300">teacher@vlab.edu</code></p>
            <p className="text-slate-400">Password: <code>Password123!</code></p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span className="text-indigo-400 font-bold block mb-1">👩‍🎓 Student Account #1</span>
            <p className="text-slate-300">Email: <code className="text-indigo-300">student1@vlab.edu</code></p>
            <p className="text-slate-400">Password: <code>Password123!</code></p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span className="text-indigo-400 font-bold block mb-1">👨‍🎓 Student Account #2-#5</span>
            <p className="text-slate-300">Email: <code className="text-indigo-300">student2@vlab.edu</code></p>
            <p className="text-slate-400">Password: <code>Password123!</code></p>
          </div>
        </div>
      </section>

      {/* Module Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
          <div className="text-2xl mb-3">🛠️</div>
          <h3 className="text-lg font-bold text-white mb-1">Interactive Workbench</h3>
          <p className="text-sm text-slate-400 mb-4">
            Drag-and-drop CPU, RAM, GPU, PSU, and coolers into slots with real-time socket validation.
          </p>
          <span className="text-xs text-indigo-400 font-medium">Coming in Module M2-M4 →</span>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
          <div className="text-2xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-white mb-1">Compatibility & POST Engine</h3>
          <p className="text-sm text-slate-400 mb-4">
            Simulate motherboard BIOS boot sequences, error beep codes, and thermal dissipation warnings.
          </p>
          <span className="text-xs text-indigo-400 font-medium">Coming in Module M1 →</span>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
          <div className="text-2xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-white mb-1">Hardware Troubleshooting</h3>
          <p className="text-sm text-slate-400 mb-4">
            Diagnose realistic faults like missing standoff shorts, unseated RAM, and dry thermal paste.
          </p>
          <span className="text-xs text-indigo-400 font-medium">Coming in Module M6 →</span>
        </div>
      </section>
    </div>
  );
};
