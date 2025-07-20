import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const { getCartCount } = useCart()


  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Sliding indicator logic (simple)
  useEffect(() => {
    const activeLink = navRef.current?.querySelector('.nav-active');
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const containerRect = navRef.current.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNav('/')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="font-black text-lg text-blue-700 tracking-tight">MediRural</span>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center relative " ref={navRef}>
            <div className="flex items-center px-1 py-1 rounded-full backdrop-blur-md border border-blue-100/40 shadow-sm relative bg-white/90">
              <div
                className="absolute top-1 h-7 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 ease-in-out z-0"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
              />
              {NAV_LINKS.map((link) => (
                <button
                  key={link.to}
                  onClick={() => handleNav(link.to)}
                  className={`relative z-10 px-4 py-1 rounded-full font-medium text-sm mx-1 transition-colors duration-150  ${
                    location.pathname === link.to
                      ? 'text-white nav-active'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                  style={{ background: 'none' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cart & User */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => handleNav('/cart')}
                className="p-2 rounded-full text-blue-700 hover:bg-blue-50 transition-colors"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
            <div className="ml-2">
              <UserMenu />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-200 ${
        isMenuOpen ? 'opacity-100 translate-y-0 max-h-96' : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-blue-100/40 shadow-md">
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.to}
                onClick={() => handleNav(link.to)}
                className="w-full text-left"
              >
                <div className={`py-2 px-3 rounded-lg font-medium text-base transition-colors duration-150 ${
                  location.pathname === link.to
                    ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow'
                    : 'text-blue-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-emerald-500'
                }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
