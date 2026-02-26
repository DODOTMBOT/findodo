'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('findodo_logged_in');
    if (status === 'true') setIsLoggedIn(true);
    setIsLoaded(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('findodo_logged_in', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('findodo_logged_in');
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};