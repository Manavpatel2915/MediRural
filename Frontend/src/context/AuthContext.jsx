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
    console.log('🔍 Checking auth status...');
    console.log('🍪 Available cookies:', document.cookie);
    
    try {
      // Add a small delay to ensure cookie is set
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await axios.get('https://medirural.onrender.com/api/users/profile', {
        withCredentials: true
      });
      console.log('✅ Profile response:', response.data);
      
      if (response.data.success) {
        const userData = response.data.user;
        setIsAuthenticated(true);
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
        setIsSupplier(userData.role === 'supplier');
        console.log('🔍 Auth status updated:', { userData, isAdmin: userData.role === 'admin', isSupplier: userData.role === 'supplier' });
      }
    } catch (error) {
      console.error('❌ Auth check error:', error.response?.status, error.response?.data);
      console.log('🍪 Cookies after error:', document.cookie);
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
      setIsSupplier(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    console.log('🔐 Login attempt with:', { email, password });
    
    const response = await axios.post('https://medirural.onrender.com/api/users/login', 
      { email, password },
      { withCredentials: true }
    );
    
    console.log('✅ Login response:', response.data);
    console.log('🍪 Cookies after login:', document.cookie);
    
    if (response.data.success) {
      // Add a delay to ensure cookie is set
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setIsAuthenticated(true);
      console.log('🔐 Setting isAuthenticated to true');
      
      // Manually fetch profile data
      try {
        console.log('🔍 Manually fetching profile after login...');
        const profileResponse = await axios.get('https://medirural.onrender.com/api/users/profile', {
          withCredentials: true
        });
        
        if (profileResponse.data.success) {
          const userData = profileResponse.data.user;
          setUser(userData);
          setIsAdmin(userData.role === 'admin');
          setIsSupplier(userData.role === 'supplier');
          console.log('✅ Profile fetched successfully:', userData);
        }
      } catch (profileError) {
        console.error('❌ Profile fetch failed after login:', profileError.response?.status, profileError.response?.data);
        // Don't throw error here, login was successful
      }
      
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
      setIsAdmin(false);
      setIsSupplier(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, reset local state
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
      setIsSupplier(false);
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