
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types';
import * as api from '../services/api';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        // In a real app, you'd verify the token with the backend.
        // Here, we'll just re-fetch user data.
        const userData = await api.getMe(storedToken);
        setUser(userData);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem('access_token');
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  

  const login = async (email: string, password: string) => {
    const { user, token } = await api.login(email, password);
    localStorage.setItem('access_token', token);
    setUser(user);
    setToken(token);
  };

  const register = async (name: string, email: string, password: string) => {
    const { user, token } = await api.register(name, email, password);
    localStorage.setItem('access_token', token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
