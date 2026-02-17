import React, { createContext, useState, useContext, useEffect } from 'react';
import { appParams } from '@/lib/appParams';
import Axios from 'axios';

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  authError: { type: string; message: string } | null;
  logout: () => void;
  initializeApp: () => Promise<void>;
  navigateToLogin: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {

      setAuthError(null);

      // 2. Check for existing session
      if (appParams.token) {
        await fetchUserProfile(appParams.token);
      } else {
        setIsLoadingAuth(false);
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoadingAuth(false);
    }
  };



  const fetchUserProfile = async (token: string) => {
    try {
      setIsLoadingAuth(true);
      const response = await Axios.get(`${appParams.apiBaseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      handleAuthError(error);
      console.error('Profile fetch failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };



  const handleAuthError = (error: any) => {
    const reason = error.response?.data?.reason || 'unknown_error';
    setAuthError({ type: reason, message: error.response?.data?.message || 'Failed to initialize app' });
  };


  const navigateToLogin = () => {
    window.location.href = '/login';
  };


  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
    navigateToLogin();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      authError,
      logout,
      navigateToLogin,
      initializeApp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};