
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkClass = "text-brand-green-600 font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-brand-green-600 transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <span className="font-serif text-xl font-bold text-brand-green-800">SoilSense AI</span>
          </NavLink>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>About</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Dashboard</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">Welcome, {user?.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-brand-brown-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-brown-700 transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-600 hover:text-brand-green-600 transition-colors text-sm font-medium">
                  Login
                </NavLink>
                <NavLink to="/register" className="bg-brand-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-green-700 transition-all duration-300 transform hover:scale-105">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
