import React, { useState, useEffect } from 'react';
import myluvLogo from '../assets/myluv-logo.png';
import stgLogo from '../assets/stg-logo.png';
import jerseyFront from '../assets/stg-jersey-front.png';
import jerseyBack from '../assets/stg-jersey-back.png';
import jerseyStageBg from '../assets/jersey-stage-red.png';
import './SponsorsElite.css';

const SponsorsElite = () => {
  const [showingFront, setShowingFront] = useState(true);

  // Auto-flip interval for jersey showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setShowingFront(prev => !prev);
    }, 4000); // Slightly longer interval for better visibility
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sponsors-elite-section stg-section">
      <div className="stg-container">
        <div className="sponsors-elite-grid">

          {/* Left: Sponsors Card */}
          <div className="sponsors-column">
            <div className="official-badge heading-font border-glow-red">OFFICIAL SPONSOR</div>
            <div className="sponsor-card glass">
              <div className="sponsor-logo-box">
                <img src={myluvLogo} alt="MYLUV" className="partner-logo-img" />
              </div>
              <div className="sponsor-info">
                <h2 className="heading-font">MYLUV</h2>
                <p className="partner-type glow-red">PREMIUM SPONSOR</p>
                <p className="sponsor-desc">
                  Proudly sponsoring STG Esports on our journey to dominate the gaming universe.
                  Unmatched support for unmatched talent.
                </p>
              </div>
            </div>
          </div>

          {/* Right column removed as it was moved to Hero section */}

        </div>
      </div>
    </section>
  );
};

export default SponsorsElite;
