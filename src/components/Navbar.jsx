import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../assets/stg-logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleHomeClick = (e) => {
    closeMenu();
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon-wrapper">
            <img src={logo} alt="STG Esports Logo" className="sg-logo" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text heading-font"><span className="stg-text">STG</span> <span className="red-text">ESPORTS</span></span>
            <span className="organization-text heading-font">ORGANIZATION</span>
          </div>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="nav-links desktop-only">
          <li>
            <NavLink 
              to="/" 
              onClick={handleHomeClick} 
              className={({ isActive }) => (location.pathname === '/' && (location.hash === '' || location.hash === '#') ? 'active glow-red' : '')}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/lineup" className={({ isActive }) => (isActive ? 'active glow-red' : '')}>
              TEAM
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active glow-red' : '')}>
              EVENTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active glow-red' : '')}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/#contact" 
              className={() => (location.hash === '#contact' ? 'active glow-red' : '')}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Sub-Navbar (Visible only on Mobile) */}
      <div className="mobile-sub-nav">
        <ul className="mobile-nav-list">
          <li>
            <NavLink 
              to="/" 
              onClick={handleHomeClick} 
              className={() => (location.pathname === '/' && (location.hash === '' || location.hash === '#') ? 'active' : '')}
            >
              HOME
            </NavLink>
          </li>
          <li><NavLink to="/lineup" className={({ isActive }) => (isActive ? 'active' : '')}>TEAM</NavLink></li>
          <li><NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>EVENTS</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>ABOUT</NavLink></li>
          <li>
            <NavLink 
              to="/#contact" 
              className={() => (location.hash === '#contact' ? 'active' : '')}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
