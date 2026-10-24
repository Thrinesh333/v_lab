import React from 'react';
import { useAuth } from '../context/AuthContext.js';

export const ProgressPlaceholder: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white tracking-tight">Student Learning Progress</h1>
        <p className="text-sm text-slate-400 mt-1">
          Personal build history, mastery scores, and earned achievement badges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <p className="text-xs uppercase font-semibold text-slate-400">Authenticated Student</p>
          <p className="text-lg font-bold text-white">{user?.name}</p>
          <p className="text-xs text-indigo-400">{user?.email}</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <p className="text-xs uppercase font-semibold text-slate-400">Build Attempts</p>
          <p className="text-3xl font-black text-indigo-400">0</p>
          <p className="text-xs text-slate-500">Tracked via BuildAttempt table</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <p className="text-xs uppercase font-semibold text-slate-400">Earned Badges</p>
          <p className="text-3xl font-black text-amber-400">0</p>
          <p className="text-xs text-slate-500">Tracked via UserBadge table</p>
        </div>
      </div>
    </div>
  );
};
