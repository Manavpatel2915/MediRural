import React, { useState, useRef , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

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
    <div className="relative" ref={menuRef} >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center hover:text-blue-100 transition-colors cursor-pointer duration-300"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      </button>
      <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
        initial={{opacity:0 }}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{ duration: 0.35 , ease: 'easeInOut' }}
        >
          {isAuthenticated && user ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                Signed in as <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </>
          ) : (
            
            
              <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 , ease: 'easeInOut' }}
              >
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/register');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Register
              </button>
              </motion.div>
          )}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu; 