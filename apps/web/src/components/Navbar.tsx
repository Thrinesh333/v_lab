import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isTeacher, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="9" y="9" width="6" height="6"/>
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">Virtual Lab</span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-slate-400 rounded border border-slate-700">
                PC Assembly
              </span>
            </div>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/lab"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive('/lab')
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Workbench Lab
              </Link>
              <Link
                to="/quiz"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive('/quiz')
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Quizzes
              </Link>
              <Link
                to="/troubleshoot"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive('/troubleshoot')
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Troubleshoot
              </Link>
              <Link
                to="/progress"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive('/progress')
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                My Progress
              </Link>
              {isTeacher && (
                <Link
                  to="/teacher"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    isActive('/teacher')
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  Teacher Portal
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200 hidden sm:inline-block">
                  {user.name}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                    user.role === 'teacher'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-red-400 rounded-md border border-slate-700 hover:border-red-500/40 hover:bg-red-500/10 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
