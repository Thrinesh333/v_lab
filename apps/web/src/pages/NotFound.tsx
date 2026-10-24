import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-16 text-center space-y-4">
      <div className="text-6xl font-black text-slate-700">404</div>
      <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
      <p className="text-sm text-slate-400">
        The requested workbench module or resource does not exist.
      </p>
      <Link
        to="/"
        className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition"
      >
        Return to Overview
      </Link>
    </div>
  );
};
