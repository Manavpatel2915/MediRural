import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-blue-600 text-white shadow-md relative">
        {/* Left: Hamburger Menu (Mobile) / Nav Links (Desktop) */}
        <div className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-blue-700 rounded-md transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-4">
            <Link to="/" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Home</Link>
            <Link to="/medicines" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Medicines</Link>
            <Link to="/about" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">About</Link>
            <Link to="/contact" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Contact</Link>
          </div>
        </div>

        {/* Center: Logo - Absolutely centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="font-bold text-xl sm:text-2xl tracking-wider text-white cursor-pointer" onClick={() => navigate("/")}>
            MediRural
          </span>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Icon */}
          <span className="cursor-pointer flex items-center hover:text-blue-100 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          {/* Account Icon */}
          <span className="cursor-pointer flex items-center hover:text-blue-100 transition-colors">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </span>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg z-50">
            <div className="flex flex-col py-4">
              <div className='px-6 py-3 flex flex-col gap-5'>
                <Link to="/" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Home</Link>
                <Link to="/medicines" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Medicines</Link>
                <Link to="/about" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">About</Link>
                <Link to="/contact" className="text-white no-underline font-medium hover:text-blue-100 transition-colors">Contact</Link>
              </div>

            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar

