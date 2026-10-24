import React from 'react';

export const QuizPlaceholder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white tracking-tight">Computer Hardware Quizzes</h1>
        <p className="text-sm text-slate-400 mt-1">
          Knowledge checks, component identification, and diagnostic assessments (Module M5)
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 max-w-3xl">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
          📝
        </div>
        <h2 className="text-xl font-bold text-white">Quiz Engine Ready for Data-Driven Questions</h2>
        <p className="text-sm text-slate-300">
          The database schema contains the <code className="text-indigo-400">QuizQuestion</code> and <code className="text-indigo-400">QuizAttempt</code> models. Module M5 will introduce category quizzes (CPU socket alignment, RAM multi-channel configuration, power budgeting) and awarded achievement badges.
        </p>
        <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-400 font-mono">
          Prisma models: QuizQuestion, QuizAttempt, Badge, UserBadge
        </div>
      </div>
    </div>
  );
};
