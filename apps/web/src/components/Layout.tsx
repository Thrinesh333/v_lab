import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.js';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Virtual Laboratory for Computer Hardware Assembly • Academic Major Project</p>
          <p>Role-Based Educational Simulation Platform (Module M0 Foundation)</p>
        </div>
      </footer>
    </div>
  );
};
