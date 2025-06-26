import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isSupplier, setIsSupplier] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin , setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('https://medirural.onrender.com/api/users/profile', {
        withCredentials: true
      });
      if (response.data.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin' ? true : false)
        setIsSupplier(response.data.user.role==='supplier' ? true : false)
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('https://medirural.onrender.com/api/users/login', 
      { email, password },
      { withCredentials: true }
    );
    
    if (response.data.success) {
      setIsAuthenticated(true);
      await checkAuthStatus(); // Get user data
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await axios.get('https://medirural.onrender.com/api/users/logout', {
        withCredentials: true
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isAdmin,
    isSupplier,
    user,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 