import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const accessToken = useSelector((state) => state.accessToken.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-400">College Samaj</Link>
          <div className="hidden md:flex space-x-4">
            {renderNavLinks(accessToken, isActive)}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {renderNavLinks(accessToken, isActive)}
          </div>
        )}
      </div>
    </nav>
  );
};

const renderNavLinks = (accessToken, isActive) => (
  <>
    {accessToken ? (
      <>
        <NavLink to="/user" isActive={isActive}>Profile</NavLink>
        <NavLink to="/post" isActive={isActive}>Posts</NavLink>
        <NavLink to="/users" isActive={isActive}>Users</NavLink>
        <NavLink to="/signout" isActive={isActive}>Sign Out</NavLink>
      </>
    ) : (
      <>
        <NavLink to="/signin" isActive={isActive}>Sign In</NavLink>
        <NavLink to="/signup" isActive={isActive}>Sign Up</NavLink>
      </>
    )}
  </>
);

const NavLink = ({ to, children, isActive }) => (
  <Link 
    to={to} 
    className={`block py-2 px-4 rounded transition duration-200 ${
      isActive(to) 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;