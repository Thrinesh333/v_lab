import React, { useState } from 'react';
import { apiRequest } from '../api/client.js';
import { useAuth } from '../context/AuthContext.js';

export const LabPlaceholder: React.FC = () => {
  const { user } = useAuth();
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const sendTestTelemetryEvent = async () => {
    setIsSending(true);
    setTestStatus(null);
    try {
      const res = await apiRequest<{ count: number; message: string }>('/events', {
        method: 'POST',
        body: JSON.stringify({
          mode: 'guided',
          type: 'LAB_INITIALIZED',
          timestamp: Date.now(),
          payload: { userEmail: user?.email, screen: 'LabPlaceholder' }
        })
      });
      setTestStatus(`Success! Recorded ${res.count} telemetry event(s) to database.`);
    } catch (err: any) {
      setTestStatus(`Failed to send event: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Hardware Assembly Workbench</h1>
          <p className="text-sm text-slate-400 mt-1">
            Interactive virtual assembly environment • Module M0 Placeholder
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            Phase: Architecture Skeleton
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>🖥️</span>
            <span>Virtual Motherboard & Cabinet Chassis Canvas</span>
          </h2>
          <div className="aspect-video rounded-xl bg-slate-950/80 border border-dashed border-slate-700/80 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <p className="text-slate-300 font-medium">Assembly Canvas Slot Target Space</p>
            <p className="text-xs text-slate-500 max-w-md">
              Modules M2 through M4 will mount interactive 2D component palettes, slot snapping, connection wiring, and live socket checking here.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={sendTestTelemetryEvent}
              disabled={isSending}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition disabled:opacity-50"
            >
              {isSending ? 'Sending Telemetry...' : '⚡ Test POST /api/v1/events Telemetry'}
            </button>
            {testStatus && (
              <span className="text-xs font-mono text-emerald-400">{testStatus}</span>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Upcoming Modules Checklist
          </h3>
          <ul className="text-xs space-y-2.5 text-slate-400">
            <li className="flex items-center gap-2 text-indigo-400 font-medium">
              <span>✓</span> <span>M0: Foundation & Auth Architecture</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M1: Compatibility & POST Engine</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M2: Interactive 2D Workbench Canvas</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M3: Cabling, Screws & Thermal Paste</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M4: Guided Mode Tutorial</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M5: Quiz Mode & Badges</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M6: Troubleshooting Mode</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">○</span> <span>M7: Teacher Portal & Analytics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
