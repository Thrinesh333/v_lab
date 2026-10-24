import React from 'react';

export const TroubleshootPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white tracking-tight">Hardware Troubleshooting Lab</h1>
        <p className="text-sm text-slate-400 mt-1">
          Simulated hardware failures, diagnostic beep codes, and repair workflows (Module M6)
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 max-w-3xl">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
          🔍
        </div>
        <h2 className="text-xl font-bold text-white">Fault Scenarios & Diagnostic Workbench</h2>
        <p className="text-sm text-slate-300">
          The foundation schema includes <code className="text-amber-400">Fault</code> and <code className="text-amber-400">TroubleshootAttempt</code> tables. Module M6 will introduce interactive scenarios such as RAM reseating, missing 8-pin EPS 12V CPU cables, and shorted standoffs.
        </p>
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-400 font-mono">
          Prisma models: Fault, TroubleshootAttempt
        </div>
      </div>
    </div>
  );
};
