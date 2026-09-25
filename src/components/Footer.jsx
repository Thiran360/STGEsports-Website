import { Link } from 'react-router-dom';
import logo from '../assets/stg-logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-container">
        <div className="footer-main">
          
          <div className="footer-brand">
            <div className="footer-brand-header">
              <div className="footer-logo-wrapper">
                <img loading="lazy" decoding="async" src={logo} alt="STG Esports Logo" className="footer-logo" loading="lazy" />
              </div>
              <div className="footer-brand-title">
                <h2 className="heading-font">STG <span className="dark-red-text">ESPORTS</span></h2>
                <p className="footer-brand-subtitle">ARENA OF CHAMPIONS</p>
              </div>
            </div>
            <p className="footer-desc">India's premier esports tournament platform. Compete in PUBG & BGMI tournaments with real prize pools every day.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4 className="heading-font">PLATFORM</h4>
              <ul>
                <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
                <li><Link to="/lineup">Team</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4 className="heading-font">SUPPORT</h4>
              <ul>
                <li><a href="https://wa.me/919025594503" target="_blank" rel="noopener noreferrer">Help Center</a></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/admin">Admin Portal</Link></li>
              </ul>
            </div>

            <div className="link-group contact-group">
              <h4 className="heading-font">CONTACT</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/stg_esports___?igsh=eWdxcnMzbTlmOXN2" target="_blank" rel="noopener noreferrer" className="social-item">
                  <div className="social-icon instagram-gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <span>@stg_esports___</span>
                </a>
                <a href="https://youtube.com/@stg_is_live?si=_EqwFsYEZv8fmsGy" target="_blank" rel="noopener noreferrer" className="social-item">
                  <div className="social-icon youtube-gradient">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                  <span>@stg_is_live</span>
                </a>
              </div>
            </div>

          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 STG Esports. All rights reserved.</p>
          <div className="footer-status">
            <div className="status-dot"></div>
            <span className="heading-font">STG SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
