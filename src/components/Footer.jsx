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
                <img src={logo} alt="STG Esports Logo" className="footer-logo" />
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/lineup">Lineup</Link></li>
                <li><Link to="/events">Events</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4 className="heading-font">COMMUNITY</h4>
              <ul>
                <li><Link to="#">Achievements</Link></li>
                <li><Link to="#">Leaderboard</Link></li>
                <li><Link to="#">Forum</Link></li>
                <li><Link to="#">Blog</Link></li>
              </ul>
            </div>

            <div className="link-group">
              <h4 className="heading-font">SUPPORT</h4>
              <ul>
                <li><Link to="#">Help Center</Link></li>
                <li><Link to="#">Terms of Service</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Admin Portal</Link></li>
              </ul>
            </div>

            <div className="link-group contact-group">
              <h4 className="heading-font">CONTACT</h4>
              <div className="social-links">
                <a href="#" className="social-item">
                  <div className="social-icon">
                    <svg xmlns="http://www.3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-item">
                  <div className="social-icon">
                    <svg xmlns="http://www.3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </div>
                  <span>YouTube</span>
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
