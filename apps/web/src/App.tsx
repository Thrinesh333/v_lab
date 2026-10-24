import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout.js';
import { ProtectedRoute } from './components/ProtectedRoute.js';
import { AuthProvider } from './context/AuthContext.js';
import { Home } from './pages/Home.js';
import { LabPlaceholder } from './pages/LabPlaceholder.js';
import { Login } from './pages/Login.js';
import { NotFound } from './pages/NotFound.js';
import { ProgressPlaceholder } from './pages/ProgressPlaceholder.js';
import { QuizPlaceholder } from './pages/QuizPlaceholder.js';
import { Register } from './pages/Register.js';
import { TeacherDashboardPlaceholder } from './pages/TeacherDashboardPlaceholder.js';
import { TroubleshootPlaceholder } from './pages/TroubleshootPlaceholder.js';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Student & Teacher Routes */}
            <Route
              path="lab"
              element={
                <ProtectedRoute>
                  <LabPlaceholder />
                </ProtectedRoute>
              }
            />
            <Route
              path="quiz"
              element={
                <ProtectedRoute>
                  <QuizPlaceholder />
                </ProtectedRoute>
              }
            />
            <Route
              path="troubleshoot"
              element={
                <ProtectedRoute>
                  <TroubleshootPlaceholder />
                </ProtectedRoute>
              }
            />
            <Route
              path="progress"
              element={
                <ProtectedRoute>
                  <ProgressPlaceholder />
                </ProtectedRoute>
              }
            />

            {/* Teacher Only Protected Route */}
            <Route
              path="teacher"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboardPlaceholder />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
