import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthResponse, LoginInput, RegisterInput, UserSafe } from '@vlab/shared';
import { apiRequest } from '../api/client.js';

interface AuthContextType {
  user: UserSafe | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  register: (payload: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSafe | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vlab_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserProfile() {
      const storedToken = localStorage.getItem('vlab_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiRequest<{ user: UserSafe }>('/auth/me');
        setUser(res.user);
        setToken(storedToken);
      } catch (err) {
        console.warn('Failed to restore session:', err);
        localStorage.removeItem('vlab_token');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const login = async (credentials: LoginInput) => {
    const res = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    localStorage.setItem('vlab_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (payload: RegisterInput) => {
    const res = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    localStorage.setItem('vlab_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('vlab_token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(user && token);
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        isTeacher,
        isStudent,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
