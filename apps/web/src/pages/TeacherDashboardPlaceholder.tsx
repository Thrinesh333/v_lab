import React from 'react';
import { useAuth } from '../context/AuthContext.js';

export const TeacherDashboardPlaceholder: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Instructor & Lab Analytics Portal</h1>
          <p className="text-sm text-slate-400 mt-1">
            Student cohort tracking, mistake heatmaps, and curriculum management (Module M7)
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          Instructor Clearance Granted
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs uppercase font-semibold text-slate-400">Total Students</p>
          <p className="text-2xl font-bold text-white">5 Enrolled</p>
          <p className="text-xs text-slate-500">Seeded in database</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs uppercase font-semibold text-slate-400">Active Lab Sessions</p>
          <p className="text-2xl font-bold text-emerald-400">Ready</p>
          <p className="text-xs text-slate-500">Session & Event telemetry active</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs uppercase font-semibold text-slate-400">Average Build Time</p>
          <p className="text-2xl font-bold text-indigo-400">--</p>
          <p className="text-xs text-slate-500">Pending student sessions</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <p className="text-xs uppercase font-semibold text-slate-400">Top Error Category</p>
          <p className="text-2xl font-bold text-rose-400">--</p>
          <p className="text-xs text-slate-500">Module M7 Analytics</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h2 className="text-lg font-bold text-white mb-2">Instructor Access Verified</h2>
        <p className="text-sm text-slate-300">
          Welcome, <span className="font-semibold text-amber-300">{user?.name}</span> ({user?.email}).
          Role guard middleware and frontend routing successfully restrict this view exclusively to accounts with the <code className="text-amber-400">teacher</code> role.
        </p>
      </div>
    </div>
  );
};
