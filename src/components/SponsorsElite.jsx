import React, { useState, useEffect } from 'react';
import myluvLogo from '../assets/myluv-logo.png';
import stgLogo from '../assets/stg-logo.png';
import jerseyFront from '../assets/stg-jersey-front.png';
import jerseyBack from '../assets/stg-jersey-back.png';
import jerseyStageBg from '../assets/jersey-stage-red.png';
import './SponsorsElite.css';

const SponsorsElite = () => {

  return (
    <section className="sponsors-elite-section stg-section">
      <div className="stg-container">
        <div className="sponsors-elite-grid">

          {/* Left: Sponsors Card */}
          <div className="sponsors-column">
            <div className="official-badge heading-font border-glow-red">OFFICIAL SPONSOR</div>
            <div className="sponsor-card glass border-glow-red">
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

          {/* Right: Jersey Showcase */}
          <div className="elite-column">
            <div className="elite-visual glass border-glow-red">
              {/* Section Label */}
              <div className="jersey-showcase-label heading-font">
                <span className="label-dot"></span>
                OFFICIAL JERSEY
                <span className="label-dot"></span>
              </div>

              {/* Jersey + Stage Combined Zone */}
              <div className="jersey-stage-zone theater-stage-theme">
                <div 
                  className="stage-background-layer" 
                  style={{ backgroundImage: `url(${jerseyStageBg})` }}
                ></div>
                <div className="stage-spotlight-overlay"></div>
                
                <div className="jersey-showcase-container">
                  <div className="jersey-rotator">
                    <div className="jersey-card jersey-front-card">
                      <img src={jerseyFront} alt="STG Jersey Front" className="jersey-img" />
                      <div className="jersey-side-tag heading-font">FRONT</div>
                    </div>
                    <div className="jersey-card jersey-back-card">
                      <img src={jerseyBack} alt="STG Jersey Back" className="jersey-img" />
                      <div className="jersey-side-tag heading-font">BACK</div>
                    </div>
                  </div>
                </div>

                {/* High-Fidelity Platform Stage */}
                <div className="elite-platform-stage">
                  <div className="stage-level-base">
                    <div className="stage-neon-outline"></div>
                  </div>
                  <div className="stage-level-middle">
                    <div className="stage-neon-outline"></div>
                  </div>
                  <div className="stage-level-top">
                    <div className="stage-neon-outline"></div>
                  </div>
                  <div className="stage-floor-glow-red"></div>
                </div>

                <div className="theater-stage-floor-shadow"></div>
              </div>

              {/* Bottom Bar: Branding */}
              <div className="elite-bottom-bar">
                <div className="elite-branding">
                  <h4 className="heading-font">THE <span className="glow-cyan">NEXT</span> GEN</h4>
                  <p className="elite-gaming-label">ELITE GAMING</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SponsorsElite;
