import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Repeat, LogOut, User } from 'lucide-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          'hover:bg-blue-50 text-blue-700'
        }`}
        aria-label="User menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {isAuthenticated && user ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/orders');
                }}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Package className="w-4 h-4 mr-3" />
                My Orders
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/subscriptions');
                }}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Repeat className="w-4 h-4 mr-3" />
                My Subscriptions
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </>
          ) : (
            <div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/register');
                }}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu; 