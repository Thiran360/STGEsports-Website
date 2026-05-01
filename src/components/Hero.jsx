import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import '../components/SponsorsElite.css'; // Import styles for jersey
import jerseyFront from '../assets/stg-jersey-front.png';
import jerseyBack from '../assets/stg-jersey-back.png';
import jerseyStageBg from '../assets/jersey-stage-red.png';

const Hero = ({ 
  imageSrc = null, 
  title = null, 
  subtitle = null, 
  badgeText = "INDIA'S #1 ESPORTS PLATFORM",
  showScroll = true
}) => {
  const [showingFront, setShowingFront] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingFront(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" id="home">
      {imageSrc && (
        <div 
          className="hero-image-bg" 
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
      )}
      
      <div className="hero-grid-container">
        <div className="hero-grid-left">
          <motion.div 
            className="hero-title-box glass border-glow-red"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-main-title">
              STG <span className="red-text">ESPORTS</span>
            </h1>
          </motion.div>
        </div>
        <div className="hero-grid-right">
          <div className="elite-visual">
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
              
              <div 
                className={`jersey-flip-container ${showingFront ? 'show-front' : 'show-back'}`}
                onClick={() => setShowingFront(!showingFront)}
                style={{ cursor: 'pointer' }}
              >
                <div className="jersey-card jersey-front-card">
                  <img src={jerseyFront} alt="STG Jersey Front" className="jersey-img" />
                  <div className="jersey-side-tag heading-font">FRONT</div>
                </div>
                <div className="jersey-card jersey-back-card">
                  <img src={jerseyBack} alt="STG Jersey Back" className="jersey-img" />
                  <div className="jersey-side-tag heading-font">BACK</div>
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

            {/* Bottom Bar: Indicators + Branding */}
            <div className="elite-bottom-bar">
              <div className="jersey-indicators">
                <div className={`indicator-dot ${showingFront ? 'active' : ''}`}></div>
                <div className={`indicator-dot ${!showingFront ? 'active' : ''}`}></div>
              </div>
              <div className="elite-branding">
                <h4 className="heading-font">THE <span className="glow-cyan">NEXT</span> GEN</h4>
                <p className="elite-gaming-label">ELITE GAMING</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showScroll && (
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>SCROLL</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </motion.div>
      )}
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;


