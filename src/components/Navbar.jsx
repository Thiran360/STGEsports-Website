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
    <nav className={`navbar glass ${isOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-icon-wrapper">
            <img src={logo} alt="STG Esports Logo" className="sg-logo" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text heading-font"><span className="stg-text">STG</span> <span className="red-text">ESPORTS</span></span>
            <span className="organization-text heading-font">ORGANIZATION</span>
          </div>
        </Link>

        {/* Hamburger Menu Toggle */}
        <div className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
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
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive || location.pathname === '/about' ? 'active glow-red' : '')}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/lineup" onClick={closeMenu} className={({ isActive }) => (isActive || location.pathname === '/lineup' ? 'active glow-red' : '')}>
              LINEUP
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" onClick={closeMenu} className={({ isActive }) => (isActive || location.pathname === '/events' ? 'active glow-red' : '')}>
              EVENTS
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/#contact" 
              onClick={closeMenu} 
              className={() => (location.hash === '#contact' ? 'active glow-red' : '')}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
